import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MagnifyingGlass, Calendar, CurrencyDollar, User, MapPin, CheckCircle, XCircle, Warning, Clock, ShieldWarning } from '@phosphor-icons/react'
import { SuperAdminHeader } from '@/components/superadmin/SuperAdminHeader'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface Booking {
  id: string
  bookingCode: string
  accommodationName: string
  accommodationType: string
  guestName: string
  guestEmail: string
  guestPhone: string
  hostName: string
  hostEmail: string
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  paidAmount: number
  status: 'confirmed' | 'cancelled' | 'completed' | 'disputed' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded'
  createdAt: string
  cancelledAt?: string
  disputeReason?: string
  refundAmount?: number
  refundedAt?: string
  adminNotes?: string
  country: string
  city: string
}

interface SuperAdminBookingsProps {
  onNavigate: (page: string) => void
}

export function SuperAdminBookings({ onNavigate }: SuperAdminBookingsProps) {
  const [bookings, setBookings] = useKV<Booking[]>('superadmin-bookings', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<string>('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [cancellationReason, setCancellationReason] = useState('')
  const [refundAmount, setRefundAmount] = useState('')
  const [refundReason, setRefundReason] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (!bookings || bookings.length === 0) {
      const sampleBookings: Booking[] = [
        {
          id: '1',
          bookingCode: 'VTX-2025-001234',
          accommodationName: 'Hotel Conquistador',
          accommodationType: 'Hotel',
          guestName: 'Juan Pérez',
          guestEmail: 'juan.perez@gmail.com',
          guestPhone: '+57 312 456 7890',
          hostName: 'María González',
          hostEmail: 'maria.gonzalez@gmail.com',
          checkIn: '2025-02-15',
          checkOut: '2025-02-18',
          guests: 2,
          totalAmount: 450000,
          paidAmount: 450000,
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2025-01-20T10:30:00',
          country: 'Colombia',
          city: 'Pasto'
        },
        {
          id: '2',
          bookingCode: 'VTX-2025-001235',
          accommodationName: 'Cabaña Lago Guamuez',
          accommodationType: 'Cabaña',
          guestName: 'Ana María López',
          guestEmail: 'ana.lopez@hotmail.com',
          guestPhone: '+57 311 234 5678',
          hostName: 'Carlos Ruiz',
          hostEmail: 'carlos.ruiz@gmail.com',
          checkIn: '2025-02-10',
          checkOut: '2025-02-12',
          guests: 4,
          totalAmount: 380000,
          paidAmount: 190000,
          status: 'disputed',
          paymentStatus: 'partial',
          createdAt: '2025-01-18T15:45:00',
          disputeReason: 'El anfitrión canceló sin justificación válida',
          country: 'Colombia',
          city: 'Pasto'
        },
        {
          id: '3',
          bookingCode: 'VTX-2025-001236',
          accommodationName: 'Apartamento Centro Histórico',
          accommodationType: 'Apartamento',
          guestName: 'Roberto Sánchez',
          guestEmail: 'roberto.sanchez@gmail.com',
          guestPhone: '+57 310 987 6543',
          hostName: 'Laura Martínez',
          hostEmail: 'laura.martinez@gmail.com',
          checkIn: '2025-01-25',
          checkOut: '2025-01-28',
          guests: 2,
          totalAmount: 320000,
          paidAmount: 320000,
          status: 'completed',
          paymentStatus: 'paid',
          createdAt: '2025-01-15T09:20:00',
          country: 'Colombia',
          city: 'Pasto'
        },
        {
          id: '4',
          bookingCode: 'VTX-2025-001237',
          accommodationName: 'Casa Rural El Paraíso',
          accommodationType: 'Casa Rural',
          guestName: 'Diego Torres',
          guestEmail: 'diego.torres@outlook.com',
          guestPhone: '+57 314 567 8901',
          hostName: 'Patricia Gómez',
          hostEmail: 'patricia.gomez@gmail.com',
          checkIn: '2025-02-20',
          checkOut: '2025-02-25',
          guests: 6,
          totalAmount: 850000,
          paidAmount: 850000,
          status: 'cancelled',
          paymentStatus: 'refunded',
          createdAt: '2025-01-19T14:10:00',
          cancelledAt: '2025-01-20T10:00:00',
          refundAmount: 765000,
          refundedAt: '2025-01-20T11:30:00',
          adminNotes: 'Cancelación por emergencia familiar. Reembolso 90% aprobado.',
          country: 'Colombia',
          city: 'Pasto'
        },
        {
          id: '5',
          bookingCode: 'VTX-2025-001238',
          accommodationName: 'Hostal Juvenil Centro',
          accommodationType: 'Hostal',
          guestName: 'Camila Reyes',
          guestEmail: 'camila.reyes@gmail.com',
          guestPhone: '+57 315 678 9012',
          hostName: 'Jorge Moreno',
          hostEmail: 'jorge.moreno@gmail.com',
          checkIn: '2025-02-05',
          checkOut: '2025-02-07',
          guests: 1,
          totalAmount: 120000,
          paidAmount: 120000,
          status: 'disputed',
          paymentStatus: 'paid',
          createdAt: '2025-01-17T11:30:00',
          disputeReason: 'Las condiciones del alojamiento no coinciden con las fotos publicadas',
          country: 'Colombia',
          city: 'Pasto'
        }
      ]
      setBookings(() => sampleBookings)
    }
  }, [])

  const filteredBookings = (bookings || []).filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.accommodationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || booking.paymentStatus === selectedPaymentStatus
    const matchesTab = activeTab === 'all' || booking.status === activeTab
    
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesTab
  })

  const stats = {
    total: (bookings || []).length,
    confirmed: (bookings || []).filter(b => b.status === 'confirmed').length,
    disputed: (bookings || []).filter(b => b.status === 'disputed').length,
    cancelled: (bookings || []).filter(b => b.status === 'cancelled').length,
    completed: (bookings || []).filter(b => b.status === 'completed').length,
    totalRevenue: (bookings || []).reduce((sum, b) => sum + b.paidAmount, 0)
  }

  const handleViewDetail = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowDetailDialog(true)
  }

  const handleCancelBooking = () => {
    if (!selectedBooking || !cancellationReason.trim() || confirmPassword !== 'admin123') {
      if (confirmPassword !== 'admin123') {
        toast.error('Contraseña de autorización incorrecta')
        return
      }
      toast.error('Completa todos los campos requeridos')
      return
    }

    setBookings(currentBookings =>
      (currentBookings || []).map(b =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: 'cancelled' as const,
              cancelledAt: new Date().toISOString(),
              adminNotes: cancellationReason
            }
          : b
      )
    )

    setShowCancelDialog(false)
    setShowDetailDialog(false)
    setCancellationReason('')
    setConfirmPassword('')
    toast.success('Reserva cancelada exitosamente')
  }

  const handleProcessRefund = () => {
    if (!selectedBooking || !refundAmount || !refundReason.trim() || confirmPassword !== 'admin123') {
      if (confirmPassword !== 'admin123') {
        toast.error('Contraseña de autorización incorrecta')
        return
      }
      toast.error('Completa todos los campos requeridos')
      return
    }

    const refundAmountNum = parseFloat(refundAmount)
    if (isNaN(refundAmountNum) || refundAmountNum <= 0 || refundAmountNum > selectedBooking.paidAmount) {
      toast.error('Monto de reembolso inválido')
      return
    }

    setBookings(currentBookings =>
      (currentBookings || []).map(b =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: 'refunded' as const,
              paymentStatus: 'refunded' as const,
              refundAmount: refundAmountNum,
              refundedAt: new Date().toISOString(),
              adminNotes: refundReason
            }
          : b
      )
    )

    setShowRefundDialog(false)
    setShowDetailDialog(false)
    setRefundAmount('')
    setRefundReason('')
    setConfirmPassword('')
    toast.success('Reembolso procesado exitosamente')
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      confirmed: { label: 'Confirmada', className: 'bg-success text-success-foreground' },
      completed: { label: 'Completada', className: 'bg-primary text-primary-foreground' },
      cancelled: { label: 'Cancelada', className: 'bg-muted text-muted-foreground' },
      disputed: { label: 'En Disputa', className: 'bg-destructive text-destructive-foreground' },
      refunded: { label: 'Reembolsada', className: 'bg-warning text-warning-foreground' }
    }
    const variant = variants[status] || variants.confirmed
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  const getPaymentBadge = (paymentStatus: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      paid: { label: 'Pagado', className: 'bg-success text-success-foreground' },
      pending: { label: 'Pendiente', className: 'bg-warning text-warning-foreground' },
      partial: { label: 'Parcial', className: 'bg-info text-info-foreground' },
      refunded: { label: 'Reembolsado', className: 'bg-muted text-muted-foreground' }
    }
    const variant = variants[paymentStatus] || variants.pending
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <SuperAdminHeader
        title="Gestión de Reservas"
        subtitle="Administra reservas, disputas y reembolsos"
        onNavigate={onNavigate}
        showAlerts
        alertCount={stats.disputed}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" weight="fill" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmadas</p>
                  <p className="text-2xl font-bold text-success">{stats.confirmed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" weight="fill" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En Disputa</p>
                  <p className="text-2xl font-bold text-destructive">{stats.disputed}</p>
                </div>
                <Warning className="w-8 h-8 text-destructive" weight="fill" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completadas</p>
                  <p className="text-2xl font-bold text-primary">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" weight="fill" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ingresos</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <CurrencyDollar className="w-8 h-8 text-success" weight="fill" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por código, huésped o alojamiento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado de reserva" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                  <SelectItem value="disputed">En Disputa</SelectItem>
                  <SelectItem value="refunded">Reembolsadas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los pagos</SelectItem>
                  <SelectItem value="paid">Pagado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="partial">Parcial</SelectItem>
                  <SelectItem value="refunded">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              Todas ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmadas ({stats.confirmed})
            </TabsTrigger>
            <TabsTrigger value="disputed">
              Disputas ({stats.disputed})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completadas ({stats.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Canceladas ({stats.cancelled})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No se encontraron reservas
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-mono text-sm font-semibold text-primary">
                              {booking.bookingCode}
                            </span>
                            {getStatusBadge(booking.status)}
                            {getPaymentBadge(booking.paymentStatus)}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {booking.accommodationName}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4" />
                              <span>Huésped: <span className="text-foreground font-medium">{booking.guestName}</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.city}, {booking.country}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CurrencyDollar className="w-4 h-4" />
                              <span className="text-foreground font-semibold">{formatCurrency(booking.totalAmount)}</span>
                            </div>
                          </div>

                          {booking.status === 'disputed' && booking.disputeReason && (
                            <Alert variant="destructive" className="mb-3">
                              <ShieldWarning className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Disputa:</strong> {booking.disputeReason}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(booking)}
                          >
                            Ver Detalle
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Detalle de Reserva</DialogTitle>
                <DialogDescription>
                  Código: {selectedBooking.bookingCode}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {getStatusBadge(selectedBooking.status)}
                  {getPaymentBadge(selectedBooking.paymentStatus)}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Información del Huésped
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Nombre:</span>
                        <p className="font-medium">{selectedBooking.guestName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium">{selectedBooking.guestEmail}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Teléfono:</span>
                        <p className="font-medium">{selectedBooking.guestPhone}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Información del Anfitrión
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Nombre:</span>
                        <p className="font-medium">{selectedBooking.hostName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium">{selectedBooking.hostEmail}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Detalles de la Reserva
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Alojamiento:</span>
                      <p className="font-medium">{selectedBooking.accommodationName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tipo:</span>
                      <p className="font-medium">{selectedBooking.accommodationType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check-in:</span>
                      <p className="font-medium">{formatDate(selectedBooking.checkIn)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check-out:</span>
                      <p className="font-medium">{formatDate(selectedBooking.checkOut)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Huéspedes:</span>
                      <p className="font-medium">{selectedBooking.guests} personas</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ubicación:</span>
                      <p className="font-medium">{selectedBooking.city}, {selectedBooking.country}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CurrencyDollar className="w-5 h-5" />
                      Información de Pago
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monto Total:</span>
                      <span className="font-semibold text-lg">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monto Pagado:</span>
                      <span className="font-medium text-success">{formatCurrency(selectedBooking.paidAmount)}</span>
                    </div>
                    {selectedBooking.refundAmount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monto Reembolsado:</span>
                        <span className="font-medium text-warning">{formatCurrency(selectedBooking.refundAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Saldo Pendiente:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedBooking.totalAmount - selectedBooking.paidAmount)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {selectedBooking.status === 'disputed' && selectedBooking.disputeReason && (
                  <Alert variant="destructive">
                    <ShieldWarning className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Razón de la disputa:</strong> {selectedBooking.disputeReason}
                    </AlertDescription>
                  </Alert>
                )}

                {selectedBooking.adminNotes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Notas del Administrador</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{selectedBooking.adminNotes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                  Cerrar
                </Button>
                {selectedBooking.status === 'disputed' && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setShowDetailDialog(false)
                        setShowCancelDialog(true)
                      }}
                    >
                      <XCircle className="mr-2" weight="fill" />
                      Cancelar Reserva
                    </Button>
                    <Button
                      onClick={() => {
                        setShowDetailDialog(false)
                        setShowRefundDialog(true)
                      }}
                      className="bg-warning hover:bg-warning/90"
                    >
                      <CurrencyDollar className="mr-2" weight="fill" />
                      Procesar Reembolso
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Reserva</DialogTitle>
            <DialogDescription>
              Esta acción requiere autorización. Los cambios son irreversibles.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Razón de Cancelación <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Explica la razón de la cancelación..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña de Autorización <span className="text-destructive">*</span>
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ingresa contraseña de SuperAdmin"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowCancelDialog(false)
              setCancellationReason('')
              setConfirmPassword('')
            }}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Confirmar Cancelación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Procesar Reembolso</DialogTitle>
            <DialogDescription>
              Esta acción requiere autorización. El reembolso se procesará inmediatamente.
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Monto pagado: <strong>{formatCurrency(selectedBooking.paidAmount)}</strong>
                </AlertDescription>
              </Alert>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Monto a Reembolsar <span className="text-destructive">*</span>
                </label>
                <Input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="0"
                  max={selectedBooking.paidAmount}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Razón del Reembolso <span className="text-destructive">*</span>
                </label>
                <Textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Explica la razón del reembolso..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contraseña de Autorización <span className="text-destructive">*</span>
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ingresa contraseña de SuperAdmin"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRefundDialog(false)
              setRefundAmount('')
              setRefundReason('')
              setConfirmPassword('')
            }}>
              Cancelar
            </Button>
            <Button onClick={handleProcessRefund} className="bg-warning hover:bg-warning/90">
              Procesar Reembolso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
