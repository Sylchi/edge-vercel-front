import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Deterministic Execution',
    description: 'WASM modules execute identically across all workers, ensuring verifiable consensus without trust assumptions',
    icon: '⚡'
  },
  {
    title: 'Cryptographic Proofs',
    description: 'Every execution generates cryptographic proofs that are settled on-chain for permanent verification',
    icon: '🔐'
  },
  {
    title: 'Solana Settlement',
    description: 'Fast, low-cost settlement layer leveraging Solana for proof storage and payment distribution',
    icon: '⛓️'
  },
  {
    title: 'Worker Incentives',
    description: 'Stake-based economic model with slashing protection ensures reliable execution and network security',
    icon: '💎'
  },
  {
    title: 'Developer Friendly',
    description: 'Simple SDK and CLI tools. Compile any language to WASM and run it in seconds',
    icon: '🛠️'
  },
  {
    title: 'Global Network',
    description: 'Distributed worker nodes across multiple regions provide redundancy and low-latency execution',
    icon: '🌍'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Built for Verifiable Computation
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {'Edgerun combines deterministic WASM execution with blockchain settlement to create trustless, verifiable compute infrastructure.'}
          </p>
        </div>
        
        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
