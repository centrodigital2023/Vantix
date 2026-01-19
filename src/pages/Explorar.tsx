import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { SearchBar } from '@/components/SearchBar'
import { CategoryCard } from '@/components/CategoryCard'
import { OptimizedCard, OptimizedCardSkeleton } from '@/components/OptimizedCard'
import { CATEGORIES } from '@/lib/data'
import { PageRoute } from '@/lib/types'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useRealtimeSync } from '@/hooks/use-realtime-sync'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkle, TrendUp, MapTrifold, Storefront, Circle, MagnifyingGlass, SlidersHorizontal, X } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface ExplorarProps {
  onNavigate: (page: PageRoute, id?: string) => void
}

export function Explorar({ onNavigate }: ExplorarProps) {
  const { trackInteraction, preferences } = useUserPreferences()
  const [accommodations] = useKV<any[]>('accommodations-data', [])
  const [services] = useKV<any[]>('services-data', [])
  const [activeTab, setActiveTab] = useState<'categories' | 'destinations' | 'services'>('categories')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  
  const { entities: onlineHosts } = useRealtimeSync('hosts')
  const { entities: onlineServices } = useRealtimeSync('services')

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'explorar' })
    
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  const handleCategoryClick = (category: typeof CATEGORIES[0]) => {
    trackInteraction({ 
      type: 'click', 
      category: category.slug 
    })
    onNavigate(`categoria-${category.slug}` as PageRoute)
  }

  const handleSearch = (query: string) => {
    trackInteraction({ 
      type: 'search', 
      searchQuery: query 
    })
    setSearchQuery(query)
    if (query.trim()) {
      toast.success(`Buscando: ${query}`)
    }
  }

  const handleDestinationClick = (id: string) => {
    trackInteraction({ type: 'click', category: 'destination' })
    onNavigate('detalle-alojamiento', id)
  }

  const handleServiceClick = (id: string) => {
    trackInteraction({ type: 'click', category: 'service' })
    toast.success('Servicio seleccionado')
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedRegion('all')
    setPriceRange('all')
    toast.info('Filtros eliminados')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedRegion !== 'all' || priceRange !== 'all'

  const recommendedCategories = preferences.favoriteCategories.length > 0
    ? CATEGORIES.filter(c => preferences.favoriteCategories.includes(c.slug)).slice(0, 3)
    : CATEGORIES.slice(0, 3)

  const safeAccommodations = accommodations || []
  const safeServices = services || []

  const filterDestinations = (destinations: any[]) => {
    return destinations.filter(dest => {
      const matchesSearch = !searchQuery || 
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory
      
      const matchesRegion = selectedRegion === 'all' || dest.location.includes(selectedRegion)
      
      const matchesPrice = priceRange === 'all' || 
        (priceRange === 'budget' && dest.price < 100000) ||
        (priceRange === 'mid' && dest.price >= 100000 && dest.price < 300000) ||
        (priceRange === 'luxury' && dest.price >= 300000)
      
      return matchesSearch && matchesCategory && matchesRegion && matchesPrice
    })
  }

  const destinationsWithStatus = safeAccommodations.slice(0, 12).map(acc => {
    const hostOnline = (onlineHosts || []).find(h => h.data?.email === acc.host?.email)
    return {
      id: acc.id || '',
      title: acc.nombre || acc.name || '',
      location: `${acc.ciudad || acc.location}, ${acc.region || 'Colombia'}`,
      price: acc.precioBase || acc.price || 100000,
      rating: acc.rating || 4.5,
      reviews: acc.reviews || 0,
      image: acc.imagenPrincipal || acc.image || '/placeholder.jpg',
      type: 'accommodation' as const,
      category: acc.category || 'Alojamiento',
      hostStatus: hostOnline?.status,
      badges: [acc.tipo || 'Destacado'],
      description: acc.descripcion || acc.description || ''
    }
  })

  const servicesWithStatus = safeServices.slice(0, 12).map(service => {
    const providerOnline = (onlineServices || []).find(s => s.data?.email === service.email)
    return {
      id: service.id || '',
      title: service.name || service.serviceName || '',
      location: service.location || 'Colombia',
      price: service.price || 50000,
      rating: service.rating || 4.5,
      reviews: service.reviews || 0,
      image: service.image || '/placeholder.jpg',
      type: 'service' as const,
      category: service.category || 'Servicio',
      hostStatus: providerOnline?.status,
      badges: [service.type || 'Servicio'],
      description: service.description || ''
    }
  })

  const filteredDestinations = filterDestinations(destinationsWithStatus)
  const filteredServices = filterDestinations(servicesWithStatus)

  const onlineHostsCount = (onlineHosts || []).filter(h => h.status === 'online').length
  const onlineServicesCount = (onlineServices || []).filter(s => s.status === 'online').length

  return (
    <div className="min-h-screen py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkle size={16} weight="fill" className="text-primary" />
            <span className="text-sm font-medium text-primary">Exploración Inteligente</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Explora Destinos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Descubre destinos, anfitriones y servicios en tiempo real. La plataforma que conecta experiencias auténticas.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
              <Circle size={8} weight="fill" className="text-success animate-pulse" />
              <span>{onlineHostsCount} anfitriones en línea</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
              <Circle size={8} weight="fill" className="text-secondary animate-pulse" />
              <span>{onlineServicesCount} servicios activos</span>
            </Badge>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar destinos, experiencias, regiones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto gap-2"
            >
              <SlidersHorizontal size={18} />
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Categoría</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Región</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las regiones</SelectItem>
                        <SelectItem value="Caribe">Caribe</SelectItem>
                        <SelectItem value="Andina">Andina</SelectItem>
                        <SelectItem value="Pacífico">Pacífico</SelectItem>
                        <SelectItem value="Amazonia">Amazonia</SelectItem>
                        <SelectItem value="Orinoquía">Orinoquía</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rango de precio</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los precios</SelectItem>
                        <SelectItem value="budget">Económico (&lt; $100.000)</SelectItem>
                        <SelectItem value="mid">Medio ($100k - $300k)</SelectItem>
                        <SelectItem value="luxury">Premium (&gt; $300.000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={clearFilters} className="gap-2">
                      <X size={16} />
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {preferences.favoriteCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendUp size={24} weight="duotone" className="text-primary" />
              <h2 className="text-2xl font-bold">Recomendado para ti</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCategories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="categories" className="gap-2">
              <MapTrifold size={18} />
              Categorías
            </TabsTrigger>
            <TabsTrigger value="destinations" className="gap-2">
              <Storefront size={18} />
              Destinos
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Sparkle size={18} />
              Servicios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="destinations" className="mt-0">
            {hasActiveFilters && (
              <div className="mb-6 text-center">
                <p className="text-muted-foreground">
                  Mostrando {filteredDestinations.length} de {destinationsWithStatus.length} destinos
                </p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <OptimizedCardSkeleton key={i} />
                ))
              ) : filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest, idx) => (
                  <OptimizedCard
                    key={dest.id}
                    data={dest}
                    onClick={() => handleDestinationClick(dest.id)}
                    priority={idx < 4}
                    lazy={idx >= 4}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No se encontraron destinos</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-0">
            {hasActiveFilters && (
              <div className="mb-6 text-center">
                <p className="text-muted-foreground">
                  Mostrando {filteredServices.length} de {servicesWithStatus.length} servicios
                </p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <OptimizedCardSkeleton key={i} />
                ))
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service, idx) => (
                  <OptimizedCard
                    key={service.id}
                    data={service}
                    onClick={() => handleServiceClick(service.id)}
                    priority={idx < 4}
                    lazy={idx >= 4}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No se encontraron servicios</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}