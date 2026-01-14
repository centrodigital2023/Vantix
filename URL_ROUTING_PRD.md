# URL Routing System - PRD

Clean, scalable, and SEO-friendly URL structure for Vantix tourism platform with browser-native routing.

**Purpose**: Replace internal page state management with proper URL-based navigation using browser History API for better UX, SEO, shareability, and browser navigation support.

## Core Requirements

### URL Structure Philosophy
- **Clean**: No hash-based routing (#), use proper path-based URLs
- **Semantic**: URLs reflect content hierarchy and purpose
- **Scalable**: Easy to add new routes without refactoring
- **SEO-Optimized**: Include Spanish keywords for Colombia tourism market
- **Shareable**: Any URL can be bookmarked and shared directly

### Technical Approach
- Use browser History API (`pushState`, `popstate`)
- Map clean URLs to internal page states
- Handle browser back/forward buttons
- Support deep linking (direct URL access)
- Preserve query parameters for filters/search
- Handle 404s gracefully

## URL Map

### Public Pages
```
/ - Home
/explorar - Browse destinations
/itinerario - AI itinerary generator
/blog - Travel blog
/contacto - Contact
/para-ti - Personalized feed
```

### Category Pages
```
/categoria/aventura - Adventure
/categoria/bienestar - Wellness
/categoria/cultural - Cultural
/categoria/familiar - Family
/categoria/gastronomia - Gastronomy
/categoria/naturaleza - Nature
/categoria/negocios - Business
/categoria/playa - Beach
/categoria/religioso - Religious
/categoria/rural - Rural
```

### Accommodation & Booking
```
/destino/:city - Destination results (e.g., /destino/cartagena)
/alojamiento/:id - Accommodation detail
/reserva/confirmar - Booking confirmation
/reserva/exitosa - Booking success
/mis-reservas - My bookings
```

### Authentication
```
/auth/turista - Tourist login/signup
/auth/anfitrion - Host login/signup
/auth/admin - Admin login
```

### Host/Provider Panel
```
/anfitriones - Host info landing
/anfitriones/panel - Host dashboard
/anfitriones/registro-alojamiento - Property registration
/servicios/registro - Service registration
/servicios/panel - Service provider panel
```

### Help & Support
```
/ayuda/faq - FAQ
/ayuda/seguridad - Security center
/ayuda/soporte - Tourist support
/ayuda/como-reservar - How to book
/ayuda/estado-reserva - Booking status
```

### Discover
```
/descubre/destinos - Destinations
/descubre/tours - Tours
/descubre/alojamientos - Accommodations
/descubre/transportes - Transportation
/descubre/comida-tipica - Typical food
/descubre/mapa - Tourist map
```

### Regional SEO Pages
```
/turismo/pasto - Pasto tourism
/turismo/narino/tours - Nariño tours
/turismo/pasto/que-hacer - What to do in Pasto
/turismo/narino/lugares - Must-see places in Nariño
```

### Experiences
```
/experiencias/aventura - Adventure experiences
/experiencias/cultura - Cultural experiences
/experiencias/gastronomia - Gastronomy experiences
/experiencias/naturaleza - Nature experiences
/experiencias/senderismo - Hiking
/experiencias/festivales - Colombian festivals
```

### Company
```
/nosotros - About us
/nosotros/mision - Mission & vision
/nosotros/por-que-elegirnos - Why choose us
/testimonios - Testimonials
```

### Legal
```
/legal/terminos - Terms of service
/legal/privacidad - Privacy policy
/legal/cookies - Cookie policy
/legal/reembolsos - Refund policy
/legal/cancelacion - Cancellation policy
```

### Content & Partners
```
/contenido/guia-viajero - Traveler's guide
/contenido/articulos - Articles
/contenido/noticias - Tourism news
/alianzas/agencias - Travel agencies
/alianzas/colaboradores - Collaborators
/alianzas/afiliados - Affiliates
/alianzas/guias - Tour guides
```

### Offers
```
/ofertas - Current offers
/ofertas/viajes-baratos - Budget travel
/ofertas/fin-de-semana - Weekend plans
```

### SuperAdmin (Protected)
```
/admin/dashboard - Dashboard
/admin/usuarios - Users management
/admin/quejas - Complaints
/admin/prestadores - Providers
/admin/analytics - Analytics
/admin/configuracion - Configuration
```

## Route Parameters

### Dynamic Segments
- `:city` - City/destination slug (e.g., cartagena, medellin)
- `:id` - Accommodation/resource ID

### Query Parameters
- `?q=` - Search query
- `?categoria=` - Category filter
- `?precio_min=` - Minimum price
- `?precio_max=` - Maximum price
- `?fecha_entrada=` - Check-in date
- `?fecha_salida=` - Check-out date
- `?huespedes=` - Number of guests
- `?page=` - Pagination

### Examples
```
/destino/cartagena?fecha_entrada=2024-03-15&huespedes=2
/alojamiento/hotel-caribe-123
/categoria/aventura?precio_max=200000
/explorar?q=playa&categoria=naturaleza
```

## Implementation Features

### Router Utilities
- `navigateTo(path)` - Programmatic navigation
- `getCurrentRoute()` - Get current route object
- `getRouteParams()` - Extract route parameters
- `getQueryParams()` - Parse query string
- `buildUrl(path, params)` - Construct URLs with params

### Route Protection
- Check authentication for protected routes
- Redirect to appropriate auth page
- Preserve intended destination for post-login redirect

### 404 Handling
- Catch invalid routes
- Show friendly 404 page with search
- Suggest related pages

### History Management
- Handle browser back/forward
- Scroll position restoration
- State preservation where needed

## Migration Strategy

1. Create router utility functions
2. Map all existing page states to URLs
3. Update navigation handlers to use router
4. Add popstate listener for back/forward
5. Update all internal links
6. Test deep linking for all routes
7. Verify browser navigation works
8. Remove old page state management

## SEO Benefits

- Clean, readable URLs
- Keyword-rich paths in Spanish
- Proper browser history for crawlers
- Social media preview support
- Easy sitemap generation
- Natural link structure

## Success Criteria

- ✅ All URLs bookmarkable and shareable
- ✅ Browser back/forward works correctly
- ✅ Deep linking loads correct page
- ✅ Query parameters preserved
- ✅ No hash-based routing
- ✅ 404s handled gracefully
- ✅ Protected routes redirect to auth
- ✅ Clean URL structure for SEO
