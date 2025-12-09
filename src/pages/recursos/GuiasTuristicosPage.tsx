import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Compass, Users, Certificate, Globe, Wallet, Star } from '@phosphor-icons/react'

interface GuiasTuristicosPageProps {
  onNavigate: (page: PageRoute) => void
}

export function GuiasTuristicosPage({ onNavigate }: GuiasTuristicosPageProps) {
  return (
    <ContentPage
      title="Red de Guías Turísticos"
      subtitle="Para guías profesionales que quieren conectar con más viajeros y mostrar Colombia desde la experiencia local"
      heroGradient="from-primary via-accent to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Los Verdaderos Expertos',
          content: 'Un buen guía turístico no solo muestra lugares: cuenta historias. Conecta viajeros con el alma de un destino. Transforma un tour en una experiencia inolvidable.\n\nSi eres guía profesional certificado y quieres aumentar tu visibilidad, conectar con más viajeros y hacer parte de una red de profesionales apasionados, SendAI es tu plataforma.'
        },
        {
          title: 'Beneficios para Guías',
          content: 'Por qué unirte a nuestra red',
          cards: [
            {
              title: 'Más Visibilidad',
              description: 'Perfil destacado en SendAI. Miles de viajeros buscando experiencias auténticas verán tu trabajo.',
              icon: <Globe size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Reservas Directas',
              description: 'Sistema de reservas integrado. Los viajeros te encuentran, reservan y pagan todo desde la plataforma.',
              icon: <Compass size={40} className="text-turquoise" weight="duotone" />
            },
            {
              title: 'Comisión Justa',
              description: 'Solo 15% de comisión (vs 25-30% de otras plataformas). Tú pones el precio, tú ganas más.',
              icon: <Wallet size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Soporte Operativo',
              description: 'Atención al cliente, gestión de pagos, seguros de viaje. Nosotros manejamos la logística, tú guías.',
              icon: <Users size={40} className="text-accent" weight="duotone" />
            },
            {
              title: 'Certificación Verificada',
              description: 'Validamos tu RNT y certificaciones. Los viajeros confían más cuando ven la insignia de guía verificado.',
              icon: <Certificate size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Reseñas y Reputación',
              description: 'Sistema de reviews transparente. Construye tu reputación y atrae más clientes con 5 estrellas.',
              icon: <Star size={40} className="text-secondary" weight="duotone" />
            }
          ]
        },
        {
          title: 'Requisitos',
          content: '• Registro Nacional de Turismo (RNT) vigente como guía turístico\n• Cédula de ciudadanía o documento de identidad\n• Certificación de cursos de guianza (mínimo 120 horas)\n• Seguro de responsabilidad civil\n• Referencias verificables (mínimo 2)\n• Examen de conocimientos de la región donde operas\n\nPriorizamos calidad sobre cantidad. Cada guía es evaluado individualmente.'
        },
        {
          title: 'Tipos de Tours que Puedes Ofrecer',
          content: '• **City Tours**: Recorridos urbanos por ciudades y pueblos\n• **Ecoturismo**: Caminatas ecológicas, avistamiento de aves, naturaleza\n• **Aventura**: Rappel, rafting, parapente, deportes extremos\n• **Cultura**: Visitas a museos, sitios históricos, comunidades\n• **Gastronomía**: Tours culinarios, mercados, experiencias de cocina\n• **Especializados**: Fotografía, arqueología, biodiversidad\n\nTú defines tu especialidad, horarios y precios.'
        }
      ]}
      callToAction={{
        title: 'Únete a la Red',
        description: 'Aplica ahora y empieza a recibir reservas de viajeros',
        buttons: [
          { label: 'Registrarme como Guía', route: 'contacto' },
          { label: 'Ver Tours', route: 'tours', variant: 'outline' }
        ]
      }}
    />
  )
}
