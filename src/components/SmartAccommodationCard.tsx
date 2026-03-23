import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Star, MapPin, Heart, WifiHigh, Car, Coffee, Bathtub, Users, CreditCard, Calendar, CheckCircle, Images } from '@phosphor-icons/react'
import { Accommodation } from '@/lib/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { BookingDialog } from './BookingDialog'
import { PhotoGalleryModal } from './PhotoGalleryModal'

interface SmartAccommodationCardProps {
  accommodation: Accommodation
  onSelect: (id: string) => void
  featured?: boolean
  onBookingSuccess?: () => void
}

export function SmartAccommodationCard({ accommodation, onSelect, featured, onBookingSuccess }: SmartAccommodationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showQuickBook, setShowQuickBook] = useState(false)
  const [showFullDialog, setShowFullDialog] = useState(false)
  const [showGallery, setShowGallery] = useState(false)

  const amenityIcons: Record<string, any> = {
    'WiFi': WifiHigh,
    'Estacionamiento': Car,
    'Desayuno': Coffee,
    'Baño privado': Bathtub,
    'Spa': Bathtub,
  }

  const getAmenityIcon = (amenity: string) => {
    const Icon = amenityIcons[amenity] || Users
    return <Icon size={16} />
  }

  const handleImageChange = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % accommodation.images.length)
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + accommodation.images.length) % accommodation.images.length)
    }
  }

  const handleQuickBook = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowQuickBook(true)
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFullDialog(true)
  }

  const lowestPrice = Math.min(...accommodation.roomTypes.map(rt => rt.pricePerNight))

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onClick={() => onSelect(accommodation.id)}
        className="cursor-pointer"
      >
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30">
          <div className="relative">
            <div className="relative h-64 overflow-hidden group">
              <img
                src={accommodation.images[currentImageIndex]}
                alt={accommodation.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {accommodation.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageChange('prev')
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageChange('next')
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {accommodation.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentImageIndex ? 'w-6 bg-white shadow-lg' : 'w-1.5 bg-white/60'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowGallery(true)
                    }}
                    className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Images size={16} className="mr-1" />
                    Ver todas ({accommodation.images.length})
                  </Button>
                </>
              )}

              {featured && (
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground shadow-lg font-semibold">
                  ✨ Destacado
                </Badge>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFavorite(!isFavorite)
                }}
                className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110 z-10"
              >
                <Heart 
                  size={20} 
                  weight={isFavorite ? 'fill' : 'regular'}
                  className={isFavorite ? 'text-red-500' : 'text-foreground'}
                />
              </button>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleViewDetails}
                    className="flex-1 bg-white hover:bg-white/90 text-foreground shadow-lg"
                  >
                    Ver detalles
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleQuickBook}
                    className="flex-1 bg-primary hover:bg-primary/90 shadow-lg"
                  >
                    <Calendar size={16} className="mr-1" />
                    Reservar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-2">
                    {accommodation.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={14} weight="fill" />
                    <span>{accommodation.city}, {accommodation.department}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1 rounded-lg shadow-sm">
                    <Star size={14} weight="fill" />
                    <span className="font-bold text-sm">{accommodation.rating.toFixed(1)}</span>
                  </div>
                  {accommodation.reviewCount > 0 && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {accommodation.reviewCount} reseñas
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {accommodation.amenities.slice(0, 4).map((amenity, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {accommodation.amenities.length > 4 && (
                  <div className="text-xs bg-muted px-2.5 py-1 rounded-md font-medium">
                    +{accommodation.amenities.length - 4} más
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="text-2xl font-bold text-primary">
                    ${lowestPrice.toLocaleString()}
                    <span className="text-sm text-muted-foreground font-normal"> /noche</span>
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={handleQuickBook}
                  className="gap-2"
                >
                  <CreditCard size={16} />
                  Reservar ahora
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={showFullDialog} onOpenChange={setShowFullDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{accommodation.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2">
              <img
                src={accommodation.images[0]}
                alt={accommodation.name}
                className="col-span-2 w-full h-64 object-cover rounded-lg"
              />
              {accommodation.images.slice(1, 5).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${accommodation.name} ${idx + 2}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Ubicación</h4>
                <p className="text-muted-foreground">{accommodation.city}, {accommodation.department}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Calificación</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star size={18} weight="fill" className="text-primary" />
                    <span className="font-bold">{accommodation.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-muted-foreground">({accommodation.reviewCount} reseñas)</span>
                </div>
              </div>
            </div>

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

            <div>
              <h4 className="font-semibold mb-3">Tipos de habitación disponibles</h4>
              <div className="space-y-3">
                {accommodation.roomTypes.map((room) => (
                  <Card key={room.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold">{room.name}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{room.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Users size={14} />
                          <span className="text-sm">Hasta {room.maxGuests} personas</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ${room.pricePerNight.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">por noche</p>
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setShowFullDialog(false)
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
          </div>
        </DialogContent>
      </Dialog>

      <BookingDialog
        open={showQuickBook}
        onOpenChange={setShowQuickBook}
        accommodationId={accommodation.id}
        roomTypeId={accommodation.roomTypes[0]?.id || ''}
        onConfirm={() => {
          setShowQuickBook(false)
          if (onBookingSuccess) {
            onBookingSuccess()
          }
        }}
      />

      <PhotoGalleryModal
        images={accommodation.images}
        initialIndex={currentImageIndex}
        open={showGallery}
        onOpenChange={setShowGallery}
        title={accommodation.name}
      />
    </>
  )
}
