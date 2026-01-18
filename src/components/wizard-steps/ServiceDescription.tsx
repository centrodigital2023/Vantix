import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ServiceCategory, Service, SERVICE_CATEGORY_LABELS } from '@/lib/types-services'
import { Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ServiceDescriptionProps {
  category: ServiceCategory
  data: Partial<Service>
  onNext: (data: Partial<Service>) => void
  onPrevious: () => void
}

export function ServiceDescription({ category, data, onNext, onPrevious }: ServiceDescriptionProps) {
  const [formData, setFormData] = useState({
    description: data.description || '',
    duration: data.duration || '',
    physical_level: data.physical_level || 'easy' as const,
    languages: data.languages || ['Español'],
    target_audience: data.target_audience || [],
    includes: data.includes || []
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [newInclude, setNewInclude] = useState('')

  const generateAIDescription = async () => {
    if (!data.name || !data.location?.city) {
      toast.error('Necesitas completar el paso anterior primero')
      return
    }

    setIsGenerating(true)
    
    try {
      const categoryLabel = SERVICE_CATEGORY_LABELS[category]
      // @ts-expect-error - TypeScript incorrectly infers template literal type
      const prompt = window.spark.llmPrompt`Description 150-300 words: ${categoryLabel} "${data.name}" in ${data.location.city}, ${data.location.department}, Colombia. Highlight unique experience, culture, nature. Poetic, clear. Spanish only.`

      const result = await window.spark.llm(prompt, 'gpt-4o')
      setFormData({ ...formData, description: result.trim() })
      toast.success('¡Descripción generada por IA!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      
      if (errorMessage.includes('400') || errorMessage.toLowerCase().includes('bad request')) {
        toast.error('Prompt demasiado largo. Intenta con un nombre más corto.')
      } else {
        toast.error('Error al generar descripción')
      }
      
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const addInclude = () => {
    if (newInclude.trim()) {
      setFormData({
        ...formData,
        includes: [...formData.includes, newInclude.trim()]
      })
      setNewInclude('')
    }
  }

  const removeInclude = (index: number) => {
    setFormData({
      ...formData,
      includes: formData.includes.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.description.trim()) {
      toast.error('La descripción es obligatoria')
      return
    }

    if (formData.includes.length === 0) {
      toast.error('Agrega al menos 1 elemento incluido')
      return
    }

    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Descripción del Servicio</h2>
        <p className="text-muted-foreground">
          Describe tu servicio de manera atractiva para captar la atención de los viajeros
        </p>
      </div>

      {/* Descripción Principal */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description">
            Descripción <span className="text-destructive">*</span>
          </Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={generateAIDescription}
            disabled={isGenerating}
          >
            <Sparkle className="mr-2" weight={isGenerating ? 'fill' : 'regular'} />
            {isGenerating ? 'Generando...' : 'Generar con IA'}
          </Button>
        </div>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe la experiencia que ofreces..."
          rows={8}
          required
          minLength={150}
        />
        <p className="text-xs text-muted-foreground">
          {formData.description.length} caracteres (mínimo 150)
        </p>
      </div>

      {/* Duración */}
      <div className="space-y-2">
        <Label htmlFor="duration">Duración</Label>
        <Input
          id="duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="Ej: 3 horas, 1 día completo, 2 días / 1 noche"
        />
      </div>

      {/* Nivel Físico */}
      <div className="space-y-2">
        <Label>Nivel de exigencia física</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'easy', label: 'Fácil', emoji: '😊' },
            { value: 'moderate', label: 'Moderado', emoji: '🚶' },
            { value: 'hard', label: 'Difícil', emoji: '🥾' },
            { value: 'extreme', label: 'Extremo', emoji: '⛰️' }
          ].map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setFormData({ ...formData, physical_level: level.value as any })}
              className={`
                p-4 border-2 rounded-lg transition-all text-center
                ${formData.physical_level === level.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="text-2xl mb-1">{level.emoji}</div>
              <div className="text-sm font-medium">{level.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Qué incluye */}
      <div className="space-y-2">
        <Label>¿Qué incluye? <span className="text-destructive">*</span></Label>
        <div className="flex gap-2">
          <Input
            value={newInclude}
            onChange={(e) => setNewInclude(e.target.value)}
            placeholder="Ej: Guía profesional, Refrigerio, Transporte"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclude())}
          />
          <Button type="button" onClick={addInclude}>
            Agregar
          </Button>
        </div>
        {formData.includes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full"
              >
                <span className="text-sm">✓ {item}</span>
                <button
                  type="button"
                  onClick={() => removeInclude(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
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
