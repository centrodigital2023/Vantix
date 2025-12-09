import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Article, MapPin, Camera, Book, Newspaper, Lightbulb } from '@phosphor-icons/react'

interface ArticulosPageProps {
  onNavigate: (page: PageRoute) => void
}

export function ArticulosPage({ onNavigate }: ArticulosPageProps) {
  return (
    <ContentPage
      title="Historias de Viajeros"
      subtitle="Relatos, consejos y experiencias reales de quienes se atrevieron a descubrir Colombia"
      heroGradient="from-primary via-accent to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Cada Viaje es una Historia',
          content: 'Los mejores viajes no se miden en kilómetros ni en fotos de Instagram. Se miden en historias que cuentas años después. En momentos que te cambiaron la forma de ver el mundo. En personas que conociste y nunca olvidaste.\n\nEsta sección es un espacio para esas historias. Escritas por viajeros reales, con errores, aciertos, risas y lecciones aprendidas en el camino.'
        },
        {
          title: 'Categorías de Artículos',
          content: 'Explora contenido por temas que te interesan',
          cards: [
            {
              title: 'Guías de Destinos',
              description: 'Qué hacer, dónde comer, cómo moverse. Guías honestas escritas por quienes ya estuvieron ahí.',
              icon: <MapPin size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Tips de Viaje',
              description: 'Consejos prácticos, trucos para ahorrar, errores a evitar. Sabiduría colectiva de la comunidad viajera.',
              icon: <Lightbulb size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Crónicas de Viajeros',
              description: 'Relatos en primera persona. Aventuras, desventuras, momentos épicos y anécdotas que merecen ser contadas.',
              icon: <Book size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Fotografía de Viajes',
              description: 'El arte de capturar momentos. Técnicas, equipo, lugares fotogénicos y cómo contar historias con imágenes.',
              icon: <Camera size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Cultura Local',
              description: 'Tradiciones, costumbres, historia. Artículos que te ayudan a entender el alma de cada lugar.',
              icon: <Article size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Viajes Sustentables',
              description: 'Cómo viajar respetando el medio ambiente y las comunidades locales. Turismo consciente y responsable.',
              icon: <Newspaper size={40} className="text-primary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Comparte tu Historia',
          content: '¿Tienes una historia de viaje que merece ser contada? ¿Descubriste un lugar secreto? ¿Aprendiste algo que otros deberían saber?\n\nNos encantaría publicar tu artículo. SendAI es una comunidad, y las mejores recomendaciones vienen de viajeros reales. Contáctanos y cuéntanos tu historia.'
        }
      ]}
      callToAction={{
        title: 'Inspírate y Planifica',
        description: 'Deja que las historias de otros viajeros te ayuden a diseñar tu próxima aventura',
        buttons: [
          { label: 'Ver Guía del Viajero', route: 'guia-del-viajero' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Explorar Destinos', route: 'destinos', variant: 'outline' }
        ]
      }}
    />
  )
}
