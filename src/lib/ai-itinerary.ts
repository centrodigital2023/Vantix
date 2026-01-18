import { Service, ServiceType, TourRoute, DayItinerary } from './service-types'

const spark = typeof window !== 'undefined' && window.spark ? window.spark : {
  llmPrompt: (strings: any, ...values: any[]): string => {
    return strings.reduce((result: string, str: string, i: number) => result + str + (values[i] || ''), '')
  },
  llm: async () => {
    throw new Error('spark.llm not available')
  }
}

export interface ItineraryPreferences {
  destination: string
  destinations?: string[]
  startDate: string
  endDate: string
  duration: number
  budget: {
    min: number
    max: number
    currency: string
  }
  interests: string[]
  travelType: 'solo' | 'couple' | 'family' | 'friends' | 'business'
  travelers: {
    adults: number
    children?: number
    childAges?: number[]
  }
  pace: 'relaxed' | 'moderate' | 'fast'
  accommodationPreference?: 'budget' | 'mid-range' | 'luxury'
  transportPreference?: 'public' | 'rental' | 'private'
  fitnessLevel?: 'low' | 'medium' | 'high'
  dietaryRestrictions?: string[]
  accessibility?: string[]
}

export interface AIItinerary {
  id: string
  userId?: string
  name: string
  description: string
  destination: string
  destinations: string[]
  startDate: string
  endDate: string
  duration: number
  days: ItineraryDay[]
  services: {
    accommodations: string[]
    transports: string[]
    experiences: string[]
    restaurants: string[]
  }
  costs: {
    accommodation: number
    transport: number
    experiences: number
    food: number
    other: number
    total: number
    currency: string
  }
  map: {
    center: { lat: number; lon: number }
    zoom: number
    route: { lat: number; lon: number }[]
  }
  tips: string[]
  safetyWarnings: string[]
  weather: WeatherForecast[]
  alternatives: ItineraryAlternative[]
  generatedAt: string
  aiModel: string
  prompt: string
}

export interface ItineraryDay {
  day: number
  date: string
  title: string
  description: string
  location: {
    name: string
    lat: number
    lon: number
  }
  activities: Activity[]
  meals: Meal[]
  accommodation: AccommodationDetail
  transport?: TransportDetail
  costs: {
    activities: number
    meals: number
    accommodation: number
    transport: number
    total: number
  }
  weather?: {
    condition: string
    temperature: { min: number; max: number }
    precipitation: number
  }
  tips: string[]
}

export interface Activity {
  id: string
  time: string
  duration: number
  name: string
  description: string
  type: 'experience' | 'attraction' | 'hiking' | 'cultural' | 'relaxation'
  location: {
    name: string
    address: string
    lat: number
    lon: number
  }
  cost: number
  bookingUrl?: string
  serviceId?: string
  tips: string[]
  aiRecommendationReason: string
}

export interface Meal {
  id: string
  time: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  restaurant: {
    name: string
    cuisine: string
    priceRange: '$' | '$$' | '$$$' | '$$$$'
    address: string
    lat: number
    lon: number
    rating?: number
  }
  estimatedCost: number
  recommendations: string[]
}

export interface AccommodationDetail {
  name: string
  type: string
  address: string
  lat: number
  lon: number
  rating: number
  pricePerNight: number
  amenities: string[]
  bookingUrl?: string
  serviceId?: string
  checkIn: string
  checkOut: string
}

export interface TransportDetail {
  type: 'flight' | 'bus' | 'car' | 'train' | 'boat' | 'walking'
  from: string
  to: string
  duration: number
  distance: number
  cost: number
  details: string
  serviceId?: string
  bookingUrl?: string
}

export interface WeatherForecast {
  date: string
  condition: string
  temperature: { min: number; max: number }
  precipitation: number
  windSpeed: number
  humidity: number
  alerts?: string[]
}

export interface ItineraryAlternative {
  condition: string
  description: string
  changes: {
    day: number
    originalActivity: string
    alternativeActivity: string
    reason: string
  }[]
}

