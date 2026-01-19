import { EnrichedDestination } from '@/lib/api/sync'
import { OptimizedDestinationCard } from './OptimizedDestinationCard'
import { useEffect, useState, useRef, useCallback } from 'react'

interface VirtualizedDestinationGridProps {
  destinations: EnrichedDestination[]
  onNavigate?: (page: string, id?: string) => void
  columns?: number
}

export function VirtualizedDestinationGrid({ 
  destinations, 
  onNavigate,
  columns = 3 
}: VirtualizedDestinationGridProps) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 12 })
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    setVisibleRange(prev => ({
      start: prev.start,
      end: Math.min(prev.end + 12, destinations.length)
    }))
  }, [destinations.length])

  useEffect(() => {
    if (!sentinelRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleRange.end < destinations.length) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    observerRef.current.observe(sentinelRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadMore, visibleRange.end, destinations.length])

  const visibleDestinations = destinations.slice(visibleRange.start, visibleRange.end)

  return (
    <div ref={containerRef}>
      <div className={`grid gap-6 ${
        columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
        columns === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
        columns === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        'grid-cols-1'
      }`}>
        {visibleDestinations.map((destination) => (
          <OptimizedDestinationCard
            key={destination.id}
            destination={destination}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      
      {visibleRange.end < destinations.length && (
        <div ref={sentinelRef} className="h-20 flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}
