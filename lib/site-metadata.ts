import { docsSections } from '@/lib/docs-content'
import { mockBlogPosts } from '@/lib/mock-data'

const DEFAULT_SITE_URL = 'https://www.edgerun.tech'

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

export interface RouteEntry {
  path: string
  status: 'live' | 'generating'
}

export function getRouteEntries(): RouteEntry[] {
  const coreRoutes: RouteEntry[] = [
    { path: '/', status: 'live' },
    { path: '/run', status: 'live' },
    { path: '/dashboard', status: 'live' },
    { path: '/job/example', status: 'live' },
    { path: '/workers', status: 'live' },
    { path: '/token', status: 'live' },
    { path: '/docs', status: 'live' },
    { path: '/docs/getting-started/quick-start', status: 'live' },
    { path: '/blog', status: 'live' },
    { path: '/style-guide', status: 'live' },
    { path: '/legal/privacy', status: 'live' },
    { path: '/legal/terms', status: 'live' },
    { path: '/legal/sla', status: 'live' }
  ]

  const docsRoutes: RouteEntry[] = docsSections.flatMap((section) =>
    section.pages.map((page) => ({
      path: `/docs/${section.slug}/${page.slug}`,
      status: page.status
    }))
  )

  const blogRoutes: RouteEntry[] = mockBlogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    status: 'live'
  }))

  return [...coreRoutes, ...docsRoutes, ...blogRoutes]
}
