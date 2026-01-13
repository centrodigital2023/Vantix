export type ServiceType = 
  | 'accommodation'
  | 'transport'
  | 'vehicle_rental'
  | 'guide'
  | 'hiking'
  | 'experience'
  | 'attraction'
  | 'route'

export type AccommodationType =
  | 'hotel'
  | 'hostel'
  | 'house'
  | 'apartment'
  | 'cabin'
  | 'glamping'
  | 'boutique_hotel'
  | 'resort'
  | 'rural_house'
  | 'agro tourism'
  | 'motel'

export type TransportType =
  | 'private'
  | 'shared'
  | 'shuttle'
  | 'fixed_route'

export type VehicleType =
  | 'car'
  | 'suv'
  | '4x4'
  | 'van'
  | 'bus'
  | 'motorcycle'

export type Transmission = 'manual' | 'automatic'

export type DifficultyLevel = 'easy' | 'moderate' | 'hard' | 'expert'

export type ExperienceCategory =
  | 'coffee_tasting'
  | 'rural_experience'
  | 'cultural_workshop'
  | 'gastronomy'
  | 'adventure'
  | 'wellness'

export interface BaseService {
  id: string
  providerId: string
  providerName: string
  type: ServiceType
  name: string
  description: string
  shortDescription: string
  images: string[]
  location: {
    lat: number
    lon: number
    address: string
    city: string
    department: string
    country: string
  }
  pricing: {
    basePrice: number
    currency: string
    unit: 'night' | 'day' | 'hour' | 'person' | 'trip' | 'km' | 'tour'
    discounts?: {
      weekly?: number
      monthly?: number
      seasonal?: number
    }
  }
  availability: {
    calendar: Record<string, boolean>
    schedules?: string[]
  }
  rating: number
  reviewCount: number
  featured: boolean
  verified: boolean
  status: 'pending' | 'active' | 'suspended' | 'rejected'
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
  checks_accepted?: {
    intermediary_role: boolean
    legal_responsibility: boolean
    ai_validation: boolean
    compliance: boolean
    commissions: boolean
    insurance: boolean
  }
}

