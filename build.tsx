import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { renderToString } from 'solid-js/web'
import MarkdownIt from 'markdown-it'
import { createHighlighter } from 'shiki'

type NavItem = { href: string; label: string }
type BlogPost = { slug: string; title: string; excerpt: string }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const distRoot = path.join(__dirname, 'dist')
const publicRoot = path.join(__dirname, 'public')
const wikiRoot = path.join(__dirname, 'wiki')

const versionFromTag = (process.env.GITHUB_REF_NAME ?? '').replace(/^v/, '')
const currentVersion = process.env.EDGERUN_VERSION || versionFromTag || 'main'
const buildNumber =
  process.env.EDGERUN_BUILD_NUMBER ||
  `${currentVersion}-${(process.env.GITHUB_SHA || 'local').slice(0, 8)}-${process.env.GITHUB_RUN_NUMBER || '0'}`
const siteUrl = process.env.EDGERUN_SITE_URL || 'https://www.edgerun.tech'
const siteDomain = process.env.EDGERUN_SITE_DOMAIN || 'www.edgerun.tech'

const versions = Array.from(
  new Set(
    (process.env.EDGERUN_VERSIONS || currentVersion)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
  )
)

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/run/', label: 'Run' },
  { href: '/workers/', label: 'Workers' },
  { href: '/token/', label: 'SOL Economics' },
  { href: '/dashboard/', label: 'Dashboard' },
  { href: '/docs/', label: 'Docs' },
  { href: '/releases/', label: 'Releases' }
]

const blogPosts: BlogPost[] = [
  {
    slug: 'introducing-edgerun',
    title: 'Introducing Edgerun: Verifiable Compute on Solana',
    excerpt: 'Deterministic WASM jobs settled on Solana with transparent worker accounting.'
  },
  {
    slug: 'worker-operations-guide',
    title: 'Worker Operations Guide',
    excerpt: 'How worker participation, scoring, and stake-aware operations are evolving.'
  },
  {
    slug: 'release-discipline',
    title: 'Release Discipline and Deterministic Builds',
    excerpt: 'How build metadata, artifacts, and docs stay aligned by version.'
  }
]

const docsSources = [
  'Whitepaper.md',
  'Phase-2-whitepaper.md',
  ...readdirSync(path.join(repoRoot, 'docs'))
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join('docs', name))
]

const shiki = await createHighlighter({
  themes: ['github-dark'],
  langs: ['plaintext', 'markdown', 'rust', 'toml', 'json', 'yaml', 'bash', 'typescript', 'javascript']
})

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: (code: string, lang: string) => {
    try {
      return shiki.codeToHtml(code, {
        lang: (lang || 'plaintext').toLowerCase(),
        theme: 'github-dark'
      })
    } catch {
      return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
    }
  }
})

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function resolveRef(version: string): string {
  if (version === 'main') return 'HEAD'
  const tag = `v${version}`
  try {
    execSync(`git rev-parse --verify --quiet ${tag}`, { cwd: repoRoot, stdio: 'ignore' })
    return tag
  } catch {
    return 'HEAD'
  }
}

function readVersionedFile(ref: string, relativePath: string): string | null {
  if (ref === 'HEAD') {
    const targetPath = path.join(repoRoot, relativePath)
    return existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : null
  }

  try {
    return execSync(`git show ${ref}:${relativePath}`, {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'ignore']
    }).toString('utf8')
  } catch {
    return null
  }
}

function template(title: string, description: string, body: string): string {
  const marker = renderToString(() => `solid-ssr:${buildNumber}`)

  const nav = navItems
    .map((item) => `<a class="navlink" href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join('\n')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} | Edgerun</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#0d1729" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" />
    <link rel="stylesheet" href="/assets/styles.css" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-icon.png" />
  </head>
  <body>
    <div class="shell">
      <header class="panel p-4 md:p-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="pill">Deterministic Compute</p>
            <h1 class="text-2xl md:text-4xl font-bold mt-2">${escapeHtml(title)}</h1>
          </div>
          <div class="text-xs font-mono text-right visually-muted">
            <p>version ${escapeHtml(currentVersion)}</p>
            <p>build ${escapeHtml(buildNumber)}</p>
          </div>
        </div>
        <nav class="mt-4 flex flex-wrap gap-2" aria-label="Primary">${nav}</nav>
      </header>
      <main class="mt-4 md:mt-6">${body}</main>
      <footer class="mt-8 pb-8 text-sm visually-muted">
        <p>All settlement and staking flows are SOL-denominated in current protocol design.</p>
        <p class="mt-2">Copyright <span data-current-year></span> Edgerun.</p>
        <p class="text-xs font-mono mt-2">${escapeHtml(marker)}</p>
      </footer>
    </div>
    <script type="module" src="/assets/client.js"></script>
  </body>
</html>`
}

function writePage(relativePath: string, title: string, description: string, body: string): void {
  const targetPath = path.join(distRoot, relativePath)
  mkdirSync(path.dirname(targetPath), { recursive: true })
  writeFileSync(targetPath, template(title, description, body), 'utf8')
}

function buildSchedulerApiMarkdown(ref: string): string {
  const schedulerSource = readVersionedFile(ref, 'crates/edgerun-scheduler/src/main.rs')
  if (!schedulerSource) {
    return '# Scheduler API (Generated)\n\nScheduler source unavailable for this version.'
  }

  const routes: string[] = []
  const regex = /\.route\("([^"]+)",\s*(get|post)\(([^)]+)\)\)/g
  for (const match of schedulerSource.matchAll(regex)) {
    const routePath = match[1]
    const routeMethod = match[2]
    const routeHandler = match[3]
    if (!routePath || !routeMethod || !routeHandler) continue
    routes.push(`- \`${routeMethod.toUpperCase()} ${routePath}\` -> \`${routeHandler.trim()}\``)
  }
  routes.sort()

  return ['# Scheduler API (Generated)', '', `Source ref: \`${ref}\``, '', ...routes].join('\n')
}

