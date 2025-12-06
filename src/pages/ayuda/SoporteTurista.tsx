import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PageRoute } from '@/lib/types'
import { useState } from 'react'
import { MagnifyingGlass, Headset, ClockCounterClockwise } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface SoporteTuristaProps {
  onNavigate: (page: PageRoute) => void
}

export function SoporteTurista({ onNavigate }: SoporteTuristaProps) {
  const [bookingId, setBookingId] = useState('')
  const [message, setMessage] = useState('')
  const [bookings] = useKV<any[]>('user-bookings', [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Mensaje enviado. Te responderemos pronto.')
    setBookingId('')
    setMessage('')
  }

  const quickActions = [
    {
      icon: MagnifyingGlass,
      title: 'Buscar mi Reserva',
      description: 'Consulta el estado de tu reserva',
      action: () => onNavigate('estado-de-mi-reserva')
    },
    {
      icon: ClockCounterClockwise,
      title: 'Mis Reservas',
      description: 'Ver historial completo',
      action: () => onNavigate('mis-reservas')
    },
    {
      icon: Headset,
      title: 'Preguntas Frecuentes',
      description: 'Encuentra respuestas rápidas',
      action: () => onNavigate('faq')
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Soporte al Turista</h1>
          <p className="text-lg opacity-90">Estamos aquí para ayudarte en cada paso de tu viaje</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={action.action}>
              <action.icon size={40} className="text-primary mb-4" weight="bold" />
              <h3 className="text-xl font-bold mb-2">{action.title}</h3>
              <p className="text-muted-foreground text-sm">{action.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contacta con Soporte</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="booking-id">Número de Reserva (Opcional)</Label>
                <Input
                  id="booking-id"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Ej: RES-2024-001"
                />
              </div>

              <div>
                <Label htmlFor="message">¿En qué podemos ayudarte?</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe tu consulta o problema..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Otros Canales de Ayuda</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                <p className="text-muted-foreground mb-2">Línea Nacional</p>
                <a href="tel:+573201234567" className="text-2xl font-bold text-primary">
                  +57 320 123 4567
                </a>
                <p className="text-sm text-muted-foreground mt-2">Lun - Dom: 7:00 AM - 10:00 PM</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground mb-2">Respuesta en 24 horas</p>
                <a href="mailto:soporte@sendai.co" className="text-lg font-bold text-primary">
                  soporte@sendai.co
                </a>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground mb-2">Chat directo</p>
                <a href="https://wa.me/573201234567" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-primary">
                  +57 320 123 4567
                </a>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <a href="https://wa.me/573201234567" target="_blank" rel="noopener noreferrer">
                    Abrir WhatsApp
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
