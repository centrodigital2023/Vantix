import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface VantixHeroManifestoProps {
  onNavigate: (page: PageRoute) => void
  onEmotionalSearch?: (feeling: string) => void
}

export function VantixHeroManifesto({ onNavigate, onEmotionalSearch }: VantixHeroManifestoProps) {
  const [typedText, setTypedText] = useState('')
  const [currentSection, setCurrentSection] = useState(0)
  const [emotionalInput, setEmotionalInput] = useState('')
  const fullText = 'VANTIX: VIVIR ES URGENTE.'

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 3)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleEmotionalSearch = () => {
    if (onEmotionalSearch && emotionalInput) {
      onEmotionalSearch(emotionalInput)
    }
    onNavigate('explorar')
  }

  return (
    <div className="relative min-h-screen bg-vantix-black overflow-hidden">
      {/* Video de partículas de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-vantix-dust/10 to-transparent"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
            `,
            animation: 'dust-float 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* Cursor parpadeante sutil */}
      <motion.div
        className="absolute top-8 left-8 w-3 h-5 bg-vantix-amber"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section: El Despertar */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Titular Central con tipeo animado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-vantix-bone tracking-tight leading-[1.1]">
              {typedText}
              <motion.span
                className="inline-block w-1 h-12 md:h-16 bg-vantix-amber ml-2 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-base md:text-lg text-vantix-bone/60 font-mono uppercase tracking-wider"
            >
              El Sistema Operativo del Asombro
            </motion.div>
          </motion.div>

          {/* Subtítulo emocional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl text-vantix-bone/80 font-serif leading-relaxed mb-8">
              El tiempo no es oro, es vida. Y se está escapando mientras haces scroll. 
              Has olvidado a qué huele la lluvia cuando no tienes prisa. 
              Has olvidado el tacto de la arena fría. 
              Has olvidado quién eres cuando nadie te mira.
            </h2>
            <p className="text-xl md:text-2xl text-vantix-amber font-serif italic">
              La felicidad tiene coordenadas. Nosotros sabemos dónde están.
            </p>
          </motion.div>

          {/* Buscador Emocional */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-vantix-amber via-vantix-bone to-vantix-amber opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative flex gap-3 items-center bg-vantix-charcoal p-2 rounded-2xl border border-vantix-amber/20">
                <Input
                  type="text"
                  value={emotionalInput}
                  onChange={(e) => setEmotionalInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleEmotionalSearch()}
                  placeholder="No digas a dónde vas. Dinos qué necesitas sentir..."
                  className="flex-1 bg-transparent border-none text-vantix-bone placeholder:text-vantix-bone/40 text-base md:text-lg font-mono focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  onClick={handleEmotionalSearch}
                  className="bg-vantix-amber hover:bg-vantix-amber/90 text-vantix-black font-mono uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkle className="mr-2" weight="fill" />
                  Encontrar mi Coordenada
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-vantix-amber to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* El Manifiesto: Psicología del Deseo */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-vantix-charcoal">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-vantix-bone mb-8 leading-tight">
            ¿Por qué viajas?
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl text-vantix-bone/70 font-serif leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              No viajas para escapar de tu oficina. <span className="text-vantix-amber italic">Viajas para regresar a tu cuerpo.</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Vivimos anestesiados por la rutina, atrapados en un "modo supervivencia" que nos prohíbe sentir demasiado. 
              <span className="text-vantix-bone font-bold"> Vantix es el antídoto contra la apatía.</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl"
            >
              Aquí no vendemos camas de hotel ni itinerarios turísticos. 
              <span className="text-vantix-amber block mt-4">Aquí curamos escenarios para la alegría radical.</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Buscamos esos rincones del mundo diseñados para que sueltes el aire que llevas aguantando años. 
              Lugares donde la vulnerabilidad no es debilidad, sino la única forma de tocar la realidad.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl text-vantix-amber font-serif italic pt-8"
            >
              La vida es un evento breve. Posponer la dicha es un crimen contra tu propia existencia.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* CSS animations */}
      <style>{`
        @keyframes dust-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(-5px, 10px) scale(0.95); }
          75% { transform: translate(15px, 5px) scale(1.02); }
        }
      `}</style>
    </div>
  )
}
