import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'sonner'
import { CATEGORIES, REGIONS } from '@/lib/data'

export function RegistroAlojamiento() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Propiedad registrada exitosamente!')
    setName('')
    setCategory('')
    setRegion('')
    setDescription('')
    setPrice('')
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