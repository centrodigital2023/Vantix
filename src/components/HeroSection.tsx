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
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20"
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 20% 30%, transparent 0, transparent 40px, oklch(0.45 0.15 155 / 0.03) 40px, oklch(0.45 0.15 155 / 0.03) 41px),
            repeating-radial-gradient(circle at 80% 70%, transparent 0, transparent 40px, oklch(0.68 0.18 25 / 0.03) 40px, oklch(0.68 0.18 25 / 0.03) 41px)
          `
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkle size={16} weight="fill" className="text-accent" />
            <span className="text-sm font-medium text-accent">Potenciado por Inteligencia Artificial</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Tu viaje perfecto por
            <span className="block text-primary mt-2">Colombia comienza aquí</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Encuentra y reserva los mejores alojamientos, experiencias y tours
            en cada rincón del país
          </p>

          <div className="max-w-5xl mx-auto">
            <AdvancedSearchBar onSearch={handleSearch} variant="hero" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => onNavigate('itinerario')}
            >
              <Sparkle className="mr-2" weight="fill" />
              Crear Itinerario con IA
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
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
          <ArrowDown size={32} className="text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  )
}