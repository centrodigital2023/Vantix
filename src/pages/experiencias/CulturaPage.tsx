import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Church, Palette, MusicNotes, Ticket, BookOpen, Confetti } from '@phosphor-icons/react'

interface CulturaPageProps {
  onNavigate: (page: PageRoute) => void
}

export function CulturaPage({ onNavigate }: CulturaPageProps) {
  return (
    <ContentPage
      title="Cultura Viva"
      subtitle="Donde cada rincón cuenta una historia, cada rostro guarda un secreto, y cada tradición es un puente entre el pasado y el presente"
      heroGradient="from-accent via-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El Alma de un Pueblo',
          content: 'Hay lugares donde el tiempo no se mide en horas, sino en historias. Donde las calles empedradas susurran leyendas de conquistadores y revolucionarios, donde el olor del café recién molido se mezcla con el sonido de una guitarra lejana, y donde cada fachada colonial es un lienzo pintado por siglos de vida.\n\nColombia es un museo sin paredes. Un libro abierto escrito con arcilla, música, danza y memoria. Aquí, la cultura no se observa desde lejos: se vive, se respira, se siente en la piel. Cada ciudad es un verso, cada pueblo una estrofa, y tú, viajero, eres parte de este poema infinito.'
        },
        {
          title: 'Experiencias Culturales Únicas',
          content: 'Sumérgete en la riqueza cultural de Colombia a través de experiencias auténticas',
          cards: [
            {
              title: 'Ciudades Patrimonio',
              description: 'Cartagena, Villa de Leyva, Mompox: ciudades que detuvieron el tiempo. Camina entre murallas centenarias, plazas coloniales y balcones de flores.',
              icon: <Church size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Arte y Museos',
              description: 'Desde el oro precolombino hasta el arte urbano de Medellín. Botero, graffiti, artesanías y expresiones que cuentan quiénes somos.',
              icon: <Palette size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Música Tradicional',
              description: 'Cumbia, vallenato, bambuco, salsa. Cada región tiene su ritmo, cada ritmo cuenta una historia de amor, tierra y resistencia.',
              icon: <MusicNotes size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Teatro y Danza',
              description: 'Festivales de teatro en Manizales, danzas folclóricas en el Caribe, expresiones escénicas que son rituales de identidad.',
              icon: <Ticket size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Tradiciones Ancestrales',
              description: 'Comunidades indígenas, afrodescendientes y campesinas que preservan saberes, lenguas, tejidos y ceremonias milenarias.',
              icon: <BookOpen size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Festivales y Ferias',
              description: 'Carnaval de Barranquilla, Feria de Cali, Festival de Teatro, Fiestas de San Juan: celebraciones que son explosiones de vida.',
              icon: <Confetti size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Un Viaje al Corazón',
          content: 'Viajar por la cultura colombiana es entender que la historia no está solo en los libros, sino en los rostros de la gente, en las recetas de las abuelas, en las leyendas que se cuentan al atardecer.\n\nEs sentarte en una plaza y ver pasar la vida. Es escuchar un acordeón en una esquina y sentir que ese sonido lleva siglos resonando. Es probar un tamal envuelto en hoja de plátano y saber que ese gesto es amor hecho comida.\n\nLa cultura es la forma más honesta de conocer un lugar. No desde la ventana de un bus, sino desde el alma de su gente.'
        }
      ]}
      callToAction={{
        title: 'Vive la Cultura',
        description: 'Descubre tours culturales auténticos y experimenta Colombia desde su esencia',
        buttons: [
          { label: 'Ver Tours Culturales', route: 'tours' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Ver Destinos', route: 'destinos', variant: 'outline' }
        ]
      }}
    />
  )
}
