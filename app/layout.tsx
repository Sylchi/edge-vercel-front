import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import brandTheme from '@/config/brand-theme.json'
import { AppProviders } from '@/components/providers/app-providers'
import './globals.css'

export const metadata: Metadata = {
  title: `${brandTheme.name} - Deterministic WASM Compute with Solana Settlement`,
  description: brandTheme.description,
  applicationName: brandTheme.applicationName,
  generator: 'v0.app',
  manifest: '/manifest.webmanifest',
  icons: {
    shortcut: '/favicon.ico',
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: brandTheme.colors.lightBackground },
    { media: '(prefers-color-scheme: dark)', color: brandTheme.colors.darkBackground }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
