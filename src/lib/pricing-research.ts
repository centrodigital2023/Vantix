interface PricingData {
  accommodationType: string
  category: string
  city: string
  department: string
  averagePrice: number
  priceRange: { min: number; max: number }
  seasonalMultipliers: {
    highSeason: number
    lowSeason: number
  }
  lastUpdated: string
}

export const colombianTourismPricing: PricingData[] = [
  {
    accommodationType: 'Hotel Boutique',
    category: 'Cultural',
    city: 'Cartagena',
    department: 'Bolívar',
    averagePrice: 520000,
    priceRange: { min: 350000, max: 850000 },
    seasonalMultipliers: { highSeason: 1.4, lowSeason: 0.8 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Resort Todo Incluido',
    category: 'Playa',
    city: 'Santa Marta',
    department: 'Magdalena',
    averagePrice: 680000,
    priceRange: { min: 450000, max: 1200000 },
    seasonalMultipliers: { highSeason: 1.5, lowSeason: 0.75 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Hostel',
    category: 'Aventura',
    city: 'Medellín',
    department: 'Antioquia',
    averagePrice: 55000,
    priceRange: { min: 35000, max: 85000 },
    seasonalMultipliers: { highSeason: 1.2, lowSeason: 0.9 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Cabaña Rural',
    category: 'Rural',
    city: 'Salento',
    department: 'Quindío',
    averagePrice: 320000,
    priceRange: { min: 180000, max: 550000 },
    seasonalMultipliers: { highSeason: 1.3, lowSeason: 0.85 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Hotel Negocios',
    category: 'Negocios',
    city: 'Bogotá',
    department: 'Cundinamarca',
    averagePrice: 380000,
    priceRange: { min: 250000, max: 650000 },
    seasonalMultipliers: { highSeason: 1.15, lowSeason: 0.95 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Hotel Boutique',
    category: 'Cultural',
    city: 'Pasto',
    department: 'Nariño',
    averagePrice: 220000,
    priceRange: { min: 120000, max: 400000 },
    seasonalMultipliers: { highSeason: 1.6, lowSeason: 0.75 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Posada',
    category: 'Religioso',
    city: 'Ipiales',
    department: 'Nariño',
    averagePrice: 150000,
    priceRange: { min: 80000, max: 280000 },
    seasonalMultipliers: { highSeason: 1.5, lowSeason: 0.8 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Hotel Playa',
    category: 'Playa',
    city: 'Tumaco',
    department: 'Nariño',
    averagePrice: 180000,
    priceRange: { min: 90000, max: 350000 },
    seasonalMultipliers: { highSeason: 1.4, lowSeason: 0.7 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Hotel Spa',
    category: 'Bienestar',
    city: 'Villa de Leyva',
    department: 'Boyacá',
    averagePrice: 420000,
    priceRange: { min: 280000, max: 750000 },
    seasonalMultipliers: { highSeason: 1.35, lowSeason: 0.8 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Lodge Naturaleza',
    category: 'Naturaleza',
    city: 'Leticia',
    department: 'Amazonas',
    averagePrice: 480000,
    priceRange: { min: 300000, max: 850000 },
    seasonalMultipliers: { highSeason: 1.3, lowSeason: 0.85 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Finca Hotel',
    category: 'Familiar',
    city: 'Pereira',
    department: 'Risaralda',
    averagePrice: 350000,
    priceRange: { min: 200000, max: 600000 },
    seasonalMultipliers: { highSeason: 1.4, lowSeason: 0.8 },
    lastUpdated: new Date().toISOString()
  },
  {
    accommodationType: 'Hotel Gastronómico',
    category: 'Gastronomía',
    city: 'Popayán',
    department: 'Cauca',
    averagePrice: 280000,
    priceRange: { min: 150000, max: 500000 },
    seasonalMultipliers: { highSeason: 1.5, lowSeason: 0.75 },
    lastUpdated: new Date().toISOString()
  }
]

export const getCurrentSeasonMultiplier = (): number => {
  const month = new Date().getMonth() + 1
  
  const highSeasonMonths = [1, 6, 7, 12]
  
  if (highSeasonMonths.includes(month)) {
    return 1.3
  } else if ([2, 8].includes(month)) {
    return 1.15
  } else {
    return 0.85
  }
}

export const calculateDynamicPrice = (
  basePrice: number,
  priceData: PricingData,
  occupancyRate: number = 0.7
): number => {
  const seasonMultiplier = getCurrentSeasonMultiplier()
  const occupancyMultiplier = occupancyRate > 0.8 ? 1.15 : occupancyRate < 0.4 ? 0.9 : 1.0
  
  const finalPrice = basePrice * seasonMultiplier * occupancyMultiplier
  
  return Math.round(finalPrice / 1000) * 1000
}

interface MarketResearchResult {
  accommodationId: string
  suggestedPrice: number
  priceAdjustment: number
  reasoning: string
  competitorRange: { min: number; max: number }
  marketPosition: 'budget' | 'mid-range' | 'premium' | 'luxury'
}

export const researchAccommodationPricing = async (
  accommodationType: string,
  city: string,
  category: string,
  currentPrice: number
): Promise<MarketResearchResult> => {
  const pricingData = colombianTourismPricing.find(
    p => p.city === city && p.category === category
  ) || colombianTourismPricing.find(
    p => p.category === category
  ) || colombianTourismPricing[0]

  const seasonalPrice = calculateDynamicPrice(pricingData.averagePrice, pricingData)
  
  const priceAdjustment = ((seasonalPrice - currentPrice) / currentPrice) * 100
  
  let marketPosition: 'budget' | 'mid-range' | 'premium' | 'luxury'
  if (currentPrice < pricingData.priceRange.min * 0.7) marketPosition = 'budget'
  else if (currentPrice < pricingData.averagePrice) marketPosition = 'mid-range'
  else if (currentPrice < pricingData.priceRange.max * 0.8) marketPosition = 'premium'
  else marketPosition = 'luxury'

  const reasoning = generatePricingReasoning(
    currentPrice,
    seasonalPrice,
    pricingData,
    marketPosition
  )

  return {
    accommodationId: '',
    suggestedPrice: seasonalPrice,
    priceAdjustment: Math.round(priceAdjustment),
    reasoning,
    competitorRange: pricingData.priceRange,
    marketPosition
  }
}

const generatePricingReasoning = (
  currentPrice: number,
  suggestedPrice: number,
  pricingData: PricingData,
  marketPosition: string
): string => {
  const month = new Date().toLocaleDateString('es-CO', { month: 'long' })
  const diff = suggestedPrice - currentPrice
  
  if (Math.abs(diff) < currentPrice * 0.05) {
    return `Precio competitivo para ${pricingData.city}. Se mantiene en rango de mercado ${marketPosition}.`
  }
  
  if (diff > 0) {
    return `Oportunidad de incremento: El mercado en ${pricingData.city} durante ${month} permite precios más altos. Posición ${marketPosition} con demanda estacional favorable.`
  }
  
  return `Ajuste recomendado: Para mantener competitividad en ${pricingData.city} durante ${month}, considera ajustar al promedio del mercado ${marketPosition}.`
}

export const bulkPricingResearch = async (
  accommodations: Array<{
    id: string
    type: string
    city: string
    category: string
    pricePerNight: number
  }>
): Promise<Record<string, MarketResearchResult>> => {
  const results: Record<string, MarketResearchResult> = {}
  
  for (const accommodation of accommodations) {
    const research = await researchAccommodationPricing(
      accommodation.type,
      accommodation.city,
      accommodation.category,
      accommodation.pricePerNight
    )
    
    results[accommodation.id] = {
      ...research,
      accommodationId: accommodation.id
    }
  }
  
  return results
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export const getPriceInsights = (
  currentPrice: number,
  city: string,
  category: string
): string => {
  const pricingData = colombianTourismPricing.find(
    p => p.city === city && p.category === category
  )
  
  if (!pricingData) {
    return 'Precio competitivo en el mercado colombiano'
  }
  
  const percentile = ((currentPrice - pricingData.priceRange.min) / 
    (pricingData.priceRange.max - pricingData.priceRange.min)) * 100
  
  if (percentile < 25) return 'Excelente precio - 25% más económico que la competencia'
  if (percentile < 50) return 'Buen valor - precio por debajo del promedio'
  if (percentile < 75) return 'Precio estándar del mercado'
  return 'Precio premium - servicios de alta calidad'
}
