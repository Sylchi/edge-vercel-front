import { getRouteEntries, getSiteUrl } from '@/lib/site-metadata'

function renderLlmsText() {
  const siteUrl = getSiteUrl()
  const routes = getRouteEntries()

  const liveRoutes = routes.filter((route) => route.status === 'live')
  const generatingRoutes = routes.filter((route) => route.status === 'generating')

  return [
    '# Edgerun',
    '',
    '> Deterministic WASM compute with cryptographic proof settlement on Solana.',
    '',
    `Website: ${siteUrl}`,
    `Docs: ${siteUrl}/docs`,
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
    '## Live Routes',
    ...liveRoutes.map((route) => `- ${siteUrl}${route.path}`),
    '',
    '## Generating Routes',
    ...generatingRoutes.map((route) => `- ${siteUrl}${route.path} (generating)`),
    '',
    `Generated: ${new Date().toISOString()}`
  ].join('\n')
}

export async function GET() {
  return new Response(renderLlmsText(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  })
}

