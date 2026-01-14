import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tree, Lightning, Compass } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface VantixSensoryCategoriesProps {
  onNavigate: (page: PageRoute) => void
}

interface SensoryCategory {
  number: string
  title: string
  coordinate: string
  promise: string
  state: string
  icon: React.ReactNode
  gradient: string
  image: string
  route: PageRoute
}

const sensoryCategories: SensoryCategory[] = [
  {
    number: '01',
    title: 'RENACER',
    coordinate: 'Bosques de niebla, montañas andinas, cabañas invisibles.',
    promise: 'Volver al barro. Sentir el frío que despierta la piel. Recordar que eres un animal humano, no una máquina de productividad.',
    state: 'Conexión Primitiva',
    icon: <Tree size={48} weight="duotone" />,
    gradient: 'from-emerald-900 via-green-800 to-teal-900',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop',
    route: 'categoria-naturaleza'
  },
  {
    number: '02',
    title: 'EUFORIA',
    coordinate: 'Desiertos infinitos, olas que rompen, cumbres de vértigo.',
    promise: 'Que el corazón te golpee el pecho. Gritar hasta quedarte vacío. Reírte del miedo. Sentir que estás furiosamente vivo.',
    state: 'Adrenalina Pura',
    icon: <Lightning size={48} weight="duotone" />,
    gradient: 'from-orange-900 via-red-800 to-rose-900',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    route: 'categoria-aventura'
  },
  {
    number: '03',
    title: 'SILENCIO',
    coordinate: 'Arquitectura del vacío, piscinas infinitas, luz de atardecer.',
    promise: 'El lujo no es dorado, es silencioso. Espacios para detener el tiempo, para tener esa conversación pendiente, para amar despacio.',
    state: 'Paz Absoluta',
    icon: <Compass size={48} weight="duotone" />,
    gradient: 'from-slate-900 via-gray-800 to-zinc-900',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
    route: 'categoria-bienestar'
  }
]

export function VantixSensoryCategories({ onNavigate }: VantixSensoryCategoriesProps) {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-vantix-black">
      <div className="max-w-7xl mx-auto">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-vantix-bone mb-6">
            El Marketplace
          </h2>
          <p className="text-xl text-vantix-bone/60 font-mono uppercase tracking-wider">
            Categorías Sensoriales
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sensoryCategories.map((category, index) => (
            <motion.div
              key={category.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden bg-vantix-charcoal border-vantix-bone/10 hover:border-vantix-amber/40 transition-all duration-700 h-full">
                {/* Imagen de fondo con overlay */}
                <div className="relative h-80 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60 mix-blend-multiply z-10`} />
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Número flotante */}
                  <div className="absolute top-6 right-6 z-20">
                    <span className="text-8xl font-mono font-bold text-vantix-bone/20 leading-none">
                      {category.number}
                    </span>
                  </div>

                  {/* Ícono */}
                  <div className="absolute bottom-6 left-6 z-20 text-vantix-amber">
                    {category.icon}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-6">
                  {/* Título */}
                  <h3 className="text-3xl font-serif text-vantix-bone tracking-wide">
                    {category.title}
                  </h3>

                  {/* La Coordenada */}
                  <div>
                    <p className="text-xs font-mono text-vantix-amber uppercase tracking-widest mb-2">
                      La Coordenada
                    </p>
                    <p className="text-sm text-vantix-bone/70 font-serif leading-relaxed">
                      {category.coordinate}
                    </p>
                  </div>

                  {/* La Promesa */}
                  <div>
                    <p className="text-xs font-mono text-vantix-amber uppercase tracking-widest mb-2">
                      La Promesa
                    </p>
                    <p className="text-base text-vantix-bone/80 font-serif leading-relaxed">
                      {category.promise}
                    </p>
                  </div>

                  {/* Estado */}
                  <div className="pt-4 border-t border-vantix-bone/10">
                    <p className="text-xs font-mono text-vantix-bone/50 uppercase tracking-widest mb-3">
                      Estado
                    </p>
                    <p className="text-lg font-serif text-vantix-amber italic">
                      {category.state}
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => onNavigate(category.route)}
                    className="w-full bg-transparent border border-vantix-amber/30 hover:bg-vantix-amber hover:text-vantix-black text-vantix-amber font-mono uppercase tracking-wider transition-all duration-300"
                  >
                    Explorar Coordenadas
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
