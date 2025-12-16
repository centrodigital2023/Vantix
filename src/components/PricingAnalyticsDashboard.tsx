import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { TrendUp, TrendDown, ChartLine, CurrencyCircleDollar, Warning, CheckCircle } from '@phosphor-icons/react'
import { useBulkPricingResearch, useSeasonalPricing } from '@/hooks/use-pricing-research'
import { PriceDisplay } from '@/components/PricingDisplay'
import { formatPrice } from '@/lib/pricing-research'
import { motion } from 'framer-motion'

interface PricingAnalyticsDashboardProps {
  accommodations: Array<{
    id: string
    name: string
    type: string
    city: string
    category: string
    pricePerNight: number
  }>
}

export function PricingAnalyticsDashboard({ accommodations }: PricingAnalyticsDashboardProps) {
  const { results, isLoading, progress, performBulkResearch } = useBulkPricingResearch({
    accommodations
  })
  
  const [summary, setSummary] = useState({
    totalProperties: 0,
    overpriced: 0,
    underpriced: 0,
    competitive: 0,
    potentialRevenue: 0
  })

  useEffect(() => {
    if (Object.keys(results).length > 0) {
      const totalProperties = accommodations.length
      let overpriced = 0
      let underpriced = 0
      let competitive = 0
      let potentialRevenue = 0

      accommodations.forEach(acc => {
        const research = results[acc.id]
        if (research) {
          if (research.priceAdjustment > 10) overpriced++
          else if (research.priceAdjustment < -10) underpriced++
          else competitive++

          if (research.priceAdjustment < 0) {
            potentialRevenue += Math.abs(research.suggestedPrice - acc.pricePerNight) * 30
          }
        }
      })

      setSummary({
        totalProperties,
        overpriced,
        underpriced,
        competitive,
        potentialRevenue
      })
    }
  }, [results, accommodations])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Análisis de Precios</h2>
          <p className="text-muted-foreground">
            Investigación de mercado y recomendaciones de precios
          </p>
        </div>
        <Button 
          onClick={performBulkResearch}
          disabled={isLoading}
          size="lg"
        >
          <ChartLine className="w-5 h-5 mr-2" />
          {isLoading ? 'Analizando...' : 'Analizar Precios'}
        </Button>
      </div>

      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analizando propiedades...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(results).length > 0 && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Propiedades Analizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{summary.totalProperties}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Precios Competitivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" weight="fill" />
                    <div className="text-3xl font-bold">{summary.competitive}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Requieren Ajuste
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Warning className="w-5 h-5 text-amber-500" weight="fill" />
                    <div className="text-3xl font-bold">
                      {summary.overpriced + summary.underpriced}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ingresos Potenciales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CurrencyCircleDollar className="w-5 h-5 text-primary" weight="fill" />
                    <div className="text-2xl font-bold">
                      {formatPrice(summary.potentialRevenue)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Por mes (estimado)</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones de Precios</CardTitle>
              <CardDescription>
                Comparación con el mercado y sugerencias de ajuste
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accommodations.map((accommodation, index) => {
                  const research = results[accommodation.id]
                  if (!research) return null

                  const needsAdjustment = Math.abs(research.priceAdjustment) > 10
                  const isOverpriced = research.priceAdjustment > 10
                  const isUnderpriced = research.priceAdjustment < -10

                  return (
                    <motion.div
                      key={accommodation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{accommodation.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {accommodation.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {research.marketPosition}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Precio actual:</span>
                            <span className="ml-2 font-medium">
                              {formatPrice(accommodation.pricePerNight)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Precio sugerido:</span>
                            <span className="ml-2 font-medium text-primary">
                              {formatPrice(research.suggestedPrice)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isUnderpriced && (
                              <TrendUp className="w-4 h-4 text-green-500" weight="bold" />
                            )}
                            {isOverpriced && (
                              <TrendDown className="w-4 h-4 text-red-500" weight="bold" />
                            )}
                            <span className={`font-medium ${
                              isUnderpriced ? 'text-green-500' : 
                              isOverpriced ? 'text-red-500' : 
                              'text-muted-foreground'
                            }`}>
                              {research.priceAdjustment > 0 ? '+' : ''}
                              {research.priceAdjustment}%
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {research.reasoning}
                        </p>

                        {needsAdjustment && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="default">
                              Aplicar precio sugerido
                            </Button>
                            <Button size="sm" variant="outline">
                              Ver detalles
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

interface PropertyPricingCardProps {
  accommodation: {
    id: string
    name: string
    type: string
    city: string
    category: string
    pricePerNight: number
  }
}

export function PropertyPricingCard({ accommodation }: PropertyPricingCardProps) {
  const seasonalPrices = useSeasonalPricing(
    accommodation.pricePerNight,
    accommodation.category,
    accommodation.city
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{accommodation.name}</CardTitle>
        <CardDescription>{accommodation.city} • {accommodation.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PriceDisplay
          price={seasonalPrices.current}
          size="md"
          showInsight
          city={accommodation.city}
          category={accommodation.category}
        />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Temporada baja:</span>
            <span className="font-medium">{formatPrice(seasonalPrices.lowSeason)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Temporada alta:</span>
            <span className="font-medium text-primary">{formatPrice(seasonalPrices.highSeason)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
