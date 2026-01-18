import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Plus, X, Share, MapPin, Star, TrendDown } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export interface WishlistItem {
  id: string
  accommodationId: string
  name: string
  location: string
  price: number
  rating: number
  image: string
  addedAt: string
}

export interface Wishlist {
  id: string
  name: string
  items: WishlistItem[]
  createdAt: string
}

interface WishlistManagerProps {
  accommodationId?: string
  accommodationData?: {
    name: string
    location: string
    price: number
    rating: number
    image: string
  }
}

export function WishlistManager({ accommodationId, accommodationData }: WishlistManagerProps) {
  const [wishlists, setWishlists] = useKV<Wishlist[]>('user-wishlists', [])
  const [newListName, setNewListName] = useState('')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedWishlist, setSelectedWishlist] = useState<string | null>(null)

  const safeWishlists = wishlists || []

  const createWishlist = () => {
    if (!newListName.trim()) return

    const newWishlist: Wishlist = {
      id: `wishlist-${Date.now()}`,
      name: newListName.trim(),
      items: [],
      createdAt: new Date().toISOString()
    }

    setWishlists((prev) => [...(prev || []), newWishlist])
    setNewListName('')
    setShowCreateDialog(false)
    toast.success('Lista creada', {
      description: `"${newWishlist.name}" ha sido creada exitosamente`
    })
  }

  const addToWishlist = (wishlistId: string) => {
    if (!accommodationId || !accommodationData) return

    setWishlists((prev) =>
      (prev || []).map((list) => {
        if (list.id === wishlistId) {
          const alreadyExists = list.items.some((item) => item.accommodationId === accommodationId)
          
          if (alreadyExists) {
            toast.info('Ya guardado', {
              description: 'Este alojamiento ya está en esta lista'
            })
            return list
          }

          const newItem: WishlistItem = {
            id: `item-${Date.now()}`,
            accommodationId,
            ...accommodationData,
            addedAt: new Date().toISOString()
          }

          toast.success('Guardado', {
            description: `Agregado a "${list.name}"`
          })

          return {
            ...list,
            items: [...list.items, newItem]
          }
        }
        return list
      })
    )
  }

  const removeFromWishlist = (wishlistId: string, itemId: string) => {
    setWishlists((prev) =>
      (prev || []).map((list) =>
        list.id === wishlistId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    )
    toast.success('Eliminado de la lista')
  }

  const deleteWishlist = (wishlistId: string) => {
    setWishlists((prev) => (prev || []).filter((list) => list.id !== wishlistId))
    toast.success('Lista eliminada')
  }

  const shareWishlist = (wishlist: Wishlist) => {
    const url = `${window.location.origin}/wishlist/${wishlist.id}`
    navigator.clipboard.writeText(url)
    toast.success('Enlace copiado', {
      description: 'Comparte este enlace con tus amigos'
    })
  }

  if (accommodationId && accommodationData) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold mb-2">Guardar en lista:</p>
        <div className="grid gap-2">
          {safeWishlists.map((wishlist) => (
            <Button
              key={wishlist.id}
              variant="outline"
              size="sm"
              onClick={() => addToWishlist(wishlist.id)}
              className="justify-start gap-2"
            >
              <Heart size={16} />
              {wishlist.name}
              <span className="ml-auto text-xs text-muted-foreground">
                {wishlist.items.length}
              </span>
            </Button>
          ))}
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus size={16} />
                Nueva lista
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear nueva lista</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="list-name">Nombre de la lista</Label>
                  <Input
                    id="list-name"
                    placeholder="Ej: Viaje a Caribe, Escapada romántica..."
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && createWishlist()}
                  />
                </div>
                <Button onClick={createWishlist} className="w-full">
                  Crear lista
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Mis Listas</h2>
          <p className="text-muted-foreground mt-1">
            {safeWishlists.length} listas guardadas
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={20} />
              Nueva lista
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear nueva lista</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="list-name">Nombre de la lista</Label>
                <Input
                  id="list-name"
                  placeholder="Ej: Viaje a Caribe, Escapada romántica..."
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && createWishlist()}
                />
              </div>
              <Button onClick={createWishlist} className="w-full">
                Crear lista
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {safeWishlists.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart size={64} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tienes listas guardadas</h3>
          <p className="text-muted-foreground mb-6">
            Crea tu primera lista para guardar los alojamientos que te gustan
          </p>
          <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
            <Plus size={20} />
            Crear primera lista
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {safeWishlists.map((wishlist) => (
              <motion.div
                key={wishlist.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="overflow-hidden marketplace-card-hover cursor-pointer">
                  <div
                    className="aspect-[4/3] bg-muted relative overflow-hidden"
                    onClick={() => setSelectedWishlist(wishlist.id)}
                  >
                    {wishlist.items.length > 0 ? (
                      <div className="grid grid-cols-2 h-full">
                        {wishlist.items.slice(0, 4).map((item, idx) => (
                          <div key={item.id} className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Heart size={48} className="text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        {wishlist.items.length} lugares
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{wishlist.name}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareWishlist(wishlist)}
                        className="gap-1"
                      >
                        <Share size={16} />
                        Compartir
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWishlist(wishlist.id)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <X size={16} />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {selectedWishlist && (
        <Dialog open={!!selectedWishlist} onOpenChange={() => setSelectedWishlist(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {safeWishlists.find((w) => w.id === selectedWishlist)?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 pt-4">
              {safeWishlists
                .find((w) => w.id === selectedWishlist)
                ?.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-48 h-32 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin size={16} />
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={16} weight="fill" className="text-accent" />
                            {item.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              ${item.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">por noche</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWishlist(selectedWishlist, item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
