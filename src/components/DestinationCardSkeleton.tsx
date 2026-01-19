import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DestinationCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      
      <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
        <div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t mt-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          
          <div className="text-right">
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}

interface DestinationGridSkeletonProps {
  count?: number
  columns?: number
}

export function DestinationGridSkeleton({ 
  count = 6,
  columns = 3 
}: DestinationGridSkeletonProps) {
  return (
    <div className={`grid gap-6 ${
      columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :
      columns === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
      columns === 2 ? 'grid-cols-1 sm:grid-cols-2' :
      'grid-cols-1'
    }`}>
      {Array.from({ length: count }).map((_, i) => (
        <DestinationCardSkeleton key={i} />
      ))}
    </div>
  )
}
