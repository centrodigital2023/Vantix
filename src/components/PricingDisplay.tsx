import { TrendUp, TrendDown, Minus, Info } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { formatPrice, getPriceInsights } from '@/lib/pricing-research'
import { cn } from '@/lib/utils'

interface PriceInsightBadgeProps {
  currentPrice: number
  city: string
  category: string
  showTooltip?: boolean
  className?: string
}

export function PriceInsightBadge({
  currentPrice,
  city,
  category,
  showTooltip = true,
  className
}: PriceInsightBadgeProps) {
  const insight = getPriceInsights(currentPrice, city, category)
  
  const getInsightVariant = (insightText: string) => {
    if (insightText.includes('Excelente') || insightText.includes('25%')) {
      return 'success'
    }
    if (insightText.includes('Buen valor') || insightText.includes('debajo')) {
      return 'default'
    }
    if (insightText.includes('premium') || insightText.includes('alta calidad')) {
      return 'secondary'
    }
    return 'outline'
  }

  const getIcon = (insightText: string) => {
    if (insightText.includes('Excelente') || insightText.includes('Buen')) {
      return <TrendDown className="w-3 h-3" weight="bold" />
    }
    if (insightText.includes('premium')) {
      return <TrendUp className="w-3 h-3" weight="bold" />
    }
    return <Minus className="w-3 h-3" weight="bold" />
  }

  const variant = getInsightVariant(insight)
  const icon = getIcon(insight)

  const content = (
    <Badge 
      variant={variant as any}
      className={cn("gap-1 text-xs", className)}
    >
      {icon}
      {insight.split(' - ')[0]}
    </Badge>
  )

  if (!showTooltip) {
    return content
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{insight}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface PriceDisplayProps {
  price: number
  previousPrice?: number
  period?: string
  size?: 'sm' | 'md' | 'lg'
  showInsight?: boolean
  city?: string
  category?: string
  className?: string
}

export function PriceDisplay({
  price,
  previousPrice,
  period = 'noche',
  size = 'md',
  showInsight = false,
  city,
  category,
  className
}: PriceDisplayProps) {
  const formattedPrice = formatPrice(price)
  const formattedPreviousPrice = previousPrice ? formatPrice(previousPrice) : null
  const hasDiscount = previousPrice && previousPrice > price
  const discountPercent = hasDiscount 
    ? Math.round(((previousPrice - price) / previousPrice) * 100)
    : 0

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline gap-2 flex-wrap">
        {hasDiscount && (
          <span className="text-muted-foreground line-through text-sm">
            {formattedPreviousPrice}
          </span>
        )}
        <span className={cn("font-bold text-primary", sizeClasses[size])}>
          {formattedPrice}
        </span>
        <span className="text-muted-foreground text-sm">
          / {period}
        </span>
        {hasDiscount && (
          <Badge variant="destructive" className="ml-2">
            -{discountPercent}%
          </Badge>
        )}
      </div>
      
      {showInsight && city && category && (
        <PriceInsightBadge 
          currentPrice={price}
          city={city}
          category={category}
        />
      )}
    </div>
  )
}

interface SeasonalPricingInfoProps {
  basePrice: number
  highSeasonPrice: number
  lowSeasonPrice: number
  className?: string
}

export function SeasonalPricingInfo({
  basePrice,
  highSeasonPrice,
  lowSeasonPrice,
  className
}: SeasonalPricingInfoProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-1 text-xs text-muted-foreground cursor-help", className)}>
            <Info className="w-4 h-4" />
            <span>Precios según temporada</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Temporada baja:</span>
              <span className="font-medium">{formatPrice(lowSeasonPrice)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Precio base:</span>
              <span className="font-medium">{formatPrice(basePrice)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Temporada alta:</span>
              <span className="font-medium text-primary">{formatPrice(highSeasonPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 pt-2 border-t">
              Los precios varían según disponibilidad y fechas específicas
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
