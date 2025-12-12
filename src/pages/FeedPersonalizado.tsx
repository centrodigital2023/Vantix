import { useEffect, useState } from 'react'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useKV } from '@github/spark/hooks'
import { AccommodationCard } from '@/components/AccommodationCard'
import { CategoryCard } from '@/components/CategoryCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkle, TrendUp, Clock, Heart, ChartBar, Trash } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface FeedPersonalizadoProps {
  onNavigate: (page: PageRoute, id?: string) => void
}

const categories = [
  { id: 'aventura', name: 'Aventura', icon: '🏔️', route: 'categoria-aventura' as PageRoute },
  { id: 'naturaleza', name: 'Naturaleza', icon: '🌿', route: 'categoria-naturaleza' as PageRoute },
  { id: 'cultural', name: 'Cultural', icon: '🏛️', route: 'categoria-cultural' as PageRoute },
  { id: 'playa', name: 'Playa', icon: '🏖️', route: 'categoria-playa' as PageRoute },
  { id: 'gastronomia', name: 'Gastronomía', icon: '🍽️', route: 'categoria-gastronomia' as PageRoute },
  { id: 'bienestar', name: 'Bienestar', icon: '🧘', route: 'categoria-bienestar' as PageRoute },
  { id: 'familiar', name: 'Familiar', icon: '👨‍👩‍👧‍👦', route: 'categoria-familiar' as PageRoute },
  { id: 'rural', name: 'Rural', icon: '🌾', route: 'categoria-rural' as PageRoute },
  { id: 'negocios', name: 'Negocios', icon: '💼', route: 'categoria-negocios' as PageRoute },
  { id: 'religioso', name: 'Religioso', icon: '⛪', route: 'categoria-religioso' as PageRoute },
]

export function FeedPersonalizado({ onNavigate }: FeedPersonalizadoProps) {
  const { trackInteraction, preferences, getRecommendations, clearHistory, interactionCount } = useUserPreferences()
  const [accommodations] = useKV<any[]>('accommodations-data', [])
  const [recommendedAccommodations, setRecommendedAccommodations] = useState<any[]>([])
  const [recommendedCategories, setRecommendedCategories] = useState<typeof categories>([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'feed-personalizado' })
  }, [])

  useEffect(() => {
    if (accommodations && accommodations.length > 0) {
      const recommended = getRecommendations(accommodations, 12)
      setRecommendedAccommodations(recommended)
    }

    const categoriesWithScores = categories.map(cat => ({
      ...cat,
      score: preferences.categories[cat.id] || 0
    }))
    const sortedCategories = categoriesWithScores
      .sort((a, b) => b.score - a.score)
    setRecommendedCategories(sortedCategories)
  }, [accommodations, preferences, getRecommendations])

  const handleCategoryClick = (categoryId: string, route: PageRoute) => {
    trackInteraction({ type: 'click', category: categoryId })
    onNavigate(route)
  }

  const handleAccommodationClick = (accommodationId: string) => {
    trackInteraction({ type: 'click', accommodationId })
    onNavigate('detalle-alojamiento', accommodationId)
  }

  const handleClearHistory = () => {
    clearHistory()
    setShowClearConfirm(false)
  }

  const topCategories = preferences.favoriteCategories.slice(0, 3)
  const hasInteractions = interactionCount > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise/5 via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkle size={32} weight="duotone" className="text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                Tu Feed Personalizado
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Recomendaciones basadas en tus intereses y búsquedas
            </p>
          </div>

          {hasInteractions && (
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <ChartBar size={16} className="mr-1" />
                {interactionCount} interacciones
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash size={16} className="mr-2" />
                Limpiar historial
              </Button>
            </div>
          )}
        </div>

        {showClearConfirm && (
          <Card className="mb-6 p-4 border-destructive/50 bg-destructive/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-destructive">¿Limpiar tu historial?</h3>
                <p className="text-sm text-muted-foreground">
                  Esto eliminará todas tus preferencias y comenzarás desde cero
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearConfirm(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearHistory}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {!hasInteractions && (
          <Card className="mb-8 p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <Sparkle size={48} weight="duotone" className="mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-2">¡Bienvenido a tu feed personalizado!</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              A medida que explores destinos, busques alojamientos y navegues por las categorías,
              crearemos un feed único con recomendaciones perfectas para ti.
            </p>
            <Button onClick={() => onNavigate('explorar')} size="lg">
              Comenzar a explorar
            </Button>
          </Card>
        )}

        {hasInteractions && topCategories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={24} weight="duotone" className="text-accent" />
              <h2 className="text-2xl font-semibold">Tus intereses favoritos</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {topCategories.map(catId => {
                const category = categories.find(c => c.id === catId)
                if (!category) return null
                return (
                  <Badge
                    key={catId}
                    variant="secondary"
                    className="text-base px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCategoryClick(category.id, category.route)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        <Tabs defaultValue="alojamientos" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="alojamientos" className="gap-2">
              <TrendUp size={18} />
              Alojamientos
            </TabsTrigger>
            <TabsTrigger value="categorias" className="gap-2">
              <Clock size={18} />
              Categorías
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alojamientos" className="mt-0">
            {recommendedAccommodations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedAccommodations.map((accommodation) => (
                  <div key={accommodation.id} className="relative">
                    <AccommodationCard
                      {...accommodation}
                      onClick={() => handleAccommodationClick(accommodation.id)}
                    />
                    {accommodation.recommendationReasons && accommodation.recommendationReasons.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {accommodation.recommendationReasons.slice(0, 2).map((reason: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs text-primary border-primary/30"
                          >
                            <Sparkle size={12} className="mr-1" />
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <TrendUp size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No hay recomendaciones aún</h3>
                <p className="text-muted-foreground mb-4">
                  Explora alojamientos para recibir recomendaciones personalizadas
                </p>
                <Button onClick={() => onNavigate('explorar')}>
                  Ver alojamientos
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categorias" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedCategories.map((category, idx) => (
                <div key={category.id} className="relative">
                  <Card
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary p-6"
                    onClick={() => handleCategoryClick(category.id, category.route)}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{category.icon}</div>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                  </Card>
                  {preferences.categories[category.id] > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute top-3 right-3 text-xs"
                    >
                      {preferences.categories[category.id]} pts
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {hasInteractions && preferences.searchHistory.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={24} weight="duotone" className="text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Búsquedas recientes</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.searchHistory.slice(0, 10).map((query, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-sm px-3 py-1 cursor-pointer hover:bg-muted transition-colors"
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
