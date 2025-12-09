import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Users, Handshake, ChartLineUp, Globe, Star, Target } from '@phosphor-icons/react'

interface AgenciasPageProps {
  onNavigate: (page: PageRoute) => void
}

export function AgenciasPage({ onNavigate }: AgenciasPageProps) {
  return (
    <ContentPage
      title="Alianzas con Agencias de Viaje"
      subtitle="Crecemos juntos. Programa de colaboración para agencias que quieren potenciar su oferta turística"
      heroGradient="from-primary via-secondary to-accent"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El Poder de las Alianzas',
          content: 'SendAI no compite con agencias de viaje: colabora con ellas. Creemos que el futuro del turismo es híbrido: tecnología que empodera a profesionales, no que los reemplaza.\n\nSi eres una agencia de viajes que busca herramientas digitales, acceso a inventario exclusivo y un partner tecnológico confiable, estás en el lugar correcto.'
        },
        {
          title: 'Beneficios del Programa',
          content: 'Qué ganas al ser agencia partner de SendAI',
          cards: [
            {
              title: 'Comisiones Preferenciales',
              description: 'Gana entre 10-15% de comisión en cada reserva generada a través de tu cuenta partner. Pagos puntuales y transparentes.',
              icon: <ChartLineUp size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Panel de Control',
              description: 'Dashboard exclusivo para gestionar reservas, comisiones, clientes y estadísticas en tiempo real.',
              icon: <Target size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Soporte Dedicado',
              description: 'Ejecutivo de cuenta asignado, soporte prioritario, capacitaciones mensuales sobre la plataforma.',
              icon: <Handshake size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Acceso a Inventario',
              description: 'Miles de alojamientos, tours y experiencias en toda Colombia. Amplía tu catálogo sin aumentar costos operativos.',
              icon: <Globe size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'White Label',
              description: 'Personaliza la experiencia con tu marca. Tus clientes ven tu logo, no el nuestro.',
              icon: <Star size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Capacitación Continua',
              description: 'Webinars, materiales educativos, actualizaciones de producto. Te ayudamos a vender más y mejor.',
              icon: <Users size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Requisitos para Aplicar',
          content: '• Agencia de viajes legalmente constituida\n• RNT (Registro Nacional de Turismo) vigente\n• Mínimo 1 año de operación\n• Equipo de ventas activo\n• Compromiso de generar al menos 10 reservas mensuales\n\nEl proceso de aplicación toma 5-7 días hábiles. Evaluamos cada solicitud individualmente para asegurar un fit cultural y operativo.'
        },
        {
          title: 'Cómo Funciona',
          content: '1. **Aplica**: Completa el formulario de registro\n2. **Evaluación**: Revisamos tu perfil y agendamos llamada\n3. **Onboarding**: Capacitación de 2 semanas\n4. **Activación**: Recibes acceso al panel partner\n5. **Crecimiento**: Empiezas a vender y generar comisiones\n\nNo hay costos de entrada. Solo ganas cuando vendes.'
        }
      ]}
      callToAction={{
        title: '¿Listo para Crecer Juntos?',
        description: 'Aplica ahora al programa de agencias partner',
        buttons: [
          { label: 'Aplicar Ahora', route: 'contacto' },
          { label: 'Ver Términos', route: 'terminos', variant: 'outline' }
        ]
      }}
    />
  )
}
