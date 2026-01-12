import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ChartLine, TrendUp, TrendDown, CurrencyDollar, Users, Buildings, Calendar, Sparkle, MapPin } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface AnalyticsData {
  revenueByCountry: { [key: string]: number }
  bookingsTrend: { month: string; bookings: number; revenue: number }[]
  topDestinations: { name: string; bookings: number; revenue: number }[]
  userGrowth: { month: string; tourists: number; hosts: number }[]
  conversionRate: number
  averageBookingValue: number
  predictedGrowth: number
}

interface SuperAdminAnalyticsProps {
  onNavigate: (page: string) => void
}

export function SuperAdminAnalytics({ onNavigate }: SuperAdminAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useKV<AnalyticsData>('superadmin-analytics', {
    revenueByCountry: {
      'Colombia': 456000,
      'México': 234000,
      'Perú': 189000,
      'Chile': 145000,
      'Argentina': 123000
    },
    bookingsTrend: [
      { month: 'Enero', bookings: 1234, revenue: 145000 },
      { month: 'Febrero', bookings: 1456, revenue: 167000 },
      { month: 'Marzo', bookings: 1789, revenue: 198000 },
      { month: 'Abril', bookings: 2012, revenue: 225000 },
      { month: 'Mayo', bookings: 2234, revenue: 252000 },
      { month: 'Junio', bookings: 2456, revenue: 278000 }
    ],
    topDestinations: [
      { name: 'Pasto, Colombia', bookings: 456, revenue: 67000 },
      { name: 'Ciudad de México, México', bookings: 389, revenue: 52000 },
      { name: 'Cusco, Perú', bookings: 345, revenue: 48000 },
      { name: 'Santiago, Chile', bookings: 298, revenue: 41000 },
      { name: 'Buenos Aires, Argentina', bookings: 267, revenue: 38000 }
    ],
    userGrowth: [
      { month: 'Enero', tourists: 1200, hosts: 120 },
      { month: 'Febrero', tourists: 1450, hosts: 145 },
      { month: 'Marzo', tourists: 1780, hosts: 178 },
      { month: 'Abril', tourists: 2100, hosts: 210 },
      { month: 'Mayo', tourists: 2450, hosts: 245 },
      { month: 'Junio', tourists: 2847, hosts: 284 }
    ],
    conversionRate: 12.5,
    averageBookingValue: 185,
    predictedGrowth: 23.4
  })

  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('6m')
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)

  const totalRevenue = analyticsData ? Object.values(analyticsData.revenueByCountry).reduce((a, b) => a + b, 0) : 0
  const currentMonthBookings = analyticsData?.bookingsTrend[analyticsData.bookingsTrend.length - 1].bookings || 0
  const previousMonthBookings = analyticsData?.bookingsTrend[analyticsData.bookingsTrend.length - 2].bookings || 0
  const bookingsGrowth = previousMonthBookings ? ((currentMonthBookings - previousMonthBookings) / previousMonthBookings * 100).toFixed(1) : '0'

  useEffect(() => {
    generateAIInsights()
  }, [])

  const generateAIInsights = async () => {
    setIsGeneratingInsights(true)
    try {
      const prompt = `Eres un analista de datos experto en turismo latinoamericano.
      
      Analiza estos datos de la plataforma SendAI y genera 5 insights accionables:
      
      - Ingresos totales: $${totalRevenue.toLocaleString()} USD
      - Reservas mes actual: ${currentMonthBookings}
      - Crecimiento de reservas: ${bookingsGrowth}%
      - Tasa de conversión: ${analyticsData?.conversionRate}%
      - Valor promedio de reserva: $${analyticsData?.averageBookingValue} USD
      - Crecimiento proyectado: ${analyticsData?.predictedGrowth}%
      
      Principales países:
      ${Object.entries(analyticsData?.revenueByCountry || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([country, revenue]) => `- ${country}: $${revenue.toLocaleString()} USD`)
        .join('\n')}
      
      Genera insights concisos (máx. 2 líneas cada uno) sobre:
      1. Oportunidades de crecimiento
      2. Riesgos o alertas
      3. Mercados prioritarios
      4. Optimización de conversión
      5. Predicciones para el próximo trimestre
      
      Responde en español de Colombia, directo y accionable.`

      const response = await window.spark.llm(prompt, 'gpt-4o-mini')
      const insights = response.split('\n').filter(line => line.trim().length > 0)
      setAiInsights(insights)
      toast.success('Insights generados con IA')
    } catch (error) {
      toast.error('Error al generar insights')
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  const stats = [
    {
      title: 'Ingresos Totales',
      value: `$${(totalRevenue / 1000).toFixed(0)}K`,
      change: '+23.1%',
      trend: 'up',
      icon: CurrencyDollar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Reservas Este Mes',
      value: currentMonthBookings.toLocaleString(),
      change: `+${bookingsGrowth}%`,
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Usuarios Activos',
      value: analyticsData?.userGrowth[analyticsData.userGrowth.length - 1]?.tourists.toLocaleString() || '0',
      change: '+15.4%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Tasa de Conversión',
      value: `${analyticsData?.conversionRate}%`,
      change: '+2.3%',
      trend: 'up',
      icon: TrendUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => onNavigate('superadmin-dashboard')} className="mb-4">
            ← Volver al Dashboard
          </Button>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Analytics e Inteligencia de Negocio
              </h1>
              <p className="text-muted-foreground text-lg">
                Métricas avanzadas y predicciones con IA
              </p>
            </div>
            <Button onClick={generateAIInsights} disabled={isGeneratingInsights}>
              <Sparkle className="w-4 h-4 mr-2" weight="duotone" />
              {isGeneratingInsights ? 'Generando...' : 'Generar Insights IA'}
            </Button>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-6">
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
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
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
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === 'up' ? (
                      <TrendUp className="w-4 h-4 text-green-600" weight="bold" />
                    ) : (
                      <TrendDown className="w-4 h-4 text-red-600" weight="bold" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">vs mes anterior</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {aiInsights.length > 0 && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-primary" weight="duotone" />
                Insights de IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                    <Badge variant="outline" className="flex-shrink-0">{index + 1}</Badge>
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
                {analyticsData && Object.entries(analyticsData.revenueByCountry)
                  .sort(([, a], [, b]) => b - a)
                  .map(([country, revenue]) => {
                    const percentage = (revenue / totalRevenue) * 100
                    return (
                      <div key={country} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{country}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              ${(revenue / 1000).toFixed(0)}K
                            </span>
                            <Badge variant="outline">{percentage.toFixed(1)}%</Badge>
                          </div>
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
                <MapPin className="w-5 h-5" weight="duotone" />
                Top Destinos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData?.topDestinations.map((destination, index) => (
                  <div key={destination.name} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <Badge variant="outline" className="flex-shrink-0">#{index + 1}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{destination.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {destination.bookings} reservas · ${(destination.revenue / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{destination.bookings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tendencia de Reservas e Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.bookingsTrend.map((data, index) => (
                <div key={data.month} className="grid grid-cols-3 gap-4 items-center p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{data.month}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reservas</p>
                    <p className="text-xl font-bold">{data.bookings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos</p>
                    <p className="text-xl font-bold text-green-600">
                      ${(data.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.userGrowth.map((data) => (
                <div key={data.month} className="grid grid-cols-3 gap-4 items-center p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{data.month}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Turistas</p>
                    <p className="text-xl font-bold text-blue-600">{data.tourists.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Anfitriones</p>
                    <p className="text-xl font-bold text-purple-600">{data.hosts.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
