import { useState, useEffect } from 'react'
import { CategoryData, getCategoryDataWithSync, initializeDataSync } from '@/lib/api/sync'

export function useCategoryData(categoryName: string) {
  const [data, setData] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        
        const categoryData = await getCategoryDataWithSync(categoryName)
        
        if (mounted) {
          setData(categoryData)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Error loading data')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [categoryName])

  return { data, loading, error }
}

export function useInitializeSync() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!initialized) {
      initializeDataSync().catch(console.error)
      setInitialized(true)
    }
  }, [initialized])

  return initialized
}
