import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ServiceCategory, 
  SERVICE_CATEGORY_LABELS, 
  SERVICE_CATEGORY_ICONS,
  SERVICE_CATEGORY_COLORS 
} from '@/lib/types-services'
import { ArrowRight } from '@phosphor-icons/react'

interface ServiceCategorySelectorProps {
  onSelectCategory: (category: ServiceCategory) => void
}

const categories: ServiceCategory[] = [
  'transport',
  'tour',
  'attraction',
  'experience',
  'guide',
  'gastronomy'
]

const categoryDescriptions: Record<ServiceCategory, string> = {
  transport: 'Ofrece transporte turístico, alquiler de vehículos o traslados',
  tour: 'Organiza tours guiados y recorridos turísticos',
  attraction: 'Opera atracciones turísticas y actividades de aventura',
  experience: 'Crea experiencias culturales, rurales o de inmersión',
  guide: 'Presta servicios de guianza turística profesional',
  gastronomy: 'Ofrece experiencias gastronómicas y culinarias'
}

export function ServiceCategorySelector({ onSelectCategory }: ServiceCategorySelectorProps) {
  const [hoveredCategory, setHoveredCategory] = useState<ServiceCategory | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)

  const handleSelect = (category: ServiceCategory) => {
    setSelectedCategory(category)
    setTimeout(() => {
      onSelectCategory(category)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Qué tipo de servicio turístico ofreces?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona la categoría que mejor describe tu servicio. La IA ajustará el formulario para optimizar tu publicación.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category
            const isHovered = hoveredCategory === category

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-300
                    hover:shadow-2xl hover:scale-105
                    ${isSelected ? 'ring-4 ring-primary shadow-2xl scale-105' : ''}
                  `}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => handleSelect(category)}
                  style={{
                    borderColor: isHovered || isSelected ? SERVICE_CATEGORY_COLORS[category] : undefined
                  }}
                >
                  <div className="p-8 text-center">
                    <motion.div
                      className="text-7xl mb-4"
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {SERVICE_CATEGORY_ICONS[category]}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3">
                      {SERVICE_CATEGORY_LABELS[category]}
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      {categoryDescriptions[category]}
                    </p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered || isSelected ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        className="w-full"
                        style={{
                          backgroundColor: SERVICE_CATEGORY_COLORS[category]
                        }}
                      >
                        Seleccionar
                        <ArrowRight className="ml-2" />
                      </Button>
                    </motion.div>
                  </div>

                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <span className="text-sm font-medium">
              🧠 La IA optimizará tu servicio para máxima visibilidad
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
