export type DocsPageStatus = 'live' | 'generating'

export interface DocsPageMeta {
  title: string
  slug: string
  description: string
  status: DocsPageStatus
}

export interface DocsSectionMeta {
  title: string
  slug: string
  pages: DocsPageMeta[]
}

export const docsSections: DocsSectionMeta[] = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    pages: [
      {
        title: 'Introduction',
        slug: 'introduction',
        description: 'Platform overview and architecture walkthrough.',
        status: 'generating'
      },
      {
        title: 'Quick Start',
        slug: 'quick-start',
        description: 'Run your first job with the currently implemented scheduler flow.',
        status: 'live'
      },
      {
        title: 'Installation',
        slug: 'installation',
        description: 'CLI and SDK installation guide.',
        status: 'generating'
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
        description: 'Job lifecycle, quorum, and status model.',
        status: 'generating'
      },
      {
        title: 'Workers',
        slug: 'workers',
        description: 'Worker assignment and report flow.',
        status: 'generating'
      },
      {
        title: 'Consensus',
        slug: 'consensus',
        description: 'Committee voting and winning output determination.',
        status: 'generating'
      },
      {
        title: 'Settlement',
        slug: 'settlement',
        description: 'On-chain transaction artifacts and settlement semantics.',
        status: 'generating'
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
        description: 'Implemented scheduler HTTP endpoints available now.',
        status: 'live'
      },
      {
        title: 'SDK Reference',
        slug: 'sdk-reference',
        description: 'Client SDK methods and typed helpers.',
        status: 'generating'
      },
      {
        title: 'CLI Commands',
        slug: 'cli-commands',
        description: 'CLI command reference and operational examples.',
        status: 'generating'
      }
    ]
  }
]

export function getDocsPage(sectionSlug: string, pageSlug: string): DocsPageMeta | null {
  const section = docsSections.find((item) => item.slug === sectionSlug)
  if (!section) {
    return null
  }
  return section.pages.find((item) => item.slug === pageSlug) ?? null
}
