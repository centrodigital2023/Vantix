import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Calendar, Mountains, Coffee, Umbrella, MapPin, Sun } from '@phosphor-icons/react'

interface PlanesFinDeSemanaPageProps {
  onNavigate: (page: PageRoute) => void
}

export function PlanesFinDeSemanaPage({ onNavigate }: PlanesFinDeSemanaPageProps) {
  return (
    <ContentPage
      title="Escápate Este Fin de Semana"
      subtitle="Porque la vida es muy corta para esperar a tener vacaciones largas. Descubre destinos perfectos para 2-3 días"
      heroGradient="from-turquoise via-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'El Arte de la Escapada Corta',
          content: 'No necesitas dos semanas libres para viajar. A veces, 48 horas en el lugar correcto valen más que 15 días sin rumbo. Un fin de semana bien planeado puede recargar tu energía, cambiar tu perspectiva y regalarte historias que contarás por meses.\n\nLa clave está en elegir bien: destinos cercanos, experiencias concentradas, logística simple. Viajar inteligente, no largo.'
        },
        {
          title: 'Destinos Ideales para Fin de Semana',
          content: 'Escápate cerca, vuelve renovado',
          cards: [
            {
              title: 'Pueblos Coloniales',
              description: 'Villa de Leyva, Barichara, Guatapé. 2 horas desde ciudades principales. Arquitectura, tranquilidad, desconexión total.',
              icon: <MapPin size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Naturaleza Cerca',
              description: 'Parques naturales, reservas ecológicas, fincas agroturísticas. Verde, aire fresco, silencio.',
              icon: <Mountains size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Eje Cafetero Express',
              description: 'Salento, Valle del Cocora, haciendas cafeteras. Café, paisaje, aventura. Perfecto para 3 días.',
              icon: <Coffee size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Playas Cercanas',
              description: 'Santa Marta, Cartagena, Capurganá. Sol, mar, relax. Vuelos cortos, máxima desconexión.',
              icon: <Umbrella size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Aventura Rápida',
              description: 'Rafting en San Gil, parapente en Chicamocha, rappel en Suesca. Adrenalina concentrada.',
              icon: <Sun size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'City Breaks',
              description: 'Bogotá, Medellín, Cali. Museos, gastronomía, vida nocturna. Cultura urbana intensiva.',
              icon: <Calendar size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Cómo Planificar el Fin de Semana Perfecto',
          content: '**Viernes**: Sal después del trabajo. Llega al destino, cena, descansa.\n\n**Sábado**: Día completo de exploración. Levántate temprano, aprovecha cada hora. Una actividad grande + paseo tranquilo.\n\n**Domingo**: Mañana relajada. Desayuno sin prisa, una última visita. Regreso en la tarde.\n\nNo intentes hacer todo. Mejor pocas experiencias bien vividas que muchas a las carreras.'
        },
        {
          title: 'Tips para Escapadas Cortas',
          content: '• Empaca ligero: mochila pequeña es suficiente\n• Reserva con anticipación: los fines de semana se llenan rápido\n• Elige alojamientos céntricos: optimiza tu tiempo\n• Usa nuestro generador de itinerarios: planificación en minutos\n• Sal del trabajo y directo al destino: no pierdas tiempo en casa\n• Regresa el domingo en la tarde: lunes empieza descansado'
        }
      ]}
      callToAction={{
        title: 'Planea tu Escapada',
        description: 'Usa nuestro generador de itinerarios para diseñar el fin de semana perfecto',
        buttons: [
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Ver Ofertas', route: 'ofertas' },
          { label: 'Explorar Destinos', route: 'destinos', variant: 'outline' }
        ]
      }}
    />
  )
}
