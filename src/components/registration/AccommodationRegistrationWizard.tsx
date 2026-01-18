import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RegistrationStepper } from './RegistrationStepper'
import { IntelligentPhotoUpload, PhotoData } from './IntelligentPhotoUpload'
import { AIDescriptionOptimizer } from './AIDescriptionOptimizer'
import { ArrowLeft, ArrowRight, CheckCircle, House, MapPin } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { cn } from '@/lib/utils'

interface AccommodationFormData {
  type: string
  name: string
  tagline: string
  description: string
  
  country: string
  region: string
  city: string
  address: string
  zipCode: string
  latitude: string
  longitude: string
  
  category: string
  totalRooms: number
  maxGuests: number
  checkIn: string
  checkOut: string
  
  amenities: string[]
  
  pricePerNight: number
  currency: string
  cleaningFee: number
  serviceFee: number
  
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  
  cancellationPolicy: string
  houseRules: string
}

const STEPS = [
  { id: 'type', label: 'Tipo', description: 'Tipo de propiedad' },
  { id: 'basic', label: 'Básicos', description: 'Información general' },
  { id: 'location', label: 'Ubicación', description: 'Dónde está' },
  { id: 'details', label: 'Detalles', description: 'Características' },
  { id: 'photos', label: 'Fotos', description: 'Imágenes' },
  { id: 'amenities', label: 'Amenidades', description: 'Qué incluye' },
  { id: 'pricing', label: 'Precios', description: 'Tarifas' },
  { id: 'review', label: 'Revisar', description: 'Confirmar todo' }
]

const PROPERTY_TYPES = [
  { value: 'hotel', label: 'Hotel', icon: '🏨' },
  { value: 'apartment', label: 'Apartamento', icon: '🏢' },
  { value: 'house', label: 'Casa', icon: '🏠' },
  { value: 'cabin', label: 'Cabaña', icon: '🏡' },
  { value: 'villa', label: 'Villa', icon: '🏰' },
  { value: 'hostel', label: 'Hostel', icon: '🛏️' },
  { value: 'resort', label: 'Resort', icon: '🏝️' },
  { value: 'glamping', label: 'Glamping', icon: '⛺' }
]

const AMENITIES_LIST = [
  { id: 'wifi', label: 'WiFi gratis', icon: '📶' },
  { id: 'parking', label: 'Estacionamiento', icon: '🅿️' },
  { id: 'pool', label: 'Piscina', icon: '🏊' },
  { id: 'gym', label: 'Gimnasio', icon: '💪' },
  { id: 'ac', label: 'Aire acondicionado', icon: '❄️' },
  { id: 'heating', label: 'Calefacción', icon: '🔥' },
  { id: 'kitchen', label: 'Cocina', icon: '🍳' },
  { id: 'washer', label: 'Lavadora', icon: '🧺' },
  { id: 'tv', label: 'TV', icon: '📺' },
  { id: 'workspace', label: 'Espacio de trabajo', icon: '💼' },
  { id: 'breakfast', label: 'Desayuno incluido', icon: '🥐' },
  { id: 'restaurant', label: 'Restaurante', icon: '🍽️' },
  { id: 'bar', label: 'Bar', icon: '🍷' },
  { id: 'spa', label: 'Spa', icon: '💆' },
  { id: 'pets', label: 'Se admiten mascotas', icon: '🐕' },
  { id: 'smoking', label: 'Zona de fumadores', icon: '🚬' },
  { id: 'beach', label: 'Acceso a playa', icon: '🏖️' },
  { id: 'garden', label: 'Jardín', icon: '🌳' }
]

const COLOMBIA_REGIONS = [
  { value: 'amazonas', label: 'Amazonas' },
  { value: 'antioquia', label: 'Antioquia' },
  { value: 'atlantico', label: 'Atlántico' },
  { value: 'bolivar', label: 'Bolívar' },
  { value: 'boyaca', label: 'Boyacá' },
  { value: 'caldas', label: 'Caldas' },
  { value: 'cundinamarca', label: 'Cundinamarca' },
  { value: 'narino', label: 'Nariño' },
  { value: 'santander', label: 'Santander' },
  { value: 'valle', label: 'Valle del Cauca' }
]

