import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(frontendRoot, '..')
const schedulerPath = process.env.EDGERUN_SCHEDULER_SOURCE || path.join(repoRoot, 'crates/edgerun-scheduler/src/main.rs')
const outputDir = path.join(frontendRoot, 'generated')
const outputPath = path.join(outputDir, 'scheduler-api.json')
const sourceFile = 'crates/edgerun-scheduler/src/main.rs'

function parseRoutes(src) {
  const routes = []
  const routeRegex = /\.route\("([^"]+)",\s*(get|post)\(([^)]+)\)\)/g
  for (const match of src.matchAll(routeRegex)) {
    routes.push({
      path: match[1],
      method: match[2].toUpperCase(),
      handler: match[3].trim()
    })
  }
  return routes
}

function fallbackGenerated(reason) {
  return {
    generatedAt: new Date().toISOString(),
    sourceFile,
    sourceSha256: null,
    endpointCount: 0,
    endpoints: [],
    unavailable: true,
    reason
  }
}

const generated = existsSync(schedulerPath)
  ? (() => {
      const source = readFileSync(schedulerPath, 'utf8')
      const routes = parseRoutes(source)
      return {
        generatedAt: new Date().toISOString(),
        sourceFile,
        sourceSha256: createHash('sha256').update(source).digest('hex'),
        endpointCount: routes.length,
        endpoints: routes,
        unavailable: false
      }
    })()
  : fallbackGenerated(`scheduler source not found at ${schedulerPath}`)

if (generated.unavailable) {
  console.warn(`[docs:generate] ${generated.reason}; writing empty scheduler-api.json`)
}

mkdirSync(outputDir, { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(generated, null, 2)}\n`, 'utf8')
