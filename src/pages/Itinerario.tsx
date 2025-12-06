import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkle, Calendar, MapPin, Users } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { CATEGORIES, REGIONS } from '@/lib/data'

export function Itinerario() {
  const [category, setCategory] = useState<string>()
  const [region, setRegion] = useState<string>()
  const [days, setDays] = useState<string>()
  const [travelers, setTravelers] = useState<string>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedItinerary, setSavedItinerary] = useKV<any>('current-itinerary', null)

  const generateItinerary = async () => {
    if (!category || !region || !days || !travelers) {
      toast.error('Por favor completa todos los campos')
      return
    }

    setIsGenerating(true)
    
    try {
      const promptText = `Genera un itinerario detallado de viaje para Colombia con los siguientes parámetros:
      - Categoría: ${category}
      - Región: ${region}
      - Duración: ${days} días
      - Número de viajeros: ${travelers}
      
      Incluye recomendaciones de alojamiento, restaurantes, actividades y consejos prácticos.
      Retorna el resultado como JSON con la siguiente estructura:
      {
        "title": "Título del itinerario",
        "days": [
          {
            "day": 1,
            "title": "Día 1",
            "activities": ["Actividad 1", "Actividad 2"],
            "accommodation": "Nombre del alojamiento",
            "dining": ["Restaurante 1", "Restaurante 2"]
          }
        ]
      }`
      
      const result = await window.spark.llm(promptText, 'gpt-4o-mini', true)
      const itinerary = JSON.parse(result)
      
      setSavedItinerary((current: any) => itinerary)
      toast.success('¡Itinerario generado con éxito!')
    } catch (error) {
      toast.error('Error al generar el itinerario')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
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
            Crea tu itinerario personalizado con inteligencia artificial. Gemini y SerpApi generan el plan perfecto para tu viaje.
          </p>
        </div>

        <Card className="p-8 mb-8">
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

        {savedItinerary && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">{savedItinerary.title}</h2>
            
            <div className="space-y-8">
              {savedItinerary.days?.map((day: any) => (
                <div key={day.day} className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-3">{day.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Actividades</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {day.activities?.map((activity: string, idx: number) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {day.accommodation && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Alojamiento</h4>
                        <p>{day.accommodation}</p>
                      </div>
                    )}
                    
                    {day.dining && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Gastronomía</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {day.dining.map((restaurant: string, idx: number) => (
                            <li key={idx}>{restaurant}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}