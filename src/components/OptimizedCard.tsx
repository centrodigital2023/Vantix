import { memo, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Eye, Heart } from '@phosphor-icons/react'
import { PresenceIndicator, PresenceStatus } from '@/components/PresenceIndicator'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface OptimizedCardData {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviews: number
  image: string
  type: 'accommodation' | 'service' | 'destination'
  category?: string
  isOnline?: boolean
  hostStatus?: PresenceStatus
  badges?: string[]
  description?: string
}

interface OptimizedCardProps {
  data: OptimizedCardData
  onClick?: () => void
  onFavorite?: () => void
  isFavorited?: boolean
  priority?: boolean
  lazy?: boolean
}

export const OptimizedCard = memo(function OptimizedCard({
  data,
  onClick,
  onFavorite,
  isFavorited = false,
  priority = false,
  lazy = true
}: OptimizedCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(!lazy)

  useEffect(() => {
    if (lazy && !priority) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              observer.disconnect()
            }
          })
        },
        { rootMargin: '50px' }
      )

      const element = document.getElementById(`card-${data.id}`)
      if (element) {
        observer.observe(element)
      }

      return () => observer.disconnect()
    }
  }, [lazy, priority, data.id])

  return (
    <motion.div
      id={`card-${data.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card 
        className={cn(
          "overflow-hidden hover-lift cursor-pointer group h-full flex flex-col",
          "border-border/50 transition-all duration-300"
        )}
        onClick={onClick}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {isVisible && (
            <>
              <img
                src={data.image}
                alt={data.title}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  "group-hover:scale-110",
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted" />
              )}
            </>
          )}
          
          {data.hostStatus && (
            <div className="absolute top-3 left-3">
              <PresenceIndicator 
                status={data.hostStatus} 
                size="sm"
                showTooltip={false}
              />
            </div>
          )}

          {onFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.stopPropagation()
                onFavorite()
              }}
            >
              <Heart
                size={20}
                weight={isFavorited ? 'fill' : 'regular'}
                className={isFavorited ? 'text-destructive' : 'text-foreground'}
              />
            </Button>
          )}

          {data.badges && data.badges.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {data.badges.slice(0, 2).map((badge, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-sm"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1">
              {data.title}
            </h3>
            {data.rating > 0 && (
              <div className="flex items-center gap-1 text-sm font-medium shrink-0">
                <Star size={16} weight="fill" className="text-yellow-500" />
                <span>{data.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin size={16} weight="duotone" />
            <span className="line-clamp-1">{data.location}</span>
          </div>

          {data.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {data.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-2">
            <div>
              <div className="text-2xl font-bold">
                ${data.price.toLocaleString('es-CO')}
              </div>
              <div className="text-xs text-muted-foreground">por noche</div>
            </div>
            {data.reviews > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye size={14} />
                <span>{data.reviews} reseñas</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export const OptimizedCardSkeleton = memo(function OptimizedCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <CardContent className="p-4 space-y-3">
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>
      </CardContent>
    </Card>
  )
})
