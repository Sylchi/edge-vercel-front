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
