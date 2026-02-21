import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/lib/types'
import { formatBlogDate } from '@/lib/utils/format'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className={`h-full hover:border-primary/50 transition-colors cursor-pointer ${featured ? 'md:col-span-2' : ''}`}>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className={`font-bold text-balance ${featured ? 'text-2xl' : 'text-xl'}`}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
