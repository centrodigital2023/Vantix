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
  images?: string[]
  price: number
  rating: number
  featured: boolean
  reviews?: number
  location?: {
    lat: number
    lon: number
    city: string
    department: string
  }
  amenities?: string[]
  policies?: {
    checkIn: string
    checkOut: string
    cancellation: string
  }
}

export interface Accommodation {
  id: string
  name: string
  type: 'hotel' | 'hostel' | 'apartment' | 'house' | 'resort' | 'cabin'
  category: string
  region: string
  city: string
  department: string
  description: string
  images: string[]
  pricePerNight: number
  rating: number
  reviewCount: number
  featured: boolean
  latitude: number
  longitude: number
  amenities: string[]
  roomTypes: RoomType[]
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    childrenAllowed: boolean
    petsAllowed: boolean
  }
  contact: {
    phone: string
    email: string
    website?: string
  }
  availability: Record<string, boolean>
}

export interface RoomType {
  id: string
  name: string
  description: string
  maxGuests: number
  bedType: string
  pricePerNight: number
  images: string[]
  amenities: string[]
  available: number
}

export interface SearchFilters {
  destination?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  rooms?: number
  priceMin?: number
  priceMax?: number
  rating?: number
  category?: string
  region?: string
  amenities?: string[]
  propertyType?: string[]
  sortBy?: 'price' | 'rating' | 'distance' | 'popular'
}

export interface Booking {
  id: string
  userId: string
  accommodationId: string
  roomTypeId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  guestInfo: {
    name: string
    email: string
    phone: string
    idNumber?: string
    specialRequests?: string
  }
  paymentInfo?: {
    method: 'mercadopago' | 'card' | 'cash'
    transactionId?: string
    paymentStatus: 'pending' | 'approved' | 'rejected' | 'refunded'
    preferenceId?: string
  }
}

export interface PaymentPreference {
  id: string
  init_point: string
  sandbox_init_point: string
}

export interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  idNumber: string
  specialRequests?: string
  acceptTerms: boolean
}

export interface Review {
  id: string
  userId: string
  accommodationId: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
  photos?: string[]
  response?: {
    text: string
    date: string
  }
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
  role: 'owner' | 'admin' | 'guest'
  createdAt: string
  avatarUrl?: string
  phone?: string
  preferences?: {
    currency: string
    language: string
  }
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
  | 'detalle-alojamiento'
  | 'reserva-confirmacion'
  | 'reserva-exitosa'
  | 'mis-reservas'
  | 'favoritos'
  | 'feed-personalizado'
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
  | 'faq'
  | 'centro-de-seguridad'
  | 'soporte-turista'
  | 'como-reservar'
  | 'estado-de-mi-reserva'
  | 'destinos'
  | 'tours'
  | 'alojamientos'
  | 'transportes'
  | 'comida-tipica'
  | 'mapa-turistico'
  | 'turismo-pasto'
  | 'tours-narino'
  | 'que-hacer-en-pasto'
  | 'lugares-imperdibles-narino'
  | 'aventura'
  | 'cultura'
  | 'gastronomia'
  | 'naturaleza'
  | 'senderismo'
  | 'festivales-de-colombia'
  | 'sobre-nosotros'
  | 'mision-vision'
  | 'por-que-elegirnos'
  | 'testimonios'
  | 'preguntas-frecuentes'
  | 'terminos'
  | 'privacidad'
  | 'cookies'
  | 'reembolsos'
  | 'politica-de-cancelacion'
  | 'guia-del-viajero'
  | 'articulos'
  | 'noticias-de-turismo'
  | 'agencias'
  | 'colaboradores'
  | 'afiliados'
  | 'guias-turisticos'
  | 'viajes-baratos'
  | 'promociones'
  | 'ofertas'
  | 'planes-fin-de-semana'