export interface ItineraryGenerationRequest {
  preferences: ItineraryPreferences
  useRealTimeData: boolean
  includeWeather: boolean
  includeAlternatives: boolean
  optimizeFor: 'cost' | 'time' | 'experience' | 'balanced'
}

export interface ItineraryGenerationResult {
  itinerary: AIItinerary
  confidence: number
  warnings: string[]
  suggestions: string[]
  alternatives: AIItinerary[]
}

export async function generateAIItinerary(
  request: ItineraryGenerationRequest
): Promise<ItineraryGenerationResult> {
  const { preferences, useRealTimeData, includeWeather, includeAlternatives, optimizeFor } = request

  // Construir prompt de forma más compacta para evitar error 400
  const destinationsText = preferences.destinations && preferences.destinations.length > 1 
    ? `Additional: ${preferences.destinations.join(', ')}` 
    : ''
  const childrenText = preferences.travelers.children 
    ? `, ${preferences.travelers.children} children` 
    : ''
  const dietaryText = preferences.dietaryRestrictions?.length 
    ? `Diet: ${preferences.dietaryRestrictions.join(', ')}` 
    : ''
  const accessibilityText = preferences.accessibility?.length 
    ? `Access: ${preferences.accessibility.join(', ')}` 
    : ''

  // @ts-expect-error - TypeScript incorrectly infers template literal type
  const prompt = spark.llmPrompt`Colombia ${preferences.duration}d itinerary.

Dest:${preferences.destination}|Budget:${preferences.budget.min}-${preferences.budget.max}|People:${preferences.travelers.adults}${childrenText}|Pace:${preferences.pace}|Type:${preferences.travelType}|Interests:${preferences.interests.slice(0,3).join(',')}

Return only JSON:
{"name":"Title","desc":"overview","days":[{"day":1,"title":"Title","desc":"Day plan","loc":"Place","lat":0.0,"lon":0.0,"acts":[{"time":"09:00","dur":120,"name":"Act","desc":"Details","cost":50000}],"meals":[{"time":"12:30","name":"Rest","cost":30000,"rec":["Dish"]}],"acc":{"name":"Hotel","price":150000,"rate":4.2},"trans":{"type":"bus","cost":25000}}],"total":1600000,"cur":"COP"}

Keep real Colombian places. Match interests. Stay within budget. NO EXTRA TEXT.`

  try {
    // Validar que spark.llm esté disponible
    if (!spark.llm || typeof spark.llm !== 'function') {
      throw new Error('Spark LLM API no está disponible. Verifica que la aplicación esté correctamente inicializada.')
    }

    // Validar preferencias
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      throw new Error('Faltan datos requeridos: destino, fecha de inicio y fecha de fin son obligatorios.')
    }

    // Validar duración del viaje (evitar prompts excesivamente largos)
    if (preferences.duration > 14) {
      throw new Error('La duración máxima del itinerario es de 14 días. Para viajes más largos, genera itinerarios separados.')
    }

    // Añadir timeout de 60 segundos para itinerarios (son más complejos)
    const response = await Promise.race([
      spark.llm(prompt, 'gpt-4o', true),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout: La generación del itinerario tardó más de 60 segundos. Intenta con un itinerario más corto.')), 60000)
      )
    ])
    
    const itineraryData = JSON.parse(response as string)

    // Validar estructura de la respuesta
    if (!itineraryData.name || !itineraryData.days || !Array.isArray(itineraryData.days)) {
      throw new Error('El formato de respuesta del LLM es inválido. Falta información requerida.')
    }

    // Mapear claves comprimidas a claves completas
    const normalizedDays = itineraryData.days.map((d: any) => ({
      day: d.day,
      date: d.date,
      title: d.title,
      description: d.desc || d.description,
      location: d.loc || d.location,
      latitude: d.lat,
      longitude: d.lon,
      activities: (d.acts || d.activities || []).map((a: any) => ({
        time: a.time,
        duration: a.dur || a.duration,
        name: a.name,
        description: a.desc || a.description,
        cost: a.cost
      })),
      meals: (d.meals || []).map((m: any) => ({
        time: m.time,
        name: m.name,
        cost: m.cost,
        recommendations: m.rec || m.recommendations
      })),
      accommodation: d.acc || d.accommodation,
      transport: d.trans || d.transport
    }))

    const itinerary: AIItinerary = {
      id: `itinerary_${Date.now()}`,
      userId: undefined,
      name: itineraryData.name,
      description: itineraryData.desc || itineraryData.description,
      destination: preferences.destination,
      destinations: preferences.destinations || [preferences.destination],
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      duration: preferences.duration,
      days: normalizedDays,
      services: {
        accommodations: normalizedDays.map((d: any) => d.accommodation?.name || 'No especificado').filter(Boolean),
        transports: normalizedDays.filter((d: any) => d.transport).map((d: any) => d.transport.type),
        experiences: normalizedDays.flatMap((d: any) => d.activities?.map((a: any) => a.name) || []),
        restaurants: normalizedDays.flatMap((d: any) => d.meals?.map((m: any) => m.name) || [])
      },
      costs: {
        accommodation: itineraryData.accommodation || 0,
        transport: itineraryData.transport || 0,
        experiences: itineraryData.experiences || 0,
        food: itineraryData.food || 0,
        other: 0,
        total: itineraryData.total || 0,
        currency: itineraryData.cur || preferences.budget.currency
      },
      map: itineraryData.map || {
        center: { lat: 4.7110, lon: -74.0721 },
        zoom: 10,
        route: []
      },
      tips: itineraryData.tips || [],
      safetyWarnings: itineraryData.safetyWarnings || [],
      weather: [],
      alternatives: [],
      generatedAt: new Date().toISOString(),
      aiModel: 'gpt-4o',
      prompt
    }

    if (includeWeather) {
      try {
        itinerary.weather = await fetchWeatherForecast(
          preferences.destination,
          preferences.startDate,
          preferences.duration
        )
      } catch (error) {
        console.warn('No se pudo obtener el pronóstico del tiempo:', error)
      }
    }

    if (includeAlternatives) {
      try {
        itinerary.alternatives = await generateAlternatives(itinerary, preferences)
      } catch (error) {
        console.warn('No se pudieron generar alternativas:', error)
      }
    }

    return {
      itinerary,
      confidence: 0.85,
      warnings: [],
      suggestions: [
        'Reserve alojamientos con anticipación para mejores precios',
        'Considera contratar un guía local para experiencias más auténticas',
        'Lleva efectivo para lugares remotos donde no aceptan tarjetas'
      ],
      alternatives: []
    }
  } catch (error) {
    console.error('Error generating itinerary:', error)
    
    // Proporcionar un mensaje de error más descriptivo
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    // Detectar errores específicos
    if (errorMessage.includes('400') || errorMessage.includes('Bad Request')) {
      throw new Error('Error 400: El prompt es demasiado largo o tiene formato inválido. Intenta reducir la duración del viaje (máximo 14 días) o simplificar las preferencias.')
    } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      throw new Error('Error de autenticación: La clave API no es válida o ha expirado.')
    } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
      throw new Error('Límite de solicitudes excedido: Has alcanzado el límite de la API. Intenta nuevamente en unos minutos.')
    } else if (errorMessage.includes('500') || errorMessage.includes('Internal Server')) {
      throw new Error('Error del servidor: El servicio está temporalmente no disponible. Intenta nuevamente más tarde.')
    } else if (errorMessage.includes('Timeout')) {
      throw new Error(errorMessage)
    } else if (errorMessage.includes('JSON')) {
      throw new Error('Error al procesar la respuesta: El formato recibido no es válido. Intenta nuevamente.')
    } else if (errorMessage.includes('duración máxima')) {
      throw new Error(errorMessage)
    }
    
    throw new Error(`No se pudo generar el itinerario: ${errorMessage}`)
  }
}

