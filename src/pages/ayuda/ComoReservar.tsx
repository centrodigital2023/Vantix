import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageRoute } from '@/lib/types'
import { MagnifyingGlass, CalendarCheck, CreditCard, CheckCircle, Info } from '@phosphor-icons/react'

interface ComoReservarProps {
  onNavigate: (page: PageRoute) => void
}

export function ComoReservar({ onNavigate }: ComoReservarProps) {
  const steps = [
    {
      icon: MagnifyingGlass,
      title: 'Busca tu Destino',
      description: 'Explora destinos por categoría o usa nuestro buscador inteligente para encontrar el lugar perfecto.',
      tips: ['Usa filtros para refinar tu búsqueda', 'Lee las reseñas de otros viajeros', 'Compara diferentes opciones']
    },
    {
      icon: CalendarCheck,
      title: 'Selecciona Fechas y Habitación',
      description: 'Elige tus fechas de check-in y check-out, número de huéspedes y el tipo de habitación que prefieras.',
      tips: ['Verifica disponibilidad en tiempo real', 'Considera las políticas de cancelación', 'Revisa los servicios incluidos']
    },
    {
      icon: Info,
      title: 'Completa tu Información',
      description: 'Ingresa tus datos personales y cualquier solicitud especial para el alojamiento.',
      tips: ['Verifica que tu información sea correcta', 'Agrega peticiones especiales si las tienes', 'Guarda tus datos para futuras reservas']
    },
    {
      icon: CreditCard,
      title: 'Realiza el Pago',
      description: 'Completa el pago seguro a través de Mercado Pago con tu método preferido.',
      tips: ['Pagos 100% seguros con encriptación', 'Multiple métodos: tarjeta, PSE, efectivo', 'Confirmación inmediata']
    },
    {
      icon: CheckCircle,
      title: 'Recibe tu Confirmación',
      description: 'Obtén tu confirmación por email con todos los detalles de tu reserva y el voucher.',
      tips: ['Guarda tu email de confirmación', 'Descarga tu voucher en PDF', 'Accede a tu reserva desde "Mis Reservas"']
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">¿Cómo Reservar?</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Reservar tu alojamiento es fácil y seguro. Sigue estos simples pasos.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <Card key={idx} className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon size={32} className="text-primary" weight="bold" />
                    <h2 className="text-2xl font-bold">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" weight="bold" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-muted rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre destinos increíbles en Colombia y reserva con confianza
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => onNavigate('explorar')} size="lg">
              Explorar Destinos
            </Button>
            <Button onClick={() => onNavigate('tours')} variant="outline" size="lg">
              Ver Tours
            </Button>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <h3 className="font-bold text-lg mb-2">¿Tienes dudas?</h3>
            <p className="text-sm text-muted-foreground mb-4">Consulta nuestras preguntas frecuentes</p>
            <Button onClick={() => onNavigate('faq')} variant="outline" className="w-full">
              Ver FAQ
            </Button>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Necesitas ayuda</h3>
            <p className="text-sm text-muted-foreground mb-4">Nuestro equipo está listo</p>
            <Button onClick={() => onNavigate('soporte-turista')} variant="outline" className="w-full">
              Contactar Soporte
            </Button>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Seguridad</h3>
            <p className="text-sm text-muted-foreground mb-4">Conoce cómo protegemos tus datos</p>
            <Button onClick={() => onNavigate('centro-de-seguridad')} variant="outline" className="w-full">
              Ver Seguridad
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
