import { memo } from 'react'
import { Circle } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export type PresenceStatus = 'online' | 'offline' | 'away'

interface PresenceIndicatorProps {
  status: PresenceStatus
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showTooltip?: boolean
  className?: string
  lastActivity?: number
}

export const PresenceIndicator = memo(function PresenceIndicator({
  status,
  label,
  size = 'md',
  showLabel = true,
  showTooltip = true,
  className,
  lastActivity
}: PresenceIndicatorProps) {
  const statusConfig = {
    online: {
      color: 'text-success',
      bgColor: 'bg-success',
      label: label || 'En línea',
      description: 'Disponible ahora para responder'
    },
    offline: {
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      label: label || 'Desconectado',
      description: 'No disponible actualmente'
    },
    away: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
      label: label || 'Ausente',
      description: 'Podría responder con retraso'
    }
  }

  const config = statusConfig[status]

  const sizeConfig = {
    sm: {
      circleSize: 6,
      badgeClass: 'text-xs px-2 py-0.5',
      fontSize: 'text-xs'
    },
    md: {
      circleSize: 8,
      badgeClass: 'text-xs px-2.5 py-1',
      fontSize: 'text-sm'
    },
    lg: {
      circleSize: 10,
      badgeClass: 'text-sm px-3 py-1.5',
      fontSize: 'text-base'
    }
  }

  const sizeSettings = sizeConfig[size]

  const getTimeAgo = () => {
    if (!lastActivity) return ''
    const now = Date.now()
    const diff = now - lastActivity
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 1) return 'hace un momento'
    if (minutes < 60) return `hace ${minutes} min`
    if (hours < 24) return `hace ${hours} h`
    return 'hace más de 1 día'
  }

  const indicator = (
    <Badge 
      variant="outline" 
      className={cn(
        'flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border-border/50',
        sizeSettings.badgeClass,
        className
      )}
    >
      <Circle 
        size={sizeSettings.circleSize} 
        weight="fill" 
        className={cn(
          config.bgColor,
          status === 'online' && 'animate-pulse'
        )}
      />
      {showLabel && (
        <span className={cn('font-medium', sizeSettings.fontSize)}>
          {config.label}
        </span>
      )}
    </Badge>
  )

  if (!showTooltip) {
    return indicator
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          {indicator}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">{config.description}</p>
            {lastActivity && status !== 'offline' && (
              <p className="text-xs text-muted-foreground mt-1">
                Última actividad: {getTimeAgo()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

export const PresenceDot = memo(function PresenceDot({ 
  status, 
  size = 8 
}: { 
  status: PresenceStatus
  size?: number
}) {
  const statusColors = {
    online: 'bg-success',
    offline: 'bg-muted',
    away: 'bg-yellow-500'
  }

  return (
    <Circle
      size={size}
      weight="fill"
      className={cn(
        statusColors[status],
        status === 'online' && 'animate-pulse'
      )}
    />
  )
})
