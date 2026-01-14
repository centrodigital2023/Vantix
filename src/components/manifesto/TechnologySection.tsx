import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card } from '@/components/ui/card'
import { CheckCircle, Shield, Sparkle, Lightning } from '@phosphor-icons/react'

interface TechnologyFeature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: TechnologyFeature[] = [
  {
    icon: <Sparkle size={32} weight="duotone" className="text-accent" />,
    title: 'Tecnología que siente',
    description: 'Vantix es un SaaS construido sobre la empatía. Nuestro código entiende que un viaje no es una transacción, es una transformación.'
  },
  {
    icon: <CheckCircle size={32} weight="duotone" className="text-accent" />,
    title: 'Verificación Humana',
    description: 'Cada anfitrión, cada guía, cada rincón ha sido validado no por un bot, sino por un humano que buscaba belleza.'
  },
  {
    icon: <Lightning size={32} weight="duotone" className="text-accent" />,
    title: 'Fluidez Absoluta',
    description: 'Reserva en tres clics. Sin letra pequeña. Sin ansiedad. Tu única preocupación debe ser elegir qué música escuchar en el camino.'
  },
  {
    icon: <Shield size={32} weight="duotone" className="text-accent" />,
    title: 'Seguridad',
    description: 'Protegemos tu viaje como protegemos tu sueño.'
  }
]

export function TechnologySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative py-32 bg-gradient-to-b from-[#1A1A1A] to-[#050505]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif-editorial font-bold mb-4">
            La Tecnología
          </h2>
          <p className="text-lg font-mono-tech text-muted-foreground">
            El Algoritmo Invisible
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-accent/10 hover:border-accent/30 transition-all duration-500 p-8 h-full">
                {/* Subtle grid pattern background */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="w-full h-full" 
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="p-3 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-mono-tech font-bold">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Architectural Diagram Lines - Decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 relative"
        >
          <svg className="w-full h-32 opacity-10" viewBox="0 0 800 100">
            <line x1="0" y1="50" x2="800" y2="50" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <line x1="200" y1="0" x2="200" y2="100" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <line x1="400" y1="0" x2="400" y2="100" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <line x1="600" y1="0" x2="600" y2="100" stroke="currentColor" strokeWidth="1" className="text-accent" />
            <circle cx="200" cy="50" r="4" fill="currentColor" className="text-accent" />
            <circle cx="400" cy="50" r="4" fill="currentColor" className="text-accent" />
            <circle cx="600" cy="50" r="4" fill="currentColor" className="text-accent" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
