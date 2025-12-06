import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Category } from '@/lib/types'
import * as PhosphorIcons from '@phosphor-icons/react'

interface CategoryCardProps {
  category: Category
  onClick: () => void
  delay?: number
}

export function CategoryCard({ category, onClick, delay = 0 }: CategoryCardProps) {
  const IconComponent = (PhosphorIcons as any)[category.icon] || PhosphorIcons.Circle

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card 
        className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0"
        onClick={onClick}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <IconComponent size={48} weight="fill" className="mb-3" />
            <h3 className="text-2xl font-bold mb-2 text-center">{category.name}</h3>
            <p className="text-sm text-center opacity-90 line-clamp-2">{category.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}