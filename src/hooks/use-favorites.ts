import { useKV } from '@github/spark/hooks'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface FavoriteItem {
  id: string
  name: string
  location: string
  price: number
  image: string
  addedAt: number
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useKV<string[]>('user-favorite-ids', [])
  const [favoriteDetails, setFavoriteDetails] = useKV<FavoriteItem[]>('user-favorite-details', [])
  const [isLoading, setIsLoading] = useState(false)

  const toggleFavorite = useCallback((id: string, details?: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    setFavoriteIds((currentIds) => {
      const ids = currentIds || []
      const isFavorite = ids.includes(id)

      if (isFavorite) {
        toast.success('Removido de favoritos')
        setFavoriteDetails((current) => 
          (current || []).filter(item => item.id !== id)
        )
        return ids.filter(favId => favId !== id)
      } else {
        toast.success('Agregado a favoritos')
        
        if (details) {
          setFavoriteDetails((current) => [
            ...(current || []),
            {
              id,
              ...details,
              addedAt: Date.now()
            }
          ])
        }
        
        return [...ids, id]
      }
    })
  }, [setFavoriteIds, setFavoriteDetails])

  const isFavorite = useCallback((id: string) => {
    return (favoriteIds || []).includes(id)
  }, [favoriteIds])

  const clearFavorites = useCallback(() => {
    setFavoriteIds([])
    setFavoriteDetails([])
    toast.success('Favoritos eliminados')
  }, [setFavoriteIds, setFavoriteDetails])

  const getFavoriteDetails = useCallback((id: string) => {
    return (favoriteDetails || []).find(item => item.id === id)
  }, [favoriteDetails])

  return {
    favoriteIds: favoriteIds || [],
    favoriteDetails: favoriteDetails || [],
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoriteDetails,
    isLoading,
    count: (favoriteIds || []).length
  }
}
