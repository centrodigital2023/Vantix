import { OptimizedDestinationCard } from './OptimizedDestinationCard'
import { EnrichedDestination } from '@/lib/api/sync'

interface DestinationCardProps {
  destination: EnrichedDestination
  onClick?: () => void
  delay?: number
  featured?: boolean
}

export function DestinationCard({ destination, onClick, delay = 0, featured }: DestinationCardProps) {
  return (
    <OptimizedDestinationCard
      destination={destination}
      onNavigate={onClick ? () => onClick() : undefined}
      delay={delay}
      featured={featured}
    />
  )
}
