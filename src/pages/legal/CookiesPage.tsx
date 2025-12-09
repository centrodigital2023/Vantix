import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Cookie, ShieldCheck, Gear } from '@phosphor-icons/react'

interface CookiesPageProps {
  onNavigate: (page: PageRoute) => void
}

export function CookiesPage({ onNavigate }: CookiesPageProps) {
  return (
    <ContentPage
      title="Política de Cookies"
      subtitle="Transparencia en cada clic. Entiende cómo usamos cookies para mejorar tu experiencia"
      heroGradient="from-accent to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Qué son las Cookies',
          content: 'Las cookies son pequeños archivos que se guardan en tu navegador cuando visitas nuestra plataforma. Son como migas de pan digital que nos ayudan a recordar tus preferencias y ofrecerte una experiencia personalizada.\n\nNo son magia oscura ni espionaje. Son herramientas técnicas que hacen que internet funcione mejor. Y te damos el control total sobre ellas.'
        },
        {
          title: 'Cómo las Usamos',
          content: 'Tipos de cookies que utilizamos en SendAI',
          cards: [
            {
              title: 'Cookies Esenciales',
              description: 'Necesarias para que la plataforma funcione: login, carrito de compras, sesión activa. No se pueden desactivar.',
              icon: <ShieldCheck size={40} className="text-primary" weight="duotone" />
            },
            {
              title: 'Cookies de Preferencias',
              description: 'Recuerdan tu idioma, moneda, destinos favoritos. Hacen que cada visita se sienta familiar.',
              icon: <Gear size={40} className="text-secondary" weight="duotone" />
            },
            {
              title: 'Cookies Analíticas',
              description: 'Nos ayudan a entender cómo usas SendAI para mejorarlo. Google Analytics, anónimas, con tu consentimiento.',
              icon: <Cookie size={40} className="text-turquoise" weight="duotone" />
            }
          ]
        },
        {
          title: 'Tu Control, Tu Decisión',
          content: 'Puedes aceptar, rechazar o personalizar las cookies desde nuestro banner. También puedes cambiar la configuración en cualquier momento desde tu navegador.\n\nNunca vendemos tus datos ni compartimos información personal con terceros sin tu consentimiento explícito.'
        },
        {
          title: 'Cómo Administrar Cookies',
          content: '• **Chrome**: Configuración > Privacidad > Cookies\n• **Firefox**: Opciones > Privacidad > Cookies\n• **Safari**: Preferencias > Privacidad > Cookies\n• **Edge**: Configuración > Privacidad > Cookies\n\nRecuerda: bloquear todas las cookies puede afectar la funcionalidad de la plataforma.'
        }
      ]}
      callToAction={{
        title: '¿Preguntas sobre Privacidad?',
        description: 'Revisa nuestra política completa o contáctanos directamente',
        buttons: [
          { label: 'Política de Privacidad', route: 'privacidad' },
          { label: 'Contacto', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