export function AccommodationRegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [photos, setPhotos] = useState<PhotoData[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [draftData, setDraftData] = useKV<Partial<AccommodationFormData>>('accommodation-draft', {})
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AccommodationFormData>({
    defaultValues: draftData || {}
  })

  const formData = watch()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDraftData(() => formData)
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData, setDraftData])

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const validateCurrentStep = (): boolean => {
    const stepId = STEPS[currentStep].id

    switch (stepId) {
      case 'type':
        if (!formData.type) {
          toast.error('Selecciona el tipo de propiedad')
          return false
        }
        return true
      
      case 'basic':
        if (!formData.name || formData.name.length < 5) {
          toast.error('El nombre debe tener al menos 5 caracteres')
          return false
        }
        if (!formData.description || formData.description.length < 50) {
          toast.error('La descripción debe tener al menos 50 caracteres')
          return false
        }
        return true
      
      case 'location':
        if (!formData.country || !formData.region || !formData.city) {
          toast.error('Completa la ubicación')
          return false
        }
        return true
      
      case 'photos':
        if (photos.length < 5) {
          toast.error('Sube al menos 5 fotos')
          return false
        }
        return true
      
      case 'pricing':
        if (!formData.pricePerNight || formData.pricePerNight < 1) {
          toast.error('Ingresa un precio válido')
          return false
        }
        return true
      
      default:
        return true
    }
  }

  const onSubmit = async (data: AccommodationFormData) => {
    console.log('Submitted:', data, photos)
    toast.success('¡Alojamiento registrado exitosamente!')
  }

  const renderStepContent = () => {
    const stepId = STEPS[currentStep].id

    switch (stepId) {
      case 'type':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Qué tipo de alojamiento ofreces?</h2>
              <p className="text-muted-foreground">
                Selecciona la categoría que mejor describe tu propiedad
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROPERTY_TYPES.map((type) => (
                <Card
                  key={type.value}
                  className={cn(
                    "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg",
                    formData.type === type.value && "ring-2 ring-primary bg-primary/5"
                  )}
                  onClick={() => setValue('type', type.value)}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-4xl">{type.icon}</div>
                    <div className="font-semibold">{type.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Información básica</h2>
              <p className="text-muted-foreground">
                Cuéntanos sobre tu propiedad
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre de la propiedad *</Label>
                <Input
                  id="name"
                  {...register('name', { required: true, minLength: 5 })}
                  placeholder="Ej: Villa Paradise - Cabaña con vista al mar"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="tagline">Frase atractiva (opcional)</Label>
                <Input
                  id="tagline"
                  {...register('tagline')}
                  placeholder="Ej: Tu refugio perfecto en el paraíso"
                  className="mt-1.5"
                />
              </div>

              <AIDescriptionOptimizer
                value={formData.description || ''}
                onChange={(value) => setValue('description', value)}
                label="Descripción completa *"
                helpText="Mínimo 50 caracteres. La IA puede ayudarte a mejorarla."
                placeholder="Describe tu propiedad: ubicación, características especiales, qué hace única a tu propiedad..."
                maxLength={2000}
              />
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ubicación</h2>
              <p className="text-muted-foreground">
                ¿Dónde está ubicada tu propiedad?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">País *</Label>
                <Select
                  value={formData.country || "colombia"}
                  onValueChange={(value) => setValue('country', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colombia">Colombia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="region">Departamento *</Label>
                <Select
                  value={formData.region || "narino"}
                  onValueChange={(value) => setValue('region', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLOMBIA_REGIONS.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  {...register('city', { required: true })}
                  placeholder="Ej: Cartagena"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="zipCode">Código Postal</Label>
                <Input
                  id="zipCode"
                  {...register('zipCode')}
                  placeholder="Ej: 130001"
                  className="mt-1.5"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Dirección completa</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="Ej: Calle 10 # 34-56, Barrio Getsemaní"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        )

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Detalles de la propiedad</h2>
              <p className="text-muted-foreground">
                Información sobre capacidad y categoría
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.category || "naturaleza"}
                  onValueChange={(value) => setValue('category', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aventura">Aventura</SelectItem>
                    <SelectItem value="playa">Playa</SelectItem>
                    <SelectItem value="naturaleza">Naturaleza</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="familiar">Familiar</SelectItem>
                    <SelectItem value="negocios">Negocios</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="totalRooms">Número de habitaciones</Label>
                <Input
                  id="totalRooms"
                  type="number"
                  {...register('totalRooms', { valueAsNumber: true })}
                  placeholder="Ej: 5"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="maxGuests">Huéspedes máximo</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  {...register('maxGuests', { valueAsNumber: true })}
                  placeholder="Ej: 10"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="checkIn">Hora de Check-in</Label>
                <Input
                  id="checkIn"
                  type="time"
                  {...register('checkIn')}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="checkOut">Hora de Check-out</Label>
                <Input
                  id="checkOut"
                  type="time"
                  {...register('checkOut')}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        )

      case 'photos':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Fotos de tu propiedad</h2>
              <p className="text-muted-foreground">
                Las fotos son cruciales. Sube al menos 5 fotos de alta calidad
              </p>
            </div>

            <IntelligentPhotoUpload
              photos={photos}
              onChange={setPhotos}
              maxPhotos={20}
            />
          </div>
        )

      case 'amenities':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Amenidades</h2>
              <p className="text-muted-foreground">
                ¿Qué servicios y comodidades ofreces?
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AMENITIES_LIST.map((amenity) => (
                <Card
                  key={amenity.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-300",
                    selectedAmenities.includes(amenity.id) && "ring-2 ring-primary bg-primary/5"
                  )}
                  onClick={() => {
                    setSelectedAmenities(prev =>
                      prev.includes(amenity.id)
                        ? prev.filter(id => id !== amenity.id)
                        : [...prev, amenity.id]
                    )
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => {}}
                    />
                    <span className="text-2xl">{amenity.icon}</span>
                    <span className="text-sm font-medium">{amenity.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'pricing':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Precios</h2>
              <p className="text-muted-foreground">
                Define tus tarifas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pricePerNight">Precio por noche *</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="pricePerNight"
                    type="number"
                    {...register('pricePerNight', { required: true, valueAsNumber: true })}
                    placeholder="150000"
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currency">Moneda</Label>
                <Select
                  value={formData.currency || 'COP'}
                  onValueChange={(value) => setValue('currency', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COP">COP (Pesos colombianos)</SelectItem>
                    <SelectItem value="USD">USD (Dólares)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cleaningFee">Tarifa de limpieza</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="cleaningFee"
                    type="number"
                    {...register('cleaningFee', { valueAsNumber: true })}
                    placeholder="30000"
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serviceFee">Tarifa de servicio (%)</Label>
                <Input
                  id="serviceFee"
                  type="number"
                  {...register('serviceFee', { valueAsNumber: true })}
                  placeholder="10"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Revisar y confirmar</h2>
              <p className="text-muted-foreground">
                Verifica toda la información antes de enviar
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <House className="w-5 h-5" />
                  Información Básica
                </h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Tipo</dt>
                    <dd className="font-medium">{PROPERTY_TYPES.find(t => t.value === formData.type)?.label}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Nombre</dt>
                    <dd className="font-medium">{formData.name}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Descripción</dt>
                    <dd className="font-medium line-clamp-3">{formData.description}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Ubicación
                </h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Ciudad</dt>
                    <dd className="font-medium">{formData.city}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Departamento</dt>
                    <dd className="font-medium">{formData.region}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Fotos</h3>
                <div className="grid grid-cols-4 gap-2">
                  {photos.slice(0, 4).map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.preview}
                      alt=""
                      className="aspect-square object-cover rounded"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {photos.length} foto{photos.length !== 1 ? 's' : ''} en total
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Precio</h3>
                <p className="text-3xl font-bold text-primary">
                  ${formData.pricePerNight?.toLocaleString()} {formData.currency || 'COP'}
                  <span className="text-base font-normal text-muted-foreground ml-2">/ noche</span>
                </p>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Registrar Alojamiento</h1>
          <p className="text-muted-foreground">
            Completa el formulario paso a paso para registrar tu propiedad
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <RegistrationStepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            allowSkipAhead={false}
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}

            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
                  <CheckCircle className="w-4 h-4 mr-2" weight="fill" />
                  Registrar Alojamiento
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
