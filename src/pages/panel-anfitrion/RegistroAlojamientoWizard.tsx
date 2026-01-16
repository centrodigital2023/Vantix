import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  ArrowRight,
  House,
  MapPin,
  Bed,
  Bathtub,
  WifiHigh,
  Images,
  CurrencyDollar,
  FileText,
  CheckCircle,
  Sparkle,
  Warning,
  Lightbulb,
  TrendUp
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { usePhotoUpload } from '@/hooks/use-photo-upload'
import { PhotoGrid, PhotoUploadZone } from '@/components/PhotoUploadComponents'
import { 
  analyzeProperty, 
  optimizeDescription, 
  suggestOptimalPricing,
  generateTitleSuggestions,
  validateStep,
  type PropertyData,
  type AIOptimizationResult
} from '@/lib/ai-property-optimizer'

interface FormData {
  tipo: string
  categoria: string
  tipoReserva: string
  nombre: string
  pais: string
  region: string
  ciudad: string
  direccion: string
  huespedes: number
  dormitorios: number
  camas: number
  banos: number
  amenidades: string[]
  descripcion: string
  precioPorNoche: number
  gastosLimpieza: number
  estanciaMinima: number
  politicaCancelacion: string
  checkIn: string
  checkOut: string
}

const PASOS = [
  { id: 1, nombre: 'Lo Básico', icono: House },
  { id: 2, nombre: 'Capacidad', icono: Bed },
  { id: 3, nombre: 'Amenidades', icono: WifiHigh },
  { id: 4, nombre: 'Fotos', icono: Images },
  { id: 5, nombre: 'Precios', icono: CurrencyDollar },
  { id: 6, nombre: 'Legal', icono: FileText }
]

