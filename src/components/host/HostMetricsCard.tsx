import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface HostMetricsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function HostMetricsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor,
  iconBg,
  description,
  actionLabel,
  onAction
}: HostMetricsCardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="w-3 h-3" />
    if (change > 0) return <TrendUp className="w-3 h-3" weight="bold" />
    return <TrendDown className="w-3 h-3" weight="bold" />
  }

  const getTrendColor = () => {
    if (!change) return 'text-muted-foreground'
    if (change > 0) return 'text-green-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
              <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
              
              {change !== undefined && (
                <div className="flex items-center gap-2">
                  <div className={cn('flex items-center gap-1', getTrendColor())}>
                    {getTrendIcon()}
                    <span className="text-sm font-semibold">{Math.abs(change)}%</span>
                  </div>
                  {changeLabel && (
                    <span className="text-xs text-muted-foreground">{changeLabel}</span>
                  )}
                </div>
              )}

              {description && (
                <p className="text-xs text-muted-foreground mt-2">{description}</p>
              )}

              {actionLabel && onAction && (
                <button
                  onClick={onAction}
                  className="text-xs font-medium text-primary hover:underline mt-2"
                >
                  {actionLabel} →
                </button>
              )}
            </div>

            <div className={cn('p-3 rounded-xl', iconBg)}>
              <div className={iconColor}>{icon}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
