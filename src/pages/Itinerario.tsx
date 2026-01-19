import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Sparkle, Calendar, MapPin, Users, Check, Download, Share, Clock, CurrencyCircleDollar, Airplane } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { CATEGORIES, REGIONS } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'

interface ItineraryDay {
  day: number
  title: string
  activities: string[]
  meals?: string[]
  accommodation?: string
  dining?: string[]
  estimatedCost?: number
  transportation?: string
}

interface GeneratedItinerary {
  title: string
  days: ItineraryDay[]
  totalEstimatedCost?: number
  tips?: string[]
  bestTimeToVisit?: string
}

export function Itinerario() {
  const [category, setCategory] = useState<string>()
  const [region, setRegion] = useState<string>()
  const [days, setDays] = useState<string>()
  const [travelers, setTravelers] = useState<string>()
  const [additionalPreferences, setAdditionalPreferences] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [savedItinerary, setSavedItinerary] = useKV<GeneratedItinerary | null>('current-itinerary', null)
  const [itineraryHistory, setItineraryHistory] = useKV<GeneratedItinerary[]>('itinerary-history', [])
  const [activeView, setActiveView] = useState<'generator' | 'itinerary' | 'history'>('generator')

  const generateItinerary = async () => {
    if (!category || !region || !days || !travelers) {
      toast.error('Por favor completa todos los campos obligatorios')
      return
    }

    const daysNum = parseInt(days)
    if (daysNum > 7) {
      toast.error('La duración máxima es de 7 días')
      return
    }

    setIsGenerating(true)
    setProgress(0)
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 500)
    
    try {
      const preferencesText = additionalPreferences ? `Preferencias adicionales: ${additionalPreferences}` : ''
      
      const prompt = window.spark.llmPrompt`Genera un itinerario detallado de viaje de ${days} días para ${travelers} personas en la región ${region} de Colombia con enfoque en ${category}.

${preferencesText}

Devuelve ÚNICAMENTE un objeto JSON válido con esta estructura exacta (sin texto adicional):
{
  "title": "Título atractivo del itinerario",
  "days": [
    {
      "day": 1,
      "title": "Título del día",
      "activities": ["Actividad 1", "Actividad 2", "Actividad 3"],
      "dining": ["Restaurante recomendado 1", "Restaurante recomendado 2"],
      "accommodation": "Sugerencia de alojamiento",
      "estimatedCost": 250000,
      "transportation": "Medio de transporte sugerido"
    }
  ],
  "totalEstimatedCost": 1500000,
  "tips": ["Consejo 1", "Consejo 2", "Consejo 3"],
  "bestTimeToVisit": "Mejor época del año para visitar"
}`
      
      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      
      clearInterval(progressInterval)
      setProgress(100)
      
      const itinerary = JSON.parse(result) as GeneratedItinerary
      
      setSavedItinerary((current: any) => itinerary)
      setItineraryHistory((current: GeneratedItinerary[]) => {
        const updated = [itinerary, ...current].slice(0, 10)
        return updated
      })
      
      setActiveView('itinerary')
      toast.success('¡Itinerario generado con éxito!')
    } catch (error) {
      clearInterval(progressInterval)
      setProgress(0)
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      
      if (errorMessage.includes('400') || errorMessage.toLowerCase().includes('bad request')) {
        toast.error('El prompt es demasiado largo. Intenta reducir la duración del viaje.')
      } else if (errorMessage.includes('401') || errorMessage.toLowerCase().includes('unauthorized')) {
        toast.error('Error de autenticación con la API')
      } else if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('rate limit')) {
        toast.error('Límite de solicitudes alcanzado. Intenta en unos minutos.')
      } else {
        toast.error('Error al generar el itinerario')
      }
      
      console.error('Error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadItinerary = () => {
    if (!savedItinerary) return
    
    const text = `${savedItinerary.title}\n\n${savedItinerary.days.map(day => 
      `DÍA ${day.day}: ${day.title}\n\nActividades:\n${day.activities.map(a => `- ${a}`).join('\n')}\n\nDónde comer:\n${day.dining?.map(d => `- ${d}`).join('\n') || 'No especificado'}\n\nAlojamiento: ${day.accommodation || 'No especificado'}\n\n`
    ).join('\n')}`
    
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `itinerario-${Date.now()}.txt`
    a.click()
    toast.success('Itinerario descargado')
  }

  const shareItinerary = async () => {
    if (!savedItinerary) return
    
    const text = `${savedItinerary.title} - Itinerario generado con VANTIX`
    
    if (navigator.share) {
      try {
        await navigator.share({ title: savedItinerary.title, text })
        toast.success('Itinerario compartido')
      } catch (error) {
        toast.info('Compartir cancelado')
      }
    } else {
      navigator.clipboard.writeText(text)
      toast.success('Título copiado al portapapeles')
    }
  }

  const loadHistoryItem = (itinerary: GeneratedItinerary) => {
    setSavedItinerary((current: any) => itinerary)
    setActiveView('itinerary')
    toast.success('Itinerario cargado')
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkle size={16} weight="fill" className="text-accent" />
            <span className="text-sm font-medium text-accent">Powered by AI</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Itinerario Inteligente
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crea tu itinerario personalizado con inteligencia artificial. GPT-4o-mini genera el plan perfecto para tu viaje.
          </p>
        </div>

        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="generator">Generar</TabsTrigger>
            <TabsTrigger value="itinerary" disabled={!savedItinerary}>Ver Itinerario</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="generator">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Cuéntanos sobre tu viaje</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">¿Qué tipo de experiencia buscas?</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">¿Qué región quieres explorar?</label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una región" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="inline mr-2" size={16} />
                      Duración del viaje
                    </label>
                    <Select value={days} onValueChange={setDays}>
                      <SelectTrigger>
                        <SelectValue placeholder="Días" />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6, 7].map((d) => (
                          <SelectItem key={d} value={d.toString()}>{d} días</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="inline mr-2" size={16} />
                      Número de viajeros
                    </label>
                    <Select value={travelers} onValueChange={setTravelers}>
                      <SelectTrigger>
                        <SelectValue placeholder="Viajeros" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((t) => (
                          <SelectItem key={t} value={t.toString()}>{t} {t === 1 ? 'persona' : 'personas'}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferencias adicionales (opcional)</label>
                  <Textarea
                    placeholder="Ej: Prefiero hoteles boutique, me gusta la fotografía, tengo restricciones alimentarias..."
                    value={additionalPreferences}
                    onChange={(e) => setAdditionalPreferences(e.target.value)}
                    rows={3}
                  />
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-center text-muted-foreground">
                      {progress < 30 && 'Analizando preferencias...'}
                      {progress >= 30 && progress < 60 && 'Buscando mejores destinos...'}
                      {progress >= 60 && progress < 90 && 'Creando itinerario personalizado...'}
                      {progress >= 90 && 'Finalizando...'}
                    </p>
                  </div>
                )}

                <Button 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={generateItinerary}
                  disabled={isGenerating}
                >
                  <Sparkle className="mr-2" weight="fill" />
                  {isGenerating ? 'Generando tu itinerario...' : 'Generar Itinerario con IA'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary">
            <AnimatePresence mode="wait">
              {savedItinerary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="p-8 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{savedItinerary.title}</h2>
                        {savedItinerary.bestTimeToVisit && (
                          <Badge variant="outline" className="gap-1.5">
                            <Clock size={14} />
                            Mejor época: {savedItinerary.bestTimeToVisit}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={downloadItinerary}>
                          <Download size={16} className="mr-2" />
                          Descargar
                        </Button>
                        <Button variant="outline" size="sm" onClick={shareItinerary}>
                          <Share size={16} className="mr-2" />
                          Compartir
                        </Button>
                      </div>
                    </div>

                    {savedItinerary.totalEstimatedCost && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <CurrencyCircleDollar size={24} className="text-primary" />
                          Costo estimado total: ${savedItinerary.totalEstimatedCost.toLocaleString('es-CO')} COP
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-8">
                      {savedItinerary.days?.map((day: ItineraryDay, idx: number) => (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border-l-4 border-primary pl-6"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <Badge className="mb-2">Día {day.day}</Badge>
                              <h3 className="text-xl font-semibold">{day.title}</h3>
                            </div>
                            {day.estimatedCost && (
                              <Badge variant="outline" className="gap-1.5">
                                <CurrencyCircleDollar size={14} />
                                ${day.estimatedCost.toLocaleString('es-CO')}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            {day.transportation && (
                              <div className="flex items-start gap-2">
                                <Airplane size={18} className="text-muted-foreground mt-1 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Transporte</h4>
                                  <p>{day.transportation}</p>
                                </div>
                              </div>
                            )}

                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                <Check size={16} />
                                Actividades
                              </h4>
                              <ul className="space-y-2">
                                {day.activities?.map((activity: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {day.dining && day.dining.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm text-muted-foreground mb-2">Gastronomía</h4>
                                <ul className="space-y-1">
                                  {day.dining.map((restaurant: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-accent mt-1">🍽️</span>
                                      <span>{restaurant}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {day.accommodation && (
                              <div>
                                <h4 className="font-medium text-sm text-muted-foreground mb-1">Alojamiento sugerido</h4>
                                <p className="text-primary">{day.accommodation}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {savedItinerary.tips && savedItinerary.tips.length > 0 && (
                      <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Sparkle size={20} className="text-accent" />
                          Consejos para tu viaje
                        </h3>
                        <ul className="space-y-2">
                          {savedItinerary.tips.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check size={16} className="text-accent mt-1 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Itinerarios generados anteriormente</h2>
              
              {itineraryHistory && itineraryHistory.length > 0 ? (
                <div className="space-y-4">
                  {itineraryHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
                      onClick={() => loadHistoryItem(item)}
                    >
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{item.days?.length || 0} días</Badge>
                        {item.totalEstimatedCost && (
                          <Badge variant="outline">
                            ${item.totalEstimatedCost.toLocaleString('es-CO')} COP
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No hay itinerarios guardados</p>
                  <Button variant="outline" onClick={() => setActiveView('generator')}>
                    Generar tu primer itinerario
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}