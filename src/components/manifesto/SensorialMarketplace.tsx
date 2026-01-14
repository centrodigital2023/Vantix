import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'

interface Category {
  id: string
  number: string
  title: string
  subtitle: string
  coordinate: string
  promise: string
  state: string
  image: string
}

const categories: Category[] = [
  {
    id: 'renacer',
    number: '01',
    title: 'RENACER',
    subtitle: 'Naturaleza & Origen',
    coordinate: 'Bosques de niebla, montañas andinas, cabañas invisibles.',
    promise: 'Volver al barro. Sentir el frío que despierta la piel. Recordar que eres un animal humano, no una máquina de productividad.',
    state: 'Conexión Primitiva',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop'
  },
  {
    id: 'euforia',
    number: '02',
    title: 'EUFORIA',
    subtitle: 'Aventura & Pulso',
    coordinate: 'Desiertos infinitos, olas que rompen, cumbres de vértigo.',
    promise: 'Que el corazón te golpee el pecho. Gritar hasta quedarte vacío. Reírte del miedo. Sentir que estás furiosamente vivo.',
    state: 'Adrenalina Pura',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  },
  {
    id: 'silencio',
    number: '03',
    title: 'SILENCIO',
    subtitle: 'Retiros & Lujo',
    coordinate: 'Arquitectura del vacío, piscinas infinitas, luz de atardecer.',
    promise: 'El lujo no es dorado, es silencioso. Espacios para detener el tiempo, para tener esa conversación pendiente, para amar despacio.',
    state: 'Paz Absoluta',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop'
  }
]

interface SensorialMarketplaceProps {
  onCategorySelect?: (categoryId: string) => void
}

export function SensorialMarketplace({ onCategorySelect }: SensorialMarketplaceProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <div ref={ref} className="relative py-32 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif-editorial font-bold mb-4">
            El Marketplace
          </h2>
          <p className="text-lg font-mono-tech text-muted-foreground">
            Categorías Sensoriales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-accent/10 hover:border-accent/30 transition-all duration-500 h-full">
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Category Number */}
                  <div className="absolute top-4 left-4">
                    <span className="text-6xl font-mono-tech font-bold text-accent/20">
                      {category.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <div>
                    <h3 className="text-3xl font-serif-editorial font-bold mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm font-mono-tech text-accent">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Coordinate */}
                  <div>
                    <p className="text-xs font-mono-tech text-muted-foreground uppercase tracking-wider mb-1">
                      La Coordenada:
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      {category.coordinate}
                    </p>
                  </div>

                  {/* Promise */}
                  <div>
                    <p className="text-xs font-mono-tech text-muted-foreground uppercase tracking-wider mb-1">
                      La Promesa:
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {category.promise}
                    </p>
                  </div>

                  {/* State */}
                  <div className="pt-4 border-t border-accent/10">
                    <p className="text-xs font-mono-tech text-muted-foreground uppercase tracking-wider mb-1">
                      Estado:
                    </p>
                    <p className="text-base font-mono-tech text-accent font-bold">
                      {category.state}
                    </p>
                  </div>

                  {/* CTA - Visible on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                      hoveredCategory === category.id
                        ? { opacity: 1, height: 'auto' }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Button
                      onClick={() => onCategorySelect?.(category.id)}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-mono-tech gap-2 mt-4"
                    >
                      Explorar
                      <ArrowRight size={18} weight="bold" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
