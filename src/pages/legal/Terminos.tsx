import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'

interface TerminosProps {
  onNavigate: (page: PageRoute) => void
}

export function Terminos({ onNavigate }: TerminosProps) {
  return (
    <ContentPage
      title="Términos y Condiciones"
      subtitle="Última actualización: Enero 2025"
      heroGradient="from-foreground to-foreground"
      onNavigate={onNavigate}
      sections={[
        {
          title: '1. Aceptación de Términos',
          content: `Al acceder y utilizar SendAI, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra plataforma.`
        },
        {
          title: '2. Uso de la Plataforma',
          content: `SendAI es una plataforma de intermediación turística que conecta viajeros con proveedores de alojamiento y servicios turísticos en Colombia. No somos propietarios ni operadores de los alojamientos listados.

Los usuarios se comprometen a:
• Proporcionar información precisa y actualizada
• Usar la plataforma de manera legal y ética
• No realizar actividades fraudulentas o que perjudiquen a otros usuarios
• Respetar las políticas de cada alojamiento`
        },
        {
          title: '3. Reservas y Pagos',
          content: `• Todas las reservas están sujetas a disponibilidad
• Los precios mostrados pueden variar según fechas y disponibilidad
• Los pagos se procesan a través de Mercado Pago
• Recibirás confirmación por email una vez procesado el pago
• Las cancelaciones están sujetas a las políticas de cada alojamiento`
        },
        {
          title: '4. Responsabilidades',
          content: `SendAI actúa como intermediario. Los proveedores de servicios son responsables de:
• La calidad y veracidad de la información de sus listados
• El cumplimiento de servicios y amenidades ofrecidas
• La seguridad y condiciones de sus instalaciones

SendAI no se hace responsable por:
• Servicios no prestados por el proveedor
• Daños, pérdidas o accidentes en las instalaciones
• Cambios de última hora por causas de fuerza mayor`
        },
        {
          title: '5. Propiedad Intelectual',
          content: `Todo el contenido de SendAI (textos, imágenes, logos, software) está protegido por derechos de autor y marcas registradas. No se permite su uso sin autorización expresa.`
        },
        {
          title: '6. Modificaciones',
          content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de la plataforma.`
        }
      ]}
      callToAction={{
        title: '¿Tienes Dudas?',
        description: 'Consulta nuestras políticas adicionales o contacta con nuestro equipo legal',
        buttons: [
          { label: 'Política de Privacidad', route: 'privacidad' },
          { label: 'Política de Cancelación', route: 'politica-de-cancelacion' },
          { label: 'Contacto', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
