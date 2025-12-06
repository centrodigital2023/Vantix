import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, MapPin, Heart, Share, X, Check, 
  WifiHigh, Car, Coffee, Bathtub, Users, 
  Calendar, CreditCard, Shield
} from '@phosphor-icons/react'
import { Accommodation, RoomType, Review } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

interface DetalleAlojamientoProps {
  accommodationId: string
  onClose: () => void
  onBook: (roomTypeId: string) => void
}

export function DetalleAlojamiento({ accommodationId, onClose, onBook }: DetalleAlojamientoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllImages, setShowAllImages] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string>()
  
  const [accommodations] = useKV<Accommodation[]>('accommodations-data', [])
  const accommodation = accommodations?.find(a => a.id === accommodationId)

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Alojamiento no encontrado</h2>
          <Button onClick={onClose}>Volver</Button>
        </div>
      </div>
    )
  }

  const amenityIcons: Record<string, any> = {
    'WiFi': WifiHigh,
    'Estacionamiento': Car,
    'Desayuno': Coffee,
    'Baño privado': Bathtub,
    'Spa': Bathtub,
    'Aire acondicionado': WifiHigh,
  }

  const getAmenityIcon = (amenity: string) => {
    const Icon = amenityIcons[amenity] || Check
    return <Icon size={20} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold truncate">{accommodation.name}</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart size={20} weight={isFavorite ? 'fill' : 'regular'} className={isFavorite ? 'text-red-500' : ''} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share size={20} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-4 gap-2 h-[500px]">
              <div 
                className="col-span-4 md:col-span-2 md:row-span-2 relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setShowAllImages(true)}
              >
                <img
                  src={accommodation.images[0]}
                  alt={accommodation.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {accommodation.images.slice(1, 5).map((image, idx) => (
                <div 
                  key={idx}
                  className="relative overflow-hidden rounded-lg cursor-pointer col-span-2 md:col-span-1"
                  onClick={() => setShowAllImages(true)}
                >
                  <img
                    src={image}
                    alt={`${accommodation.name} ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {idx === 3 && accommodation.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                      +{accommodation.images.length - 5} fotos
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg">
                <Star size={20} weight="fill" />
                <span className="font-bold text-lg">{accommodation.rating.toFixed(1)}</span>
              </div>
              <div>
                <div className="font-semibold">{accommodation.reviewCount} reseñas</div>
                <div className="text-sm text-muted-foreground">Calificación excelente</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} weight="fill" />
                <div>
                  <div className="font-medium text-foreground">{accommodation.city}</div>
                  <div className="text-sm">{accommodation.department}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{accommodation.description}</p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Servicios más populares</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {accommodation.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-primary">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Disponibilidad</h2>
              <div className="space-y-4">
                {accommodation.roomTypes.map((room) => (
                  <Card 
                    key={room.id}
                    className={selectedRoom === room.id ? 'border-primary border-2' : ''}
                  >
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{room.name}</h3>
                            <p className="text-sm text-muted-foreground">{room.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              <Users size={14} className="mr-1" />
                              {room.maxGuests} huéspedes
                            </Badge>
                            <Badge variant="secondary">{room.bedType}</Badge>
                            {room.amenities.slice(0, 2).map((amenity, idx) => (
                              <Badge key={idx} variant="outline">{amenity}</Badge>
                            ))}
                          </div>
                          {room.available > 0 && room.available <= 3 && (
                            <div className="text-sm text-accent font-medium">
                              ¡Solo quedan {room.available} disponibles!
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary">
                              ${room.pricePerNight.toLocaleString('es-CO')}
                            </div>
                            <div className="text-sm text-muted-foreground">por noche</div>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedRoom(room.id)
                              onBook(room.id)
                            }}
                            disabled={room.available === 0}
                            className="w-full md:w-auto"
                          >
                            {room.available === 0 ? 'No disponible' : 'Reservar'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">Políticas del alojamiento</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    Horarios
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in:</span>
                      <span className="font-medium">{accommodation.policies.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out:</span>
                      <span className="font-medium">{accommodation.policies.checkOut}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield size={20} className="text-primary" />
                    Cancelación
                  </h3>
                  <p className="text-sm text-muted-foreground">{accommodation.policies.cancellation}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Políticas adicionales</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      {accommodation.policies.childrenAllowed ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>Niños permitidos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {accommodation.policies.petsAllowed ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                      <span>Mascotas permitidas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen de reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Precio por noche</span>
                    <span className="font-semibold">${accommodation.pricePerNight.toLocaleString('es-CO')}</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield size={16} />
                    <span>Cancelación gratuita</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard size={16} />
                    <span>No se requiere pago anticipado</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} />
                    <span>Confirmación inmediata</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Continuar con la reserva
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAllImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
            onClick={() => setShowAllImages(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setShowAllImages(false)}
            >
              <X size={24} />
            </Button>
            <div className="max-w-6xl w-full px-4">
              <img
                src={accommodation.images[currentImageIndex]}
                alt={accommodation.name}
                className="w-full max-h-[90vh] object-contain"
              />
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex((prev) => (prev - 1 + accommodation.images.length) % accommodation.images.length)
                  }}
                  className="text-white hover:bg-white/20"
                >
                  ← Anterior
                </Button>
                <span className="text-white">
                  {currentImageIndex + 1} / {accommodation.images.length}
                </span>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex((prev) => (prev + 1) % accommodation.images.length)
                  }}
                  className="text-white hover:bg-white/20"
                >
                  Siguiente →
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
