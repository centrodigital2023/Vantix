import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { MapPin, Compass, Mountains, Umbrella, ForkKnife, Church } from '@phosphor-icons/react'

interface DestinosProps {
  onNavigate: (page: PageRoute) => void
}

export function Destinos({ onNavigate }: DestinosProps) {
  return (
    <ContentPage
      title="Descubre Colombia"
      subtitle="Explora los destinos más increíbles que Colombia tiene para ofrecer, desde playas paradisíacas hasta montañas majestuosas"
      heroGradient="from-turquoise via-primary to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Destinos por Región',
          content: 'Colombia es un país diverso con paisajes únicos en cada rincón. Desde la costa caribeña hasta la selva amazónica, cada región ofrece experiencias inolvidables.',
          cards: [
            {
              title: 'Región Caribe',
              description: 'Playas paradisíacas, ciudades coloniales y cultura vibrante en Cartagena, Santa Marta y San Andrés',
              icon: <Umbrella size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Región Andina',
              description: 'Montañas imponentes, ciudades modernas y pueblos coloniales en Bogotá, Medellín y Villa de Leyva',
              icon: <Mountains size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Región Pacífica',
              description: 'Selvas exuberantes, biodiversidad única y playas vírgenes en el Chocó y Nuquí',
              icon: <Compass size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Región Amazónica',
              description: 'Selva tropical, comunidades indígenas y la magia del río Amazonas en Leticia',
              icon: <MapPin size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Eje Cafetero',
              description: 'Paisajes cafeteros, pueblos pintorescos y haciendas tradicionales en Quindío y Caldas',
              icon: <ForkKnife size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Región Sur',
              description: 'Cultura ancestral, paisajes únicos y el desierto de la Tatacoa en Nariño y Huila',
              icon: <Church size={40} className="text-primary" weight="bold" />
            }
          ]
        }
      ]}
      callToAction={{
        title: '¿Listo para tu próxima aventura?',
        description: 'Explora nuestros tours personalizados o crea tu itinerario con IA',
        buttons: [
          { label: 'Ver Tours', route: 'tours' },
          { label: 'Crear Itinerario IA', route: 'itinerario' },
          { label: 'Ver Alojamientos', route: 'alojamientos', variant: 'outline' }
        ]
      }}
    />
  )
}
