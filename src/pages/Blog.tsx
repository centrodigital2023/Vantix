import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from '@phosphor-icons/react'

const blogPosts = [
  {
    id: '1',
    title: 'Los 10 mejores destinos de Colombia para 2024',
    excerpt: 'Descubre los lugares más increíbles que debes visitar en tu próximo viaje a Colombia',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=500&fit=crop',
    author: 'Laura Martínez',
    date: '15 de Marzo, 2024',
    category: 'Guías'
  },
  {
    id: '2',
    title: 'Guía completa del café colombiano',
    excerpt: 'Todo lo que necesitas saber sobre el café de Colombia y las mejores fincas para visitar',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop',
    author: 'Carlos Gómez',
    date: '12 de Marzo, 2024',
    category: 'Gastronomía'
  },
  {
    id: '3',
    title: 'Aventura en el Parque Tayrona',
    excerpt: 'Consejos y recomendaciones para disfrutar al máximo este paraíso natural',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=500&fit=crop',
    author: 'Ana Rodríguez',
    date: '8 de Marzo, 2024',
    category: 'Aventura'
  }
]

export function Blog() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Blog de Experiencias
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Historias inspiradoras, guías de viaje y consejos para explorar Colombia
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <Badge className="mb-3">{post.category}</Badge>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {post.date}
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