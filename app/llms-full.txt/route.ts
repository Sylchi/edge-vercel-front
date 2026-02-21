import schedulerApi from '@/lib/generated/scheduler-api.json'
import { docsSections } from '@/lib/docs-content'
import { getRouteEntries, getSiteUrl } from '@/lib/site-metadata'

function renderFullLlmsText() {
  const siteUrl = getSiteUrl()
  const routes = getRouteEntries()
  const endpointLines = schedulerApi.endpoints
    .map((endpoint) => `- ${endpoint.method} ${endpoint.path} -> ${endpoint.handler}`)
    .sort((a, b) => a.localeCompare(b))

  return [
    '# Edgerun Full Context',
    '',
    `Website: ${siteUrl}`,
    '',
    '## Product Summary',
    'Edgerun is a deterministic WASM compute platform with cryptographic proof settlement on Solana.',
    '',
    '## Documentation Sections',
    ...docsSections.map((section) => `- ${section.title}: ${siteUrl}/docs/${section.slug}`),
    '',
    '## Routes',
    ...routes.map((route) => `- ${siteUrl}${route.path} [${route.status}]`),
    '',
    '## Scheduler API Endpoints (Generated from source)',
    ...endpointLines,
    '',
    `Scheduler Source: ${schedulerApi.sourceFile}`,
    `Scheduler Source SHA256: ${schedulerApi.sourceSha256}`,
    `Generated At: ${schedulerApi.generatedAt}`
  ].join('\n')
}

export async function GET() {
  return new Response(renderFullLlmsText(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  })
}

