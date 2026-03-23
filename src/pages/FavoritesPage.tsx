import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { 
  Heart, 
  Trash, 
  MapPin, 
  Calendar, 
  CaretDown, 
  CaretUp, 
  Scales,
  Star,
  Bed,
  Users,
  ChartLineDown,
  SealCheck,
  Sparkle
} from '@phosphor-icons/react'
import { useFavorites } from '@/hooks/use-favorites'
import { useKV } from '@github/spark/hooks'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ShareMenu } from '@/components/ShareMenu'
import { FavoriteComparator } from '@/components/FavoriteComparator'
import { toast } from 'sonner'

interface FavoritesPageProps {
  onNavigate: (page: string, id?: string) => void
}

export function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { favoriteDetails, toggleFavorite, clearFavorites, count, updateFavoritePrice } = useFavorites()
  const [accommodations] = useKV<any[]>('accommodations-data', [])
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set())
  const [showComparator, setShowComparator] = useState(false)

  const getAccommodationDetails = (favoriteId: string) => {
    return accommodations.find(acc => acc.id === favoriteId)
  }

  const toggleExpanded = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleCompareSelection = (id: string) => {
    setSelectedForCompare(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (newSet.size >= 3) {
          toast.info('Máximo 3 favoritos para comparar')
          return newSet
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  const openComparator = () => {
    if (selectedForCompare.size < 2) {
      toast.error('Selecciona al menos 2 favoritos para comparar')
      return
    }
    setShowComparator(true)
  }

  const simulatePriceChange = () => {
    if (favoriteDetails.length === 0) {
      toast.error('Agrega algunos favoritos primero')
      return
    }

    const randomFavorite = favoriteDetails[Math.floor(Math.random() * favoriteDetails.length)]
    const discount = 0.10 + Math.random() * 0.15
    const newPrice = Math.round(randomFavorite.price * (1 - discount))
    
    updateFavoritePrice(randomFavorite.id, newPrice)
    toast.success('¡Precio actualizado! Revisa las notificaciones', {
      icon: '🎉'
    })
  }

  const selectedFavorites = favoriteDetails.filter(fav => selectedForCompare.has(fav.id))

  if (count === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Heart 
                  size={80} 
                  weight="thin" 
                  className="text-muted-foreground/30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[2px] w-16 bg-muted-foreground/30 rotate-45" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                No tienes favoritos aún
              </h1>
              <p className="text-muted-foreground">
                Empieza a guardar lugares que te gusten para encontrarlos fácilmente después
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => onNavigate('explorar')}
              className="gap-2"
            >
              Explorar destinos
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Mis favoritos
              </h1>
              <p className="text-muted-foreground">
                {count} {count === 1 ? 'lugar guardado' : 'lugares guardados'}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={simulatePriceChange}
                className="gap-2 border-accent/50 text-accent hover:bg-accent/10"
                size="sm"
              >
                <Sparkle size={16} weight="fill" />
                Simular cambio de precio
              </Button>

              <AnimatePresence>
                {selectedForCompare.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="default"
                            onClick={openComparator}
                            className="gap-2"
                            disabled={selectedForCompare.size < 2}
                          >
                            <Scales size={18} weight="bold" />
                            Comparar ({selectedForCompare.size})
                          </Button>
                        </TooltipTrigger>
                        {selectedForCompare.size < 2 && (
                          <TooltipContent>
                            Selecciona al menos 2 favoritos
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                )}
              </AnimatePresence>

              {count > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFavorites}
                  className="gap-2"
                >
                  <Trash size={18} />
                  Limpiar todo
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {favoriteDetails.map((item, index) => {
              const isExpanded = expandedCards.has(item.id)
              const isSelected = selectedForCompare.has(item.id)
              const details = getAccommodationDetails(item.id)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
                    <Card className={`overflow-hidden transition-all ${isExpanded ? 'shadow-xl' : 'hover:shadow-lg'} ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-80 flex-shrink-0">
                            <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />

                              <div className="absolute top-3 left-3 flex gap-2">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleCompareSelection(item.id)}
                                  className="h-6 w-6 bg-background/90 backdrop-blur border-2"
                                />
                                {item.hasDiscount && (
                                  <Badge className="bg-accent text-accent-foreground gap-1">
                                    <ChartLineDown size={14} weight="bold" />
                                    {item.discountPercentage?.toFixed(0)}% OFF
                                  </Badge>
                                )}
                              </div>

                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background hover:scale-110 transition-all"
                                onClick={() => toggleFavorite(item.id)}
                              >
                                <Heart 
                                  size={20} 
                                  weight="fill" 
                                  className="text-destructive"
                                />
                              </Button>
                            </div>
                          </div>

                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <div className="flex-1">
                                <div className="flex items-start gap-2 mb-2">
                                  <h3 className="font-bold text-xl line-clamp-2">
                                    {item.name}
                                  </h3>
                                  {details?.verified && (
                                    <SealCheck size={20} weight="fill" className="text-primary flex-shrink-0" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                  <MapPin size={16} weight="fill" className="text-primary/70" />
                                  <span>{item.location}</span>
                                </div>
                                {details && (
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Star size={16} weight="fill" className="text-warning" />
                                      <span className="font-semibold">{details.rating.toFixed(1)}</span>
                                      <span className="text-xs text-muted-foreground">
                                        ({details.reviewCount} reseñas)
                                      </span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <Badge variant="secondary">{details.type}</Badge>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <div className="text-right">
                                  {item.hasDiscount && item.originalPrice && (
                                    <p className="text-sm text-muted-foreground line-through">
                                      ${item.originalPrice.toLocaleString()}
                                    </p>
                                  )}
                                  <p className="text-2xl font-bold text-primary">
                                    ${item.price.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-muted-foreground">por noche</p>
                                </div>
                              </div>
                            </div>

                            {!isExpanded && details && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {details.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar size={14} />
                                <span>Guardado {format(item.addedAt, 'dd MMM yyyy', { locale: es })}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <ShareMenu
                                  title={item.name}
                                  price={item.price}
                                  url={`${window.location.origin}?page=detalle-alojamiento&id=${item.id}`}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onNavigate('detalle-alojamiento', item.id)}
                                  className="gap-2"
                                >
                                  Ver detalles
                                </Button>
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9"
                                  >
                                    {isExpanded ? <CaretUp size={18} /> : <CaretDown size={18} />}
                                  </Button>
                                </CollapsibleTrigger>
                              </div>
                            </div>

                            <CollapsibleContent>
                              {details && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-6 space-y-6"
                                >
                                  <Separator />

                                  <div>
                                    <h4 className="font-semibold text-base mb-3">Descripción</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {details.description}
                                    </p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-base mb-3">Amenidades</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                      {details.amenities?.slice(0, 9).map((amenity: string) => (
                                        <div key={amenity} className="flex items-center gap-2 text-sm">
                                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                          <span>{amenity}</span>
                                        </div>
                                      ))}
                                    </div>
                                    {details.amenities?.length > 9 && (
                                      <p className="text-sm text-primary mt-2">
                                        +{details.amenities.length - 9} amenidades más
                                      </p>
                                    )}
                                  </div>

                                  {details.roomTypes && details.roomTypes.length > 0 && (
                                    <div>
                                      <h4 className="font-semibold text-base mb-3">Habitaciones disponibles</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {details.roomTypes.slice(0, 4).map((room: any) => (
                                          <Card key={room.id} className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                              <h5 className="font-semibold text-sm">{room.name}</h5>
                                              <Badge variant="secondary" className="text-xs">
                                                {room.available} disponibles
                                              </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                              {room.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                  <Bed size={14} />
                                                  {room.bedType}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                  <Users size={14} />
                                                  {room.maxGuests}
                                                </span>
                                              </div>
                                              <p className="font-bold text-primary">
                                                ${room.pricePerNight.toLocaleString()}
                                              </p>
                                            </div>
                                          </Card>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => onNavigate('detalle-alojamiento', item.id)}
                                      className="flex-1"
                                    >
                                      Ver página completa
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </CollapsibleContent>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Collapsible>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <FavoriteComparator
        open={showComparator}
        onOpenChange={setShowComparator}
        selectedFavorites={selectedFavorites}
        onRemove={(id) => {
          setSelectedForCompare(prev => {
            const newSet = new Set(prev)
            newSet.delete(id)
            return newSet
          })
        }}
        onNavigate={onNavigate}
      />
    </div>
  )
}
