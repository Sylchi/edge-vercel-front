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
        {/* Header */}
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{job.name}</h1>
                  <Badge variant={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm font-mono text-muted-foreground">
                  {'Job ID: '}
                  {job.id}
                </p>
              </div>
              <Link href="/run">
                <Button variant="outline">Run New Job</Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Runtime</p>
                <p className="text-xl font-semibold">{formatDuration(job.runtime)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gas Used</p>
                <p className="text-xl font-semibold">{formatGas(job.gasUsed)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Workers</p>
                <p className="text-xl font-semibold">{job.executorCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Consensus</p>
                <p className="text-xl font-semibold">
                  {job.consensusReached ? '✓ Reached' : '⋯ Pending'}
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
              
              {/* Results */}
              {job.results && job.results.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Execution Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.results.map((result) => (
                        <div
                          key={result.workerId}
                          className="p-4 bg-muted rounded-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{result.workerName}</span>
                              <Badge variant={getStatusColor(result.status)} className="text-xs">
                                {result.status}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDuration(result.runtime)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Output Hash</p>
                            <p className="text-xs font-mono break-all">{formatHash(result.outputHash, 16, 12)}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Gas: {formatGas(result.gasUsed)}</span>
                            <span className="text-muted-foreground">{formatDate(result.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Timeline Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timelineEvents.map((event, index) => (
                      <div key={event.id} className="relative">
                        <div className="flex gap-3">
                          {/* Timeline Indicator */}
                          <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${
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
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-semibold">{event.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {event.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(event.timestamp)}
                            </p>
                            {event.data?.txHash && (
                              <p className="text-xs font-mono text-primary mt-2">
                                {formatHash(event.data.txHash, 8, 6)}
                              </p>
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
