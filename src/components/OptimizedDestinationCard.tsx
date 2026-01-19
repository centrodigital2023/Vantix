import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Heart, 
  CurrencyCircleDollar, 
  Calendar,
} from '@phosphor-icons/react'
import { EnrichedDestination } from '@/lib/api/sync'
import { memo, useState, useCallback } from 'react'
import { toast } from 'sonner'

interface OptimizedDestinationCardProps {
  destination: EnrichedDestination
  onNavigate?: (page: string, id?: string) => void
  delay?: number
  featured?: boolean
}

const fallbackImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export const OptimizedDestinationCard = memo(function OptimizedDestinationCard({ 
  destination, 
  onNavigate, 
  featured 
}: OptimizedDestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const images = destination.images && destination.images.length > 0 
    ? destination.images 
    : [fallbackImage]

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(prev => !prev)
    toast.success(
      isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      {
        description: destination.name,
        duration: 2000
      }
    )
  }, [isFavorite, destination.name])

  const handleReserve = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toast.info('Abriendo reserva...', { duration: 1500 })
  }, [])

  const handleViewDetails = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onNavigate) {
      onNavigate('detalle-alojamiento', destination.id)
    }
  }, [onNavigate, destination.id])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  return (
    <Card 
      className="overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary/40"
      onClick={handleViewDetails}
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-primary/5 to-accent/5">
        <img 
          src={imageError ? fallbackImage : images[0]} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
          decoding="async"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {(featured || destination.featured) && (
            <Badge className="bg-accent text-accent-foreground shadow-lg font-semibold">
              ✨ Destacado
            </Badge>
          )}
          {destination.reviews && destination.reviews > 100 && (
            <Badge className="bg-primary text-primary-foreground shadow-lg font-semibold">
              🔥 Popular
            </Badge>
          )}
        </div>

        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110 z-10 backdrop-blur-sm"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart 
            size={22} 
            weight={isFavorite ? 'fill' : 'regular'}
            className={isFavorite ? 'text-red-500' : 'text-foreground'}
          />
        </button>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
          <div className="flex items-center gap-2 text-white">
            <MapPin size={18} weight="fill" className="flex-shrink-0" />
            <span className="font-medium text-sm">
              {destination.location?.city || destination.region}, Colombia
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
        <div>
          <h3 className="font-bold text-xl leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {destination.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t mt-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gradient-to-r from-accent/20 to-accent/10 px-3 py-1.5 rounded-lg">
              <Star size={18} weight="fill" className="text-accent" />
              <span className="font-bold text-base">{destination.rating.toFixed(1)}</span>
            </div>
            {destination.reviews && (
              <span className="text-xs text-muted-foreground">
                {destination.reviews.toLocaleString()} reseñas
              </span>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Desde</p>
            <div className="flex items-center gap-1 text-primary">
              <CurrencyCircleDollar size={22} weight="fill" />
              <span className="text-xl font-bold">
                {formatPrice(destination.price)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleViewDetails}
            className="flex-1"
          >
            Ver más
          </Button>
          <Button
            size="sm"
            onClick={handleReserve}
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Calendar size={16} />
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})
