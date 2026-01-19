import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
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
  delay?: number
}

export const OptimizedDestinationCard = memo(({ 
  destination, 
  onNavigate,
  delay = 0
}: OptimizedDestinationCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const fallbackImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'
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

  return (
    <Card 
      className="overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={handleViewDetails}
    >
      <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-primary/5 to-accent/5">
        <img 
          src={images[0]} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            if (!imageError) {
              target.src = fallbackImage
              setImageError(true)
            }
          }}
        />

        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
        >
          <Heart 
            size={20} 
            weight={isFavorite ? 'fill' : 'regular'}
            className={isFavorite ? 'text-red-500' : 'text-foreground'}
          />
        </button>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center gap-2 text-white">
            <MapPin size={16} weight="fill" className="flex-shrink-0" />
            <span className="font-medium text-sm">
              {destination.location?.city || destination.region}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        <div>
          <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {destination.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {destination.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t mt-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded">
              <Star size={16} weight="fill" className="text-accent" />
              <span className="font-bold text-sm">{destination.rating.toFixed(1)}</span>
            </div>
            {destination.reviews && (
              <span className="text-xs text-muted-foreground">
                ({destination.reviews})
              </span>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Desde</p>
            <div className="flex items-center gap-1 text-primary">
              <CurrencyCircleDollar size={20} weight="fill" />
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
