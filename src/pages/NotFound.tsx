import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageRoute } from '@/lib/types'
import { 
  MagnifyingGlass, 
  House, 
  Compass, 
  MapTrifold,
  Buildings,
  Path,
  Sparkle,
  Phone,
  UserCircle,
  Tag,
  Question
} from '@phosphor-icons/react'

interface NotFoundPageProps {
  onNavigate: (page: PageRoute) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const [loaded, setLoaded] = useState(false)
  const [cardsLoaded, setCardsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50)
    const cardsTimer = setTimeout(() => setCardsLoaded(true), 150)
    return () => {
      clearTimeout(timer)
      clearTimeout(cardsTimer)
    }
  }, [])

  const quickLinks = [
    { label: 'Inicio', icon: House, route: 'home' as PageRoute },
    { label: 'Explorar', icon: Compass, route: 'explorar' as PageRoute },
    { label: 'Destinos', icon: MapTrifold, route: 'destinos' as PageRoute },
    { label: 'Alojamientos', icon: Buildings, route: 'alojamientos' as PageRoute },
    { label: 'Tours', icon: Path, route: 'tours' as PageRoute },
    { label: 'Itinerario IA', icon: Sparkle, route: 'itinerario' as PageRoute },
    { label: 'Ofertas', icon: Tag, route: 'ofertas' as PageRoute },
    { label: 'Contacto', icon: Phone, route: 'contacto' as PageRoute },
  ]

  const authLinks = [
    { label: 'Acceso Turistas', icon: UserCircle, route: 'tourist-auth' as PageRoute },
    { label: 'Acceso Anfitriones', icon: House, route: 'host-auth' as PageRoute },
    { label: 'Ayuda', icon: Question, route: 'faq' as PageRoute },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className={`text-center mb-12 space-y-6 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative inline-block">
            <div className="text-[120px] sm:text-[160px] md:text-[200px] leading-none font-bold bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent animate-pulse-glow">
              404
            </div>
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-primary via-accent to-secondary -z-10"></div>
          </div>
          
          <div className="space-y-3 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Esta coordenada no existe
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              La página que buscas no se encuentra en nuestro mapa. 
              Pero no te preocupes, te ayudamos a encontrar tu camino.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => onNavigate('home')}
              className="gap-2 text-base sm:text-lg px-6 sm:px-8 hover-lift"
            >
              <House weight="fill" size={24} />
              Volver al inicio
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('explorar')}
              className="gap-2 text-base sm:text-lg px-6 sm:px-8 hover-lift"
            >
              <Compass weight="fill" size={24} />
              Explorar destinos
            </Button>
          </div>
        </div>

        <div className={`transition-all duration-500 delay-150 ${cardsLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Card className="glass-card border-primary/20 mb-6">
            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center justify-center gap-3 text-foreground">
                <MagnifyingGlass weight="bold" size={28} />
                Rutas populares
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {quickLinks.map((link, index) => (
                  <Button
                    key={link.route}
                    variant="ghost"
                    onClick={() => onNavigate(link.route)}
                    className="h-auto py-3 sm:py-4 px-3 sm:px-4 flex flex-col items-center gap-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <link.icon weight="duotone" size={28} className="text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-center">{link.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-secondary/20">
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6 px-4 sm:px-6">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {authLinks.map((link) => (
                  <Button
                    key={link.route}
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate(link.route)}
                    className="gap-2 hover:bg-secondary/10 text-xs sm:text-sm"
                  >
                    <link.icon weight="fill" size={18} />
                    {link.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
            <p>¿Problemas técnicos? <button onClick={() => onNavigate('contacto')} className="underline hover:text-foreground transition-colors">Contáctanos</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}
