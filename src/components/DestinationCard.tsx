import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, CurrencyCircleDollar, Users } from '@phosphor-icons/react'
import { EnrichedDestination } from '@/lib/api/sync'
import { motion } from 'framer-motion'

interface DestinationCardProps {
  destination: EnrichedDestination
  onClick?: () => void
  delay?: number
}

export function DestinationCard({ destination, onClick, delay = 0 }: DestinationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const fallbackImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop'
  const imageUrl = destination.images?.[0] || fallbackImage

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card 
        className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        onClick={onClick}
      >
        <div className="aspect-video overflow-hidden relative bg-muted">
          <img 
            src={imageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = fallbackImage
            }}
          />
          {destination.featured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              Destacado
            </Badge>
          )}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <MapPin size={16} weight="fill" />
              <span>{destination.location?.city || destination.region}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {destination.description}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1 text-sm">
              <Star size={16} weight="fill" className="text-accent" />
              <span className="font-semibold">{destination.rating.toFixed(1)}</span>
              {destination.reviews && (
                <span className="text-muted-foreground">
                  ({destination.reviews})
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-primary font-bold">
              <CurrencyCircleDollar size={18} weight="fill" />
              <span className="text-sm">{formatPrice(destination.price)}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
