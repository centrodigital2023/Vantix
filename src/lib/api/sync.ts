import { getCategoryImages, getDestinationImages } from './pexels'
import { getColombiaCities, getTouristAttractions } from './colombia'
import { searchPlaces, getNearbyPlaces } from './geoapify'
import { searchHotels, searchGoogleLocal, searchGoogleImages } from './serpapi'
import { CACHE_DURATION } from './config'

export interface EnrichedDestination {
  id: string
  name: string
  category: string
  region: string
  description: string
  images: string[]
  price: number
  rating: number
  featured: boolean
  location?: {
    lat: number
    lon: number
    city: string
    department: string
  }
  hotels?: Array<{
    name: string
    price: number
    rating: number
    image: string
  }>
  activities?: string[]
  reviews?: number
  lastUpdated: number
}

export interface CategoryData {
  name: string
  images: string[]
  destinations: EnrichedDestination[]
  lastUpdated: number
}

const CACHE_KEYS = {
  CATEGORIES: 'tourism-categories-cache',
  DESTINATIONS: 'tourism-destinations-cache',
  LAST_SYNC: 'tourism-last-sync'
}

export async function shouldSync(): Promise<boolean> {
  try {
    const lastSyncStr = await window.spark.kv.get<string>(CACHE_KEYS.LAST_SYNC)
    if (!lastSyncStr) return true
    
    const lastSync = parseInt(lastSyncStr, 10)
    const now = Date.now()
    
    return (now - lastSync) > CACHE_DURATION
  } catch (error) {
    console.error('Error checking sync status:', error)
    return true
  }
}

export async function syncCategoryData(categoryName: string): Promise<CategoryData | null> {
  try {
    console.log(`Syncing data for category: ${categoryName}`)
    
    const images = await getCategoryImages(categoryName)
    
    const categoryKeywords: Record<string, string[]> = {
      'Aventura': ['aventura', 'deportes extremos', 'rafting', 'parapente'],
      'Bienestar': ['spa', 'wellness', 'yoga', 'retiro'],
      'Cultural': ['museo', 'patrimonio', 'histórico', 'colonial'],
      'Familiar': ['parque', 'familia', 'diversión', 'niños'],
      'Gastronomía': ['restaurante', 'comida típica', 'gastronomía'],
      'Naturaleza': ['parque natural', 'reserva', 'ecoturismo', 'naturaleza'],
      'Negocios': ['hotel', 'centro de convenciones', 'negocios'],
      'Playa': ['playa', 'costa', 'mar', 'caribe'],
      'Religioso': ['iglesia', 'catedral', 'santuario', 'basílica'],
      'Rural': ['finca', 'agroturismo', 'campo', 'café']
    }

    const keywords = categoryKeywords[categoryName] || [categoryName.toLowerCase()]
    const cities = await getColombiaCities()
    const majorCities = cities.filter(c => c.population > 100000).slice(0, 10)
    
    const destinations: EnrichedDestination[] = []
    let destIdCounter = 1

    for (const city of majorCities) {
      for (const keyword of keywords.slice(0, 2)) {
        try {
          const query = `${keyword} ${city.name} Colombia`
          const places = await searchPlaces(query)
          const localResults = await searchGoogleLocal(query, city.name)
          
          if (places.length > 0 || localResults.length > 0) {
            const place = places[0]
            const localResult = localResults[0]
            
            const destImages = await getDestinationImages(`${city.name} ${keyword}`)
            
            destinations.push({
              id: `${categoryName.toLowerCase()}-${destIdCounter++}`,
              name: localResult?.title || place?.name || `${keyword} en ${city.name}`,
              category: categoryName,
              region: city.region || 'Colombia',
              description: localResult?.description || place?.formatted || `Experiencia de ${keyword} en ${city.name}, Colombia`,
              images: destImages.slice(0, 5),
              price: Math.floor(Math.random() * 500000) + 100000,
              rating: localResult?.rating || (Math.random() * 2 + 3),
              featured: destIdCounter <= 3,
              location: {
                lat: localResult?.gps_coordinates?.latitude || place?.lat || 0,
                lon: localResult?.gps_coordinates?.longitude || place?.lon || 0,
                city: city.name,
                department: city.department
              },
              reviews: localResult?.reviews || Math.floor(Math.random() * 500) + 50,
              lastUpdated: Date.now()
            })
          }

          if (destinations.length >= 20) break
        } catch (error) {
          console.error(`Error processing ${keyword} in ${city.name}:`, error)
        }
      }
      
      if (destinations.length >= 20) break
    }

    const categoryData: CategoryData = {
      name: categoryName,
      images: images.slice(0, 10),
      destinations,
      lastUpdated: Date.now()
    }

    await window.spark.kv.set(`${CACHE_KEYS.CATEGORIES}-${categoryName}`, categoryData)
    
    console.log(`Successfully synced ${destinations.length} destinations for ${categoryName}`)
    
    return categoryData
  } catch (error) {
    console.error(`Error syncing category ${categoryName}:`, error)
    return null
  }
}

export async function syncAllCategories(): Promise<void> {
  const categories = [
    'Aventura',
    'Bienestar',
    'Cultural',
    'Familiar',
    'Gastronomía',
    'Naturaleza',
    'Negocios',
    'Playa',
    'Religioso',
    'Rural'
  ]

  console.log('Starting full data sync for all categories...')

  for (const category of categories) {
    try {
      await syncCategoryData(category)
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error(`Failed to sync category ${category}:`, error)
    }
  }

  await window.spark.kv.set(CACHE_KEYS.LAST_SYNC, Date.now().toString())
  console.log('Full data sync completed!')
}

export async function getCachedCategoryData(categoryName: string): Promise<CategoryData | null> {
  try {
    const data = await window.spark.kv.get<CategoryData>(`${CACHE_KEYS.CATEGORIES}-${categoryName}`)
    return data || null
  } catch (error) {
    console.error(`Error retrieving cached data for ${categoryName}:`, error)
    return null
  }
}

export async function getCategoryDataWithSync(categoryName: string): Promise<CategoryData | null> {
  const cachedData = await getCachedCategoryData(categoryName)
  
  if (cachedData && !await shouldSync()) {
    return cachedData
  }
  
  return await syncCategoryData(categoryName)
}

export async function initializeDataSync(): Promise<void> {
  const shouldPerformSync = await shouldSync()
  
  if (shouldPerformSync) {
    console.log('Cache expired or not found. Initiating data sync...')
    setTimeout(() => {
      syncAllCategories().catch(console.error)
    }, 1000)
  } else {
    console.log('Using cached data. Next sync in 24 hours.')
  }
}
