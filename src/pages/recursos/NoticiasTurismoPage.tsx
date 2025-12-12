import { useState, useEffect } from 'react'
import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Newspaper, TrendUp, Megaphone, Compass, Briefcase, Airplane, Sparkle, ArrowsClockwise } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MagnifyingGlass, Calendar } from '@phosphor-icons/react'
import { generateNews, NewsItem } from '@/lib/ai-content'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { BlogPostDetail } from '@/components/BlogPostDetail'

interface NoticiasTurismoPageProps {
  onNavigate: (page: PageRoute) => void
}

const categories = [
  {
    title: 'Actualidad Nacional',
    description: 'Políticas turísticas, nuevas infraestructuras, inversiones en turismo y noticias que afectan a viajeros en Colombia.',
    icon: <Newspaper size={40} className="text-primary" weight="duotone" />
  },
  {
    title: 'Tendencias de Viaje',
    description: 'Destinos emergentes, tipos de turismo en auge, comportamiento de viajeros post-pandemia.',
    icon: <TrendUp size={40} className="text-turquoise" weight="duotone" />
  },
  {
    title: 'Nuevas Rutas y Vuelos',
    description: 'Aerolíneas que llegan, rutas que se abren, promociones importantes. Información clave para planificar mejor.',
    icon: <Airplane size={40} className="text-secondary" weight="duotone" />
  },
  {
    title: 'Destinos en Foco',
    description: 'Reportajes sobre lugares que están cobrando relevancia, zonas en desarrollo turístico, experiencias novedosas.',
    icon: <Compass size={40} className="text-accent" weight="duotone" />
  },
  {
    title: 'Normativas y Requisitos',
    description: 'Cambios en visados, protocolos sanitarios, regulaciones que todo viajero debe conocer antes de partir.',
    icon: <Briefcase size={40} className="text-primary" weight="duotone" />
  },
  {
    title: 'Eventos y Ferias',
    description: 'Ferias de turismo, eventos del sector, oportunidades de networking para profesionales y entusiastas.',
    icon: <Megaphone size={40} className="text-secondary" weight="duotone" />
  }
]

export function NoticiasTurismoPage({ onNavigate }: NoticiasTurismoPageProps) {
  const [news, setNews] = useKV<NewsItem[]>('news-content', [])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showNews, setShowNews] = useState(false)

  useEffect(() => {
    if (!news || news.length === 0) {
      handleGenerateContent()
    }
  }, [])

  useEffect(() => {
    let filtered = news || []

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      )
    }

    setFilteredNews(filtered)
  }, [news, searchQuery])

  const handleGenerateContent = async () => {
    setIsGenerating(true)
    toast.loading('Generando noticias con IA...', { id: 'generating-news' })
    
    try {
      const newNews = await generateNews(10)
      setNews(() => newNews)
      toast.success('Noticias generadas exitosamente', { id: 'generating-news' })
      setShowNews(true)
    } catch (error) {
      console.error('Error generating news:', error)
      toast.error('Error al generar noticias', { id: 'generating-news' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    setShowDetail(true)
  }

  if (showNews && news && news.length > 0) {
    return (
      <div className="min-h-screen">
        <div className="relative py-24 md:py-32 bg-gradient-to-br from-secondary via-turquoise to-primary overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Noticias de Turismo
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Lo último del sector turístico colombiano generado con IA
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
                  {isGenerating ? 'Actualizando...' : 'Actualizar Noticias'}
                </Button>
                <Button 
                  onClick={() => setShowNews(false)}
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
              placeholder="Buscar noticias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredNews.length === 0 && !isGenerating && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron noticias
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-1/4 mb-3" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                </div>
              ))}
            </div>
          )}

          {filteredNews.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredNews.map((newsItem) => (
                <Card 
                  key={newsItem.id}
                  className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => handleNewsClick(newsItem)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                        {newsItem.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={14} weight="duotone" />
                        {newsItem.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                      {newsItem.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{newsItem.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                      <Newspaper size={16} weight="duotone" />
                      <span>{newsItem.source}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <BlogPostDetail 
          post={selectedNews ? {
            id: selectedNews.id,
            title: selectedNews.title,
            excerpt: selectedNews.excerpt,
            content: selectedNews.content,
            image: selectedNews.image,
            author: selectedNews.source,
            date: selectedNews.date,
            category: selectedNews.category,
            readTime: 5,
            tags: [selectedNews.category]
          } : null}
          open={showDetail}
          onClose={() => setShowDetail(false)}
        />
      </div>
    )
  }

  return (
    <ContentPage
      title="Noticias de Turismo"
      subtitle="Lo último del sector: tendencias, novedades, políticas y todo lo que mueve la industria del viaje en Colombia"
      heroGradient="from-secondary via-turquoise to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Mantente Informado',
          content: 'El mundo del turismo cambia constantemente. Nuevas rutas aéreas, políticas de visado, apertura de destinos, tendencias emergentes. Estar informado no solo te ayuda a planificar mejor: te convierte en un viajero más consciente y preparado.\n\nEsta sección es tu ventana al panorama turístico colombiano e internacional. Noticias curadas, análisis relevantes y actualizaciones que importan.'
        },
        {
          title: 'Temas que Cubrimos',
          content: 'Noticias organizadas por categorías',
          cards: categories
        },
        {
          title: 'Noticias Generadas con Inteligencia Artificial',
          content: (
            <div>
              <p className="mb-6">
                Utilizamos IA avanzada para generar noticias actualizadas sobre el sector turístico en Colombia. Información objetiva, datos relevantes y análisis que te mantienen al día con las últimas tendencias.
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
                      Generando Noticias...
                    </>
                  ) : (
                    <>
                      <Sparkle size={20} weight="duotone" />
                      Ver Noticias Generadas con IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        },
        {
          title: 'Información que Empodera',
          content: 'Creemos que un viajero informado es un viajero empoderado. Saber qué está pasando en el sector te permite tomar mejores decisiones, aprovechar oportunidades y evitar sorpresas desagradables.\n\nNuestro compromiso es entregarte información clara, verificada y relevante. Sin sensacionalismo, sin clickbait. Solo noticias que realmente importan.'
        }
      ]}
      callToAction={{
        title: 'Explora Contenido',
        description: 'Descubre más recursos para viajeros inteligentes',
        buttons: [
          { label: 'Ver Artículos', route: 'articulos' },
          { label: 'Guía del Viajero', route: 'guia-del-viajero' },
          { label: 'Blog', route: 'blog', variant: 'outline' }
        ]
      }}
    />
  )
}
