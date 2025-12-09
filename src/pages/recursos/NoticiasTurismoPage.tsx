import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Newspaper, TrendUp, Megaphone, Compass, Briefcase, Airplane } from '@phosphor-icons/react'

interface NoticiasTurismoPageProps {
  onNavigate: (page: PageRoute) => void
}

export function NoticiasTurismoPage({ onNavigate }: NoticiasTurismoPageProps) {
  return (
    <ContentPage
      title="Noticias de Turismo"
      subtitle="Lo último del sector: tendencias, novedades, políticas y todo lo que mueve la industria del viaje en Colombia"
      heroGradient="from-secondary via-turquoise to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Mantente Informado',
          content: 'El mundo del turismo cambia constantemente. Nuevas rutas aéreas, políticas de visado, apertura de destinos, tendencias emergentes. Estar informado no solo te ayuda a planificar mejor: te convierte en un viajero más consciente y preparado.\n\nEsta sección es tu ventana al panorama turístico colombiano e internacional. Noticias curadas, análisis relevantes y actualizaciones que importan.'
        },
        {
          title: 'Temas que Cubrimos',
          content: 'Noticias organizadas por categorías',
          cards: [
            {
              title: 'Actualidad Nacional',
              description: 'Políticas turísticas, nuevas infraestructuras, inversiones en turismo y noticias que afectan a viajeros en Colombia.',
              icon: <Newspaper size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Tendencias de Viaje',
              description: 'Destinos emergentes, tipos de turismo en auge, comportamiento de viajeros post-pandemia.',
              icon: <TrendUp size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Nuevas Rutas y Vuelos',
              description: 'Aerolíneas que llegan, rutas que se abren, promociones importantes. Información clave para planificar mejor.',
              icon: <Airplane size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Destinos en Foco',
              description: 'Reportajes sobre lugares que están cobrando relevancia, zonas en desarrollo turístico, experiencias novedosas.',
              icon: <Compass size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Normativas y Requisitos',
              description: 'Cambios en visados, protocolos sanitarios, regulaciones que todo viajero debe conocer antes de partir.',
              icon: <Briefcase size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Eventos y Ferias',
              description: 'Ferias de turismo, eventos del sector, oportunidades de networking para profesionales y entusiastas.',
              icon: <Megaphone size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Información que Empodera',
          content: 'Creemos que un viajero informado es un viajero empoderado. Saber qué está pasando en el sector te permite tomar mejores decisiones, aprovechar oportunidades y evitar sorpresas desagradables.\n\nNuestro compromiso es entregarte información clara, verificada y relevante. Sin sensacionalismo, sin clickbait. Solo noticias que realmente importan.'
        }
      ]}
      callToAction={{
        title: 'Explora Contenido',
        description: 'Descubre más recursos para viajeros inteligentes',
        buttons: [
          { label: 'Ver Artículos', route: 'articulos' },
          { label: 'Guía del Viajero', route: 'guia-del-viajero' },
          { label: 'Blog', route: 'blog', variant: 'outline' }
        ]
      }}
    />
  )
}
