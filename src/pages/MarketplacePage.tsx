import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagnifyingGlass, Faders, SortAscending, MapPin, Calendar } from '@phosphor-icons/react'
import { EnhancedPropertyCard, PropertyCardData } from '@/components/marketplace/EnhancedPropertyCard'
import { AdvancedFilterPanel, FilterOptions } from '@/components/marketplace/AdvancedFilterPanel'
import { PriceComparison } from '@/components/marketplace/PriceComparison'
import { HostProfileCard, HostProfileData } from '@/components/marketplace/HostProfileCard'
import { WishlistManager } from '@/components/marketplace/WishlistManager'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { motion } from 'framer-motion'

interface MarketplacePageProps {
  onNavigate: (page: string) => void
}

export function MarketplacePage({ onNavigate }: MarketplacePageProps) {
  const [properties] = useKV<PropertyCardData[]>('marketplace-properties', [])
  const [hosts] = useKV<HostProfileData[]>('marketplace-hosts', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended')
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [50000, 500000],
    propertyTypes: [],
    amenities: [],
    rating: 0,
    instantBook: false,
    superhost: false,
    freeCancellation: false
  })
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardData | null>(null)
  const [selectedHost, setSelectedHost] = useState<HostProfileData | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('properties')

  const safeProperties = properties || []
  const safeHosts = hosts || []

  const filteredProperties = safeProperties
    .filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.propertyType)) return false
      if (filters.rating > 0 && p.rating < filters.rating) return false
      if (filters.instantBook && !p.instantBook) return false
      if (filters.superhost && !p.isSuperhost) return false
      if (filters.freeCancellation && !p.freeCancellation) return false
      if (filters.amenities.length > 0 && !filters.amenities.every(a => p.amenities?.includes(a))) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Encuentra tu próximo destino
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compara precios, lee reseñas verificadas y reserva con confianza en el mejor marketplace de turismo de Colombia
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar destinos, ciudades, propiedades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button size="lg" variant="outline" className="gap-2 px-8">
                    <Faders size={20} />
                    Filtros
                    {(filters.propertyTypes.length > 0 || filters.amenities.length > 0 || filters.rating > 0 || filters.instantBook || filters.superhost || filters.freeCancellation) && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.propertyTypes.length + filters.amenities.length + (filters.rating > 0 ? 1 : 0) + (filters.instantBook ? 1 : 0) + (filters.superhost ? 1 : 0) + (filters.freeCancellation ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md p-0">
                  <AdvancedFilterPanel
                    onFilterChange={(newFilters) => {
                      setFilters(newFilters)
                      setShowFilters(false)
                    }}
                    resultCount={filteredProperties.length}
                    onClose={() => setShowFilters(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <MapPin size={14} className="mr-1" />
                Cualquier lugar
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <Calendar size={14} className="mr-1" />
                Cualquier fecha
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Ofertas especiales
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="properties">
                Alojamientos ({filteredProperties.length})
              </TabsTrigger>
              <TabsTrigger value="hosts">
                Anfitriones ({safeHosts.length})
              </TabsTrigger>
              <TabsTrigger value="wishlists">
                Mis Listas
              </TabsTrigger>
            </TabsList>

            {activeTab === 'properties' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <Button
                  variant={sortBy === 'recommended' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('recommended')}
                >
                  Recomendado
                </Button>
                <Button
                  variant={sortBy === 'price-low' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('price-low')}
                >
                  Precio: Menor
                </Button>
                <Button
                  variant={sortBy === 'price-high' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('price-high')}
                >
                  Precio: Mayor
                </Button>
                <Button
                  variant={sortBy === 'rating' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('rating')}
                >
                  Calificación
                </Button>
              </div>
            )}
          </div>

          <TabsContent value="properties" className="mt-0">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar tus filtros o búsqueda
                </p>
                <Button onClick={() => setFilters({
                  priceRange: [50000, 500000],
                  propertyTypes: [],
                  amenities: [],
                  rating: 0,
                  instantBook: false,
                  superhost: false,
                  freeCancellation: false
                })}>
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property, idx) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <EnhancedPropertyCard
                      property={property}
                      onView={() => setSelectedProperty(property)}
                      onBook={() => {
                        setSelectedProperty(property)
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hosts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeHosts.map((host) => (
                <motion.div
                  key={host.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <HostProfileCard
                    host={host}
                    compact
                    onMessage={() => setSelectedHost(host)}
                    onViewProperties={() => {
                      const hostProperties = safeProperties.filter(p => p.hostId === host.id)
                      console.log('Host properties:', hostProperties)
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlists" className="mt-0">
            <WishlistManager />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedProperty && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedProperty.name}</h2>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin size={16} />
                  {selectedProperty.location}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.name}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                </div>
                <div>
                  <PriceComparison
                    currentPrice={selectedProperty.price}
                    accommodationId={selectedProperty.id}
                    accommodationName={selectedProperty.name}
                  />
                </div>
              </div>

              {selectedProperty.hostId && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Anfitrión</h3>
                  {safeHosts.find(h => h.id === selectedProperty.hostId) && (
                    <HostProfileCard
                      host={safeHosts.find(h => h.id === selectedProperty.hostId)!}
                      onMessage={() => setSelectedHost(safeHosts.find(h => h.id === selectedProperty.hostId)!)}
                    />
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={() => onNavigate('reserva-confirmacion')}>
                  Reservar ahora
                </Button>
                <Button size="lg" variant="outline">
                  Contactar anfitrión
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedHost} onOpenChange={() => setSelectedHost(null)}>
        <DialogContent className="max-w-2xl">
          {selectedHost && (
            <HostProfileCard
              host={selectedHost}
              onViewProperties={() => {
                setSelectedHost(null)
                setActiveTab('properties')
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
