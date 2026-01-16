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
import { ArrowLeft, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { cn } from '@/lib/utils'

interface ServiceFormData {
  type: string
  businessName: string
  description: string
  
  country: string
  region: string
  city: string
  address: string
  
  serviceCategory: string
  specialties: string[]
  capacity: number
  duration: string
  
  priceRange: string
  pricingModel: string
  includesTransport: boolean
  includesMeals: boolean
  
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  businessLicense: string
}

const STEPS = [
  { id: 'type', label: 'Tipo', description: 'Tipo de servicio' },
  { id: 'basic', label: 'Básicos', description: 'Información' },
  { id: 'location', label: 'Ubicación', description: 'Dónde operas' },
  { id: 'details', label: 'Detalles', description: 'Tu servicio' },
  { id: 'photos', label: 'Fotos', description: 'Galería' },
  { id: 'pricing', label: 'Precios', description: 'Tarifas' },
  { id: 'review', label: 'Revisar', description: 'Confirmar' }
]

const SERVICE_TYPES = [
  { value: 'tour', label: 'Tours y Excursiones', icon: '🚌' },
  { value: 'transport', label: 'Transporte', icon: '🚗' },
  { value: 'guide', label: 'Guía Turístico', icon: '👨‍🏫' },
  { value: 'restaurant', label: 'Restaurante', icon: '🍽️' },
  { value: 'activities', label: 'Actividades', icon: '🎯' },
  { value: 'rental', label: 'Alquiler de Equipos', icon: '⛷️' }
]

const SPECIALTIES = [
  { id: 'adventure', label: 'Aventura', icon: '🏔️' },
  { id: 'cultural', label: 'Cultural', icon: '🎭' },
  { id: 'nature', label: 'Naturaleza', icon: '🌿' },
  { id: 'gastronomy', label: 'Gastronomía', icon: '🍷' },
  { id: 'photography', label: 'Fotografía', icon: '📸' },
  { id: 'wellness', label: 'Bienestar', icon: '💆' }
]

export function ServiceRegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [photos, setPhotos] = useState<PhotoData[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [draftData, setDraftData] = useKV<Partial<ServiceFormData>>('service-draft', {})
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ServiceFormData>({
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
          toast.error('Selecciona el tipo de servicio')
          return false
        }
        return true
      
      case 'basic':
        if (!formData.businessName || formData.businessName.length < 3) {
          toast.error('El nombre debe tener al menos 3 caracteres')
          return false
        }
        if (!formData.description || formData.description.length < 50) {
          toast.error('La descripción debe tener al menos 50 caracteres')
          return false
        }
        return true
      
      case 'photos':
        if (photos.length < 3) {
          toast.error('Sube al menos 3 fotos')
          return false
        }
        return true
      
      default:
        return true
    }
  }

  const onSubmit = async (data: ServiceFormData) => {
    console.log('Service registered:', data, photos)
    toast.success('¡Servicio registrado exitosamente!')
  }

  const renderStepContent = () => {
    const stepId = STEPS[currentStep].id

    switch (stepId) {
      case 'type':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Qué tipo de servicio ofreces?</h2>
              <p className="text-muted-foreground">
                Selecciona la categoría principal de tu negocio
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SERVICE_TYPES.map((type) => (
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
                    <div className="font-semibold text-sm">{type.label}</div>
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
                Cuéntanos sobre tu servicio
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Nombre del servicio/negocio *</Label>
                <Input
                  id="businessName"
                  {...register('businessName', { required: true, minLength: 3 })}
                  placeholder="Ej: Tours Aventura Colombia"
                  className="mt-1.5"
                />
              </div>

              <AIDescriptionOptimizer
                value={formData.description || ''}
                onChange={(value) => setValue('description', value)}
                label="Descripción de tu servicio *"
                helpText="Describe qué ofreces, tu experiencia y qué te hace único"
                placeholder="Describe tu servicio turístico..."
                maxLength={1500}
              />

              <div>
                <Label htmlFor="businessLicense">Número de registro/licencia turística</Label>
                <Input
                  id="businessLicense"
                  {...register('businessLicense')}
                  placeholder="Ej: RNT 12345"
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Registro Nacional de Turismo u otra certificación
                </p>
              </div>
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Dónde operas?</h2>
              <p className="text-muted-foreground">
                Ubicación de tu negocio o zona de operación
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">País *</Label>
                <Select
                  value={formData.country}
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
                <Input
                  id="region"
                  {...register('region', { required: true })}
                  placeholder="Ej: Antioquia"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="city">Ciudad principal *</Label>
                <Input
                  id="city"
                  {...register('city', { required: true })}
                  placeholder="Ej: Medellín"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="address">Dirección u oficina</Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="Opcional"
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
              <h2 className="text-2xl font-bold mb-2">Detalles del servicio</h2>
              <p className="text-muted-foreground">
                Características y especialidades
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Especialidades</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SPECIALTIES.map((specialty) => (
                    <Card
                      key={specialty.id}
                      className={cn(
                        "p-3 cursor-pointer transition-all duration-300",
                        selectedSpecialties.includes(specialty.id) && "ring-2 ring-primary bg-primary/5"
                      )}
                      onClick={() => {
                        setSelectedSpecialties(prev =>
                          prev.includes(specialty.id)
                            ? prev.filter(id => id !== specialty.id)
                            : [...prev, specialty.id]
                        )
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedSpecialties.includes(specialty.id)}
                          onCheckedChange={() => {}}
                        />
                        <span className="text-xl">{specialty.icon}</span>
                        <span className="text-sm font-medium">{specialty.label}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Capacidad máxima (personas)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    {...register('capacity', { valueAsNumber: true })}
                    placeholder="Ej: 15"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duración típica</Label>
                  <Input
                    id="duration"
                    {...register('duration')}
                    placeholder="Ej: 4 horas, Todo el día, Medio día"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Servicios incluidos</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.includesTransport}
                      onCheckedChange={(checked) => setValue('includesTransport', checked as boolean)}
                    />
                    <span className="text-sm">🚗 Transporte</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.includesMeals}
                      onCheckedChange={(checked) => setValue('includesMeals', checked as boolean)}
                    />
                    <span className="text-sm">🍽️ Alimentación</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 'photos':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Fotos de tu servicio</h2>
              <p className="text-muted-foreground">
                Muestra tu servicio con fotos profesionales (mínimo 3)
              </p>
            </div>

            <IntelligentPhotoUpload
              photos={photos}
              onChange={setPhotos}
              maxPhotos={15}
            />
          </div>
        )

      case 'pricing':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Precios</h2>
              <p className="text-muted-foreground">
                Define tu modelo de precios
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="pricingModel">Modelo de precio</Label>
                <Select
                  value={formData.pricingModel}
                  onValueChange={(value) => setValue('pricingModel', value)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per-person">Por persona</SelectItem>
                    <SelectItem value="per-group">Por grupo</SelectItem>
                    <SelectItem value="per-hour">Por hora</SelectItem>
                    <SelectItem value="per-day">Por día</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priceRange">Rango de precios</Label>
                <Input
                  id="priceRange"
                  {...register('priceRange')}
                  placeholder="Ej: $50,000 - $200,000 COP"
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Indica el rango aproximado de tus tarifas
                </p>
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
                Verifica toda la información
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Información del Servicio</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Tipo</dt>
                    <dd className="font-medium">{SERVICE_TYPES.find(t => t.value === formData.type)?.label}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Nombre</dt>
                    <dd className="font-medium">{formData.businessName}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Descripción</dt>
                    <dd className="font-medium line-clamp-3">{formData.description}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Ubicación</h3>
                <p className="text-sm">{formData.city}, {formData.region}</p>
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
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Registrar Servicio Turístico</h1>
          <p className="text-muted-foreground">
            Completa el formulario para ofrecer tus servicios
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
                  Registrar Servicio
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
