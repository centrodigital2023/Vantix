import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { MapTrifold, Bus, CarSimple, Airplane, Train, Boat } from '@phosphor-icons/react'

interface MapaTuristicoPageProps {
  onNavigate: (page: PageRoute) => void
}

export function MapaTuristicoPage({ onNavigate }: MapaTuristicoPageProps) {
  return (
    <ContentPage
      title="Mapa Turístico Interactivo"
      subtitle="Explora Colombia visualmente. Descubre destinos, rutas y conexiones entre los lugares más increíbles del país"
      heroGradient="from-turquoise via-primary to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Colombia a Vista de Pájaro',
          content: 'Un mapa no es solo una herramienta de navegación. Es una invitación a soñar. A trazar líneas entre ciudades, a imaginar rutas, a preguntarte: ¿y si voy de aquí... hasta allá?\n\nColombia es un país grande, diverso, con geografía compleja. Pero precisamente esa complejidad es lo que la hace fascinante. Cada región tiene su propio carácter, su clima, su acento, su comida.\n\nEste mapa interactivo te ayuda a visualizar distancias, conectar destinos y planificar rutas que tengan sentido. Porque viajar bien no solo es llegar: es saber cómo llegar.'
        },
        {
          title: 'Herramientas de Exploración',
          content: 'Navega el mapa con funciones inteligentes',
          cards: [
            {
              title: 'Filtrar por Categoría',
              description: 'Muestra solo playas, solo montañas, solo ciudades coloniales. Personaliza tu visualización según tus intereses.',
              icon: <MapTrifold size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Rutas Terrestres',
              description: 'Carreteras principales, autopistas, caminos secundarios. Calcula distancias y tiempos estimados de viaje.',
              icon: <CarSimple size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Conexiones Aéreas',
              description: 'Aeropuertos principales, rutas domésticas, aerolíneas que operan. Planifica vuelos internos eficientemente.',
              icon: <Airplane size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Transporte Público',
              description: 'Terminales de buses, estaciones de tren, puertos fluviales. Opciones económicas para moverse por el país.',
              icon: <Bus size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Rutas Fluviales',
              description: 'Ríos navegables, lanchas, ferries. En la Amazonía y el Pacífico, el agua es carretera.',
              icon: <Boat size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Puntos de Interés',
              description: 'Hoteles, restaurantes, miradores, parques nacionales. Todo marcado en el mapa para facilitar tu planificación.',
              icon: <Train size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Planifica con Inteligencia',
          content: 'El mapa es solo el inicio. Úsalo para:\n\n• Crear rutas lógicas que optimicen tu tiempo\n• Descubrir destinos intermedios que no conocías\n• Calcular presupuestos de transporte\n• Identificar zonas de difícil acceso que requieren más tiempo\n• Conectar experiencias: playa + montaña + ciudad en un solo viaje\n\nCombina el mapa con nuestro generador de itinerarios IA y tendrás la herramienta perfecta para diseñar el viaje de tus sueños.'
        }
      ]}
      callToAction={{
        title: 'Diseña tu Ruta',
        description: 'Usa el mapa interactivo y nuestras herramientas para planificar mejor',
        buttons: [
          { label: 'Crear Itinerario con IA', route: 'itinerario' },
          { label: 'Ver Transportes', route: 'transportes' },
          { label: 'Explorar Destinos', route: 'destinos', variant: 'outline' }
        ]
      }}
    />
  )
}
