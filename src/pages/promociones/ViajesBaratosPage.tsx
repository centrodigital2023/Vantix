import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { CurrencyDollar, Backpack, Bus, Bed, ForkKnife, Lightbulb, Calendar } from '@phosphor-icons/react'

interface ViajesBaratosPageProps {
  onNavigate: (page: PageRoute) => void
}

export function ViajesBaratosPage({ onNavigate }: ViajesBaratosPageProps) {
  return (
    <ContentPage
      title="Viajar No Tiene que Ser Caro"
      subtitle="Descubre cómo explorar Colombia con presupuesto limitado pero experiencias ilimitadas"
      heroGradient="from-secondary via-accent to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'La Riqueza Está en las Experiencias',
          content: 'Hay un mito que dice que viajar es caro. Y es mentira. Viajar puede ser tan económico o costoso como tú lo decidas. Lo importante no es cuánto gastas, sino qué vives.\n\nAlgunos de los mejores viajes no tienen precio: una conversación con un local, un amanecer en la montaña, perderte en un mercado campesino. Viajar barato no significa viajar mal. Significa viajar inteligente.'
        },
        {
          title: 'Estrategias para Viajar Más por Menos',
          content: 'Consejos prácticos para estirar tu presupuesto',
          cards: [
            {
              title: 'Temporada Baja',
              description: 'Viaja fuera de puentes y vacaciones. Precios hasta 50% más baratos. Destinos menos saturados, más auténticos.',
              icon: <Calendar size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Hostales y Posadas',
              description: 'Olvida hoteles lujosos. Hostales, posadas familiares, Airbnb económicos. Conoces más gente, pagas menos.',
              icon: <Bed size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Transporte Terrestre',
              description: 'Buses nocturnos ahorran una noche de alojamiento. Compartir carro con otros viajeros. Colectivos locales.',
              icon: <Bus size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Comida Local',
              description: 'Restaurantes de menú del día, plazas de mercado, comida callejera. Auténtico, delicioso y económico.',
              icon: <ForkKnife size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Tours Gratuitos',
              description: 'Free walking tours, museos con entrada libre, playas públicas, senderos sin costo. Hay mucho gratis si sabes dónde.',
              icon: <Backpack size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Flexibilidad',
              description: 'Vuelos entre semana más baratos. Fechas flexibles = mejores precios. Usa nuestro buscador de ofertas.',
              icon: <Lightbulb size={40} className="text-turquoise" weight="duotone" />
            }
          ]
        },
        {
          title: 'Destinos Económicos en Colombia',
          content: '**Menos de $500.000 COP (4 días / 3 noches)**:\n• Salento y Valle del Cocora\n• San Agustín (arqueología y naturaleza)\n• Minca (montañas cerca de Santa Marta)\n• Guatapé y El Peñol\n• Villa de Leyva\n• Barichara\n\n**Menos de $800.000 COP (5 días / 4 noches)**:\n• Santa Marta + Parque Tayrona\n• Eje Cafetero completo\n• San Gil (aventura)\n• Popayán + Tierradentro\n\nIncluye: transporte, alojamiento básico, comidas y actividades principales.'
        },
        {
          title: 'Mentalidad de Viajero Inteligente',
          content: 'Viajar barato no es tacañería. Es priorizar experiencias sobre lujos. Es levantarte temprano para ver el amanecer gratis. Es conversar con locales en vez de contratar tours caros. Es caminar en vez de tomar taxi.\n\nEs entender que la esencia del viaje no está en dónde duermes, sino en cómo vives cada momento.\n\nAl final, los mejores recuerdos no cuestan nada.'
        }
      ]}
      callToAction={{
        title: 'Empieza a Planificar',
        description: 'Usa nuestras herramientas para encontrar las mejores ofertas',
        buttons: [
          { label: 'Ver Ofertas', route: 'ofertas' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Planes Fin de Semana', route: 'planes-fin-de-semana', variant: 'outline' }
        ]
      }}
    />
  )
}
