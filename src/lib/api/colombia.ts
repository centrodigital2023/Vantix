import { API_CONFIG } from './config'

export interface TouristAttraction {
  name: string
  city: string
  description: string
  images: string[]
  latitude?: number
  longitude?: number
}

export interface City {
  id: number
  name: string
  description: string
  surface: number
  population: number
  postalCode: string
  departmentId: number
  department: string
  regionId: number
  region: string
}

export interface Department {
  id: number
  name: string
  description: string
  cityCapitalId: number
  municipalities: number
  surface: number
  population: number
  phonePrefix: string
  regionId: number
}

export interface TouristDestination {
  id: number
  name: string
  description: string
  city: string
  department: string
  region: string
  images: string[]
  latitude?: number
  longitude?: number
}

export async function getColombiaCities(): Promise<City[]> {
  try {
    const response = await fetch(`${API_CONFIG.colombia.baseUrl}/City`)
    
    if (!response.ok) {
      throw new Error(`Colombia API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching Colombia cities:', error)
    return []
  }
}

export async function getColombiaDepartments(): Promise<Department[]> {
  try {
    const response = await fetch(`${API_CONFIG.colombia.baseUrl}/Department`)
    
    if (!response.ok) {
      throw new Error(`Colombia API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching Colombia departments:', error)
    return []
  }
}

export async function getTouristAttractions(): Promise<TouristAttraction[]> {
  try {
    const response = await fetch(`${API_CONFIG.colombia.baseUrl}/TouristAttraction`)
    
    if (!response.ok) {
      throw new Error(`Colombia API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching tourist attractions:', error)
    return []
  }
}

export async function getCityById(id: number): Promise<City | null> {
  try {
    const response = await fetch(`${API_CONFIG.colombia.baseUrl}/City/${id}`)
    
    if (!response.ok) {
      throw new Error(`Colombia API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching city:', error)
    return null
  }
}

export async function searchCitiesByName(name: string): Promise<City[]> {
  try {
    const response = await fetch(`${API_CONFIG.colombia.baseUrl}/City/name/${encodeURIComponent(name)}`)
    
    if (!response.ok) {
      throw new Error(`Colombia API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error searching cities:', error)
    return []
  }
}