export interface AccommodationService extends BaseService {
  type: 'accommodation'
  accommodationType: AccommodationType
  category: string
  capacity: {
    maxGuests: number
    bedrooms: number
    beds: number
    bathrooms: number
    extraBeds?: number
  }
  amenities: string[]
  houseRules: {
    checkIn: string
    checkOut: string
    childrenAllowed: boolean
    petsAllowed: boolean
    smokingAllowed: boolean
    partiesAllowed: boolean
  }
  policies: {
    cancellation: 'flexible' | 'moderate' | 'strict'
    minStay: number
    maxStay?: number
    deposit?: number
  }
  roomTypes?: RoomType[]
  contact: {
    phone: string
    email: string
    whatsapp?: string
    website?: string
  }
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

export interface TransportService extends BaseService {
  type: 'transport'
  transportType: TransportType
  vehicleType: VehicleType
  capacity: {
    passengers: number
    luggage: number
  }
  routes: Route[]
  includedServices: string[]
  driver: {
    included: boolean
    languages?: string[]
    certified?: boolean
  }
  pricing: {
    basePrice: number
    currency: string
    unit: 'trip' | 'hour' | 'day' | 'km'
    perPerson?: boolean
    perVehicle?: boolean
    discounts?: {
      weekly?: number
      monthly?: number
      seasonal?: number
    }
  }
}

export interface Route {
  id: string
  origin: string
  destination: string
  stops?: string[]
  duration: number
  distance: number
  schedule?: string[]
}

export interface VehicleRentalService extends BaseService {
  type: 'vehicle_rental'
  vehicleType: VehicleType
  transmission: Transmission
  features: {
    year: number
    brand: string
    model: string
    color: string
    fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid'
    doors: number
    airConditioning: boolean
  }
  capacity: {
    passengers: number
    luggage: number
  }
  requirements: {
    minAge: number
    drivingLicenseRequired: boolean
    deposit: number
  }
  delivery: {
    airport: boolean
    accommodation: boolean
    fixedLocation?: string
  }
  included: string[]
  insurance: {
    basic: boolean
    full?: boolean
    cost?: number
  }
}

export interface GuideService extends BaseService {
  type: 'guide'
  specialties: string[]
  languages: string[]
  certifications: string[]
  experience: {
    years: number
    tours: number
    rating: number
  }
  availability: {
    calendar: Record<string, boolean>
    schedules: string[]
  }
  pricing: {
    basePrice: number
    currency: string
    unit: 'hour' | 'day' | 'tour'
    groupDiscount?: boolean
    discounts?: {
      weekly?: number
      monthly?: number
      seasonal?: number
    }
  }
}

export interface HikingService extends BaseService {
  type: 'hiking'
  difficulty: DifficultyLevel
  duration: {
    hours: number
    days?: number
  }
  distance: number
  elevation: {
    gain: number
    max: number
  }
  requirements: {
    minAge: number
    fitnessLevel: string
    equipment: string[]
  }
  included: {
    guide: boolean
    transport: boolean
    food: boolean
    equipment: boolean
    insurance: boolean
  }
  maxGroupSize: number
  seasons: string[]
}

export interface ExperienceService extends BaseService {
  type: 'experience'
  category: ExperienceCategory
  duration: {
    value: number
    unit: 'hours' | 'days'
  }
  maxParticipants: number
  minAge?: number
  difficulty?: DifficultyLevel
  included: string[]
  requirements?: string[]
  languages: string[]
  schedule: string[]
  meetingPoint: {
    description: string
    lat: number
    lon: number
  }
}

export interface AttractionService extends BaseService {
  type: 'attraction'
  category: string
  features: string[]
  safetyMeasures: string[]
  restrictions: {
    minAge?: number
    maxAge?: number
    minHeight?: number
    maxHeight?: number
    healthRestrictions?: string[]
  }
  included: string[]
  duration: {
    value: number
    unit: 'hours' | 'minutes'
  }
  maxCapacity: number
  bestTime: string[]
  weatherDependent: boolean
}

export interface TourRoute extends BaseService {
  type: 'route'
  stops: RouteStop[]
  totalDuration: {
    days: number
    hours: number
  }
  totalDistance: number
  difficulty: DifficultyLevel
  recommended: {
    season: string[]
    groupSize: number
  }
  included: {
    accommodation: boolean
    transport: boolean
    experiences: boolean
    guide: boolean
    food: boolean
  }
  itinerary: DayItinerary[]
}

export interface RouteStop {
  id: string
  name: string
  description: string
  lat: number
  lon: number
  order: number
  duration: number
  activities: string[]
}

export interface DayItinerary {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string[]
  accommodation?: string
  transport?: string
}

export type Service =
  | AccommodationService
  | TransportService
  | VehicleRentalService
  | GuideService
  | HikingService
  | ExperienceService
  | AttractionService
  | TourRoute

export interface ServiceCombination {
  id: string
  name: string
  description: string
  services: {
    serviceId: string
    serviceType: ServiceType
    required: boolean
  }[]
  totalPrice: number
  discount: number
  finalPrice: number
  validUntil: string
  minPurchase?: number
  image: string
}

export interface ServiceBooking {
  id: string
  userId: string
  serviceId: string
  serviceType: ServiceType
  serviceName: string
  providerId: string
  providerName: string
  date: string
  endDate?: string
  guests?: number
  participants?: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded'
  paymentStatus: 'pending' | 'approved' | 'rejected' | 'refunded'
  paymentMethod: 'mercadopago' | 'card' | 'cash' | 'transfer'
  transactionId?: string
  guestInfo: {
    name: string
    email: string
    phone: string
    idNumber?: string
    specialRequests?: string
  }
  createdAt: string
  updatedAt: string
  cancellationReason?: string
  refundAmount?: number
}

export interface ProviderDashboard {
  provider: {
    id: string
    name: string
    email: string
    phone?: string
    type: 'host' | 'service_provider'
    verified: boolean
    rating: number
    joinedAt: string
  }
  services: {
    total: number
    active: number
    pending: number
    suspended: number
    byType: Record<ServiceType, number>
  }
  bookings: {
    today: number
    upcoming: number
    past: number
    total: number
    revenue: number
  }
  pendingActions: {
    photos: number
    pricing: number
    availability: number
    reviews: number
  }
  insights: {
    occupancyRate: number
    averageRating: number
    responseTime: number
    recommendedPrice?: number
    demandForecast?: string
  }
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'booking' | 'review' | 'message' | 'alert' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
  priority: 'low' | 'medium' | 'high'
}

export interface ServiceWizardStep {
  id: number
  title: string
  description: string
  fields: FormField[]
  validation: Record<string, any>
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'multiselect' | 'checkbox' | 'textarea' | 'file' | 'map' | 'calendar'
  required: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
  help?: string
  conditional?: {
    field: string
    value: any
  }
}
