import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'

interface SobreNosotrosProps {
  onNavigate: (page: PageRoute) => void
}

export function SobreNosotros({ onNavigate }: SobreNosotrosProps) {
  return (
    <ContentPage
      title="Sobre Vantix"
      subtitle="Somos una plataforma de turismo inteligente dedicada a hacer que viajar por Colombia sea fácil, seguro e inolvidable"
      heroGradient="from-primary via-secondary to-turquoise"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Nuestra Historia',
          content: `Vantix nació del sueño de hacer que el turismo en Colombia sea accesible para todos. Fundada en 2024 en Pasto, Nariño, comenzamos con la visión de combinar tecnología de inteligencia artificial con el conocimiento local para crear experiencias de viaje únicas.

Hoy somos la plataforma líder en itinerarios inteligentes, conectando a viajeros con alojamientos verificados, experiencias auténticas y la magia de Colombia.`
        },
        {
          title: 'Lo que nos Hace Diferentes',
          content: '',
          cards: [
            {
              title: 'Inteligencia Artificial',
              description: 'Usamos IA avanzada para crear itinerarios personalizados basados en tus preferencias y presupuesto'
            },
            {
              title: 'Alojamientos Verificados',
              description: 'Todos nuestros alojamientos son inspeccionados y verificados para garantizar tu seguridad'
            },
            {
              title: 'Expertos Locales',
              description: 'Nuestro equipo conoce Colombia como nadie, ofreciendo recomendaciones auténticas'
            },
            {
              title: 'Pagos Seguros',
              description: 'Procesamiento seguro con Mercado Pago y protección en cada transacción'
            },
            {
              title: 'Soporte 24/7',
              description: 'Estamos disponibles en todo momento para ayudarte durante tu viaje'
            },
            {
              title: 'Mejor Precio Garantizado',
              description: 'Trabajamos directamente con propietarios para ofrecerte las mejores tarifas'
            }
          ]
        },
        {
          title: 'Nuestro Compromiso',
          content: `Estamos comprometidos con el turismo sostenible y responsable. Trabajamos con comunidades locales, promovemos prácticas ecológicas y apoyamos la economía regional.

Cada reserva que haces contribuye directamente al desarrollo turístico de Colombia, apoyando a pequeños empresarios y preservando nuestro patrimonio cultural y natural.`
        }
      ]}
      callToAction={{
        title: '¿Quieres Saber Más?',
        description: 'Conoce nuestra misión, visión o contacta con nuestro equipo',
        buttons: [
          { label: 'Misión y Visión', route: 'mision-vision' },
          { label: 'Por Qué Elegirnos', route: 'por-que-elegirnos' },
          { label: 'Contacto', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
