import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockBlogPosts } from '@/lib/mock-data'
import { formatBlogDate } from '@/lib/utils/format'

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Use first post as example
  const post = mockBlogPosts[0]
  const relatedPosts = mockBlogPosts.slice(1, 4)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="bg-background border-b border-border">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div>
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-sm">
                <p>{formatBlogDate(post.publishedAt)}</p>
                <p>{post.readingTime} min read</p>
              </div>
            </div>
          </article>
        </section>
        
        {/* Content */}
        <section className="py-12">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              
              <Separator className="my-8" />
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Introduction</h2>
                <p>
                  {'Today marks a significant milestone in the evolution of decentralized compute. We\'re excited to introduce Edgerun, a platform that brings deterministic WASM execution together with cryptographic proof settlement on Solana.'}
                </p>
                <p>
                  {'The need for verifiable computation has never been greater. As blockchain applications grow more sophisticated, they require off-chain computation that can be trusted without relying on centralized providers. Edgerun solves this problem by ensuring that compute results can be verified cryptographically.'}
                </p>
                
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Problem</h2>
                <p>
                  {'Traditional cloud compute requires trust in a single provider. Blockchain-based alternatives often sacrifice performance or determinism. We set out to build a system that provides both verifiability and practical performance.'}
                </p>
                
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Solution</h2>
                <p>
                  {'Edgerun uses WebAssembly (WASM) as the execution environment because WASM provides deterministic execution across different hardware and operating systems. When multiple workers execute the same WASM module with the same inputs, they produce identical outputs - making consensus straightforward and cryptographically verifiable.'}
                </p>
                <p>
                  {'The settlement layer on Solana provides fast, low-cost finality for compute results. Workers stake SOL and are slashed for misbehavior, creating strong economic incentives for honest execution.'}
                </p>
                
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Use Cases</h2>
                <p>
                  {'We\'ve already seen interest from teams building:'}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ML inference services with provable outputs</li>
                  <li>Data processing pipelines that require audit trails</li>
                  <li>Decentralized oracles for smart contracts</li>
                  <li>Scientific computing with reproducible results</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What\'s Next</h2>
                <p>
                  {'This is just the beginning. Over the coming months, we\'ll be adding support for more complex compute jobs, improving worker economics, and expanding our SDK to support more languages and frameworks.'}
                </p>
                <p>
                  {'Join us in building the future of verifiable computation. Check out our documentation, run your first job, or join our Discord to connect with other developers.'}
                </p>
              </div>
            </div>
            
            {/* Author Bio */}
            <Card className="mt-12 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg mb-1">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{post.author.role}</p>
                    {post.author.bio && (
                      <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        </section>
        
        {/* Related Posts */}
        <section className="py-12 bg-card/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{relatedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {relatedPost.excerpt.slice(0, 100)}...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatBlogDate(relatedPost.publishedAt)} • {relatedPost.readingTime} min
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
