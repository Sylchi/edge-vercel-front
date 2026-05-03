import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { blogPosts, getBlogPost, getRelatedPosts, type BlogContentBlock } from '@/lib/blog-posts'
import { formatBlogDate } from '@/lib/utils/format'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

function ContentBlock({ block }: { block: BlogContentBlock }) {
  if (block.type === 'heading') {
    return <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{block.text}</h2>
  }

  if (block.type === 'list') {
    return (
      <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground leading-relaxed">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return <p className="text-muted-foreground leading-relaxed">{block.text}</p>
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 bg-background">
        <section className="bg-background border-b border-border">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

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

        <section className="py-12">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert max-w-none space-y-6">
              {post.contentBlocks.map((block, index) => (
                <ContentBlock key={`${block.type}-${index}`} block={block} />
              ))}
            </div>

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

        {relatedPosts.length > 0 && (
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
                        {relatedPost.excerpt.slice(0, 120)}...
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
        )}
      </main>

      <Footer />
    </div>
  )
}
