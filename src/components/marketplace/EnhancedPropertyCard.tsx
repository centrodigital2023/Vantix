import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, MapPin, Lightning, Sparkle, TrendDown, Users, Bed } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { WishlistManager } from './WishlistManager'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PropertyDetailDialog } from './PropertyDetailDialog'

export interface PropertyCardData {
  id: string
  name: string
  location: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  images?: string[]
  isSuperhost?: boolean
  instantBook?: boolean
  freeCancellation?: boolean
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  guests?: number
  amenities?: string[]
  discount?: number
  hostId?: string
}

interface EnhancedPropertyCardProps {
  property: PropertyCardData
  onView?: () => void
  onBook?: () => void
  className?: string
}

export function EnhancedPropertyCard({ property, onView, onBook, className }: EnhancedPropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const images = property.images || [property.image]
  const hasDiscount = property.discount && property.discount > 0
  const savings = property.originalPrice ? property.originalPrice - property.price : 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFavorite) {
      setIsFavorite(false)
    } else {
      setShowWishlist(true)
    }
  }

  const handleCardClick = () => {
    setShowDetailDialog(true)
  }

  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDetailDialog(true)
  }

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden cursor-pointer marketplace-card-hover group",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={images[currentImageIndex]}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {images.length > 1 && isHovered && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/60 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {hasDiscount && (
              <Badge className="deal-badge">
                <TrendDown size={14} weight="bold" className="mr-1" />
                {property.discount}% OFF
              </Badge>
            )}
            {property.isSuperhost && (
              <Badge variant="secondary" className="bg-secondary text-white gap-1">
                <Sparkle size={14} weight="fill" />
                SuperAnfitrión
              </Badge>
            )}
            {property.instantBook && (
              <Badge variant="secondary" className="bg-accent text-white gap-1">
                <Lightning size={14} weight="fill" />
                Reserva Instantánea
              </Badge>
            )}
          </div>

          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all",
              "bg-white/90 hover:bg-white shadow-lg",
              "hover:scale-110 active:scale-95"
            )}
          >
            <Heart
              size={20}
              weight={isFavorite ? "fill" : "regular"}
              className={cn(
                "transition-colors",
                isFavorite ? "text-destructive" : "text-foreground"
              )}
            />
          </button>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onBook) onBook()
                }}
                className="w-full"
                size="sm"
              >
                Ver Disponibilidad
              </Button>
            </motion.div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {property.propertyType}
                </Badge>
                {property.freeCancellation && (
                  <Badge variant="outline" className="text-xs text-success border-success">
                    Cancelación gratis
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-colors">
                {property.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span className="truncate">{property.location}</span>
              </div>
            </div>
          </div>

          {(property.bedrooms || property.guests) && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              {property.guests && (
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {property.guests} huéspedes
                </span>
              )}
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <Bed size={16} />
                  {property.bedrooms} habitaciones
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={16} weight="fill" className="text-accent" />
              <span className="font-semibold">{property.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({property.reviewCount} reseñas)
            </span>
          </div>

          <div className="border-t pt-3 space-y-3">
            <div className="flex items-end justify-between">
              <div>
                {property.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    ${property.originalPrice.toLocaleString()}
                  </p>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">/ noche</span>
                </div>
                {savings > 0 && (
                  <p className="text-xs text-success font-semibold">
                    Ahorras ${savings.toLocaleString()}
                  </p>
                )}
              </div>
              {property.instantBook && (
                <Badge className="bg-accent text-white text-xs">
                  <Lightning size={12} className="mr-1" weight="fill" />
                  Instantáneo
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewMore}
                className="flex-1"
              >
                Ver más
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  if (onBook) onBook()
                }}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Reservar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PropertyDetailDialog
        property={property}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
        onBook={onBook}
      />

      <Dialog open={showWishlist} onOpenChange={setShowWishlist}>
        <DialogContent>
          <WishlistManager
            accommodationId={property.id}
            accommodationData={{
              name: property.name,
              location: property.location,
              price: property.price,
              rating: property.rating,
              image: property.image
            }}
          />
          <Button
            onClick={() => {
              setShowWishlist(false)
              setIsFavorite(true)
            }}
            className="mt-4"
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
