import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Heart, WifiHigh, Car, Coffee, Bathtub, Users } from '@phosphor-icons/react'
import { Accommodation } from '@/lib/types'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface AccommodationCardProps {
  accommodation: Accommodation
  onSelect: (id: string) => void
  featured?: boolean
}

export function AccommodationCard({ accommodation, onSelect, featured }: AccommodationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <div className="relative h-64 overflow-hidden group">
            <img
              src={accommodation.images[currentImageIndex]}
              alt={accommodation.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {accommodation.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleImageChange('prev')
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleImageChange('next')
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {accommodation.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {featured && (
              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                Destacado
              </Badge>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFavorite(!isFavorite)
              }}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <Heart 
                size={20} 
                weight={isFavorite ? 'fill' : 'regular'}
                className={isFavorite ? 'text-red-500' : 'text-foreground'}
              />
            </button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg leading-tight mb-1">
                  {accommodation.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} weight="fill" />
                  <span>{accommodation.city}, {accommodation.department}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md">
                  <Star size={14} weight="fill" />
                  <span className="font-semibold text-sm">{accommodation.rating.toFixed(1)}</span>
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
                  className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {accommodation.amenities.length > 4 && (
                <div className="text-xs bg-muted px-2 py-1 rounded-md">
                  +{accommodation.amenities.length - 4} más
                </div>
              )}
            </div>

            <div className="pt-2 border-t flex items-end justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Desde</div>
                <div className="text-2xl font-bold text-primary">
                  ${accommodation.pricePerNight.toLocaleString('es-CO')}
                </div>
                <div className="text-xs text-muted-foreground">por noche</div>
              </div>
              
              <Button 
                onClick={() => onSelect(accommodation.id)}
                className="bg-primary hover:bg-primary/90"
              >
                Ver disponibilidad
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
