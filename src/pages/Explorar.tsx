import { SearchBar } from '@/components/SearchBar'
import { CategoryCard } from '@/components/CategoryCard'
import { CATEGORIES } from '@/lib/data'
import { PageRoute } from '@/lib/types'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useEffect } from 'react'

interface ExplorarProps {
  onNavigate: (page: PageRoute) => void
}

export function Explorar({ onNavigate }: ExplorarProps) {
  const { trackInteraction } = useUserPreferences()

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'explorar' })
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
    onNavigate('destino-resultados')
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Explora Destinos
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Descubre todas las categorías turísticas de Colombia. Desde aventura hasta gastronomía.
        </p>
        
        <div className="mb-12">
          <SearchBar onSearch={(q) => handleSearch(q)} />
        </div>
        
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
      </div>
    </div>
  )
}