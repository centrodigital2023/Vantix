import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EmotionalSearchBar } from './EmotionalSearchBar'

interface HeroManifestoProps {
  onSearch?: (query: string) => void
}

export function HeroManifesto({ onSearch }: HeroManifestoProps) {
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedSubtitle, setDisplayedSubtitle] = useState('')
  const fullTitle = 'VANTIX: VIVIR ES URGENTE.'
  const fullSubtitle = 'El tiempo no es oro, es vida. Y se está escapando mientras haces scroll. Has olvidado a qué huele la lluvia cuando no tienes prisa. Has olvidado el tacto de la arena fría. Has olvidado quién eres cuando nadie te mira. La felicidad tiene coordenadas. Nosotros sabemos dónde están.'

  useEffect(() => {
    let titleIndex = 0
    let subtitleInterval: NodeJS.Timeout | null = null
    
    const titleInterval = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1))
        titleIndex++
      } else {
        clearInterval(titleInterval)
        // Start subtitle after title is complete
        let subtitleIndex = 0
        subtitleInterval = setInterval(() => {
          if (subtitleIndex < fullSubtitle.length) {
            setDisplayedSubtitle(fullSubtitle.slice(0, subtitleIndex + 1))
            subtitleIndex++
          } else {
            if (subtitleInterval) clearInterval(subtitleInterval)
          }
        }, 25)
      }
    }, 80)

    return () => {
      clearInterval(titleInterval)
      if (subtitleInterval) clearInterval(subtitleInterval)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Subtle background video effect - simulated with gradient animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
        {/* System Operating Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-sm font-mono-tech tracking-widest text-accent uppercase mb-2">
            VANTIX
          </h2>
          <p className="text-lg font-mono-tech text-muted-foreground">
            El Sistema Operativo del Asombro
          </p>
        </motion.div>

        {/* Main Title with Typewriter Effect */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif-editorial font-bold mb-8 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedTitle}
          <span className="animate-pulse">|</span>
        </motion.h1>

        {/* Subtitle with Typewriter Effect */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl font-serif-editorial text-muted-foreground/90 mb-12 leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: displayedSubtitle.length > 0 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayedSubtitle}
        </motion.p>

        {/* Emotional Search Bar */}
        <EmotionalSearchBar onSearch={onSearch} />
      </div>
    </div>
  )
}
