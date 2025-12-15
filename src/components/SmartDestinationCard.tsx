import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Star, 
  MapPin, 
  Heart, 
  CurrencyCircleDollar, 
  Calendar, 
  Users,
  WhatsappLogo,
  Phone,
  Clock,
  CheckCircle,
  MapTrifold,
  Camera,
  ShareNetwork
} from '@phosphor-icons/react'
import { EnrichedDestination } from '@/lib/api/sync'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { BookingDialog } from './BookingDialog'
import { toast } from 'sonner'

interface SmartDestinationCardProps {
  destination: EnrichedDestination
  onNavigate?: (page: string, id?: string) => void
  delay?: number
  featured?: boolean
}

export function SmartDestinationCard({ 
  destination, 
  onNavigate, 
  delay = 0,
  featured 
}: SmartDestinationCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const fallbackImage = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'
  const images = destination.images && destination.images.length > 0 
    ? destination.images 
    : [fallbackImage]

  const handleImageChange = (direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation()
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast.success(
      isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      {
        description: destination.name,
        duration: 2000
      }
    )
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    const phone = destination.location?.city === 'Pasto' 
      ? '+573123456789' 
      : '+573001234567'
    const message = encodeURIComponent(
      `Hola! Estoy interesado en conocer más sobre ${destination.name} en ${destination.location?.city || destination.region}. ¿Pueden darme más información?`
    )
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
    toast.success('Abriendo WhatsApp...', {
      description: 'Te conectaremos con un asesor',
      duration: 2000
    })
  }

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation()
    const phone = destination.location?.city === 'Pasto' 
      ? '+573123456789' 
      : '+573001234567'
    window.open(`tel:${phone}`)
    toast.success('Iniciando llamada...', {
      description: 'Contacto directo con un asesor',
      duration: 2000
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Enlace copiado', {
        description: 'Comparte este destino con tus amigos',
        duration: 2000
      })
    }
  }

  const handleReserve = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowBooking(true)
  }

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setShowDetails(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="h-full"
      >
        <Card 
          className="overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-primary/40"
          onClick={handleViewDetails}
        >
          <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-primary/5 to-accent/5">
            <motion.img 
              src={images[currentImageIndex]} 
              alt={destination.name} 
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = fallbackImage
              }}
            />

            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  onClick={(e) => handleImageChange('prev', e)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl z-10 backdrop-blur-sm"
                >
                  <span className="text-xl font-bold">‹</span>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  onClick={(e) => handleImageChange('next', e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl z-10 backdrop-blur-sm"
                >
                  <span className="text-xl font-bold">›</span>
                </motion.button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? 'w-8 bg-white shadow-lg' 
                          : 'w-1.5 bg-white/60'
                      }`}
                      animate={{ 
                        width: idx === currentImageIndex ? 32 : 6 
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {(featured || destination.featured) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.2 }}
                >
                  <Badge className="bg-accent text-accent-foreground shadow-lg font-semibold">
                    ✨ Destacado
                  </Badge>
                </motion.div>
              )}
              {destination.reviews && destination.reviews > 100 && (
                <Badge className="bg-primary text-primary-foreground shadow-lg font-semibold">
                  🔥 Popular
                </Badge>
              )}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
              onClick={handleFavorite}
              className="absolute top-3 right-3 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110 z-10 backdrop-blur-sm"
            >
              <Heart 
                size={22} 
                weight={isFavorite ? 'fill' : 'regular'}
                className={isFavorite ? 'text-red-500' : 'text-foreground'}
              />
            </motion.button>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
              <div className="flex items-center gap-2 text-white">
                <MapPin size={18} weight="fill" className="flex-shrink-0" />
                <span className="font-medium text-sm">
                  {destination.location?.city || destination.region}, Colombia
                </span>
              </div>
            </div>

            <motion.div 
              className="absolute inset-x-4 bottom-4 flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -40 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={handleWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-xl gap-2"
              >
                <WhatsappLogo size={18} weight="fill" />
                WhatsApp
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleCall}
                className="flex-1 bg-white hover:bg-white/90 text-foreground shadow-xl gap-2"
              >
                <Phone size={18} weight="fill" />
                Llamar
              </Button>
            </motion.div>
          </div>
          
          <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
            <div>
              <h3 className="font-bold text-xl leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {destination.name}
              </h3>
              
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
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewDetails()
                }}
                className="flex-1 gap-2"
              >
                <MapTrifold size={16} />
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
      </motion.div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold pr-8">{destination.name}</DialogTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={18} weight="fill" />
              <span>{destination.location?.city || destination.region}, Colombia</span>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-4 md:col-span-2 md:row-span-2">
                <img
                  src={images[0]}
                  alt={destination.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImage
                  }}
                />
              </div>
              {images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="col-span-2 md:col-span-1">
                  <img
                    src={img}
                    alt={`${destination.name} ${idx + 2}`}
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = fallbackImage
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                    <Star size={24} weight="fill" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Calificación</p>
                    <p className="text-2xl font-bold">{destination.rating.toFixed(1)}</p>
                    {destination.reviews && (
                      <p className="text-xs text-muted-foreground">{destination.reviews} reseñas</p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent text-accent-foreground rounded-lg">
                    <CurrencyCircleDollar size={24} weight="fill" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Desde</p>
                    <p className="text-xl font-bold">{formatPrice(destination.price)}</p>
                    <p className="text-xs text-muted-foreground">por persona</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary text-secondary-foreground rounded-lg">
                    <Users size={24} weight="fill" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Disponibilidad</p>
                    <p className="text-xl font-bold">Inmediata</p>
                    <p className="text-xs text-muted-foreground">Todo el año</p>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">Descripción</h4>
              <p className="text-muted-foreground leading-relaxed">
                {destination.description}
              </p>
            </div>

            {destination.activities && destination.activities.length > 0 && (
              <div>
                <h4 className="text-xl font-bold mb-3">Qué incluye</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {destination.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-primary flex-shrink-0" weight="fill" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.hotels && destination.hotels.length > 0 && (
              <div>
                <h4 className="text-xl font-bold mb-3">Alojamientos recomendados</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {destination.hotels.map((hotel, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex gap-3">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm line-clamp-1">{hotel.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={14} weight="fill" className="text-accent" />
                            <span className="text-sm font-semibold">{hotel.rating.toFixed(1)}</span>
                          </div>
                          <p className="text-sm text-primary font-bold mt-1">
                            {formatPrice(hotel.price)}
                          </p>
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
                onClick={handleShare}
                className="flex-1 gap-2"
              >
                <ShareNetwork size={20} />
                Compartir
              </Button>
              <Button
                onClick={handleWhatsApp}
                className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <WhatsappLogo size={20} weight="fill" />
                Consultar por WhatsApp
              </Button>
              <Button
                onClick={(e) => {
                  handleReserve(e)
                  setShowDetails(false)
                }}
                className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80"
              >
                <Calendar size={20} />
                Reservar ahora
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BookingDialog
        open={showBooking}
        onOpenChange={setShowBooking}
        accommodationId={destination.id}
        roomTypeId=""
        onConfirm={() => {
          setShowBooking(false)
          toast.success('¡Reserva confirmada!', {
            description: `Tu experiencia en ${destination.name} está reservada`,
            duration: 3000
          })
        }}
      />
    </>
  )
}