async function fetchWeatherForecast(
  destination: string,
  startDate: string,
  duration: number
): Promise<WeatherForecast[]> {
  return Array.from({ length: duration }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    return {
      date: date.toISOString().split('T')[0],
      condition: 'Parcialmente nublado',
      temperature: { min: 12, max: 22 },
      precipitation: 20,
      windSpeed: 15,
      humidity: 65,
      alerts: []
    }
  })
}

async function generateAlternatives(
  itinerary: AIItinerary,
  preferences: ItineraryPreferences
): Promise<ItineraryAlternative[]> {
  return [
    {
      condition: 'Lluvia intensa',
      description: 'Si hay lluvia fuerte, cambia actividades al aire libre por opciones cubiertas',
      changes: [
        {
          day: 1,
          originalActivity: 'Caminata por el volcán',
          alternativeActivity: 'Visita al museo de la ciudad',
          reason: 'Seguridad en condiciones climáticas adversas'
        }
      ]
    },
    {
      condition: 'Presupuesto ajustado',
      description: 'Opciones más económicas manteniendo la calidad de la experiencia',
      changes: [
        {
          day: 2,
          originalActivity: 'Tour privado',
          alternativeActivity: 'Tour grupal compartido',
          reason: 'Reduce costos hasta un 40% sin perder la experiencia'
        }
      ]
    }
  ]
}

