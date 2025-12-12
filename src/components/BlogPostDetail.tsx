import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Share, BookmarkSimple, X } from '@phosphor-icons/react'
import { BlogPost } from '@/lib/ai-content'
import { marked } from 'marked'
import { useEffect, useState } from 'react'

interface BlogPostDetailProps {
  post: BlogPost | null
  open: boolean
  onClose: () => void
}

export function BlogPostDetail({ post, open, onClose }: BlogPostDetailProps) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    if (post?.content) {
      const parseContent = async () => {
        const html = await marked.parse(post.content)
        setHtmlContent(html)
      }
      parseContent()
    }
  }, [post])

  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="aspect-[21/9] overflow-hidden relative">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/20">
              {post.category}
            </Badge>
            <DialogHeader>
              <DialogTitle className="text-3xl md:text-4xl font-bold text-white mb-0">
                {post.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={20} weight="duotone" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={20} weight="duotone" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={20} weight="duotone" />
              <span>{post.readTime} min de lectura</span>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Share size={18} weight="duotone" />
                Compartir
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkSimple size={18} weight="duotone" />
                Guardar
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xl text-muted-foreground italic border-l-4 border-primary pl-4">
              {post.excerpt}
            </p>
          </div>

          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-li:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="text-sm py-1 px-3"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
