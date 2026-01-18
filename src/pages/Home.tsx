import { FuturisticHero } from '@/components/futuristic/FuturisticHero'
import { CategoryGrid } from '@/components/futuristic/CategoryGrid'
import { FuturisticTestimonials } from '@/components/futuristic/FuturisticTestimonials'
import { FuturisticCTA } from '@/components/futuristic/FuturisticCTA'
import { GlassCard } from '@/components/futuristic/GlassCard'
import { PageRoute, Testimonial } from '@/lib/types'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkle, TrendUp, ArrowRight, Storefront, ChartLine, Heart, Lightning } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface HomeProps {
  onNavigate: (page: PageRoute) => void
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    location: 'Madrid, España',
    text: 'Vantix hizo que planificar mi viaje a Colombia fuera increíblemente fácil. El itinerario generado por IA fue perfecto para mis intereses.',
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
    text: 'Las recomendaciones de alojamiento fueron excelentes y el servicio al cliente superó mis expectativas. ¡Volveré a usar Vantix!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5
  }
]

export function Home({ onNavigate }: HomeProps) {
  const { trackInteraction, interactionCount } = useUserPreferences()

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'home' })
  }, [])

  const handleExplore = () => {
    trackInteraction({ type: 'click', category: 'explore' })
    onNavigate('explorar')
  }

  const handleAI = () => {
    trackInteraction({ type: 'click', category: 'ai-itinerary' })
    onNavigate('itinerario')
  }

  const handleCTA = () => {
    trackInteraction({ type: 'click', category: 'cta' })
    onNavigate('explorar')
  }

  return (
    <div className="min-h-screen">
      <FuturisticHero onExplore={handleExplore} onAI={handleAI} />
      
      <div className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 gap-2 bg-accent text-white px-4 py-2 text-sm">
              <Lightning size={16} weight="fill" />
              Nuevo Marketplace
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              El Mejor Marketplace de Turismo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compara precios, encuentra ofertas exclusivas y reserva con confianza. 
              Combinamos lo mejor de Booking.com, Airbnb y Trivago.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <ChartLine size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comparación de Precios</h3>
                <p className="text-muted-foreground">
                  Ve el historial de precios y encuentra las mejores ofertas. 
                  Configura alertas para cuando bajen los precios.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-4">
                  <Sparkle size={32} className="text-secondary" weight="fill" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Anfitriones Verificados</h3>
                <p className="text-muted-foreground">
                  SuperAnfitriones con excelentes calificaciones, tiempos de respuesta 
                  rápidos y propiedades verificadas.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="p-3 bg-accent/10 rounded-xl w-fit mb-4">
                  <Heart size={32} className="text-accent" weight="fill" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Listas de Deseos</h3>
                <p className="text-muted-foreground">
                  Guarda tus alojamientos favoritos en listas organizadas. 
                  Recibe notificaciones cuando bajen de precio.
                </p>
              </GlassCard>
            </motion.div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('marketplace')}
              className="gap-2 px-8"
            >
              <Storefront size={24} />
              Explorar Marketplace
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {interactionCount > 5 && (
        <div className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />
                <div className="relative p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary/20 rounded-xl">
                        <Sparkle size={32} weight="duotone" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          Tu feed personalizado está listo
                        </h3>
                        <p className="text-muted-foreground mb-4 max-w-2xl">
                          Hemos aprendido tus preferencias y preparado recomendaciones únicas para ti. 
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
                      className="group whitespace-nowrap gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Sparkle size={20} />
                      Ver mi feed
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      )}
      
      <CategoryGrid onNavigate={onNavigate} />
      
      <FuturisticTestimonials testimonials={testimonials} />
      
      <FuturisticCTA onAction={handleCTA} />
    </div>
  )
}
