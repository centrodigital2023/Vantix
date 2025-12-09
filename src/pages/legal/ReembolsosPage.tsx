import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { CurrencyDollar, Clock, ShieldCheck } from '@phosphor-icons/react'

interface ReembolsosPageProps {
  onNavigate: (page: PageRoute) => void
}

export function ReembolsosPage({ onNavigate }: ReembolsosPageProps) {
  return (
    <ContentPage
      title="Política de Reembolsos"
      subtitle="Tu tranquilidad es nuestra prioridad. Conoce nuestros procesos claros y justos"
      heroGradient="from-primary to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Compromiso con la Transparencia',
          content: 'Entendemos que los planes cambian. A veces la vida tiene otros diseños, y está bien. Por eso hemos construido una política de reembolsos clara, justa y humana.\n\nNo creemos en letra pequeña ni en trampas escondidas. Creemos en relaciones honestas entre viajeros y plataforma. Tu confianza es nuestro activo más valioso.'
        },
        {
          title: 'Cómo Funciona',
          content: 'Conoce los detalles de nuestra política',
          cards: [
            {
              title: 'Cancelación Flexible',
              description: 'Cancela hasta 48 horas antes del check-in y recibe el 100% de tu dinero. Sin preguntas, sin complicaciones.',
              icon: <Clock size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Reembolso Parcial',
              description: 'Cancelaciones entre 24-48 horas: reembolso del 50%. Política justa que protege tanto a viajeros como a anfitriones.',
              icon: <CurrencyDollar size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Procesamiento Rápido',
              description: 'Los reembolsos se procesan en 5-10 días hábiles. Notificación inmediata vía email con seguimiento.',
              icon: <ShieldCheck size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Condiciones Especiales',
          content: 'Casos de emergencia, desastres naturales o situaciones extraordinarias se evalúan caso por caso. Somos personas, y entendemos que hay circunstancias que escapan al control.\n\nSi tienes dudas o tu caso es particular, nuestro equipo está disponible para ayudarte. Porque viajar debe ser alegría, no ansiedad.'
        },
        {
          title: 'Importante',
          content: '• Cada alojamiento puede tener políticas adicionales específicas\n• Revisa los términos antes de confirmar tu reserva\n• Las tarifas de servicio no son reembolsables\n• Para tours y experiencias, consulta política particular de cada proveedor'
        }
      ]}
      callToAction={{
        title: '¿Necesitas Ayuda?',
        description: 'Nuestro equipo está listo para resolver cualquier duda sobre reembolsos',
        buttons: [
          { label: 'Contactar Soporte', route: 'contacto' },
          { label: 'Ver Política de Cancelación', route: 'politica-de-cancelacion', variant: 'outline' }
        ]
      }}
    />
  )
}
