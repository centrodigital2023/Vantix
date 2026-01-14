# Vantix - Plataforma Inteligente de Turismo Colombiano 🇨🇴

Una plataforma de turismo moderna y dinámica que utiliza múltiples APIs para ofrecer información actualizada sobre destinos, alojamientos y experiencias en Colombia.

## 🌟 Características Principales

### ✨ Integración Multi-API
- **Pexels API**: Imágenes de alta calidad para categorías y destinos
- **API Colombia**: Datos oficiales de ciudades y atracciones turísticas
- **Geoapify**: Servicios de ubicación y búsqueda de lugares
- **SerpAPI**: Datos de Google (Vuelos, Hoteles, Imágenes, Reseñas)

### 🔄 Actualización Automática
- Sistema de sincronización cada 24 horas
- Cache inteligente con Spark KV
- Actualización en segundo plano sin interrumpir la experiencia del usuario

### 🎨 Diseño Moderno
- Componentes responsivos con Tailwind CSS
- Animaciones suaves con Framer Motion
- Paleta de colores inspirada en la naturaleza colombiana
- Tipografía profesional (Outfit + Manrope)

### 🗂️ 10 Categorías de Turismo
1. **Aventura** - Experiencias emocionantes
2. **Bienestar** - Spa y relajación
3. **Cultural** - Historia y tradiciones
4. **Familiar** - Diversión para todos
5. **Gastronomía** - Sabores colombianos
6. **Naturaleza** - Paisajes impresionantes
7. **Negocios** - Viajes corporativos
8. **Playa** - Costa Caribe
9. **Religioso** - Turismo espiritual
10. **Rural** - Experiencias del campo

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **Shadcn UI** para componentes
- **Framer Motion** para animaciones
- **Spark KV** para almacenamiento
- **Phosphor Icons** para iconografía

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes Shadcn
│   ├── CategoryCard.tsx
│   ├── DestinationCard.tsx
│   └── CategoryTemplate.tsx
├── lib/
│   ├── api/            # Integraciones de API
│   │   ├── config.ts   # Configuración
│   │   ├── pexels.ts   # Pexels API
│   │   ├── colombia.ts # Colombia API
│   │   ├── geoapify.ts # Geoapify API
│   │   ├── serpapi.ts  # SerpAPI
│   │   └── sync.ts     # Sistema de sincronización
│   ├── data.ts         # Datos estáticos
│   └── types.ts        # Tipos TypeScript
├── hooks/
│   └── use-category-data.ts  # Hook para datos de categorías
├── pages/
│   ├── categorias/     # Páginas por categoría
│   ├── Home.tsx
│   ├── Explorar.tsx
│   └── ...
└── contexts/
    └── AuthContext.tsx # Contexto de autenticación
```

## 🔧 Configuración de APIs

Todas las APIs están configuradas en `src/lib/api/config.ts`:

```typescript
export const API_CONFIG = {
  pexels: { key: 'YOUR_PEXELS_KEY' },
  geoapify: { key: 'YOUR_GEOAPIFY_KEY' },
  serpapi: { key: 'YOUR_SERPAPI_KEY' },
  // ...
}
```

## 📖 Documentación

Para información detallada sobre la integración de APIs, consulta:
- [API_INTEGRATION.md](./API_INTEGRATION.md) - Documentación completa de APIs

## 🎯 Uso

### Inicialización Automática

El sistema se inicializa automáticamente al cargar la aplicación:

```typescript
import { useInitializeSync } from '@/hooks/use-category-data'

function App() {
  useInitializeSync() // Verifica cache y sincroniza si es necesario
  // ...
}
```

### Cargar Datos de Categoría

```typescript
import { useCategoryData } from '@/hooks/use-category-data'

function CategoryPage() {
  const { data, loading, error } = useCategoryData('Aventura')
  
  if (loading) return <LoadingState />
  if (error) return <ErrorState />
  
  return <DestinationsList destinations={data.destinations} />
}
```

## 🔄 Sistema de Caché

- **Duración**: 24 horas
- **Almacenamiento**: Spark KV
- **Actualización**: Automática en segundo plano
- **Fallback**: Usa datos en cache si las APIs fallan

## 🎨 Personalización

### Colores

Los colores están definidos en `src/index.css`:

```css
:root {
  --primary: oklch(0.45 0.15 155);    /* Verde Esmeralda */
  --secondary: oklch(0.62 0.12 45);   /* Terracota */
  --accent: oklch(0.68 0.18 25);      /* Coral */
  /* ... */
}
```

### Fuentes

Fuentes de Google configuradas en `index.html`:
- **Outfit**: Títulos y encabezados
- **Manrope**: Texto de cuerpo

## 🔐 Autenticación

Sistema de autenticación para propietarios de alojamientos:
- Login/Registro
- Gestión de propiedades
- Dashboard de analytics
- Persistencia de sesión

## 🌐 Características Futuras

- [ ] Integración con Mercado Pago para pagos
- [ ] Generación de itinerarios con IA (Gemini)
- [ ] Búsqueda avanzada con filtros
- [ ] Mapas interactivos
- [ ] Sistema de reservas
- [ ] Notificaciones en tiempo real

## 📱 Responsive Design

- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Optimized**: Áreas táctiles de 48px mínimo

## ⚡ Performance

- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Code Splitting**: Páginas cargadas por ruta
- **Optimización**: Skeleton screens durante carga
- **CDN**: Imágenes servidas desde Pexels CDN

## 🐛 Debugging

### Ver logs de sincronización

```javascript
// En consola del navegador
console.log(await window.spark.kv.keys())
```

### Forzar re-sincronización

```javascript
await window.spark.kv.delete('tourism-last-sync')
window.location.reload()
```

## 📄 Licencia

MIT License - Copyright GitHub, Inc.

---

Desarrollado con ❤️ para promover el turismo en Colombia
