import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { MapTrifold, Umbrella, Mountains, Camera, Compass, Binoculars } from '@phosphor-icons/react'

interface LugaresImperdiblesProps {
  onNavigate: (page: PageRoute) => void
}

export function LugaresImperdibles({ onNavigate }: LugaresImperdiblesProps) {
  return (
    <ContentPage
      title="Nariño: Tesoros Escondidos"
      subtitle="Donde el Pacífico se encuentra con los Andes, y cada rincón es una postal que nadie esperaba encontrar"
      heroGradient="from-turquoise via-primary to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El Departamento de las Sorpresas',
          content: 'Nariño es un secreto a voces. Un lugar que pocos conocen, pero los que lo visitan nunca olvidan. Aquí conviven montañas nevadas y playas vírgenes del Pacífico. Lagunas de altura y cascadas escondidas. Pueblos coloniales y comunidades afrodescendientes.\n\nEs un departamento de contrastes, de biodiversidad extrema, de culturas que dialogan. Nariño no es fácil, pero los mejores viajes nunca lo son.'
        },
        {
          title: 'Lugares que Debes Conocer',
          content: 'Los destinos más impresionantes de Nariño',
          cards: [
            {
              title: 'Santuario de Las Lajas',
              description: 'La basílica más espectacular de Colombia, construida sobre un puente que cruza un cañón. Arquitectura gótica en medio de las montañas.',
              icon: <Camera size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Laguna de La Cocha',
              description: 'Paraíso de altura. Isla de La Corota, reserva natural, pueblitos de pescadores, niebla que lo envuelve todo.',
              icon: <MapTrifold size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Tumaco y el Pacífico',
              description: 'Playas vírgenes, mar bravo, selva hasta la orilla. Tumaco es el Pacífico nariñense: intenso, húmedo, inolvidable.',
              icon: <Umbrella size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Volcán Azufral',
              description: 'Laguna verde dentro del cráter. Paisaje lunar, silencio profundo, naturaleza que te hace sentir pequeño.',
              icon: <Mountains size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Pueblo de Ipiales',
              description: 'Frontera con Ecuador, puerta de entrada al Santuario de Las Lajas. Comercio, cultura, mezcla de dos países.',
              icon: <Compass size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Reserva La Planada',
              description: 'Uno de los lugares con mayor biodiversidad del planeta. Bosque de niebla, aves endémicas, naturaleza pura.',
              icon: <Binoculars size={40} className="text-turquoise" weight="duotone" />
            }
          ]
        },
        {
          title: 'Nariño es Diversidad',
          content: 'Viajar por Nariño es entender que Colombia es infinita. Que hay lugares donde el turismo masivo no ha llegado, y precisamente por eso conservan su magia.\n\nEs levantarse en Pasto con frío de montaña y terminar el día en Tumaco con calor de playa. Es ver nevados y selvas en el mismo viaje. Es conocer gente que te recibe como familia.\n\nNariño no está en las guías turísticas internacionales. Está en el corazón de los que se atreven a descubrirlo.'
        }
      ]}
      callToAction={{
        title: 'Explora Nariño',
        description: 'Descubre tours únicos por los lugares más impresionantes del departamento',
        buttons: [
          { label: 'Ver Tours en Nariño', route: 'tours-narino' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Turismo en Pasto', route: 'turismo-pasto', variant: 'outline' }
        ]
      }}
    />
  )
}
