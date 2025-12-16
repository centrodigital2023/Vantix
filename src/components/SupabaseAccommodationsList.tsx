import { useState } from 'react'
import { useSupabaseQuery, useSupabaseMutation } from '@/hooks/use-supabase-query'
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Star, Trash, PencilSimple } from '@phosphor-icons/react'
import { Database } from '@/lib/supabase'

type Accommodation = Database['public']['Tables']['accommodations']['Row']

export function SupabaseAccommodationsList() {
  const { user, isAuthenticated } = useSupabaseAuthContext()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: accommodations, loading, error, refetch } = useSupabaseQuery('accommodations', {
    filter: selectedCategory ? { category: selectedCategory } : { status: 'active' },
    order: { column: 'rating', ascending: false },
    limit: 20,
  })

  const { remove, loading: deleteLoading } = useSupabaseMutation('accommodations')

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este alojamiento?')) return
    
    const result = await remove(id)
    
    if (!result.error) {
      refetch()
    }
  }

  const categories = [
    'aventura',
    'bienestar',
    'cultural',
    'familiar',
    'gastronomia',
    'naturaleza',
    'negocios',
    'playa',
    'religioso',
    'rural',
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error al cargar alojamientos</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={refetch}>Reintentar</Button>
        </CardFooter>
      </Card>
    )
  }

  const accommodationsList = Array.isArray(accommodations) ? accommodations : []

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          size="sm"
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            size="sm"
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {accommodationsList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              No hay alojamientos disponibles en esta categoría
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationsList.map((accommodation) => (
            <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-1">{accommodation.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2">
                      <MapPin size={14} weight="duotone" />
                      {accommodation.city}, {accommodation.department}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {accommodation.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {accommodation.images && accommodation.images.length > 0 ? (
                  <img
                    src={accommodation.images[0]}
                    alt={accommodation.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                    <MapPin size={48} className="text-muted-foreground" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={18} weight="fill" className="text-yellow-500" />
                    <span className="font-semibold">{accommodation.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">
                      ({accommodation.reviews_count})
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Desde</div>
                    <div className="font-bold text-lg">
                      ${accommodation.base_price.toLocaleString('es-CO')}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {accommodation.currency}
                      </span>
                    </div>
                  </div>
                </div>

                {accommodation.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {accommodation.description}
                  </p>
                )}

                {accommodation.amenities && accommodation.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {accommodation.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {accommodation.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{accommodation.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>

              {isAuthenticated && user?.id === accommodation.owner_id && (
                <CardFooter className="flex gap-2 border-t pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <PencilSimple size={16} className="mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(accommodation.id)}
                    disabled={deleteLoading}
                  >
                    <Trash size={16} />
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
