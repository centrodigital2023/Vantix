import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Camera, InstagramLogo, Article, Users, TrendUp, Heart } from '@phosphor-icons/react'

interface ColaboradoresPageProps {
  onNavigate: (page: PageRoute) => void
}

export function ColaboradoresPage({ onNavigate }: ColaboradoresPageProps) {
  return (
    <ContentPage
      title="Programa de Colaboradores"
      subtitle="Para creadores de contenido, influencers y storytellers que cuentan Colombia con autenticidad"
      heroGradient="from-accent via-turquoise to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Creadores que Inspiran',
          content: 'Hay personas que no solo viajan: cuentan historias. Capturan momentos, crean narrativas, inspiran a miles a descubrir lugares nuevos. Si eres fotógrafo, videógrafo, blogger, youtuber o influencer de viajes, este programa es para ti.\n\nCreemos en colaboraciones genuinas. No buscamos números vanidosos, buscamos voces auténticas que compartan nuestros valores: turismo responsable, historias reales, conexión con las comunidades locales.'
        },
        {
          title: 'Qué Ofrecemos',
          content: 'Beneficios del programa de colaboradores',
          cards: [
            {
              title: 'Viajes Patrocinados',
              description: 'Experiencias completas en destinos colombianos. Alojamiento, tours y actividades a cambio de contenido de calidad.',
              icon: <Camera size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Comisiones por Referidos',
              description: 'Gana entre 5-10% por cada reserva generada desde tus enlaces o códigos de descuento personalizados.',
              icon: <TrendUp size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Visibilidad en Plataforma',
              description: 'Tu contenido destacado en SendAI, redes sociales, blog y newsletters. Alcance a miles de viajeros potenciales.',
              icon: <InstagramLogo size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Colaboraciones a Largo Plazo',
              description: 'No creemos en campañas puntuales. Buscamos embajadores de marca que crezcan con nosotros.',
              icon: <Heart size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Material Exclusivo',
              description: 'Acceso anticipado a lanzamientos, experiencias exclusivas, eventos de la industria turística.',
              icon: <Article size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Comunidad de Creadores',
              description: 'Networking con otros colaboradores, intercambio de experiencias, colaboraciones cruzadas.',
              icon: <Users size={40} className="text-accent" weight="duotone" />
            }
          ]
        },
        {
          title: 'Requisitos',
          content: '• Mínimo 5,000 seguidores comprometidos en al menos una plataforma\n• Contenido de viajes como enfoque principal\n• Calidad consistente en fotografía, video o escritura\n• Engagement rate superior al 3%\n• Valores alineados con turismo responsable\n• Portafolio o media kit disponible\n\nNo buscamos mega influencers, buscamos micro y mid-tier influencers con audiencias reales y comprometidas.'
        },
        {
          title: 'Cómo Aplicar',
          content: '1. Completa el formulario de aplicación\n2. Comparte tu media kit y mejores ejemplos de contenido\n3. Cuéntanos por qué quieres colaborar con SendAI\n4. Evaluamos tu perfil (7-10 días)\n5. Llamada de onboarding si tu perfil es seleccionado\n6. ¡Empiezas a crear y viajar!\n\nLas aplicaciones están abiertas todo el año. Revisamos cada solicitud individualmente.'
        }
      ]}
      callToAction={{
        title: 'Únete a la Comunidad',
        description: 'Aplica ahora y empieza a contar Colombia de una manera auténtica',
        buttons: [
          { label: 'Aplicar como Colaborador', route: 'contacto' },
          { label: 'Ver Programa de Afiliados', route: 'afiliados', variant: 'outline' }
        ]
      }}
    />
  )
}
