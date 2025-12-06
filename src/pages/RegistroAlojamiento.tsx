import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'sonner'
import { CATEGORIES, REGIONS } from '@/lib/data'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/AuthModal'
import { House } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

interface Property {
  id: string
  name: string
  category: string
  region: string
  description: string
  price: string
  ownerId: string
  createdAt: string
}

export function RegistroAlojamiento() {
  const { isAuthenticated, user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [properties, setProperties] = useKV<Property[]>('user-properties', [])
  
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    const newProperty: Property = {
      id: `property_${Date.now()}`,
      name,
      category,
      region,
      description,
      price,
      ownerId: user.id,
      createdAt: new Date().toISOString()
    }
    
    setProperties((current) => [...(current || []), newProperty])
    
    toast.success('¡Propiedad registrada exitosamente!')
    setName('')
    setCategory('')
    setRegion('')
    setDescription('')
    setPrice('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <House size={64} className="text-primary mx-auto mb-4" weight="duotone" />
          <h1 className="text-3xl font-bold mb-2">Registrar Alojamiento</h1>
          <p className="text-muted-foreground mb-6">
            Necesitas iniciar sesión para registrar una propiedad
          </p>
          <Button size="lg" onClick={() => setShowAuthModal(true)} className="w-full">
            Iniciar Sesión / Registrarse
          </Button>
        </Card>
        
        {showAuthModal && (
          <AuthModal
            onSuccess={() => setShowAuthModal(false)}
            onCancel={() => setShowAuthModal(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Registrar Alojamiento
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Comparte tu propiedad con viajeros de todo el mundo
        </p>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del Alojamiento</label>
              <Input 
                id="property-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Villa Caribe Cartagena"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Categoría</label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Región</label>
              <Select value={region} onValueChange={setRegion} required>
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

            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <Textarea 
                id="property-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe tu propiedad, servicios y comodidades..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Precio por noche (COP)</label>
              <Input 
                id="property-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="250000"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Registrar Propiedad
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}