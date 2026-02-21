'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatHash, formatDuration, formatGas, formatDate, getStatusColor } from '@/lib/utils/format'
import { fetchSchedulerJobStatus, JobStatusResponse } from '@/lib/scheduler-client'
import { readSubmittedJobs } from '@/lib/submitted-jobs'

function deriveStatus(payload: JobStatusResponse): 'pending' | 'running' | 'completed' | 'failed' {
  if (payload.quorum?.quorum_reached) {
    return 'completed'
  }
  if (payload.failures.length > 0 && payload.reports.length === 0) {
    return 'failed'
  }
  if (payload.reports.length > 0 || payload.failures.length > 0) {
    return 'running'
  }
  return 'pending'
}

export default function JobDetailsPage() {
  const params = useParams<{ id: string }>()
  const jobId = params.id
  const { publicKey } = useWallet()
  const walletAddress = publicKey?.toBase58() ?? null

  const [statusPayload, setStatusPayload] = useState<JobStatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const submittedJob = useMemo(() => {
    return readSubmittedJobs(walletAddress).find((job) => job.id === jobId) ?? null
  }, [jobId, walletAddress])
  const jobName = submittedJob?.name ?? 'Compute Job'
  const createdAt = submittedJob?.createdAt ?? null

  useEffect(() => {
    if (!jobId) {
      return
    }

    let cancelled = false

    async function refreshStatus() {
      try {
        const payload = await fetchSchedulerJobStatus(jobId)
        if (!cancelled) {
          setStatusPayload(payload)
          setError(null)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load job status')
          setLoading(false)
        }
      }
    }

    void refreshStatus()
    const intervalId = window.setInterval(() => {
      void refreshStatus()
    }, 3000)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [jobId])

  const jobStatus = useMemo(() => {
    if (!statusPayload) {
      return 'pending'
    }
    return deriveStatus(statusPayload)
  }, [statusPayload])

  const runtime = useMemo(() => {
    if (!statusPayload?.quorum?.quorum_reached_at_unix_s || !createdAt) {
      return 0
    }
    const completed = statusPayload.quorum.quorum_reached_at_unix_s * 1000
    const created = Date.parse(createdAt)
    if (Number.isNaN(created)) {
      return 0
    }
    return Math.max(0, completed - created)
  }, [statusPayload, createdAt])

  const quorum = statusPayload?.quorum

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 bg-background">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getStatusColor(jobStatus)} className="text-xs font-mono">{jobStatus.toUpperCase()}</Badge>
                  <span className="text-xs font-mono text-muted-foreground break-all">{jobId}</span>
                </div>
                <h1 className="text-2xl font-mono font-semibold">{jobName}</h1>
              </div>
              <Link href="/run">
                <Button variant="outline" size="sm">Execute New</Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">RUNTIME</p>
                <p className="text-lg font-mono font-semibold">{runtime > 0 ? formatDuration(runtime) : '--'}</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">REPORTS</p>
                <p className="text-lg font-mono font-semibold">{statusPayload?.reports.length ?? 0}</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">WORKERS</p>
                <p className="text-lg font-mono font-semibold">{quorum?.committee_workers.length ?? 0}</p>
              </div>
              <div className="bg-card p-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">CONSENSUS</p>
                <p className="text-lg font-mono font-semibold">{quorum?.quorum_reached ? 'YES' : 'NO'}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading && <p className="text-sm text-muted-foreground">Loading job status...</p>}
                  {error && <p className="text-sm text-destructive">{error}</p>}

                  {!loading && !error && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Bundle Hash</p>
                        <p className="text-sm font-mono break-all">
                          {formatHash(quorum?.expected_bundle_hash || jobId, 12, 8)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Created At</p>
                        <p className="text-sm">{createdAt ? formatDate(createdAt) : '--'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Runtime ID</p>
                        <p className="text-sm font-mono break-all">
                          {formatHash(quorum?.expected_runtime_id || '--', 12, 8)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Failures</p>
                        <p className="text-sm">{statusPayload?.failures.length ?? 0}</p>
                      </div>
                    </div>
                  )}

                  {quorum?.winning_output_hash && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Winning Output Hash</p>
                        <p className="text-sm font-mono break-all text-primary">{quorum.winning_output_hash}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {statusPayload && statusPayload.reports.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-mono">Worker Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {statusPayload.reports.map((report) => (
                        <div key={`${report.worker_pubkey}-${report.output_hash}`} className="p-3 bg-background border border-border rounded space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs">{formatHash(report.worker_pubkey, 8, 6)}</span>
                              <Badge variant="secondary" className="text-xs font-mono">SUCCESS</Badge>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">len={report.output_len}</span>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <p className="text-xs font-mono text-muted-foreground mb-1">OUTPUT_HASH</p>
                            <p className="text-xs font-mono break-all">{formatHash(report.output_hash, 16, 12)}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-muted-foreground">GAS: {formatGas(0)}</span>
                            <span className="text-muted-foreground">timestamp unavailable</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {statusPayload && statusPayload.failures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-mono">Failures</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {statusPayload.failures.map((failure) => (
                      <div key={`${failure.worker_pubkey}-${failure.error_code}`} className="p-3 border border-destructive/30 bg-destructive/5 rounded">
                        <p className="text-sm font-mono">{formatHash(failure.worker_pubkey, 8, 6)}</p>
                        <p className="text-xs text-muted-foreground mt-1">{failure.phase} / {failure.error_code}</p>
                        <p className="text-xs mt-1">{failure.error_message}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20 border-l-2 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-base font-mono">State Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          <div className="w-px h-full bg-border mt-1" />
                        </div>
                        <div className="flex-1 pb-3">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wide">Submitted</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">Job accepted by frontend and submitted to scheduler</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">{createdAt ? formatDate(createdAt) : '--'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${quorum?.committee_workers.length ? 'bg-accent' : 'bg-muted-foreground'}`} />
                          <div className="w-px h-full bg-border mt-1" />
                        </div>
                        <div className="flex-1 pb-3">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wide">Assigned</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">Workers assigned: {quorum?.committee_workers.length ?? 0}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${(statusPayload?.reports.length ?? 0) > 0 ? 'bg-primary' : 'bg-muted-foreground'}`} />
                          <div className="w-px h-full bg-border mt-1" />
                        </div>
                        <div className="flex-1 pb-3">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wide">Reports</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">Worker reports: {statusPayload?.reports.length ?? 0}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${quorum?.quorum_reached ? 'bg-primary' : 'bg-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 pb-3">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wide">Quorum</p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">Reached: {quorum?.quorum_reached ? 'yes' : 'no'}</p>
                          {quorum?.quorum_reached_at_unix_s && (
                            <p className="text-xs text-muted-foreground mt-1 font-mono">{formatDate(new Date(quorum.quorum_reached_at_unix_s * 1000).toISOString())}</p>
                          )}
                        </div>
                      </div>
                    </div>
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
