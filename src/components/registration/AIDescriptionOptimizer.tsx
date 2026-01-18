import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Sparkle, Lightbulb, CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface AIDescriptionOptimizerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  label?: string
  helpText?: string
}

export function AIDescriptionOptimizer({
  value,
  onChange,
  placeholder = "Describe tu propiedad...",
  maxLength = 2000,
  label = "Descripción",
  helpText = "Escribe una descripción inicial y la IA la mejorará"
}: AIDescriptionOptimizerProps) {
  const [optimizedVersion, setOptimizedVersion] = useState<string>('')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleOptimize = async () => {
    if (!value.trim() || value.length < 50) {
      return
    }

    setIsOptimizing(true)
    setShowSuggestion(false)

    try {
      // @ts-expect-error - TypeScript incorrectly infers template literal type
      const prompt = window.spark.llmPrompt`Optimize for tourism platforms (Booking/Airbnb): ${value.substring(0, 150)}... Max ${maxLength} chars. Make evocative, professional, SEO-friendly, Spanish. Only response.`

      const optimized = await window.spark.llm(prompt, 'gpt-4o')
      
      setOptimizedVersion(optimized.trim())
      setShowSuggestion(true)
    } catch (error) {
      console.error('Error optimizing description:', error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleAccept = () => {
    onChange(optimizedVersion)
    setShowSuggestion(false)
    setOptimizedVersion('')
  }

  const handleReject = () => {
    setShowSuggestion(false)
    setOptimizedVersion('')
  }

  const canOptimize = value.trim().length >= 50 && !isOptimizing

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
          <span className={cn(
            "text-xs",
            value.length > maxLength * 0.9 ? "text-orange-500" : "text-muted-foreground"
          )}>
            {value.length} / {maxLength}
          </span>
        </div>
        
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={8}
          className="resize-none"
        />
        
        {helpText && (
          <p className="text-xs text-muted-foreground flex items-start gap-1">
            <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
            {helpText}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleOptimize}
          disabled={!canOptimize}
          className="w-full"
        >
          <Sparkle className="w-4 h-4 mr-2" weight="fill" />
          {isOptimizing ? 'Optimizando...' : 'Optimizar con IA'}
        </Button>
      </div>

      {showSuggestion && optimizedVersion && (
        <Card className="p-4 border-primary/50 bg-primary/5 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Sparkle className="w-5 h-5" weight="fill" />
              <span className="font-semibold text-sm">Versión Optimizada por IA</span>
            </div>
            
            <div className="bg-background rounded-lg p-4 text-sm leading-relaxed border">
              {optimizedVersion}
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleAccept}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" weight="fill" />
                Usar esta versión
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReject}
              >
                Mantener original
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
