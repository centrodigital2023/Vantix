import { Card, CardContent } from '@/components/ui/card'
import { 
  Star,
  Currency
  Star,
  Heart,
  CurrencyCircleDollar, 
  Calendar,
} from '@phosphor-icons/react'
import { EnrichedDestination } from '@/lib/api/sync'
import { memo, useState, useCallback } from 'react'
import { toast } from 'sonner'

interface OptimizedDestinationCardProps {
  destination: EnrichedDestination
  onNavigate?: (page: string, id?: string) => void
      maximumFra
 

    ? destination.images 

    e.stopPro
    toast.s
      {
        duration: 2000
    )

    e.stopPropagation()
  }, [])
  const handleViewDetail
    if (onNavigate) {
    }

    <Card 
   

          src={images[0]} 
          className="w-full h-full object-cover transition-transform 
          onError={(e) =>
            if (!imag

          }}

          onClick={handleFavor
        >
            size={20} 
       
        </button>
        <div className
       
     
          </div>

  const handleReserve = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toast.info('Abriendo reserva...', { duration: 1500 })
  }, [])

  const handleViewDetails = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (onNavigate) {
      onNavigate('destino-resultados', destination.id)
    }
  }, [onNavigate, destination.id])

          
          
              <span className="text-lg font-bold">
              </span>
     

          <Bu
            variant="outli
            className="flex-1"
            Ver más
          <Button
            onClick={handle
          >
            Reservar
        </div>
    </Card>
})
OptimizedDes





        >

            size={20} 














      



            {destination.name}

          


          </p>

        









              </span>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Desde</p>
            <div className="flex items-center gap-1 text-primary">


                {formatPrice(destination.price)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleViewDetails}
            className="flex-1"
          >
            Ver más
          </Button>
          <Button
            size="sm"
            onClick={handleReserve}
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Calendar size={16} />
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})


