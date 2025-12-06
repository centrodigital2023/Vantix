import { API_CONFIG } from './config'

export interface GeoapifyPlace {
  place_id: string
  name: string
  country: string
  country_code: string
  state: string
  city: string
  postcode: string
  street: string
  lon: number
  lat: number
  formatted: string
  address_line1: string
  address_line2: string
  categories: string[]
  details?: {
    contact?: {
      phone?: string
      website?: string
      email?: string
    }
    facilities?: string[]
    building?: {
      type?: string
    }
  }
  datasource: {
    sourcename: string
    attribution: string
  }
  timezone: {
    name: string
    offset_STD: string
    offset_DST: string
  }
}

export interface GeoapifyPlaceDetails {
  type: string
  features: Array<{
    type: string
    properties: GeoapifyPlace
    geometry: {
      type: string
      coordinates: [number, number]
    }
  }>
}

export async function searchPlaces(
  query: string,
  country: string = 'Colombia'
): Promise<GeoapifyPlace[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.geoapify.baseUrl}/v1/geocode/search?text=${encodeURIComponent(query)}&filter=countrycode:co&format=json&apiKey=${API_CONFIG.geoapify.key}`
    )

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error searching places:', error)
    return []
  }
}

export async function getPlaceDetails(placeId: string): Promise<GeoapifyPlace | null> {
  try {
    const response = await fetch(
      `${API_CONFIG.geoapify.baseUrl}/v2/place-details?id=${encodeURIComponent(placeId)}&apiKey=${API_CONFIG.geoapify.key}`
    )

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`)
    }

    const data: GeoapifyPlaceDetails = await response.json()
    return data.features?.[0]?.properties || null
  } catch (error) {
    console.error('Error fetching place details:', error)
    return null
  }
}

export async function autocompletePlace(text: string): Promise<GeoapifyPlace[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.geoapify.baseUrl}/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&filter=countrycode:co&apiKey=${API_CONFIG.geoapify.key}`
    )

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`)
    }

    const data = await response.json()
    return data.features?.map((f: any) => f.properties) || []
  } catch (error) {
    console.error('Error autocompleting place:', error)
    return []
  }
}

export async function getNearbyPlaces(
  lat: number,
  lon: number,
  radius: number = 5000,
  categories?: string[]
): Promise<GeoapifyPlace[]> {
  try {
    const categoryFilter = categories?.length 
      ? `&categories=${categories.join(',')}` 
      : ''
    
    const response = await fetch(
      `${API_CONFIG.geoapify.baseUrl}/v2/places?lat=${lat}&lon=${lon}&radius=${radius}${categoryFilter}&apiKey=${API_CONFIG.geoapify.key}`
    )

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`)
    }

    const data = await response.json()
    return data.features?.map((f: any) => f.properties) || []
  } catch (error) {
    console.error('Error fetching nearby places:', error)
    return []
  }
}
