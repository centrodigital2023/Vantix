import { useState, useEffect } from 'react'
import { useSupabaseData } from '@/hooks/use-supabase-data'
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Star, MagnifyingGlass, Faders } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

type Accommodation = {
  id: string
  name: string
  description: string
  category: string
  city: string
  department: string
  images: string[]
  rating: number
  reviews_count: number
  base_price: number
  currency: string
  status: string
  amenities: string[]
}

interface SmartAccommodationsListProps {
  onSelectAccommodation?: (id: string) => void
  filterByUser?: boolean
  showFilters?: boolean
}

export function SmartAccommodationsList({ 
  onSelectAccommodation, 
  filterByUser = false,
  showFilters = true 
}: SmartAccommodationsListProps) {
  const { user } = useSupabaseAuthContext()
  const { fetchAll, fetchWithFilter, loading, error } = useSupabaseData('accommodations')
  
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating')

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'aventura', label: 'Aventura' },
    { value: 'bienestar', label: 'Bienestar' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'familiar', label: 'Familiar' },
    { value: 'gastronomia', label: 'Gastronomía' },
    { value: 'naturaleza', label: 'Naturaleza' },
    { value: 'negocios', label: 'Negocios' },
    { value: 'playa', label: 'Playa' },
    { value: 'religioso', label: 'Religioso' },
    { value: 'rural', label: 'Rural' },
  ]

  useEffect(() => {
    loadAccommodations()
  }, [])

  const loadAccommodations = async () => {
    let data: Accommodation[] | null = null

    if (filterByUser && user) {
      data = await fetchWithFilter({ owner_id: user.id, status: 'active' })
    } else {
      data = await fetchAll()
    }

    if (data) {
      setAccommodations(data.filter((acc: any) => acc.status === 'active'))
    }
  }

  const filteredAndSortedAccommodations = accommodations
    .filter((acc) => {
      const matchesSearch =
        searchTerm === '' ||
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || acc.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      } else {
        return a.base_price - b.base_price
      }
    })

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadAccommodations} className="mt-4">
          Reintentar
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-4 md:p-6 shadow-sm border"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Buscar por nombre, ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: 'rating' | 'price') => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Faders size={16} className="mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Mejor valorados</SelectItem>
                <SelectItem value="price">Precio más bajo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-lg" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredAndSortedAccommodations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchTerm || selectedCategory !== 'all'
              ? 'No se encontraron alojamientos con los filtros aplicados'
              : 'No hay alojamientos disponibles'}
          </p>
          {showFilters && (searchTerm || selectedCategory !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedAccommodations.map((accommodation, index) => (
            <motion.div
              key={accommodation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={accommodation.images[0] || '/placeholder-accommodation.jpg'}
                      alt={accommodation.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur">
                      {accommodation.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-4 space-y-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {accommodation.name}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} weight="fill" />
                    <span className="line-clamp-1">
                      {accommodation.city}, {accommodation.department}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={16} weight="fill" className="text-yellow-500" />
                      <span className="font-semibold">{accommodation.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({accommodation.reviews_count} reseñas)
                    </span>
                  </div>

                  <CardDescription className="line-clamp-2">
                    {accommodation.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {accommodation.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {accommodation.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{accommodation.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      ${accommodation.base_price.toLocaleString('es-CO')}
                    </p>
                    <p className="text-xs text-muted-foreground">por noche</p>
                  </div>
                  <Button
                    onClick={() => onSelectAccommodation?.(accommodation.id)}
                    size="sm"
                  >
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filteredAndSortedAccommodations.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Mostrando {filteredAndSortedAccommodations.length} de {accommodations.length} alojamientos
        </div>
      )}
    </div>
  )
}
