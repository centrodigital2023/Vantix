import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  House, 
  CalendarDots, 
  ChartLine, 
  Bell, 
  Plus,
  Gear,
  SignOut,
  List,
  CaretRight,
  User,
  CurrencyDollar,
  Star,
  CheckCircle,
  Eye,
  Sparkle
} from '@phosphor-icons/react'
import { HostMetricsCard } from '@/components/host/HostMetricsCard'
import { PropertyCard } from '@/components/host/PropertyCard'
import { AIRecommendationCard } from '@/components/host/AIRecommendationCard'
import { HostProperty, HostMetrics, HostReservation, HostAlert } from '@/lib/host-types'
import { toast } from 'sonner'

interface HostPanelMainProps {
  onNavigate?: (page: string) => void
}

export function HostPanelMain({ onNavigate }: HostPanelMainProps) {
  const [activeSection, setActiveSection] = useState<'resumen' | 'propiedades' | 'reservas' | 'alertas' | 'analytics' | 'configuracion'>('resumen')
  const [properties, setProperties] = useKV<HostProperty[]>('host-properties', [])
  const [reservations, setReservations] = useKV<HostReservation[]>('host-reservations', [])
  const [alerts, setAlerts] = useKV<HostAlert[]>('host-alerts', [])

  const sampleProperties: HostProperty[] = (properties && properties.length > 0) ? properties : [
    {
      id: '1',
      hostId: 'host-1',
      name: 'Casa Campestre El Paraíso',
      type: 'casa_campestre',
      category: 'casa_rural',
      status: 'activo',
      location: {
        country: 'Colombia',
        department: 'Nariño',
        city: 'Buesaco',
        address: 'Vereda El Salado',
        showExactLocation: false
      },
      capacity: {
        maxGuests: 8,
        bedrooms: 4,
        beds: 6,
        bathrooms: 3
      },
      amenities: {
        essential: ['WiFi', 'Cocina', 'TV'],
        security: ['Detector de humo', 'Botiquín'],
        extras: ['Piscina', 'Jardín', 'Terraza', 'Parqueadero']
      },
      gastronomy: {
        hasBreakfast: true,
        hasRestaurant: false,
        hasLocalFood: true,
        hasTastings: true,
        hasRoomService: false,
        hasCommunalKitchen: false
      },
      images: [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      ],
      pricing: {
        basePrice: 180000,
        cleaningFee: 50000,
        currency: 'COP',
        weeklyDiscount: 10,
        monthlyDiscount: 20
      },
      policies: {
        checkIn: '14:00',
        checkOut: '12:00',
        minStay: 2,
        cancellation: 'flexible',
        pets: true,
        smoking: false,
        parties: false
      },
      documents: {
        rnt: 'RNT-12345',
        rut: 'RUT-67890',
        status: 'approved'
      },
      metrics: {
        rating: 4.8,
        reviewCount: 24,
        responseRate: 95,
        responseTime: '1 hora',
        acceptanceRate: 90,
        totalReservations: 56,
        occupancyRate: 72
      },
      aiRecommendations: [
        {
          id: 'rec-1',
          type: 'photos',
          message: 'Actualiza 3 fotos para aumentar conversión',
          impact: '+50% más reservas esperadas',
          priority: 'high'
        },
        {
          id: 'rec-2',
          type: 'price',
          message: 'Ajusta precio para Semana Santa (alta demanda)',
          impact: '+$320.000 ingresos estimados',
          priority: 'medium'
        }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2025-01-10T15:30:00Z',
      publishedAt: '2024-02-01T09:00:00Z'
    },
    {
      id: '2',
      hostId: 'host-1',
      name: 'Cabaña Vista al Volcán',
      type: 'cabaña',
      category: 'casa_rural',
      status: 'activo',
      location: {
        country: 'Colombia',
        department: 'Nariño',
        city: 'Pasto',
        address: 'Vereda La Cocha',
        showExactLocation: false
      },
      capacity: {
        maxGuests: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1.5
      },
      amenities: {
        essential: ['WiFi', 'Cocina', 'Calefacción'],
        security: ['Detector de humo', 'Extintor', 'Botiquín'],
        extras: ['Chimenea', 'Vista panorámica', 'Parqueadero']
      },
      gastronomy: {
        hasBreakfast: true,
        hasRestaurant: false,
        hasLocalFood: false,
        hasTastings: false,
        hasRoomService: false,
        hasCommunalKitchen: true
      },
      images: [
        'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800'
      ],
      pricing: {
        basePrice: 150000,
        cleaningFee: 30000,
        currency: 'COP'
      },
      policies: {
        checkIn: '15:00',
        checkOut: '11:00',
        minStay: 1,
        cancellation: 'moderada',
        pets: false,
        smoking: false,
        parties: false
      },
      documents: {
        rnt: 'RNT-54321',
        status: 'approved'
      },
      metrics: {
        rating: 4.9,
        reviewCount: 18,
        responseRate: 98,
        responseTime: '30 min',
        acceptanceRate: 95,
        totalReservations: 42,
        occupancyRate: 85
      },
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2025-01-12T08:20:00Z',
      publishedAt: '2024-04-01T12:00:00Z'
    }
  ]

  const metrics: HostMetrics = {
    todayCheckIns: 2,
    todayCheckOuts: 1,
    upcomingReservations: 8,
    monthlyRevenue: 4850000,
    monthlyRevenueChange: 18,
    averageOccupancy: 78,
    totalReviews: 42,
    averageRating: 4.85,
    responseRate: 96,
    activeProperties: sampleProperties.filter(p => p.status === 'activo').length,
    pendingActions: 3
  }

  const sampleAlerts: HostAlert[] = [
    {
      id: 'alert-1',
      type: 'urgent',
      category: 'photos',
      title: 'Fotos insuficientes',
      message: 'Casa Campestre El Paraíso tiene menos de 5 fotos. Agrega más para aumentar conversión.',
      propertyId: '1',
      impact: '+40% más visitas',
      actionLabel: 'Subir fotos',
      actionRoute: '/host/properties/1/photos',
      createdAt: '2025-01-13T10:00:00Z',
      read: false
    },
    {
      id: 'alert-2',
      type: 'warning',
      category: 'pricing',
      title: 'Precio fuera de mercado',
      message: 'Tu precio está 15% por debajo del promedio en Buesaco. Considera ajustarlo.',
      propertyId: '1',
      impact: '+$230.000/mes estimados',
      actionLabel: 'Ajustar precio',
      actionRoute: '/host/properties/1/pricing',
      createdAt: '2025-01-12T14:30:00Z',
      read: false
    },
    {
      id: 'alert-3',
      type: 'info',
      category: 'reviews',
      title: 'Nueva reseña positiva',
      message: 'María González dejó una reseña de 5 estrellas. ¡Responde para mantener el engagement!',
      propertyId: '1',
      actionLabel: 'Responder',
      actionRoute: '/host/reviews',
      createdAt: '2025-01-13T09:15:00Z',
      read: false
    }
  ]

  const menuItems = [
    { id: 'resumen', label: 'Resumen', icon: <House weight="bold" /> },
    { id: 'propiedades', label: 'Mis Alojamientos', icon: <List weight="bold" /> },
    { id: 'reservas', label: 'Reservas', icon: <CalendarDots weight="bold" /> },
    { id: 'alertas', label: 'Alertas', icon: <Bell weight="bold" />, badge: sampleAlerts.filter(a => !a.read).length },
    { id: 'analytics', label: 'Analytics', icon: <ChartLine weight="bold" /> },
    { id: 'configuracion', label: 'Configuración', icon: <Gear weight="bold" /> }
  ]

  const handleSignOut = () => {
    toast.success('Sesión cerrada exitosamente')
    onNavigate?.('home')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-card border-r border-border sticky top-0">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <House weight="fill" className="w-6 h-6 text-primary" />
              Panel Anfitrión
            </h2>
            <p className="text-sm text-muted-foreground mt-1">SendAI Latinoamérica</p>
          </div>

          <nav className="p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <SignOut weight="bold" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {activeSection === 'resumen' && (
              <motion.div
                key="resumen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">¡Bienvenido de nuevo!</h1>
                  <p className="text-muted-foreground">Aquí está el resumen de tus alojamientos y reservas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <HostMetricsCard
                    title="Reservas Hoy"
                    value={metrics.todayCheckIns}
                    description={`${metrics.todayCheckOuts} check-outs programados`}
                    icon={<CheckCircle className="w-6 h-6" weight="bold" />}
                    iconColor="text-green-600"
                    iconBg="bg-green-100"
                    actionLabel="Ver detalles"
                    onAction={() => setActiveSection('reservas')}
                  />

                  <HostMetricsCard
                    title="Próximas Reservas"
                    value={metrics.upcomingReservations}
                    description="En los próximos 30 días"
                    icon={<CalendarDots className="w-6 h-6" weight="bold" />}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100"
                    actionLabel="Ver calendario"
                    onAction={() => setActiveSection('reservas')}
                  />

                  <HostMetricsCard
                    title="Ingresos del Mes"
                    value={`$${(metrics.monthlyRevenue / 1000).toFixed(0)}K`}
                    change={metrics.monthlyRevenueChange}
                    changeLabel="vs mes anterior"
                    icon={<CurrencyDollar className="w-6 h-6" weight="bold" />}
                    iconColor="text-yellow-600"
                    iconBg="bg-yellow-100"
                    actionLabel="Ver analytics"
                    onAction={() => setActiveSection('analytics')}
                  />

                  <HostMetricsCard
                    title="Ocupación Promedio"
                    value={`${metrics.averageOccupancy}%`}
                    description={`${metrics.activeProperties} propiedades activas`}
                    icon={<Star className="w-6 h-6" weight="bold" />}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-100"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-foreground">Tus Alojamientos</h2>
                      <Button onClick={() => onNavigate?.('registro-alojamiento')}>
                        <Plus className="w-4 h-4 mr-2" weight="bold" />
                        Nuevo Alojamiento
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {sampleProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          onView={() => toast.info('Abriendo vista pública...')}
                          onEdit={() => toast.info('Abriendo editor...')}
                          onManageCalendar={() => setActiveSection('reservas')}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <AIRecommendationCard
                      recommendations={sampleProperties.flatMap(p => p.aiRecommendations || [])}
                      onTakeAction={(id) => toast.success('Aplicando recomendación...')}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'propiedades' && (
              <motion.div
                key="propiedades"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Mis Alojamientos</h1>
                    <p className="text-muted-foreground">Gestiona todas tus propiedades desde aquí</p>
                  </div>
                  <Button size="lg" onClick={() => onNavigate?.('registro-alojamiento')}>
                    <Plus className="w-5 h-5 mr-2" weight="bold" />
                    Nuevo Alojamiento
                  </Button>
                </div>

                <div className="space-y-6">
                  {sampleProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onView={() => toast.info('Abriendo vista pública...')}
                      onEdit={() => toast.info('Abriendo editor...')}
                      onManageCalendar={() => setActiveSection('reservas')}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'alertas' && (
              <motion.div
                key="alertas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Centro de Alertas</h1>
                  <p className="text-muted-foreground">Mantente al día con notificaciones importantes</p>
                </div>

                <div className="space-y-4">
                  {sampleAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className={`${alert.type === 'urgent' ? 'border-red-500 border-2' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${
                              alert.type === 'urgent' ? 'bg-red-100' :
                              alert.type === 'warning' ? 'bg-yellow-100' :
                              alert.type === 'info' ? 'bg-blue-100' :
                              'bg-green-100'
                            }`}>
                              <Bell className={`w-6 h-6 ${
                                alert.type === 'urgent' ? 'text-red-600' :
                                alert.type === 'warning' ? 'text-yellow-600' :
                                alert.type === 'info' ? 'text-blue-600' :
                                'text-green-600'
                              }`} weight="bold" />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-foreground mb-1">{alert.title}</h3>
                              <p className="text-muted-foreground mb-2">{alert.message}</p>
                              {alert.impact && (
                                <p className="text-sm font-semibold text-primary mb-3">{alert.impact}</p>
                              )}
                              {alert.actionLabel && (
                                <Button size="sm">
                                  {alert.actionLabel}
                                  <CaretRight className="w-4 h-4 ml-1" weight="bold" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'reservas' && (
              <motion.div
                key="reservas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Reservas</h1>
                  <p className="text-muted-foreground">Administra todas tus reservas y calendarios</p>
                </div>

                <Card>
                  <CardContent className="p-12 text-center">
                    <CalendarDots className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Vista de Calendario Próximamente</h3>
                    <p className="text-muted-foreground">
                      Estamos desarrollando un calendario interactivo completo para gestionar tus reservas
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Analytics e Informes</h1>
                  <p className="text-muted-foreground">Analiza el rendimiento de tus alojamientos</p>
                </div>

                <Card>
                  <CardContent className="p-12 text-center">
                    <ChartLine className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Dashboard de Analytics Próximamente</h3>
                    <p className="text-muted-foreground">
                      Pronto podrás ver gráficos detallados de ingresos, ocupación y tendencias
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'configuracion' && (
              <motion.div
                key="configuracion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Configuración</h1>
                  <p className="text-muted-foreground">Administra tu perfil y preferencias</p>
                </div>

                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Panel de Configuración Próximamente</h3>
                    <p className="text-muted-foreground">
                      Personaliza tu perfil, métodos de pago y preferencias de notificación
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
