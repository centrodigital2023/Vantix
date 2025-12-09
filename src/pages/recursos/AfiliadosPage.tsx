import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Coins, ChartLineUp, Link, Gift, Laptop, Target } from '@phosphor-icons/react'

interface AfiliadosPageProps {
  onNavigate: (page: PageRoute) => void
}

export function AfiliadosPage({ onNavigate }: AfiliadosPageProps) {
  return (
    <ContentPage
      title="Programa de Afiliados"
      subtitle="Monetiza tu audiencia recomendando SendAI. Gana comisiones recurrentes ayudando a otros a descubrir Colombia"
      heroGradient="from-secondary via-primary to-turquoise"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Gana Mientras Ayudas',
          content: 'Si tienes un blog de viajes, un canal de YouTube, un podcast, una comunidad online o simplemente amas recomendar buenos productos, el programa de afiliados de SendAI te permite ganar dinero compartiendo algo en lo que crees.\n\nNo requiere inversión inicial. No tienes que crear contenido patrocinado. Solo recomiendas SendAI cuando tenga sentido, y ganas comisión por cada venta generada.'
        },
        {
          title: 'Cómo Funciona',
          content: 'Sistema simple y transparente',
          cards: [
            {
              title: 'Inscríbete Gratis',
              description: 'Registro sin costo. Aprobación en 24-48 horas. Dashboard personalizado para rastrear todo.',
              icon: <Laptop size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Recibe tu Enlace',
              description: 'Link único de afiliado con código de seguimiento. Funciona en cualquier página de SendAI.',
              icon: <Link size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Comparte y Promociona',
              description: 'Blog posts, redes sociales, newsletters, videos. Donde tengas audiencia, puedes compartir.',
              icon: <Target size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Gana Comisiones',
              description: '5-8% de comisión por cada reserva completada. Cookie de 30 días: sigues ganando incluso si compran después.',
              icon: <Coins size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Recibe Pagos',
              description: 'Pagos mensuales vía transferencia bancaria. Mínimo de retiro: $100,000 COP. Siempre a tiempo.',
              icon: <ChartLineUp size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Bonos Especiales',
              description: 'Cumple metas mensuales y desbloquea bonos adicionales. Mientras más recomiendas, más ganas.',
              icon: <Gift size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Qué Puedes Promocionar',
          content: '• Alojamientos (hoteles, hostales, fincas)\n• Tours y experiencias\n• Paquetes de viaje\n• Generador de itinerarios IA\n• Transportes y servicios adicionales\n\nCada producto tiene su tasa de comisión. Tu dashboard muestra todo en tiempo real.'
        },
        {
          title: 'Quién Puede Ser Afiliado',
          content: 'No necesitas ser influencer ni tener miles de seguidores. Pueden aplicar:\n\n• Bloggers de viajes\n• Creadores de contenido\n• Agentes de viajes independientes\n• Comunidades online de viajeros\n• Cualquier persona con audiencia interesada en viajar\n\nLo importante no es el tamaño de tu audiencia, sino su compromiso y relevancia.'
        }
      ]}
      callToAction={{
        title: 'Empieza a Ganar Hoy',
        description: 'Inscríbete gratis y obtén tu enlace de afiliado en minutos',
        buttons: [
          { label: 'Inscribirme como Afiliado', route: 'contacto' },
          { label: 'Ver Programa de Colaboradores', route: 'colaboradores', variant: 'outline' }
        ]
      }}
    />
  )
}
