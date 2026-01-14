# URL Routing System - Implementation Guide

This document explains how to use the new URL routing system in Vantix.

## Overview

The application now uses clean, browser-native URL routing instead of hash-based or state-based navigation. All URLs are:
- ✅ **Shareable** - Copy and paste any URL
- ✅ **Bookmarkable** - Save URLs in browser favorites
- ✅ **SEO-friendly** - Search engines can index all pages
- ✅ **Browser-native** - Back/forward buttons work correctly

## For Developers

### Using Navigation in Components

#### Option 1: Using the `useRouter` hook (Recommended for functional updates)

```tsx
import { useRouter } from '@/hooks/use-router'

function MyComponent() {
  const { currentPage, params, queryParams, navigateTo } = useRouter()
  
  // Simple navigation
  const goHome = () => navigateTo('home')
  
  // Navigation with params (for dynamic routes like accommodation details)
  const viewAccommodation = (id: string) => {
    navigateTo('detalle-alojamiento', { id })
  }
  
  // Navigation with query parameters (for search/filters)
  const searchDestination = (city: string, guests: number) => {
    navigateTo('destino-resultados', undefined, { 
      ciudad: city,
      huespedes: guests.toString() 
    })
  }
  
  // Access current route data
  console.log('Current page:', currentPage) // e.g., 'home'
  console.log('Route params:', params) // e.g., { id: 'hotel-123' }
  console.log('Query params:', queryParams.get('ciudad')) // e.g., 'cartagena'
  
  return (
    <button onClick={goHome}>Go Home</button>
  )
}
```

#### Option 2: Using the `Link` component (Recommended for links)

```tsx
import { Link } from '@/components/Link'

function MyComponent() {
  return (
    <div>
      {/* Simple link */}
      <Link to="home">Inicio</Link>
      
      {/* Link with params */}
      <Link 
        to="detalle-alojamiento" 
        params={{ id: 'hotel-123' }}
      >
        Ver Hotel
      </Link>
      
      {/* Link with query params */}
      <Link 
        to="destino-resultados"
        query={{ ciudad: 'cartagena', huespedes: '2' }}
      >
        Buscar en Cartagena
      </Link>
      
      {/* Link with custom styling */}
      <Link 
        to="explorar"
        className="text-primary hover:underline"
      >
        Explorar destinos
      </Link>
    </div>
  )
}
```

#### Option 3: Direct Router Functions (For programmatic navigation)

```tsx
import { navigateTo, buildPath, getQueryParam } from '@/lib/router'

// Navigate programmatically
navigateTo('home')
navigateTo('detalle-alojamiento', { id: 'hotel-123' })
navigateTo('destino-resultados', undefined, { ciudad: 'cartagena' })

// Build URL paths without navigating
const hotelUrl = buildPath('detalle-alojamiento', { id: 'hotel-123' })
// Returns: "/alojamiento/hotel-123"

// Read query parameters
const searchQuery = getQueryParam('q')
const city = getQueryParam('ciudad')
```

### URL Examples

Here are real-world examples of URLs in the application:

```
Homepage:
https://vantix.com/

Category pages:
https://vantix.com/categoria/aventura
https://vantix.com/categoria/playa

Destination search:
https://vantix.com/destino/cartagena
https://vantix.com/destino/medellin?fecha_entrada=2024-03-15&huespedes=2

Accommodation detail:
https://vantix.com/alojamiento/hotel-caribe-123

Search with filters:
https://vantix.com/explorar?q=playa&precio_max=200000&categoria=naturaleza

Authentication:
https://vantix.com/auth/turista
https://vantix.com/auth/anfitrion

Host panel:
https://vantix.com/anfitriones/panel
https://vantix.com/anfitriones/registro-alojamiento

Help pages:
https://vantix.com/ayuda/faq
https://vantix.com/ayuda/como-reservar

Legal:
https://vantix.com/legal/terminos
https://vantix.com/legal/privacidad

Regional SEO:
https://vantix.com/turismo/pasto
https://vantix.com/turismo/narino/tours

Offers:
https://vantix.com/ofertas
https://vantix.com/ofertas/viajes-baratos?destino=caribe

Admin (protected):
https://vantix.com/admin/dashboard
https://vantix.com/admin/usuarios
```

### Migration Checklist

When updating existing components to use the new routing system:

- [ ] Replace `onClick={() => onNavigate('page')}` with `onClick={() => navigateTo('page')}`
- [ ] Replace state-based page tracking with `useRouter()` hook
- [ ] Replace button navigation with `<Link>` components where appropriate
- [ ] Update accommodation ID passing to use route params: `navigateTo('detalle-alojamiento', { id })`
- [ ] Convert filter state to query parameters for shareability
- [ ] Test that browser back/forward buttons work correctly
- [ ] Verify that page refreshes maintain the correct state

### Best Practices

1. **Use semantic URLs**: URLs should be readable and describe the content
   ```tsx
   // ✅ Good
   navigateTo('descubre-tours')
   
   // ❌ Bad  
   navigateTo('page-7')
   ```

