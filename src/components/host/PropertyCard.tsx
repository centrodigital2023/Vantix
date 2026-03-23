import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Eye, PencilSimple, Calendar, Warning, CaretLeft, CaretRight, Images } from '@phosphor-icons/react'
import { HostProperty } from '@/lib/host-types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { PhotoGalleryModal } from '@/components/PhotoGalleryModal'

interface PropertyCardProps {
  property: HostProperty
  onView?: () => void
  onEdit?: () => void
  onManageCalendar?: () => void
}

export function PropertyCard({ property, onView, onEdit, onManageCalendar }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageDirection, setImageDirection] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

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
  const hasMultipleImages = property.images.length > 1

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageDirection(-1)
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageDirection(1)
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden bg-muted group cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              if (property.images.length > 0) {
                setShowGallery(true)
              }
            }}
          >
            {property.images.length > 0 ? (
              <>
                <AnimatePresence initial={false} custom={imageDirection}>
                  <motion.img
                    key={currentImageIndex}
                    src={property.images[currentImageIndex]}
                    alt={`${property.name} - Foto ${currentImageIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    custom={imageDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                  />
                </AnimatePresence>

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Imagen anterior"
                    >
                      <CaretLeft size={16} weight="bold" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      aria-label="Siguiente imagen"
                    >
                      <CaretRight size={16} weight="bold" />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {property.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation()
                            setImageDirection(idx > currentImageIndex ? 1 : -1)
                            setCurrentImageIndex(idx)
                          }}
                          className={cn(
                            "h-1.5 rounded-full transition-all",
                            idx === currentImageIndex 
                              ? "w-6 bg-white" 
                              : "w-1.5 bg-white/50 hover:bg-white/70"
                          )}
                          aria-label={`Ir a foto ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 left-2 bg-black/60 text-white border-0"
                    >
                      <Images size={12} className="mr-1" />
                      {property.images.length}
                    </Badge>
                  </>
                )}
              </>
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

      <PhotoGalleryModal
        images={property.images}
        initialIndex={currentImageIndex}
        open={showGallery}
        onOpenChange={setShowGallery}
        title={property.name}
      />
    </motion.div>
  )
}
