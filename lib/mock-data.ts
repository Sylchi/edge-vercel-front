import type { Job, Worker, TimelineEvent, DashboardStats, BlogPost, Author, DocSection, LegalPage } from './types'

// Mock Authors
export const mockAuthors: Author[] = [
  {
    name: 'Alex Chen',
    avatar: '/avatars/alex.jpg',
    role: 'Co-founder & CEO',
    bio: 'Building the future of verifiable compute'
  },
  {
    name: 'Sarah Martinez',
    avatar: '/avatars/sarah.jpg',
    role: 'Head of Engineering',
    bio: 'Specializing in distributed systems and cryptography'
  },
  {
    name: 'Jordan Lee',
    avatar: '/avatars/jordan.jpg',
    role: 'Developer Relations',
    bio: 'Making WASM compute accessible to everyone'
  }
]

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'job_1a2b3c4d',
    name: 'Image Processing Pipeline',
    wasmHash: '0x7f3a9b2c8e1d4f6a9c2b5e8d1a4f7c3b9e2a5d8c1f4a7b3e6d9c2a5f8e1b4d7',
    status: 'completed',
    createdAt: '2024-02-20T10:30:00Z',
    startedAt: '2024-02-20T10:30:15Z',
    completedAt: '2024-02-20T10:32:45Z',
    runtime: 150000,
    gasUsed: 245000,
    executorCount: 5,
    consensusReached: true,
    settlementTx: '3kMxT7vQpN2bF9wR5cL8dH1jS6nY4tP9mK2xV7qW5eU8fA3gB6hC9rD1sE4tF7y',
    input: {
      fileName: 'dataset.wasm',
      size: 2048576
    },
    results: [
      {
        workerId: 'worker_001',
        workerName: 'node-us-west-001',
        outputHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        gasUsed: 245000,
        runtime: 150000,
        timestamp: '2024-02-20T10:32:45Z',
        status: 'success'
      },
      {
        workerId: 'worker_002',
        workerName: 'node-eu-central-002',
        outputHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        gasUsed: 245000,
        runtime: 148500,
        timestamp: '2024-02-20T10:32:43Z',
        status: 'success'
      },
      {
        workerId: 'worker_003',
        workerName: 'node-ap-south-003',
        outputHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        gasUsed: 245000,
        runtime: 151200,
        timestamp: '2024-02-20T10:32:46Z',
        status: 'success'
      }
    ]
  },
  {
    id: 'job_2b3c4d5e',
    name: 'ML Model Inference',
    wasmHash: '0x9e2a5d8c1f4a7b3e6d9c2a5f8e1b4d7c3a6f9b2e5d8a1c4f7b9e2d5a8c1f4b7',
    status: 'running',
    createdAt: '2024-02-20T11:15:00Z',
    startedAt: '2024-02-20T11:15:20Z',
    runtime: 45000,
    gasUsed: 0,
    executorCount: 3,
    consensusReached: false,
    input: {
      fileName: 'model.wasm',
      size: 5242880
    }
  },
  {
    id: 'job_3c4d5e6f',
    name: 'Data Transformation',
    wasmHash: '0x4f7c3b9e2a5d8c1f4a7b3e6d9c2a5f8e1b4d7c3a6f9b2e5d8a1c4f7b9e2d5a8',
    status: 'pending',
    createdAt: '2024-02-20T11:45:00Z',
    runtime: 0,
    gasUsed: 0,
    executorCount: 0,
    consensusReached: false,
    input: {
      fileName: 'transform.wasm',
      size: 1048576
    }
  },
  {
    id: 'job_4d5e6f7g',
    name: 'Cryptographic Verification',
    wasmHash: '0x2a5f8e1b4d7c3a6f9b2e5d8a1c4f7b9e2d5a8c1f4b7e3a9c6f2d5b8a1e4c7f9',
    status: 'failed',
    createdAt: '2024-02-20T09:30:00Z',
    startedAt: '2024-02-20T09:30:30Z',
    completedAt: '2024-02-20T09:31:15Z',
    runtime: 45000,
    gasUsed: 89000,
    executorCount: 2,
    consensusReached: false,
    input: {
      fileName: 'verify.wasm',
      size: 512000
    }
  }
]

