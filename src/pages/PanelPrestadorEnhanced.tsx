import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, CalendarBlank, CurrencyDollar, Star, Bell, ChartLine, Sparkle, SignOut, ArrowLeft, Eye, PencilSimple, Trash, CheckCircle, Clock, TrendUp, Users } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'

interface PanelPrestadorProps {
  onNavigate?: (page: string) => void
}

interface Service {
  id: string
  name: string
  type: string
  location: string
  status: 'active' | 'pending' | 'inactive'
  rating: number
  reviews: number
  price: number
  bookings: number
}

interface Booking {
  id: string
  customer: string
  service: string
  date: string
  people: number
  amount: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
}

interface AIRecommendation {
  id: string
  type: 'photo' | 'pricing' | 'availability' | 'description' | 'promotion'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  action: string
}

export function PanelPrestador({ onNavigate }: PanelPrestadorProps) {
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')
  
  const [services, setServices] = useKV<Service[]>('provider-services', [
    {
      id: '1',
      name: 'Tour Café y Naturaleza Buesaco',
      type: 'Tour guiado',
      location: 'Buesaco, Nariño',
      status: 'active',
      rating: 4.9,
      reviews: 12,
      price: 85000,
      bookings: 15
    },
    {
      id: '2',
      name: 'Transporte Turístico Pasto',
      type: 'Transporte',
      location: 'Pasto - Nariño',
      status: 'active',
      rating: 4.7,
      reviews: 8,
      price: 45000,
      bookings: 23
    },
    {
      id: '3',
      name: 'Experiencia Gastronomía Local',
      type: 'Gastronomía',
      location: 'Buesaco, Nariño',
      status: 'pending',
      rating: 0,
      reviews: 0,
      price: 65000,
      bookings: 0
    }
  ])
  
  const [bookings, setBookings] = useKV<Booking[]>('provider-bookings', [
    {
      id: '1',
      customer: 'María González',
      service: 'Tour Café y Naturaleza',
      date: '2025-03-15',
      people: 4,
      amount: 340000,
      status: 'confirmed'
    },
    {
      id: '2',
      customer: 'Carlos Ruiz',
      service: 'Transporte Turístico',
      date: '2025-03-18',
      people: 2,
      amount: 90000,
      status: 'pending'
    },
    {
      id: '3',
      customer: 'Laura Martínez',
      service: 'Tour Café y Naturaleza',
      date: '2025-03-20',
      people: 2,
      amount: 170000,
      status: 'confirmed'
    },
    {
      id: '4',
      customer: 'Andrés Pérez',
      service: 'Transporte Turístico',
      date: '2025-03-22',
      people: 3,
      amount: 135000,
      status: 'confirmed'
    }
  ])
  
  const [aiRecommendations, setAIRecommendations] = useKV<AIRecommendation[]>('provider-ai-recommendations', [
    {
      id: '1',
      type: 'photo',
      priority: 'high',
      title: 'Actualiza las fotos de "Tour Café Buesaco"',
      description: 'Las fotos actuales tienen más de 6 meses. Fotos recientes y de alta calidad aumentan las conversiones.',
      impact: '+45% en reservas',
      action: 'upload-photos'
    },
    {
      id: '2',
      type: 'pricing',
      priority: 'high',
      title: 'Ajusta precios para Semana Santa',
      description: 'La demanda en tu zona aumentó 32% en las últimas 2 semanas. Precio óptimo sugerido por IA.',
      impact: '+15% ingresos potenciales',
      action: 'adjust-pricing'
    },
    {
      id: '3',
      type: 'availability',
      priority: 'medium',
      title: 'Abre más fechas en marzo',
      description: 'Detectamos 8 consultas sin disponibilidad en fechas solicitadas. Perderás oportunidades de venta.',
      impact: '8 reservas potenciales',
      action: 'add-availability'
    },
    {
      id: '4',
      type: 'description',
      priority: 'low',
      title: 'Mejora la descripción con palabras clave',
      description: 'Tu descripción actual tiene baja coincidencia con búsquedas populares: "avistamiento de aves", "café orgánico".',
      impact: '+22% visibilidad',
      action: 'optimize-description'
    }
  ])

  const activeServices = services?.filter(s => s.status === 'active').length || 0
  const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0
  const monthlyRevenue = bookings?.reduce((sum, b) => sum + b.amount, 0) || 0
  const avgRating = services && services.length > 0 
    ? services.reduce((sum, s) => sum + s.rating * s.reviews, 0) / services.reduce((sum, s) => sum + s.reviews, 0) || 0
    : 0
  const totalReviews = services?.reduce((sum, s) => sum + s.reviews, 0) || 0

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada exitosamente')
    onNavigate?.('home')
  }

  const handleDismissRecommendation = (id: string) => {
    setAIRecommendations((prev) => (prev || []).filter(r => r.id !== id))
    toast.success('Recomendación descartada')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive'
      case 'medium': return 'text-amber-500'
      case 'low': return 'text-blue-500'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Activo</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">En revisión</Badge>
      case 'inactive':
        return <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">Inactivo</Badge>
      default:
        return null
    }
  }

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Confirmada</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pendiente</Badge>
      case 'completed':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Completada</Badge>
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Cancelada</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('home')}
                className="gap-2"
              >
                <ArrowLeft size={18} />
                Inicio
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Panel de Prestador</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Gestiona tus servicios turísticos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                onClick={() => onNavigate?.('registro-servicio')}
                className="gap-2"
              >
                <Plus size={20} weight="bold" />
                <span className="hidden md:inline">Nuevo Servicio</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleLogout}
                className="gap-2"
              >
                <SignOut size={20} weight="bold" />
                <span className="hidden md:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab('bookings')}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <CalendarBlank size={22} weight="fill" className="text-primary" />
                </div>
                <span className="text-xs font-medium text-primary">Hoy</span>
              </div>
              <div className="text-2xl font-bold mb-0.5">
                {pendingBookings}
              </div>
              <div className="text-xs text-muted-foreground">
                Reservas pendientes
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-secondary/10 rounded-lg">
                  <CurrencyDollar size={22} weight="fill" className="text-secondary" />
                </div>
                <span className="text-xs font-medium text-secondary">Este mes</span>
              </div>
              <div className="text-2xl font-bold mb-0.5">
                ${(monthlyRevenue / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-muted-foreground">
                Ingresos del mes
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-accent/10 rounded-lg">
                  <Star size={22} weight="fill" className="text-accent" />
                </div>
                <span className="text-xs font-medium text-accent">{totalReviews} reseñas</span>
              </div>
              <div className="text-2xl font-bold mb-0.5">
                {avgRating.toFixed(1)} ⭐
              </div>
              <div className="text-xs text-muted-foreground">
                Calificación promedio
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-5 hover:shadow-lg transition-all" onClick={() => setActiveTab('services')}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-green-500/10 rounded-lg">
                  <CheckCircle size={22} weight="fill" className="text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600">{services?.length || 0} total</span>
              </div>
              <div className="text-2xl font-bold mb-0.5">
                {activeServices}
              </div>
              <div className="text-xs text-muted-foreground">
                Servicios activos
              </div>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence>
          {aiRecommendations && aiRecommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <Card className="p-5 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-primary rounded-lg">
                    <Sparkle size={22} weight="fill" className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-3">Recomendaciones Inteligentes de IA</h3>
                    <div className="space-y-2.5">
                      {aiRecommendations.slice(0, 3).map((rec) => (
                        <motion.div
                          key={rec.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-start gap-2 p-3 bg-card/60 rounded-lg border border-border/50 hover:border-border transition-all"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-semibold ${getPriorityColor(rec.priority)}`}>
                                {rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🔵'}
                              </span>
                              <p className="text-sm font-semibold">{rec.title}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1.5">{rec.description}</p>
                            <p className="text-xs font-medium text-primary">💡 Impacto: {rec.impact}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDismissRecommendation(rec.id)}
                            className="shrink-0"
                          >
                            ✕
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">General</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Resumen de Servicios</h3>
                <div className="space-y-3">
                  {services && services.slice(0, 3).map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{service.name}</span>
                        {getStatusBadge(service.status)}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {service.type} • {service.location}
                      </div>
                      {service.status === 'active' && (
                        <div className="flex items-center gap-3 text-xs">
                          <span>⭐ {service.rating} ({service.reviews})</span>
                          <span>💰 ${service.price.toLocaleString()}</span>
                          <span>📅 {service.bookings} reservas</span>
                        </div>
                      )}
                      {service.status === 'pending' && (
                        <div className="text-xs text-yellow-600 flex items-center gap-1">
                          <Clock size={12} />
                          Pendiente aprobación SuperAdmin
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab('services')}
                >
                  Ver todos los servicios
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Próximas Reservas</h3>
                <div className="space-y-3">
                  {bookings && bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{booking.customer}</span>
                        {getBookingStatusBadge(booking.status)}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {booking.service}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span>📅 {new Date(booking.date).toLocaleDateString('es-ES')}</span>
                        <span>👥 {booking.people} personas</span>
                        <span>💰 ${booking.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setActiveTab('bookings')}
                >
                  Ver todas las reservas
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">Mis Servicios</h3>
              <Button onClick={() => onNavigate?.('registro-servicio')} className="gap-2">
                <Plus size={18} />
                Agregar Servicio
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services && services.map((service) => (
                <Card key={service.id} className="p-5 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{service.name}</h4>
                    {getStatusBadge(service.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.type} • {service.location}
                  </p>
                  {service.status === 'active' && (
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <p className="font-medium">⭐ {service.rating} ({service.reviews})</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precio:</span>
                        <p className="font-medium">${service.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reservas:</span>
                        <p className="font-medium">{service.bookings}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Eye size={16} />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <PencilSimple size={16} />
                      Editar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">Reservas</h3>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 días</SelectItem>
                  <SelectItem value="30d">Últimos 30 días</SelectItem>
                  <SelectItem value="90d">Últimos 90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {bookings && bookings.map((booking) => (
                <Card key={booking.id} className="p-5 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold mb-1">{booking.customer}</h4>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    {getBookingStatusBadge(booking.status)}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Fecha:</span>
                      <p className="font-medium">{new Date(booking.date).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Personas:</span>
                      <p className="font-medium">{booking.people}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monto:</span>
                      <p className="font-medium">${booking.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  {booking.status === 'pending' && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button size="sm" className="flex-1">Confirmar</Button>
                      <Button size="sm" variant="outline" className="flex-1">Rechazar</Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
