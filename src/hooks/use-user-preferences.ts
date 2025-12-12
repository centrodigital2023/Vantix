import { useState, useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { 
  UserInteraction, 
  UserPreferences, 
  calculatePreferences,
  generateRecommendations,
  getDefaultPreferences
} from '@/lib/user-preferences'

const INTERACTIONS_KEY = 'user-interactions'
const PREFERENCES_KEY = 'user-preferences'

export function useUserPreferences() {
  const [interactions, setInteractions] = useKV<UserInteraction[]>(INTERACTIONS_KEY, [])
  const [preferences, setPreferences] = useKV<UserPreferences>(PREFERENCES_KEY, getDefaultPreferences())
  const [isCalculating, setIsCalculating] = useState(false)

  const trackInteraction = useCallback((interaction: Omit<UserInteraction, 'timestamp'>) => {
    const newInteraction: UserInteraction = {
      ...interaction,
      timestamp: Date.now()
    }

    setInteractions(current => {
      const currentArray = current || []
      const updated = [...currentArray, newInteraction]
      if (updated.length > 1000) {
        return updated.slice(-1000)
      }
      return updated
    })
  }, [setInteractions])

  const recalculatePreferences = useCallback(() => {
    setIsCalculating(true)
    try {
      const currentInteractions = interactions || []
      const newPreferences = calculatePreferences(currentInteractions)
      setPreferences(() => newPreferences)
    } finally {
      setIsCalculating(false)
    }
  }, [interactions, setPreferences])

  useEffect(() => {
    const currentInteractions = interactions || []
    if (currentInteractions.length > 0) {
      const timeoutId = setTimeout(() => {
        recalculatePreferences()
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [interactions, recalculatePreferences])

  const getRecommendations = useCallback(<T extends { 
    id: string; 
    category?: string; 
    destination?: string;
    ciudad?: string;
  }>(
    items: T[],
    limit?: number
  ) => {
    const currentPreferences = preferences || getDefaultPreferences()
    return generateRecommendations(items, currentPreferences, limit)
  }, [preferences])

  const clearHistory = useCallback(() => {
    setInteractions(() => [])
    setPreferences(() => getDefaultPreferences())
  }, [setInteractions, setPreferences])

  return {
    trackInteraction,
    preferences: preferences || getDefaultPreferences(),
    getRecommendations,
    clearHistory,
    isCalculating,
    interactionCount: (interactions || []).length
  }
}
