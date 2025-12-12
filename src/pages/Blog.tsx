import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagnifyingGlass, Sparkle, ArrowsClockwise } from '@phosphor-icons/react'
import { BlogPostCard } from '@/components/BlogPostCard'
import { BlogPostDetail } from '@/components/BlogPostDetail'
import { generateBlogPosts, BlogPost } from '@/lib/ai-content'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

const categories = ['Todos', 'Guías', 'Gastronomía', 'Aventura', 'Cultura', 'Naturaleza', 'Tips', 'Familia', 'Bienestar']

export function Blog() {
  const [blogPosts, setBlogPosts] = useKV<BlogPost[]>('blog-posts', [])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (!blogPosts || blogPosts.length === 0) {
      handleGenerateContent()
    }
  }, [])

  useEffect(() => {
    let filtered = blogPosts || []

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredPosts(filtered)
  }, [blogPosts, selectedCategory, searchQuery])

  const handleGenerateContent = async () => {
    setIsGenerating(true)
    toast.loading('Generando contenido con IA...', { id: 'generating' })
    
    try {
      const posts = await generateBlogPosts(12)
      setBlogPosts(() => posts)
      toast.success('Contenido generado exitosamente', { id: 'generating' })
    } catch (error) {
      console.error('Error generating blog posts:', error)
      toast.error('Error al generar contenido', { id: 'generating' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    setShowDetail(true)
  }

  return (
    <div className="min-h-screen">
      <div 
        className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-accent to-secondary overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog de Experiencias
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Historias inspiradoras, guías de viaje y consejos para explorar Colombia
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button 
                onClick={handleGenerateContent}
                disabled={isGenerating}
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                {isGenerating ? (
                  <ArrowsClockwise size={20} weight="bold" className="animate-spin" />
                ) : (
                  <Sparkle size={20} weight="duotone" />
                )}
                {isGenerating ? 'Generando...' : 'Generar Nuevo Contenido con IA'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MagnifyingGlass 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              placeholder="Buscar artículos, destinos, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filteredPosts.length === 0 && !isGenerating && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              {searchQuery ? 'No se encontraron artículos' : 'No hay artículos disponibles'}
            </p>
            {!searchQuery && (
              <Button onClick={handleGenerateContent}>
                <Sparkle size={20} weight="duotone" />
                Generar Contenido
              </Button>
            )}
          </div>
        )}

        {isGenerating && filteredPosts.length === 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard 
                key={post.id} 
                post={post}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </div>
        )}
      </div>

      <BlogPostDetail 
        post={selectedPost}
        open={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </div>
  )
}