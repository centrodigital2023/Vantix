import { CategoryTemplate } from '@/components/CategoryTemplate'
import { DestinationCard } from '@/components/DestinationCard'
import { CATEGORIES } from '@/lib/data'
import { useCategoryData } from '@/hooks/use-category-data'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowClockwise } from '@phosphor-icons/react'

const category = CATEGORIES.find(c => c.slug === 'bienestar')!

export function Bienestar() {
  const { data, loading, error } = useCategoryData('Bienestar')

  return (
    <CategoryTemplate category={category}>
      {loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Error cargando datos: {error}</p>
          <Button onClick={() => window.location.reload()}>
            <ArrowClockwise className="mr-2" />
            Reintentar
          </Button>
        </div>
      )}

      {data && data.destinations.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              Experiencias de {category.name}
            </h2>
            <p className="text-muted-foreground">
              {data.destinations.length} destinos disponibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.destinations.map((dest, index) => (
              <DestinationCard 
                key={dest.id} 
                destination={dest}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      )}

      {data && data.destinations.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay destinos disponibles en este momento.
          </p>
        </div>
      )}
    </CategoryTemplate>
  )
}
