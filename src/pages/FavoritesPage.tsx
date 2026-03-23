import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Trash, MapPin, Calendar } from '@phosphor-icons/react'
import { useFavorites } from '@/hooks/use-favorites'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface FavoritesPageProps {
  onNavigate: (page: string, id?: string) => void
}

export function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { favoriteDetails, toggleFavorite, clearFavorites, count } = useFavorites()

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Mis favoritos
              </h1>
              <p className="text-muted-foreground">
                {count} {count === 1 ? 'lugar guardado' : 'lugares guardados'}
              </p>
            </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDetails.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all group">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <picture>
                        <source 
                          srcSet={`${item.image}?format=webp`} 
                          type="image/webp" 
                        />
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </picture>

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

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => onNavigate('detalle-alojamiento', item.id)}
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 
                          className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                          onClick={() => onNavigate('detalle-alojamiento', item.id)}
                        >
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin size={14} weight="fill" className="text-primary/70" />
                          <span className="line-clamp-1">{item.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Desde</p>
                          <p className="text-xl font-bold text-primary">
                            ${item.price.toLocaleString()}
                            <span className="text-sm text-muted-foreground font-normal"> /noche</span>
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar size={12} />
                            Guardado
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(item.addedAt, 'dd MMM yyyy', { locale: es })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
