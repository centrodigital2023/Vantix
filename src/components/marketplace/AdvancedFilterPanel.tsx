import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  WifiHigh, Car, Coffee, Bathtub, Dog, Snowflake, 
  SwimmingPool, Barbell, Elevator, Wheelchair,
  CheckCircle, X, Sparkle, Lightning
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FilterOptions {
  priceRange: [number, number]
  propertyTypes: string[]
  amenities: string[]
  rating: number
  instantBook: boolean
  superhost: boolean
  freeCancellation: boolean
}

interface AdvancedFilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void
  resultCount: number
  onClose?: () => void
}

const PROPERTY_TYPES = [
  'Hotel',
  'Apartamento',
  'Casa',
  'Cabaña',
  'Hostal',
  'Villa',
  'Resort',
  'Glamping'
]

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: WifiHigh },
  { id: 'parking', label: 'Estacionamiento', icon: Car },
  { id: 'breakfast', label: 'Desayuno', icon: Coffee },
  { id: 'bathroom', label: 'Baño privado', icon: Bathtub },
  { id: 'pets', label: 'Admite mascotas', icon: Dog },
  { id: 'ac', label: 'Aire acondicionado', icon: Snowflake },
  { id: 'pool', label: 'Piscina', icon: SwimmingPool },
  { id: 'gym', label: 'Gimnasio', icon: Barbell },
  { id: 'elevator', label: 'Ascensor', icon: Elevator },
  { id: 'accessible', label: 'Accesible', icon: Wheelchair },
]

const RATING_OPTIONS = [
  { value: 0, label: 'Cualquier calificación' },
  { value: 3, label: '3+ estrellas' },
  { value: 4, label: '4+ estrellas' },
  { value: 4.5, label: '4.5+ estrellas' },
]

export function AdvancedFilterPanel({ onFilterChange, resultCount, onClose }: AdvancedFilterPanelProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([50000, 500000])
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [instantBook, setInstantBook] = useState(false)
  const [superhost, setSuperhost] = useState(false)
  const [freeCancellation, setFreeCancellation] = useState(false)

  const handleApplyFilters = () => {
    onFilterChange({
      priceRange,
      propertyTypes,
      amenities,
      rating,
      instantBook,
      superhost,
      freeCancellation
    })
  }

  const handleClearFilters = () => {
    setPriceRange([50000, 500000])
    setPropertyTypes([])
    setAmenities([])
    setRating(0)
    setInstantBook(false)
    setSuperhost(false)
    setFreeCancellation(false)
    onFilterChange({
      priceRange: [50000, 500000],
      propertyTypes: [],
      amenities: [],
      rating: 0,
      instantBook: false,
      superhost: false,
      freeCancellation: false
    })
  }

  const togglePropertyType = (type: string) => {
    setPropertyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const toggleAmenity = (amenityId: string) => {
    setAmenities(prev =>
      prev.includes(amenityId) ? prev.filter(a => a !== amenityId) : [...prev, amenityId]
    )
  }

  const activeFiltersCount = 
    (propertyTypes.length > 0 ? 1 : 0) +
    (amenities.length > 0 ? 1 : 0) +
    (rating > 0 ? 1 : 0) +
    (instantBook ? 1 : 0) +
    (superhost ? 1 : 0) +
    (freeCancellation ? 1 : 0)

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="sticky top-0 bg-background border-b z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Filtros</h2>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {activeFiltersCount} filtros activos
              </p>
            )}
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        <div>
          <Label className="text-base font-semibold mb-4 block">Rango de Precio</Label>
          <div className="space-y-4">
            <Slider
              min={10000}
              max={1000000}
              step={10000}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-primary">
                ${priceRange[0].toLocaleString()}
              </span>
              <span className="text-muted-foreground">-</span>
              <span className="font-semibold text-primary">
                ${priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold mb-4 block">Tipo de Propiedad</Label>
          <div className="grid grid-cols-2 gap-2">
            {PROPERTY_TYPES.map((type) => (
              <Button
                key={type}
                variant={propertyTypes.includes(type) ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePropertyType(type)}
                className="justify-start"
              >
                {propertyTypes.includes(type) && (
                  <CheckCircle size={16} className="mr-2" weight="fill" />
                )}
                {type}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold mb-4 block">Servicios</Label>
          <div className="grid grid-cols-1 gap-3">
            {AMENITIES.map((amenity) => {
              const Icon = amenity.icon
              return (
                <label
                  key={amenity.id}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={amenities.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <Icon size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{amenity.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold mb-4 block">Calificación</Label>
          <div className="space-y-2">
            {RATING_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  checked={rating === option.value}
                  onCheckedChange={() => setRating(option.value)}
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold mb-4 block">Opciones Especiales</Label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={instantBook}
                onCheckedChange={(checked) => setInstantBook(checked as boolean)}
              />
              <Lightning size={20} className="text-accent" weight="fill" />
              <div className="flex-1">
                <p className="text-sm font-medium">Reserva Instantánea</p>
                <p className="text-xs text-muted-foreground">Sin esperar aprobación del anfitrión</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={superhost}
                onCheckedChange={(checked) => setSuperhost(checked as boolean)}
              />
              <Sparkle size={20} className="text-secondary" weight="fill" />
              <div className="flex-1">
                <p className="text-sm font-medium">SuperAnfitrión</p>
                <p className="text-xs text-muted-foreground">Anfitriones con excelente reputación</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={freeCancellation}
                onCheckedChange={(checked) => setFreeCancellation(checked as boolean)}
              />
              <CheckCircle size={20} className="text-success" weight="fill" />
              <div className="flex-1">
                <p className="text-sm font-medium">Cancelación Gratis</p>
                <p className="text-xs text-muted-foreground">Reembolso completo si cancelas</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background border-t px-6 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            disabled={activeFiltersCount === 0}
          >
            Limpiar filtros
          </Button>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {resultCount} resultados
          </Badge>
        </div>
        <Button
          onClick={handleApplyFilters}
          className="w-full"
          size="lg"
        >
          Mostrar resultados
        </Button>
      </div>
    </div>
  )
}
