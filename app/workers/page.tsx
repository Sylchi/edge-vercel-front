import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
        <section className="bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Become a Worker Node
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {'Earn rewards by executing WASM compute jobs. Stake SOL, maintain high uptime, and get paid for verified computation.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Join as Worker
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Network Stats */}
        <section className="py-12 bg-card/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Network Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Workers</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalWorkers}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{activeWorkers}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Network Uptime</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatPercentage(networkUptime)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Total Stake</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatSOL(totalStake, 0)}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Requirements */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Worker Requirements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hardware</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• 8+ vCPU cores</p>
                  <p>• 16+ GB RAM</p>
                  <p>• 100 GB SSD storage</p>
                  <p>• 1 Gbps network</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Stake</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Minimum: 50 SOL</p>
                  <p>• Recommended: 100 SOL</p>
                  <p>• Higher stake = more jobs</p>
                  <p>• Slashing for misbehavior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Software</CardTitle>
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
                
                <Button className="w-full sm:w-auto">
                  View Full Documentation
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
