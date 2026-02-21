import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GeneratingIndicator } from '@/components/ui/generating-indicator'
import { docsSections } from '@/lib/docs-content'

const quickLinks = [
  {
    title: 'Quick Start',
    description: 'Get up and running with the implemented scheduler flow',
    href: '/docs/getting-started/quick-start',
    status: 'live' as const
  },
  {
    title: 'Core Concepts',
    description: 'Docs in progress for jobs, workers, and consensus internals',
    href: '/docs/core-concepts/jobs',
    status: 'generating' as const
  },
  {
    title: 'API Reference',
    description: 'Implemented scheduler endpoints and examples',
    href: '/docs/api-reference/rest-api',
    status: 'live' as const
  }
]

export default function DocsHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <div className="flex flex-1">
        <DocsSidebar />
        
        <main className="flex-1 bg-background">
          {/* Header */}
          <section className="border-b border-border bg-card">
            <div className="max-w-4xl mx-auto px-8 py-12">
              <h1 className="text-4xl font-bold mb-4">Documentation</h1>
              <p className="text-lg text-muted-foreground">
                {'Everything you need to build with Edgerun - from getting started to advanced features'}
              </p>
            </div>
          </section>
          
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between gap-2">
                        <span>{link.title}</span>
                        {link.status === 'live' ? (
                          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                            Live
                          </Badge>
                        ) : (
                          <GeneratingIndicator />
                        )}
                      </CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Getting Started */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <p className="text-muted-foreground mb-6">
                  {'New to Edgerun? Start here to learn the basics and run your first job.'}
                </p>
                <Link href="/docs/getting-started/quick-start">
                  <Button>
                    Start Learning
                  </Button>
                </Link>
              </div>
              
              {/* Popular Topics */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Popular Topics</h3>
                <div className="space-y-3">
                  {docsSections.flatMap((section) =>
                    section.pages.map((page) => (
                      <Link
                        key={`${section.slug}/${page.slug}`}
                        href={`/docs/${section.slug}/${page.slug}`}
                        className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-semibold">{page.title}</p>
                          {page.status === 'live' ? (
                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                              Live
                            </Badge>
                          ) : (
                            <GeneratingIndicator />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{page.description}</p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}
