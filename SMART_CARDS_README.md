# 🎴 Tarjetas Inteligentes de Destino - SendAI Colombia

## 📋 Resumen

Las **Tarjetas Inteligentes de Destino** (Smart Destination Cards) son componentes avanzados que transforman la experiencia de exploración de destinos turísticos en Colombia. Cada tarjeta es una experiencia cultural completa, no solo un lugar.

## ✨ Características Principales

### 1. 🎨 Diseño Emocional y Animaciones

- **Hover Effects con Framer Motion**: Animaciones suaves que elevan la tarjeta
- **Galería de Imágenes Integrada**: Navegación fluida entre múltiples fotos
- **Indicadores de Progreso**: Puntos animados que muestran la posición en la galería
- **Transiciones Cinematográficas**: Zoom progresivo en imágenes al hacer hover
- **Estados Visuales Claros**: Destacado, Popular, Favorito

### 2. 💳 Acciones Directas Inteligentes

Cada tarjeta incluye botones de acción inmediata:

- **📅 Reservar**: Abre modal de reserva con calendario y selección de personas
- **💬 WhatsApp**: Conexión directa con asesores vía WhatsApp
- **📞 Llamar**: Iniciación de llamada telefónica inmediata
- **❤️ Favoritos**: Guardar destinos con feedback visual
- **🔗 Compartir**: Compartir en redes o copiar enlace

### 3. 📊 Información Rica y Contextual

- **Nombre del destino** destacado con tipografía bold
- **Ciudad y ubicación** con iconos geográficos
- **Rating** con estrellas doradas y número de reseñas
- **Precio formateado** en pesos colombianos (COP)
- **Badges de estado**: Destacado, Popular (>100 reseñas)
- **Descripción emocional** que invita a explorar

### 4. 🔍 Modal de Detalles Completo

Al hacer clic en "Ver más", se abre un diálogo con:

- **Galería de fotos expandida**: Hasta 5 imágenes en grid responsivo
- **Información detallada**: Rating, precio, disponibilidad
- **Actividades incluidas**: Lista con iconos de check
- **Hoteles recomendados**: Cards con foto, rating y precio
- **Botones de acción**: Compartir, WhatsApp, Reservar

### 5. 🎯 Flujo de Conversión Optimizado

```
Ver Tarjeta → Hover (WhatsApp/Llamar) → Clic → Ver Detalles → Reservar → Pagar
```

La UX está diseñada para:
- **Decisión rápida**: Información clave visible de inmediato
- **Confianza**: Ratings reales, reseñas verificadas
- **Acción inmediata**: Múltiples puntos de contacto

## 🔌 Integración con APIs

### Estructura de Datos

```typescript
interface EnrichedDestination {
  id: string
  name: string
  category: string
  region: string
  description: string
  images: string[]
  price: number
  rating: number
  featured: boolean
  location?: {
    lat: number
    lon: number
    city: string
    department: string
  }
  hotels?: Array<{
    name: string
    price: number
    rating: number
    image: string
  }>
  activities?: string[]
  reviews?: number
  lastUpdated: number
}
```

### APIs Conectadas

#### 1. **Pexels API** - Imágenes de alta calidad
```javascript
// Obtiene imágenes profesionales de destinos turísticos
getCategoryImages('Aventura')
getDestinationImages('Cartagena Colombia')
```

#### 2. **Google Places API (via SerpAPI)** - Información de lugares
```javascript
// Datos reales: rating, reseñas, ubicación
searchGoogleLocal('museo Bogotá Colombia', 'Bogotá')
```

#### 3. **Geoapify API** - Geocodificación y mapas
```javascript
// Coordenadas precisas para mapas interactivos
searchPlaces('Parque Tayrona Colombia')
```

#### 4. **API Colombia** - Datos de ciudades
```javascript
// Información oficial de ciudades colombianas
getColombiaCities()
getTouristAttractions()
```

### Actualización Automática (cada 24h)

```javascript
// Hook en App.tsx
useInitializeSync() // Verifica cache y sincroniza si es necesario

// Proceso automático:
1. Verificar última actualización (useKV)
2. Si > 24 horas → Sincronizar
3. Obtener imágenes (Pexels)
4. Obtener datos de lugares (SerpAPI + Geoapify)
5. Enriquecer con hoteles y actividades
6. Guardar en cache (spark.kv)
7. Re-renderizar componentes
```

