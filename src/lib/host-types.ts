export interface HostProperty {
  id: string
  hostId: string
  name: string
  type: 'casa' | 'apartamento' | 'casa_campestre' | 'hotel' | 'hostal' | 'cabaña' | 'glamping' | 'finca'
  category: 'hotel' | 'hostal' | 'casa_rural' | 'agroturismo' | 'posada' | 'resort' | 'apartahotel'
  status: 'activo' | 'en_revision' | 'inactivo' | 'suspendido' | 'borrador'
  location: {
    country: string
    department: string
    city: string
    address: string
    coordinates?: { lat: number; lng: number }
    showExactLocation: boolean
  }
  capacity: {
    maxGuests: number
    bedrooms: number
    beds: number
    bathrooms: number
  }
  amenities: {
    essential: string[]
    security: string[]
    extras: string[]
  }
  gastronomy?: {
    hasBreakfast: boolean
    hasRestaurant: boolean
    hasLocalFood: boolean
    hasTastings: boolean
    hasRoomService: boolean
    hasCommunalKitchen: boolean
  }
  images: string[]
  pricing: {
    basePrice: number
    cleaningFee: number
    currency: string
    weeklyDiscount?: number
    monthlyDiscount?: number
  }
  policies: {
    checkIn: string
    checkOut: string
    minStay: number
    maxStay?: number
    cancellation: 'flexible' | 'moderada' | 'estricta'
    pets: boolean
    smoking: boolean
    parties: boolean
  }
  documents: {
    rnt?: string
    rut?: string
    camaraComercio?: string
    status: 'pending' | 'approved' | 'rejected'
  }
  metrics: {
    rating: number
    reviewCount: number
    responseRate: number
    responseTime: string
    acceptanceRate: number
    totalReservations: number
    occupancyRate: number
  }
  aiRecommendations?: {
    id: string
    type: 'price' | 'photos' | 'description' | 'amenities' | 'availability'
    message: string
    impact: string
    priority: 'high' | 'medium' | 'low'
  }[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface HostReservation {
  id: string
  propertyId: string
  propertyName: string
  guestId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'pendiente' | 'confirmada' | 'en_curso' | 'completada' | 'cancelada' | 'no_show'
  paymentStatus: 'pendiente' | 'pagado' | 'reembolsado'
  specialRequests?: string
  aiRiskScore?: number
  aiPredictions?: {
    noShowRisk: number
    cancellationRisk: number
    positiveReviewProbability: number
  }
  createdAt: string
}

export interface HostAlert {
  id: string
  type: 'urgent' | 'warning' | 'info' | 'success'
  category: 'photos' | 'pricing' | 'documents' | 'reviews' | 'availability' | 'system'
  title: string
  message: string
  propertyId?: string
  impact?: string
  actionLabel?: string
  actionRoute?: string
  createdAt: string
  read: boolean
}

export interface HostMetrics {
  todayCheckIns: number
  todayCheckOuts: number
  upcomingReservations: number
  monthlyRevenue: number
  monthlyRevenueChange: number
  averageOccupancy: number
  totalReviews: number
  averageRating: number
  responseRate: number
  activeProperties: number
  pendingActions: number
}

export interface HostService {
  id: string
  hostId: string
  type: 'transporte' | 'experiencia' | 'guia' | 'caminata' | 'degustacion' | 'tour' | 'atraccion'
  name: string
  description: string
  category: string
  duration: string
  maxCapacity: number
  pricePerPerson: number
  includesTransport: boolean
  includesFood: boolean
  includesGuide: boolean
  includesEquipment: boolean
  difficultyLevel?: 'facil' | 'moderado' | 'dificil'
  minAge?: number
  location: {
    city: string
    department: string
    meetingPoint: string
  }
  images: string[]
  availability: {
    daysOfWeek: number[]
    startTime: string
    endTime: string
  }
  status: 'activo' | 'en_revision' | 'inactivo'
  rating: number
  reviewCount: number
  createdAt: string
}

export interface HostVehicle {
  id: string
  hostId: string
  type: 'auto' | 'suv' | '4x4' | 'moto' | 'camioneta' | 'van'
  brand: string
  model: string
  year: number
  transmission: 'manual' | 'automatica'
  pricePerDay: number
  deposit: number
  requirements: {
    minAge: number
    licenseRequired: boolean
  }
  delivery: {
    airport: boolean
    accommodation: boolean
    fixedLocation: boolean
    locationAddress?: string
  }
  features: string[]
  images: string[]
  status: 'disponible' | 'reservado' | 'mantenimiento'
  rating: number
  reviewCount: number
  createdAt: string
}

export interface AIInsight {
  id: string
  propertyId?: string
  type: 'optimization' | 'opportunity' | 'warning' | 'prediction'
  title: string
  description: string
  expectedImpact: string
  confidence: number
  actionItems: {
    label: string
    action: () => void
  }[]
  createdAt: string
}

export interface HostProfile {
  id: string
  name: string
  email: string
  phone: string
  documentType: 'cedula' | 'pasaporte' | 'nit'
  documentNumber: string
  country: string
  city: string
  bio?: string
  languages: string[]
  isVerified: boolean
  isSuperhost: boolean
  memberSince: string
  responseTime: string
  responseRate: number
  paymentMethods: {
    bankAccount?: {
      bank: string
      accountNumber: string
      accountType: 'ahorros' | 'corriente'
    }
    mercadoPago?: boolean
  }
  preferences: {
    language: string
    currency: string
    notifications: {
      email: boolean
      sms: boolean
      whatsapp: boolean
    }
  }
  twoFactorEnabled: boolean
}

export interface HostComplaint {
  id: string
  propertyId: string
  guestId: string
  guestName: string
  reservationId: string
  type: 'alojamiento' | 'servicio' | 'seguridad' | 'limpieza' | 'cancelacion' | 'otro'
  severity: 'baja' | 'media' | 'alta' | 'critica'
  description: string
  evidence?: string[]
  status: 'abierta' | 'en_investigacion' | 'resuelta' | 'cerrada'
  hostResponse?: string
  adminNotes?: string
  createdAt: string
  resolvedAt?: string
}

export interface HostReview {
  id: string
  propertyId: string
  reservationId: string
  guestName: string
  rating: number
  categories: {
    cleanliness: number
    communication: number
    checkIn: number
    accuracy: number
    location: number
    value: number
  }
  comment: string
  response?: string
  photos?: string[]
  aiSentiment?: 'positive' | 'neutral' | 'negative'
  aiTopics?: string[]
  createdAt: string
  respondedAt?: string
}
