import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CalendarBlank, MapPin, Users, CreditCard,
  CheckCircle, Clock, XCircle, ArrowRight
} from '@phosphor-icons/react'
import { Booking, Accommodation } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

interface MisReservasProps {
  onNavigate: (page: string, accommodationId?: string) => void
}

export function MisReservas({ onNavigate }: MisReservasProps) {
  const [bookings] = useKV<Booking[]>('user-bookings', [])
  const [accommodations] = useKV<Accommodation[]>('accommodations-data', [])
  const [activeTab, setActiveTab] = useState('all')

  const getAccommodation = (accommodationId: string) => {
    return accommodations?.find(a => a.id === accommodationId)
  }

  const getStatusBadge = (status: Booking['status']) => {
    const statusConfig = {
      pending: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock },
      confirmed: { label: 'Confirmada', variant: 'default' as const, icon: CheckCircle },
      cancelled: { label: 'Cancelada', variant: 'destructive' as const, icon: XCircle },
      completed: { label: 'Completada', variant: 'outline' as const, icon: CheckCircle }
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon size={14} />
        {config.label}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendiente', variant: 'secondary' as const },
      approved: { label: 'Aprobado', variant: 'default' as const },
      rejected: { label: 'Rechazado', variant: 'destructive' as const },
      refunded: { label: 'Reembolsado', variant: 'outline' as const }
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    
    return (
      <Badge variant={config?.variant || 'secondary'}>
        {config?.label || status}
      </Badge>
    )
  }

  const filteredBookings = bookings?.filter(booking => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return booking.status === 'confirmed' || booking.status === 'pending'
    if (activeTab === 'completed') return booking.status === 'completed'
    if (activeTab === 'cancelled') return booking.status === 'cancelled'
    return true
  }) || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Mis Reservas</h1>
          <p className="text-muted-foreground mb-8">
            Gestiona y revisa todas tus reservas
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Activas</TabsTrigger>
            <TabsTrigger value="completed">Completadas</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <CalendarBlank size={64} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tienes reservas</h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'all' 
                  ? 'Aún no has realizado ninguna reserva'
                  : `No tienes reservas ${activeTab === 'active' ? 'activas' : activeTab === 'completed' ? 'completadas' : 'canceladas'}`}
              </p>
              <Button onClick={() => onNavigate('explorar')}>
                Explorar alojamientos
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking, index) => {
              const accommodation = getAccommodation(booking.accommodationId)
              const roomType = accommodation?.roomTypes.find(r => r.id === booking.roomTypeId)

              if (!accommodation) return null

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-4 gap-0">
                        <div className="md:col-span-1 relative h-48 md:h-auto">
                          <img
                            src={accommodation.images[0]}
                            alt={accommodation.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>

                        <div className="md:col-span-3 p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold mb-2">{accommodation.name}</h3>
                              <p className="text-muted-foreground flex items-center gap-2 mb-3">
                                <MapPin size={18} />
                                {accommodation.city}, {accommodation.department}
                              </p>
                              
                              {roomType && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  {roomType.name}
                                </p>
                              )}
                            </div>

                            <div className="text-right">
                              <div className="text-3xl font-bold text-primary mb-1">
                                ${booking.totalPrice.toLocaleString('es-CO')}
                              </div>
                              <div className="text-sm text-muted-foreground">COP</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <CalendarBlank size={20} className="text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Check-in</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(parseISO(booking.checkIn), 'dd MMM yyyy', { locale: es })}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <CalendarBlank size={20} className="text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Check-out</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(parseISO(booking.checkOut), 'dd MMM yyyy', { locale: es })}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Users size={20} className="text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Huéspedes</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.guests} {booking.guests === 1 ? 'persona' : 'personas'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm">
                              <CreditCard size={16} className="text-muted-foreground" />
                              <span className="text-muted-foreground">Pago:</span>
                              {booking.paymentInfo && getPaymentStatusBadge(booking.paymentInfo.paymentStatus)}
                            </div>

                            <div className="flex-1" />

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  window.spark.kv.set('current-booking-id', booking.id)
                                  onNavigate('reserva-exitosa')
                                }}
                              >
                                Ver detalles
                              </Button>
                              
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => onNavigate('detalle-alojamiento', accommodation.id)}
                              >
                                Ver alojamiento
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
