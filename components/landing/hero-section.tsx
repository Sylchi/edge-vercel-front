import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Now in Public Beta</span>
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
            Verifiable Compute
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Powered by WASM
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            {'Deterministic execution with cryptographic proofs. Run WASM workloads across distributed workers and settle results on Solana.'}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/run">
              <Button size="lg" className="w-full sm:w-auto">
                Run Your First Job
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Read Documentation
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">99.9%</p>
              <p className="text-sm text-muted-foreground">Consensus Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">{'<'}150ms</p>
              <p className="text-sm text-muted-foreground">Avg Settlement</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold">2.5M+</p>
              <p className="text-sm text-muted-foreground">Jobs Executed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
