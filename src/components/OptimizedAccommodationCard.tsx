import { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/OptimizedImage'
import { MapPin, Star, Heart, Lightning } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface OptimizedAccommodationCardProps {
  id: string
  name: string
  location: string
  image: string
  price: number
  rating: number
  reviewCount: number
  featured?: boolean
  discount?: number
  onView: (id: string) => void
  onSave?: (id: string) => void
  index?: number
  className?: string
}

export const OptimizedAccommodationCard = memo(function OptimizedAccommodationCard({
  id,
  name,
  location,
  image,
  price,
  rating,
  reviewCount,
  featured = false,
  discount,
  onView,
  onSave,
  index = 0,
  className
}: OptimizedAccommodationCardProps) {
  const finalPrice = discount ? price * (1 - discount / 100) : price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={cn('h-full', className)}
    >
      <Card 
        className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
        onClick={() => onView(id)}
      >
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <OptimizedImage
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={400}
              height={300}
            />
            
            {featured && (
              <Badge 
                className="absolute top-3 left-3 gap-1 bg-accent/90 backdrop-blur text-white border-0"
              >
                <Lightning size={14} weight="fill" />
                Destacado
              </Badge>
            )}

            {discount && (
              <Badge 
                className="absolute top-3 right-3 gap-1 bg-destructive/90 backdrop-blur text-white border-0"
              >
                -{discount}%
              </Badge>
            )}

            {onSave && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background hover:scale-110 transition-all"
                onClick={(e) => {
                  e.stopPropagation()
                  onSave(id)
                }}
              >
                <Heart size={20} weight="bold" className="text-muted-foreground hover:text-accent" />
              </Button>
            )}
          </div>

          <div className="flex-1 p-4 space-y-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} weight="fill" className="text-primary/70" />
                <span className="line-clamp-1">{location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star size={16} weight="fill" className="text-accent" />
                <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewCount} reseñas)
              </span>
            </div>

            <div className="pt-2 border-t border-border/50">
              <div className="flex items-baseline gap-2">
                {discount ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-xl font-bold text-accent">
                      ${Math.round(finalPrice).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold">
                    ${price.toLocaleString()}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">/ noche</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
