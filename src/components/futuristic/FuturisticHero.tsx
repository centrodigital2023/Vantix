import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkle, Brain, MagicWand } from '@phosphor-icons/react'
import { ParticleField } from './ParticleField'
import { AIIndicator } from './AIIndicator'

interface FuturisticHeroProps {
  onExplore?: () => void
  onAI?: () => void
}

export function FuturisticHero({ onExplore, onAI }: FuturisticHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,191,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(138,82,255,0.15),transparent_50%)]" />
      </div>
      
      <ParticleField />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <AIIndicator active />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by AI Intelligence
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block">Viaja al</span>
            <span className="block text-gradient">Futuro del Turismo</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Plataforma inteligente que transforma la manera de descubrir Colombia. 
            Experiencias personalizadas con tecnología de vanguardia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl"
              onClick={onExplore}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                Explorar Destinos
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-xl"
              onClick={onAI}
            >
              <span className="flex items-center gap-2">
                <Brain className="group-hover:rotate-12 transition-transform" weight="duotone" />
                Asistente IA
              </span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Sparkle, label: 'Itinerarios IA', value: '10K+' },
            { icon: MagicWand, label: 'Destinos Únicos', value: '500+' },
            { icon: Brain, label: 'Recomendaciones', value: '98%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:border-primary/60 transition-all"
            >
              <stat.icon 
                size={32} 
                weight="duotone" 
                className="text-primary mb-3 group-hover:scale-110 transition-transform" 
              />
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