function generateVersionDocs(version: string): string[] {
  const ref = resolveRef(version)
  const generated: string[] = [`/docs/${version}/`]
  const links: Array<{ title: string; href: string }> = []
  const wikiVersionDir = path.join(wikiRoot, version)
  mkdirSync(wikiVersionDir, { recursive: true })

  for (const sourcePath of docsSources) {
    const content = readVersionedFile(ref, sourcePath)
    if (!content) continue

    const slug = sourcePath.replaceAll(path.sep, '-').replace(/\.md$/, '')
    const fileName = `${slug}.html`
    const href = `/docs/${version}/${fileName}`
    links.push({ title: slug, href })
    generated.push(href)

    writePage(
      path.join('docs', version, fileName),
      `${slug} (${version})`,
      `Generated docs for ${slug} in ${version}`,
      `<article class="panel p-4 md:p-6">
        <p class="text-xs font-mono visually-muted">${escapeHtml(`${sourcePath} @ ${ref}`)}</p>
        <div class="docs-content mt-4">${markdown.render(content)}</div>
      </article>`
    )

    writeFileSync(path.join(wikiVersionDir, `${slug}.md`), `${content}\n`, 'utf8')
  }

  const schedulerMd = buildSchedulerApiMarkdown(ref)
  links.push({ title: 'scheduler-api', href: `/docs/${version}/scheduler-api.html` })
  generated.push(`/docs/${version}/scheduler-api.html`)

  writePage(
    path.join('docs', version, 'scheduler-api.html'),
    `scheduler-api (${version})`,
    `Scheduler API snapshot for ${version}`,
    `<article class="panel p-4 md:p-6"><div class="docs-content">${markdown.render(schedulerMd)}</div></article>`
  )
  writeFileSync(path.join(wikiVersionDir, 'scheduler-api.md'), `${schedulerMd}\n`, 'utf8')

  writePage(
    path.join('docs', version, 'index.html'),
    `Documentation ${version}`,
    `Versioned docs index for ${version}`,
    `<section class="panel p-4 md:p-6">
      <p class="pill">Version ${escapeHtml(version)}</p>
      <ul class="mt-4 space-y-2">
        ${links.map((entry) => `<li><a class="underline decoration-dotted" href="${entry.href}">${escapeHtml(entry.title)}</a></li>`).join('\n')}
      </ul>
    </section>`
  )

  writeFileSync(
    path.join(wikiVersionDir, 'Home.md'),
    [
      `# Edgerun Docs ${version}`,
      '',
      `Build: \`${buildNumber}\``,
      `Source ref: \`${ref}\``,
      '',
      'Pages:',
      ...links.map((entry) => `- [${entry.title}](${entry.href})`)
    ].join('\n') + '\n',
    'utf8'
  )

  return generated
}

rmSync(distRoot, { recursive: true, force: true })
rmSync(wikiRoot, { recursive: true, force: true })
mkdirSync(path.join(distRoot, 'assets'), { recursive: true })
if (existsSync(publicRoot)) cpSync(publicRoot, distRoot, { recursive: true })

const docsPaths = versions.flatMap((version) => generateVersionDocs(version))

