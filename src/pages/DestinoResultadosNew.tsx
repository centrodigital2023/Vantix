import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AccommodationCard } from '@/components/AccommodationCard'
import { AdvancedSearchBar } from '@/components/AdvancedSearchBar'
import { Funnel, Star, MapPin } from '@phosphor-icons/react'
import { Accommodation, SearchFilters } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { generateSampleAccommodations } from '@/lib/sample-data'
import { motion, AnimatePresence } from 'framer-motion'

export function DestinoResultados() {
  const [accommodations, setAccommodations] = useKV<Accommodation[]>('accommodations-data', [])
  const [searchFilters, setSearchFilters] = useKV<SearchFilters>('current-search-filters', {})
  const [localFilters, setLocalFilters] = useState<SearchFilters>(searchFilters || {})
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popular'>('popular')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    if (!accommodations || accommodations.length === 0) {
      const sampleData = generateSampleAccommodations()
      setAccommodations(() => sampleData)
    }
  }, [])

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(() => filters)
    setLocalFilters(filters)
  }

  const propertyTypes = ['hotel', 'hostel', 'apartment', 'house', 'resort', 'cabin']
  const amenitiesList = ['WiFi', 'Piscina', 'Estacionamiento', 'Desayuno', 'Gimnasio', 'Spa', 'Bar', 'Restaurante']

  const filteredAccommodations = (accommodations || []).filter(acc => {
    if (localFilters.destination && !acc.city.toLowerCase().includes(localFilters.destination.toLowerCase()) && 
        !acc.department.toLowerCase().includes(localFilters.destination.toLowerCase())) {
      return false
    }
    
    if (acc.pricePerNight < priceRange[0] || acc.pricePerNight > priceRange[1]) {
      return false
    }
    
    if (selectedTypes.length > 0 && !selectedTypes.includes(acc.type)) {
      return false
    }
    
    if (minRating > 0 && acc.rating < minRating) {
      return false
    }
    
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every(amenity => 
        acc.amenities.some(accAmenity => accAmenity.toLowerCase().includes(amenity.toLowerCase()))
      )
      if (!hasAllAmenities) return false
    }
    
    return true
  }).sort((a, b) => {
    if (sortBy === 'price') return a.pricePerNight - b.pricePerNight
    if (sortBy === 'rating') return b.rating - a.rating
    return b.featured ? 1 : -1
  })

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 1000000])
    setSelectedTypes([])
    setSelectedAmenities([])
    setMinRating(0)
  }

  const activeFiltersCount = selectedTypes.length + selectedAmenities.length + (minRating > 0 ? 1 : 0)

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted/30">
      <div className="bg-background border-b py-6 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdvancedSearchBar onSearch={handleSearch} variant="compact" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {localFilters.destination ? `Alojamientos en ${localFilters.destination}` : 'Todos los alojamientos'}
            </h1>
            <p className="text-muted-foreground">
              {filteredAccommodations.length} propiedades encontradas
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Funnel size={20} />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-2">{activeFiltersCount}</Badge>
              )}
            </Button>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Más populares</SelectItem>
                <SelectItem value="price">Precio: menor a mayor</SelectItem>
                <SelectItem value="rating">Calificación más alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:col-span-1"
              >
                <Card className="p-6 sticky top-40">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Filtros</h2>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Limpiar todo
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Rango de precio por noche</h3>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={1000000}
                        step={50000}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>${priceRange[0].toLocaleString('es-CO')}</span>
                        <span>${priceRange[1].toLocaleString('es-CO')}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Tipo de propiedad</h3>
                      <div className="space-y-2">
                        {propertyTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={selectedTypes.includes(type)}
                              onCheckedChange={() => handleTypeToggle(type)}
                            />
                            <Label htmlFor={type} className="cursor-pointer capitalize">
                              {type === 'hotel' ? 'Hotel' :
                               type === 'hostel' ? 'Hostel' :
                               type === 'apartment' ? 'Apartamento' :
                               type === 'house' ? 'Casa' :
                               type === 'resort' ? 'Resort' :
                               'Cabaña'}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Calificación mínima</h3>
                      <div className="space-y-2">
                        {[9, 8, 7, 6].map(rating => (
                          <div
                            key={rating}
                            onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                              minRating === rating ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                            }`}
                          >
                            <Star size={16} weight="fill" />
                            <span>{rating}+ Excelente</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Servicios</h3>
                      <div className="space-y-2">
                        {amenitiesList.map(amenity => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={() => handleAmenityToggle(amenity)}
                            />
                            <Label htmlFor={amenity} className="cursor-pointer">
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {filteredAccommodations.length > 0 ? (
              <div className="grid gap-6">
                {filteredAccommodations.map(accommodation => (
                  <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                    onSelect={(id) => console.log('Selected:', id)}
                    featured={accommodation.featured}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <MapPin size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar tus filtros o buscar en otra ubicación
                </p>
                <Button onClick={clearFilters}>Limpiar filtros</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
