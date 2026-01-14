import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageRoute } from '@/lib/types'
import { MagnifyingGlass, House, Compass } from '@phosphor-icons/react'

interface NotFoundPageProps {
  onNavigate: (page: PageRoute) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 px-6 text-center">
          <div className="text-9xl font-bold text-primary/20 mb-4">404</div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Página no encontrada
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => onNavigate('home')}
              className="gap-2"
            >
              <House weight="fill" />
              Ir al inicio
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('explorar')}
              className="gap-2"
            >
              <Compass weight="fill" />
              Explorar destinos
            </Button>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <MagnifyingGlass weight="bold" />
              ¿Qué estabas buscando?
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Button
                variant="ghost"
                onClick={() => onNavigate('destinos')}
                className="text-sm"
              >
                Destinos
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('tours')}
                className="text-sm"
              >
                Tours
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('alojamientos')}
                className="text-sm"
              >
                Alojamientos
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('itinerario')}
                className="text-sm"
              >
                Crear itinerario
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('ofertas')}
                className="text-sm"
              >
                Ofertas
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate('faq')}
                className="text-sm"
              >
                Ayuda
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
