import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Star,
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
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price)
}

export const OptimizedDestinationCard = memo(({ destination, onNavigate }: OptimizedDestinationCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const images = destination.images && destination.images.length > 0 
    ? destination.images 
    : ['https://via.placeholder.com/400x300?text=No+Image']

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Eliminado de favoritos' : 'Añadido a favoritos', {
      duration: 2000
    })
  }, [isFavorite])

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

  return (
    <Card 
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/30"
      onClick={() => handleViewDetails()}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageError ? 'https://via.placeholder.com/400x300?text=No+Image' : images[0]} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            if (!imageError) {
              setImageError(true)
            }
          }}
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors z-10"
        >
          <Heart 
            size={20} 
            weight={isFavorite ? "fill" : "regular"}
            className={isFavorite ? "text-red-500" : "text-foreground"}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {destination.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Star size={16} weight="fill" className="text-yellow-500" />
            <span className="text-sm font-medium">{destination.rating || 4.5}</span>
            {destination.reviews && (
              <span className="text-xs text-muted-foreground">
                ({destination.reviews})
              </span>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Desde</p>
            <div className="flex items-center gap-1 text-primary">
              <CurrencyCircleDollar size={16} weight="bold" />
              <span className="text-lg font-bold">
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

OptimizedDestinationCard.displayName = 'OptimizedDestinationCard'
