import { ReactNode } from 'react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Separator } from '@/components/ui/separator'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-invert max-w-none space-y-8">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

interface LegalSectionProps {
  title: string
  children: ReactNode
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-4">
        {children}
      </div>
      <Separator className="mt-8" />
    </section>
  )
}

export default LegalPageLayout
