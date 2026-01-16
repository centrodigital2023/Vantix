import { useState } from 'react'
import { useSupabaseData } from '@/hooks/use-supabase-data'
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { X } from '@phosphor-icons/react'

interface AccommodationFormData {
  name: string
  description: string
  category: string
  city: string
  department: string
  address: string
  base_price: number
  images: string[]
  amenities: string[]
}

const initialFormData: AccommodationFormData = {
  name: '',
  description: '',
  category: 'naturaleza',
  city: '',
  department: 'Nariño',
  address: '',
  base_price: 0,
  images: [],
  amenities: [],
}

const categories = [
  'aventura',
  'bienestar',
  'cultural',
  'familiar',
  'gastronomia',
  'naturaleza',
  'negocios',
  'playa',
  'religioso',
  'rural',
]

const departments = [
  'Amazonas',
  'Antioquia',
  'Arauca',
  'Atlántico',
  'Bolívar',
  'Boyacá',
  'Caldas',
  'Caquetá',
  'Casanare',
  'Cauca',
  'Cesar',
  'Chocó',
  'Córdoba',
  'Cundinamarca',
  'Guainía',
  'Guaviare',
  'Huila',
  'La Guajira',
  'Magdalena',
  'Meta',
  'Nariño',
  'Norte de Santander',
  'Putumayo',
  'Quindío',
  'Risaralda',
  'San Andrés y Providencia',
  'Santander',
  'Sucre',
  'Tolima',
  'Valle del Cauca',
  'Vaupés',
  'Vichada',
]

const commonAmenities = [
  'WiFi',
  'Aire Acondicionado',
  'Piscina',
  'Parqueadero',
  'Cocina',
  'TV',
  'Desayuno Incluido',
  'Pet Friendly',
  'Gimnasio',
  'Spa',
  'Bar',
  'Restaurante',
]

interface SupabaseAccommodationFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function SupabaseAccommodationForm({ onSuccess, onCancel }: SupabaseAccommodationFormProps) {
  const { user } = useSupabaseAuthContext()
  const { insert, loading } = useSupabaseData('accommodations')
  const [formData, setFormData] = useState<AccommodationFormData>(initialFormData)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newAmenity, setNewAmenity] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('Debes iniciar sesión para crear un alojamiento')
      return
    }

    if (formData.images.length === 0) {
      toast.error('Debes agregar al menos una imagen')
      return
    }

    if (formData.amenities.length === 0) {
      toast.error('Debes agregar al menos una comodidad')
      return
    }

    const result = await insert({
      owner_id: user.id,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      city: formData.city,
      department: formData.department,
      address: formData.address,
      latitude: null,
      longitude: null,
      images: formData.images,
      amenities: formData.amenities,
      rating: 0,
      reviews_count: 0,
      base_price: formData.base_price,
      currency: 'COP',
      status: 'pending',
    })

    if (result) {
      setFormData(initialFormData)
      onSuccess?.()
    }
  }

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData({ ...formData, images: [...formData.images, newImageUrl.trim()] })
      setNewImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })
  }

  const toggleAmenity = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({ ...formData, amenities: formData.amenities.filter((a) => a !== amenity) })
    } else {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] })
    }
  }

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity.trim()] })
      setNewAmenity('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevo Alojamiento</CardTitle>
        <CardDescription>
          Completa la información de tu propiedad. Los datos serán revisados antes de publicarse.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Nombre del Alojamiento *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Hotel Vista Hermosa"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departamento *</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dep) => (
                    <SelectItem key={dep} value={dep}>
                      {dep}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Pasto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Calle 18 # 25-40"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe tu alojamiento, servicios, ubicación y lo que lo hace especial..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="base_price">Precio Base por Noche (COP) *</Label>
              <Input
                id="base_price"
                type="number"
                min="0"
                step="1000"
                value={formData.base_price || ''}
                onChange={(e) => setFormData({ ...formData, base_price: parseInt(e.target.value) || 0 })}
                placeholder="150000"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Imágenes *</Label>
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="URL de la imagen"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <Button type="button" onClick={addImage} variant="outline">
                Agregar
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Comodidades *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {commonAmenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant={formData.amenities.includes(amenity) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Agregar comodidad personalizada"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAmenity())}
              />
              <Button type="button" onClick={addCustomAmenity} variant="outline">
                Agregar
              </Button>
            </div>
            {formData.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Crear Alojamiento'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
