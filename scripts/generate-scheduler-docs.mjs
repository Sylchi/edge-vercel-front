import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(frontendRoot, '..')
const schedulerPath = path.join(repoRoot, 'crates/edgerun-scheduler/src/main.rs')
const outputDir = path.join(frontendRoot, 'lib/generated')
const outputPath = path.join(outputDir, 'scheduler-api.json')

const source = readFileSync(schedulerPath, 'utf8')

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

function parseHandlerSignatures(src) {
  const byHandler = new Map()
  const fnRegex = /async fn\s+(\w+)\s*\(([\s\S]*?)\)\s*->\s*([^{]+)\{/g

  for (const match of src.matchAll(fnRegex)) {
    const handler = match[1]
    const args = match[2]
    const returnType = match[3].trim()

    const requestMatch = args.match(/Json\([^)]*\):\s*Json<([A-Za-z0-9_]+)>/)
    const queryMatch = args.match(/Query\([^)]*\):\s*Query<([A-Za-z0-9_]+)>/)
    const pathMatch = args.match(/Path\([^)]*\):\s*Path<([A-Za-z0-9_]+)>/)
    const responseMatch = returnType.match(/Json<([A-Za-z0-9_]+)>/)

    byHandler.set(handler, {
      requestType: requestMatch ? requestMatch[1] : null,
      queryType: queryMatch ? queryMatch[1] : null,
      pathType: pathMatch ? pathMatch[1] : null,
      responseType: responseMatch ? responseMatch[1] : null
    })
  }

  return byHandler
}

function parseStructs(src) {
  const structs = new Map()
  const structRegex = /struct\s+([A-Za-z0-9_]+)\s*\{([\s\S]*?)\n\}/g

  for (const match of src.matchAll(structRegex)) {
    const typeName = match[1]
    const body = match[2]
    const fields = []
    const lines = body.split('\n')

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#[') || trimmed.startsWith('//')) {
        continue
      }
      const fieldMatch = trimmed.match(/^([A-Za-z0-9_]+):\s*([^,]+),?$/)
      if (!fieldMatch) {
        continue
      }
      fields.push({
        name: fieldMatch[1],
        type: fieldMatch[2].trim()
      })
    }

    structs.set(typeName, fields)
  }

  return structs
}

const routes = parseRoutes(source)
const signatures = parseHandlerSignatures(source)
const structs = parseStructs(source)

const endpoints = routes.map((route) => {
  const sig = signatures.get(route.handler) ?? {
    requestType: null,
    queryType: null,
    pathType: null,
    responseType: null
  }

  return {
    ...route,
    requestType: sig.requestType,
    queryType: sig.queryType,
    pathType: sig.pathType,
    responseType: sig.responseType
  }
})

const usedTypes = new Set()
for (const endpoint of endpoints) {
  if (endpoint.requestType) usedTypes.add(endpoint.requestType)
  if (endpoint.queryType) usedTypes.add(endpoint.queryType)
  if (endpoint.pathType) usedTypes.add(endpoint.pathType)
  if (endpoint.responseType) usedTypes.add(endpoint.responseType)
}

const typeSchemas = {}
for (const typeName of [...usedTypes].sort()) {
  if (structs.has(typeName)) {
    typeSchemas[typeName] = structs.get(typeName)
  }
}

const generated = {
  generatedAt: new Date().toISOString(),
  sourceFile: 'crates/edgerun-scheduler/src/main.rs',
  sourceSha256: createHash('sha256').update(source).digest('hex'),
  endpointCount: endpoints.length,
  endpoints,
  typeSchemas
}

mkdirSync(outputDir, { recursive: true })
writeFileSync(outputPath, `${JSON.stringify(generated, null, 2)}\n`, 'utf8')

console.log(`Generated ${outputPath} from ${schedulerPath}`)
