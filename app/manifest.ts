import type { MetadataRoute } from 'next'
import brandTheme from '@/config/brand-theme.json'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandTheme.name,
    short_name: brandTheme.shortName,
    description: brandTheme.description,
    start_url: '/',
    display: 'standalone',
    background_color: brandTheme.colors.darkBackground,
    theme_color: brandTheme.colors.brandPrimary,
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  }
}
