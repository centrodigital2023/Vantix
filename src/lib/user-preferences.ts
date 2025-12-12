export interface UserInteraction {
  type: 'view' | 'click' | 'search' | 'booking' | 'favorite'
  category?: string
  destinationId?: string
  accommodationId?: string
  searchQuery?: string
  timestamp: number
  duration?: number
}

export interface UserPreferences {
  categories: Record<string, number>
  destinations: Record<string, number>
  priceRange: { min: number; max: number; count: number }
  searchHistory: string[]
  viewedAccommodations: string[]
  favoriteCategories: string[]
  lastInteraction: number
}

export interface RecommendationScore {
  id: string
  score: number
  reasons: string[]
}

const CATEGORY_WEIGHTS = {
  view: 1,
  click: 2,
  search: 3,
  favorite: 5,
  booking: 10
}

export function calculatePreferences(interactions: UserInteraction[]): UserPreferences {
  const preferences: UserPreferences = {
    categories: {},
    destinations: {},
    priceRange: { min: 0, max: 1000000, count: 0 },
    searchHistory: [],
    viewedAccommodations: [],
    favoriteCategories: [],
    lastInteraction: Date.now()
  }

  interactions.forEach(interaction => {
    if (interaction.category) {
      const weight = CATEGORY_WEIGHTS[interaction.type] || 1
      preferences.categories[interaction.category] = 
        (preferences.categories[interaction.category] || 0) + weight
    }

    if (interaction.destinationId) {
      const weight = CATEGORY_WEIGHTS[interaction.type] || 1
      preferences.destinations[interaction.destinationId] = 
        (preferences.destinations[interaction.destinationId] || 0) + weight
    }

    if (interaction.searchQuery && !preferences.searchHistory.includes(interaction.searchQuery)) {
      preferences.searchHistory.unshift(interaction.searchQuery)
      if (preferences.searchHistory.length > 20) {
        preferences.searchHistory.pop()
      }
    }

    if (interaction.accommodationId && !preferences.viewedAccommodations.includes(interaction.accommodationId)) {
      preferences.viewedAccommodations.unshift(interaction.accommodationId)
      if (preferences.viewedAccommodations.length > 50) {
        preferences.viewedAccommodations.pop()
      }
    }
  })

  const sortedCategories = Object.entries(preferences.categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat]) => cat)

  preferences.favoriteCategories = sortedCategories

  return preferences
}

export function scoreRecommendation(
  itemId: string,
  itemCategory: string,
  itemDestination: string,
  preferences: UserPreferences
): RecommendationScore {
  let score = 0
  const reasons: string[] = []

  const categoryScore = preferences.categories[itemCategory] || 0
  if (categoryScore > 0) {
    score += categoryScore * 2
    reasons.push(`Coincide con tu interés en ${itemCategory}`)
  }

  const destinationScore = preferences.destinations[itemDestination] || 0
  if (destinationScore > 0) {
    score += destinationScore * 1.5
    reasons.push(`Basado en tu interés en ${itemDestination}`)
  }

  const isNewItem = !preferences.viewedAccommodations.includes(itemId)
  if (isNewItem) {
    score += 5
    reasons.push('Nuevo para ti')
  }

  const isFavoriteCategory = preferences.favoriteCategories.includes(itemCategory)
  if (isFavoriteCategory) {
    score += 10
    reasons.push(`De tu categoría favorita: ${itemCategory}`)
  }

  return { id: itemId, score, reasons }
}

export function generateRecommendations<T extends { 
  id: string; 
  category?: string; 
  destination?: string;
  ciudad?: string;
}>(
  items: T[],
  preferences: UserPreferences,
  limit: number = 10
): Array<T & { recommendationScore: number; recommendationReasons: string[] }> {
  const scoredItems = items.map(item => {
    const itemCategory = item.category || ''
    const itemDestination = item.destination || item.ciudad || ''
    const recommendation = scoreRecommendation(item.id, itemCategory, itemDestination, preferences)
    
    return {
      ...item,
      recommendationScore: recommendation.score,
      recommendationReasons: recommendation.reasons
    }
  })

  return scoredItems
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, limit)
}

export function getDefaultPreferences(): UserPreferences {
  return {
    categories: {},
    destinations: {},
    priceRange: { min: 0, max: 1000000, count: 0 },
    searchHistory: [],
    viewedAccommodations: [],
    favoriteCategories: [],
    lastInteraction: Date.now()
  }
}
