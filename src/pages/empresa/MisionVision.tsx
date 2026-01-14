import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Target, Eye, Heart, Leaf, Users, TrendUp } from '@phosphor-icons/react'

interface MisionVisionProps {
  onNavigate: (page: PageRoute) => void
}

export function MisionVision({ onNavigate }: MisionVisionProps) {
  return (
    <ContentPage
      title="Misión y Visión"
      subtitle="Nuestro propósito y hacia dónde vamos como empresa"
      heroGradient="from-secondary via-primary to-accent"
      onNavigate={onNavigate}
      sections={[
        {
          content: (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
                <Target size={48} weight="bold" className="mb-4" />
                <h2 className="text-3xl font-bold mb-4">Misión</h2>
                <p className="text-lg opacity-90">
                  Revolucionar la experiencia turística en Colombia mediante inteligencia artificial, 
                  conectando viajeros con experiencias auténticas y alojamientos de calidad, 
                  mientras promovemos el turismo sostenible y el desarrollo de comunidades locales.
                </p>
              </div>
              <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl">
                <Eye size={48} weight="bold" className="mb-4" />
                <h2 className="text-3xl font-bold mb-4">Visión</h2>
                <p className="text-lg opacity-90">
                  Ser la plataforma de turismo inteligente líder en Colombia para 2026, 
                  expandiéndonos a Latinoamérica como referente en planificación de viajes 
                  con IA, reconocidos por nuestra calidad, innovación y compromiso social.
                </p>
              </div>
            </div>
          )
        },
        {
          title: 'Nuestros Valores',
          content: '',
          cards: [
            {
              title: 'Innovación',
              description: 'Usamos tecnología de punta para crear soluciones que transforman la forma de viajar',
              icon: <TrendUp size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Autenticidad',
              description: 'Promovemos experiencias genuinas que reflejan la verdadera esencia de Colombia',
              icon: <Heart size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Sostenibilidad',
              description: 'Priorizamos prácticas turísticas responsables que protegen nuestro medio ambiente',
              icon: <Leaf size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Comunidad',
              description: 'Trabajamos de la mano con comunidades locales para generar desarrollo equitativo',
              icon: <Users size={40} className="text-turquoise" weight="bold" />
            }
          ]
        },
        {
          title: 'Nuestro Impacto',
          content: `Desde nuestro lanzamiento, hemos ayudado a miles de viajeros a descubrir Colombia de manera única. Trabajamos con más de 500 alojamientos verificados y apoyamos a más de 200 empresas turísticas locales.

Nuestro compromiso con el turismo sostenible ha generado:
• Más de 1,000 empleos directos e indirectos
• Apoyo a 50+ comunidades rurales
• Reducción del 30% en huella de carbono mediante planificación inteligente
• Preservación de 10+ sitios de patrimonio cultural

Cada viaje que planificas con Vantix contribuye a construir un turismo más justo y sostenible.`
        }
      ]}
      callToAction={{
        title: 'Sé Parte del Cambio',
        description: 'Viaja con propósito y ayúdanos a transformar el turismo en Colombia',
        buttons: [
          { label: 'Explorar Destinos', route: 'destinos' },
          { label: 'Ver Testimonios', route: 'testimonios' },
          { label: 'Únete al Equipo', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
