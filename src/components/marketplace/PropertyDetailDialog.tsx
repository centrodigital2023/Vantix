import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Star, MapPin, Users, Bed, Bathtub, House, Lightning, Sparkle, 
  Heart, ShareNetwork, Check, WifiHigh, Car, Coffee, 
  Barbell, FireExtinguisher, ShieldCheck, Calendar, X
} from '@phosphor-icons/react'
import { PropertyCardData } from './EnhancedPropertyCard'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PropertyDetailDialogProps {
  property: PropertyCardData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBook?: () => void
}

export function PropertyDetailDialog({ 
  property, 
  open, 
  onOpenChange, 
  onBook 
}: PropertyDetailDialogProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  if (!property) return null

  const images = property.images || [property.image]
  const hasDiscount = property.discount && property.discount > 0
  const savings = property.originalPrice ? property.originalPrice - property.price : 0

  const amenitiesMap: { [key: string]: { icon: any; label: string } } = {
    'WiFi': { icon: WifiHigh, label: 'WiFi de alta velocidad' },
    'Estacionamiento': { icon: Car, label: 'Estacionamiento gratuito' },
    'Desayuno': { icon: Coffee, label: 'Desayuno incluido' },
    'Gimnasio': { icon: Barbell, label: 'Gimnasio' },
    'Seguridad': { icon: ShieldCheck, label: 'Seguridad 24/7' },
  }

  const allAmenities = property.amenities || ['WiFi', 'Estacionamiento', 'Desayuno', 'Gimnasio', 'Seguridad']

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-background z-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold truncate">{property.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  size={20} 
                  weight={isFavorite ? 'fill' : 'regular'} 
                  className={isFavorite ? 'text-destructive' : ''} 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <ShareNetwork size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-2 p-2">
              <div className="relative aspect-[4/3] lg:col-span-2">
                <img
                  src={images[selectedImageIndex]}
                  alt={property.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {hasDiscount && (
                    <Badge className="bg-destructive text-white gap-1 shadow-lg">
                      🔥 {property.discount}% OFF
                    </Badge>
                  )}
                  {property.isSuperhost && (
                    <Badge className="bg-secondary text-white gap-1 shadow-lg">
                      <Sparkle size={14} weight="fill" />
                      SuperAnfitrión
                    </Badge>
                  )}
                  {property.instantBook && (
                    <Badge className="bg-accent text-white gap-1 shadow-lg">
                      <Lightning size={14} weight="fill" />
                      Reserva Instantánea
                    </Badge>
                  )}
                </div>
              </div>
              
              {images.length > 1 && (
                <div className="lg:col-span-2 grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={cn(
                        "relative aspect-video rounded-lg overflow-hidden transition-all",
                        selectedImageIndex === idx 
                          ? "ring-2 ring-primary scale-95" 
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={20} weight="fill" className="text-accent" />
                        <span className="font-bold text-xl">{property.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({property.reviewCount} reseñas)
                        </span>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <Badge variant="outline" className="text-sm">
                        {property.propertyType}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-6 text-foreground">
                      {property.guests && (
                        <div className="flex items-center gap-2">
                          <Users size={20} className="text-muted-foreground" />
                          <span>{property.guests} huéspedes</span>
                        </div>
                      )}
                      {property.bedrooms && (
                        <div className="flex items-center gap-2">
                          <Bed size={20} className="text-muted-foreground" />
                          <span>{property.bedrooms} habitaciones</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-2">
                          <Bathtub size={20} className="text-muted-foreground" />
                          <span>{property.bathrooms} baños</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <House size={20} className="text-muted-foreground" />
                        <span>Propiedad completa</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Descripción</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Disfruta de una estadía excepcional en {property.name}, ubicado en el corazón de {property.location}. 
                      Este alojamiento {property.propertyType.toLowerCase()} ofrece todas las comodidades que necesitas para una 
                      experiencia memorable. Con capacidad para {property.guests || 4} personas, cuenta con {property.bedrooms || 2} 
                      habitaciones perfectamente equipadas y {property.bathrooms || 2} baños modernos.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Comodidades destacadas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {allAmenities.map((amenity) => {
                        const amenityInfo = amenitiesMap[amenity] || { 
                          icon: Check, 
                          label: amenity 
                        }
                        const Icon = amenityInfo.icon
                        return (
                          <div key={amenity} className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <Icon size={20} className="text-primary" />
                            </div>
                            <span>{amenityInfo.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Políticas de cancelación</h3>
                    <div className="space-y-3">
                      {property.freeCancellation ? (
                        <div className="flex items-start gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
                          <Check size={20} className="text-success flex-shrink-0 mt-0.5" weight="bold" />
                          <div>
                            <p className="font-semibold text-success mb-1">Cancelación gratuita</p>
                            <p className="text-sm text-muted-foreground">
                              Cancela hasta 48 horas antes del check-in y obtén un reembolso completo.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                          <Calendar size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold mb-1">Política flexible</p>
                            <p className="text-sm text-muted-foreground">
                              Cancelación gratuita hasta 7 días antes del check-in. Después, se aplica un cargo del 50%.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-6">
                    <div className="p-6 border rounded-2xl shadow-lg bg-card space-y-4">
                      <div>
                        {property.originalPrice && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg text-muted-foreground line-through">
                              ${property.originalPrice.toLocaleString()}
                            </span>
                            <Badge className="bg-destructive text-white">
                              -{property.discount}%
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-primary">
                            ${property.price.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">/ noche</span>
                        </div>
                        {savings > 0 && (
                          <p className="text-sm text-success font-semibold mt-1">
                            Ahorras ${savings.toLocaleString()} 💰
                          </p>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Check-in</span>
                          <span className="font-semibold">Después de 3:00 PM</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Check-out</span>
                          <span className="font-semibold">Antes de 11:00 AM</span>
                        </div>
                      </div>

                      <Separator />

                      <Button
                        size="lg"
                        className="w-full text-lg h-12"
                        onClick={() => {
                          if (onBook) onBook()
                          onOpenChange(false)
                        }}
                      >
                        {property.instantBook && (
                          <Lightning size={20} weight="fill" className="mr-2" />
                        )}
                        Reservar ahora
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        No se realizará ningún cargo en este momento
                      </p>

                      <div className="pt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">${property.price.toLocaleString()} x 3 noches</span>
                          <span className="font-semibold">${(property.price * 3).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tarifa de servicio</span>
                          <span className="font-semibold">${Math.floor(property.price * 0.1).toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-bold">
                          <span>Total</span>
                          <span className="text-primary text-lg">
                            ${(property.price * 3 + Math.floor(property.price * 0.1)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-muted/50 rounded-xl text-sm text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-success font-semibold">
                        <ShieldCheck size={18} weight="fill" />
                        <span>Pago 100% seguro</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tu información está protegida con encriptación de nivel bancario
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-16 right-6 bg-popover border rounded-lg shadow-xl p-4 z-20"
            >
              <p className="font-semibold mb-3">Compartir esta propiedad</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Copiar enlace
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Facebook
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
