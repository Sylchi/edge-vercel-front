import type { Author, BlogPost } from './types'

export const edgerunAuthor: Author = {
  name: 'Ken',
  avatar: '',
  role: 'Founder, Edgerun',
  bio: 'Building protocol-first infrastructure for verifiable compute, local-first systems, and user-owned cloud control.'
}

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }

export type EdgerunBlogPost = BlogPost & {
  contentBlocks: BlogContentBlock[]
}

export const blogPosts: EdgerunBlogPost[] = [
  {
    slug: 'why-edgerun-exists',
    title: 'Why Edgerun Exists',
    excerpt:
      'The internet made information cheap. Edgerun is about making useful compute available, accountable, and eventually owned by the people running it.',
    content: '',
    contentBlocks: [
      {
        type: 'paragraph',
        text:
          'Cloud computing became the default because it is convenient. The problem is that convenience quietly became dependency. A few companies own most of the control plane, pricing power, deployment surface, identity layer, and operational visibility.'
      },
      {
        type: 'paragraph',
        text:
          'Edgerun starts from a different assumption: compute should be a network, not a landlord relationship. People already own phones, laptops, GPUs, home servers, routers, batteries, and idle capacity. The missing piece is a protocol that turns that messy edge into something usable, verifiable, and economically coordinated.'
      },
      { type: 'heading', text: 'The first principle' },
      {
        type: 'paragraph',
        text:
          'A command is not truth. A dashboard is not truth. A provider API is not truth. Durable facts must be recorded, signed, replayable, and linked to the subject that actually made the decision. That is why Edgerun is protocol-first: append-only events, immutable objects, explicit authority, and deterministic execution where it matters.'
      },
      { type: 'heading', text: 'The product direction' },
      {
        type: 'paragraph',
        text:
          'The near-term goal is simple: make it possible to run useful workloads on contributed compute without pretending trust is magic. Deterministic WASM, signed results, redundant verification, stake-aware incentives, and eventually richer hardware-backed assurance all point at the same target.'
      },
      {
        type: 'paragraph',
        text:
          'The long-term goal is bigger: a personal cloud that can run locally, understand your own data, expose capabilities safely, and rent surplus compute only when you choose. Opt-in, privacy-preserving, and useful before it becomes ideological.'
      },
      { type: 'heading', text: 'Why now' },
      {
        type: 'paragraph',
        text:
          'AI made compute feel like a new natural resource. The winners will not only be the companies that own datacenters. The winners will be the systems that coordinate compute, trust, storage, identity, and payments into something normal people can actually use.'
      },
      {
        type: 'paragraph',
        text: 'Edgerun is the attempt to build that system from the protocol up.'
      }
    ],
    author: edgerunAuthor,
    publishedAt: '2026-05-03T00:00:00Z',
    readingTime: 5,
    tags: ['vision', 'protocol', 'compute'],
    featured: true
  },
  {
    slug: 'software-needs-an-xray',
    title: 'Software Needs an X-Ray',
    excerpt:
      'Code editors show files. Real systems behave as live graphs. Edgerun needs a visual runtime atlas because text alone does not scale to distributed software.',
    content: '',
    contentBlocks: [
      {
        type: 'paragraph',
        text:
          'Large software systems are not naturally understood as file trees. Humans reason spatially. We remember landmarks, paths, clusters, bottlenecks, and motion. A code editor forces a living system into a narrow text tunnel.'
      },
      {
        type: 'paragraph',
        text:
          'The x-ray view we are building for Edgerun treats code, processes, protocol messages, storage, network edges, agents, and runtime traces as one graph. The center of the interface is not a file. It is the system.'
      },
      { type: 'heading', text: 'Static maps are not enough' },
      {
        type: 'paragraph',
        text:
          'A static dependency graph can show what might happen. A runtime-lit graph shows what did happen. During a stress run, hot nodes brighten, stuck spans remain open, error paths flash, and bottlenecks become visible without digging through logs.'
      },
      {
        type: 'paragraph',
        text:
          'That changes the role of agents. They should not be blind typists editing files. They should be operators over a visible truth layer: focus this path, compare this run, explain this hot cluster, show which protocol node created this event.'
      },
      { type: 'heading', text: 'Why this matters for Edgerun' },
      {
        type: 'paragraph',
        text:
          'A decentralized compute system has too many moving parts for vibes: runtime, wallet, exchange, storage, network, identity, device capabilities, dashboards, and protocols. If the interfaces are wrong, everything becomes glue. The x-ray makes those boundaries visible.'
      },
      {
        type: 'paragraph',
        text:
          'The editor remains useful. It is just no longer the primary interface for understanding. Code becomes the detail popup. The graph becomes the cockpit.'
      }
    ],
    author: edgerunAuthor,
    publishedAt: '2026-05-03T00:00:00Z',
    readingTime: 4,
    tags: ['xray', 'observability', 'agents']
  },
  {
    slug: 'protocol-first-compute',
    title: 'Protocol-First Compute',
    excerpt:
      'Edgerun is not starting with a dashboard or a marketplace. It starts with authority boundaries: signed commands, committed events, immutable objects, and derived state.',
    content: '',
    contentBlocks: [
      {
        type: 'paragraph',
        text:
          'Most platforms begin with UI flows and databases, then try to add trust later. Edgerun is intentionally inverted. The core model is signed commands, target-node validation, committed events, immutable objects, and derived views.'
      },
      {
        type: 'paragraph',
        text:
          'That sounds abstract until you build real features. A crypto exchange quote, a worker registration, an app install, a user presence approval, and a compute result all have the same shape: requests are not truth until the right subject validates and records the result.'
      },
      { type: 'heading', text: 'Why commands are not authority' },
      {
        type: 'paragraph',
        text:
          'A command is only a request. Delivery does not mean acceptance. A UI saying success does not mean a state change happened. The receiving node must validate the command and write an outcome event into its own stream. That event becomes the durable fact.'
      },
      { type: 'heading', text: 'Objects carry data' },
      {
        type: 'paragraph',
        text:
          'Events should stay small and ordered. Objects carry data: app packages, payloads, snapshots, proofs, exchange audit records, and larger artifacts. Stored representations can be encrypted, chunked, or compressed without changing the logical object identity.'
      },
      { type: 'heading', text: 'Derived state is allowed to be fast' },
      {
        type: 'paragraph',
        text:
          'Indexes, dashboards, caches, and local stores are allowed. They just cannot be confused with truth. If a derived view is wrong, rebuild it from events and objects. That one rule keeps the system connectable as it grows.'
      }
    ],
    author: edgerunAuthor,
    publishedAt: '2026-05-03T00:00:00Z',
    readingTime: 4,
    tags: ['protocol', 'architecture', 'trust']
  }
]

export function getBlogPost(slug: string): EdgerunBlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): EdgerunBlogPost[] {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit)
}
