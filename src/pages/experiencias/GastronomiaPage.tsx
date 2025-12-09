import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { ForkKnife, Coffee, Wine, Bread, Fish, Orange } from '@phosphor-icons/react'

interface GastronomiaPageProps {
  onNavigate: (page: PageRoute) => void
}

export function GastronomiaPage({ onNavigate }: GastronomiaPageProps) {
  return (
    <ContentPage
      title="Sabores que Cuentan Historias"
      subtitle="Donde cada bocado es un recuerdo, cada aroma es un abrazo, y cada plato es un viaje al corazón de Colombia"
      heroGradient="from-secondary via-accent to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El Lenguaje del Sabor',
          content: 'Hay cosas que no se pueden explicar con palabras. El sabor de la bandeja paisa cuando tienes hambre. El olor del sancocho hirviendo un domingo en la tarde. El primer sorbo de café recién pasado en la madrugada fría de la montaña.\n\nLa gastronomía colombiana no es solo comida: es memoria. Es la receta de la abuela escrita en el corazón. Es el maíz molido a mano, el plátano frito en el fogón de leña, el pescado recién sacado del mar.\n\nCada región de Colombia tiene su lengua culinaria. Y entender ese lenguaje es entender quiénes somos.'
        },
        {
          title: 'Rutas del Sabor',
          content: 'Descubre los sabores auténticos de cada región colombiana',
          cards: [
            {
              title: 'Cocina Caribeña',
              description: 'Arepas de huevo, sancocho de pescado, arroz con coco. El Caribe cocina con alegría, con el ritmo del mar y la frescura del trópico.',
              icon: <Fish size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Cocina Andina',
              description: 'Ajiaco bogotano, changua, tamales. La cocina de montaña es generosa, caliente, hecha para combatir el frío y calentar el alma.',
              icon: <ForkKnife size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Cocina Paisa',
              description: 'Bandeja paisa, arepa de chócolo, mondongo. Platos abundantes que hablan del trabajo duro y la hospitalidad infinita del paisa.',
              icon: <Bread size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Cocina Pacífica',
              description: 'Encocado de jaiba, arroz atollao, viche. Sabores intensos que nacen de la selva y el mar, con influencia africana y ancestral.',
              icon: <Orange size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Cocina del Eje Cafetero',
              description: 'Trucha, frijoles, patacones y el mejor café del mundo. Aquí el café no es bebida, es identidad.',
              icon: <Coffee size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Dulces y Postres',
              description: 'Arequipe, obleas, brevas con arequipe, cholao. La dulzura colombiana es capaz de convertir cualquier día en fiesta.',
              icon: <Wine size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Comer es Compartir',
          content: 'En Colombia, la comida nunca es un acto solitario. Es pretexto para reunir a la familia, para alargar la sobremesa, para contar historias mientras se enfría el tinto.\n\nEs el mercado campesino donde la señora te regala yerbas. Es la fonda de carretera donde te sirven con sonrisa. Es la plaza de mercado donde los colores, olores y voces crean una sinfonía de vida.\n\nViajar por Colombia a través de su gastronomía es entender que la mejor receta siempre lleva un ingrediente secreto: amor.'
        }
      ]}
      callToAction={{
        title: 'Prueba Colombia',
        description: 'Descubre tours gastronómicos y experiencias culinarias auténticas',
        buttons: [
          { label: 'Ver Tours Gastronómicos', route: 'tours' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Explorar Destinos', route: 'destinos', variant: 'outline' }
        ]
      }}
    />
  )
}
