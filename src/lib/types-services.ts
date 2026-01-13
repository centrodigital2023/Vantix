export type ServiceCategory = 
  | 'transport'
  | 'tour'
  | 'attraction'
  | 'experience'
  | 'guide'
  | 'gastronomy'

export type ServiceStatus = 
  | 'draft'
  | 'review'
  | 'active'
  | 'suspended'
  | 'deleted'

export type ProviderStatus = 
  | 'active'
  | 'suspended'
  | 'blocked'

export type DocumentType = 
  | 'rut'
  | 'rnt'
  | 'license'
  | 'insurance'
  | 'chamber_commerce'
  | 'id_document'

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type ComplaintSeverity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'

export type RiskLevel = 'BAJO' | 'MEDIO' | 'ALTO'

export interface ServiceProvider {
  id: string
  user_id: string
  business_name: string
  document_type: string
  document_number: string
  phone: string
  email: string
  status: ProviderStatus
  created_at: string
  updated_at?: string
}

export interface Service {
  id: string
  provider_id: string
  category: ServiceCategory
  name: string
  description: string
  short_description?: string
  location: {
    address: string
    city: string
    department: string
    coordinates?: { lat: number; lng: number }
  }
  coverage_area?: string
  capacity: number
  duration?: string
  physical_level?: 'easy' | 'moderate' | 'hard' | 'extreme'
  languages: string[]
  target_audience?: string[]
  price_per_person: number
  price_per_group?: number
  minimum_people?: number
  maximum_people?: number
  age_minimum?: number
  includes: string[]
  requirements?: string[]
  meeting_point?: string
  schedule?: {
    days: string[]
    start_time: string
    end_time: string
  }[]
  availability_dates?: string[]
  cancellation_policy: 'flexible' | 'moderate' | 'strict'
  images: string[]
  featured_image?: string
  status: ServiceStatus
  ai_optimized: boolean
  ai_suggestions?: Record<string, any>
  rating?: number
  reviews_count?: number
  created_at: string
  updated_at?: string
  checks_accepted?: {
    intermediary_role: boolean
    legal_responsibility: boolean
    ai_validation: boolean
    compliance: boolean
    commissions: boolean
    insurance: boolean
  }
}

export interface TransportDetails {
  vehicle_type: string
  vehicle_capacity: number
  routes: {
    origin: string
    destination: string
    stops?: string[]
  }[]
  insurance_policy: string
  driver_license?: string
}

export interface TourDetails {
  itinerary: {
    time: string
    activity: string
    location: string
  }[]
  guide_certification?: string
  difficulty_level: string
}

export interface AttractionDetails {
  attraction_type: string
  safety_equipment: string[]
  safety_rules: string[]
  risk_level: RiskLevel
  height_restriction?: number
  weight_restriction?: number
}

export interface ExperienceDetails {
  experience_type: string
  equipment_included: string[]
  equipment_required?: string[]
  location_type: 'urban' | 'rural' | 'nature' | 'mountain' | 'water'
}

export interface GastronomyDetails {
  cuisine_type: string[]
  menu_items: {
    name: string
    description: string
    price?: number
  }[]
  dietary_options: string[]
  sanitary_certification?: string
  allergen_info?: string[]
}

export interface ServiceDocument {
  id: string
  provider_id: string
  document_type: DocumentType
  file_url: string
  file_name: string
  ai_validation: {
    legible: boolean
    coherente: boolean
    vigente: boolean
    riesgo_legal: RiskLevel
    observaciones: string
    accion_recomendada: 'APROBAR' | 'REVISION' | 'RECHAZAR'
    confidence_score: number
  }
  status: 'approved' | 'review' | 'rejected'
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
}

export interface ServiceBooking {
  id: string
  service_id: string
  tourist_id: string
  tourist_name: string
  tourist_email: string
  tourist_phone: string
  booking_date: string
  service_date: string
  number_of_people: number
  total_price: number
  commission_amount: number
  payment_status: 'pending' | 'paid' | 'refunded'
  service_status: BookingStatus
  special_requests?: string
  cancellation_reason?: string
  created_at: string
  updated_at?: string
}

export interface ServiceComplaint {
  id: string
  service_id: string
  booking_id?: string
  tourist_id: string
  tourist_name: string
  complaint_type: 
    | 'safety'
    | 'quality'
    | 'fraud'
    | 'cancelation'
    | 'payment'
    | 'communication'
    | 'other'
  description: string
  evidence_urls?: string[]
  severity: ComplaintSeverity
  status: 'open' | 'investigating' | 'resolved' | 'escalated' | 'closed'
  admin_notes?: string
  resolution?: string
  created_at: string
  resolved_at?: string
}

export interface ServiceContract {
  id: string
  provider_id: string
  service_id?: string
  contract_version: string
  contract_type: 'PRESTADOR_SERVICIOS'
  accepted: boolean
  accepted_at?: string
  ip_address?: string
  user_agent?: string
  signature_hash?: string
  pdf_url?: string
  checks_accepted: {
    intermediary_role: boolean
    legal_responsibility: boolean
    ai_validation: boolean
    compliance: boolean
    commissions: boolean
    insurance?: boolean
  }
  created_at: string
}

export interface AIServiceOptimization {
  title_suggestions: string[]
  description_improved: string
  seo_keywords: string[]
  price_recommendation: {
    suggested_price: number
    market_average: number
    reasoning: string
  }
  visibility_score: number
  improvement_suggestions: {
    category: string
    priority: 'low' | 'medium' | 'high'
    suggestion: string
    expected_impact: string
  }[]
}

export interface ProviderDashboardMetrics {
  total_services: number
  active_services: number
  pending_bookings: number
  completed_bookings: number
  total_revenue: number
  monthly_revenue: number
  average_rating: number
  total_reviews: number
  complaint_count: number
  occupancy_rate: number
  conversion_rate: number
}

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  transport: 'Transporte turístico',
  tour: 'Tours guiados',
  attraction: 'Atracciones',
  experience: 'Experiencias',
  guide: 'Guías turísticos',
  gastronomy: 'Gastronomía turística'
}

export const SERVICE_CATEGORY_ICONS: Record<ServiceCategory, string> = {
  transport: '🚐',
  tour: '🗺️',
  attraction: '🎢',
  experience: '🌿',
  guide: '🧑‍🏫',
  gastronomy: '🍽️'
}

export const SERVICE_CATEGORY_COLORS: Record<ServiceCategory, string> = {
  transport: 'oklch(0.60 0.15 220)',
  tour: 'oklch(0.55 0.12 155)',
  attraction: 'oklch(0.65 0.18 25)',
  experience: 'oklch(0.58 0.13 145)',
  guide: 'oklch(0.52 0.14 265)',
  gastronomy: 'oklch(0.62 0.16 50)'
}
