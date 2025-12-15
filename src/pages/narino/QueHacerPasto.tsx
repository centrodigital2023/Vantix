import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Church, MapPin, Camera, Mountains, Coffee, Heart } from '@phosphor-icons/react'

interface QueHacerPastoProps {
  onNavigate: (page: PageRoute) => void
}

export function QueHacerPasto({ onNavigate }: QueHacerPastoProps) {
  return (
    <ContentPage
      title="Pasto: Ciudad de las Sorpresas"
      subtitle="Donde las montañas abrazan el cielo, el arte es pólvora y color, y cada esquina guarda una historia por descubrir"
      heroGradient="from-primary via-secondary to-accent"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'La Ciudad que Pinta con Fuego',
          content: 'Pasto no es una ciudad cualquiera. Es la capital del carnaval más antiguo de América, donde el arte se hace con pólvora y las carretas se convierten en lienzos vivientes. Es una ciudad de montañas que tocan las nubes, de iglesias coloniales que guardan secretos de siglos, de plazas donde el tiempo parece detenerse.\n\nAquí, en el sur de Colombia, a más de 2.500 metros de altura, el aire es frío y el corazón de la gente es cálido. Pasto es rebeldía y tradición. Es pasado y futuro. Es un lugar que no esperas, pero que nunca olvidas.'
        },
        {
          title: 'Experiencias Imperdibles en Pasto',
          content: 'Descubre lo mejor de la capital de Nariño y sus alrededores',
          cards: [
            {
              title: 'Centro Histórico y Museos',
              description: 'Catedral, Plaza de Nariño, Museo del Oro Nariño, Museo del Carnaval, Teatro Imperial. Arquitectura colonial y cultura.',
              icon: <Church size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Laguna de la Cocha',
              description: 'Segunda laguna más grande de Colombia. Isla de La Corota (reserva natural), paseos en lancha, trucha fresca, niebla mágica.',
              icon: <MapPin size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Santuario de Las Lajas',
              description: 'A 1 hora: la basílica más impresionante de Colombia, construida sobre un cañón. Arquitectura gótica y peregrinación.',
              icon: <Church size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Carnaval de Negros y Blancos',
              description: 'Cada enero, Patrimonio UNESCO. Carretas monumentales, comparsas, música, día de blancos y negros. Fiesta cultural única.',
              icon: <Camera size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Volcán Galeras',
              description: 'El guardián de Pasto. Volcán activo con miradores seguros, trekking moderado, vista panorámica de la ciudad.',
              icon: <Mountains size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Gastronomía Pastusa',
              description: 'Cuy asado, empanadas de pipián, quesillo nariñense, hornado, champús, helados de paila. Sabores únicos del sur.',
              icon: <Coffee size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Artesanías Barniz de Pasto',
              description: 'Técnica mopa-mopa única en el mundo, Patrimonio Inmaterial. Talleres artesanales, proceso milenario, piezas únicas.',
              icon: <Heart size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Pueblos Cercanos',
              description: 'Sandoná (sombreros), La Cruz (colonial), Chachagüí (gastronomía), La Florida (café y naturaleza).',
              icon: <MapPin size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Vida Nocturna y Cultura',
              description: 'Zona Rosa de Pasto, bares con música en vivo, Teatro Imperial con obras y conciertos, ambiente universitario.',
              icon: <Camera size={40} className="text-turquoise" weight="duotone" />
            }
          ]
        },
        {
          title: 'Pasto Te Espera',
          content: 'Visitar Pasto es descubrir que Colombia tiene muchas caras, y esta es una de las más auténticas. Es entender que la belleza no siempre grita, a veces susurra.\n\nEs caminar por calles donde todavía la gente saluda. Es probar comida que no encuentras en ningún otro lugar. Es sentir el frío de la montaña y el calor de la hospitalidad.\n\nPasto no es un destino turístico masivo. Y precisamente por eso, es un tesoro. Un lugar para viajeros que buscan algo real.'
        }
      ]}
      callToAction={{
        title: 'Descubre Pasto',
        description: 'Explora tours y experiencias auténticas en la capital de Nariño',
        buttons: [
          { label: 'Ver Tours en Pasto', route: 'turismo-pasto' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Ver Alojamientos', route: 'alojamientos', variant: 'outline' }
        ]
      }}
    />
  )
}
