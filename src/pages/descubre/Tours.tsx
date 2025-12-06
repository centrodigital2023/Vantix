import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Compass, MapTrifold, Backpack, Users, Calendar, Star } from '@phosphor-icons/react'

interface ToursProps {
  onNavigate: (page: PageRoute) => void
}

export function Tours({ onNavigate }: ToursProps) {
  return (
    <ContentPage
      title="Tours y Experiencias"
      subtitle="Descubre experiencias únicas diseñadas para todo tipo de viajeros. Tours guiados, aventuras extremas y vivencias culturales auténticas"
      heroGradient="from-accent via-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Tipos de Tours',
          content: 'Ofrecemos una amplia variedad de experiencias para que vivas Colombia de la mejor manera. Cada tour está diseñado por expertos locales.',
          cards: [
            {
              title: 'Tours de Aventura',
              description: 'Rafting, parapente, escalada, buceo y más actividades extremas para los amantes de la adrenalina',
              icon: <Backpack size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Tours Culturales',
              description: 'Recorridos por ciudades coloniales, museos, galerías y sitios históricos con guías especializados',
              icon: <MapTrifold size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Tours de Naturaleza',
              description: 'Senderismo, avistamiento de aves, safaris fotográficos en parques nacionales y reservas naturales',
              icon: <Compass size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Tours Gastronómicos',
              description: 'Experiencias culinarias, visitas a cafetales, mercados locales y clases de cocina tradicional',
              icon: <Star size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Tours Grupales',
              description: 'Viajes organizados con grupos pequeños para hacer amigos mientras exploras Colombia',
              icon: <Users size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Tours Privados',
              description: 'Experiencias personalizadas con guía privado y itinerario flexible según tus preferencias',
              icon: <Calendar size={40} className="text-secondary" weight="bold" />
            }
          ]
        },
        {
          title: 'Lo que Incluyen Nuestros Tours',
          content: `✓ Guías locales certificados y con experiencia
✓ Transporte desde punto de encuentro
✓ Todas las entradas y permisos necesarios
✓ Seguro de accidentes y asistencia
✓ Equipo especializado cuando se requiere
✓ Refrigerios o comidas según el tour
✓ Fotografías profesionales (tours seleccionados)
✓ Material informativo digital`
        }
      ]}
      callToAction={{
        title: 'Comienza tu Aventura',
        description: 'Explora todos nuestros tours o crea un itinerario personalizado con IA',
        buttons: [
          { label: 'Ver Todos los Tours', route: 'explorar' },
          { label: 'Crear Itinerario IA', route: 'itinerario' },
          { label: 'Contactar Asesor', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
