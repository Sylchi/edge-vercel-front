import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const useCases = [
  {
    title: 'Machine Learning Inference',
    description: 'Run ML models with verifiable outputs. Perfect for decentralized AI applications requiring proof of inference.',
    tags: ['AI/ML', 'Inference']
  },
  {
    title: 'Data Processing Pipelines',
    description: 'Process large datasets with cryptographic guarantees. Transform, validate, and aggregate data trustlessly.',
    tags: ['Data', 'ETL']
  },
  {
    title: 'Smart Contract Oracles',
    description: 'Provide off-chain computation results to smart contracts with cryptographic proofs of correct execution.',
    tags: ['Web3', 'Oracles']
  },
  {
    title: 'Image & Video Processing',
    description: 'Resize, filter, and transform media files with verifiable outputs for content integrity verification.',
    tags: ['Media', 'Processing']
  },
  {
    title: 'Cryptographic Operations',
    description: 'Execute complex cryptographic computations like ZK proofs, encryption, and signature verification.',
    tags: ['Crypto', 'Security']
  },
  {
    title: 'Scientific Computing',
    description: 'Run simulations and numerical computations with reproducible results and cryptographic verification.',
    tags: ['Science', 'Research']
  }
]

export function UseCases() {
  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Built for Diverse Workloads
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {'From AI inference to data processing, Edgerun handles any WASM-compatible workload'}
          </p>
        </div>
        
        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {useCase.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
