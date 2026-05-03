import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const rawBasePath = process.env.EDGERUN_SITE_BASE_PATH ?? (repoName ? `/${repoName}` : '')
const basePath = rawBasePath.replace(/\/$/, '')
const customDomain = process.env.EDGERUN_SITE_DOMAIN || ''

if (!existsSync(dist)) {
  console.warn(`[pages:basepath] dist not found at ${dist}; skipping`)
  process.exit(0)
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function prefixPath(value) {
  if (!basePath) return value
  if (!value.startsWith('/')) return value
  if (value.startsWith('//')) return value
  if (value === '/') return `${basePath}/`
  if (value === basePath || value.startsWith(`${basePath}/`)) return value
  return `${basePath}${value}`
}

function rewriteHtml(file) {
  let html = readFileSync(file, 'utf8')
  html = html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_m, attr, rest) => `${attr}="${prefixPath(`/${rest}`)}"`)
  html = html.replace(/url\(\/([^)]*)\)/g, (_m, rest) => `url(${prefixPath(`/${rest}`)})`)
  writeFileSync(file, html, 'utf8')
}

function rewriteManifest(file) {
  const manifest = JSON.parse(readFileSync(file, 'utf8'))
  if (manifest.start_url) manifest.start_url = prefixPath(manifest.start_url)
  if (manifest.scope) manifest.scope = prefixPath(manifest.scope)
  if (Array.isArray(manifest.icons)) {
    manifest.icons = manifest.icons.map((icon) => ({ ...icon, src: prefixPath(icon.src) }))
  }
  writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

for (const file of walk(dist)) {
  if (file.endsWith('.html')) rewriteHtml(file)
  if (file.endsWith('.webmanifest')) rewriteManifest(file)
}

const cnamePath = path.join(dist, 'CNAME')
if (customDomain) {
  writeFileSync(cnamePath, `${customDomain}\n`, 'utf8')
} else if (existsSync(cnamePath)) {
  rmSync(cnamePath)
}

console.log(`[pages:basepath] basePath=${basePath || '/'} customDomain=${customDomain || '(none)'}`)
