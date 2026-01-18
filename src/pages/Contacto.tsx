import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Envelope, Phone, MapPin, Clock, ChatCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function Contacto() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [contactMessages, setContactMessages] = useKV<any[]>('contact-messages', [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: Date.now(),
      status: 'new'
    }

    setContactMessages((current) => [newMessage, ...(current || [])])

    toast.success('¡Mensaje enviado! Te contactaremos pronto.')
    
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Tienes dudas sobre viajes por Colombia? Estamos aquí para ayudarte. Respuesta en menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <ChatCircle size={24} weight="duotone" className="text-primary" />
                <h2 className="text-2xl font-semibold">Envíanos un mensaje</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre completo</label>
                  <Input 
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Asunto</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="contact-subject">
                      <SelectValue placeholder="Selecciona un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Información general</SelectItem>
                      <SelectItem value="booking">Consulta sobre reservas</SelectItem>
                      <SelectItem value="hosting">Quiero ser anfitrión</SelectItem>
                      <SelectItem value="partnership">Alianzas comerciales</SelectItem>
                      <SelectItem value="support">Soporte técnico</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <Textarea 
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </Card>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Envelope size={28} weight="duotone" className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground mb-2">Nuestro equipo responde en 24h</p>
                    <a href="mailto:info@vantix.co" className="text-primary hover:underline font-medium">
                      info@vantix.co
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Phone size={28} weight="duotone" className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                    <p className="text-muted-foreground mb-2">Lun - Vie: 9:00 AM - 6:00 PM</p>
                    <a href="tel:+573001234567" className="text-secondary hover:underline font-medium">
                      +57 300 123 4567
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <MapPin size={28} weight="duotone" className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Oficina</h3>
                    <p className="text-muted-foreground mb-2">Visítanos en horario laboral</p>
                    <p className="font-medium">
                      Bogotá, Colombia<br />
                      Calle 72 #10-34, Piso 5
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Clock size={28} weight="duotone" className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Horarios</h3>
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Lunes - Viernes:</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Sábado:</span>
                        <span className="font-medium">10:00 AM - 2:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Domingo:</span>
                        <span className="font-medium">Cerrado</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}