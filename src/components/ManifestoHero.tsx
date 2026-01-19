import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, Sparkle, Lightning, Heart, Compass, MapPin } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { ParticleField } from '@/components/futuristic/ParticleField'

interface ManifestoHeroProps {
  onNavigate: (page: PageRoute) => void
  onEmotionalSearch?: (feeling: string) => void
}

const manifestoLines = [
  'VIVIR ES URGENTE.',
  'LA FELICIDAD TIENE COORDENADAS.',
  'TU PRÓXIMO MOMENTO TE ESPERA.'
]

const emotionalPrompts = [
  'necesito desconectar...',
  'quiero aventura...',
  'busco inspiración...',
  'anhelo paz...',
  'deseo celebrar...'
]

export function ManifestoHero({ onNavigate, onEmotionalSearch }: ManifestoHeroProps) {
  const [typedText, setTypedText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)
  const [emotionalInput, setEmotionalInput] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const fullText = manifestoLines[currentLine]
    
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    } else if (isTyping && typedText.length === fullText.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 2000)
      return () => clearTimeout(timeout)
    } else if (!isTyping) {
      const timeout = setTimeout(() => {
        setTypedText('')
        setCurrentLine((prev) => (prev + 1) % manifestoLines.length)
        setIsTyping(true)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [typedText, isTyping, currentLine])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % emotionalPrompts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleEmotionalSearch = () => {
    if (emotionalInput.trim()) {
      onEmotionalSearch?.(emotionalInput)
    }
    onNavigate('explorar')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />
      
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, oklch(0.65 0.25 285 / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, oklch(0.70 0.28 330 / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, oklch(0.55 0.22 195 / 0.10) 0%, transparent 70%)
            `
          }}
        />
      </div>
      
      <ParticleField />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLine}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/90"
                >
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-8 sm:h-10 bg-accent ml-2 align-middle"
                  />
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card backdrop-blur-xl p-8 space-y-6 border border-primary/20">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Heart size={20} weight="duotone" className="text-accent" />
                <span className="uppercase tracking-wider font-semibold">Búsqueda</span>
                    type="text"
                    value={emotionalInput}
                    onChange={(e) => setEmotionalInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmotionalSearch()}
                    placeholder={emotionalPrompts[placeholderIndex]}
                    className="flex-1 h-14 px-6 text-lg bg-background/80 backdrop-blur border-primary/30 focus:border-primary"
                  />
                  <Button
                    size="lg"
                    onClick={handleEmotionalSearch}
                    className="h-14 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <MagnifyingGlass size={24} weight="bold" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {['Aventura', 'Paz', 'Conexión', 'Descubrimiento'].map((emotion) => (
                  <Button
                    key={emotion}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEmotionalInput(emotion.toLowerCase())
                      setTimeout(handleEmotionalSearch, 100)
                    }}
                    className="text-sm hover:bg-primary/10 hover:text-primary"
                  >
                    <Sparkle size={14} weight="fill" className="mr-1" />
                    {emotion}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary/50 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-xl"
              onClick={() => onNavigate('explorar')}
            >
              <Compass size={24} weight="duotone" className="group-hover:rotate-45 transition-transform duration-500" />
              <span className="ml-2">Explorar Destinos</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-secondary/50 hover:border-secondary hover:bg-secondary/10 px-8 py-6 text-lg rounded-xl"
              onClick={() => onNavigate('itinerario')}
            >
              <Lightning size={24} weight="duotone" className="group-hover:scale-110 transition-transform" />
              <span className="ml-2">Asistente IA</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="pt-12"
          >
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} weight="fill" className="text-primary" />
                <span>1,200+ Coordenadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} weight="fill" className="text-accent" />
                <span>50K+ Momentos Vividos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
