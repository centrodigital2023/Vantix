import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  House, 
  CalendarDots, 
  ChartLine, 
  Star, 
  Bell, 
  Plus,
  Eye,
  ClockCounterClockwise,
  CheckCircle,
  Warning,
  ChatCircle,
  Gear,
  CurrencyDollar,
  TrendUp
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface Alojamiento {
  id: string
  nombre: string
  tipo: string
  estado: 'activo' | 'revision' | 'inactivo'
  ciudad: string
  puntuacion: number
  reservasHoy: number
  reservasProximas: number
  accionesPendientes: number
  ingresosMes: number
  tasaOcupacion: number
  imagenPortada?: string
}

interface Reserva {
  id: string
  huesped: string
  alojamientoId: string
  checkIn: string
  checkOut: string
  estado: 'confirmada' | 'pendiente' | 'completada'
  total: number
}

interface Notificacion {
  id: string
  tipo: 'urgente' | 'info' | 'recomendacion'
  titulo: string
  mensaje: string
  fecha: string
  leida: boolean
}

export function DashboardAnfitrion() {
  const [alojamientos, setAlojamientos] = useKV<Alojamiento[]>('anfitrion-alojamientos', [])
  const [reservas, setReservas] = useKV<Reserva[]>('anfitrion-reservas', [])
  const [notificaciones, setNotificaciones] = useKV<Notificacion[]>('anfitrion-notificaciones', [])
  const [selectedTab, setSelectedTab] = useState('resumen')

  useEffect(() => {
    if (!alojamientos || alojamientos.length === 0) {
      generarDatosDemo()
    }
  }, [])

  const generarDatosDemo = () => {
    const alojamientosDemo: Alojamiento[] = [
      {
        id: '1',
        nombre: 'Casa Campestre El Paraíso',
        tipo: 'Casa Rural',
        estado: 'activo',
        ciudad: 'Buesaco, Nariño',
        puntuacion: 4.8,
        reservasHoy: 2,
        reservasProximas: 8,
        accionesPendientes: 0,
        ingresosMes: 2400000,
        tasaOcupacion: 78
      },
      {
        id: '2',
        nombre: 'Hostal Colonial Centro',
        tipo: 'Hostal',
        estado: 'revision',
        ciudad: 'Pasto, Nariño',
        puntuacion: 4.5,
        reservasHoy: 0,
        reservasProximas: 3,
        accionesPendientes: 3,
        ingresosMes: 1800000,
        tasaOcupacion: 62
      }
    ]

    const reservasDemo: Reserva[] = [
      {
        id: 'r1',
        huesped: 'María Rodríguez',
        alojamientoId: '1',
        checkIn: '2025-02-15',
        checkOut: '2025-02-18',
        estado: 'confirmada',
        total: 450000
      },
      {
        id: 'r2',
        huesped: 'Carlos Mendoza',
        alojamientoId: '1',
        checkIn: '2025-02-20',
        checkOut: '2025-02-23',
        estado: 'confirmada',
        total: 520000
      }
    ]

    const notificacionesDemo: Notificacion[] = [
      {
        id: 'n1',
        tipo: 'urgente',
        titulo: 'Actualiza tus fotos',
        mensaje: 'Las propiedades con 10+ fotos tienen 50% más reservas',
        fecha: new Date().toISOString(),
        leida: false
      },
      {
        id: 'n2',
        tipo: 'recomendacion',
        titulo: 'Ajusta tu precio',
        mensaje: 'Tu precio está 15% por debajo del promedio en Buesaco',
        fecha: new Date().toISOString(),
        leida: false
      },
      {
        id: 'n3',
        tipo: 'info',
        titulo: 'Nueva reserva confirmada',
        mensaje: 'María Rodríguez reservó Casa Campestre El Paraíso',
        fecha: new Date().toISOString(),
        leida: false
      }
    ]

    setAlojamientos(() => alojamientosDemo)
    setReservas(() => reservasDemo)
    setNotificaciones(() => notificacionesDemo)
  }

  const estadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
      case 'revision': return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'inactivo': return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
      default: return ''
    }
  }

  const notificacionColor = (tipo: string) => {
    switch (tipo) {
      case 'urgente': return 'border-l-4 border-l-destructive bg-destructive/5'
      case 'recomendacion': return 'border-l-4 border-l-secondary bg-secondary/5'
      case 'info': return 'border-l-4 border-l-primary bg-primary/5'
      default: return ''
    }
  }

  const reservasHoyTotal = alojamientos?.reduce((sum, a) => sum + a.reservasHoy, 0) || 0
  const reservasProximasTotal = alojamientos?.reduce((sum, a) => sum + a.reservasProximas, 0) || 0
  const ingresosTotal = alojamientos?.reduce((sum, a) => sum + a.ingresosMes, 0) || 0
  const ocupacionPromedio = alojamientos && alojamientos.length > 0 
    ? alojamientos.reduce((sum, a) => sum + a.tasaOcupacion, 0) / alojamientos.length 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Panel de Anfitrión</h1>
              <p className="text-muted-foreground text-lg">
                Gestiona tus propiedades y maximiza tus reservas
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Plus size={20} weight="bold" />
              Nuevo Alojamiento
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Reservas Hoy
                  </CardTitle>
                  <CalendarDots size={20} className="text-primary" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{reservasHoyTotal}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Check-in programados
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-secondary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Próximas Reservas
                  </CardTitle>
                  <ClockCounterClockwise size={20} className="text-secondary" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{reservasProximasTotal}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  En los próximos 30 días
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-l-4 border-l-accent">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ingresos Mes
                  </CardTitle>
                  <CurrencyDollar size={20} className="text-accent" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${(ingresosTotal / 1000).toFixed(0)}k
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendUp size={12} className="text-emerald-500" weight="bold" />
                  +12% vs mes anterior
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ocupación
                  </CardTitle>
                  <ChartLine size={20} className="text-emerald-500" weight="duotone" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ocupacionPromedio.toFixed(0)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Promedio de tus propiedades
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="resumen" className="gap-2">
              <House size={16} weight="duotone" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="reservas" className="gap-2">
              <CalendarDots size={16} weight="duotone" />
              Reservas
            </TabsTrigger>
            <TabsTrigger value="notificaciones" className="gap-2 relative">
              <Bell size={16} weight="duotone" />
              Alertas
              {notificaciones && notificaciones.filter(n => !n.leida).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {notificaciones.filter(n => !n.leida).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <ChartLine size={16} weight="duotone" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="configuracion" className="gap-2">
              <Gear size={16} weight="duotone" />
              Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <House size={24} weight="duotone" />
                  Tus Alojamientos
                </CardTitle>
                <CardDescription>
                  Gestiona el estado y rendimiento de cada propiedad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alojamientos && alojamientos.map((alojamiento, index) => (
                  <motion.div
                    key={alojamiento.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{alojamiento.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{alojamiento.ciudad}</p>
                          </div>
                          <Badge className={estadoColor(alojamiento.estado)} variant="outline">
                            {alojamiento.estado === 'activo' && 'Activo'}
                            {alojamiento.estado === 'revision' && 'En Revisión'}
                            {alojamiento.estado === 'inactivo' && 'Inactivo'}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Star size={16} weight="fill" className="text-amber-500" />
                            <span className="text-sm font-medium">{alojamiento.puntuacion}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {alojamiento.tipo}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{alojamiento.tasaOcupacion}%</span> ocupación
                          </div>
                        </div>

                        {alojamiento.accionesPendientes > 0 && (
                          <div className="mt-3 flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-md">
                            <Warning size={16} weight="bold" />
                            <span className="text-sm font-medium">
                              {alojamiento.accionesPendientes} acciones pendientes
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 md:min-w-[200px]">
                        <Button variant="outline" className="w-full gap-2">
                          <Eye size={16} weight="duotone" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" className="w-full gap-2">
                          <Gear size={16} weight="duotone" />
                          Gestionar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={24} weight="duotone" />
                  Recomendaciones Inteligentes
                </CardTitle>
                <CardDescription>
                  Mejora tu visibilidad y aumenta tus reservas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {notificaciones && notificaciones.slice(0, 3).map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${notificacionColor(notif.tipo)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{notif.titulo}</h4>
                        <p className="text-sm text-muted-foreground">{notif.mensaje}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Ver más
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reservas</CardTitle>
                <CardDescription>
                  Gestiona los check-ins y check-outs programados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservas && reservas.map((reserva) => {
                    const alojamiento = alojamientos?.find(a => a.id === reserva.alojamientoId)
                    return (
                      <div key={reserva.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{reserva.huesped}</h4>
                            <p className="text-sm text-muted-foreground">{alojamiento?.nombre}</p>
                          </div>
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            {reserva.estado}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Check-in:</span>{' '}
                            <span className="font-medium">{new Date(reserva.checkIn).toLocaleDateString('es-CO')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Check-out:</span>{' '}
                            <span className="font-medium">{new Date(reserva.checkOut).toLocaleDateString('es-CO')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total:</span>{' '}
                            <span className="font-medium">${reserva.total.toLocaleString('es-CO')}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="gap-2">
                            <ChatCircle size={16} weight="duotone" />
                            Mensaje
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Eye size={16} weight="duotone" />
                            Detalles
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificaciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Centro de Notificaciones</CardTitle>
                <CardDescription>
                  Alertas, recomendaciones y actualizaciones importantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {notificaciones && notificaciones.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg ${notificacionColor(notif.tipo)} ${!notif.leida ? 'shadow-md' : 'opacity-60'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{notif.titulo}</h4>
                          {!notif.leida && (
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notif.mensaje}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notif.fecha).toLocaleString('es-CO')}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={notif.leida ? "ghost" : "default"}
                        onClick={() => {
                          setNotificaciones((prev) =>
                            prev ? prev.map(n => n.id === notif.id ? { ...n, leida: true } : n) : []
                          )
                        }}
                      >
                        {notif.leida ? 'Leída' : 'Marcar leída'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics en Desarrollo</CardTitle>
                <CardDescription>
                  Próximamente: gráficos de ingresos, ocupación y comparativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Panel de analytics próximamente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Personaliza tu panel y preferencias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Notificaciones por Email</h4>
                      <p className="text-sm text-muted-foreground">
                        Recibe alertas de reservas en tu correo
                      </p>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Sincronización de Calendario</h4>
                      <p className="text-sm text-muted-foreground">
                        Conecta con Airbnb, Booking y otros
                      </p>
                    </div>
                    <Button variant="outline">Conectar</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Política de Cancelación</h4>
                      <p className="text-sm text-muted-foreground">
                        Define tus términos de cancelación
                      </p>
                    </div>
                    <Button variant="outline">Editar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
