import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Star, Heart, Sparkle, CheckCircle, Trophy, Users } from '@phosphor-icons/react'

interface PorQueElegirnosProps {
  onNavigate: (page: PageRoute) => void
}

export function PorQueElegirnos({ onNavigate }: PorQueElegirnosProps) {
  return (
    <ContentPage
      title="Por Qué Elegir SendAI"
      subtitle="Somos más que una plataforma de turismo. Somos tu aliado para descubrir Colombia de forma inteligente, segura y personalizada"
      heroGradient="from-accent via-primary to-turquoise"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Nuestras Fortalezas',
          content: 'SendAI combina tecnología de punta con conocimiento local profundo. Creamos experiencias de viaje únicas que se adaptan a ti.',
          cards: [
            {
              title: 'Inteligencia Artificial Avanzada',
              description: 'Nuestra IA crea itinerarios personalizados analizando tus preferencias, presupuesto, fechas y perfil de viajero en segundos.',
              icon: <Sparkle size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Alojamientos 100% Verificados',
              description: 'Cada propiedad es inspeccionada personalmente. Verificamos seguridad, higiene, servicios y autenticidad de fotos.',
              icon: <CheckCircle size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Mejor Precio Garantizado',
              description: 'Trabajamos directo con propietarios sin intermediarios. Si encuentras mejor precio, igualamos y te damos 10% adicional.',
              icon: <Trophy size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Expertos Locales',
              description: 'Nuestro equipo vive en Colombia y conoce cada rincón. Recomendaciones auténticas, no turísticas, sino experiencias reales.',
              icon: <Users size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Soporte 24/7 en tu Viaje',
              description: 'Línea directa, WhatsApp, chat en vivo. Estamos disponibles en todo momento para ayudarte con cualquier imprevisto.',
              icon: <Heart size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Calidad Certificada',
              description: '+10,000 viajeros satisfechos. Calificación promedio 4.8/5. Certificados en turismo sostenible y responsable.',
              icon: <Star size={40} className="text-primary" weight="bold" />
            }
          ]
        },
        {
          title: 'Lo que nos Diferencia',
          content: `**Tecnología que Simplifica**
No pierdas horas buscando en 10 sitios diferentes. Nuestra IA compara precios, disponibilidad, reseñas y crea el mejor itinerario automáticamente.

**Experiencias Locales Auténticas**
No somos un booking genérico. Conectamos con comunidades locales, pequeños hoteles familiares, guías nativos y experiencias que no encontrarás en otros lados.

**Transparencia Total**
Sin cargos ocultos. El precio que ves es el precio final. Política de cancelación flexible y reembolsos ágiles.

**Impacto Positivo**
El 5% de cada reserva se reinvierte en proyectos de turismo comunitario, conservación ambiental y desarrollo local en Colombia.`
        },
        {
          title: 'Nuestros Números',
          content: `**+10,000** viajeros han usado SendAI
**4.8/5** calificación promedio de usuarios
**+500** alojamientos verificados en toda Colombia
**95%** tasa de satisfacción en experiencias
**24/7** disponibilidad de soporte al cliente
**15 minutos** tiempo promedio de creación de itinerario
**32** destinos cubiertos en 10 departamentos
**100%** pagos seguros con cifrado bancario`
        },
        {
          title: 'Lo que Dicen Nuestros Viajeros',
          content: `"La mejor decisión fue usar SendAI. El itinerario con IA fue perfecto, nos llevó a lugares que nunca habríamos encontrado solos. El alojamiento en la finca cafetera superó nuestras expectativas." - María J., España

"Viajé sola a Colombia y siempre me sentí segura. El equipo de SendAI estuvo pendiente, los alojamientos eran exactamente como las fotos y los tours fueron increíbles." - Sarah M., USA

"Mejor precio que Booking y Airbnb. Además el soporte en español fue excelente, nos ayudaron cuando perdimos un vuelo y reorganizaron todo sin costo extra." - Carlos R., Argentina

"La IA es impresionante. Le dije mi presupuesto y preferencias, y en 5 minutos tenía un plan de 10 días perfecto. Cada recomendación fue un acierto total." - Lucas B., Brasil`
        }
      ]}
      callToAction={{
        title: 'Únete a Miles de Viajeros Felices',
        description: 'Comienza a planear tu viaje por Colombia con la mejor plataforma',
        buttons: [
          { label: 'Crear Itinerario con IA', route: 'itinerario' },
          { label: 'Ver Destinos', route: 'destinos' },
          { label: 'Contactar', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