2. **Use query params for filters/search**: Keeps URLs shareable
   ```tsx
   // ✅ Good - URL: /explorar?q=playa&precio_max=150000
   navigateTo('explorar', undefined, { q: 'playa', precio_max: '150000' })
   
   // ❌ Bad - State is lost on refresh
   setState({ search: 'playa', maxPrice: 150000 })
   ```

3. **Use route params for resources**: For IDs and dynamic segments
   ```tsx
   // ✅ Good - URL: /alojamiento/hotel-123
   navigateTo('detalle-alojamiento', { id: 'hotel-123' })
   
   // ❌ Bad - Not shareable
   navigateTo('detalle-alojamiento')
   setSelectedId('hotel-123')
   ```

4. **Prefer `Link` for navigation elements**: Better accessibility and UX
   ```tsx
   // ✅ Good
   <Link to="home">Inicio</Link>
   
   // ❌ Acceptable but less ideal
   <button onClick={() => navigateTo('home')}>Inicio</button>
   ```

### Testing Routes

Test that your routes work correctly:

1. Navigate to the page through the UI
2. Copy the URL from the address bar
3. Open a new tab and paste the URL
4. Verify the page loads with the correct state
5. Test browser back/forward buttons
6. Test refresh on the page

### Common Patterns

#### Search Results with Filters
```tsx
function SearchResults() {
  const { queryParams, navigateTo } = useRouter()
  const searchQuery = queryParams.get('q') || ''
  const category = queryParams.get('categoria') || 'all'
  
  const handleSearch = (query: string) => {
    navigateTo('explorar', undefined, { q: query, categoria })
  }
  
  const handleFilterChange = (newCategory: string) => {
    navigateTo('explorar', undefined, { q: searchQuery, categoria: newCategory })
  }
  
  return (
    <div>
      <SearchBar value={searchQuery} onSearch={handleSearch} />
      <CategoryFilter value={category} onChange={handleFilterChange} />
    </div>
  )
}
```

#### Dynamic Resource Detail Page
```tsx
function AccommodationDetail() {
  const { params } = useRouter()
  const accommodationId = params.id
  
  // Fetch accommodation data using the ID from URL
  const [accommodation, setAccommodation] = useState(null)
  
  useEffect(() => {
    if (accommodationId) {
      loadAccommodation(accommodationId).then(setAccommodation)
    }
  }, [accommodationId])
  
  if (!accommodationId) {
    return <NotFoundPage />
  }
  
  return <div>{/* render accommodation */}</div>
}
```

#### Protected Routes
```tsx
function ProtectedPage() {
  const { navigateTo } = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    checkAuth().then(authenticated => {
      if (!authenticated) {
        navigateTo('auth-turista', undefined, { 
          redirect: window.location.pathname 
        })
      } else {
        setIsAuthenticated(true)
      }
    })
  }, [])
  
  if (!isAuthenticated) return <LoadingSpinner />
  
  return <div>{/* protected content */}</div>
}
```

## Route Configuration

All routes are configured in `/src/lib/router.ts`. To add a new route:

1. Add the route pattern to the `routes` array
2. Add the page-to-path mapping to `pageToPath` object
3. Ensure the `PageRoute` type includes your route in `/src/lib/types.ts`

Example:
```tsx
// In router.ts
{ pattern: /^\/mi-nueva-pagina$/, page: 'mi-nueva-pagina', keys: [] },

// In pageToPath
'mi-nueva-pagina': '/mi-nueva-pagina',

// In types.ts
export type PageRoute = 
  | 'home'
  | 'mi-nueva-pagina'  // Add this
  | ...
```

## Benefits

### For Users
- **Bookmarkable**: Save any page for later
- **Shareable**: Send links to friends
- **Back button works**: Natural browser navigation
- **Refresh-safe**: Page state preserved on reload

### For SEO
- **Clean URLs**: No hash fragments
- **Semantic paths**: Keywords in Spanish
- **Crawlable**: Search engines can index all pages
- **Social sharing**: Proper meta tags per route

### For Development
- **Type-safe**: TypeScript ensures valid routes
- **Scalable**: Easy to add new routes
- **Maintainable**: Centralized route configuration
- **Testable**: Direct URL access for testing

## Troubleshooting

### Issue: Back button doesn't work
**Solution**: Ensure you're using `navigateTo()` or `<Link>` instead of setting state directly

### Issue: Page refresh loses state
**Solution**: Move critical state to URL query parameters or route params

### Issue: 404 on direct URL access
**Solution**: Verify the route is registered in `router.ts`

### Issue: Route params not updating
**Solution**: Use `useEffect` to watch for `params` changes from `useRouter()`

## Additional Resources

- Router implementation: `/src/lib/router.ts`
- useRouter hook: `/src/hooks/use-router.ts`
- Link component: `/src/components/Link.tsx`
- Route types: `/src/lib/types.ts` (PageRoute type)
- PRD: `/URL_ROUTING_PRD.md`
