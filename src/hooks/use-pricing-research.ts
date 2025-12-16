import { useState, useEffect } from 'react'
import {
  researchAccommodationPricing,
  bulkPricingResearch,
  calculateDynamicPrice,
  colombianTourismPricing,
  getCurrentSeasonMultiplier
} from '@/lib/pricing-research'

interface UsePricingResearchOptions {
  accommodationType: string
  city: string
  category: string
  currentPrice: number
  autoUpdate?: boolean
}

export function usePricingResearch({
  accommodationType,
  city,
  category,
  currentPrice,
  autoUpdate = false
}: UsePricingResearchOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [research, setResearch] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const performResearch = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await researchAccommodationPricing(
        accommodationType,
        city,
        category,
        currentPrice
      )
      setResearch(result)
    } catch (err) {
      setError('Error al investigar precios de mercado')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (autoUpdate) {
      performResearch()
    }
  }, [accommodationType, city, category, currentPrice, autoUpdate])

  return {
    research,
    isLoading,
    error,
    performResearch,
    refresh: performResearch
  }
}

export function useSeasonalPricing(basePrice: number, category: string, city: string) {
  const [seasonalPrices, setSeasonalPrices] = useState({
    current: basePrice,
    highSeason: basePrice,
    lowSeason: basePrice,
    seasonMultiplier: 1
  })

  useEffect(() => {
    const pricingData = colombianTourismPricing.find(
      p => p.city === city && p.category === category
    ) || colombianTourismPricing[0]

    const seasonMultiplier = getCurrentSeasonMultiplier()
    const currentPrice = calculateDynamicPrice(basePrice, pricingData, 0.7)
    const highSeasonPrice = Math.round(basePrice * pricingData.seasonalMultipliers.highSeason)
    const lowSeasonPrice = Math.round(basePrice * pricingData.seasonalMultipliers.lowSeason)

    setSeasonalPrices({
      current: currentPrice,
      highSeason: highSeasonPrice,
      lowSeason: lowSeasonPrice,
      seasonMultiplier
    })
  }, [basePrice, category, city])

  return seasonalPrices
}

interface BulkPricingResearchOptions {
  accommodations: Array<{
    id: string
    type: string
    city: string
    category: string
    pricePerNight: number
  }>
}

export function useBulkPricingResearch({ accommodations }: BulkPricingResearchOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Record<string, any>>({})
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const performBulkResearch = async () => {
    setIsLoading(true)
    setError(null)
    setProgress(0)
    
    try {
      const totalItems = accommodations.length
      let completed = 0

      const resultsMap: Record<string, any> = {}
      
      for (const accommodation of accommodations) {
        const result = await researchAccommodationPricing(
          accommodation.type,
          accommodation.city,
          accommodation.category,
          accommodation.pricePerNight
        )
        
        resultsMap[accommodation.id] = {
          ...result,
          accommodationId: accommodation.id
        }
        
        completed++
        setProgress((completed / totalItems) * 100)
      }

      setResults(resultsMap)
    } catch (err) {
      setError('Error al realizar investigación masiva de precios')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    results,
    isLoading,
    error,
    progress,
    performBulkResearch
  }
}

export function usePriceComparison(prices: number[]) {
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const median = [...prices].sort((a, b) => a - b)[Math.floor(prices.length / 2)]

  return {
    average: Math.round(average),
    min,
    max,
    median,
    range: max - min
  }
}

export function useDynamicPricing(
  basePrice: number,
  category: string,
  city: string,
  occupancyRate: number = 0.7
) {
  const [dynamicPrice, setDynamicPrice] = useState(basePrice)

  useEffect(() => {
    const pricingData = colombianTourismPricing.find(
      p => p.city === city && p.category === category
    ) || colombianTourismPricing[0]

    const calculated = calculateDynamicPrice(basePrice, pricingData, occupancyRate)
    setDynamicPrice(calculated)
  }, [basePrice, category, city, occupancyRate])

  return dynamicPrice
}
