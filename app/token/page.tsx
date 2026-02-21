'use client'

import { useState } from 'react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'
import { 
  mockTokenStats, 
  mockStakingPools, 
  mockTransactions, 
  mockDisputes,
  mockSlashingEvents,
  mockRewardClaims
} from '@/lib/mock-data'
import { formatSOL, formatUSD, formatDate, formatPercentage, formatHash } from '@/lib/utils/format'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Shield, Coins, AlertTriangle, CheckCircle, Clock, Vote, Zap } from 'lucide-react'

export default function TokenPage() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null)
  const [stakeAmount, setStakeAmount] = useState('')
  
  const stats = mockTokenStats
  const totalRewardsClaimable = mockRewardClaims
    .filter(r => r.claimable && !r.claimed)
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        {/* Hero Stats */}
        <section className="bg-background border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <h1 className="text-3xl sm:text-4xl font-bold">EDGE Token</h1>
              <Badge className="ml-2">Live</Badge>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <p className="text-xs font-mono text-muted-foreground">PRICE</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatUSD(stats.price)}</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.4% (24h)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-accent">
                <CardHeader className="pb-2">
                  <p className="text-xs font-mono text-muted-foreground">MARKET CAP</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatUSD(stats.marketCap, 0)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rank #247
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <p className="text-xs font-mono text-muted-foreground">TOTAL STAKED</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatSOL(stats.totalStaked, 0)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatPercentage((stats.totalStaked / stats.circulatingSupply) * 100)} of supply
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <p className="text-xs font-mono text-muted-foreground">STAKING APY</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatPercentage(stats.stakingAPY)}</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3" />
                    Variable rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button className="font-semibold grayscale opacity-60 cursor-not-allowed" disabled>
                <Coins className="w-4 h-4 mr-2" />
                Buy EDGE
                <GeneratingIndicator className="text-[9px]" />
              </Button>
              <Button variant="outline" className="grayscale opacity-60 cursor-not-allowed" disabled>
                <Users className="w-4 h-4 mr-2" />
                Stake Tokens
                <GeneratingIndicator className="text-[9px]" />
              </Button>
              <Button variant="outline" className="grayscale opacity-60 cursor-not-allowed" disabled>
                <Shield className="w-4 h-4 mr-2" />
                View Governance
                <GeneratingIndicator className="text-[9px]" />
              </Button>
            </div>

            <Card className="mt-8 border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mb-3">
                  Reference
                </p>
                <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-balance">
                  "I think compute will be the currency of the future. I think it'll be maybe the most precious commodity in the world."
                </blockquote>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>Sam Altman on the Lex Fridman Podcast</span>
                  <a
                    href="https://www.youtube.com/watch?v=jvqFAi7vkBc&t=2s"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Watch source
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="staking" className="space-y-8">
              <TabsList className="w-full max-w-3xl mx-auto flex overflow-x-auto md:grid md:grid-cols-5">
                <TabsTrigger value="staking" className="shrink-0">Staking</TabsTrigger>
                <TabsTrigger value="transactions" className="shrink-0">Transactions</TabsTrigger>
                <TabsTrigger value="rewards" className="shrink-0">Rewards</TabsTrigger>
                <TabsTrigger value="disputes" className="shrink-0">Disputes</TabsTrigger>
                <TabsTrigger value="slashing" className="shrink-0">Slashing</TabsTrigger>
              </TabsList>

              {/* Staking Pools */}
              <TabsContent value="staking" className="space-y-6">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold mb-2">Staking Pools</h2>
                  <p className="text-muted-foreground">
                    Stake EDGE tokens to earn rewards and participate in network security
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {mockStakingPools.map((pool) => (
                    <Card 
                      key={pool.id}
                      className={`hover:border-primary/50 transition-colors cursor-pointer ${
                        selectedPool === pool.id ? 'border-primary' : ''
                      }`}
                      onClick={() => setSelectedPool(pool.id)}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{pool.name}</span>
                          <Badge variant="secondary" className="text-xs font-mono">
                            {formatPercentage(pool.apy)} APY
                          </Badge>
                        </CardTitle>
                        <CardDescription className="font-mono text-xs">
                          {formatSOL(pool.totalStaked, 0)} staked
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Participants</span>
                            <span className="font-mono">{pool.participants.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Min Stake</span>
                            <span className="font-mono">{formatSOL(pool.minStake)} EDGE</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lock Period</span>
                            <span className="font-mono">{pool.lockPeriod} days</span>
                          </div>
                        </div>

                        {pool.yourStake && (
                          <div className="pt-3 border-t border-border">
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Your Stake</span>
                                <span className="font-mono font-semibold text-primary">
                                  {formatSOL(pool.yourStake)} EDGE
                                </span>
                              </div>
                              {pool.rewards && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Pending Rewards</span>
                                  <span className="font-mono font-semibold text-green-500">
                                    +{formatSOL(pool.rewards)} EDGE
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <Button className="w-full grayscale opacity-60 cursor-not-allowed" variant={pool.yourStake ? "outline" : "default"} disabled>
                          {pool.yourStake ? 'Manage Stake' : 'Stake Now'}
                          <GeneratingIndicator className="text-[9px]" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Stake Interface */}
                {selectedPool && (
                  <Card className="max-w-2xl mx-auto border-primary/50">
                    <CardHeader>
                      <CardTitle>Stake Tokens</CardTitle>
                      <CardDescription>
                        Selected pool: {mockStakingPools.find(p => p.id === selectedPool)?.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Amount (EDGE)</label>
                        <Input 
                          type="number" 
                          placeholder="0.00"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="font-mono"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Available: 1,234.56 EDGE
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated APY</span>
                          <span className="font-mono font-semibold">
                            {formatPercentage(mockStakingPools.find(p => p.id === selectedPool)?.apy || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual Rewards</span>
                          <span className="font-mono font-semibold text-green-500">
                            ~{formatSOL(parseFloat(stakeAmount || '0') * (mockStakingPools.find(p => p.id === selectedPool)?.apy || 0) / 100)} EDGE
                          </span>
                        </div>
                      </div>
                      <Button className="w-full grayscale opacity-60 cursor-not-allowed" disabled>
                        Stake {stakeAmount || '0'} EDGE
                        <GeneratingIndicator className="text-[9px]" />
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Transactions */}
              <TabsContent value="transactions" className="space-y-6">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold mb-2">Transaction History</h2>
                  <p className="text-muted-foreground">
                    All token transactions including stakes, rewards, and payments
                  </p>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {mockTransactions.map((tx) => (
                        <div key={tx.id} className="p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              {/* Icon */}
                              <div className={`p-2 rounded-lg ${
                                tx.type === 'reward' ? 'bg-green-500/10 text-green-500' :
                                tx.type === 'stake' ? 'bg-blue-500/10 text-blue-500' :
                                tx.type === 'unstake' ? 'bg-orange-500/10 text-orange-500' :
                                tx.type === 'slash' ? 'bg-red-500/10 text-red-500' :
                                'bg-purple-500/10 text-purple-500'
                              }`}>
                                {tx.type === 'reward' ? <Coins className="w-4 h-4" /> :
                                 tx.type === 'stake' ? <ArrowDownRight className="w-4 h-4" /> :
                                 tx.type === 'unstake' ? <ArrowUpRight className="w-4 h-4" /> :
                                 tx.type === 'slash' ? <AlertTriangle className="w-4 h-4" /> :
                                 <Zap className="w-4 h-4" />}
                              </div>

                              {/* Details */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary" className="text-xs font-mono uppercase">
                                    {tx.type}
                                  </Badge>
                                  <Badge variant={tx.status === 'confirmed' ? 'default' : 'outline'} className="text-xs">
                                    {tx.status}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium mb-1">{tx.description}</p>
                                <p className="text-xs font-mono text-muted-foreground">
                                  {formatHash(tx.txHash, 12, 8)}
                                </p>
                              </div>
                            </div>

                            {/* Amount & Time */}
                            <div className="text-right">
                              <p className={`text-lg font-mono font-semibold ${
                                tx.type === 'reward' || tx.type === 'unstake' ? 'text-green-500' :
                                tx.type === 'slash' ? 'text-destructive' :
                                'text-foreground'
                              }`}>
                                {tx.type === 'reward' || tx.type === 'unstake' ? '+' : '-'}
                                {formatSOL(tx.amount)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(tx.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Rewards */}
              <TabsContent value="rewards" className="space-y-6">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold mb-2">Reward Collection</h2>
                  <p className="text-muted-foreground">
                    Claim your accumulated rewards from staking and network participation
                  </p>
                </div>

                {/* Claimable Summary */}
                <Card className="max-w-2xl mx-auto border-primary/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Total Claimable</span>
                      <span className="text-3xl font-mono text-primary">
                        {formatSOL(totalRewardsClaimable)} EDGE
                      </span>
                    </CardTitle>
                    <CardDescription>
                      ≈ {formatUSD(totalRewardsClaimable * stats.price)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full grayscale opacity-60 cursor-not-allowed" size="lg" disabled>
                      <Coins className="w-4 h-4 mr-2" />
                      Claim All Rewards
                      <GeneratingIndicator className="text-[9px]" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Individual Rewards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {mockRewardClaims.map((reward) => (
                    <Card key={reward.id} className={!reward.claimed && reward.claimable ? 'border-primary/30' : ''}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant={
                            reward.source === 'staking' ? 'default' :
                            reward.source === 'compute' ? 'secondary' :
                            'outline'
                          }>
                            {reward.source}
                          </Badge>
                          {reward.claimed && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {!reward.claimed && reward.claimable && <Clock className="w-4 h-4 text-primary" />}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-2xl font-mono font-bold">
                            {formatSOL(reward.amount)} EDGE
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Earned: {reward.earned}
                          </p>
                        </div>
                        
                        {reward.claimed ? (
                          <div className="text-xs text-muted-foreground">
                            Claimed on {formatDate(reward.claimedAt!)}
                          </div>
                        ) : reward.claimable ? (
                          <Button className="w-full grayscale opacity-60 cursor-not-allowed" size="sm" disabled>
                            Claim Reward
                            <GeneratingIndicator className="text-[9px]" />
                          </Button>
                        ) : (
                          <Button className="w-full" size="sm" variant="outline" disabled>
                            Not Yet Claimable
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Disputes */}
              <TabsContent value="disputes" className="space-y-6">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold mb-2">Dispute Resolution</h2>
                  <p className="text-muted-foreground">
                    Community-driven dispute resolution with token-weighted voting
                  </p>
                </div>

                <div className="space-y-4">
                  {mockDisputes.map((dispute) => (
                    <Card key={dispute.id} className={
                      dispute.status === 'voting' ? 'border-primary/50' :
                      dispute.status === 'resolved' ? 'border-green-500/50' :
                      'border-border'
                    }>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={
                                dispute.status === 'voting' ? 'default' :
                                dispute.status === 'resolved' ? 'secondary' :
                                'outline'
                              } className="font-mono">
                                {dispute.status.toUpperCase()}
                              </Badge>
                              <span className="text-xs font-mono text-muted-foreground">
                                {dispute.id}
                              </span>
                            </div>
                            <CardTitle className="text-lg">{dispute.jobName}</CardTitle>
                            <CardDescription className="font-mono text-xs">
                              Job: {dispute.jobId}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Stake at Risk</p>
                            <p className="text-xl font-mono font-bold text-destructive">
                              {formatSOL(dispute.amount)} EDGE
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-3 bg-muted rounded-lg text-sm">
                          <p className="font-semibold mb-1">Reason:</p>
                          <p className="text-muted-foreground">{dispute.reason}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Initiator</p>
                            <p className="font-mono text-xs">{dispute.initiator}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Defendant</p>
                            <p className="font-mono text-xs">{dispute.defendant}</p>
                          </div>
                        </div>

                        {dispute.votes && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Voting Progress</span>
                              <span className="font-mono">
                                {dispute.votes.for + dispute.votes.against} / {dispute.votes.required}
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                              <div 
                                className="bg-green-500"
                                style={{ width: `${(dispute.votes.for / dispute.votes.required) * 100}%` }}
                              />
                              <div 
                                className="bg-destructive"
                                style={{ width: `${(dispute.votes.against / dispute.votes.required) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>For: {dispute.votes.for}</span>
                              <span>Against: {dispute.votes.against}</span>
                            </div>
                          </div>
                        )}

                        {dispute.status === 'voting' && (
                          <div className="flex gap-2">
                            <Button className="flex-1 grayscale opacity-60 cursor-not-allowed" variant="default" disabled>
                              <Vote className="w-4 h-4 mr-2" />
                              Vote For
                              <GeneratingIndicator className="text-[9px]" />
                            </Button>
                            <Button className="flex-1 grayscale opacity-60 cursor-not-allowed" variant="outline" disabled>
                              <Vote className="w-4 h-4 mr-2" />
                              Vote Against
                              <GeneratingIndicator className="text-[9px]" />
                            </Button>
                          </div>
                        )}

                        {dispute.status === 'resolved' && (
                          <div className="text-center text-sm text-green-500 font-semibold">
                            Resolved on {formatDate(dispute.resolvedAt!)}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Slashing Events */}
              <TabsContent value="slashing" className="space-y-6">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h2 className="text-2xl font-bold mb-2">Slashing Events</h2>
                  <p className="text-muted-foreground">
                    Network security enforced through stake slashing for malicious behavior
                  </p>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {mockSlashingEvents.map((event) => (
                        <div key={event.id} className="p-4 hover:bg-destructive/5 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                                <AlertTriangle className="w-4 h-4" />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold">{event.workerName}</p>
                                  <Badge variant="outline" className="text-xs font-mono">
                                    {event.workerId}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {event.reason}
                                </p>
                                {event.jobId && (
                                  <p className="text-xs font-mono text-muted-foreground">
                                    Job: {event.jobId}
                                  </p>
                                )}
                                <p className="text-xs font-mono text-muted-foreground mt-1">
                                  TX: {formatHash(event.txHash, 12, 8)}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-xl font-mono font-bold text-destructive">
                                -{formatSOL(event.amount)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(event.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Slashing Info */}
                <Card className="max-w-2xl mx-auto border-destructive/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Slashing Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <p><strong>Output Disagreement:</strong> 10% stake slashed for incorrect outputs that disagree with consensus</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <p><strong>Execution Timeout:</strong> 5% stake slashed for repeated failures to execute within timeout</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <p><strong>Byzantine Behavior:</strong> 50% stake slashed for proven malicious or coordinated attacks</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <p><strong>Downtime Penalty:</strong> 1% stake slashed per 24h of continuous downtime below SLA</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
