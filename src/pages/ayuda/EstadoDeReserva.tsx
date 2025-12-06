import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'

interface EstadoDeReservaProps {
  onNavigate: (page: PageRoute) => void
}

export function EstadoDeReserva({ onNavigate }: EstadoDeReservaProps) {
  return (
    <ContentPage
      title="Estado de Mi Reserva"
      subtitle="Consulta el estado de tu reserva ingresando tu número de confirmación"
      heroGradient="from-primary to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          content: 'Ingresa a "Mis Reservas" para ver el estado de todas tus reservas en tiempo real.'
        }
      ]}
      callToAction={{
        title: 'Ver Mis Reservas',
        description: 'Accede a tu historial completo de reservas',
        buttons: [
          { label: 'Ir a Mis Reservas', route: 'mis-reservas' }
        ]
      }}
    />
  )
}
