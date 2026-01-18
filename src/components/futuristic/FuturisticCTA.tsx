import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket } from '@phosphor-icons/react'
import { GlassCard } from './GlassCard'

interface FuturisticCTAProps {
  onAction?: () => void
}

export function FuturisticCTA({ onAction }: FuturisticCTAProps) {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 py-12 md:py-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 mb-8"
              >
                <Rocket size={40} weight="duotone" className="text-primary" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                ¿Listo para tu próxima
                <br />
                <span className="text-gradient">Aventura Inteligente?</span>
              </h2>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Únete a miles de viajeros que ya están descubriendo Colombia 
                de una manera completamente nueva con nuestra IA
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-xl"
                  onClick={onAction}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center gap-2">
                    Comenzar Ahora
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-lg hover:text-primary"
                >
                  Ver Demo
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span>Sin costos ocultos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span>IA entrenada localmente</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