export async function optimizeItinerary(
  itinerary: AIItinerary,
  optimizationGoal: 'cost' | 'time' | 'experience'
): Promise<AIItinerary> {
  // @ts-expect-error - TypeScript incorrectly infers template literal type
  const goalText = optimizationGoal === 'cost' ? 'reduce costs' : optimizationGoal === 'time' ? 'minimize travel time' : 'maximize experiences'
  const prompt = spark.llmPrompt`Optimize for ${goalText}: ${itinerary.name}|Days:${itinerary.days.length}|Budget:${itinerary.costs?.total}. Return optimized JSON maintaining structure.`

  try {
    if (!spark.llm || typeof spark.llm !== 'function') {
      throw new Error('Spark LLM API no está disponible')
    }

    const response = await Promise.race([
      spark.llm(prompt, 'gpt-4o', true),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout al optimizar itinerario')), 45000)
      )
    ])
    
    const optimizedData = JSON.parse(response as string)

    return {
      ...itinerary,
      ...optimizedData,
      id: `itinerary_${Date.now()}`,
      generatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error optimizing itinerary:', error)
    throw new Error('No se pudo optimizar el itinerario. Usando versión original.')
  }
}

export async function addDayToItinerary(
  itinerary: AIItinerary,
  position: 'before' | 'after',
  dayNumber: number
): Promise<AIItinerary> {
  const newDay = itinerary.duration + 1
  const newDays = [...itinerary.days]

  const insertIndex = position === 'before' ? dayNumber - 1 : dayNumber

  newDays.splice(insertIndex, 0, {
    day: dayNumber,
    date: new Date(itinerary.startDate).toISOString().split('T')[0],
    title: `Día ${dayNumber}`,
    description: 'Día adicional',
    location: { name: itinerary.destination, lat: 0, lon: 0 },
    activities: [],
    meals: [],
    accommodation: {} as AccommodationDetail,
    costs: { activities: 0, meals: 0, accommodation: 0, transport: 0, total: 0 },
    tips: []
  })

  newDays.forEach((day, index) => {
    day.day = index + 1
  })

  return {
    ...itinerary,
    duration: newDay,
    days: newDays
  }
}

export async function suggestAlternativeActivity(
  activity: Activity,
  reason: string
): Promise<Activity[]> {
  // @ts-expect-error - TypeScript incorrectly infers template literal type
  const prompt = spark.llmPrompt`Suggest 3 alternatives for: ${activity.name}|Desc:${activity.description.substring(0,50)}|Type:${activity.type}|Cost:${activity.cost}. Reason:${reason}. Return JSON array only.`

  try {
    if (!spark.llm || typeof spark.llm !== 'function') {
      throw new Error('Spark LLM API no está disponible')
    }

    const response = await Promise.race([
      spark.llm(prompt, 'gpt-4o', true),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout al sugerir alternativas')), 30000)
      )
    ])
    
    const alternatives = JSON.parse(response as string)
    
    if (!Array.isArray(alternatives)) {
      throw new Error('Formato de respuesta inválido')
    }
    
    return alternatives
  } catch (error) {
    console.error('Error suggesting alternatives:', error)
    return []
  }
}
