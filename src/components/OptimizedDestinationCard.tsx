import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart,
  MapPin, 
  Star,
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
}

const fallbackImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}

export const OptimizedDestinationCard = memo(function OptimizedDestinationCard({ 
  destination, 
  onNavigate,
  delay = 0
}: OptimizedDestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const images = destination.images && destination.images.length > 0 
    ? destination.images 
    : [fallbackImage]

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
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
      onNavigate('destino-resultados', destination.id)
    }
  }, [onNavigate, destination.id])

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleViewDetails}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={imageError ? fallbackImage : images[0]}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={handleImageError}
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform z-10"
        >
          <Heart 
            size={20} 
            weight={isFavorite ? "fill" : "regular"} 
            className={isFavorite ? "text-red-500" : "text-foreground"} 
          />
        </button>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={16} weight="fill" className="text-primary shrink-0" />
            <span className="text-sm line-clamp-1">
              {destination.location 
                ? `${destination.location.city}, ${destination.location.department}`
                : destination.region}
            </span>
          </div>

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
