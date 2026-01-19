import { Card, CardContent } from '@/components/ui/card'
import { 
  MapPin,
  Curren
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

 

  }).format(price)

  destination, 
  delay = 0
  const [isFavorite, s

    ? destination.images 

 

      {
        duratio
    )
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

        >
            size={20} 
   

      
        <d
            {destination.name}
          
            <MapPin size={16} wei
     
                : destination.region}
          </
          <p className="text-sm text-muted-foreground 
          </p>
        
          <div className
              <Star size={18} weight
          
              <
              </span>
          </div>
         
            <div 
              <span cl
              </span>
          </div>

          <Button
            
      
            Ver más
          <Button
            onClick={handleReserve}
          >
            Res
        </
    </Card>
})

















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
