import { Button } from '@/components/ui/button'
import { Sparkle, ArrowDown } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { PageRoute, SearchFilters } from '@/lib/types'
import { AdvancedSearchBar } from '@/components/AdvancedSearchBar'

interface HeroSectionProps {
  onNavigate: (page: PageRoute) => void
  onSearch?: (filters: SearchFilters) => void
}

export function HeroSection({ onNavigate, onSearch }: HeroSectionProps) {
  const handleSearch = (filters: SearchFilters) => {
    if (onSearch) {
      onSearch(filters)
    }
    onNavigate('destino-resultados')
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-vantix-black">
      {/* Subtle animated background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(251, 191, 36, 0.05) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      
      {/* Subtle amber glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-vantix-amber/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vantix-amber/10 border border-vantix-amber/30 mb-6">
            <Sparkle size={16} weight="fill" className="text-vantix-amber" />
            <span className="text-sm font-medium text-vantix-amber">Potenciado por Inteligencia Artificial</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-vantix-bone">
            VANTIX: VIVIR ES 
            <span className="block text-vantix-amber mt-2">URGENTE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-vantix-dust mb-4 max-w-4xl mx-auto leading-relaxed font-serif">
            El tiempo no es oro, es vida. Y se está escapando mientras haces scroll.
          </p>
          
          <p className="text-lg md:text-xl text-vantix-bone/80 mb-10 max-w-3xl mx-auto leading-relaxed italic">
            La felicidad tiene coordenadas. Nosotros sabemos dónde están.
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-vantix-amber via-vantix-bone to-vantix-amber opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative">
                <AdvancedSearchBar onSearch={handleSearch} variant="hero" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-vantix-amber hover:bg-vantix-amber/90 text-vantix-black font-mono uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg shadow-vantix-amber/20"
              onClick={() => onNavigate('itinerario')}
            >
              <Sparkle className="mr-2" weight="fill" />
              Crear Itinerario con IA
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-vantix-amber/30 text-vantix-bone hover:bg-vantix-amber/10 hover:border-vantix-amber"
              onClick={() => onNavigate('explorar')}
            >
              Explorar Destinos
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={32} className="text-vantix-amber/50" />
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.05); }
          50% { transform: translate(-5px, 10px) scale(0.95); }
          75% { transform: translate(15px, 5px) scale(1.02); }
        }
      `}</style>
    </div>
  )
}