import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Eye, PencilSimple, Calendar, Warning } from '@phosphor-icons/react'
import { HostProperty } from '@/lib/host-types'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: HostProperty
  onView?: () => void
  onEdit?: () => void
  onManageCalendar?: () => void
}

export function PropertyCard({ property, onView, onEdit, onManageCalendar }: PropertyCardProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      activo: { label: 'Activo', variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' },
      en_revision: { label: 'En Revisión', variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600' },
      inactivo: { label: 'Inactivo', variant: 'outline' as const, className: '' },
      suspendido: { label: 'Suspendido', variant: 'destructive' as const, className: '' },
      borrador: { label: 'Borrador', variant: 'outline' as const, className: '' }
    }
    
    const config = statusConfig[property.status]
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const hasAlerts = property.aiRecommendations && property.aiRecommendations.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-muted">
            {property.images[0] ? (
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Sin imagen
              </div>
            )}
            
            {hasAlerts && (
              <div className="absolute top-3 right-3">
                <div className="bg-yellow-500 text-white p-2 rounded-full shadow-lg">
                  <Warning className="w-4 h-4" weight="fill" />
                </div>
              </div>
            )}
          </div>

          <CardContent className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{property.name}</h3>
                  {getStatusBadge()}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location.city}, {property.location.department}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" weight="fill" />
                    <span className="font-semibold text-foreground">{property.metrics.rating.toFixed(1)}</span>
                    <span>({property.metrics.reviewCount})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tipo</p>
                    <p className="font-semibold capitalize">{property.type.replace('_', ' ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Ocupación</p>
                    <p className="font-semibold">{property.metrics.occupancyRate}%</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Precio/noche</p>
                    <p className="font-semibold">${property.pricing.basePrice.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground">Capacidad</p>
                    <p className="font-semibold">{property.capacity.maxGuests} huéspedes</p>
                  </div>
                </div>

                {hasAlerts && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Warning className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800">
                          {property.aiRecommendations![0].message}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                          {property.aiRecommendations![0].impact}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={onView} variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalles
              </Button>
              
              <Button onClick={onEdit} variant="outline" size="sm">
                <PencilSimple className="w-4 h-4 mr-2" />
                Editar
              </Button>
              
              <Button onClick={onManageCalendar} variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Calendario
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
