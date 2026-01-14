import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface VantixFinalImpulseProps {
  onNavigate: (page: PageRoute) => void
}

export function VantixFinalImpulse({ onNavigate }: VantixFinalImpulseProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-vantix-black">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* El Último Impulso */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-vantix-bone leading-tight">
            No guardes este deseo para "algún día".
          </h2>
          
          <p className="text-xl md:text-2xl text-vantix-bone/70 font-serif leading-relaxed">
            "Algún día" es el lugar donde mueren los sueños.
          </p>
          
          <p className="text-2xl md:text-3xl text-vantix-amber font-serif italic leading-relaxed">
            Tu vida está sucediendo ahora mismo.
          </p>
          
          <p className="text-lg md:text-xl text-vantix-bone/60 font-serif">
            El escenario está listo. La luz es perfecta. Solo faltas tú.
          </p>
        </motion.div>

        {/* CTA Final Grande */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-8"
        >
          <div className="relative inline-block group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-vantix-amber/30 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Button */}
            <Button
              onClick={() => onNavigate('explorar')}
              className="relative bg-vantix-amber hover:bg-vantix-amber/90 text-vantix-black font-mono uppercase tracking-widest px-12 py-8 text-lg md:text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-vantix-amber/50"
            >
              <Sparkle className="mr-3" size={28} weight="fill" />
              Desbloquear mis Coordenadas
            </Button>
          </div>
        </motion.div>

        {/* Línea de pulsación */}
        <motion.div
          className="mx-auto w-64 h-px bg-gradient-to-r from-transparent via-vantix-amber to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleX: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Frase final susurrada */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-vantix-bone/40 font-mono uppercase tracking-[0.3em]"
        >
          Vivir es urgente
        </motion.p>
      </div>

      {/* Efecto de respiración en el fondo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255, 176, 59, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 176, 59, 0.06) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 176, 59, 0.03) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  )
}
