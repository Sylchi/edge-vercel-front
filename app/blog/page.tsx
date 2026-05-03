import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { BlogCard } from '@/components/blog/blog-card'
import { blogPosts } from '@/lib/blog-posts'

export const metadata = {
  title: 'Blog - Edgerun',
  description: 'Protocol, product, and infrastructure notes from Edgerun'
}

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const otherPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 bg-background">
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="text-sm font-mono text-primary mb-4">EDGERUN NOTES</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Protocol, product, and infrastructure notes about verifiable compute,
              local-first systems, runtime observability, and user-owned cloud control.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {featuredPost && (
            <div className="mb-12">
              <h2 className="text-sm font-semibold text-primary mb-4">FEATURED</h2>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-8">All Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
