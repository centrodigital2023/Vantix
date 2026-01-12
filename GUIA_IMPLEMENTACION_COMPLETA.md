# 🚀 GUÍA DE IMPLEMENTACIÓN COMPLETA - SENDAI S.A.S.

**Arquitectura técnica lista para sendai.lat**

---

## 📋 TABLA DE CONTENIDOS

1. [Estructura de Base de Datos](#estructura-de-base-de-datos)
2. [Sistema de Autenticación](#sistema-de-autenticación)
3. [Integración de IA](#integración-de-ia)
4. [Sistema de Pagos](#sistema-de-pagos)
5. [Gestión de Archivos](#gestión-de-archivos)
6. [APIs Externas](#apis-externas)
7. [Configuración de Roles](#configuración-de-roles)
8. [Deploy y Production](#deploy-y-production)

---

## 🗄️ ESTRUCTURA DE BASE DE DATOS

### Schema Completo Supabase PostgreSQL

```sql
-- ============================================
-- USUARIOS Y AUTENTICACIÓN
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('tourist', 'host', 'provider', 'admin', 'superadmin')) DEFAULT 'tourist',
  country TEXT DEFAULT 'CO',
  language TEXT DEFAULT 'es',
  currency TEXT DEFAULT 'COP',
  avatar_url TEXT,
  verified BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Índices para rendimiento
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_verified ON users(verified);

-- ============================================
-- ALOJAMIENTOS
-- ============================================

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('hotel', 'hostal', 'casa_rural', 'glamping', 'apartamento', 'finca')),
  description TEXT,
  location_country TEXT DEFAULT 'CO',
  location_department TEXT,
  location_city TEXT,
  location_address TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  capacity_guests INT,
  capacity_bedrooms INT,
  capacity_beds INT,
  capacity_bathrooms INT,
  price_base DECIMAL(10, 2),
  price_currency TEXT DEFAULT 'COP',
  amenities JSONB,
  photos TEXT[],
  status TEXT CHECK (status IN ('draft', 'review', 'active', 'suspended', 'rejected')) DEFAULT 'draft',
  verified_by_sendai BOOLEAN DEFAULT false,
  rating_average DECIMAL(3, 2) DEFAULT 0,
  rating_count INT DEFAULT 0,
  ai_score INT DEFAULT 0,
  views_count INT DEFAULT 0,
  bookings_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Índices
CREATE INDEX idx_properties_host ON properties(host_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(location_city);
CREATE INDEX idx_properties_verified ON properties(verified_by_sendai);

-- ============================================
-- SERVICIOS (Transporte, Tours, Experiencias)
-- ============================================

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('transporte', 'tour', 'guia', 'experiencia', 'atraccion', 'gastronomia')),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  location_country TEXT DEFAULT 'CO',
  location_city TEXT,
  duration_hours INT,
  capacity_max INT,
  difficulty_level TEXT CHECK (difficulty_level IN ('facil', 'moderado', 'dificil')),
  price_per_person DECIMAL(10, 2),
  price_currency TEXT DEFAULT 'COP',
  includes JSONB,
  photos TEXT[],
  status TEXT CHECK (status IN ('draft', 'review', 'active', 'suspended')) DEFAULT 'draft',
  verified_by_sendai BOOLEAN DEFAULT false,
  rating_average DECIMAL(3, 2) DEFAULT 0,
  rating_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_services_provider ON services(provider_id);
CREATE INDEX idx_services_type ON services(type);
CREATE INDEX idx_services_status ON services(status);

-- ============================================
-- RESERVAS
-- ============================================

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE NOT NULL,
  tourist_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  service_id UUID REFERENCES services(id),
  check_in DATE,
  check_out DATE,
  guests INT,
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  price_base DECIMAL(10, 2),
  price_commission DECIMAL(10, 2),
  price_tax DECIMAL(10, 2),
  price_total DECIMAL(10, 2),
  currency TEXT DEFAULT 'COP',
  payment_method TEXT,
  payment_status TEXT CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  payment_transaction_id TEXT,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'disputed')) DEFAULT 'pending',
  cancellation_policy TEXT,
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_bookings_tourist ON bookings(tourist_id);
CREATE INDEX idx_bookings_property ON bookings(property_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);

-- ============================================
-- CONTRATOS Y FIRMAS DIGITALES
-- ============================================

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  contract_type TEXT CHECK (contract_type IN ('host_intermediation', 'provider_intermediation', 'tourist_terms')),
  version TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  accepted BOOLEAN DEFAULT false,
  accepted_at TIMESTAMP,
  ip_address INET,
  user_agent TEXT,
  signature_hash TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_contracts_user ON contracts(user_id);
CREATE INDEX idx_contracts_type ON contracts(contract_type);

-- ============================================
-- DOCUMENTOS LEGALES
-- ============================================

CREATE TABLE legal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  service_id UUID REFERENCES services(id),
  document_type TEXT CHECK (document_type IN ('RNT', 'RUT', 'CEDULA', 'CAMARA_COMERCIO', 'LICENCIA', 'SEGURO')),
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INT,
  ai_validation_status TEXT CHECK (ai_validation_status IN ('pending', 'approved', 'review', 'rejected')) DEFAULT 'pending',
  ai_validation_score INT,
  ai_validation_notes TEXT,
  reviewed_by_admin UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_legal_docs_user ON legal_documents(user_id);
CREATE INDEX idx_legal_docs_status ON legal_documents(ai_validation_status);

-- ============================================
-- QUEJAS Y SOPORTE
-- ============================================

CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_number TEXT UNIQUE NOT NULL,
  tourist_id UUID REFERENCES users(id),
  target_type TEXT CHECK (target_type IN ('property', 'service', 'booking', 'host', 'provider')),
  target_id UUID,
  category TEXT CHECK (category IN ('seguridad', 'estafa', 'incumplimiento', 'higiene', 'mala_experiencia', 'otro')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  description TEXT NOT NULL,
  evidence_urls TEXT[],
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  assigned_to UUID REFERENCES users(id),
  resolution TEXT,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_complaints_tourist ON complaints(tourist_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);

-- ============================================
-- RESEÑAS Y CALIFICACIONES
-- ============================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  service_id UUID REFERENCES services(id),
  booking_id UUID REFERENCES bookings(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  verified_booking BOOLEAN DEFAULT false,
  helpful_count INT DEFAULT 0,
  photos TEXT[],
  response_from_host TEXT,
  response_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_reviews_property ON reviews(property_id);
CREATE INDEX idx_reviews_service ON reviews(service_id);
CREATE INDEX idx_reviews_tourist ON reviews(tourist_id);

-- ============================================
-- PRECIOS DINÁMICOS (IA)
-- ============================================

CREATE TABLE dynamic_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  service_id UUID REFERENCES services(id),
  date_from DATE,
  date_to DATE,
  price_original DECIMAL(10, 2),
  price_suggested DECIMAL(10, 2),
  price_applied DECIMAL(10, 2),
  ai_reasoning TEXT,
  demand_score INT,
  competition_score INT,
  seasonality_score INT,
  weather_impact TEXT,
  events_nearby TEXT[],
  applied BOOLEAN DEFAULT false,
  applied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_dynamic_pricing_property ON dynamic_pricing(property_id);
CREATE INDEX idx_dynamic_pricing_dates ON dynamic_pricing(date_from, date_to);

-- ============================================
-- PREFERENCIAS DE USUARIO (IA Learning)
-- ============================================

CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  favorite_categories TEXT[],
  favorite_cities TEXT[],
  budget_range JSONB,
  travel_style TEXT[],
  viewed_properties UUID[],
  viewed_services UUID[],
  searched_keywords TEXT[],
  interaction_history JSONB,
  ai_profile JSONB,
  last_updated TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_user_preferences_user ON user_preferences(user_id);

-- ============================================
-- NOTIFICACIONES
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT CHECK (type IN ('booking', 'payment', 'review', 'message', 'alert', 'recommendation', 'weather', 'event')),
  title TEXT NOT NULL,
  message TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  action_url TEXT,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- ============================================
-- LOGS DE AUDITORÍA (Inmutables)
-- ============================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id),
  actor_role TEXT,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- ============================================
-- CONFIGURACIÓN MULTI-PAÍS
-- ============================================

CREATE TABLE country_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT UNIQUE NOT NULL,
  country_name TEXT NOT NULL,
  currency TEXT NOT NULL,
  language TEXT NOT NULL,
  tax_rate DECIMAL(5, 4),
  commission_rate DECIMAL(5, 4),
  requires_rnt BOOLEAN DEFAULT false,
  legal_requirements JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Insertar Colombia por defecto
INSERT INTO country_config (country_code, country_name, currency, language, tax_rate, commission_rate, requires_rnt)
VALUES ('CO', 'Colombia', 'COP', 'es', 0.19, 0.05, false);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar número de reserva único
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_number := 'SENDAI-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(nextval('booking_number_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE booking_number_seq;

CREATE TRIGGER set_booking_number BEFORE INSERT ON bookings
FOR EACH ROW EXECUTE FUNCTION generate_booking_number();

-- Función para generar número de queja único
CREATE OR REPLACE FUNCTION generate_complaint_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.complaint_number := 'COMP-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(nextval('complaint_number_seq')::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE complaint_number_seq;

CREATE TRIGGER set_complaint_number BEFORE INSERT ON complaints
FOR EACH ROW EXECUTE FUNCTION generate_complaint_number();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ejemplo para users)
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- SuperAdmin puede ver todo
CREATE POLICY "SuperAdmin can view all"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'superadmin'
    )
  );

-- Políticas similares para otras tablas...
-- (Implementar según necesidades específicas de cada rol)

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista de propiedades activas con host info
CREATE VIEW active_properties_with_hosts AS
SELECT 
  p.*,
  u.name as host_name,
  u.email as host_email,
  u.phone as host_phone,
  u.verified as host_verified
FROM properties p
JOIN users u ON p.host_id = u.id
WHERE p.status = 'active' AND p.verified_by_sendai = true;

-- Vista de reservas con detalles
CREATE VIEW bookings_detailed AS
SELECT 
  b.*,
  p.name as property_name,
  p.location_city,
  u.name as tourist_name,
  u.email as tourist_email
FROM bookings b
LEFT JOIN properties p ON b.property_id = p.id
LEFT JOIN users u ON b.tourist_id = u.id;

-- Vista de ingresos por país
CREATE VIEW revenue_by_country AS
SELECT 
  p.location_country,
  COUNT(b.id) as total_bookings,
  SUM(b.price_total) as total_revenue,
  SUM(b.price_commission) as total_commission,
  AVG(b.price_total) as avg_booking_value
FROM bookings b
JOIN properties p ON b.property_id = p.id
WHERE b.payment_status = 'completed'
GROUP BY p.location_country;
```

---

## 🔐 SISTEMA DE AUTENTICACIÓN

### Configuración Supabase Auth

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Hook de autenticación
export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

### Implementación de Roles

```typescript
// src/lib/roles.ts
export type UserRole = 'tourist' | 'host' | 'provider' | 'admin' | 'superadmin'

export const getRoleFromUser = async (userId: string): Promise<UserRole> => {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()
  
  if (error || !data) return 'tourist'
  return data.role as UserRole
}

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const hierarchy = ['tourist', 'host', 'provider', 'admin', 'superadmin']
  return hierarchy.indexOf(userRole) >= hierarchy.indexOf(requiredRole)
}
```

---

## 🧠 INTEGRACIÓN DE IA

### Uso de Spark SDK para IA

```typescript
// src/lib/ai-helpers.ts

// Generar descripción optimizada de alojamiento
export const generatePropertyDescription = async (
  propertyData: {
    type: string
    city: string
    amenities: string[]
  }
): Promise<string> => {
  const prompt = spark.llmPrompt`
    Genera una descripción atractiva y persuasiva para un alojamiento turístico en Colombia.
    
    Tipo: ${propertyData.type}
    Ciudad: ${propertyData.city}
    Servicios: ${propertyData.amenities.join(', ')}
    
    La descripción debe:
    - Ser entre 150-200 palabras
    - Destacar la experiencia auténtica colombiana
    - Incluir keywords SEO locales
    - Usar tono cálido y acogedor
    - Mencionar atractivos cercanos
    
    Responde SOLO con la descripción, sin comillas ni formato adicional.
  `

  const description = await spark.llm(prompt, 'gpt-4o-mini')
  return description.trim()
}

// Validar documentos con IA
export const validateDocumentWithAI = async (
  documentUrl: string,
  documentType: string
): Promise<{
  valid: boolean
  score: number
  notes: string
  recommendation: 'approve' | 'review' | 'reject'
}> => {
  const prompt = spark.llmPrompt`
    Eres un auditor legal especializado en documentación turística de Colombia.
    
    Analiza este documento tipo: ${documentType}
    
    Verifica:
    1. Legibilidad y claridad
    2. Información completa
    3. Coherencia de datos
    4. Vigencia aparente
    
    Responde SOLO en formato JSON:
    {
      "valid": true/false,
      "score": 0-100,
      "notes": "observaciones detalladas",
      "recommendation": "approve" | "review" | "reject"
    }
  `

  const result = await spark.llm(prompt, 'gpt-4o', true)
  return JSON.parse(result)
}

// Sugerir precio dinámico
export const suggestDynamicPricing = async (
  propertyId: string,
  currentPrice: number,
  context: {
    city: string
    season: string
    occupancy: number
    nearbyEvents: string[]
  }
): Promise<{
  suggestedPrice: number
  reasoning: string
  confidence: number
}> => {
  const prompt = spark.llmPrompt`
    Eres un experto en pricing para turismo en Colombia.
    
    Alojamiento en ${context.city}
    Precio actual: $${currentPrice} COP
    Temporada: ${context.season}
    Ocupación zona: ${context.occupancy}%
    Eventos cercanos: ${context.nearbyEvents.join(', ')}
    
    Sugiere un precio óptimo considerando:
    - Competencia local
    - Demanda estacional
    - Eventos especiales
    - Maximización de ingresos
    
    Responde en JSON:
    {
      "suggestedPrice": número,
      "reasoning": "explicación breve",
      "confidence": 0-100
    }
  `

  const result = await spark.llm(prompt, 'gpt-4o', true)
  return JSON.parse(result)
}

// Generar itinerario inteligente
export const generateSmartItinerary = async (
  preferences: {
    destination: string
    days: number
    budget: string
    interests: string[]
  }
): Promise<any> => {
  const prompt = spark.llmPrompt`
    Crea un itinerario turístico personalizado para Colombia.
    
    Destino: ${preferences.destination}
    Días: ${preferences.days}
    Presupuesto: ${preferences.budget}
    Intereses: ${preferences.interests.join(', ')}
    
    Genera un plan día por día que incluya:
    - Actividades específicas con horarios
    - Restaurantes locales recomendados
    - Transporte sugerido
    - Costos estimados
    - Tips locales
    
    Formato JSON:
    {
      "days": [
        {
          "day": 1,
          "title": "Título del día",
          "morning": { "activity": "", "cost": 0 },
          "afternoon": { "activity": "", "cost": 0 },
          "evening": { "activity": "", "cost": 0 }
        }
      ],
      "totalEstimatedCost": 0,
      "tips": []
    }
  `

  const result = await spark.llm(prompt, 'gpt-4o', true)
  return JSON.parse(result)
}
```

---

## 💳 SISTEMA DE PAGOS

### Integración Mercado Pago

```typescript
// src/lib/payments.ts
import { useKV } from '@github/spark/hooks'

const MP_PUBLIC_KEY = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY
const MP_ACCESS_TOKEN = import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN

export const createBookingPayment = async (bookingData: {
  bookingId: string
  amount: number
  currency: string
  description: string
  payerEmail: string
}) => {
  // Crear preferencia de pago
  const preference = {
    items: [
      {
        title: bookingData.description,
        quantity: 1,
        currency_id: bookingData.currency,
        unit_price: bookingData.amount
      }
    ],
    payer: {
      email: bookingData.payerEmail
    },
    back_urls: {
      success: `${window.location.origin}/reserva-exitosa?booking=${bookingData.bookingId}`,
      failure: `${window.location.origin}/reserva-confirmacion?error=payment_failed`,
      pending: `${window.location.origin}/reserva-confirmacion?status=pending`
    },
    auto_return: 'approved',
    external_reference: bookingData.bookingId,
    notification_url: `${import.meta.env.VITE_API_URL}/webhooks/mercadopago`
  }

  // En producción, esto iría a un backend
  // Para MVP, simular el flujo
  return {
    preferenceId: 'MP-' + Math.random().toString(36).substr(2, 9),
    initPoint: '/reserva-confirmacion?simulated=true'
  }
}

// Webhook handler (backend)
export const handleMercadoPagoWebhook = async (notification: any) => {
  if (notification.type === 'payment') {
    const paymentId = notification.data.id
    
    // Obtener detalles del pago
    // const payment = await fetch MP API
    
    // Actualizar estado de reserva en Supabase
    const { error } = await supabase
      .from('bookings')
      .update({
        payment_status: 'completed',
        payment_transaction_id: paymentId,
        status: 'confirmed'
      })
      .eq('booking_number', notification.external_reference)
    
    if (!error) {
      // Enviar email de confirmación
      // Notificar al host
    }
  }
}
```

---

## 📁 GESTIÓN DE ARCHIVOS

### Upload de Fotos y Documentos

```typescript
// src/lib/storage.ts
import { supabase } from './supabase'

export const uploadPropertyPhoto = async (
  file: File,
  propertyId: string,
  index: number
): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${propertyId}/${index}.${fileExt}`
  const filePath = `properties/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('property-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('property-photos')
    .getPublicUrl(filePath)

  return data.publicUrl
}

export const uploadLegalDocument = async (
  file: File,
  userId: string,
  documentType: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${documentType}_${Date.now()}.${fileExt}`
  const filePath = `legal-documents/${fileName}`

  const { error } = await supabase.storage
    .from('legal-documents')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  const { data } = supabase.storage
    .from('legal-documents')
    .getPublicUrl(filePath)

  return data.publicUrl
}
```

---

## 🌐 APIs EXTERNAS

### Variables de Entorno Necesarias

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Mercado Pago
VITE_MERCADOPAGO_PUBLIC_KEY=APP_USR-67c9acaa-b0ec-47bc-8b56-9c3b26b497bd
VITE_MERCADOPAGO_ACCESS_TOKEN=APP_USR-3125069616439969-120120-...

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key

# SerpAPI (opcional - para datos externos)
VITE_SERPAPI_KEY=2793125b8f2684df7c7677d0677385f2624d3bf21184d5c5d1d737e726f2490b

# Geoapify (opcional - para geocoding)
VITE_GEOAPIFY_KEY=4247471f71c943ceb8a629a2884d4b52

# Meta Pixel
VITE_META_PIXEL_ID=your-pixel-id
```

---

## 👥 CONFIGURACIÓN DE ROLES

### Implementar Protected Routes

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/supabase'
import { getRoleFromUser, hasPermission } from '@/lib/roles'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const { user, loading } = useAuth()
  const [userRole, setUserRole] = useState<UserRole>('tourist')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (user) {
      getRoleFromUser(user.id).then(role => {
        setUserRole(role)
        setChecking(false)
      })
    } else {
      setChecking(false)
    }
  }, [user])

  if (loading || checking) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/auth/tourist" replace />
  }

  if (requiredRole && !hasPermission(userRole, requiredRole)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
```

---

## 🚀 DEPLOY Y PRODUCTION

### Checklist Pre-Launch

- [ ] **Base de Datos**
  - [ ] Todas las tablas creadas
  - [ ] Índices optimizados
  - [ ] RLS policies configuradas
  - [ ] Backups automáticos activados

- [ ] **Autenticación**
  - [ ] Google OAuth configurado
  - [ ] Email templates personalizados
  - [ ] 2FA para SuperAdmin
  - [ ] Rate limiting en login

- [ ] **Seguridad**
  - [ ] HTTPS en producción
  - [ ] Variables de entorno seguras
  - [ ] CORS configurado
  - [ ] CSP headers
  - [ ] Input validation en todos los forms

- [ ] **Performance**
  - [ ] Build optimizado
  - [ ] Code splitting
  - [ ] Image optimization
  - [ ] CDN para assets
  - [ ] Cache strategy

- [ ] **Monitoring**
  - [ ] Error tracking (Sentry)
  - [ ] Analytics (GA4 + Meta Pixel)
  - [ ] Uptime monitoring
  - [ ] Performance monitoring

- [ ] **Legal**
  - [ ] Términos y condiciones
  - [ ] Política de privacidad
  - [ ] Política de cookies
  - [ ] Contratos digitales funcionando

- [ ] **Testing**
  - [ ] Flujo completo de reserva
  - [ ] Pagos en sandbox
  - [ ] Roles y permisos
  - [ ] Responsive en todos los dispositivos
  - [ ] SEO básico

### Comandos de Deploy

```bash
# Build optimizado
npm run build

# Preview local del build
npm run preview

# Variables de entorno en producción
# Configurar en el hosting provider (Vercel, Netlify, etc.)

# Deploy (ejemplo Vercel)
vercel --prod
```

---

## 📊 MÉTRICAS Y KPIs A TRACKEAR

### Dashboard SuperAdmin
- Usuarios activos por rol
- Reservas diarias/semanales/mensuales
- Ingresos por país
- Tasa de conversión
- Quejas abiertas vs resueltas
- Tiempo promedio de respuesta
- Score promedio de alojamientos
- Adopción de recomendaciones IA

### Analytics del Negocio
- GMV (Gross Merchandise Value)
- Take rate (comisión promedio)
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)
- Churn rate de hosts
- Ocupación promedio
- Ticket promedio de reserva

---

## 🎯 SIGUIENTES PASOS

1. **Completar integración Supabase** con todas las tablas
2. **Implementar sistema de contratos** digitales
3. **Configurar pagos** con Mercado Pago en sandbox
4. **Desarrollar panel SuperAdmin** completo
5. **Optimizar SEO** en todas las páginas
6. **Testing exhaustivo** de todos los flujos
7. **Documentación de APIs** para integraciones futuras
8. **Plan de marketing** y adquisición de usuarios

---

**SENDAI S.A.S. - Ready for sendai.lat deployment** 🚀
