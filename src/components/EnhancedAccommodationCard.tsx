import { useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Star, 
  Heart, 
  Users, 
  Phone,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  CaretLeft,
  CaretRight,
  CalendarIcon,
  CheckCircle,
  X
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useKV } from '@github/spark/hooks'

interface AccommodationData {
  id: string
  name: string
  location: string
  city: string
  department: string
  images: string[]
  price: number
  rating: number
  reviewCount: number
  amenities: string[]
  roomTypes?: Array<{
    id: string
    name: string
    description: string
    maxGuests: number
    pricePerNight: number
    available: number
  }>
  contact?: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  description?: string
  featured?: boolean
  discount?: number
}

interface EnhancedAccommodationCardProps {
  accommodation: AccommodationData
  onView?: (id: string) => void
  index?: number
  priority?: boolean
}

export const EnhancedAccommodationCard = memo(({ 
  accommodation, 
  onView, 
  index = 0,
  priority = false 
}: EnhancedAccommodationCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [showQuickBook, setShowQuickBook] = useState(false)
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  
  const isFavorite = favorites ? favorites.includes(accommodation.id) : false

  const handleImageChange = useCallback((direction: 'next' | 'prev', e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % accommodation.images.length
      }
      return prev === 0 ? accommodation.images.length - 1 : prev - 1
    })
  }, [accommodation.images.length])

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(currentFavorites => {
      const favs = currentFavorites || []
      if (favs.includes(accommodation.id)) {
        return favs.filter(id => id !== accommodation.id)
      }
      return [...favs, accommodation.id]
    })
  }, [accommodation.id, setFavorites])

  const finalPrice = accommodation.discount 
    ? accommodation.price * (1 - accommodation.discount / 100) 
    : accommodation.price

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.05,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="h-full"
      >
        <Card 
          className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
          <CardContent className="p-0 h-full flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <picture>
                <source 
                  srcSet={`${accommodation.images[currentImageIndex]}?format=webp`} 
                  type="image/webp" 
                />
                <img
                  src={accommodation.images[currentImageIndex]}
                  alt={accommodation.name}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>

              {accommodation.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => handleImageChange('prev', e)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Imagen anterior"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </button>
                  <button
                    onClick={(e) => handleImageChange('next', e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Imagen siguiente"
                  >
                    <CaretRight size={20} weight="bold" />
                  </button>
                  
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {accommodation.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "h-1 rounded-full transition-all",
                          idx === currentImageIndex 
                            ? "w-6 bg-white shadow-lg" 
                            : "w-1.5 bg-white/60"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            
              {accommodation.featured && (
                <Badge className="absolute top-3 left-3 gap-1 bg-accent/90 backdrop-blur border-0 shadow-lg">
                  <Star size={14} weight="fill" />
                  Destacado
                </Badge>
              )}

              {accommodation.discount && (
                <Badge className="absolute top-3 right-14 bg-destructive/90 backdrop-blur border-0 shadow-lg">
                  -{accommodation.discount}%
                </Badge>
              )}

              <Button
                size="icon"
                variant="ghost"
                className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background hover:scale-110 transition-all"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  size={20} 
                  weight={isFavorite ? 'fill' : 'bold'} 
                  className={cn(
                    "transition-colors",
                    isFavorite ? "text-destructive" : "text-muted-foreground"
                  )}
                />
              </Button>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDetails(true)
                    }}
                    className="flex-1 bg-background hover:bg-background/90 shadow-lg"
                  >
                    Ver más
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowQuickBook(true)
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90 shadow-lg gap-1"
                  >
                    <CalendarIcon size={16} />
                    Reservar
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {accommodation.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} weight="fill" className="text-primary/70 flex-shrink-0" />
                  <span className="line-clamp-1">{accommodation.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                  <Star size={14} weight="fill" className="text-primary" />
                  <span className="font-semibold text-sm">{accommodation.rating.toFixed(1)}</span>
                </div>
                {accommodation.reviewCount > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({accommodation.reviewCount} reseñas)
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-border/50">
                <div className="flex items-baseline gap-2">
                  {accommodation.discount ? (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        ${accommodation.price.toLocaleString()}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ${Math.round(finalPrice).toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-primary">
                      ${accommodation.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">/ noche</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl pr-8">{accommodation.name}</DialogTitle>
            <button
              onClick={() => setShowDetails(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X size={20} />
              <span className="sr-only">Cerrar</span>
            </button>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-4 md:col-span-2 md:row-span-2">
                <picture>
                  <source 
                    srcSet={`${accommodation.images[0]}?format=webp`} 
                    type="image/webp" 
                  />
                  <img
                    src={accommodation.images[0]}
                    alt={accommodation.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </picture>
              </div>
              {accommodation.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="col-span-2 md:col-span-1">
                  <picture>
                    <source 
                      srcSet={`${img}?format=webp`} 
                      type="image/webp" 
                    />
                    <img
                      src={img}
                      alt={`${accommodation.name} ${idx + 2}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </picture>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin size={18} weight="fill" className="text-primary" />
                  Ubicación
                </h4>
                <p className="text-muted-foreground">
                  {accommodation.city}, {accommodation.department}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Star size={18} weight="fill" className="text-primary" />
                  Calificación
                </h4>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{accommodation.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({accommodation.reviewCount} reseñas)
                  </span>
                </div>
              </div>
            </div>

            {accommodation.description && (
              <div>
                <h4 className="font-semibold mb-2">Descripción</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {accommodation.description}
                </p>
              </div>
            )}

            {accommodation.amenities && accommodation.amenities.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Comodidades</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {accommodation.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-primary" weight="fill" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {accommodation.contact && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Información de contacto</h4>
                <div className="space-y-2">
                  {accommodation.contact.phone && (
                    <a 
                      href={`tel:${accommodation.contact.phone}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Phone size={16} weight="fill" />
                      <span>{accommodation.contact.phone}</span>
                    </a>
                  )}
                  {accommodation.contact.whatsapp && (
                    <a 
                      href={`https://wa.me/${accommodation.contact.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <WhatsappLogo size={16} weight="fill" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  {accommodation.contact.email && (
                    <a 
                      href={`mailto:${accommodation.contact.email}`}
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <EnvelopeSimple size={16} weight="fill" />
                      <span>{accommodation.contact.email}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {accommodation.roomTypes && accommodation.roomTypes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Habitaciones disponibles</h4>
                <div className="space-y-3">
                  {accommodation.roomTypes.map((room) => (
                    <Card key={room.id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">{room.name}</h5>
                          <p className="text-sm text-muted-foreground mb-2">
                            {room.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Users size={14} />
                            <span>Hasta {room.maxGuests} personas</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-bold text-primary">
                            ${room.pricePerNight.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">por noche</p>
                          <Button
                            size="sm"
                            onClick={() => {
                              setShowDetails(false)
                              setShowQuickBook(true)
                            }}
                          >
                            Seleccionar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowDetails(false)}
              >
                Cerrar
              </Button>
              <Button 
                className="flex-1 gap-2"
                onClick={() => {
                  setShowDetails(false)
                  setShowQuickBook(true)
                }}
              >
                <CalendarIcon size={18} />
                Reservar ahora
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showQuickBook} onOpenChange={setShowQuickBook}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reserva rápida</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">{accommodation.name}</h4>
              <p className="text-sm text-muted-foreground">{accommodation.location}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${Math.round(finalPrice).toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">/ noche</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setShowQuickBook(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setShowQuickBook(false)
                  if (onView) onView(accommodation.id)
                }}
              >
                Continuar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
})

EnhancedAccommodationCard.displayName = 'EnhancedAccommodationCard'
