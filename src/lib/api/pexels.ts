import { API_CONFIG } from './config'

export interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

export interface PexelsResponse {
  page: number
  per_page: number
  photos: PexelsPhoto[]
  total_results: number
  next_page?: string
}

export async function searchPexelsImages(
  query: string,
  perPage: number = 15
): Promise<PexelsPhoto[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.pexels.baseUrl}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&locale=es-ES`,
      {
        headers: {
          Authorization: API_CONFIG.pexels.key
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`)
    }

    const data: PexelsResponse = await response.json()
    return data.photos
  } catch (error) {
    console.error('Error fetching Pexels images:', error)
    return []
  }
}

export async function getCategoryImages(categoryName: string): Promise<string[]> {
  const searchTerms: Record<string, string> = {
    'Aventura': 'Colombia adventure paragliding rafting',
    'Bienestar': 'Colombia spa wellness yoga retreat',
    'Cultural': 'Colombia colonial architecture heritage',
    'Familiar': 'Colombia family vacation beach',
    'Gastronomía': 'Colombian food cuisine arepas',
    'Naturaleza': 'Colombia nature rainforest landscape',
    'Negocios': 'Colombia business hotel conference',
    'Playa': 'Colombia beach Caribbean coast',
    'Religioso': 'Colombia church cathedral religious',
    'Rural': 'Colombia countryside coffee farm'
  }

  const query = searchTerms[categoryName] || `Colombia ${categoryName}`
  const photos = await searchPexelsImages(query, 20)
  
  return photos.map(photo => photo.src.large)
}

export async function getDestinationImages(destinationName: string): Promise<string[]> {
  const query = `${destinationName} Colombia tourism`
  const photos = await searchPexelsImages(query, 10)
  
  return photos.map(photo => photo.src.large)
}
