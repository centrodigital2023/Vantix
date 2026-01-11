import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartLine, House, Eye, Star, PencilSimple, Trash, Plus } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/AuthModal'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { DashboardAnfitrion } from './panel-anfitrion/DashboardAnfitrion'
import { RegistroAlojamientoWizard } from './panel-anfitrion/RegistroAlojamientoWizard'

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
  const [vistaActual, setVistaActual] = useState<'dashboard' | 'registro'>('dashboard')
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

  if (vistaActual === 'registro') {
    return (
      <RegistroAlojamientoWizard 
        onComplete={() => {
          setVistaActual('dashboard')
          toast.success('¡Alojamiento registrado exitosamente!')
        }}
      />
    )
  }

  return <DashboardAnfitrion />
}