writePage(
  'index.html',
  'Edgerun',
  'Deterministic WASM compute and verifiable settlement on Solana.',
  `<section class="panel p-4 md:p-6">
    <p class="pill">Network Overview</p>
    <p class="mt-3 text-lg">Dispatch deterministic compute, verify outputs, and settle with SOL-based stake and escrow flows.</p>
    <div class="grid-cards mt-4">
      <article class="panel p-4">
        <h2 class="text-lg font-semibold">Jobs</h2>
        <p class="visually-muted mt-2">Runtime pipeline is live for core deterministic execution surfaces.</p>
        <p class="status-live mt-2 text-sm font-semibold">Live</p>
      </article>
      <article class="panel p-4">
        <h2 class="text-lg font-semibold">Advanced Scheduling</h2>
        <p class="visually-muted mt-2">Advanced orchestration and infra automation are rolling out incrementally.</p>
        <p class="status-generating mt-2 text-sm font-semibold" data-generating-label>Generating</p>
      </article>
      <article class="panel p-4">
        <h2 class="text-lg font-semibold">Worker Visibility</h2>
        <p class="visually-muted mt-2">Unified fleet telemetry and historical diagnostics are being expanded.</p>
        <p class="status-generating mt-2 text-sm font-semibold" data-generating-label>Generating</p>
      </article>
    </div>
  </section>`
)

writePage(
  path.join('run', 'index.html'),
  'Run Jobs',
  'Submit deterministic workloads to Edgerun workers.',
  `<section class="panel p-4 md:p-6">
    <p class="pill">Execution</p>
    <p class="mt-3">Job submission API contracts are generated from scheduler source and available in versioned docs.</p>
    <p class="visually-muted mt-3">CLI and scheduler runtime wiring is active; advanced templates remain in progress.</p>
    <p class="status-generating mt-2 text-sm font-semibold" data-generating-label>Generating</p>
  </section>`
)

writePage(
  path.join('workers', 'index.html'),
  'Workers',
  'Operate and monitor Edgerun workers.',
  `<section class="panel p-4 md:p-6">
    <ul class="list-disc pl-5 space-y-2">
      <li>Stake SOL and register deterministic compute capacity.</li>
      <li>Participate in output verification and attestations.</li>
      <li>Track penalties/slashing under protocol rules.</li>
    </ul>
    <p class="status-generating mt-4 text-sm font-semibold" data-generating-label>Generating</p>
  </section>`
)

writePage(
  path.join('token', 'index.html'),
  'SOL Economics',
  'Protocol economics and settlement mechanics in SOL.',
  `<section class="panel p-4 md:p-6">
    <p class="pill">Economics</p>
    <h2 class="text-xl md:text-2xl font-semibold mt-2">SOL-only settlement</h2>
    <p class="mt-3">Escrow, worker staking, and payouts are currently SOL-denominated to reduce system complexity.</p>
    <blockquote class="panel p-4 mt-4">
      <p class="text-base md:text-lg">"I think compute will be the currency of the future. I think it'll be maybe the most precious commodity in the world."</p>
    </blockquote>
    <p class="text-sm visually-muted mt-2">Sam Altman, Lex Fridman Podcast source reference.</p>
  </section>`
)

writePage(
  path.join('dashboard', 'index.html'),
  'Dashboard',
  'Operational views for jobs, workers, and release metadata.',
  `<section class="panel p-4 md:p-6">
    <div class="grid-cards">
      <article class="panel p-4">
        <h2 class="font-semibold">Throughput</h2>
        <p class="visually-muted mt-2">Per-release job metrics and settlement lag surfaces.</p>
      </article>
      <article class="panel p-4">
        <h2 class="font-semibold">Worker Health</h2>
        <p class="visually-muted mt-2">Liveness dashboards are being generated from scheduler telemetry.</p>
        <p class="status-generating mt-2 text-sm font-semibold" data-generating-label>Generating</p>
      </article>
    </div>
  </section>`
)

writePage(
  path.join('docs', 'index.html'),
  'Documentation',
  'Browse docs by release version.',
  `<section class="panel p-4 md:p-6">
    <label for="version-select" class="block text-sm">Version</label>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <select id="version-select" class="panel px-3 py-2 bg-transparent" aria-label="Documentation version">
        ${versions.map((version) => `<option value="${escapeHtml(version)}" ${version === currentVersion ? 'selected' : ''}>${escapeHtml(version)}</option>`).join('\n')}
      </select>
      <a class="navlink panel" href="/docs/${escapeHtml(currentVersion)}/">Open ${escapeHtml(currentVersion)}</a>
    </div>
  </section>`
)

writePage(
  path.join('blog', 'index.html'),
  'Blog',
  'Edgerun release and protocol notes.',
  `<section class="panel p-4 md:p-6 space-y-3">
    ${blogPosts
      .map(
        (post) => `<article class="panel p-4"><h2 class="text-lg font-semibold"><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></h2><p class="visually-muted mt-2">${escapeHtml(post.excerpt)}</p></article>`
      )
      .join('')}
  </section>`
)

