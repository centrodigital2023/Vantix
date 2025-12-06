import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartLine, House, Eye, Star, PencilSimple, Trash } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/AuthModal'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface PropietariosProps {
  onNavigate: (page: PageRoute) => void
}

interface Property {
  id: string
  name: string
  category: string
  bookings: number
  rating: number
  ownerId: string
}

const stats = [
  { label: 'Total Propiedades', value: '12', icon: House },
  { label: 'Vistas este mes', value: '3,245', icon: Eye },
  { label: 'Rating Promedio', value: '4.8', icon: Star },
  { label: 'Reservas Activas', value: '28', icon: ChartLine }
]

export function Propietarios({ onNavigate }: PropietariosProps) {
  const { isAuthenticated, user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [properties, setProperties] = useKV<Property[]>('user-properties', [
    { id: '1', name: 'Villa Caribe Cartagena', category: 'Playa', bookings: 8, rating: 4.9, ownerId: 'default' },
    { id: '2', name: 'Casa Rural La Montaña', category: 'Rural', bookings: 5, rating: 4.7, ownerId: 'default' },
    { id: '3', name: 'Apartamento Centro Bogotá', category: 'Negocios', bookings: 15, rating: 4.8, ownerId: 'default' }
  ])

  const handleDeleteProperty = (propertyId: string) => {
    setProperties((current) => (current || []).filter(p => p.id !== propertyId))
    toast.success('Propiedad eliminada exitosamente')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <House size={64} className="text-primary mx-auto mb-4" weight="duotone" />
          <h1 className="text-3xl font-bold mb-2">Panel de Propietarios</h1>
          <p className="text-muted-foreground mb-6">
            Gestiona tus propiedades turísticas, visualiza estadísticas y administra reservas
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Panel de Propietarios</h1>
            <p className="text-muted-foreground">Bienvenido, {user?.name}</p>
          </div>
          <Button onClick={() => onNavigate('registro-alojamiento')} size="lg">
            Registrar Nueva Propiedad
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            )
          })}
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Tus Propiedades</h2>
          {!properties || properties.length === 0 ? (
            <div className="text-center py-12">
              <House size={64} className="text-muted-foreground mx-auto mb-4" weight="duotone" />
              <h3 className="text-xl font-semibold mb-2">No tienes propiedades registradas</h3>
              <p className="text-muted-foreground mb-6">Comienza registrando tu primera propiedad</p>
              <Button onClick={() => onNavigate('registro-alojamiento')}>
                Registrar Primera Propiedad
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{property.name}</h3>
                    <p className="text-sm text-muted-foreground">{property.category}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Reservas</div>
                      <div className="font-semibold">{property.bookings}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Rating</div>
                      <div className="font-semibold flex items-center gap-1">
                        <Star size={16} weight="fill" className="text-accent" />
                        {property.rating}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <PencilSimple size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}