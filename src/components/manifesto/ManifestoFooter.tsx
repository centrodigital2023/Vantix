import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'

interface ManifestoFooterProps {
  onUnlock?: () => void
}

export function ManifestoFooter({ onUnlock }: ManifestoFooterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative py-40 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Final Message */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif-editorial leading-relaxed text-muted-foreground/90">
            No guardes este deseo para{' '}
            <span className="text-foreground font-bold">"algún día"</span>.
          </p>

          <p className="text-2xl md:text-3xl lg:text-4xl font-serif-editorial leading-relaxed text-muted-foreground/90">
            <span className="text-accent font-bold">"Algún día"</span> es el lugar donde mueren los sueños.
          </p>

          <p className="text-2xl md:text-3xl lg:text-4xl font-serif-editorial leading-relaxed">
            Tu vida está sucediendo{' '}
            <span className="text-accent font-bold">ahora mismo</span>.
          </p>

          <p className="text-xl md:text-2xl font-serif-editorial text-muted-foreground/80 pt-8">
            El escenario está listo. La luz es perfecta. Solo faltas tú.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-12"
          >
            <Button
              onClick={onUnlock}
              size="lg"
              className="group relative overflow-hidden bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-8 text-xl font-mono-tech font-bold rounded-lg transition-all duration-300 hover:scale-105"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative flex items-center gap-3">
                DESBLOQUEAR MIS COORDENADAS
                <ArrowRight size={24} weight="bold" />
              </span>
            </Button>
          </motion.div>

          {/* Breathing cursor effect */}
          <motion.div
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pt-16"
          >
            <span className="text-accent text-4xl font-mono-tech">_</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
