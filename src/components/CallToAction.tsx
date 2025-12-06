import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface CallToActionProps {
  onNavigate: (page: PageRoute) => void
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 36px)`
            }}
          />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Crea tu itinerario personalizado con inteligencia artificial en minutos
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => onNavigate('itinerario')}
            >
              <Sparkle className="mr-2" weight="fill" />
              Generar Itinerario Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}