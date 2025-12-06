import { API_CONFIG } from './config'

export interface GoogleFlightOffer {
  departure_token: string
  booking_token: string
  price: number
  currency: string
  flights: Array<{
    departure_airport: {
      name: string
      id: string
      time: string
    }
    arrival_airport: {
      name: string
      id: string
      time: string
    }
    duration: number
    airplane: string
    airline: string
    airline_logo: string
    travel_class: string
    flight_number: string
    extensions: string[]
  }>
  total_duration: number
  carbon_emissions: {
    this_flight: number
    typical_for_this_route: number
    difference_percent: number
  }
}

export interface GoogleHotelListing {
  type: string
  name: string
  description?: string
  link: string
  images?: Array<{
    thumbnail: string
    original_image: string
  }>
  gps_coordinates?: {
    latitude: number
    longitude: number
  }
  check_in_time?: string
  check_out_time?: string
  rate_per_night?: {
    lowest: string
    extracted_lowest: number
    before_taxes_fees?: string
    extracted_before_taxes_fees?: number
  }
  total_rate?: {
    lowest: string
    extracted_lowest: number
    before_taxes_fees?: string
    extracted_before_taxes_fees?: number
  }
  deal?: string
  reviews?: number
  rating?: number
  extensions?: string[]
  amenities?: string[]
}

export interface GoogleImageResult {
  position: number
  thumbnail: string
  source: string
  title: string
  link: string
  original: string
  original_width: number
  original_height: number
  is_product?: boolean
}

export interface GoogleLocalResult {
  position: number
  title: string
  place_id: string
  data_id: string
  data_cid: string
  reviews_link: string
  photos_link: string
  gps_coordinates: {
    latitude: number
    longitude: number
  }
  place_id_search: string
  provider_id?: string
  rating?: number
  reviews?: number
  price?: string
  type: string
  types?: string[]
  type_id?: string
  address?: string
  open_state?: string
  hours?: string
  operating_hours?: Record<string, string>
  phone?: string
  website?: string
  description?: string
  service_options?: Record<string, boolean>
  thumbnail?: string
}

export async function searchFlights(
  departureId: string,
  arrivalId: string,
  outboundDate: string,
  returnDate?: string,
  adults: number = 1
): Promise<GoogleFlightOffer[]> {
  try {
    const params = new URLSearchParams({
      engine: 'google_flights',
      departure_id: departureId,
      arrival_id: arrivalId,
      outbound_date: outboundDate,
      currency: 'COP',
      hl: 'es',
      adults: adults.toString(),
      api_key: API_CONFIG.serpapi.key
    })

    if (returnDate) {
      params.append('return_date', returnDate)
    }

    const response = await fetch(`${API_CONFIG.serpapi.baseUrl}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`)
    }

    const data = await response.json()
    return data.best_flights || data.other_flights || []
  } catch (error) {
    console.error('Error searching flights:', error)
    return []
  }
}

export async function searchHotels(
  query: string,
  checkInDate: string,
  checkOutDate: string,
  adults: number = 2
): Promise<GoogleHotelListing[]> {
  try {
    const params = new URLSearchParams({
      engine: 'google_hotels',
      q: query,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      adults: adults.toString(),
      currency: 'COP',
      gl: 'co',
      hl: 'es',
      api_key: API_CONFIG.serpapi.key
    })

    const response = await fetch(`${API_CONFIG.serpapi.baseUrl}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`)
    }

    const data = await response.json()
    return data.properties || []
  } catch (error) {
    console.error('Error searching hotels:', error)
    return []
  }
}

export async function searchGoogleImages(query: string, num: number = 20): Promise<GoogleImageResult[]> {
  try {
    const params = new URLSearchParams({
      engine: 'google_images',
      q: query,
      num: num.toString(),
      hl: 'es',
      gl: 'co',
      api_key: API_CONFIG.serpapi.key
    })

    const response = await fetch(`${API_CONFIG.serpapi.baseUrl}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`)
    }

    const data = await response.json()
    return data.images_results || []
  } catch (error) {
    console.error('Error searching Google images:', error)
    return []
  }
}

export async function searchGoogleLocal(query: string, location?: string): Promise<GoogleLocalResult[]> {
  try {
    const params = new URLSearchParams({
      engine: 'google_local',
      q: query,
      hl: 'es',
      gl: 'co',
      api_key: API_CONFIG.serpapi.key
    })

    if (location) {
      params.append('location', location)
    }

    const response = await fetch(`${API_CONFIG.serpapi.baseUrl}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`)
    }

    const data = await response.json()
    return data.local_results || []
  } catch (error) {
    console.error('Error searching Google local:', error)
    return []
  }
}

export async function getGoogleMapsReviews(dataId: string): Promise<any[]> {
  try {
    const params = new URLSearchParams({
      engine: 'google_maps_reviews',
      data_id: dataId,
      hl: 'es',
      api_key: API_CONFIG.serpapi.key
    })

    const response = await fetch(`${API_CONFIG.serpapi.baseUrl}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`)
    }

    const data = await response.json()
    return data.reviews || []
  } catch (error) {
    console.error('Error fetching Google Maps reviews:', error)
    return []
  }
}
