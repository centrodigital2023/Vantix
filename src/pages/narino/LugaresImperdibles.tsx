import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { MapTrifold, Umbrella, Mountains, Camera, Compass, Binoculars, Tree, Church, Waves } from '@phosphor-icons/react'

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
          content: 'Los destinos más impresionantes de Nariño en sus 64 municipios',
          cards: [
            {
              title: 'Santuario de Las Lajas - Ipiales',
              description: 'La basílica más espectacular de Colombia, construida sobre un puente que cruza un cañón. Arquitectura gótica en medio de las montañas.',
              icon: <Camera size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Laguna de La Cocha - Pasto',
              description: 'Paraíso de altura. Isla de La Corota, reserva natural, pueblitos de pescadores, niebla que lo envuelve todo.',
              icon: <MapTrifold size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Tumaco y el Pacífico',
              description: 'Playas vírgenes, mar bravo, selva hasta la orilla. Tumaco es el Pacífico nariñense: intenso, húmedo, inolvidable.',
              icon: <Umbrella size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Volcán Azufral - Túquerres',
              description: 'Laguna verde dentro del cráter. Paisaje lunar, silencio profundo, naturaleza que te hace sentir pequeño.',
              icon: <Mountains size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Cumbal - Resguardo Indígena',
              description: 'Cultura ancestral Pastos, volcán Cumbal, lagunas de páramo. Comunidad indígena viva que preserva tradiciones milenarias.',
              icon: <Compass size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Reserva La Planada - Ricaurte',
              description: 'Uno de los lugares con mayor biodiversidad del planeta. Bosque de niebla, aves endémicas, naturaleza pura.',
              icon: <Binoculars size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Sandoná - Capital del Sombrero',
              description: 'Talleres artesanales de sombreros pintados a mano, técnica única en el mundo. Clima cálido y hospitalidad.',
              icon: <Tree size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Barbacoas - Río Telembí',
              description: 'Pueblo minero en la selva del Pacífico. Acceso solo por río, cultura afro, biodiversidad extrema.',
              icon: <Waves size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Centro Histórico de Pasto',
              description: 'Arquitectura colonial, iglesias centenarias, museos del carnaval. El corazón cultural del sur de Colombia.',
              icon: <Church size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Municipios Imperdibles de Nariño',
          content: `**Costa Pacífica**
• **Tumaco**: Puerto principal, playas El Morro y Bocagrande, cultura afro, gastronomía de mar
• **Barbacoas**: Pueblo minero en selva, río Telembí, acceso solo por río
• **El Charco**: Playas remotas, manglares, pesca artesanal, naturaleza virgen
• **Francisco Pizarro**: Isla con ecosistemas únicos, aves marinas, biodiversidad

**Región Andina Central**
• **Pasto**: Capital, carnaval UNESCO, laguna La Cocha, volcán Galeras, centro histórico
• **Sandoná**: Sombreros artesanales, clima cálido, arquitectura colonial
• **La Cruz**: Pueblo tradicional, gastronomía, iglesias centenarias
• **Buesaco**: Cascadas, páramos, café de altura, naturaleza

**Ex-Provincia de Obando**
• **Ipiales**: Santuario Las Lajas, frontera Ecuador, comercio, cultura fronteriza
• **Túquerres**: Volcán Azufral, laguna Verde, ganadería, clima templado
• **Cumbal**: Resguardo indígena Pastos, volcán activo, lagunas de páramo
• **Aldana**: Agricultura de altura, páramos, cultura campesina

**Otros Municipios Destacados**
• **La Florida**: Café de altura, cascadas, naturaleza
• **Nariño**: Volcán Chiles, frontera natural con Ecuador
• **Pupiales**: Agricultura, gastronomía, cercanía a Ipiales
• **Mallama**: Piedra de Mallama, paisajes andinos únicos`
        },
        {
          title: 'Nariño es Diversidad',
          content: 'Viajar por Nariño es entender que Colombia es infinita. Que hay lugares donde el turismo masivo no ha llegado, y precisamente por eso conservan su magia.\n\nEs levantarse en Pasto con frío de montaña y terminar el día en Tumaco con calor de playa. Es ver volcanes y selvas en el mismo viaje. Es conocer gente que te recibe como familia.\n\nCon 64 municipios, cada uno con su propia identidad, Nariño ofrece experiencias para todos: aventureros, contemplativos, culturales, gastronómicos. Desde playas del Pacífico hasta páramos andinos, desde comunidades indígenas hasta ciudades coloniales.'
        },
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
