import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, Buildings, Warning, CurrencyDollar, ShieldWarning, ChartLine, TrendUp, MapPin, SignOut, ArrowLeft } from '@phosphor-icons/react'
import { SuperAdminStats } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface SuperAdminDashboardProps {
  onNavigate: (page: string) => void
}

export function SuperAdminDashboard({ onNavigate }: SuperAdminDashboardProps) {
  const { logout } = useAuth()
  const [stats, setStats] = useKV<SuperAdminStats>('superadmin-stats', {
    activeUsers: 2847,
    activeHosts: 456,
    blockedHosts: 12,
    publishedServices: 1289,
    totalBookings: 8934,
    revenueByCountry: {
      'Colombia': 456000,
      'México': 234000,
      'Perú': 189000,
      'Chile': 145000,
      'Argentina': 123000
    },
    openComplaints: 23,
    securityAlerts: 3,
    systemStatus: 'operational'
  })
  
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('7d')

  const totalRevenue = stats ? Object.values(stats.revenueByCountry).reduce((a, b) => a + b, 0) : 0

  const handleLogout = () => {
    logout()
    toast.success('Sesión de SuperAdmin cerrada exitosamente')
    onNavigate('home')
  }

  const handleBackToHome = () => {
    onNavigate('home')
  }

  const statCards = [
    {
      title: 'Usuarios Activos',
      value: stats?.activeUsers.toLocaleString() || '0',
      change: '+12.5%',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => onNavigate('superadmin-users')
    },
    {
      title: 'Anfitriones Activos',
      value: stats?.activeHosts.toLocaleString() || '0',
      change: `${stats?.blockedHosts || 0} bloqueados`,
      icon: Buildings,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => onNavigate('superadmin-providers')
    },
    {
      title: 'Servicios Publicados',
      value: stats?.publishedServices.toLocaleString() || '0',
      change: '+8.3%',
      icon: MapPin,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => onNavigate('superadmin-moderation')
    },
    {
      title: 'Reservas Totales',
      value: stats?.totalBookings.toLocaleString() || '0',
      change: '+15.2%',
      icon: TrendUp,
      color: 'text-turquoise',
      bgColor: 'bg-turquoise/10',
      action: () => onNavigate('superadmin-bookings')
    },
    {
      title: 'Ingresos Totales',
      value: `$${(totalRevenue / 1000).toFixed(0)}K`,
      change: '+23.1%',
      icon: CurrencyDollar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => onNavigate('superadmin-analytics')
    },
    {
      title: 'Quejas Abiertas',
      value: stats?.openComplaints.toString() || '0',
      change: (stats?.openComplaints || 0) > 20 ? 'Atención' : 'Normal',
      icon: Warning,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => onNavigate('superadmin-complaints')
    },
    {
      title: 'Alertas de Seguridad',
      value: stats?.securityAlerts.toString() || '0',
      change: (stats?.securityAlerts || 0) > 0 ? 'Revisar' : 'Todo OK',
      icon: ShieldWarning,
      color: (stats?.securityAlerts || 0) > 0 ? 'text-red-600' : 'text-green-600',
      bgColor: (stats?.securityAlerts || 0) > 0 ? 'bg-red-50' : 'bg-green-50',
      action: () => onNavigate('superadmin-users')
    },
    {
      title: 'Estado del Sistema',
      value: stats?.systemStatus === 'operational' ? 'Operativo' : 'Degradado',
      change: '99.9% uptime',
      icon: ChartLine,
      color: stats?.systemStatus === 'operational' ? 'text-green-600' : 'text-red-600',
      bgColor: stats?.systemStatus === 'operational' ? 'bg-green-50' : 'bg-red-50',
      action: () => onNavigate('superadmin-config')
    }
  ]

  const quickActions = [
    { label: 'Aprobar Nuevo Anfitrión', action: () => onNavigate('superadmin-providers'), urgent: true },
    { label: 'Moderar Contenido', action: () => onNavigate('superadmin-moderation'), urgent: true },
    { label: 'Resolver Quejas', action: () => onNavigate('superadmin-complaints'), urgent: false },
    { label: 'Ver Analítica', action: () => onNavigate('superadmin-analytics'), urgent: false },
    { label: 'Configurar Sistema', action: () => onNavigate('superadmin-config'), urgent: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="gap-2"
              >
                <ArrowLeft size={18} />
                Volver al Inicio
              </Button>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  Dashboard Superadmin
                </h1>
                <p className="text-muted-foreground text-lg">
                  Control total de SendAI Latinoamérica
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant={stats?.systemStatus === 'operational' ? 'default' : 'destructive'}
                className="text-sm px-3 py-1"
              >
                {stats?.systemStatus === 'operational' ? '● Sistema Operativo' : '● Sistema Degradado'}
              </Badge>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <SignOut size={20} weight="bold" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los países</SelectItem>
              <SelectItem value="colombia">🇨🇴 Colombia</SelectItem>
              <SelectItem value="mexico">🇲🇽 México</SelectItem>
              <SelectItem value="peru">🇵🇪 Perú</SelectItem>
              <SelectItem value="chile">🇨🇱 Chile</SelectItem>
              <SelectItem value="argentina">🇦🇷 Argentina</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={stat.action}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} weight="duotone" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className={`text-sm ${stat.change.includes('+') || stat.change === 'Normal' || stat.change === 'Todo OK' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrencyDollar className="w-5 h-5" weight="duotone" />
                Ingresos por País
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats && Object.entries(stats.revenueByCountry)
                  .sort(([, a], [, b]) => b - a)
                  .map(([country, revenue]) => {
                    const percentage = (revenue / totalRevenue) * 100
                    return (
                      <div key={country} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{country}</span>
                          <span className="text-muted-foreground">
                            ${(revenue / 1000).toFixed(0)}K ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-gradient-to-r from-primary to-secondary h-full"
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="w-5 h-5" weight="duotone" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.urgent ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={action.action}
                  >
                    {action.urgent && (
                      <Warning className="w-4 h-4 mr-2" weight="fill" />
                    )}
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '5 min', action: 'Nuevo anfitrión registrado', user: 'María González - Pasto, Colombia', type: 'info' },
                { time: '12 min', action: 'Queja reportada', user: 'Juan Pérez - Alojamiento #4523', type: 'warning' },
                { time: '23 min', action: 'Contenido moderado', user: 'Admin: Carlos - Foto rechazada', type: 'error' },
                { time: '1 hora', action: 'Reserva completada', user: 'Booking #8934 - $245 USD', type: 'success' },
                { time: '2 horas', action: 'Proveedor aprobado', user: 'Tours Nariño - 8 servicios', type: 'success' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-orange-500' :
                    activity.type === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    hace {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