## 💳 Flujo de Reserva y Pago

### 1. Modal de Reserva (BookingDialog)

```typescript
<BookingDialog
  open={showBooking}
  onOpenChange={setShowBooking}
  accommodationId={destination.id}
  roomTypeId=""
  onConfirm={() => {
    // Procesar reserva
    // Integración con MercadoPago
  }}
/>
```

### 2. Pasarelas de Pago Integradas

- **MercadoPago** (preferido para Colombia)
- **Wompi** (alternativa local)
- **Stripe** (internacional)

### 3. Confirmación Automática

Después del pago exitoso:
1. Guardar reserva en `spark.kv`
2. Enviar confirmación por email
3. Mensaje automático a WhatsApp del cliente
4. Notificación push al usuario

## 📞 Contacto Humano Integrado

### WhatsApp Directo

```javascript
const handleWhatsApp = () => {
  const phone = '+573123456789'
  const message = encodeURIComponent(
    `Hola! Estoy interesado en ${destination.name}...`
  )
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
}
```

### Llamada Inmediata

```javascript
const handleCall = () => {
  const phone = '+573123456789'
  window.open(`tel:${phone}`)
}
```

**Beneficio psicológico**: Elimina fricción y genera confianza en turismo cultural.

## 🎨 Implementación

### Uso Básico

```typescript
import { SmartDestinationCard } from '@/components/SmartDestinationCard'

<SmartDestinationCard
  destination={destination}
  onNavigate={(page, id) => navigate(page, id)}
  delay={0.1}
  featured={true}
/>
```

### Grid de Tarjetas

```typescript
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {destinations.map((dest, index) => (
    <SmartDestinationCard
      key={dest.id}
      destination={dest}
      delay={index * 0.05}
      featured={index === 0}
    />
  ))}
</div>
```

## 🚀 Características Avanzadas

### 1. Animaciones Escalonadas

```typescript
// Cada tarjeta aparece con delay incremental
delay={index * 0.05}
```

### 2. Estados Interactivos

- **Default**: Elevación sutil con sombra
- **Hover**: Elevación +8px, borde primary, zoom en imagen
- **Active**: Borde primary resaltado
- **Favorito**: Corazón rojo relleno

### 3. Responsive Design

- **Mobile**: 1 columna, botones apilados
- **Tablet**: 2 columnas, galería adaptada
- **Desktop**: 3 columnas, hover effects completos

### 4. Accesibilidad

- **ARIA labels** en todos los botones
- **Keyboard navigation** completa
- **Focus states** visibles
- **Alt text** en todas las imágenes

## 📱 Experiencia Mobile

- **Touch-friendly**: Botones mínimo 44x44px
- **Swipe gesture**: Navegar galería con dedo
- **Bottom sheet**: Modal ocupa 90% de pantalla
- **One-handed operation**: Botones accesibles con pulgar

## 🎯 Métricas de Conversión

Las tarjetas inteligentes rastrean:

1. **Vistas**: Cada vez que aparece en viewport
2. **Hovers**: Interacciones con hover
3. **Clics**: Apertura de detalles
4. **Favoritos**: Guardados
5. **WhatsApp/Llamadas**: Contactos iniciados
6. **Reservas**: Conversiones completas

Datos guardados en `spark.kv` para análisis posterior.

## 🔮 Próximas Mejoras

- [ ] **AR Preview**: Vista en realidad aumentada del destino
- [ ] **Video Highlights**: Clips cortos del destino
- [ ] **Live Availability**: Disponibilidad en tiempo real
- [ ] **Price Alerts**: Notificaciones de ofertas
- [ ] **Social Proof**: "X personas vieron esto hoy"
- [ ] **Weather Widget**: Clima actual del destino

## 📚 Componentes Relacionados

- `SmartDestinationCard.tsx` - Componente principal
- `DestinationCard.tsx` - Wrapper simplificado
- `BookingDialog.tsx` - Modal de reserva
- `AccommodationCard.tsx` - Tarjetas de alojamiento
- `SmartAccommodationCard.tsx` - Alojamientos avanzados

---

**Desarrollado con ❤️ para SendAI Colombia**
*Transformando el turismo colombiano con IA y diseño emocional*
