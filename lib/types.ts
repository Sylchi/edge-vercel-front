// Core Application Types

export type JobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export interface Job {
  id: string
  name: string
  wasmHash: string
  status: JobStatus
  createdAt: string
  startedAt?: string
  completedAt?: string
  runtime: number // milliseconds
  gasUsed: number
  executorCount: number
  consensusReached: boolean
  settlementTx?: string
  input: {
    fileName: string
    size: number
  }
  results?: JobResult[]
}

export interface JobResult {
  workerId: string
  workerName: string
  outputHash: string
  gasUsed: number
  runtime: number
  timestamp: string
  status: 'success' | 'failed'
}

export interface TimelineEvent {
  id: string
  timestamp: string
  type: 'submitted' | 'assigned' | 'executing' | 'completed' | 'settled' | 'failed'
  title: string
  description: string
  data?: {
    workerCount?: number
    txHash?: string
    error?: string
  }
}

export interface Worker {
  id: string
  name: string
  status: 'active' | 'inactive' | 'slashed'
  uptime: number // percentage
  totalJobs: number
  successRate: number // percentage
  stake: number // SOL
  reputation: number
  lastSeen: string
  hardware: {
    cpu: string
    memory: string
    region: string
  }
}

export interface DashboardStats {
  totalJobs: number
  activeJobs: number
  completedJobs: number
  totalSpent: number // SOL
  avgRuntime: number // milliseconds
  successRate: number // percentage
}

// Content Types

export interface Author {
  name: string
  avatar: string
  role: string
  bio?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: Author
  publishedAt: string
  updatedAt?: string
  readingTime: number // minutes
  tags: string[]
  featured?: boolean
  coverImage?: string
}

export interface DocSection {
  title: string
  slug: string
  pages: DocPage[]
}

export interface DocPage {
  title: string
  slug: string
  content: string
  section: string
}

export interface LegalPage {
  title: string
  slug: string
  lastUpdated: string
  sections: {
    id: string
    title: string
    content: string
  }[]
}

// Email Types

export interface EmailProps {
  previewText: string
}

export interface JobCompletedEmailProps extends EmailProps {
  jobId: string
  jobName: string
  runtime: number
  gasUsed: number
  outputHash: string
  settlementTx: string
  completedAt: string
}

export interface JobFailedEmailProps extends EmailProps {
  jobId: string
  jobName: string
  error: string
  failedAt: string
}

export interface WorkerSlashedEmailProps extends EmailProps {
  workerId: string
  workerName: string
  reason: string
  slashAmount: number
  slashedAt: string
  txHash: string
}

export interface WelcomeEmailProps extends EmailProps {
  userName: string
}

// Token & Economics Types

export interface TokenStats {
  totalSupply: number
  circulatingSupply: number
  price: number // USD
  marketCap: number
  volume24h: number
  totalStaked: number
  stakingAPY: number
}

export interface StakingPool {
  id: string
  name: string
  totalStaked: number
  apy: number
  minStake: number
  lockPeriod: number // days
  participants: number
  yourStake?: number
  rewards?: number
}

export interface Transaction {
  id: string
  type: 'stake' | 'unstake' | 'reward' | 'slash' | 'payment' | 'dispute'
  amount: number
  from?: string
  to?: string
  timestamp: string
  status: 'confirmed' | 'pending' | 'failed'
  txHash: string
  description: string
}

export interface Dispute {
  id: string
  jobId: string
  jobName: string
  initiator: string
  defendant: string
  reason: string
  amount: number // stake at risk
  status: 'open' | 'voting' | 'resolved' | 'rejected'
  createdAt: string
  resolvedAt?: string
  votes?: {
    for: number
    against: number
    required: number
  }
}

export interface SlashingEvent {
  id: string
  workerId: string
  workerName: string
  reason: string
  amount: number
  timestamp: string
  txHash: string
  jobId?: string
}

export interface RewardClaim {
  id: string
  amount: number
  source: 'staking' | 'compute' | 'referral'
  earned: string
  claimable: boolean
  claimed: boolean
  claimedAt?: string
}
