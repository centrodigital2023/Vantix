import { useEffect } from 'react'
import { useFavorites } from '@/hooks/use-favorites'

export function usePriceMonitoring() {
  const { favoriteDetails, updateFavoritePrice } = useFavorites()

  useEffect(() => {
    const simulatePriceChanges = () => {
      if (favoriteDetails.length === 0) return

      const randomFavorite = favoriteDetails[Math.floor(Math.random() * favoriteDetails.length)]
      
      const changeTypes = [
        { min: -0.20, max: -0.05 },
        { min: -0.15, max: -0.05 },
        { min: 0.05, max: 0.15 },
      ]
      
      const changeType = changeTypes[Math.floor(Math.random() * changeTypes.length)]
      const priceChange = changeType.min + Math.random() * (changeType.max - changeType.min)
      const newPrice = Math.round(randomFavorite.price * (1 + priceChange))

      if (newPrice !== randomFavorite.price && Math.abs(priceChange) > 0.03) {
        updateFavoritePrice(randomFavorite.id, newPrice)
      }
    }

    const interval = setInterval(simulatePriceChanges, 30000)

    return () => clearInterval(interval)
  }, [favoriteDetails, updateFavoritePrice])
}