export function RegistroAlojamientoWizard({ onComplete }: { onComplete?: () => void }) {
  const [pasoActual, setPasoActual] = useState(1)
  const [formData, setFormData] = useState<Partial<FormData>>({
    amenidades: []
  })
  const [aiAnalysis, setAiAnalysis] = useState<AIOptimizationResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedVeracity, setAcceptedVeracity] = useState(false)

  const photoUpload = usePhotoUpload({
    maxFiles: 20,
    maxSizeMB: 10,
    minWidth: 1024,
    minHeight: 768,
    onUploadComplete: (photos) => {
      console.log('Fotos completadas:', photos.length)
    }
  })

  const progreso = (pasoActual / PASOS.length) * 100

  const actualizarFormData = (campo: string, valor: any) => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
    // Resetear análisis IA cuando cambian datos importantes
    if (['tipo', 'categoria', 'descripcion', 'precioPorNoche', 'amenidades'].includes(campo)) {
      setAiAnalysis(null)
    }
  }

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const propertyData: PropertyData = {
        tipo: formData.tipo,
        categoria: formData.categoria,
        nombre: formData.nombre,
        pais: formData.pais,
        region: formData.region,
        ciudad: formData.ciudad,
        descripcion: formData.descripcion,
        amenidades: formData.amenidades,
        precioPorNoche: formData.precioPorNoche,
        huespedes: formData.huespedes,
        dormitorios: formData.dormitorios,
        camas: formData.camas,
        banos: formData.banos
      }

      const analysis = await analyzeProperty(propertyData)
      setAiAnalysis(analysis)
      setShowAISuggestions(true)
      
      toast.success('¡Análisis IA completado!', {
        description: `Tu anuncio tiene un puntaje de ${analysis.score}/100`
      })
    } catch (error) {
      console.error('Error en análisis IA:', error)
      toast.error('No se pudo completar el análisis IA')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const applyAIDescription = async () => {
    try {
      toast.loading('Generando descripción optimizada...')
      const optimized = await optimizeDescription(formData as PropertyData)
      actualizarFormData('descripcion', optimized)
      toast.success('¡Descripción optimizada aplicada!')
    } catch (error) {
      toast.error('Error al generar descripción')
    }
  }

  const applyAIPricing = async () => {
    try {
      toast.loading('Analizando precios del mercado...')
      const pricing = await suggestOptimalPricing(formData as PropertyData)
      actualizarFormData('precioPorNoche', pricing.recommended)
      toast.success('¡Precio optimizado aplicado!', {
        description: `Precio sugerido: $${pricing.recommended.toLocaleString('es-CO')}`
      })
    } catch (error) {
      toast.error('Error al analizar precios')
    }
  }

  const siguientePaso = () => {
    // Validar paso actual antes de continuar
    const validation = validateStep(pasoActual, formData as PropertyData)
    
    if (!validation.valid) {
      validation.errors.forEach(error => {
        toast.error(error)
      })
      return
    }

    if (pasoActual < PASOS.length) {
      setPasoActual(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const finalizarRegistro = () => {
    // Validación final
    if (!acceptedTerms || !acceptedVeracity) {
      toast.error('Debes aceptar los términos y condiciones')
      return
    }

    if (!photoUpload.hasMinimumPhotos) {
      toast.error('Debes subir al menos 5 fotos de calidad')
      return
    }

    toast.success('¡Alojamiento registrado exitosamente!', {
      description: 'Tu propiedad será revisada en las próximas 24-48 horas'
    })
    onComplete?.()
  }

  const toggleAmenidad = (amenidad: string) => {
    const amenidades = formData.amenidades || []
    if (amenidades.includes(amenidad)) {
      actualizarFormData('amenidades', amenidades.filter(a => a !== amenidad))
    } else {
      actualizarFormData('amenidades', [...amenidades, amenidad])
    }
  }

  // Ejecutar análisis IA automáticamente cuando se completen campos clave
  useEffect(() => {
    if (pasoActual === 5 && formData.precioPorNoche && !aiAnalysis && !isAnalyzing) {
      // Auto-analizar cuando llega al paso de precios
      runAIAnalysis()
    }
  }, [pasoActual, formData.precioPorNoche])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Registra tu Alojamiento</h1>
          <p className="text-muted-foreground">
            Completa la información paso a paso. Toma solo 5-7 minutos
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Paso {pasoActual} de {PASOS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {PASOS[pasoActual - 1].nombre}
            </span>
          </div>
          <Progress value={progreso} className="h-2" />
          
          <div className="flex justify-between mt-6">
            {PASOS.map((paso, index) => {
              const Icono = paso.icono
              const completado = index + 1 < pasoActual
              const actual = index + 1 === pasoActual
              
              return (
                <div key={paso.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      completado
                        ? 'bg-primary text-primary-foreground'
                        : actual
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {completado ? (
                      <CheckCircle size={24} weight="fill" />
                    ) : (
                      <Icono size={24} weight={actual ? 'duotone' : 'regular'} />
                    )}
                  </div>
                  <span className="text-xs text-center hidden md:block max-w-[80px]">
                    {paso.nombre}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pasoActual}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{PASOS[pasoActual - 1].nombre}</CardTitle>
                <CardDescription>
                  {pasoActual === 1 && 'Cuéntanos sobre tu propiedad y su ubicación'}
                  {pasoActual === 2 && 'Define la capacidad y distribución de espacios'}
                  {pasoActual === 3 && 'Selecciona las amenidades disponibles'}
                  {pasoActual === 4 && 'Sube fotos atractivas de tu alojamiento'}
                  {pasoActual === 5 && 'Configura precios y políticas'}
                  {pasoActual === 6 && 'Información legal y términos'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pasoActual === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Alojamiento *</Label>
                      <Select value={formData.tipo} onValueChange={(val) => actualizarFormData('tipo', val)}>
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="apartamento">Apartamento</SelectItem>
                          <SelectItem value="casa-campestre">Casa Campestre</SelectItem>
                          <SelectItem value="hotel-boutique">Hotel Boutique</SelectItem>
                          <SelectItem value="glamping">Glamping</SelectItem>
                          <SelectItem value="hostal">Hostal</SelectItem>
                          <SelectItem value="cabana">Cabaña</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoría *</Label>
                      <Select value={formData.categoria} onValueChange={(val) => actualizarFormData('categoria', val)}>
                        <SelectTrigger id="categoria">
                          <SelectValue placeholder="Selecciona la categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="hostal">Hostal / Pensión</SelectItem>
                          <SelectItem value="casa-rural">Casa Rural</SelectItem>
                          <SelectItem value="agroturismo">Agroturismo</SelectItem>
                          <SelectItem value="posada">Posada</SelectItem>
                          <SelectItem value="resort">Resort</SelectItem>
                          <SelectItem value="apartahotel">Apartahotel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoReserva">¿Qué se puede reservar? *</Label>
                      <Select value={formData.tipoReserva} onValueChange={(val) => actualizarFormData('tipoReserva', val)}>
                        <SelectTrigger id="tipoReserva">
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entero">Alojamiento Entero</SelectItem>
                          <SelectItem value="privado">Habitación Privada</SelectItem>
                          <SelectItem value="compartido">Habitación Compartida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre del Anuncio *</Label>
                      <Input
                        id="nombre"
                        placeholder="Ej: Casa Campestre con Vista al Volcán"
                        maxLength={50}
                        value={formData.nombre || ''}
                        onChange={(e) => actualizarFormData('nombre', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        {(formData.nombre || '').length}/50 caracteres
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pais">País *</Label>
                        <Select value={formData.pais} onValueChange={(val) => actualizarFormData('pais', val)}>
                          <SelectTrigger id="pais">
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="colombia">Colombia</SelectItem>
                            <SelectItem value="mexico">México</SelectItem>
                            <SelectItem value="peru">Perú</SelectItem>
                            <SelectItem value="ecuador">Ecuador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="region">Región / Departamento *</Label>
                        <Input
                          id="region"
                          placeholder="Ej: Nariño"
                          value={formData.region || ''}
                          onChange={(e) => actualizarFormData('region', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad / Municipio *</Label>
                      <Input
                        id="ciudad"
                        placeholder="Ej: Pasto, Buesaco"
                        value={formData.ciudad || ''}
                        onChange={(e) => actualizarFormData('ciudad', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección Exacta *</Label>
                      <Input
                        id="direccion"
                        placeholder="Calle, número, referencias"
                        value={formData.direccion || ''}
                        onChange={(e) => actualizarFormData('direccion', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta información solo se compartirá después de la reserva
                      </p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg border-2 border-dashed">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin size={24} weight="duotone" className="text-primary" />
                        <p className="font-medium">Mapa Interactivo</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Próximamente: arrastra el pin para ajustar la ubicación exacta
                      </p>
                    </div>
                  </>
                )}

                {pasoActual === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="huespedes">Huéspedes Máximos *</Label>
                      <Input
                        id="huespedes"
                        type="number"
                        min="1"
                        max="50"
                        value={formData.huespedes || ''}
                        onChange={(e) => actualizarFormData('huespedes', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dormitorios">Número de Dormitorios *</Label>
                      <Input
                        id="dormitorios"
                        type="number"
                        min="0"
                        max="20"
                        value={formData.dormitorios || ''}
                        onChange={(e) => actualizarFormData('dormitorios', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="camas">Número Total de Camas *</Label>
                      <Input
                        id="camas"
                        type="number"
                        min="0"
                        max="50"
                        value={formData.camas || ''}
                        onChange={(e) => actualizarFormData('camas', parseInt(e.target.value) || 0)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Incluye todas las camas: individuales, dobles, literas, etc.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="banos">Número de Baños *</Label>
                      <Input
                        id="banos"
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={formData.banos || ''}
                        onChange={(e) => actualizarFormData('banos', parseFloat(e.target.value) || 0)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Puedes usar 0.5 para medio baño (sin ducha)
                      </p>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Bed size={20} weight="duotone" className="text-primary" />
                        <p className="font-medium text-sm">Resumen de Capacidad</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Huéspedes:</span>{' '}
                          <span className="font-medium">{formData.huespedes || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dormitorios:</span>{' '}
                          <span className="font-medium">{formData.dormitorios || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Camas:</span>{' '}
                          <span className="font-medium">{formData.camas || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Baños:</span>{' '}
                          <span className="font-medium">{formData.banos || 0}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {pasoActual === 3 && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-3">Esenciales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['WiFi', 'Cocina', 'TV', 'Aire Acondicionado', 'Calefacción', 'Agua Caliente'].map(amenidad => (
                            <div key={amenidad} className="flex items-center space-x-2">
                              <Checkbox
                                id={amenidad}
                                checked={formData.amenidades?.includes(amenidad)}
                                onCheckedChange={() => toggleAmenidad(amenidad)}
                              />
                              <label
                                htmlFor={amenidad}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {amenidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Seguridad</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Detector de Humo', 'Detector de CO', 'Botiquín', 'Extintor', 'Cámaras Seguridad'].map(amenidad => (
                            <div key={amenidad} className="flex items-center space-x-2">
                              <Checkbox
                                id={amenidad}
                                checked={formData.amenidades?.includes(amenidad)}
                                onCheckedChange={() => toggleAmenidad(amenidad)}
                              />
                              <label
                                htmlFor={amenidad}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {amenidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Extras LATAM</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Piscina', 'Jacuzzi', 'Jardín', 'Terraza', 'Parqueadero', 'Admite Mascotas', 'Desayuno Incluido', 'Check-in Autónomo'].map(amenidad => (
                            <div key={amenidad} className="flex items-center space-x-2">
                              <Checkbox
                                id={amenidad}
                                checked={formData.amenidades?.includes(amenidad)}
                                onCheckedChange={() => toggleAmenidad(amenidad)}
                              />
                              <label
                                htmlFor={amenidad}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {amenidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-secondary/10 rounded-lg">
                        <p className="text-sm font-medium mb-1">Amenidades seleccionadas</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.amenidades && formData.amenidades.length > 0 ? (
                            formData.amenidades.map(amenidad => (
                              <Badge key={amenidad} variant="secondary">
                                {amenidad}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">Ninguna seleccionada</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="descripcion">Descripción del Alojamiento *</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={applyAIDescription}
                          className="gap-2"
                        >
                          <Sparkle size={16} weight="duotone" />
                          Optimizar con IA
                        </Button>
                      </div>
                      <Textarea
                        id="descripcion"
                        placeholder="Describe tu propiedad: ubicación, vistas, ambiente, qué hace especial tu alojamiento..."
                        rows={8}
                        value={formData.descripcion || ''}
                        onChange={(e) => actualizarFormData('descripcion', e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${
                          !formData.descripcion || formData.descripcion.length < 100 
                            ? 'text-orange-600' 
                            : formData.descripcion.length >= 300
                            ? 'text-green-600'
                            : 'text-muted-foreground'
                        }`}>
                          {formData.descripcion?.length || 0} caracteres
                          {formData.descripcion && formData.descripcion.length < 100 && ' (mínimo 100)'}
                        </span>
                        <span className="text-muted-foreground">
                          Descripciones detalladas aumentan 60% las reservas
                        </span>
                      </div>
                    </div>

                    {formData.descripcion && formData.descripcion.length >= 100 && (
                      <Alert className="border-green-600/20 bg-green-50/50 dark:bg-green-950/20">
                        <CheckCircle size={18} weight="fill" className="text-green-600" />
                        <AlertDescription className="text-green-700 dark:text-green-400">
                          ¡Excelente! Tu descripción es suficientemente detallada
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
                              <label
                                htmlFor={amenidad}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {amenidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Seguridad</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Detector de Humo', 'Detector de CO', 'Botiquín', 'Extintor', 'Cámaras Seguridad'].map(amenidad => (
                            <div key={amenidad} className="flex items-center space-x-2">
                              <Checkbox
                                id={amenidad}
                                checked={formData.amenidades?.includes(amenidad)}
                                onCheckedChange={() => toggleAmenidad(amenidad)}
                              />
                              <label
                                htmlFor={amenidad}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {amenidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Extras LATAM</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {['Piscina', 'Jacuzzi', 'Jardín', 'Terraza', 'Parqueadero', 'Admite Mascotas', 'Desayuno Incluido', 'Check-in Autónomo'].map(amenidad => (
                            <div key={amenidad} className="flex items-center space-x-2">
                              <Checkbox
                                id={amenidad}
                                checked={formData.amenidades?.includes(amenidad)}
                                onCheckedChange={() => toggleAmenidad(amenidad)}
                              />
                              <label
                                htmlFor={amenidad}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {amenidad}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-secondary/10 rounded-lg">
                        <p className="text-sm font-medium mb-1">Amenidades seleccionadas</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.amenidades && formData.amenidades.length > 0 ? (
                            formData.amenidades.map(amenidad => (
                              <Badge key={amenidad} variant="secondary">
                                {amenidad}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">Ninguna seleccionada</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción del Alojamiento</Label>
                      <Textarea
                        id="descripcion"
                        placeholder="Describe tu propiedad: ubicación, vistas, ambiente, qué hace especial tu alojamiento..."
                        rows={6}
                        value={formData.descripcion || ''}
                        onChange={(e) => actualizarFormData('descripcion', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Una buena descripción aumenta 40% las reservas
                      </p>
                    </div>
                  </>
                )}

                {pasoActual === 4 && (
                  <div className="space-y-6">
                    {/* Zona de carga */}
                    <PhotoUploadZone
                      onFileSelect={(files) => photoUpload.handleFileSelect(files)}
                      isUploading={photoUpload.isUploading}
                      maxFiles={20}
                      currentCount={photoUpload.photos.length}
                    />

                    {/* Grid de fotos */}
                    {photoUpload.photos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">
                            Fotos Cargadas ({photoUpload.photos.filter(p => p.status === 'completed').length}/{photoUpload.photos.length})
                          </h3>
                          {photoUpload.photos.length > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={photoUpload.clearAll}
                            >
                              Limpiar todas
                            </Button>
                          )}
                        </div>
                        
                        <PhotoGrid
                          photos={photoUpload.photos}
                          onRemove={photoUpload.removePhoto}
                          onReorder={photoUpload.reorderPhotos}
                        />
                      </div>
                    )}

                    {/* Alertas de calidad */}
                    {photoUpload.photos.length > 0 && !photoUpload.hasMinimumPhotos && (
                      <Alert className="border-orange-600/20 bg-orange-50/50 dark:bg-orange-950/20">
                        <Warning size={18} weight="fill" className="text-orange-600" />
                        <AlertDescription className="text-orange-700 dark:text-orange-400">
                          Necesitas al menos 5 fotos de calidad para publicar tu anuncio
                        </AlertDescription>
                      </Alert>
                    )}

                    {photoUpload.hasMinimumPhotos && (
                      <Alert className="border-green-600/20 bg-green-50/50 dark:bg-green-950/20">
                        <CheckCircle size={18} weight="fill" className="text-green-600" />
                        <AlertDescription className="text-green-700 dark:text-green-400">
                          ¡Perfecto! Tienes suficientes fotos de calidad
                        </AlertDescription>
                      </Alert>
                    )}

                    <Separator />

                    {/* Consejos profesionales */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb size={20} weight="duotone" className="text-primary" />
                        <h3 className="font-semibold">Consejos de Fotografía Profesional</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          {
                            title: 'Iluminación Natural',
                            desc: 'Fotografía durante el día con luz natural. Mejora 60% la conversión',
                            icon: '☀️'
                          },
                          {
                            title: 'Portada Impactante',
                            desc: 'Primera foto debe mostrar la mejor vista de la propiedad',
                            icon: '🏠'
                          },
                          {
                            title: 'Todas las Áreas',
                            desc: 'Incluye habitaciones, baños, cocina, espacios comunes y exteriores',
                            icon: '📸'
                          },
                          {
                            title: 'Orden y Limpieza',
                            desc: 'Espacios ordenados transmiten confianza y profesionalismo',
                            icon: '✨'
                          },
                          {
                            title: 'Ángulos Amplios',
                            desc: 'Usa lente gran angular para mostrar más espacio',
                            icon: '📐'
                          },
                          {
                            title: 'Detalles Especiales',
                            desc: 'Captura amenidades únicas y detalles que te diferencian',
                            icon: '⭐'
                          }
                        ].map((tip, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                            <span className="text-2xl">{tip.icon}</span>
                            <div>
                              <p className="font-medium text-sm">{tip.title}</p>
                              <p className="text-xs text-muted-foreground">{tip.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Estadísticas de fotos con IA */}
                    {photoUpload.photos.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkle size={20} weight="duotone" className="text-primary" />
                          <h4 className="font-semibold">Análisis IA de tus Fotos</h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold">{photoUpload.photos.length}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Completadas</p>
                            <p className="text-2xl font-bold text-green-600">
                              {photoUpload.photos.filter(p => p.status === 'completed').length}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Calidad Promedio</p>
                            <p className="text-2xl font-bold text-primary">
                              {Math.round(
                                photoUpload.photos
                                  .filter(p => p.aiAnalysis)
                                  .reduce((acc, p) => acc + (p.aiAnalysis?.quality || 0), 0) /
                                  photoUpload.photos.filter(p => p.aiAnalysis).length || 0
                              )}%
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Con Sugerencias</p>
                            <p className="text-2xl font-bold text-orange-600">
                              {photoUpload.photos.filter(p => p.aiAnalysis?.suggestions && p.aiAnalysis.suggestions.length > 0).length}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {pasoActual === 5 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="precio">Precio por Noche (COP) *</Label>
                      <Input
                        id="precio"
                        type="number"
                        min="0"
                        step="1000"
                        placeholder="Ej: 150000"
                        value={formData.precioPorNoche || ''}
                        onChange={(e) => actualizarFormData('precioPorNoche', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="limpieza">Gastos de Limpieza (COP)</Label>
                      <Input
                        id="limpieza"
                        type="number"
                        min="0"
                        step="1000"
                        placeholder="Ej: 30000"
                        value={formData.gastosLimpieza || ''}
                        onChange={(e) => actualizarFormData('gastosLimpieza', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estanciaMinima">Estancia Mínima (noches)</Label>
                      <Input
                        id="estanciaMinima"
                        type="number"
                        min="1"
                        max="30"
                        placeholder="Ej: 2"
                        value={formData.estanciaMinima || ''}
                        onChange={(e) => actualizarFormData('estanciaMinima', parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="politica">Política de Cancelación</Label>
                      <Select value={formData.politicaCancelacion} onValueChange={(val) => actualizarFormData('politicaCancelacion', val)}>
                        <SelectTrigger id="politica">
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flexible">Flexible - Reembolso hasta 24h antes</SelectItem>
                          <SelectItem value="moderada">Moderada - Reembolso hasta 5 días antes</SelectItem>
                          <SelectItem value="estricta">Estricta - Reembolso hasta 14 días antes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="checkIn">Check-in</Label>
                        <Input
                          id="checkIn"
                          type="time"
                          value={formData.checkIn || ''}
                          onChange={(e) => actualizarFormData('checkIn', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="checkOut">Check-out</Label>
                        <Input
                          id="checkOut"
                          type="time"
                          value={formData.checkOut || ''}
                          onChange={(e) => actualizarFormData('checkOut', e.target.value)}
                        />
                      </div>
                    </div>

                    {formData.precioPorNoche && (
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <h3 className="font-semibold mb-3">Simulación de Ganancia</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">1 noche:</span>
                            <span className="font-medium">${formData.precioPorNoche.toLocaleString('es-CO')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">7 noches:</span>
                            <span className="font-medium">${(formData.precioPorNoche * 7).toLocaleString('es-CO')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">30 noches (ocupación 70%):</span>
                            <span className="font-medium text-accent">
                              ${(formData.precioPorNoche * 21).toLocaleString('es-CO')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {pasoActual === 6 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="rnt">Registro Nacional de Turismo (RNT)</Label>
                      <Input
                        id="rnt"
                        placeholder="Número de RNT (si aplica)"
                      />
                      <p className="text-xs text-muted-foreground">
                        Obligatorio para establecimientos comerciales en Colombia
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="terminos" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terminos"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Acepto los términos y condiciones *
                        </label>
                        <p className="text-xs text-muted-foreground">
                          He leído y acepto las políticas de SendAI para anfitriones
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="veracidad" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="veracidad"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Declaro que la información es veraz *
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Toda la información proporcionada es precisa y actualizada
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="camaras" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="camaras"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Declaración de cámaras de seguridad
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Si existen, marcar ubicación y notificar a huéspedes
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle size={32} weight="duotone" className="text-primary" />
                        <div>
                          <h3 className="font-bold text-lg">¡Casi listo!</h3>
                          <p className="text-sm text-muted-foreground">
                            Tu alojamiento será revisado en 24-48 horas
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">
                        Después de la aprobación, tu propiedad aparecerá en búsquedas y podrás comenzar a recibir reservas.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={pasoAnterior}
                disabled={pasoActual === 1}
                className="gap-2"
              >
                <ArrowLeft size={16} weight="bold" />
                Anterior
              </Button>

              {pasoActual < PASOS.length ? (
                <Button onClick={siguientePaso} className="gap-2">
                  Siguiente
                  <ArrowRight size={16} weight="bold" />
                </Button>
              ) : (
                <Button onClick={finalizarRegistro} className="gap-2">
                  <CheckCircle size={16} weight="bold" />
                  Finalizar Registro
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
