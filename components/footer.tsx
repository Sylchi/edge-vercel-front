import Link from 'next/link'
import Image from 'next/image'
import { FooterLeadForm } from '@/components/footer-lead-form'

const footerLinks = {
  product: [
    { href: '/run', label: 'Run Job' },
    { href: '/workers', label: 'Workers' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/docs', label: 'Documentation' }
  ],
  resources: [
    { href: '/docs/getting-started/quick-start', label: 'Getting Started' },
    { href: '/docs/api-reference/rest-api', label: 'API Reference' },
    { href: '/blog', label: 'Blog' },
    { href: '/style-guide', label: 'Style Guide' }
  ],
  legal: [
    { href: '/legal/privacy', label: 'Privacy Policy' },
    { href: '/legal/terms', label: 'Terms of Service' },
    { href: '/legal/sla', label: 'Service Level Agreement' }
  ],
  social: [
    { href: 'https://twitter.com/edgerun', label: 'Twitter' },
    { href: 'https://github.com/edgerun', label: 'GitHub' },
    { href: 'https://discord.gg/edgerun', label: 'Discord' }
  ]
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <FooterLeadForm />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/brand/edgerun-mark.svg" alt="Edgerun mark" width={24} height={24} />
            <span className="font-bold">Edgerun</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              {'© '}
              {new Date().getFullYear()}
              {' Edgerun. All rights reserved.'}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              Build {process.env.NEXT_PUBLIC_BUILD_VERSION ?? 'dev'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
