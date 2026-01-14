import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { ShieldCheck, Lock, CreditCard, FileText, Scales, UserCircle } from '@phosphor-icons/react'

interface PrivacidadProps {
  onNavigate: (page: PageRoute) => void
}

export function Privacidad({ onNavigate }: PrivacidadProps) {
  return (
    <ContentPage
      title="Política de Privacidad"
      subtitle="En Vantix protegemos tu información personal con los más altos estándares de seguridad. Transparencia total en el manejo de tus datos"
      heroGradient="from-primary via-secondary to-accent"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Compromiso con tu Privacidad',
          content: `Vantix se compromete a proteger la privacidad de todos los usuarios de nuestra plataforma. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información personal.

Última actualización: Enero 2025

Al usar Vantix, aceptas las prácticas descritas en esta política. Si no estás de acuerdo, por favor no uses nuestros servicios.`
        },
        {
          title: 'Información que Recopilamos',
          content: '',
          cards: [
            {
              title: 'Datos de Cuenta',
              description: 'Nombre, email, teléfono, contraseña cifrada. Necesarios para crear tu cuenta y gestionar reservas.',
              icon: <UserCircle size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Información de Pago',
              description: 'Procesada por Mercado Pago. No almacenamos datos completos de tarjetas, solo tokens seguros para futuras transacciones.',
              icon: <CreditCard size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Datos de Navegación',
              description: 'IP, tipo de navegador, páginas visitadas, tiempo en sitio. Cookies para mejorar la experiencia y análisis.',
              icon: <FileText size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Preferencias de Viaje',
              description: 'Destinos buscados, fechas, presupuesto, categorías de interés. Para personalizar recomendaciones de la IA.',
              icon: <ShieldCheck size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Comunicaciones',
              description: 'Emails, mensajes de chat, llamadas telefónicas. Para brindarte soporte y resolver consultas.',
              icon: <Lock size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Ubicación',
              description: 'Ciudad, país, zona horaria. Solo si autorizas, para sugerencias locales y notificaciones relevantes.',
              icon: <Scales size={40} className="text-accent" weight="bold" />
            }
          ]
        },
        {
          title: 'Cómo Usamos tu Información',
          content: `**Prestación de Servicios**
• Procesar reservas y pagos
• Crear itinerarios personalizados con IA
• Enviar confirmaciones y vouchers
• Gestionar tu cuenta y preferencias

**Comunicación**
• Actualizaciones sobre reservas
• Ofertas y promociones (solo si aceptaste)
• Soporte y atención al cliente
• Encuestas de satisfacción

**Mejora del Servicio**
• Análisis de uso para optimizar la plataforma
• Entrenar nuestros algoritmos de IA
• Detectar fraude y problemas de seguridad
• Cumplir con obligaciones legales

**Marketing (Opcional)**
• Newsletters con consejos de viaje
• Ofertas personalizadas según tus intereses
• Puedes darte de baja en cualquier momento`
        },
        {
          title: 'Compartir Información',
          content: `**Con quién compartimos tus datos:**

✓ **Propietarios de Alojamientos**: Nombre, contacto, fechas de reserva (necesario para completar la estadía)
✓ **Procesadores de Pago**: Mercado Pago para procesar transacciones seguras
✓ **Proveedores de Tours**: Guías y operadores para coordinar experiencias
✓ **Servicios de Análisis**: Google Analytics (datos anonimizados) para mejorar la plataforma
✓ **Autoridades**: Solo si la ley lo requiere o en casos de fraude/seguridad

**NO compartimos con:**
✗ Empresas de publicidad de terceros
✗ Vendedores de bases de datos
✗ Ninguna otra empresa sin tu consentimiento explícito`
        },
        {
          title: 'Seguridad de Datos',
          content: `✓ **Cifrado SSL/TLS** en todas las comunicaciones
✓ **Servidores seguros** con certificaciones internacionales
✓ **Auditorías periódicas** de seguridad y vulnerabilidades
✓ **Acceso limitado** solo personal autorizado puede ver datos sensibles
✓ **Backups automáticos** para prevenir pérdida de información
✓ **Monitoreo 24/7** para detectar actividad sospechosa
✓ **Cumplimiento GDPR** y mejores prácticas internacionales
✓ **Cifrado de contraseñas** con algoritmos de última generación`
        },
        {
          title: 'Tus Derechos',
          content: `**Tienes derecho a:**

📋 **Acceder** a toda tu información personal almacenada
✏️ **Rectificar** datos incorrectos o desactualizados
🗑️ **Eliminar** tu cuenta y toda tu información
⏸️ **Limitar** el procesamiento de tus datos
📤 **Exportar** tu información en formato legible
🚫 **Oponerte** al procesamiento para marketing
🔄 **Portabilidad** de tus datos a otra plataforma

Para ejercer cualquier derecho, contacta: privacidad@sendai.com.co
Responderemos en máximo 15 días hábiles.`
        },
        {
          title: 'Cookies y Tecnologías',
          content: `Usamos cookies para mejorar tu experiencia:

**Cookies Esenciales** (obligatorias)
Sesión, autenticación, seguridad básica

**Cookies de Funcionalidad** (recomendadas)
Idioma, moneda, preferencias guardadas

**Cookies Analíticas** (opcionales)
Análisis de uso, optimización de contenido

**Cookies de Marketing** (opcionales)
Anuncios personalizados, remarketing

Puedes gestionar cookies desde la configuración de tu navegador o nuestro panel de preferencias.`
        },
        {
          title: 'Menores de Edad',
          content: `SendAI no está dirigido a menores de 18 años. No recopilamos intencionalmente información de menores.

Si eres padre/tutor y descubres que tu hijo proporcionó información, contacta inmediatamente para eliminarla.

Reservas para menores deben ser realizadas por un adulto responsable.`
        },
        {
          title: 'Cambios a esta Política',
          content: `Podemos actualizar esta política ocasionalmente. Cambios importantes serán notificados por email con 30 días de anticipación.

Fecha de última actualización aparece al inicio de este documento.

Continuar usando SendAI después de cambios constituye aceptación de la nueva política.`
        }
      ]}
      callToAction={{
        title: '¿Preguntas sobre Privacidad?',
        description: 'Estamos aquí para resolver tus dudas sobre protección de datos',
        buttons: [
          { label: 'Contactar', route: 'contacto' },
          { label: 'Ver Términos', route: 'terminos' },
          { label: 'Política de Cookies', route: 'cookies', variant: 'outline' }
        ]
      }}
    />
  )
}
