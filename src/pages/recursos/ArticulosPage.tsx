import { useState, useEffect } from 'react'
import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Article as ArticleIcon, MapPin, Camera, Book, Newspaper, Lightbulb, Sparkle, ArrowsClockwise } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MagnifyingGlass, Calendar, User, Clock } from '@phosphor-icons/react'
import { generateArticles, Article } from '@/lib/ai-content'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { BlogPostDetail } from '@/components/BlogPostDetail'

interface ArticulosPageProps {
  onNavigate: (page: PageRoute) => void
}

const categories = [
  {
    name: 'Guías de Destinos',
    description: 'Qué hacer, dónde comer, cómo moverse. Guías honestas escritas por quienes ya estuvieron ahí.',
    icon: <MapPin size={40} className="text-primary" weight="duotone" />
  },
  {
    name: 'Tips de Viaje',
    description: 'Consejos prácticos, trucos para ahorrar, errores a evitar. Sabiduría colectiva de la comunidad viajera.',
    icon: <Lightbulb size={40} className="text-secondary" weight="duotone" />
  },
  {
    name: 'Crónicas de Viajeros',
    description: 'Relatos en primera persona. Aventuras, desventuras, momentos épicos y anécdotas que merecen ser contadas.',
    icon: <Book size={40} className="text-turquoise" weight="duotone" />
  },
  {
    name: 'Fotografía de Viajes',
    description: 'El arte de capturar momentos. Técnicas, equipo, lugares fotogénicos y cómo contar historias con imágenes.',
    icon: <Camera size={40} className="text-accent" weight="duotone" />
  },
  {
    name: 'Cultura Local',
    description: 'Tradiciones, costumbres, historia. Artículos que te ayudan a entender el alma de cada lugar.',
    icon: <ArticleIcon size={40} className="text-secondary" weight="duotone" />
  },
  {
    name: 'Viajes Sustentables',
    description: 'Cómo viajar respetando el medio ambiente y las comunidades locales. Turismo consciente y responsable.',
    icon: <Newspaper size={40} className="text-primary" weight="duotone" />
  }
]

export function ArticulosPage({ onNavigate }: ArticulosPageProps) {
  const [articles, setArticles] = useKV<Article[]>('articles-content', [])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showArticles, setShowArticles] = useState(false)

  useEffect(() => {
    if (!articles || articles.length === 0) {
      handleGenerateContent()
    }
  }, [])

  useEffect(() => {
    let filtered = articles || []

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredArticles(filtered)
  }, [articles, searchQuery])

  const handleGenerateContent = async () => {
    setIsGenerating(true)
    toast.loading('Generando artículos con IA...', { id: 'generating-articles' })
    
    try {
      const newArticles = await generateArticles(12)
      setArticles(() => newArticles)
      toast.success('Artículos generados exitosamente', { id: 'generating-articles' })
      setShowArticles(true)
    } catch (error) {
      console.error('Error generating articles:', error)
      toast.error('Error al generar artículos', { id: 'generating-articles' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setShowDetail(true)
  }

  if (showArticles && articles && articles.length > 0) {
    return (
      <div className="min-h-screen">
        <div className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-accent to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Historias de Viajeros
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Relatos, consejos y experiencias reales de quienes se atrevieron a descubrir Colombia
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
                  {isGenerating ? 'Regenerando...' : 'Regenerar Contenido con IA'}
                </Button>
                <Button 
                  onClick={() => setShowArticles(false)}
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  Ver Categorías
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative mb-8">
            <MagnifyingGlass 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredArticles.length === 0 && !isGenerating && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron artículos
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                </div>
              ))}
            </div>
          )}

          {filteredArticles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={14} weight="duotone" />
                        {article.readTime} min
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
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
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} weight="duotone" />
                        {article.date}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <BlogPostDetail 
          post={selectedArticle ? {
            id: selectedArticle.id,
            title: selectedArticle.title,
            excerpt: selectedArticle.subtitle,
            content: selectedArticle.content,
            image: selectedArticle.image,
            author: selectedArticle.author,
            date: selectedArticle.date,
            category: selectedArticle.category,
            readTime: selectedArticle.readTime,
            tags: selectedArticle.tags
          } : null}
          open={showDetail}
          onClose={() => setShowDetail(false)}
        />
      </div>
    )
  }

  return (
    <ContentPage
      title="Historias de Viajeros"
      subtitle="Relatos, consejos y experiencias reales de quienes se atrevieron a descubrir Colombia"
      heroGradient="from-primary via-accent to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Cada Viaje es una Historia',
          content: 'Los mejores viajes no se miden en kilómetros ni en fotos de Instagram. Se miden en historias que cuentas años después. En momentos que te cambiaron la forma de ver el mundo. En personas que conociste y nunca olvidaste.\n\nEsta sección es un espacio para esas historias. Escritas por viajeros reales, con errores, aciertos, risas y lecciones aprendidas en el camino.'
        },
        {
          title: 'Categorías de Artículos',
          content: 'Explora contenido por temas que te interesan',
          cards: categories.map(cat => ({
            title: cat.name,
            description: cat.description,
            icon: cat.icon
          }))
        },
        {
          title: 'Contenido Generado con Inteligencia Artificial',
          content: (
            <div>
              <p className="mb-6">
                Nuestros artículos son creados dinámicamente usando IA avanzada para ofrecerte las historias más relevantes y actualizadas sobre turismo en Colombia. Cada artículo combina información práctica con narrativa inspiradora.
              </p>
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  size="lg"
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <ArrowsClockwise size={20} weight="bold" className="animate-spin" />
                      Generando Artículos...
                    </>
                  ) : (
                    <>
                      <Sparkle size={20} weight="duotone" />
                      Ver Artículos Generados con IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        },
        {
          title: 'Comparte tu Historia',
          content: '¿Tienes una historia de viaje que merece ser contada? ¿Descubriste un lugar secreto? ¿Aprendiste algo que otros deberían saber?\n\nNos encantaría publicar tu artículo. SendAI es una comunidad, y las mejores recomendaciones vienen de viajeros reales. Contáctanos y cuéntanos tu historia.'
        }
      ]}
      callToAction={{
        title: 'Inspírate y Planifica',
        description: 'Deja que las historias de otros viajeros te ayuden a diseñar tu próxima aventura',
        buttons: [
          { label: 'Ver Guía del Viajero', route: 'guia-del-viajero' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Explorar Destinos', route: 'destinos', variant: 'outline' }
        ]
      }}
    />
  )
}
