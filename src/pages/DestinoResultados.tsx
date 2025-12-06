import { Card } from '@/components/ui/card'
import { SearchBar } from '@/components/SearchBar'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin } from '@phosphor-icons/react'

const results = [
  {
    id: '1',
    name: 'Villa Caribe Hotel',
    category: 'Playa',
    region: 'Caribe',
    description: 'Hotel boutique frente al mar en Cartagena',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop',
    price: 250000,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Hacienda Café Colombia',
    category: 'Rural',
    region: 'Andina',
    description: 'Experiencia auténtica en finca cafetera',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    price: 180000,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Eco Lodge Amazonas',
    category: 'Naturaleza',
    region: 'Amazonia',
    description: 'Alojamiento sostenible en el corazón de la selva',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
    price: 300000,
    rating: 4.7
  }
]

export function DestinoResultados() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Resultados de búsqueda
        </h1>
        
        <div className="mb-12">
          <SearchBar />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={result.image}
                  alt={result.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                  {result.category}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin size={16} />
                  {result.region}
                </div>
                <p className="text-muted-foreground mb-4">{result.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} weight="fill" className="text-accent" />
                    <span className="font-semibold">{result.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Desde</div>
                    <div className="text-lg font-bold text-primary">
                      ${result.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}