import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Deterministic WASM',
    description: 'Multiple workers execute identical WASM bytecode. Same input always produces same output. Consensus proves correctness.',
    icon: '⚡'
  },
  {
    title: 'Staking Enforces Quality',
    description: 'Workers stake capital to participate. Incorrect outputs result in slashed stake. Financial consequences ensure honest execution.',
    icon: '💎'
  },
  {
    title: 'Market-Driven Pricing',
    description: 'Workers compete for jobs. Supply and demand determine fees. No fixed pricing. Capital flows to the most efficient.',
    icon: '📊'
  },
  {
    title: 'Cryptographic Settlement',
    description: 'Execution proofs settle on Solana. Immutable record of consensus. Payments distributed automatically on-chain.',
    icon: '🔐'
  },
  {
    title: 'Slashing Protection',
    description: 'Redundant execution prevents single points of failure. Byzantine fault tolerance. Malicious workers lose stake.',
    icon: '⚔️'
  },
  {
    title: 'Universal WASM',
    description: 'Compile from any language to WASM. Rust, C, Go, AssemblyScript. Run anything deterministically.',
    icon: '🛠️'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Redundant execution by staked workers. Incorrect results lose money. Competitive workers set the price.
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
