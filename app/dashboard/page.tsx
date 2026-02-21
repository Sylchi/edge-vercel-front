'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'
import { mockJobs, mockDashboardStats } from '@/lib/mock-data'
import { fetchSchedulerJobStatus } from '@/lib/scheduler-client'
import { readSubmittedJobs } from '@/lib/submitted-jobs'
import { formatDuration, formatSOL, formatPercentage, formatRelativeTime, getStatusColor } from '@/lib/utils/format'
import type { DashboardStats, Job, JobStatus } from '@/lib/types'

function deriveJobStatusFromScheduler(payload: Awaited<ReturnType<typeof fetchSchedulerJobStatus>>): JobStatus {
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

export default function DashboardPage() {
  const [recentJobs, setRecentJobs] = useState<Job[]>(mockJobs.slice(0, 5))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadJobs() {
      const submitted = readSubmittedJobs()
      if (submitted.length === 0) {
        if (!cancelled) {
          setRecentJobs(mockJobs.slice(0, 5))
          setIsLoading(false)
        }
        return
      }

      const withStatuses = await Promise.all(
        submitted.slice(0, 20).map(async (submittedJob) => {
          try {
            const status = await fetchSchedulerJobStatus(submittedJob.id)
            const derivedStatus = deriveJobStatusFromScheduler(status)
            return {
              id: submittedJob.id,
              name: submittedJob.name,
              wasmHash: status.quorum?.expected_bundle_hash || submittedJob.id,
              status: derivedStatus,
              createdAt: submittedJob.createdAt,
              completedAt: status.quorum?.quorum_reached_at_unix_s
                ? new Date(status.quorum.quorum_reached_at_unix_s * 1000).toISOString()
                : undefined,
              runtime: 0,
              gasUsed: 0,
              executorCount: status.quorum?.committee_workers.length || 0,
              consensusReached: Boolean(status.quorum?.quorum_reached),
              settlementTx: status.quorum?.quorum_reached ? status.quorum.winning_output_hash || undefined : undefined,
              input: {
                fileName: submittedJob.inputFileName || submittedJob.wasmFileName,
                size: submittedJob.inputSize || submittedJob.wasmSize
              }
            } as Job
          } catch {
            return {
              id: submittedJob.id,
              name: submittedJob.name,
              wasmHash: submittedJob.id,
              status: 'pending',
              createdAt: submittedJob.createdAt,
              runtime: 0,
              gasUsed: 0,
              executorCount: 0,
              consensusReached: false,
              input: {
                fileName: submittedJob.inputFileName || submittedJob.wasmFileName,
                size: submittedJob.inputSize || submittedJob.wasmSize
              }
            } as Job
          }
        })
      )

      if (!cancelled) {
        setRecentJobs(withStatuses.slice(0, 5))
        setIsLoading(false)
      }
    }

    loadJobs()

    const intervalId = window.setInterval(loadJobs, 5000)
    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  const stats: DashboardStats = useMemo(() => {
    if (recentJobs.length === 0 || recentJobs[0].id.startsWith('job_')) {
      return mockDashboardStats
    }

    const completed = recentJobs.filter((job) => job.status === 'completed').length
    const active = recentJobs.filter((job) => job.status === 'running' || job.status === 'pending').length
    const successRate = recentJobs.length > 0 ? (completed / recentJobs.length) * 100 : 0

    return {
      totalJobs: recentJobs.length,
      activeJobs: active,
      completedJobs: completed,
      totalSpent: recentJobs.length * 0.025,
      avgRuntime: 0,
      successRate
    }
  }, [recentJobs])

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 bg-background">
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Monitor your compute jobs and spending</p>
              </div>
              <Button disabled className="grayscale opacity-60 cursor-not-allowed">
                Connect Wallet
                <GeneratingIndicator className="text-[9px]" />
              </Button>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Wallet</p>
                    <p className="font-mono text-lg">Not Connected</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-bold">--</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalJobs}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stats.activeJobs} active • {stats.completedJobs} completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatSOL(stats.totalSpent)}</p>
                  <p className="text-sm text-muted-foreground mt-2">Estimated escrow from submitted jobs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Avg Runtime</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.avgRuntime > 0 ? formatDuration(stats.avgRuntime) : '--'}</p>
                  <p className="text-sm text-muted-foreground mt-2">{formatPercentage(stats.successRate)} success rate</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Jobs</h2>
                <Link href="/run">
                  <Button variant="outline">Run New Job</Button>
                </Link>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {isLoading && (
                      <div className="p-6 text-sm text-muted-foreground">Loading jobs...</div>
                    )}
                    {!isLoading && recentJobs.length === 0 && (
                      <div className="p-6 text-sm text-muted-foreground">No jobs found. Submit one from Run page.</div>
                    )}
                    {recentJobs.map((job) => (
                      <Link key={job.id} href={`/job/${job.id}`} className="block p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{job.name}</h3>
                              <Badge variant={getStatusColor(job.status)} className="text-xs">{job.status}</Badge>
                            </div>
                            <p className="text-sm font-mono text-muted-foreground">{job.id}</p>
                          </div>

                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                              <p className="text-sm font-semibold">{job.runtime > 0 ? formatDuration(job.runtime) : '--'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Workers</p>
                              <p className="text-sm font-semibold">{job.executorCount || '--'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Created</p>
                              <p className="text-sm font-semibold">{formatRelativeTime(job.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
