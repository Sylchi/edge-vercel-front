import type { MetadataRoute } from 'next'
import { getRouteEntries, getSiteUrl } from '@/lib/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const now = new Date()

  return getRouteEntries()
    .filter((route) => !route.path.includes('/job/example'))
    .map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.path.startsWith('/docs/') || route.path.startsWith('/blog/')
        ? 'weekly'
        : 'daily',
      priority: route.path === '/' ? 1 : 0.7
    }))
}

