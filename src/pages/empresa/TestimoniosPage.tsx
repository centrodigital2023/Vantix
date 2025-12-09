import { PageRoute } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, User, MapPin, Heart } from '@phosphor-icons/react'

interface TestimoniosProps {
  onNavigate: (page: PageRoute) => void
}

export function TestimoniosPage({ onNavigate }: TestimoniosProps) {
  const testimonios = [
    {
      nombre: 'María Fernanda González',
      ubicacion: 'Bogotá, Colombia',
      destino: 'Cartagena y Islas del Rosario',
      rating: 5,
      texto: 'Nunca había usado una plataforma con IA para planificar viajes y quedé fascinada. El itinerario que me generó SendAI fue perfecto: equilibró playas, cultura y gastronomía. Todo salió exactamente como lo soñé. El alojamiento que reservé superó mis expectativas. Volveré a usar SendAI sin dudarlo.',
      fecha: 'Marzo 2024'
    },
    {
      nombre: 'Carlos Andrés Ramírez',
      ubicacion: 'Medellín, Colombia',
      destino: 'Eje Cafetero',
      rating: 5,
      texto: 'Viajar con mi familia siempre es complicado logísticamente. SendAI nos ahorró horas de planificación. El generador de itinerarios consideró que viajábamos con niños y nos recomendó actividades perfectas para ellos. La finca cafetera donde nos quedamos fue mágica. Mis hijos aún hablan del viaje.',
      fecha: 'Febrero 2024'
    },
    {
      nombre: 'Laura Martínez',
      ubicacion: 'Cali, Colombia',
      destino: 'San Agustín y Desierto de la Tatacoa',
      rating: 5,
      texto: 'Como viajera sola, la seguridad es mi prioridad. SendAI no solo me ayudó a diseñar una ruta increíble, sino que el soporte al cliente estuvo atento todo el tiempo. Los alojamientos verificados me dieron tranquilidad. San Agustín me cambió la vida. Colombia tiene tesoros que ni siquiera conocía.',
      fecha: 'Enero 2024'
    },
    {
      nombre: 'Sebastián Torres',
      ubicacion: 'Barranquilla, Colombia',
      destino: 'Parque Tayrona y Minca',
      rating: 5,
      texto: 'La combinación de playa y montaña que me sugirió la IA fue perfecta. Pasé de las playas del Tayrona a las cascadas de Minca en el mismo viaje. La logística de transporte fue impecable. El precio estuvo dentro de mi presupuesto. SendAI entiende lo que los viajeros realmente necesitamos.',
      fecha: 'Diciembre 2023'
    },
    {
      nombre: 'Ana Lucía Pérez',
      ubicacion: 'Bucaramanga, Colombia',
      destino: 'Barichara y San Gil',
      rating: 5,
      texto: 'Buscaba una escapada romántica de fin de semana y SendAI creó el plan perfecto. Barichara es el pueblo más bonito de Colombia y las actividades de aventura en San Gil fueron adrenalina pura. Mi pareja y yo volvimos enamorados del lugar y de nuestra relación. Gracias por existir.',
      fecha: 'Noviembre 2023'
    },
    {
      nombre: 'Diego Alejandro Ruiz',
      ubicacion: 'Pereira, Colombia',
      destino: 'Guatapé y Medellín',
      rating: 5,
      texto: 'Reservar fue súper fácil. En 10 minutos tenía todo listo: alojamiento, tours, transporte. La experiencia en Guatapé subiendo el Peñol fue épica. Medellín me sorprendió con su transformación. SendAI me ayudó a optimizar mi tiempo y conocer lo mejor de cada lugar. 100% recomendado.',
      fecha: 'Octubre 2023'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Heart size={48} weight="fill" className="text-accent-foreground mr-3" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Historias Reales de Viajeros</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto text-center">
            Porque las mejores recomendaciones vienen de quienes ya vivieron la experiencia. 
            Estos son algunos de los viajeros que confiaron en SendAI para descubrir Colombia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Calificación Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">2,847</div>
              <div className="text-sm text-muted-foreground">Reseñas Totales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-turquoise">98%</div>
              <div className="text-sm text-muted-foreground">Recomendarían</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((testimonio, idx) => (
            <Card key={idx} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-muted rounded-full p-3">
                  <User size={24} className="text-primary" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{testimonio.nombre}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <MapPin size={14} weight="fill" />
                    {testimonio.ubicacion}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonio.rating)].map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-accent" />
                ))}
              </div>

              <div className="mb-3">
                <div className="text-sm font-semibold text-primary mb-1">
                  Viajó a: {testimonio.destino}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{testimonio.texto}"
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                {testimonio.fecha}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-muted rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Viajaste con SendAI?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comparte tu experiencia y ayuda a otros viajeros a decidirse. 
            Tu historia puede inspirar el próximo gran viaje de alguien.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => onNavigate('contacto')} size="lg" className="gap-2">
              <Heart size={20} weight="bold" />
              Comparte tu Historia
            </Button>
            <Button onClick={() => onNavigate('itinerario')} variant="outline" size="lg">
              Crea tu Itinerario
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
