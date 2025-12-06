import { HeroSection } from '@/components/HeroSection'
import { WelcomeMessage } from '@/components/WelcomeMessage'
import { CategoryCard } from '@/components/CategoryCard'
import { Testimonials } from '@/components/Testimonials'
import { CallToAction } from '@/components/CallToAction'
import { PageRoute, Testimonial, SearchFilters } from '@/lib/types'
import { CATEGORIES } from '@/lib/data'
import { useKV } from '@github/spark/hooks'

interface HomeProps {
  onNavigate: (page: PageRoute) => void
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    location: 'Madrid, España',
    text: 'SendAI hizo que planificar mi viaje a Colombia fuera increíblemente fácil. El itinerario generado por IA fue perfecto para mis intereses.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5
  },
  {
    id: '2',
    name: 'John Smith',
    location: 'New York, USA',
    text: 'La combinación de tecnología y conocimiento local es impresionante. Descubrí lugares que nunca habría encontrado por mi cuenta.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    location: 'Buenos Aires, Argentina',
    text: 'Las recomendaciones de alojamiento fueron excelentes y el servicio al cliente superó mis expectativas. ¡Volveré a usar SendAI!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5
  }
]

export function Home({ onNavigate }: HomeProps) {
  const [, setSearchFilters] = useKV<SearchFilters>('current-search-filters', {})

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(() => filters)
  }

  return (
    <>
      <HeroSection onNavigate={onNavigate} onSearch={handleSearch} />
      
      <WelcomeMessage />
      
      <div className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explora por categoría
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onNavigate(`categoria-${category.slug}` as PageRoute)}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Testimonials testimonials={testimonials} />
      
      <CallToAction onNavigate={onNavigate} />
    </>
  )
}