import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, CalendarBlank, CurrencyDollar, Star, Bell, ChartLine, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface PanelPrestadorProps {
  onNavigate?: (page: string) => void
}

export function PanelPrestador({ onNavigate }: PanelPrestadorProps) {
  const metrics = {
    total_services: 3,
    active_services: 2,
    pending_bookings: 5,
    monthly_revenue: 1250000,
    average_rating: 4.8,
    total_reviews: 24
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panel de Prestador</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus servicios turísticos
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => onNavigate?.('registro-servicio')}
            >
              <Plus className="mr-2" weight="bold" />
              Nuevo Servicio
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CalendarBlank size={24} weight="fill" className="text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Hoy</span>
              </div>
              <div className="text-3xl font-bold mb-1">
                {metrics.pending_bookings}
              </div>
              <div className="text-sm text-muted-foreground">
                Reservas pendientes
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <CurrencyDollar size={24} weight="fill" className="text-secondary" />
                </div>
                <span className="text-sm font-medium text-secondary">Este mes</span>
              </div>
              <div className="text-3xl font-bold mb-1">
                ${metrics.monthly_revenue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Ingresos del mes
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Star size={24} weight="fill" className="text-accent" />
                </div>
                <span className="text-sm font-medium text-accent">{metrics.total_reviews} reseñas</span>
              </div>
              <div className="text-3xl font-bold mb-1">
                {metrics.average_rating} ⭐
              </div>
              <div className="text-sm text-muted-foreground">
                Calificación promedio
              </div>
            </Card>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary rounded-lg">
                <Sparkle size={24} weight="fill" className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Recomendaciones de IA</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">📸</span>
                    <p className="text-sm">
                      <strong>Actualiza las fotos de "Tour Café Buesaco"</strong> - Las fotos de alta calidad aumentan las reservas un 45%
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent">💰</span>
                    <p className="text-sm">
                      <strong>Ajusta precios para Semana Santa</strong> - La demanda está aumentando en tu zona. Precio sugerido: +15%
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary">📆</span>
                    <p className="text-sm">
                      <strong>Abre más fechas en marzo</strong> - Detectamos alta demanda sin disponibilidad en 8 consultas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Services List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Tus Servicios</h3>
                <span className="text-sm text-muted-foreground">
                  {metrics.active_services} de {metrics.total_services} activos
                </span>
              </div>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Tour Café y Naturaleza</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Activo
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    🗺️ Tour guiado • Buesaco, Nariño
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span>⭐ 4.9 (12)</span>
                    <span>💰 $85,000</span>
                    <span>📅 15 reservas</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Transporte Turístico Pasto</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Activo
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    🚐 Transporte • Pasto - Nariño
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span>⭐ 4.7 (8)</span>
                    <span>💰 $45,000</span>
                    <span>📅 23 reservas</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30 opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Experiencia Gastronomía Local</span>
                    <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                      En revisión
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    🍽️ Gastronomía • Buesaco, Nariño
                  </div>
                  <div className="text-sm text-yellow-600 mt-2">
                    ⏳ Pendiente aprobación SuperAdmin
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Próximas Reservas</h3>
                <Button size="sm" variant="outline">
                  Ver todas
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">María González</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Confirmada
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Tour Café y Naturaleza
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span>📅 15 Mar 2025</span>
                    <span>👥 4 personas</span>
                    <span>💰 $340,000</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Carlos Ruiz</span>
                    <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Transporte Turístico
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span>📅 18 Mar 2025</span>
                    <span>👥 2 personas</span>
                    <span>💰 $90,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
