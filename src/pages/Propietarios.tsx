import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartLine, House, Eye, Star } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface PropietariosProps {
  onNavigate: (page: PageRoute) => void
}

const stats = [
  { label: 'Total Propiedades', value: '12', icon: House },
  { label: 'Vistas este mes', value: '3,245', icon: Eye },
  { label: 'Rating Promedio', value: '4.8', icon: Star },
  { label: 'Reservas Activas', value: '28', icon: ChartLine }
]

export function Propietarios({ onNavigate }: PropietariosProps) {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Panel de Propietarios</h1>
            <p className="text-muted-foreground">Gestiona tus propiedades turísticas</p>
          </div>
          <Button onClick={() => onNavigate('registro-alojamiento')}>
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
          <div className="space-y-4">
            {[
              { name: 'Villa Caribe Cartagena', category: 'Playa', bookings: 8, rating: 4.9 },
              { name: 'Casa Rural La Montaña', category: 'Rural', bookings: 5, rating: 4.7 },
              { name: 'Apartamento Centro Bogotá', category: 'Negocios', bookings: 15, rating: 4.8 }
            ].map((property) => (
              <div key={property.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
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
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}