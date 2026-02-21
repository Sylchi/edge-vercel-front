import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { CodeBlock } from '@/components/docs/code-block'
import { Callout } from '@/components/docs/callout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'

export default function QuickStartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex flex-1">
        <DocsSidebar />

        <main className="flex-1 bg-background">
          <article className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">Quick Start</h1>
                <Badge variant="secondary" className="uppercase tracking-wide text-[10px]">
                  Live
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This quick start reflects functionality that is already implemented: scheduler job create/status APIs and the wired frontend run/job pages.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Start Scheduler</h2>
                <CodeBlock code="cargo run -p edgerun-scheduler" language="bash" />
                <p className="text-sm text-muted-foreground">
                  Default address is <code>127.0.0.1:8080</code>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Verify API Health</h2>
                <CodeBlock code="curl -s http://127.0.0.1:8080/health" language="bash" />
                <CodeBlock
                  code={`{
  "ok": true,
  "service": "edgerun-scheduler"
}`}
                  language="json"
                />
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Run Frontend</h2>
                <CodeBlock
                  code={`cd frontend
pnpm install
NEXT_PUBLIC_EDGERUN_SCHEDULER_URL=http://127.0.0.1:8080 pnpm dev`}
                  language="bash"
                />
                <p className="text-sm text-muted-foreground">
                  Open <code>/run</code>, submit a WASM job, then track it in <code>/job/&lt;id&gt;</code> and <code>/dashboard</code>.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Direct API Submission (Optional)</h2>
                <CodeBlock
                  code={`curl -s -X POST http://127.0.0.1:8080/v1/job/create \\
  -H "Content-Type: application/json" \\
  -d '{
    "runtime_id": "1111111111111111111111111111111111111111111111111111111111111111",
    "wasm_base64": "AGFzbQEAAA...",
    "input_base64": "",
    "limits": {
      "max_memory_bytes": 67108864,
      "max_instructions": 20000000
    },
    "escrow_lamports": 25000000
  }'`}
                  language="bash"
                />
                <CodeBlock code="curl -s http://127.0.0.1:8080/v1/job/<job_id>" language="bash" />
              </section>

              <Separator className="my-8" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Generating Sections</h2>
                <Callout type="info">
                  The following docs are intentionally listed but still being generated because those interfaces are not fully delivered yet.
                </Callout>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between gap-2">
                        <span>SDK Walkthrough</span>
                        <GeneratingIndicator />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      JavaScript/TypeScript SDK usage examples are being prepared.
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between gap-2">
                        <span>Worker Onboarding</span>
                        <GeneratingIndicator />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Full worker install, staking, and operations docs are in progress.
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-bold">Next Docs</h2>
                <div className="flex flex-wrap gap-3">
                  <Link href="/docs/api-reference/rest-api" className="text-primary hover:underline">
                    REST API Reference
                  </Link>
                  <Link href="/docs/core-concepts/jobs" className="text-primary hover:underline">
                    Core Concepts: Jobs
                  </Link>
                </div>
              </section>
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  )
}
