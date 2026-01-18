import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { ArrowRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SmartCategoryCardProps {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  onClick?: () => void
  index?: number
}

export function SmartCategoryCard({
  title,
  description,
  icon,
  gradient,
  onClick,
  index = 0
}: SmartCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <GlassCard className="relative overflow-hidden h-full">
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient
        )} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>

          <h3 className="text-2xl font-semibold mb-2 group-hover:text-gradient transition-all">
            {title}
          </h3>

          <p className="text-muted-foreground mb-4 flex-grow">
            {description}
          </p>

          <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
            <span className="text-sm font-medium">Explorar</span>
            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      </GlassCard>
    </motion.div>
  )
}