// Mock Timeline Events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'evt_1',
    timestamp: '2024-02-20T10:30:00Z',
    type: 'submitted',
    title: 'Job Submitted',
    description: 'Job submitted to the network for execution'
  },
  {
    id: 'evt_2',
    timestamp: '2024-02-20T10:30:15Z',
    type: 'assigned',
    title: 'Workers Assigned',
    description: 'Job assigned to 5 workers for execution',
    data: { workerCount: 5 }
  },
  {
    id: 'evt_3',
    timestamp: '2024-02-20T10:30:20Z',
    type: 'executing',
    title: 'Execution Started',
    description: 'Workers began executing the WASM module'
  },
  {
    id: 'evt_4',
    timestamp: '2024-02-20T10:32:45Z',
    type: 'completed',
    title: 'Execution Completed',
    description: 'All workers completed execution with matching outputs'
  },
  {
    id: 'evt_5',
    timestamp: '2024-02-20T10:32:50Z',
    type: 'settled',
    title: 'Settlement Confirmed',
    description: 'Results settled on Solana blockchain',
    data: { txHash: '3kMxT7vQpN2bF9wR5cL8dH1jS6nY4tP9mK2xV7qW5eU8fA3gB6hC9rD1sE4tF7y' }
  }
]

// Mock Workers
export const mockWorkers: Worker[] = [
  {
    id: 'worker_001',
    name: 'node-us-west-001',
    status: 'active',
    uptime: 99.8,
    totalJobs: 1247,
    successRate: 99.9,
    stake: 100,
    reputation: 98,
    lastSeen: '2024-02-20T11:45:00Z',
    hardware: {
      cpu: '16 vCPU',
      memory: '32 GB',
      region: 'us-west-2'
    }
  },
  {
    id: 'worker_002',
    name: 'node-eu-central-002',
    status: 'active',
    uptime: 99.5,
    totalJobs: 892,
    successRate: 99.7,
    stake: 75,
    reputation: 96,
    lastSeen: '2024-02-20T11:44:30Z',
    hardware: {
      cpu: '12 vCPU',
      memory: '24 GB',
      region: 'eu-central-1'
    }
  },
  {
    id: 'worker_003',
    name: 'node-ap-south-003',
    status: 'active',
    uptime: 98.9,
    totalJobs: 654,
    successRate: 99.4,
    stake: 50,
    reputation: 94,
    lastSeen: '2024-02-20T11:43:00Z',
    hardware: {
      cpu: '8 vCPU',
      memory: '16 GB',
      region: 'ap-south-1'
    }
  }
]

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalJobs: 156,
  activeJobs: 3,
  completedJobs: 142,
  totalSpent: 12.45,
  avgRuntime: 125000,
  successRate: 98.7
}

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'introducing-edgerun',
    title: 'Introducing Edgerun: Verifiable Compute for the Decentralized Web',
    excerpt: 'Today we are launching Edgerun, a deterministic WASM compute platform with cryptographic proof settlement on Solana. Learn about our vision for trustless, verifiable computation.',
    content: 'Full blog post content here...',
    author: mockAuthors[0],
    publishedAt: '2024-02-15T09:00:00Z',
    readingTime: 8,
    tags: ['launch', 'announcement', 'technology'],
    featured: true,
    coverImage: '/blog/introducing-edgerun.jpg'
  },
  {
    slug: 'deterministic-wasm-execution',
    title: 'Understanding Deterministic WASM Execution',
    excerpt: 'Deep dive into how we achieve deterministic execution of WebAssembly modules across distributed workers, ensuring identical outputs for consensus.',
    content: 'Full blog post content here...',
    author: mockAuthors[1],
    publishedAt: '2024-02-18T14:30:00Z',
    readingTime: 12,
    tags: ['technical', 'wasm', 'architecture'],
    coverImage: '/blog/deterministic-wasm.jpg'
  },
  {
    slug: 'getting-started-guide',
    title: 'Getting Started with Edgerun: Your First Job',
    excerpt: 'Step-by-step guide to running your first compute job on Edgerun. Learn how to compile WASM, submit jobs, and verify results.',
    content: 'Full blog post content here...',
    author: mockAuthors[2],
    publishedAt: '2024-02-19T10:00:00Z',
    readingTime: 6,
    tags: ['tutorial', 'getting-started'],
    coverImage: '/blog/getting-started.jpg'
  },
  {
    slug: 'solana-settlement-layer',
    title: 'Why Solana for Settlement',
    excerpt: 'Exploring our decision to use Solana as the settlement layer for compute results. Performance, cost, and decentralization considerations.',
    content: 'Full blog post content here...',
    author: mockAuthors[0],
    publishedAt: '2024-02-16T11:00:00Z',
    readingTime: 10,
    tags: ['technical', 'solana', 'blockchain'],
    coverImage: '/blog/solana-settlement.jpg'
  },
  {
    slug: 'worker-node-economics',
    title: 'Worker Node Economics and Incentives',
    excerpt: 'How we designed the economic model for worker nodes to ensure reliable execution and network security through staking and slashing.',
    content: 'Full blog post content here...',
    author: mockAuthors[1],
    publishedAt: '2024-02-17T15:00:00Z',
    readingTime: 9,
    tags: ['economics', 'workers', 'incentives'],
    coverImage: '/blog/worker-economics.jpg'
  }
]

