import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Path, Binoculars, Compass, Backpack, Mountains, Sun } from '@phosphor-icons/react'

interface SenderismoPageProps {
  onNavigate: (page: PageRoute) => void
}

export function SenderismoPage({ onNavigate }: SenderismoPageProps) {
  return (
    <ContentPage
      title="Caminar es Meditar"
      subtitle="Donde cada paso es una respiración, cada cima es una revelación, y cada sendero es una conversación silenciosa entre tú y la montaña"
      heroGradient="from-primary via-turquoise to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El Silencio de la Montaña',
          content: 'Hay algo sagrado en caminar. En sentir la tierra bajo los pies, el viento en la cara, el sol que calienta la espalda. En subir despacio, respirar hondo, y descubrir que el cansancio es también una forma de estar vivo.\n\nEl senderismo no es solo ejercicio: es meditación en movimiento. Es desconectarse del ruido para reconectarse con lo esencial. Es entender que la montaña no se conquista, se respeta. Y en ese respeto, en esa humildad, encontramos algo más grande que nosotros mismos.'
        },
        {
          title: 'Rutas que Transforman',
          content: 'Colombia es un paraíso vertical para los amantes del senderismo',
          cards: [
            {
              title: 'Páramos Andinos',
              description: 'Caminatas por ecosistemas únicos del mundo: frailejones, lagunas glaciares y paisajes que parecen de otro planeta.',
              icon: <Mountains size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Trekking Ciudad Perdida',
              description: '4 días de caminata hasta una ciudad ancestral Tayrona oculta en la Sierra Nevada. Una peregrinación hacia el origen.',
              icon: <Compass size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Senderos del Cocora',
              description: 'Valle del Cocora: caminar entre las palmas de cera más altas del mundo, en paisajes de postal viviente.',
              icon: <Path size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Montañas del Chicamocha',
              description: 'Cañón del Chicamocha, rutas de senderismo entre cañones profundos y vistas que cortan la respiración.',
              icon: <Binoculars size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Nevados y Glaciares',
              description: 'Nevado del Ruiz, Santa Isabel, Tolima: ascensos a cimas nevadas donde el aire es tan puro que duele.',
              icon: <Sun size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Selvas y Caminos',
              description: 'Senderos amazónicos, trekking en el Pacífico: caminar donde la selva es tan densa que el verde lo absorbe todo.',
              icon: <Backpack size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Caminar es Encontrarse',
          content: 'Cada sendero tiene su propio lenguaje. Algunos son suaves, contemplativos, para pensar mientras caminas. Otros son exigentes, empinados, para que pruebes de qué estás hecho. Pero todos, absolutamente todos, te enseñan algo.\n\nQue eres más fuerte de lo que creías. Que la naturaleza es generosa. Que el cansancio desaparece cuando ves el amanecer desde una cima. Que caminar con otros crea vínculos más profundos que mil conversaciones.\n\nEl senderismo en Colombia es una invitación a salir de la comodidad. A ensuciarte los zapatos. A sentir que estás vivo.'
        }
      ]}
      callToAction={{
        title: 'Empieza a Caminar',
        description: 'Descubre rutas guiadas y experiencias de senderismo seguras',
        buttons: [
          { label: 'Ver Tours de Senderismo', route: 'tours' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Explorar Naturaleza', route: 'naturaleza', variant: 'outline' }
        ]
      }}
    />
  )
}
