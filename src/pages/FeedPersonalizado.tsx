import { useEffect, useState } from 'react'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useNotifications, createWeatherNotification, createEventNotification, createCollaborativeNotification } from '@/hooks/use-notifications'
import { useKV } from '@github/spark/hooks'
import { AccommodationCard } from '@/components/AccommodationCard'
import { CategoryCard } from '@/components/CategoryCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkle, TrendUp, Clock, Heart, ChartBar, Trash, CloudSun, Calendar, Users, Bell } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { generateWeatherBasedRecommendations, fetchWeatherData, getUpcomingEvents } from '@/lib/weather-recommendations'
import { findSimilarUsers, generateCollaborativeRecommendations, getMockSimilarUsers, UserProfile } from '@/lib/collaborative-filtering'
import { motion } from 'framer-motion'

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
  const { addNotification } = useNotifications()
  const [accommodations] = useKV<any[]>('accommodations-data', [])
  const [mockUsers] = useKV<UserProfile[]>('mock-similar-users', getMockSimilarUsers())
  
  const [recommendedAccommodations, setRecommendedAccommodations] = useState<any[]>([])
  const [weatherRecommendations, setWeatherRecommendations] = useState<any[]>([])
  const [collaborativeRecommendations, setCollaborativeRecommendations] = useState<any[]>([])
  const [recommendedCategories, setRecommendedCategories] = useState<typeof categories>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [weatherData, setWeatherData] = useState<any>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [isLoadingCollaborative, setIsLoadingCollaborative] = useState(true)

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'feed-personalizado' })
  }, [])

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoadingWeather(true)
      const weather = await fetchWeatherData('Bogotá')
      setWeatherData(weather)
      
      if (accommodations && accommodations.length > 0) {
        const topCategory = preferences.favoriteCategories[0]
        const weatherRecs = generateWeatherBasedRecommendations(
          accommodations,
          weather.temperature,
          weather.humidity,
          topCategory
        )
        
        const topWeatherRecs = weatherRecs.slice(0, 8).map(rec => {
          const acc = accommodations.find(a => a.id === rec.destinationId)
          return acc ? { 
            ...acc, 
            weatherScore: rec.score,
            weatherReasons: rec.reasons,
            seasonalEvents: rec.seasonalEvents,
            bestActivities: rec.bestActivities
          } : null
        }).filter(Boolean)
        
        setWeatherRecommendations(topWeatherRecs)

        if (topWeatherRecs.length > 0 && topWeatherRecs[0].weatherScore > 20) {
          const topRec = topWeatherRecs[0]
          addNotification(createWeatherNotification(
            topRec.category || 'viajes',
            topRec.destination || topRec.ciudad,
            weather.condition,
            weather.temperature
          ))
        }
      }
      
      const favoriteCategory = preferences.favoriteCategories[0]
      const events = getUpcomingEvents(undefined, favoriteCategory)
      setUpcomingEvents(events)
      
      if (events.length > 0) {
        addNotification(createEventNotification(
          events[0].name,
          events[0].location,
          new Date(events[0].date).toLocaleDateString('es-CO', { month: 'long', day: 'numeric' }),
          events[0].category
        ))
      }
      
      setIsLoadingWeather(false)
    }
    
    loadWeatherData()
  }, [accommodations, preferences])

  useEffect(() => {
    const loadCollaborativeData = async () => {
      setIsLoadingCollaborative(true)
      
      if (mockUsers && mockUsers.length > 0 && accommodations && accommodations.length > 0) {
        const similarUsers = findSimilarUsers(preferences, mockUsers, 0.2)
        
        if (similarUsers.length > 0) {
          const collabRecs = generateCollaborativeRecommendations(
            preferences,
            similarUsers.slice(0, 10),
            mockUsers,
            accommodations,
            8
          )
          
          const collabAccommodations = collabRecs.map(rec => {
            const acc = accommodations.find(a => a.id === rec.itemId)
            return acc ? {
              ...acc,
              collaborativeScore: rec.score,
              collaborativeReasons: rec.reasons,
              similarUsers: rec.similarUsers,
              confidence: rec.confidence
            } : null
          }).filter(Boolean)
          
          setCollaborativeRecommendations(collabAccommodations)

          if (collabAccommodations.length > 0) {
            const topCollab = collabAccommodations[0]
            addNotification(createCollaborativeNotification(
              topCollab.name,
              topCollab.category || 'viajes',
              topCollab.similarUsers,
              topCollab.id
            ))
          }
        }
      }
      
      setIsLoadingCollaborative(false)
    }
    
    loadCollaborativeData()
  }, [mockUsers, accommodations, preferences])

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

        {weatherData && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <CloudSun size={48} weight="duotone" className="text-secondary" />
                <div>
                  <h3 className="text-xl font-semibold">Clima actual en Bogotá</h3>
                  <p className="text-muted-foreground">
                    {weatherData.temperature}°C · {weatherData.condition === 'sunny' ? '☀️ Soleado' : 
                     weatherData.condition === 'cloudy' ? '☁️ Nublado' : 
                     weatherData.condition === 'rainy' ? '🌧️ Lluvioso' : '🌤️ Variado'}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Temporada: {weatherData.season}
              </Badge>
            </div>
          </Card>
        )}

        {upcomingEvents.length > 0 && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-turquoise/10 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={28} weight="duotone" className="text-primary" />
              <h3 className="text-xl font-semibold">Eventos próximos en tus categorías favoritas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.slice(0, 2).map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-card rounded-lg border"
                >
                  <h4 className="font-semibold text-lg mb-1">{event.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
                  <p className="text-sm">{event.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {new Date(event.date).toLocaleDateString('es-CO', { month: 'long', day: 'numeric' })}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        <Tabs defaultValue="personalizadas" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-8">
            <TabsTrigger value="personalizadas" className="gap-2">
              <TrendUp size={18} />
              Para ti
            </TabsTrigger>
            <TabsTrigger value="clima" className="gap-2">
              <CloudSun size={18} />
              Por clima
            </TabsTrigger>
            <TabsTrigger value="colaborativo" className="gap-2">
              <Users size={18} />
              Similares
            </TabsTrigger>
            <TabsTrigger value="categorias" className="gap-2">
              <Clock size={18} />
              Categorías
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personalizadas" className="mt-0">
            {recommendedAccommodations.length > 0 ? (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <Sparkle size={24} weight="duotone" className="text-primary" />
                  <h3 className="text-xl font-semibold">Recomendaciones basadas en tus preferencias</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedAccommodations.map((accommodation, idx) => (
                    <motion.div
                      key={accommodation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative"
                    >
                      <AccommodationCard
                        accommodation={accommodation}
                        onSelect={() => handleAccommodationClick(accommodation.id)}
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
                    </motion.div>
                  ))}
                </div>
              </>
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

          <TabsContent value="clima" className="mt-0">
            {isLoadingWeather ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin text-4xl">☀️</div>
              </div>
            ) : weatherRecommendations.length > 0 ? (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <CloudSun size={24} weight="duotone" className="text-secondary" />
                  <h3 className="text-xl font-semibold">Ideales para el clima actual</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {weatherRecommendations.map((accommodation, idx) => (
                    <motion.div
                      key={accommodation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative"
                    >
                      <AccommodationCard
                        accommodation={accommodation}
                        onSelect={() => handleAccommodationClick(accommodation.id)}
                      />
                      {accommodation.weatherReasons && accommodation.weatherReasons.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {accommodation.weatherReasons.slice(0, 2).map((reason: string, idx: number) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs text-secondary border-secondary/30 mr-1"
                            >
                              <CloudSun size={12} className="mr-1" />
                              {reason}
                            </Badge>
                          ))}
                          {accommodation.bestActivities && accommodation.bestActivities.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              ✨ {accommodation.bestActivities.join(', ')}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <CloudSun size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Cargando recomendaciones climáticas</h3>
                <p className="text-muted-foreground">
                  Analizando el clima para ofrecerte los mejores destinos
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="colaborativo" className="mt-0">
            {isLoadingCollaborative ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-pulse text-4xl">👥</div>
              </div>
            ) : collaborativeRecommendations.length > 0 ? (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <Users size={24} weight="duotone" className="text-primary" />
                  <h3 className="text-xl font-semibold">Usuarios con gustos similares recomiendan</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborativeRecommendations.map((accommodation, idx) => (
                    <motion.div
                      key={accommodation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative"
                    >
                      <AccommodationCard
                        accommodation={accommodation}
                        onSelect={() => handleAccommodationClick(accommodation.id)}
                      />
                      {accommodation.collaborativeReasons && accommodation.collaborativeReasons.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {accommodation.collaborativeReasons.slice(0, 2).map((reason: string, idx: number) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs text-primary border-primary/30 mr-1"
                            >
                              <Users size={12} className="mr-1" />
                              {reason}
                            </Badge>
                          ))}
                          {accommodation.similarUsers > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {Math.round(accommodation.confidence * 100)}% confianza
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <Users size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Analizando preferencias similares</h3>
                <p className="text-muted-foreground mb-4">
                  Necesitamos más interacciones para encontrar usuarios con gustos similares
                </p>
                <Button onClick={() => onNavigate('explorar')}>
                  Explorar más alojamientos
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
