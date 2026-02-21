import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { BlogCard } from '@/components/blog/blog-card'
import { mockBlogPosts } from '@/lib/mock-data'

export const metadata = {
  title: 'Blog - Edgerun',
  description: 'Latest updates, tutorials, and insights from the Edgerun team'
}

export default function BlogPage() {
  const featuredPost = mockBlogPosts.find(post => post.featured)
  const otherPosts = mockBlogPosts.filter(post => !post.featured)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {'Latest updates, tutorials, and insights about verifiable compute, WASM, and the Edgerun platform'}
            </p>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <h2 className="text-sm font-semibold text-primary mb-4">FEATURED</h2>
              <BlogCard post={featuredPost} featured />
            </div>
          )}
          
          {/* All Posts */}
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
