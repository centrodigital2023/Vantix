import { motion } from 'framer-motion'
import { SmartCategoryCard } from './SmartCategoryCard'
import { 
  Mountains, 
  Waves, 
  ForkKnife, 
  Church, 
  Users, 
  Leaf,
  Briefcase,
  Sparkle,
  Heart,
  TreeEvergreen
} from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface CategoryGridProps {
  onNavigate: (page: PageRoute) => void
}

const categories = [
  {
    slug: 'aventura',
    title: 'Aventura',
    description: 'Experiencias extremas que elevan tu adrenalina',
    icon: <Mountains size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-primary/10 to-accent/5'
  },
  {
    slug: 'naturaleza',
    title: 'Naturaleza',
    description: 'Conecta con paisajes vírgenes y biodiversidad',
    icon: <TreeEvergreen size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-accent/10 to-primary/5'
  },
  {
    slug: 'gastronomia',
    title: 'Gastronomía',
    description: 'Descubre sabores auténticos y cocina local',
    icon: <ForkKnife size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-primary/5 to-accent/10'
  },
  {
    slug: 'playa',
    title: 'Playa',
    description: 'Costas paradisíacas y aguas cristalinas',
    icon: <Waves size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-accent/5 to-primary/10'
  },
  {
    slug: 'cultural',
    title: 'Cultural',
    description: 'Historia viva, arte y tradiciones ancestrales',
    icon: <Sparkle size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-primary/10 to-accent/10'
  },
  {
    slug: 'bienestar',
    title: 'Bienestar',
    description: 'Relájate y renueva cuerpo y mente',
    icon: <Heart size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-accent/10 to-primary/10'
  },
  {
    slug: 'religioso',
    title: 'Religioso',
    description: 'Peregrinaciones y turismo espiritual',
    icon: <Church size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-primary/5 to-accent/5'
  },
  {
    slug: 'familiar',
    title: 'Familiar',
    description: 'Diversión para todas las edades',
    icon: <Users size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-accent/5 to-primary/5'
  },
  {
    slug: 'rural',
    title: 'Rural',
    description: 'Vive la autenticidad del campo',
    icon: <Leaf size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-primary/10 to-accent/5'
  },
  {
    slug: 'negocios',
    title: 'Negocios',
    description: 'Combina productividad con experiencias',
    icon: <Briefcase size={32} weight="duotone" className="text-primary" />,
    gradient: 'bg-gradient-to-br from-accent/5 to-primary/10'
  }
]

export function CategoryGrid({ onNavigate }: CategoryGridProps) {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Explora por <span className="text-gradient">Categoría</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre experiencias curadas por nuestra inteligencia artificial según tus intereses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <SmartCategoryCard
              key={category.slug}
              title={category.title}
              description={category.description}
              icon={category.icon}
              gradient={category.gradient}
              index={index}
              onClick={() => onNavigate(`categoria-${category.slug}` as PageRoute)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
