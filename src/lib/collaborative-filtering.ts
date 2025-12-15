import { UserPreferences, UserInteraction } from './user-preferences'

export interface UserProfile {
  userId: string
  preferences: UserPreferences
  interactions: UserInteraction[]
}

export interface CollaborativeRecommendation {
  itemId: string
  score: number
  reasons: string[]
  similarUsers: number
  confidence: number
}

export interface SimilarUserMatch {
  userId: string
  similarity: number
  sharedInterests: string[]
}

export function calculateCosineSimilarity(
  userA: Record<string, number>,
  userB: Record<string, number>
): number {
  const keysA = Object.keys(userA)
  const keysB = Object.keys(userB)
  const allKeys = Array.from(new Set([...keysA, ...keysB]))

  let dotProduct = 0
  let normA = 0
  let normB = 0

  allKeys.forEach(key => {
    const valueA = userA[key] || 0
    const valueB = userB[key] || 0
    dotProduct += valueA * valueB
    normA += valueA * valueA
    normB += valueB * valueB
  })

  if (normA === 0 || normB === 0) return 0
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export function calculateJaccardSimilarity(setA: string[], setB: string[]): number {
  if (setA.length === 0 && setB.length === 0) return 0
  
  const intersection = setA.filter(item => setB.includes(item))
  const union = Array.from(new Set([...setA, ...setB]))
  
  return intersection.length / union.length
}

export function findSimilarUsers(
  currentUser: UserPreferences,
  allUsers: UserProfile[],
  minSimilarity: number = 0.3
): SimilarUserMatch[] {
  const similarUsers: SimilarUserMatch[] = []

  allUsers.forEach(otherUser => {
    const categorySimilarity = calculateCosineSimilarity(
      currentUser.categories,
      otherUser.preferences.categories
    )
    
    const destinationSimilarity = calculateCosineSimilarity(
      currentUser.destinations,
      otherUser.preferences.destinations
    )
    
    const searchSimilarity = calculateJaccardSimilarity(
      currentUser.searchHistory,
      otherUser.preferences.searchHistory
    )

    const overallSimilarity = (categorySimilarity * 0.5) + 
                             (destinationSimilarity * 0.3) + 
                             (searchSimilarity * 0.2)

    if (overallSimilarity >= minSimilarity) {
      const sharedCategories = Object.keys(currentUser.categories).filter(cat =>
        otherUser.preferences.categories[cat] && otherUser.preferences.categories[cat] > 0
      )

      similarUsers.push({
        userId: otherUser.userId,
        similarity: overallSimilarity,
        sharedInterests: sharedCategories
      })
    }
  })

  return similarUsers.sort((a, b) => b.similarity - a.similarity)
}

export function generateCollaborativeRecommendations(
  currentUser: UserPreferences,
  similarUsers: SimilarUserMatch[],
  allUsersData: UserProfile[],
  availableItems: any[],
  limit: number = 10
): CollaborativeRecommendation[] {
  const itemScores = new Map<string, { 
    score: number; 
    voters: number; 
    categories: Set<string>;
    reasons: Set<string>;
  }>()

  similarUsers.forEach(similarUser => {
    const userData = allUsersData.find(u => u.userId === similarUser.userId)
    if (!userData) return

    userData.interactions.forEach(interaction => {
      if (interaction.accommodationId) {
        const itemId = interaction.accommodationId
        
        if (currentUser.viewedAccommodations.includes(itemId)) {
          return
        }

        const weight = similarUser.similarity * getInteractionWeight(interaction.type)
        const current = itemScores.get(itemId) || { 
          score: 0, 
          voters: 0, 
          categories: new Set(),
          reasons: new Set()
        }
        
        current.score += weight
        current.voters += 1
        
        if (interaction.category) {
          current.categories.add(interaction.category)
        }
        
        if (similarUser.sharedInterests.length > 0) {
          current.reasons.add(`Usuarios con gustos similares en ${similarUser.sharedInterests[0]}`)
        }
        
        itemScores.set(itemId, current)
      }
    })
  })

  const recommendations: CollaborativeRecommendation[] = []

  itemScores.forEach((data, itemId) => {
    const item = availableItems.find(i => i.id === itemId)
    if (!item) return

    const confidence = Math.min(data.voters / 5, 1)
    const normalizedScore = data.score * confidence

    const reasons: string[] = Array.from(data.reasons)
    
    if (data.voters > 3) {
      reasons.push(`Recomendado por ${data.voters} usuarios similares`)
    }
    
    if (data.categories.size > 0) {
      const categories = Array.from(data.categories)
      reasons.push(`Popular en ${categories.join(', ')}`)
    }

    recommendations.push({
      itemId,
      score: normalizedScore,
      reasons: reasons.length > 0 ? reasons : ['Recomendado por usuarios similares'],
      similarUsers: data.voters,
      confidence
    })
  })

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

function getInteractionWeight(type: UserInteraction['type']): number {
  const weights = {
    view: 1,
    click: 2,
    search: 2,
    favorite: 4,
    booking: 5
  }
  return weights[type] || 1
}

export function generateMockUsers(count: number = 50): UserProfile[] {
  const categories = ['aventura', 'naturaleza', 'cultural', 'playa', 'gastronomia', 
                     'bienestar', 'familiar', 'rural', 'negocios', 'religioso']
  
  const destinations = ['Cartagena', 'Medellín', 'Bogotá', 'San Andrés', 'Cali', 
                       'Santa Marta', 'Eje Cafetero', 'Villa de Leyva', 'Pasto']
  
  const users: UserProfile[] = []

  for (let i = 0; i < count; i++) {
    const numCategories = Math.floor(Math.random() * 4) + 2
    const selectedCategories = categories
      .sort(() => Math.random() - 0.5)
      .slice(0, numCategories)

    const categoryPrefs: Record<string, number> = {}
    selectedCategories.forEach(cat => {
      categoryPrefs[cat] = Math.floor(Math.random() * 30) + 5
    })

    const numDestinations = Math.floor(Math.random() * 3) + 1
    const selectedDestinations = destinations
      .sort(() => Math.random() - 0.5)
      .slice(0, numDestinations)

    const destinationPrefs: Record<string, number> = {}
    selectedDestinations.forEach(dest => {
      destinationPrefs[dest] = Math.floor(Math.random() * 20) + 3
    })

    const interactions: UserInteraction[] = []
    const numInteractions = Math.floor(Math.random() * 20) + 5
    
    for (let j = 0; j < numInteractions; j++) {
      const types: UserInteraction['type'][] = ['view', 'click', 'search', 'favorite', 'booking']
      interactions.push({
        type: types[Math.floor(Math.random() * types.length)],
        category: selectedCategories[Math.floor(Math.random() * selectedCategories.length)],
        accommodationId: `acc-${Math.floor(Math.random() * 100)}`,
        timestamp: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      })
    }

    users.push({
      userId: `user-${i}`,
      preferences: {
        categories: categoryPrefs,
        destinations: destinationPrefs,
        priceRange: { min: 50000, max: 500000, count: 10 },
        searchHistory: selectedDestinations.slice(0, 3),
        viewedAccommodations: interactions
          .filter(i => i.accommodationId)
          .map(i => i.accommodationId!)
          .slice(0, 20),
        favoriteCategories: selectedCategories.slice(0, 2),
        lastInteraction: Date.now()
      },
      interactions
    })
  }

  return users
}

export function getMockSimilarUsers(): UserProfile[] {
  return generateMockUsers(50)
}
