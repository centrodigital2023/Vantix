import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageRoute } from '@/lib/types'
import { 
  Warning,
  House, 
  ArrowClockwise,
  ChatCircleDots,
  Phone
} from '@phosphor-icons/react'

interface ServerErrorProps {
  onNavigate: (page: PageRoute) => void
}

export function ServerError({ onNavigate }: ServerErrorProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-background flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className={`text-center space-y-6 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-destructive/10 rounded-full flex items-center justify-center animate-pulse-glow">
              <Warning weight="fill" className="text-destructive w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <div className="absolute inset-0 blur-3xl opacity-20 bg-destructive -z-10"></div>
          </div>

          <div className="space-y-3 animate-fade-in">
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-destructive mb-4">
              500
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Error del servidor
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto px-4">
              Algo salió mal en nuestros servidores. 
              Nuestro equipo ya está trabajando en solucionarlo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              onClick={handleRefresh}
              className="gap-2 text-base sm:text-lg px-6 sm:px-8 hover-lift"
            >
              <ArrowClockwise weight="bold" size={24} />
              Recargar página
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('home')}
              className="gap-2 text-base sm:text-lg px-6 sm:px-8 hover-lift"
            >
              <House weight="fill" size={24} />
              Volver al inicio
            </Button>
          </div>

          <Card className="glass-card border-destructive/20 mt-8">
            <CardContent className="pt-6 pb-6 px-4 sm:px-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
                ¿Necesitas ayuda inmediata?
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('contacto')}
                  className="gap-2 hover:bg-secondary/10 text-sm"
                >
                  <ChatCircleDots weight="fill" size={20} />
                  Contáctanos
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('faq')}
                  className="gap-2 hover:bg-secondary/10 text-sm"
                >
                  <Phone weight="fill" size={20} />
                  Soporte
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-xs sm:text-sm text-muted-foreground mt-6">
            <p>Código de error: 500 | Internal Server Error</p>
          </div>
        </div>
      </div>
    </div>
  )
}
