import { FuturisticHero } from '@/components/futuristic/FuturisticHero'
import { CategoryGrid } from '@/components/futuristic/CategoryGrid'
import { FuturisticTestimonials } from '@/components/futuristic/FuturisticTestimonials'
import { FuturisticCTA } from '@/components/futuristic/FuturisticCTA'
import { GlassCard } from '@/components/futuristic/GlassCard'
import { PageRoute, Testimonial } from '@/lib/types'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkle, TrendUp, ArrowRight } from '@phosphor-icons/react'
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
