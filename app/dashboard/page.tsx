'use client'

import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockJobs, mockDashboardStats } from '@/lib/mock-data'
import { formatDuration, formatSOL, formatPercentage, formatRelativeTime, getStatusColor } from '@/lib/utils/format'

export default function DashboardPage() {
  const stats = mockDashboardStats
  const recentJobs = mockJobs.slice(0, 5)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor your compute jobs and spending
                </p>
              </div>
              <Button>Connect Wallet</Button>
            </div>
            
            {/* Wallet Info Card */}
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
        
        {/* Stats Grid */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.totalJobs}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stats.activeJobs} active • {stats.completedJobs} completed
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatSOL(stats.totalSpent)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Lifetime compute costs
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Avg Runtime</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatDuration(stats.avgRuntime)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formatPercentage(stats.successRate)} success rate
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Jobs */}
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
                    {recentJobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/job/${job.id}`}
                        className="block p-6 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Job Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{job.name}</h3>
                              <Badge variant={getStatusColor(job.status)} className="text-xs">
                                {job.status}
                              </Badge>
                            </div>
                            <p className="text-sm font-mono text-muted-foreground">
                              {job.id}
                            </p>
                          </div>
                          
                          {/* Job Stats */}
                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                              <p className="text-sm font-semibold">
                                {job.runtime > 0 ? formatDuration(job.runtime) : '--'}
                              </p>
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
