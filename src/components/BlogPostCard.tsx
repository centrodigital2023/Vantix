import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock } from '@phosphor-icons/react'
import { BlogPost } from '@/lib/ai-content'

interface BlogPostCardProps {
  post: BlogPost
  onClick: () => void
}

export function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={14} weight="duotone" />
            {post.readTime} min
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-1">
            <User size={16} weight="duotone" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} weight="duotone" />
            {post.date}
          </div>
        </div>
      </div>
    </Card>
  )
}
