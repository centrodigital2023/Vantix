import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ServiceCategory, Service, SERVICE_CATEGORY_LABELS } from '@/lib/types-services'
import { MapPin, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ServiceBasicInfoProps {
  category: ServiceCategory
  data: Partial<Service>
  onNext: (data: Partial<Service>) => void
  onPrevious: () => void
}

export function ServiceBasicInfo({ category, data, onNext, onPrevious }: ServiceBasicInfoProps) {
  const [formData, setFormData] = useState({
    name: data.name || '',
    location: data.location || {
      address: '',
      city: '',
      department: 'Nariño',
      coordinates: undefined
    },
    coverage_area: data.coverage_area || '',
    short_description: data.short_description || ''
  })

  const [aiSuggestion, setAiSuggestion] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAITitle = async () => {
    if (!formData.location.city) {
      toast.error('Ingresa primero la ciudad para generar sugerencias')
      return
    }

    setIsGenerating(true)
    
    try {
      const categoryLabel = SERVICE_CATEGORY_LABELS[category]
      const prompt = window.spark.llmPrompt`Título atractivo SEO (máx 50 chars) para servicio "${categoryLabel}" en ${formData.location.city}, ${formData.location.department}, Colombia. Incluye ubicación. Solo título.`

      const result = await window.spark.llm(prompt, 'gpt-4o-mini')
      setAiSuggestion(result.trim())
      toast.success('¡Sugerencia generada por IA!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      
      if (errorMessage.includes('400') || errorMessage.toLowerCase().includes('bad request')) {
        toast.error('Error 400: Datos demasiado largos. Intenta con un nombre más corto.')
      } else {
        toast.error('Error al generar sugerencia')
      }
      
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('El nombre del servicio es obligatorio')
      return
    }

    if (!formData.location.city.trim()) {
      toast.error('La ciudad es obligatoria')
      return
    }

    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Información Básica</h2>
        <p className="text-muted-foreground">
          Comencemos con los datos principales de tu servicio de {SERVICE_CATEGORY_LABELS[category].toLowerCase()}
        </p>
      </div>

      {/* Nombre del Servicio */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Nombre del servicio <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <Input
            id="name"
            placeholder="Ej: Tour Café y Naturaleza - Buesaco"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            maxLength={80}
            required
          />
          <Button
            type="button"
            variant="outline"
            onClick={generateAITitle}
            disabled={isGenerating}
            className="flex-shrink-0"
          >
            <Sparkle className="mr-2" weight={isGenerating ? 'fill' : 'regular'} />
            {isGenerating ? 'Generando...' : 'IA'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {formData.name.length}/80 caracteres
        </p>
        
        {aiSuggestion && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
            <p className="text-sm font-medium mb-1">💡 Sugerencia de la IA:</p>
            <p className="text-sm mb-2">{aiSuggestion}</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setFormData({ ...formData, name: aiSuggestion })}
            >
              Usar esta sugerencia
            </Button>
          </div>
        )}
      </div>

      {/* Ubicación */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin weight="fill" className="text-primary" />
          <h3 className="font-semibold">Ubicación</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Departamento</Label>
            <Input
              id="department"
              value={formData.location.department}
              onChange={(e) => setFormData({
                ...formData,
                location: { ...formData.location, department: e.target.value }
              })}
              placeholder="Nariño"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              Ciudad / Municipio <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              value={formData.location.city}
              onChange={(e) => setFormData({
                ...formData,
                location: { ...formData.location, city: e.target.value }
              })}
              placeholder="Ej: Pasto, Buesaco, Ipiales"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección / Punto de referencia</Label>
          <Input
            id="address"
            value={formData.location.address}
            onChange={(e) => setFormData({
              ...formData,
              location: { ...formData.location, address: e.target.value }
            })}
            placeholder="Ej: Vereda La Palma, km 5 vía a Buesaco"
          />
        </div>
      </div>

      {/* Zona de Cobertura */}
      <div className="space-y-2">
        <Label htmlFor="coverage">Zona de cobertura (opcional)</Label>
        <Input
          id="coverage"
          value={formData.coverage_area}
          onChange={(e) => setFormData({ ...formData, coverage_area: e.target.value })}
          placeholder="Ej: Todo el departamento de Nariño"
        />
        <p className="text-xs text-muted-foreground">
          Si tu servicio cubre varias zonas o municipios, indícalo aquí
        </p>
      </div>

      {/* Descripción Corta */}
      <div className="space-y-2">
        <Label htmlFor="short_description">Descripción corta</Label>
        <Textarea
          id="short_description"
          value={formData.short_description}
          onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
          placeholder="Una breve descripción de tu servicio (se mostrará en las tarjetas)"
          rows={3}
          maxLength={200}
        />
        <p className="text-xs text-muted-foreground">
          {formData.short_description.length}/200 caracteres
        </p>
      </div>

      {/* Buttons */}
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
