import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, MapPin, Star, Wifi, Check, ChartLineDown } from '@phosphor-icons/react'
import { FavoriteItem } from '@/hooks/use-favorites'
import { useIsMobile } from '@/hooks/use-mobile'
import { useKV } from '@github/spark/hooks'

interface FavoriteComparatorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFavorites: FavoriteItem[]
  onRemove: (id: string) => void
  onNavigate: (page: string, id?: string) => void
}

const ComparisonRow = ({ label, values }: { label: string; values: (string | number | JSX.Element)[] }) => (
  <div className="grid grid-cols-4 gap-4 py-3 border-b border-border/50 last:border-0">
    <div className="font-medium text-sm text-muted-foreground">{label}</div>
    {values.map((value, index) => (
      <div key={index} className="text-sm">
        {value}
      </div>
    ))}
  </div>
)

export function FavoriteComparator({
  open,
  onOpenChange,
  selectedFavorites,
  onRemove,
  onNavigate
}: FavoriteComparatorProps) {
  const isMobile = useIsMobile()
  const [accommodations] = useKV<any[]>('accommodations-data', [])

  const getAccommodationDetails = (favoriteId: string) => {
    return accommodations.find(acc => acc.id === favoriteId)
  }

  const content = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedFavorites.map((favorite, index) => {
          const details = getAccommodationDetails(favorite.id)
          
          return (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <img
                  src={favorite.image}
                  alt={favorite.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/90 backdrop-blur hover:bg-background"
                  onClick={() => onRemove(favorite.id)}
                >
                  <X size={16} />
                </Button>
                {favorite.hasDiscount && (
                  <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                    <ChartLineDown size={14} className="mr-1" />
                    {favorite.discountPercentage?.toFixed(0)}% OFF
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-base line-clamp-2 mb-1">{favorite.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin size={12} weight="fill" className="text-primary/70" />
                <span className="line-clamp-1">{favorite.location}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <Separator />

      <div className="space-y-1">
        <h3 className="font-bold text-lg mb-4">Comparación de características</h3>

        <ComparisonRow
          label="Precio por noche"
          values={selectedFavorites.map(fav => (
            <div key={fav.id}>
              <p className="font-bold text-primary text-lg">
                ${fav.price.toLocaleString()}
              </p>
              {fav.hasDiscount && fav.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  ${fav.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          ))}
        />

        <ComparisonRow
          label="Calificación"
          values={selectedFavorites.map(fav => {
            const details = getAccommodationDetails(fav.id)
            const rating = details?.rating || 0
            return (
              <div key={fav.id} className="flex items-center gap-1">
                <Star size={14} weight="fill" className="text-warning" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                {details?.reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({details.reviewCount})
                  </span>
                )}
              </div>
            )
          })}
        />

        <ComparisonRow
          label="Tipo"
          values={selectedFavorites.map(fav => {
            const details = getAccommodationDetails(fav.id)
            return (
              <Badge key={fav.id} variant="secondary" className="w-fit">
                {details?.type || 'N/A'}
              </Badge>
            )
          })}
        />

        <ComparisonRow
          label="Categoría"
          values={selectedFavorites.map(fav => {
            const details = getAccommodationDetails(fav.id)
            return details?.category || 'N/A'
          })}
        />

        <ComparisonRow
          label="Ubicación"
          values={selectedFavorites.map(fav => {
            const details = getAccommodationDetails(fav.id)
            return details ? `${details.city}, ${details.department}` : fav.location
          })}
        />

        <div className="grid grid-cols-4 gap-4 py-3">
          <div className="font-medium text-sm text-muted-foreground">Amenidades</div>
          {selectedFavorites.map(fav => {
            const details = getAccommodationDetails(fav.id)
            const amenities = details?.amenities || []
            return (
              <div key={fav.id} className="space-y-1">
                {amenities.length > 0 ? (
                  amenities.slice(0, 5).map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-1 text-xs">
                      <Check size={12} className="text-success flex-shrink-0" />
                      <span className="line-clamp-1">{amenity}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No disponible</span>
                )}
                {amenities.length > 5 && (
                  <span className="text-xs text-primary">+{amenities.length - 5} más</span>
                )}
              </div>
            )
          })}
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
          {selectedFavorites.map(fav => (
            <Button
              key={fav.id}
              onClick={() => {
                onNavigate('detalle-alojamiento', fav.id)
                onOpenChange(false)
              }}
              className="w-full"
            >
              Ver detalles
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl">Comparar Favoritos</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Comparar Favoritos</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
