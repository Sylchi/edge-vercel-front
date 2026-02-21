import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { mockJobs, mockTimelineEvents } from '@/lib/mock-data'
import { formatHash, formatDuration, formatSOL, formatGas, formatDate, getStatusColor } from '@/lib/utils/format'
import Link from 'next/link'

export default async function JobDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = mockJobs[0] // Use first mock job for demo
  const timelineEvents = mockTimelineEvents
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Header - Surgical, Precise */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getStatusColor(job.status)} className="text-xs font-mono">
                    {job.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">{job.id}</span>
                </div>
                <h1 className="text-2xl font-mono font-semibold">{job.name}</h1>
              </div>
              <Link href="/run">
                <Button variant="outline" size="sm">Execute New</Button>
              </Link>
            </div>
            
            {/* Stats - Clean Grid */}
            <div className="grid grid-cols-4 gap-px bg-border">
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">RUNTIME</p>
                <p className="text-lg font-mono font-semibold">{formatDuration(job.runtime)}</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">GAS</p>
                <p className="text-lg font-mono font-semibold">{formatGas(job.gasUsed)}</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">WORKERS</p>
                <p className="text-lg font-mono font-semibold">{job.executorCount}/{job.executorCount}</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">CONSENSUS</p>
                <p className="text-lg font-mono font-semibold">
                  {job.consensusReached ? '✓' : '⋯'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">WASM Hash</p>
                      <p className="text-sm font-mono break-all">{formatHash(job.wasmHash, 12, 8)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Created At</p>
                      <p className="text-sm">{formatDate(job.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Input File</p>
                      <p className="text-sm">{job.input.fileName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">File Size</p>
                      <p className="text-sm">{(job.input.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  {job.settlementTx && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Settlement Transaction</p>
                        <p className="text-sm font-mono break-all text-primary">{job.settlementTx}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* Results - Minimal, Surgical */}
              {job.results && job.results.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-mono">Worker Outputs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {job.results.map((result) => (
                        <div
                          key={result.workerId}
                          className="p-3 bg-background border border-border rounded space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs">{result.workerName}</span>
                              <Badge variant={getStatusColor(result.status)} className="text-xs font-mono">
                                {result.status.toUpperCase()}
                              </Badge>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">
                              {formatDuration(result.runtime)}
                            </span>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <p className="text-xs font-mono text-muted-foreground mb-1">OUTPUT_HASH</p>
                            <p className="text-xs font-mono break-all">{formatHash(result.outputHash, 16, 12)}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-muted-foreground">GAS: {formatGas(result.gasUsed)}</span>
                            <span className="text-muted-foreground">{formatDate(result.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Timeline Sidebar - Precise State Machine */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 border-l-2 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-base font-mono">State Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {timelineEvents.map((event, index) => (
                      <div key={event.id} className="relative">
                        <div className="flex gap-3">
                          {/* Timeline Indicator */}
                          <div className="flex flex-col items-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              event.type === 'settled' ? 'bg-primary' :
                              event.type === 'completed' ? 'bg-accent' :
                              event.type === 'failed' ? 'bg-destructive' :
                              'bg-muted-foreground'
                            }`} />
                            {index < timelineEvents.length - 1 && (
                              <div className="w-px h-full bg-border mt-1" />
                            )}
                          </div>
                          
                          {/* Event Content */}
                          <div className="flex-1 pb-3">
                            <p className="text-xs font-mono font-semibold uppercase tracking-wide">{event.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                              {event.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                              {formatDate(event.timestamp)}
                            </p>
                            {event.data?.txHash && (
                              <div className="mt-2 p-2 bg-primary/5 border border-primary/20 rounded">
                                <p className="text-xs font-mono text-primary">
                                  {formatHash(event.data.txHash, 8, 6)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
