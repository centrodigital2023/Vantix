import { Button } from '@/components/ui/button'
import { PageRoute } from '@/lib/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Phone, EnvelopeSimple, ChatCircleDots } from '@phosphor-icons/react'

interface FAQProps {
  onNavigate: (page: PageRoute) => void
}

export function FAQ({ onNavigate }: FAQProps) {
  const faqs = [
    {
      category: 'Reservas',
      questions: [
        {
          q: '¿Cómo puedo realizar una reserva?',
          a: 'Busca tu destino, selecciona las fechas, elige el alojamiento y completa el proceso de pago. Recibirás una confirmación inmediata por email.'
        },
        {
          q: '¿Puedo modificar mi reserva después de confirmarla?',
          a: 'Sí, puedes modificar tu reserva desde "Mis Reservas" según la política de cancelación del alojamiento.'
        },
        {
          q: '¿Cuándo recibiré la confirmación de mi reserva?',
          a: 'La confirmación llega inmediatamente a tu email después de completar el pago exitosamente.'
        }
      ]
    },
    {
      category: 'Pagos',
      questions: [
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos pagos a través de Mercado Pago: tarjetas de crédito, débito, PSE y efectivo en puntos autorizados.'
        },
        {
          q: '¿Es seguro pagar en línea?',
          a: 'Absolutamente. Usamos Mercado Pago con encriptación SSL para garantizar la seguridad de tus datos.'
        },
        {
          q: '¿Puedo obtener una factura?',
          a: 'Sí, se genera automáticamente después del pago y la recibirás por email.'
        }
      ]
    },
    {
      category: 'Cancelaciones',
      questions: [
        {
          q: '¿Cuál es la política de cancelación?',
          a: 'Cada alojamiento tiene su propia política. Verifica los detalles antes de reservar en la sección de políticas.'
        },
        {
          q: '¿Cómo cancelo mi reserva?',
          a: 'Ve a "Mis Reservas", selecciona la reserva y sigue el proceso de cancelación.'
        },
        {
          q: '¿Cuándo recibiré mi reembolso?',
          a: 'Los reembolsos se procesan en 5-10 días hábiles según la política del alojamiento.'
        }
      ]
    },
    {
      category: 'Itinerarios IA',
      questions: [
        {
          q: '¿Cómo funciona el generador de itinerarios?',
          a: 'Seleccionas tus preferencias (destino, presupuesto, intereses) y nuestra IA crea un plan personalizado con alojamientos, actividades y restaurantes.'
        },
        {
          q: '¿Puedo modificar el itinerario generado?',
          a: 'Sí, puedes editar, agregar o eliminar actividades según tus preferencias.'
        },
        {
          q: '¿El itinerario incluye precios reales?',
          a: 'Sí, todos los precios son actualizados en tiempo real.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-lg opacity-90">Encuentra respuestas rápidas a las dudas más comunes</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {faqs.map((section, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">{section.category}</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {section.questions.map((item, qIdx) => (
                <AccordionItem key={qIdx} value={`${idx}-${qIdx}`} className="border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="mt-16 bg-muted rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿No encontraste tu respuesta?</h3>
          <p className="text-muted-foreground mb-6">Nuestro equipo está listo para ayudarte</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => onNavigate('contacto')} size="lg" className="gap-2">
              <EnvelopeSimple size={20} weight="bold" />
              Contáctanos
            </Button>
            <Button onClick={() => onNavigate('soporte-turista')} variant="outline" size="lg" className="gap-2">
              <ChatCircleDots size={20} weight="bold" />
              Chat en vivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
