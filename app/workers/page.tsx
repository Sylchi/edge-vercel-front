import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'
import { mockWorkers } from '@/lib/mock-data'
import { formatPercentage, formatSOL, formatRelativeTime, getStatusColor } from '@/lib/utils/format'

export default function WorkersPage() {
  const totalWorkers = 247
  const activeWorkers = 189
  const networkUptime = 99.7
  const totalStake = 12450
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="bg-background py-20 relative overflow-hidden">
          {/* Subtle background animation hint */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-primary">{activeWorkers} WORKERS ACTIVE NOW</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Stake Capital. Execute Jobs. Earn Fees.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {'Workers compete for jobs. Correct results earn fees. Incorrect results lose stake. Market forces determine pricing.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-semibold grayscale opacity-60 cursor-not-allowed" disabled>
                  Join as Worker
                  <GeneratingIndicator className="text-[9px]" />
                </Button>
                <Button size="lg" variant="outline" className="grayscale opacity-60 cursor-not-allowed" disabled>
                  Economics Documentation
                  <GeneratingIndicator className="text-[9px]" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Network Stats - Economic Engine Feeling */}
        <section className="py-12 bg-card/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Live Network Activity</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Real-time</span>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Workers</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalWorkers}</p>
                  <p className="text-xs text-green-500 mt-1">↑ 12 this week</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{activeWorkers}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatPercentage((activeWorkers/totalWorkers)*100)} online</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Network Uptime</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatPercentage(networkUptime)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Stake</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatSOL(totalStake, 0)}</p>
                  <p className="text-xs text-green-500 mt-1">↑ {formatSOL(450, 0)} today</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Requirements - Economic Focus */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-2">Worker Requirements</h2>
            <p className="text-muted-foreground mb-8">Entry barriers exist to ensure quality. Competition rewards the best.</p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Hardware</span>
                    <Badge variant="secondary" className="text-xs">Required</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• 8+ vCPU cores</p>
                  <p>• 16+ GB RAM</p>
                  <p>• 100 GB SSD storage</p>
                  <p>• 1 Gbps network</p>
                </CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Stake</span>
                    <Badge className="text-xs">Financial</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p className="text-foreground font-semibold">• Min: 50 SOL (~$7,500)</p>
                  <p>• Recommended: 100 SOL</p>
                  <p className="text-green-500">• Higher stake → More jobs</p>
                  <p className="text-destructive">• Wrong outputs → Slashed</p>
                </CardContent>
              </Card>
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Software</span>
                    <Badge variant="secondary" className="text-xs">Required</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Ubuntu 22.04+ or similar</p>
                  <p>• Docker installed</p>
                  <p>• Edgerun worker client</p>
                  <p>• Solana wallet</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Installation */}
        <section className="py-16 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Quick Start</h2>
            <Card>
              <CardHeader>
                <CardTitle>Install Worker Node</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Install the Edgerun worker client using our installation script:
                  </p>
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <code className="text-sm font-mono">
                      {'curl -sSL https://edgerun.io/install.sh | bash'}
                    </code>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure your worker with your Solana wallet:
                  </p>
                  <div className="p-4 bg-background rounded-lg border border-border space-y-2">
                    <code className="text-sm font-mono block">edgerun init --wallet /path/to/wallet.json</code>
                    <code className="text-sm font-mono block">edgerun stake 100</code>
                    <code className="text-sm font-mono block">edgerun start</code>
                  </div>
                </div>
                
                <Button className="w-full sm:w-auto grayscale opacity-60 cursor-not-allowed" disabled>
                  View Full Documentation
                  <GeneratingIndicator className="text-[9px]" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Top Workers */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Top Workers</h2>
            <div className="grid gap-4">
              {mockWorkers.map((worker, index) => (
                <Card key={worker.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Worker Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg border border-primary/20">
                          <span className="text-lg font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-mono font-semibold">{worker.name}</p>
                            <Badge variant={getStatusColor(worker.status)} className="text-xs">
                              {worker.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {worker.hardware.cpu} • {worker.hardware.memory} • {worker.hardware.region}
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                          <p className="text-sm font-semibold">{formatPercentage(worker.uptime)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                          <p className="text-sm font-semibold">{formatPercentage(worker.successRate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Total Jobs</p>
                          <p className="text-sm font-semibold">{worker.totalJobs.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Stake</p>
                          <p className="text-sm font-semibold">{formatSOL(worker.stake, 0)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