for (const post of blogPosts) {
  writePage(
    path.join('blog', post.slug, 'index.html'),
    post.title,
    post.excerpt,
    `<article class="panel p-4 md:p-6"><p>${escapeHtml(post.excerpt)}</p><p class="status-generating mt-3 text-sm font-semibold" data-generating-label>Generating</p></article>`
  )
}

writePage(
  path.join('legal', 'privacy', 'index.html'),
  'Privacy Policy',
  'Privacy terms for Edgerun services.',
  '<section class="panel p-4 md:p-6"><p>Privacy content is being generated from policy source of truth.</p><p class="status-generating mt-3 text-sm font-semibold" data-generating-label>Generating</p></section>'
)

writePage(
  path.join('legal', 'terms', 'index.html'),
  'Terms of Service',
  'Terms governing Edgerun protocol and services.',
  '<section class="panel p-4 md:p-6"><p>Terms content is being generated from policy source of truth.</p><p class="status-generating mt-3 text-sm font-semibold" data-generating-label>Generating</p></section>'
)

writePage(
  path.join('legal', 'sla', 'index.html'),
  'Service Level Agreement',
  'Service availability and operational targets.',
  '<section class="panel p-4 md:p-6"><p>SLA content is being generated from operational definitions.</p><p class="status-generating mt-3 text-sm font-semibold" data-generating-label>Generating</p></section>'
)

writePage(
  path.join('job', 'index.html'),
  'Job Status',
  'Lookup for submitted jobs.',
  '<section class="panel p-4 md:p-6"><p>Direct job status path placeholder.</p><p class="status-generating mt-3 text-sm font-semibold" data-generating-label>Generating</p></section>'
)

writePage(
  path.join('releases', 'index.html'),
  'Releases',
  'Versioned artifacts and release references.',
  `<section class="panel p-4 md:p-6">
    <ul class="list-disc pl-5 space-y-2">
      ${versions.map((version) => `<li><a href="/docs/${escapeHtml(version)}/">Docs ${escapeHtml(version)}</a></li>`).join('')}
    </ul>
  </section>`
)

writePage(
  '404.html',
  'Page Not Found',
  'The requested page is unavailable.',
  '<section class="panel p-4 md:p-6"><p>This route is unavailable or still generating.</p><a class="navlink panel inline-block mt-3" href="/">Go home</a></section>'
)

const paths = [
  '/',
  '/run/',
  '/workers/',
  '/token/',
  '/dashboard/',
  '/docs/',
  ...docsPaths,
  '/blog/',
  ...blogPosts.map((post) => `/blog/${post.slug}/`),
  '/legal/privacy/',
  '/legal/terms/',
  '/legal/sla/',
  '/job/',
  '/releases/'
]

const themeConfig = JSON.parse(readFileSync(path.join(__dirname, 'config', 'brand-theme.json'), 'utf8')) as {
  name: string
  shortName: string
  description: string
  colors: { darkBackground: string; lightBackground: string; brandPrimary: string }
}

writeFileSync(path.join(distRoot, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8')
writeFileSync(
  path.join(distRoot, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((href) => `  <url><loc>${siteUrl}${href}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
  'utf8'
)

writeFileSync(
  path.join(distRoot, 'manifest.webmanifest'),
  JSON.stringify(
    {
      name: themeConfig.name,
      short_name: themeConfig.shortName,
      description: themeConfig.description,
      start_url: '/',
      display: 'standalone',
      background_color: themeConfig.colors.darkBackground,
      theme_color: themeConfig.colors.brandPrimary,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
      ]
    },
    null,
    2
  ) + '\n',
  'utf8'
)

writeFileSync(path.join(distRoot, 'versions.json'), JSON.stringify(versions, null, 2) + '\n', 'utf8')
writeFileSync(path.join(distRoot, 'build-meta.json'), JSON.stringify({ version: currentVersion, buildNumber, siteUrl }, null, 2) + '\n', 'utf8')
if (siteDomain) writeFileSync(path.join(distRoot, 'CNAME'), `${siteDomain}\n`, 'utf8')

const llmsBase = [
  '# Edgerun',
  '',
  '> Deterministic WASM compute with SOL settlement.',
  '',
  `Version: ${currentVersion}`,
  `Build: ${buildNumber}`,
  `Docs: ${siteUrl}/docs/${currentVersion}/`,
  `Releases: ${siteUrl}/releases/`
].join('\n')
writeFileSync(path.join(distRoot, 'llms.txt'), `${llmsBase}\n`, 'utf8')
writeFileSync(path.join(distRoot, 'llms-full.txt'), `${llmsBase}\n\n${buildSchedulerApiMarkdown(resolveRef(currentVersion))}\n`, 'utf8')
