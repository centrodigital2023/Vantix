import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { CalendarX, Info, Phone } from '@phosphor-icons/react'

interface CancelacionPageProps {
  onNavigate: (page: PageRoute) => void
}

export function CancelacionPage({ onNavigate }: CancelacionPageProps) {
  return (
    <ContentPage
      title="Política de Cancelación"
      subtitle="Flexibilidad con responsabilidad. Conoce las reglas claras para modificar o cancelar tus reservas"
      heroGradient="from-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Libertad para Cambiar de Planes',
          content: 'La vida es impredecible. Los viajes, a veces, también. Por eso hemos diseñado una política de cancelación que te da libertad sin sacrificar la seguridad de los anfitriones.\n\nCreemos en el equilibrio: proteger tu inversión y respetar el trabajo de quienes abren sus puertas para recibirte.'
        },
        {
          title: 'Tipos de Cancelación',
          content: 'Opciones según el tiempo de anticipación',
          cards: [
            {
              title: 'Cancelación Gratuita',
              description: 'Más de 48 horas antes del check-in: cancela sin costo y recupera el 100% de tu pago.',
              icon: <CalendarX size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Cancelación Moderada',
              description: 'Entre 24-48 horas: cancelación con cargo del 50%. Protege a ambas partes de cambios de último momento.',
              icon: <Info size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Sin Cancelación',
              description: 'Menos de 24 horas antes del check-in: no hay reembolso. El alojamiento ya rechazó otras reservas por ti.',
              icon: <Phone size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Cómo Cancelar',
          content: '1. Ingresa a "Mis Reservas" desde tu perfil\n2. Selecciona la reserva que deseas cancelar\n3. Haz clic en "Cancelar Reserva"\n4. Confirma la acción y recibe notificación inmediata\n5. El reembolso (si aplica) se procesa automáticamente'
        },
        {
          title: 'Excepciones y Casos Especiales',
          content: 'Emergencias médicas, desastres naturales o fuerza mayor se evalúan individualmente. Contacta a nuestro equipo de soporte con documentación relevante.\n\nLos anfitriones también pueden tener políticas específicas más flexibles. Siempre revisa los detalles de cada alojamiento antes de reservar.'
        }
      ]}
      callToAction={{
        title: '¿Tienes Dudas sobre tu Reserva?',
        description: 'Estamos aquí para ayudarte con cualquier situación',
        buttons: [
          { label: 'Contactar Soporte', route: 'soporte-turista' },
          { label: 'Ver Reembolsos', route: 'reembolsos', variant: 'outline' }
        ]
      }}
    />
  )
}
