export interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  precipitation: number
  season: 'verano' | 'invierno' | 'primavera' | 'otoño'
}

export interface SeasonalEvent {
  name: string
  date: string
  location: string
  category: string
  description: string
}

export interface WeatherRecommendation {
  destinationId: string
  score: number
  reasons: string[]
  weatherMatch: boolean
  seasonalEvents: SeasonalEvent[]
  bestActivities: string[]
}

const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    name: 'Carnaval de Barranquilla',
    date: '2025-02-28',
    location: 'Barranquilla',
    category: 'cultural',
    description: 'El segundo carnaval más grande del mundo con música, danzas y color'
  },
  {
    name: 'Feria de las Flores',
    date: '2025-08-05',
    location: 'Medellín',
    category: 'cultural',
    description: 'Celebración floral con desfiles de silleteros y eventos culturales'
  },
  {
    name: 'Festival de la Leyenda Vallenata',
    date: '2025-04-26',
    location: 'Valledupar',
    category: 'cultural',
    description: 'El festival de música vallenata más importante de Colombia'
  },
  {
    name: 'Carnaval de Negros y Blancos',
    date: '2025-01-04',
    location: 'Pasto',
    category: 'cultural',
    description: 'Patrimonio Cultural Inmaterial de la Humanidad por UNESCO'
  },
  {
    name: 'Festival del Cacao y Chocolate',
    date: '2025-03-15',
    location: 'Tumaco',
    category: 'gastronomia',
    description: 'Celebración del cacao fino de aroma colombiano'
  },
  {
    name: 'Festival de Cometas',
    date: '2025-08-15',
    location: 'Villa de Leyva',
    category: 'familiar',
    description: 'Cielos llenos de cometas en uno de los pueblos más bellos'
  },
  {
    name: 'Rock al Parque',
    date: '2025-07-01',
    location: 'Bogotá',
    category: 'cultural',
    description: 'Uno de los festivales de rock gratuitos más grandes de América'
  },
  {
    name: 'Festival Estéreo Picnic',
    date: '2025-03-28',
    location: 'Bogotá',
    category: 'cultural',
    description: 'El festival de música más importante de Colombia'
  }
]

const WEATHER_CATEGORY_MAP: Record<string, string[]> = {
  sunny: ['playa', 'aventura', 'naturaleza', 'rural'],
  rainy: ['bienestar', 'cultural', 'gastronomia', 'negocios'],
  cloudy: ['cultural', 'gastronomia', 'familiar', 'religioso'],
  hot: ['playa', 'naturaleza', 'aventura'],
  cold: ['bienestar', 'cultural', 'gastronomia'],
  mild: ['aventura', 'naturaleza', 'familiar', 'rural']
}

export function getCurrentSeason(): 'verano' | 'invierno' | 'primavera' | 'otoño' {
  const month = new Date().getMonth()
  
  if (month >= 2 && month <= 4) return 'primavera'
  if (month >= 5 && month <= 7) return 'verano'
  if (month >= 8 && month <= 10) return 'otoño'
  return 'invierno'
}

export function getWeatherCondition(temperature: number, humidity: number): string {
  if (temperature > 30) return 'hot'
  if (temperature < 15) return 'cold'
  if (humidity > 70) return 'rainy'
  if (humidity > 50) return 'cloudy'
  return 'sunny'
}

export function getUpcomingEvents(location?: string, category?: string): SeasonalEvent[] {
  const now = new Date()
  const threeMonthsLater = new Date()
  threeMonthsLater.setMonth(now.getMonth() + 3)

  return SEASONAL_EVENTS.filter(event => {
    const eventDate = new Date(event.date)
    const isUpcoming = eventDate >= now && eventDate <= threeMonthsLater
    const matchesLocation = !location || event.location.toLowerCase().includes(location.toLowerCase())
    const matchesCategory = !category || event.category === category
    
    return isUpcoming && matchesLocation && matchesCategory
  })
}

