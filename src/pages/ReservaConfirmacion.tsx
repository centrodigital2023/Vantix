import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  User, EnvelopeSimple, Phone, IdentificationCard,
  CalendarBlank, Users, CreditCard, Shield, 
  MapPin, Bed, CheckCircle, XCircle,
  ArrowLeft, Info
} from '@phosphor-icons/react'
import { Accommodation, RoomType, BookingFormData, Booking } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { createPaymentPreference, initMercadoPago } from '@/lib/api/mercadopago'
import { format, differenceInDays, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

interface ReservaConfirmacionProps {
  onNavigate: (page: string) => void
}

export function ReservaConfirmacion({ onNavigate }: ReservaConfirmacionProps) {
  const [accommodations] = useKV<Accommodation[]>('accommodations-data', [])
  const [bookingData, setBookingData] = useKV<any>('temp-booking-data', null)
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    specialRequests: '',
    acceptTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    initMercadoPago()
  }, [])

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <XCircle size={24} />
              No hay datos de reserva
            </CardTitle>
            <CardDescription>
              Por favor, selecciona un alojamiento y habitación primero.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate('explorar')} className="w-full">
              Explorar alojamientos
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const accommodation = accommodations?.find(a => a.id === bookingData.accommodationId)
  const roomType = accommodation?.roomTypes.find(r => r.id === bookingData.roomTypeId)
  
  if (!accommodation || !roomType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <XCircle size={24} />
              Alojamiento no encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate('explorar')} className="w-full">
              Explorar alojamientos
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const checkInDate = parseISO(bookingData.checkIn)
  const checkOutDate = parseISO(bookingData.checkOut)
  const nights = differenceInDays(checkOutDate, checkInDate)
  const subtotal = roomType.pricePerNight * nights
  const serviceFee = subtotal * 0.10
  const taxes = subtotal * 0.19
  const totalPrice = subtotal + serviceFee + taxes

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido (10 dígitos)'
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'El número de identificación es requerido'
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Por favor, completa todos los campos requeridos')
      return
    }

    setIsProcessing(true)

    try {
      const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      const newBooking: Booking = {
        id: bookingId,
        userId: 'guest',
        accommodationId: accommodation.id,
        roomTypeId: roomType.id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
        guestInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          idNumber: formData.idNumber,
          specialRequests: formData.specialRequests
        },
        paymentInfo: {
          method: 'mercadopago',
          paymentStatus: 'pending'
        }
      }

      const [existingBookings] = await Promise.all([
        window.spark.kv.get<Booking[]>('user-bookings') || [],
      ])

      await window.spark.kv.set('user-bookings', [...(existingBookings || []), newBooking])

      const phoneNumber = formData.phone.replace(/\s/g, '')
      const areaCode = phoneNumber.substring(0, 3)
      const number = phoneNumber.substring(3)

      const preference = await createPaymentPreference({
        title: `${accommodation.name} - ${roomType.name}`,
        description: `Reserva del ${format(checkInDate, 'dd/MM/yyyy', { locale: es })} al ${format(checkOutDate, 'dd/MM/yyyy', { locale: es })} (${nights} noches)`,
        unit_price: totalPrice,
        quantity: 1,
        bookingId: bookingId,
        payer: {
          name: formData.firstName,
          surname: formData.lastName,
          email: formData.email,
          phone: {
            area_code: areaCode,
            number: number
          },
          identification: {
            type: 'CC',
            number: formData.idNumber
          }
        }
      })

      const updatedBooking = {
        ...newBooking,
        paymentInfo: {
          ...newBooking.paymentInfo!,
          preferenceId: preference.id
        }
      }

      const allBookings = await window.spark.kv.get<Booking[]>('user-bookings') || []
      const bookingIndex = allBookings.findIndex(b => b.id === bookingId)
      if (bookingIndex >= 0) {
        allBookings[bookingIndex] = updatedBooking
        await window.spark.kv.set('user-bookings', allBookings)
      }

      await window.spark.kv.set('current-booking-id', bookingId)
      
      window.open(preference.init_point, '_self')

    } catch (error) {
      console.error('Error creating booking:', error)
      toast.error('Error al procesar la reserva. Por favor, inténtalo de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('detalle-alojamiento')}
          className="mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al alojamiento
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Confirma tu reserva</h1>
          <p className="text-muted-foreground mb-8">
            Estás a un paso de vivir una experiencia inolvidable en Colombia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={24} className="text-primary" />
                  Información del huésped
                </CardTitle>
                <CardDescription>
                  Completa tus datos para confirmar la reserva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre *</Label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="pl-10"
                          placeholder="Juan"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido *</Label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="pl-10"
                          placeholder="Pérez"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <div className="relative">
                      <EnvelopeSimple size={18} className="absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        placeholder="juan.perez@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Recibirás la confirmación de reserva en este correo
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10"
                          placeholder="3001234567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idNumber">Cédula / Identificación *</Label>
                      <div className="relative">
                        <IdentificationCard size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="idNumber"
                          value={formData.idNumber}
                          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                          className="pl-10"
                          placeholder="1234567890"
                        />
                      </div>
                      {errors.idNumber && (
                        <p className="text-sm text-destructive">{errors.idNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">Solicitudes especiales (opcional)</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Ej: Llegada temprana, habitación en piso bajo, cuna para bebé..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Las solicitudes especiales están sujetas a disponibilidad
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, acceptTerms: checked as boolean })
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="terms" className="cursor-pointer">
                          Acepto los términos y condiciones *
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Al continuar, aceptas nuestras{' '}
                          <button type="button" className="text-primary hover:underline">
                            políticas de cancelación
                          </button>
                          {' '}y{' '}
                          <button type="button" className="text-primary hover:underline">
                            términos de servicio
                          </button>
                        </p>
                      </div>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-destructive">{errors.acceptTerms}</p>
                    )}
                  </div>

                  <div className="bg-accent/50 rounded-lg p-4 flex items-start gap-3">
                    <Info size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Política de cancelación</p>
                      <p className="text-muted-foreground">
                        {accommodation.policies.cancellation}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} className="mr-2" />
                        Continuar al pago
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <img
                      src={accommodation.images[0]}
                      alt={accommodation.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">{accommodation.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin size={14} />
                        {accommodation.city}, {accommodation.department}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Bed size={20} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{roomType.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {roomType.maxGuests} {roomType.maxGuests === 1 ? 'huésped' : 'huéspedes'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarBlank size={20} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {format(checkInDate, 'dd MMM', { locale: es })} - {format(checkOutDate, 'dd MMM yyyy', { locale: es })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {nights} {nights === 1 ? 'noche' : 'noches'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users size={20} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {bookingData.guests} {bookingData.guests === 1 ? 'huésped' : 'huéspedes'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        ${roomType.pricePerNight.toLocaleString('es-CO')} x {nights} {nights === 1 ? 'noche' : 'noches'}
                      </span>
                      <span>${subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tarifa de servicio</span>
                      <span>${serviceFee.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impuestos (IVA 19%)</span>
                      <span>${taxes.toLocaleString('es-CO')}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">
                      ${totalPrice.toLocaleString('es-CO')} COP
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield size={24} className="text-primary flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Pago 100% seguro</p>
                      <p className="text-muted-foreground">
                        Tu pago está protegido por Mercado Pago con encriptación de nivel bancario.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
