import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { Star, Quotes } from '@phosphor-icons/react'

interface TestimonialCardProps {
  name: string
  location: string
  text: string
  image: string
  rating: number
  index?: number
}

export function TestimonialCard({
  name,
  location,
  text,
  image,
  rating,
  index = 0
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <GlassCard className="h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/30">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
              <Quotes size={12} weight="fill" className="text-primary-foreground" />
            </div>
          </div>

          <div className="flex-grow">
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>

          <div className="flex gap-0.5">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={16} weight="fill" className="text-primary" />
            ))}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed italic">
          "{text}"
        </p>
      </GlassCard>
    </motion.div>
  )
}

interface FuturisticTestimonialsProps {
  testimonials: Array<{
    id: string
    name: string
    location: string
    text: string
    image: string
    rating: number
  }>
}

export function FuturisticTestimonials({ testimonials }: FuturisticTestimonialsProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Historias <span className="text-gradient">Reales</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Miles de viajeros ya han transformado sus experiencias con nuestra plataforma inteligente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
