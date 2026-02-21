import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { CodeBlock } from '@/components/docs/code-block'
import { Callout } from '@/components/docs/callout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'
import { getDocsPage } from '@/lib/docs-content'
import schedulerApi from '@/lib/generated/scheduler-api.json'

export default async function DocsDetailPage({
  params
}: {
  params: Promise<{ section: string; slug: string }>
}) {
  const { section, slug } = await params
  const page = getDocsPage(section, slug)

  if (!page) {
    notFound()
  }

  const isRestApi = section === 'api-reference' && slug === 'rest-api'
  const endpointPreview = schedulerApi.endpoints
    .filter((endpoint) => endpoint.path.startsWith('/v1') || endpoint.path === '/health')
    .sort((a, b) => a.path.localeCompare(b.path))

  const typeSchemas = schedulerApi.typeSchemas as Record<string, Array<{ name: string; type: string }>>

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex flex-1">
        <DocsSidebar />

        <main className="flex-1 bg-background">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold">{page.title}</h1>
                {page.status === 'live' ? (
                  <Badge variant="secondary" className="uppercase tracking-wide text-[10px]">
                    Live
                  </Badge>
                ) : (
                  <GeneratingIndicator />
                )}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{page.description}</p>
            </div>

            <Separator className="my-8" />

            {isRestApi ? (
              <div className="space-y-8">
                <Callout type="success">
                  This page is generated from the live scheduler source code and refreshes automatically before frontend dev/build.
                </Callout>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">Base URL</h2>
                  <CodeBlock code="http://127.0.0.1:8080" language="text" />
                  <p className="text-xs text-muted-foreground">
                    Generated at {new Date(schedulerApi.generatedAt).toLocaleString()}
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">Live Endpoints</h2>
                  <div className="space-y-4">
                    {endpointPreview.map((endpoint) => (
                      <Card key={`${endpoint.method}-${endpoint.path}`} className="border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3 text-base">
                            <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                              {endpoint.method}
                            </Badge>
                            <span className="font-mono">{endpoint.path}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                          <p>Handler: <code>{endpoint.handler}</code></p>
                          {endpoint.requestType && <p>Request: <code>{endpoint.requestType}</code></p>}
                          {endpoint.queryType && <p>Query: <code>{endpoint.queryType}</code></p>}
                          {endpoint.responseType && <p>Response: <code>{endpoint.responseType}</code></p>}
                          <CodeBlock
                            code={`curl -s ${endpoint.method === 'POST' ? '-X POST ' : ''}http://127.0.0.1:8080${endpoint.path.replace('{job_id}', '<job_id>').replace('{bundle_hash}', '<bundle_hash>')}`}
                            language="bash"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">Extracted Schemas</h2>
                  <div className="space-y-4">
                    {Object.entries(typeSchemas).map(([typeName, fields]) => (
                      <Card key={typeName} className="border-border">
                        <CardHeader>
                          <CardTitle className="text-base font-mono">{typeName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CodeBlock
                            language="text"
                            code={fields.map((field) => `${field.name}: ${field.type}`).join('\n')}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-6">
                <Callout type="info">
                  This document is not fully published yet. The implementation is in progress and this page is a live placeholder.
                </Callout>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Documentation Status</span>
                      <GeneratingIndicator />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>Writing and verification are in progress for this section.</p>
                    <p>Links stay available so navigation remains stable while content is being filled in.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  )
}