// Mock Documentation Structure
export const mockDocsStructure: DocSection[] = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    pages: [
      {
        title: 'Introduction',
        slug: 'introduction',
        content: 'Welcome to Edgerun documentation...',
        section: 'getting-started'
      },
      {
        title: 'Quick Start',
        slug: 'quick-start',
        content: 'Get up and running in 5 minutes...',
        section: 'getting-started'
      },
      {
        title: 'Installation',
        slug: 'installation',
        content: 'Install the Edgerun CLI and SDK...',
        section: 'getting-started'
      }
    ]
  },
  {
    title: 'Core Concepts',
    slug: 'core-concepts',
    pages: [
      {
        title: 'Jobs',
        slug: 'jobs',
        content: 'Understanding compute jobs...',
        section: 'core-concepts'
      },
      {
        title: 'Workers',
        slug: 'workers',
        content: 'How worker nodes operate...',
        section: 'core-concepts'
      },
      {
        title: 'Consensus',
        slug: 'consensus',
        content: 'Deterministic execution and consensus...',
        section: 'core-concepts'
      },
      {
        title: 'Settlement',
        slug: 'settlement',
        content: 'Solana settlement layer...',
        section: 'core-concepts'
      }
    ]
  },
  {
    title: 'API Reference',
    slug: 'api-reference',
    pages: [
      {
        title: 'REST API',
        slug: 'rest-api',
        content: 'Complete REST API documentation...',
        section: 'api-reference'
      },
      {
        title: 'SDK Reference',
        slug: 'sdk-reference',
        content: 'JavaScript/TypeScript SDK documentation...',
        section: 'api-reference'
      },
      {
        title: 'CLI Commands',
        slug: 'cli-commands',
        content: 'Command-line interface reference...',
        section: 'api-reference'
      }
    ]
  }
]

// Mock Legal Page
export const mockPrivacyPolicy: LegalPage = {
  title: 'Privacy Policy',
  slug: 'privacy',
  lastUpdated: '2024-02-01',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: 'This Privacy Policy describes how Edgerun collects, uses, and shares your personal information...'
    },
    {
      id: 'data-collection',
      title: 'Data We Collect',
      content: 'We collect information you provide directly to us, including account information, job data, and usage analytics...'
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      content: 'We use the information we collect to provide, maintain, and improve our services...'
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing',
      content: 'We do not sell your personal information. We may share data with service providers, as required by law...'
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal information...'
    }
  ]
}

export const mockTermsOfService: LegalPage = {
  title: 'Terms of Service',
  slug: 'terms',
  lastUpdated: '2024-02-01',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: 'By accessing or using Edgerun, you agree to be bound by these Terms of Service...'
    },
    {
      id: 'service-description',
      title: 'Service Description',
      content: 'Edgerun provides a decentralized compute platform for executing WASM modules...'
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      content: 'You are responsible for maintaining the security of your account and all activities...'
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use',
      content: 'You may not use Edgerun for any illegal or unauthorized purpose...'
    },
    {
      id: 'termination',
      title: 'Termination',
      content: 'We may terminate or suspend your account at any time for violation of these terms...'
    }
  ]
}

export const mockSLA: LegalPage = {
  title: 'Service Level Agreement',
  slug: 'sla',
  lastUpdated: '2024-02-01',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: 'This SLA defines the level of service you can expect from Edgerun...'
    },
    {
      id: 'uptime',
      title: 'Uptime Guarantee',
      content: 'We guarantee 99.9% uptime for the Edgerun platform, measured monthly...'
    },
    {
      id: 'performance',
      title: 'Performance Targets',
      content: 'API response times under 200ms for 95th percentile, job assignment within 30 seconds...'
    },
    {
      id: 'support',
      title: 'Support Response Times',
      content: 'Critical issues: 1 hour response, High priority: 4 hours, Normal: 24 hours...'
    },
    {
      id: 'credits',
      title: 'Service Credits',
      content: 'If we fail to meet our uptime guarantee, you may be eligible for service credits...'
    }
  ]
}
