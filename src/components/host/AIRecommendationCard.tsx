import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkle, 
  Camera, 
  CurrencyDollar, 
  FileText, 
  CheckCircle,
  Calendar,
  Package
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface AIRecommendation {
  id: string
  type: 'price' | 'photos' | 'description' | 'amenities' | 'availability' | 'package'
  message: string
  impact: string
  priority: 'high' | 'medium' | 'low'
}

interface AIRecommendationCardProps {
  recommendations: AIRecommendation[]
  onTakeAction?: (recommendationId: string) => void
}

export function AIRecommendationCard({ recommendations, onTakeAction }: AIRecommendationCardProps) {
  const getIcon = (type: string) => {
    const icons = {
      price: <CurrencyDollar className="w-5 h-5" weight="bold" />,
      photos: <Camera className="w-5 h-5" weight="bold" />,
      description: <FileText className="w-5 h-5" weight="bold" />,
      amenities: <CheckCircle className="w-5 h-5" weight="bold" />,
      availability: <Calendar className="w-5 h-5" weight="bold" />,
      package: <Package className="w-5 h-5" weight="bold" />
    }
    return icons[type as keyof typeof icons] || <Sparkle className="w-5 h-5" weight="bold" />
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const getPriorityLabel = (priority: string) => {
    const labels = {
      high: 'Alta Prioridad',
      medium: 'Media Prioridad',
      low: 'Baja Prioridad'
    }
    return labels[priority as keyof typeof labels] || 'Normal'
  }

  if (recommendations.length === 0) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" weight="bold" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            ¡Todo está optimizado!
          </h3>
          <p className="text-sm text-muted-foreground">
            No hay recomendaciones pendientes en este momento. Sigue así.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkle className="w-6 h-6 text-primary" weight="fill" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Recomendaciones IA</h3>
            <p className="text-sm text-muted-foreground">
              Optimiza tus alojamientos para aumentar reservas
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md',
                getPriorityColor(rec.priority)
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getIcon(rec.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-semibold text-sm">{rec.message}</p>
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      {getPriorityLabel(rec.priority)}
                    </Badge>
                  </div>
                  
                  <p className="text-xs opacity-80 mb-3">{rec.impact}</p>
                  
                  <Button 
                    size="sm" 
                    onClick={() => onTakeAction?.(rec.id)}
                    className="h-8"
                  >
                    Aplicar ahora →
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
