import { Service, ServiceType, TourRoute, DayItinerary } from './service-types'

const spark = typeof window !== 'undefined' && window.spark ? window.spark : {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]): string => {
    return String.raw({ raw: strings }, ...values)
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

  const prompt = spark.llmPrompt`
You are an expert travel planner for Colombia and Latin America specializing in creating personalized itineraries.

Create a detailed ${preferences.duration}-day itinerary based on these preferences:
**Destination**: ${preferences.destination}
${preferences.destinations && preferences.destinations.length > 1 ? `**Additional destinations**: ${preferences.destinations.join(', ')}` : ''}
**Travel dates**: ${preferences.startDate} to ${preferences.endDate}
**Budget**: ${preferences.budget.min} - ${preferences.budget.max} ${preferences.budget.currency}
**Interests**: ${preferences.interests.join(', ')}
**Travel type**: ${preferences.travelType}
**Travelers**: ${preferences.travelers.adults} adults${preferences.travelers.children ? `, ${preferences.travelers.children} children (ages: ${preferences.travelers.childAges?.join(', ')})` : ''}
**Pace**: ${preferences.pace}
**Accommodation preference**: ${preferences.accommodationPreference || 'any'}
**Transport preference**: ${preferences.transportPreference || 'any'}
${preferences.fitnessLevel ? `**Fitness level**: ${preferences.fitnessLevel}` : ''}
${preferences.dietaryRestrictions ? `**Dietary restrictions**: ${preferences.dietaryRestrictions.join(', ')}` : ''}
${preferences.accessibility ? `**Accessibility needs**: ${preferences.accessibility.join(', ')}` : ''}

**Optimization**: ${optimizeFor}

Generate a comprehensive itinerary in JSON format with this structure:
{
  "name": "Catchy itinerary title",
  "description": "Brief overview of the trip",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Day title",
      "description": "What makes this day special",
      "location": {"name": "City/Area", "lat": 0.0, "lon": 0.0},
      "activities": [
        {
          "time": "09:00",
          "duration": 120,
          "name": "Activity name",
          "description": "What you'll do and why it's great",
          "type": "experience",
          "location": {"name": "Place", "address": "Full address", "lat": 0.0, "lon": 0.0},
          "cost": 50000,
          "tips": ["Practical tip 1", "Practical tip 2"],
          "aiRecommendationReason": "Why this fits their preferences"
        }
      ],
      "meals": [
        {
          "time": "12:30",
          "type": "lunch",
          "restaurant": {
            "name": "Restaurant name",
            "cuisine": "Type of cuisine",
            "priceRange": "$$",
            "address": "Full address",
            "lat": 0.0,
            "lon": 0.0,
            "rating": 4.5
          },
          "estimatedCost": 30000,
          "recommendations": ["Dish 1", "Dish 2"]
        }
      ],
      "accommodation": {
        "name": "Hotel/Accommodation name",
        "type": "hotel/hostel/house",
        "address": "Full address",
        "lat": 0.0,
        "lon": 0.0,
        "rating": 4.2,
        "pricePerNight": 150000,
        "amenities": ["WiFi", "Breakfast", "Pool"],
        "checkIn": "15:00",
        "checkOut": "11:00"
      },
      "transport": {
        "type": "bus",
        "from": "Starting point",
        "to": "Destination",
        "duration": 180,
        "distance": 120,
        "cost": 25000,
        "details": "Specific transport info"
      },
      "costs": {
        "activities": 100000,
        "meals": 80000,
        "accommodation": 150000,
        "transport": 25000,
        "total": 355000
      },
      "tips": ["Day-specific tip 1", "Day-specific tip 2"]
    }
  ],
  "costs": {
    "accommodation": 600000,
    "transport": 150000,
    "experiences": 400000,
    "food": 350000,
    "other": 100000,
    "total": 1600000,
    "currency": "COP"
  },
  "map": {
    "center": {"lat": 4.7110, "lon": -74.0721},
    "zoom": 10,
    "route": [{"lat": 0.0, "lon": 0.0}]
  },
  "tips": [
    "General tip 1 about the region",
    "Cultural insight or etiquette tip",
    "Money/safety tip",
    "Best time for activities"
  ],
  "safetyWarnings": [
    "Important safety information if applicable"
  ]
}

IMPORTANT GUIDELINES:
1. Use real places, restaurants, and attractions in Colombia
2. Provide accurate coordinates (lat/lon) for all locations
3. Base prices on realistic Colombian market rates in COP
4. Consider travel times between locations
5. Balance activities with rest time based on pace preference
6. Include local cultural experiences, not just tourist traps
7. Recommend authentic local restaurants
8. Consider the travel type (family-friendly if children, romantic if couple, etc.)
9. Respect budget constraints but show value
10. Include practical tips about weather, clothing, local customs
11. For Nariño/Pasto region, highlight: Laguna de la Cocha, Santuario de Las Lajas, Galeras Volcano viewpoints, local cuisine (cuy, traditional sweets)
12. For coffee region: Coffee farm tours, Cocora Valley, Salento, thermal springs
13. For Caribbean: Cartagena old city, Rosario Islands, beach activities, street food
14. Suggest activities that match stated interests
15. ${includeWeather ? 'Consider weather conditions and suggest indoor alternatives for rainy days' : ''}
Return ONLY the JSON object, no additional text.
`

  try {
    // Validar que spark.llm esté disponible
    if (!spark.llm || typeof spark.llm !== 'function') {
      throw new Error('Spark LLM API no está disponible. Verifica que la aplicación esté correctamente inicializada.')
    }

    // Validar preferencias
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      throw new Error('Faltan datos requeridos: destino, fecha de inicio y fecha de fin son obligatorios.')
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

    const itinerary: AIItinerary = {
      id: `itinerary_${Date.now()}`,
      userId: undefined,
      name: itineraryData.name,
      description: itineraryData.description,
      destination: preferences.destination,
      destinations: preferences.destinations || [preferences.destination],
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      duration: preferences.duration,
      days: itineraryData.days,
      services: {
        accommodations: itineraryData.days.map((d: any) => d.accommodation?.name || 'No especificado').filter(Boolean),
        transports: itineraryData.days.filter((d: any) => d.transport).map((d: any) => d.transport.type),
        experiences: itineraryData.days.flatMap((d: any) => d.activities?.map((a: any) => a.name) || []),
        restaurants: itineraryData.days.flatMap((d: any) => d.meals?.map((m: any) => m.restaurant?.name) || [])
      },
      costs: itineraryData.costs || {
        accommodation: 0,
        transport: 0,
        experiences: 0,
        food: 0,
        other: 0,
        total: 0,
        currency: preferences.budget.currency
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
    
    if (errorMessage.includes('400')) {
      throw new Error('Error en la solicitud (400): Verifica que todos los parámetros sean válidos y que el prompt no sea demasiado largo.')
    } else if (errorMessage.includes('Timeout')) {
      throw new Error(errorMessage)
    } else if (errorMessage.includes('JSON')) {
      throw new Error('Error al procesar la respuesta: El formato recibido no es válido. Intenta nuevamente.')
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
  const prompt = spark.llmPrompt`
Optimize this itinerary to ${optimizationGoal === 'cost' ? 'reduce costs' : optimizationGoal === 'time' ? 'minimize travel time' : 'maximize experiences'}.

Current itinerary:
${JSON.stringify(itinerary, null, 2)}

Return the optimized version maintaining the JSON structure.
`

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
  const prompt = spark.llmPrompt`
Suggest 3 alternative activities similar to this one:

Activity: ${activity.name}
Description: ${activity.description}
Type: ${activity.type}
Location: ${activity.location.name}
Cost: ${activity.cost}

Reason for alternatives: ${reason}

Return a JSON array of 3 alternative activities with the same structure.
`

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