export function generateWeatherBasedRecommendations(
  destinations: any[],
  temperature: number = 24,
  humidity: number = 60,
  userCategory?: string
): WeatherRecommendation[] {
  const season = getCurrentSeason()
  const weatherCondition = getWeatherCondition(temperature, humidity)
  const recommendedCategories = WEATHER_CATEGORY_MAP[weatherCondition] || []

  return destinations.map(destination => {
    let score = 0
    const reasons: string[] = []
    const bestActivities: string[] = []

    const destCategory = destination.category || ''
    const destLocation = destination.destination || destination.ciudad || destination.name || ''

    if (recommendedCategories.includes(destCategory)) {
      score += 15
      reasons.push(`Ideal para el clima actual (${temperature}°C)`)
    }

    if (weatherCondition === 'sunny' && destCategory === 'playa') {
      score += 20
      reasons.push('Perfecto día soleado para la playa')
      bestActivities.push('Natación', 'Buceo', 'Deportes acuáticos')
    }

    if (weatherCondition === 'rainy' && ['bienestar', 'gastronomia'].includes(destCategory)) {
      score += 15
      reasons.push('Día ideal para actividades bajo techo')
      bestActivities.push('Spa', 'Restaurantes', 'Museos')
    }

    if (temperature > 28 && destCategory === 'naturaleza') {
      score += 10
      reasons.push('Disfruta la naturaleza en clima cálido')
      bestActivities.push('Senderismo', 'Avistamiento de aves', 'Ecoturismo')
    }

    if (temperature < 18 && destCategory === 'bienestar') {
      score += 10
      reasons.push('Clima fresco perfecto para relajarse')
      bestActivities.push('Aguas termales', 'Spa', 'Yoga')
    }

    const upcomingEvents = getUpcomingEvents(destLocation, destCategory)
    if (upcomingEvents.length > 0) {
      score += upcomingEvents.length * 12
      upcomingEvents.forEach(event => {
        reasons.push(`Evento próximo: ${event.name}`)
        bestActivities.push(`Asistir a ${event.name}`)
      })
    }

    if (season === 'verano' && ['playa', 'naturaleza'].includes(destCategory)) {
      score += 8
      reasons.push('Temporada alta para este destino')
    }

    if (season === 'invierno' && destCategory === 'familiar') {
      score += 8
      reasons.push('Perfecto para vacaciones familiares')
    }

    if (userCategory && userCategory === destCategory) {
      score += 10
      reasons.push('Coincide con tus preferencias')
    }

    return {
      destinationId: destination.id,
      score,
      reasons: reasons.length > 0 ? reasons : ['Destino recomendado'],
      weatherMatch: recommendedCategories.includes(destCategory),
      seasonalEvents: upcomingEvents,
      bestActivities: bestActivities.slice(0, 3)
    }
  })
    .sort((a, b) => b.score - a.score)
}

export async function fetchWeatherData(city: string = 'Bogotá'): Promise<WeatherData> {
  try {
    const mockWeatherData: Record<string, WeatherData> = {
      'bogotá': { temperature: 14, condition: 'cloudy', humidity: 75, precipitation: 40, season: getCurrentSeason() },
      'medellín': { temperature: 24, condition: 'sunny', humidity: 65, precipitation: 20, season: getCurrentSeason() },
      'cartagena': { temperature: 32, condition: 'sunny', humidity: 80, precipitation: 10, season: getCurrentSeason() },
      'pasto': { temperature: 12, condition: 'cloudy', humidity: 70, precipitation: 50, season: getCurrentSeason() },
      'cali': { temperature: 26, condition: 'sunny', humidity: 60, precipitation: 15, season: getCurrentSeason() },
      'barranquilla': { temperature: 30, condition: 'sunny', humidity: 75, precipitation: 5, season: getCurrentSeason() },
      'santa marta': { temperature: 31, condition: 'sunny', humidity: 78, precipitation: 8, season: getCurrentSeason() },
    }

    const cityLower = city.toLowerCase()
    return mockWeatherData[cityLower] || mockWeatherData['bogotá']
  } catch (error) {
    return {
      temperature: 20,
      condition: 'cloudy',
      humidity: 60,
      precipitation: 30,
      season: getCurrentSeason()
    }
  }
}
