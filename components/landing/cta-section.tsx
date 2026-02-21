import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 p-12">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Ready to Start Running Verifiable Compute?
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              {'Join developers building the future of trustless computation. Get started in minutes with our SDK and CLI tools.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/run">
                <Button size="lg" className="w-full sm:w-auto">
                  Run Your First Job
                </Button>
              </Link>
              <Link href="/workers">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Become a Worker
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
