import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, Download, EnvelopeSimple, 
  MapPin, CalendarBlank, Users, Bed,
  Phone, IdentificationCard, Clock,
  Info, ArrowRight
} from '@phosphor-icons/react'
import { Booking, Accommodation } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { format, parseISO, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'

interface ReservaExitosaProps {
  onNavigate: (page: string) => void
}

export function ReservaExitosa({ onNavigate }: ReservaExitosaProps) {
  const [currentBookingId] = useKV<string>('current-booking-id', '')
  const [bookings] = useKV<Booking[]>('user-bookings', [])
  const [accommodations] = useKV<Accommodation[]>('accommodations-data', [])
  const [isLoading, setIsLoading] = useState(true)

  const booking = bookings?.find(b => b.id === currentBookingId)
  const accommodation = accommodations?.find(a => a.id === booking?.accommodationId)
  const roomType = accommodation?.roomTypes.find(r => r.id === booking?.roomTypeId)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentId = params.get('payment_id')
    const status = params.get('status')
    const merchantOrderId = params.get('merchant_order_id')

    if (booking && paymentId) {
      const updatedBooking: Booking = {
        ...booking,
        status: status === 'approved' ? 'confirmed' : 'pending',
        paymentInfo: {
          ...booking.paymentInfo!,
          transactionId: paymentId,
          paymentStatus: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending'
        }
      }

      const updateBookings = async () => {
        const allBookings = await window.spark.kv.get<Booking[]>('user-bookings') || []
        const index = allBookings.findIndex(b => b.id === currentBookingId)
        if (index >= 0) {
          allBookings[index] = updatedBooking
          await window.spark.kv.set('user-bookings', allBookings)
        }
        setIsLoading(false)
      }

      updateBookings()
    } else {
      setIsLoading(false)
    }
  }, [currentBookingId, booking])

  const handleDownloadConfirmation = () => {
    toast.success('Descargando confirmación...')
  }

  const handleSendEmail = async () => {
    toast.success('Confirmación enviada a tu correo electrónico')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Confirmando tu reserva...</p>
        </div>
      </div>
    )
  }

  if (!booking || !accommodation || !roomType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Reserva no encontrada</CardTitle>
            <CardDescription>
              No se encontraron los detalles de la reserva.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate('home')} className="w-full">
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const checkInDate = parseISO(booking.checkIn)
  const checkOutDate = parseISO(booking.checkOut)
  const nights = differenceInDays(checkOutDate, checkInDate)

  const isConfirmed = booking.paymentInfo?.paymentStatus === 'approved'

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <CheckCircle size={48} className="text-primary" weight="fill" />
          </div>
          
          <h1 className="text-4xl font-bold mb-3">
            {isConfirmed ? '¡Reserva confirmada!' : 'Reserva en proceso'}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isConfirmed 
              ? 'Tu reserva ha sido confirmada exitosamente. Recibirás un correo con todos los detalles.'
              : 'Tu reserva está siendo procesada. Te notificaremos cuando esté confirmada.'}
          </p>

          {isConfirmed && (
            <Badge variant="secondary" className="mt-4 text-base px-4 py-2">
              Código de reserva: {booking.id}
            </Badge>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <img
                  src={accommodation.images[0]}
                  alt={accommodation.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{accommodation.name}</h3>
                  <p className="text-muted-foreground flex items-center gap-2 mb-2">
                    <MapPin size={18} />
                    {accommodation.city}, {accommodation.department}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{accommodation.type}</Badge>
                    <Badge variant="outline" className="gap-1">
                      ★ {accommodation.rating}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Bed size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Habitación</p>
                      <p className="text-muted-foreground">{roomType.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {roomType.maxGuests} {roomType.maxGuests === 1 ? 'huésped' : 'huéspedes'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarBlank size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Fechas</p>
                      <p className="text-muted-foreground">
                        Check-in: {format(checkInDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                      <p className="text-muted-foreground">
                        Check-out: {format(checkOutDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {nights} {nights === 1 ? 'noche' : 'noches'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Huéspedes</p>
                      <p className="text-muted-foreground">
                        {booking.guests} {booking.guests === 1 ? 'persona' : 'personas'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <IdentificationCard size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Titular</p>
                      <p className="text-muted-foreground">{booking.guestInfo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        CC: {booking.guestInfo.idNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <EnvelopeSimple size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Correo</p>
                      <p className="text-muted-foreground">{booking.guestInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={24} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-muted-foreground">{booking.guestInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {booking.guestInfo.specialRequests && (
                <>
                  <Separator />
                  <div>
                    <p className="font-semibold mb-2">Solicitudes especiales</p>
                    <p className="text-muted-foreground">{booking.guestInfo.specialRequests}</p>
                  </div>
                </>
              )}

              <Separator />

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Precio total</span>
                  <span className="text-3xl font-bold text-primary">
                    ${booking.totalPrice.toLocaleString('es-CO')} COP
                  </span>
                </div>
                {isConfirmed && booking.paymentInfo?.transactionId && (
                  <p className="text-xs text-muted-foreground text-right">
                    ID de transacción: {booking.paymentInfo.transactionId}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/30 border-accent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Clock size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold mb-2">Horarios de check-in y check-out</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Check-in: {accommodation.policies.checkIn}</p>
                    <p>• Check-out: {accommodation.policies.checkOut}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold mb-2">Información importante</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Lleva un documento de identidad válido al momento del check-in</p>
                    <p>• Revisa tu correo electrónico para la confirmación detallada</p>
                    <p>• Política de cancelación: {accommodation.policies.cancellation}</p>
                    <p>• Si tienes alguna pregunta, contacta al alojamiento: {accommodation.contact.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownloadConfirmation}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <Download size={20} className="mr-2" />
              Descargar confirmación
            </Button>
            
            <Button
              onClick={handleSendEmail}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <EnvelopeSimple size={20} className="mr-2" />
              Reenviar correo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => onNavigate('home')}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              Volver al inicio
            </Button>
            
            <Button
              onClick={() => onNavigate('explorar')}
              size="lg"
              className="flex-1"
            >
              Explorar más destinos
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
