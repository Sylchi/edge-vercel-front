import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    number: '01',
    title: 'Submit WASM Job',
    description: 'Upload your compiled WASM module and input data. Specify execution parameters and payment.'
  },
  {
    number: '02',
    title: 'Worker Assignment',
    description: 'Multiple worker nodes are assigned based on stake, reputation, and availability.'
  },
  {
    number: '03',
    title: 'Parallel Execution',
    description: 'Workers execute your WASM module deterministically with identical inputs and environments.'
  },
  {
    number: '04',
    title: 'Consensus Verification',
    description: 'Output hashes are compared. Matching results indicate successful consensus.'
  },
  {
    number: '05',
    title: 'On-Chain Settlement',
    description: 'Results and proofs are settled on Solana. Workers receive payment, dissenters are slashed.'
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {'Five steps from job submission to on-chain settlement'}
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="h-full border-border">
                <CardContent className="p-6 space-y-4">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xl font-bold text-primary">{step.number}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-balance">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow Connector (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="text-2xl text-muted-foreground">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
