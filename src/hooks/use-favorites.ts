import { useKV } from '@github/spark/hooks'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface PriceHistory {
  price: number
  timestamp: number
}

export interface FavoriteItem {
  id: string
  name: string
  location: string
  price: number
  image: string
  addedAt: number
  originalPrice?: number
  priceHistory?: PriceHistory[]
  hasDiscount?: boolean
  discountPercentage?: number
  lastChecked?: number
}

export interface PriceChangeNotification {
  id: string
  favoriteId: string
  favoriteName: string
  oldPrice: number
  newPrice: number
  changePercentage: number
  timestamp: number
  viewed: boolean
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useKV<string[]>('user-favorite-ids', [])
  const [favoriteDetails, setFavoriteDetails] = useKV<FavoriteItem[]>('user-favorite-details', [])
  const [priceNotifications, setPriceNotifications] = useKV<PriceChangeNotification[]>('price-notifications', [])
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
          const newFavorite: FavoriteItem = {
            id,
            ...details,
            addedAt: Date.now(),
            originalPrice: details.price,
            priceHistory: [{ price: details.price, timestamp: Date.now() }],
            lastChecked: Date.now()
          }
          
          setFavoriteDetails((current) => [...(current || []), newFavorite])
        }
        
        return [...ids, id]
      }
    })
  }, [setFavoriteIds, setFavoriteDetails])

  const updateFavoritePrice = useCallback((id: string, newPrice: number) => {
    setFavoriteDetails((current) => {
      const items = current || []
      return items.map(item => {
        if (item.id === id && item.price !== newPrice) {
          const oldPrice = item.price
          const changePercentage = ((newPrice - oldPrice) / oldPrice) * 100
          
          const notification: PriceChangeNotification = {
            id: `notif-${Date.now()}-${id}`,
            favoriteId: id,
            favoriteName: item.name,
            oldPrice,
            newPrice,
            changePercentage,
            timestamp: Date.now(),
            viewed: false
          }
          
          setPriceNotifications(notifs => [...(notifs || []), notification])
          
          if (changePercentage < -5) {
            toast.success(`¡Precio reducido! ${item.name} ahora está ${Math.abs(changePercentage).toFixed(0)}% más barato`, {
              duration: 5000,
            })
          }
          
          return {
            ...item,
            price: newPrice,
            priceHistory: [...(item.priceHistory || []), { price: newPrice, timestamp: Date.now() }],
            lastChecked: Date.now(),
            hasDiscount: newPrice < (item.originalPrice || item.price),
            discountPercentage: item.originalPrice ? ((item.originalPrice - newPrice) / item.originalPrice) * 100 : 0
          }
        }
        return item
      })
    })
  }, [setFavoriteDetails, setPriceNotifications])

  const markNotificationViewed = useCallback((notificationId: string) => {
    setPriceNotifications((current) => 
      (current || []).map(notif => 
        notif.id === notificationId ? { ...notif, viewed: true } : notif
      )
    )
  }, [setPriceNotifications])

  const clearNotifications = useCallback(() => {
    setPriceNotifications([])
  }, [setPriceNotifications])

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

  const unviewedNotificationsCount = (priceNotifications || []).filter(n => !n.viewed).length

  return {
    favoriteIds: favoriteIds || [],
    favoriteDetails: favoriteDetails || [],
    priceNotifications: priceNotifications || [],
    unviewedNotificationsCount,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoriteDetails,
    updateFavoritePrice,
    markNotificationViewed,
    clearNotifications,
    isLoading,
    count: (favoriteIds || []).length
  }
}
