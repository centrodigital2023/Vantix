import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageRoute } from '@/lib/types'
import { Shield, Lock, Eye, UserCircle, CreditCard, CheckCircle } from '@phosphor-icons/react'

interface CentroDeSeguridadProps {
  onNavigate: (page: PageRoute) => void
}

export function CentroDeSeguridad({ onNavigate }: CentroDeSeguridadProps) {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Encriptación SSL',
      description: 'Todos tus datos están protegidos con encriptación de última generación'
    },
    {
      icon: CreditCard,
      title: 'Pagos Seguros',
      description: 'Procesamos pagos a través de Mercado Pago con certificación PCI DSS'
    },
    {
      icon: Eye,
      title: 'Privacidad Garantizada',
      description: 'Nunca compartimos tu información personal con terceros sin tu consentimiento'
    },
    {
      icon: Shield,
      title: 'Verificación de Alojamientos',
      description: 'Todos los alojamientos son verificados antes de aparecer en la plataforma'
    },
    {
      icon: UserCircle,
      title: 'Autenticación Segura',
      description: 'Sistema de autenticación de dos factores disponible para tu cuenta'
    },
    {
      icon: CheckCircle,
      title: 'Reservas Confirmadas',
      description: 'Confirmación instantánea y respaldo de todas tus reservas'
    }
  ]

  const tips = [
    'Verifica siempre la URL antes de ingresar datos personales',
    'Usa contraseñas únicas y seguras para tu cuenta',
    'Revisa los detalles del alojamiento y las políticas antes de reservar',
    'Guarda los comprobantes de pago y confirmación',
    'Nunca compartas tu información de pago por email o chat',
    'Reporta cualquier actividad sospechosa inmediatamente'
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Shield size={48} weight="bold" />
            <h1 className="text-4xl md:text-5xl font-bold">Centro de Seguridad</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            Tu seguridad es nuestra prioridad. Conoce cómo protegemos tu información y tus reservas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon size={40} className="text-primary mb-4" weight="bold" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Consejos de Seguridad</h2>
            <ul className="space-y-4">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle size={24} className="text-primary flex-shrink-0 mt-0.5" weight="bold" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">¿Encontraste algo sospechoso?</h2>
            <p className="text-muted-foreground mb-6">
              Si detectas actividad inusual o tienes dudas sobre la seguridad de tu reserva, contáctanos inmediatamente.
            </p>
            <div className="space-y-4">
              <Button onClick={() => onNavigate('soporte-turista')} size="lg" className="w-full">
                Reportar un Problema
              </Button>
              <Button onClick={() => onNavigate('contacto')} variant="outline" size="lg" className="w-full">
                Contactar Soporte
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Email de seguridad: <span className="font-semibold text-foreground">security@sendai.co</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Teléfono 24/7: <span className="font-semibold text-foreground">+57 320 123 4567</span>
              </p>
            </div>
          </div>
        </div>

        <Card className="p-8 bg-accent/10 border-accent">
          <h2 className="text-2xl font-bold mb-4">Certificaciones y Cumplimiento</h2>
          <p className="text-muted-foreground mb-4">
            SendAI cumple con todas las regulaciones internacionales de protección de datos y comercio electrónico:
          </p>
          <ul className="grid md:grid-cols-2 gap-3 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-accent" weight="bold" />
              ISO 27001 - Seguridad de la Información
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-accent" weight="bold" />
              PCI DSS - Estándar de Seguridad de Datos
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-accent" weight="bold" />
              GDPR - Reglamento General de Protección de Datos
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-accent" weight="bold" />
              Ley 1581 de 2012 - Protección de Datos Colombia
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
