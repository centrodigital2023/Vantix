import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/butto
import { Button } from '@/components/ui/button'
import { 
  Heart,
  MapPin, 
} from '@
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
    minimumFractionD
}

const fallbackImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    : [fallbackImage]
  }).format(price)
 

export const OptimizedDestinationCard = memo(function OptimizedDestinationCard({ 
  destination, 
        durati
  featured 
}: OptimizedDestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  const images = destination.images && destination.images.length > 0 
    ? destination.images 
    if (onNavigate) {

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setImageError(true)
    toast.success(
      isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      {
        description: destination.name,
        duration: 2000
       
    )
  }, [isFavorite, destination.name])

  const handleReserve = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toast.info('Abriendo reserva...', { duration: 1500 })
  }, [])

  const handleViewDetails = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onNavigate) {
          <p className="text-sm text-muted-foreground l
     
        

              <Star size={18} weight="fill" cl
            </div>
        

          
          
            <div className="flex items-center gap-1 text-primary">
              <span className="te
     
          </div>

          <Button
            variant="outline"
            className="flex-1"
            Ver más
          <Button
            onClick={handl
          

        </div>
    </Card>
})






































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
