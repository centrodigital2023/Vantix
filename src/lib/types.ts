export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  image: string
}

export interface Destination {
  id: string
  name: string
  category: string
  region: string
  description: string
  image: string
  price: number
  rating: number
  featured: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  image: string
  rating: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
}

export interface Property {
  id: string
  name: string
  owner: string
  category: string
  location: string
  price: number
  rating: number
  bookings: number
}

export interface User {
  id: string
  email: string
  name: string
  role: 'owner' | 'admin'
  createdAt: string
  avatarUrl?: string
}

export type PageRoute = 
  | 'home'
  | 'explorar'
  | 'itinerario'
  | 'blog'
  | 'contacto'
  | 'propietarios'
  | 'registro-alojamiento'
  | 'destino-resultados'
  | 'categoria-aventura'
  | 'categoria-bienestar'
  | 'categoria-cultural'
  | 'categoria-familiar'
  | 'categoria-gastronomia'
  | 'categoria-naturaleza'
  | 'categoria-negocios'
  | 'categoria-playa'
  | 'categoria-religioso'
  | 'categoria-rural'
