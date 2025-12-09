import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Confetti, MusicNotes, Balloon, Champagne, Calendar, Users } from '@phosphor-icons/react'

interface FestivalesPageProps {
  onNavigate: (page: PageRoute) => void
}

export function FestivalesPage({ onNavigate }: FestivalesPageProps) {
  return (
    <ContentPage
      title="Colombia se Celebra"
      subtitle="Donde cada fiesta es una explosión de vida, cada festival es un grito de identidad, y cada celebración es la prueba de que aquí, bailar es resistir"
      heroGradient="from-accent via-secondary to-turquoise"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El País que No Deja de Bailar',
          content: 'En Colombia no se celebra por celebrar. Se celebra porque la vida lo merece. Porque después de la lluvia viene el sol, porque después del trabajo viene la fiesta, porque aquí se aprendió hace siglos que la alegría es también una forma de resistencia.\n\nCada festival es una declaración de amor. Al ritmo, al color, a la tradición. Es disfraz, tambor, careta, orquesta, desfile. Es la calle que se convierte en escenario, y todos, absolutamente todos, son parte del show.'
        },
        {
          title: 'Festivales que Mueven el Alma',
          content: 'Descubre las celebraciones más icónicas de Colombia',
          cards: [
            {
              title: 'Carnaval de Barranquilla',
              description: 'El segundo carnaval más grande del mundo. 4 días de cumbia, marimonda, disfraces y alegría desatada en el Caribe.',
              icon: <Confetti size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Feria de Cali',
              description: 'La capital mundial de la salsa celebra con orquestas, cabalgatas y baile hasta el amanecer. Diciembre se vive en Cali.',
              icon: <MusicNotes size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Festival de la Leyenda Vallenata',
              description: 'Valledupar se convierte en el templo del acordeón. La competencia más importante de música vallenata del mundo.',
              icon: <Champagne size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Carnaval de Negros y Blancos',
              description: 'Pasto celebra la diversidad con comparsas, carrozas gigantes y un festival lleno de arte, color y pólvora.',
              icon: <Balloon size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Feria de las Flores',
              description: 'Medellín se viste de colores con el desfile de silleteros, campesinos que bajan de la montaña con flores a la espalda.',
              icon: <Users size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Festival de Teatro de Manizales',
              description: 'Uno de los festivales de teatro más importantes de América Latina. La ciudad se transforma en escenario viviente.',
              icon: <Calendar size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Fiesta es Identidad',
          content: 'Los festivales colombianos no son solo espectáculo para turistas. Son rituales de identidad, celebraciones donde la gente se reconoce, se abraza, se recuerda de dónde viene.\n\nEs el abuelo que le enseña al nieto a bailar cumbia. Es la reina del carnaval que lleva meses preparándose. Es el músico que toca hasta que le duelan los dedos. Es el pueblo entero que sale a la calle porque la alegría no cabe en una casa.\n\nEn Colombia, cada festival es una lección: la vida es corta, hay que bailarla.'
        }
      ]}
      callToAction={{
        title: 'Celebra Colombia',
        description: 'Planifica tu viaje para vivir los festivales más increíbles',
        buttons: [
          { label: 'Ver Fechas de Festivales', route: 'tours' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Explorar Cultura', route: 'cultura', variant: 'outline' }
        ]
      }}
    />
  )
}
