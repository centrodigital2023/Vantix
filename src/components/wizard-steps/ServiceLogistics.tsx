import { Button } from '@/components/ui/button'
import { ServiceCategory, Service } from '@/lib/types-services'

interface ServiceLogisticsProps {
  category: ServiceCategory
  data: Partial<Service>
  onNext: (data: Partial<Service>) => void
  onPrevious: () => void
}

export function ServiceLogistics({ category, data, onNext, onPrevious }: ServiceLogisticsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Logística del Servicio</h2>
        <p className="text-muted-foreground">
          Detalles operativos específicos para tu tipo de servicio
        </p>
      </div>

      <div className="p-6 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Componente en construcción - Paso simplificado para MVP
        </p>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Atrás
        </Button>
        <Button type="submit">
          Continuar
        </Button>
      </div>
    </form>
  )
}
