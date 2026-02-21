import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const quickLinks = [
  {
    title: 'Quick Start',
    description: 'Get up and running with Edgerun in 5 minutes',
    href: '/docs/getting-started/quick-start'
  },
  {
    title: 'Core Concepts',
    description: 'Learn about jobs, workers, and consensus',
    href: '/docs/core-concepts/jobs'
  },
  {
    title: 'API Reference',
    description: 'Complete REST API documentation',
    href: '/docs/api-reference/rest-api'
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
                      <CardTitle className="text-lg">{link.title}</CardTitle>
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
                <Link href="/docs/getting-started/introduction">
                  <Button>
                    Start Learning
                  </Button>
                </Link>
              </div>
              
              {/* Popular Topics */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Popular Topics</h3>
                <div className="space-y-3">
                  <Link
                    href="/docs/getting-started/quick-start"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <p className="font-semibold mb-1">Quick Start Guide</p>
                    <p className="text-sm text-muted-foreground">
                      {'Install the SDK, compile WASM, and run your first job'}
                    </p>
                  </Link>
                  
                  <Link
                    href="/docs/core-concepts/jobs"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <p className="font-semibold mb-1">Understanding Jobs</p>
                    <p className="text-sm text-muted-foreground">
                      {'Learn how compute jobs work, from submission to settlement'}
                    </p>
                  </Link>
                  
                  <Link
                    href="/docs/core-concepts/workers"
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <p className="font-semibold mb-1">Worker Nodes</p>
                    <p className="text-sm text-muted-foreground">
                      {'How to run a worker node and earn rewards'}
                    </p>
                  </Link>
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
