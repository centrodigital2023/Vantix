import { HeroSection } from '@/components/HeroSection'
import { WelcomeMessage } from '@/components/WelcomeMessage'
import { CategoryCard } from '@/components/CategoryCard'
import { Testimonials } from '@/components/Testimonials'
import { CallToAction } from '@/components/CallToAction'
import { PageRoute, Testimonial, SearchFilters } from '@/lib/types'
import { CATEGORIES } from '@/lib/data'
import { useKV } from '@github/spark/hooks'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkle, TrendUp } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface HomeProps {
  onNavigate: (page: PageRoute) => void
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    location: 'Madrid, España',
    text: 'SendAI hizo que planificar mi viaje a Colombia fuera increíblemente fácil. El itinerario generado por IA fue perfecto para mis intereses.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5
  },
  {
    id: '2',
    name: 'John Smith',
    location: 'New York, USA',
    text: 'La combinación de tecnología y conocimiento local es impresionante. Descubrí lugares que nunca habría encontrado por mi cuenta.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    location: 'Buenos Aires, Argentina',
    text: 'Las recomendaciones de alojamiento fueron excelentes y el servicio al cliente superó mis expectativas. ¡Volveré a usar SendAI!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5
  }
]

export function Home({ onNavigate }: HomeProps) {
  const [, setSearchFilters] = useKV<SearchFilters>('current-search-filters', {})
  const { trackInteraction, interactionCount } = useUserPreferences()

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'home' })
  }, [])

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(() => filters)
    if (filters.destination) {
      trackInteraction({ 
        type: 'search', 
        searchQuery: filters.destination 
      })
    }
  }

  const handleCategoryClick = (category: typeof CATEGORIES[0]) => {
    trackInteraction({ 
      type: 'click', 
      category: category.slug 
    })
    onNavigate(`categoria-${category.slug}` as PageRoute)
  }

  return (
    <>
      <HeroSection onNavigate={onNavigate} onSearch={handleSearch} />
      
      <WelcomeMessage />

      {interactionCount > 5 && (
        <div className="py-8 bg-gradient-to-r from-primary/5 via-accent/5 to-turquoise/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-turquoise/10 border-primary/20">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary/20 rounded-xl">
                        <Sparkle size={32} weight="duotone" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          Tu feed personalizado está listo
                        </h3>
                        <p className="text-muted-foreground mb-4 max-w-2xl">
                          Hemos aprendido tus preferencias y preparamos recomendaciones únicas para ti. 
                          Descubre destinos y alojamientos que se ajustan perfectamente a tus intereses.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendUp size={16} className="text-accent" />
                          <span>Basado en {interactionCount} interacciones</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      onClick={() => onNavigate('feed-personalizado')}
                      className="whitespace-nowrap gap-2"
                    >
                      <Sparkle size={20} />
                      Ver mi feed
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
      
      <div className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explora por categoría
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category)}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Testimonials testimonials={testimonials} />
      
      <CallToAction onNavigate={onNavigate} />
    </>
  )
}