import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface CallToActionProps {
  onNavigate: (page: PageRoute) => void
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  return (
    <div className="py-16 md:py-24 bg-vantix-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-vantix-charcoal rounded-2xl p-12 md:p-16 text-center border border-vantix-amber/20 overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-vantix-amber/5 via-transparent to-vantix-amber/5" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-vantix-bone leading-tight">
              La vida es un evento breve.
            </h2>
            <p className="text-xl md:text-2xl text-vantix-bone/70 font-serif leading-relaxed">
              Posponer la dicha es un crimen contra tu propia existencia.
            </p>
            <p className="text-2xl md:text-3xl text-vantix-amber font-serif italic leading-relaxed">
              No esperes. Empieza ahora.
            </p>
            
            <div className="relative inline-block pt-4">
              <div className="absolute -inset-4 bg-vantix-amber/30 blur-2xl rounded-full opacity-60" />
              <Button 
                size="lg" 
                className="relative bg-vantix-amber hover:bg-vantix-amber/90 text-vantix-black font-mono uppercase tracking-widest px-12 py-8 text-lg md:text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-vantix-amber/50"
                onClick={() => onNavigate('itinerario')}
              >
                <Sparkle className="mr-3" weight="fill" size={24} />
                Encontrar mi Coordenada
              </Button>
            </div>
            
            <div className="pt-8">
              <div className="mx-auto w-64 h-px bg-gradient-to-r from-transparent via-vantix-amber to-transparent" />
              <p className="text-sm md:text-base text-vantix-bone/40 font-mono uppercase tracking-[0.3em] mt-6">
                Sistema Operativo del Asombro
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}