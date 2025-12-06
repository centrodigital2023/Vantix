import { CategoryTemplate } from '@/components/CategoryTemplate'
import { Card } from '@/components/ui/card'
import { CATEGORIES } from '@/lib/data'
import { Star, MapPin } from '@phosphor-icons/react'

const category = CATEGORIES.find(c => c.slug === 'aventura')!

const destinations = [
  { name: 'Parapente en Chicamocha', location: 'Santander', rating: 4.9, image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=400&h=300&fit=crop' },
  { name: 'Rafting en el Río Magdalena', location: 'Huila', rating: 4.8, image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop' },
  { name: 'Escalada en Suesca', location: 'Cundinamarca', rating: 4.7, image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=300&fit=crop' }
]

export function Aventura() {
  return (
    <CategoryTemplate category={category}>
      <div className="grid md:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <Card key={dest.name} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="aspect-video overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{dest.name}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><MapPin size={14} />{dest.location}</div>
                <div className="flex items-center gap-1"><Star size={14} weight="fill" className="text-accent" />{dest.rating}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </CategoryTemplate>
  )
}