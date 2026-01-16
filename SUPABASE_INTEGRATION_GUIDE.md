# Guía de Integración con Supabase - Vantix Platform

## 🎯 Resumen

La plataforma Vantix está completamente integrada con Supabase para proporcionar:
- ✅ Autenticación segura (Email + OAuth)
- ✅ Base de datos PostgreSQL escalable
- ✅ Almacenamiento de imágenes
- ✅ APIs en tiempo real
- ✅ Row Level Security (RLS)

## 🚀 Inicio Rápido

### 1. Configuración Inicial

#### Opción A: Usar la Interfaz de Configuración
1. Ve a la página `/supabase-demo` (crear ruta en App.tsx)
2. Ve a la pestaña "Configuración"
3. Ingresa tu URL de Supabase y Anon Key
4. Haz clic en "Guardar Credenciales"
5. Prueba la conexión

#### Opción B: Configuración Manual
```javascript
// Guarda las credenciales usando KV
await spark.kv.set('VITE_SUPABASE_URL', 'https://tu-proyecto.supabase.co')
await spark.kv.set('VITE_SUPABASE_ANON_KEY', 'tu-anon-key-aqui')

// Recarga la aplicación
window.location.reload()
```

### 2. Ejecutar Migración SQL

En tu proyecto de Supabase:
1. Ve a **SQL Editor**
2. Ejecuta el archivo `supabase-migration.sql`
3. Verifica que las tablas se crearon correctamente

## 📦 Componentes Disponibles

### SupabaseConfig
Interfaz de configuración con validación de credenciales.

```tsx
import { SupabaseConfig } from '@/components/SupabaseConfig'

<SupabaseConfig />
```

### SmartAccommodationsList
Lista inteligente de alojamientos con filtros, búsqueda y ordenamiento.

```tsx
import { SmartAccommodationsList } from '@/components/SmartAccommodationsListV2'

<SmartAccommodationsList
  onSelectAccommodation={(id) => console.log(id)}
  filterByUser={false}
  showFilters={true}
/>
```

**Props:**
- `onSelectAccommodation?: (id: string) => void` - Callback cuando se selecciona un alojamiento
- `filterByUser?: boolean` - Filtrar solo los alojamientos del usuario autenticado
- `showFilters?: boolean` - Mostrar/ocultar barra de filtros

### SupabaseAccommodationForm
Formulario completo para crear/editar alojamientos.

```tsx
import { SupabaseAccommodationForm } from '@/components/SupabaseAccommodationForm'

<SupabaseAccommodationForm
  onSuccess={() => console.log('Guardado')}
  onCancel={() => console.log('Cancelado')}
/>
```

**Props:**
- `onSuccess?: () => void` - Callback al guardar exitosamente
- `onCancel?: () => void` - Callback al cancelar

## 🔧 Hooks Personalizados

### useSupabaseData
Hook genérico para operaciones CRUD.

```tsx
import { useSupabaseData } from '@/hooks/use-supabase-data'

function MyComponent() {
  const { fetchAll, fetchById, insert, update, remove, loading, error } = 
    useSupabaseData('accommodations')

  // Obtener todos los registros
  const loadData = async () => {
    const data = await fetchAll()
    console.log(data)
  }

  // Obtener por ID
  const loadOne = async (id: string) => {
    const data = await fetchById(id)
    console.log(data)
  }

  // Filtrar
  const loadFiltered = async () => {
    const data = await fetchWithFilter({ city: 'Pasto', status: 'active' })
    console.log(data)
  }

  // Insertar
  const create = async () => {
    const result = await insert({
      owner_id: user.id,
      name: 'Hotel Ejemplo',
      category: 'naturaleza',
      // ... más campos
    })
  }

  // Actualizar
  const edit = async (id: string) => {
    const result = await update(id, { rating: 4.5 })
  }

  // Eliminar
  const deleteItem = async (id: string) => {
    const success = await remove(id)
  }
}
```

### useSupabaseAuth
Hook de autenticación con todas las operaciones.

```tsx
import { useSupabaseAuth } from '@/hooks/use-supabase-auth'

function AuthComponent() {
  const { 
    user, 
    session, 
    loading, 
    isAuthenticated,
    signUp, 
    signIn, 
    signOut, 
    resetPassword,
    updatePassword 
  } = useSupabaseAuth()

  // Registrar usuario
  const register = async () => {
    const result = await signUp('email@example.com', 'password123', {
      name: 'Juan Pérez',
      role: 'owner'
    })
  }

  // Iniciar sesión
  const login = async () => {
    const result = await signIn('email@example.com', 'password123')
  }

  // Cerrar sesión
  const logout = async () => {
    await signOut()
  }

  // Recuperar contraseña
  const recover = async () => {
    await resetPassword('email@example.com')
  }

  // Cambiar contraseña
  const changePassword = async () => {
    await updatePassword('newpassword123')
  }
}
```

### useSupabaseAuthContext
Contexto de autenticación para usar en toda la app.

```tsx
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'

function MyComponent() {
  const { user, isAuthenticated, loading, signOut } = useSupabaseAuthContext()

  if (loading) return <div>Cargando...</div>
  if (!isAuthenticated) return <div>No autenticado</div>

  return (
    <div>
      <p>Hola {user?.email}</p>
      <button onClick={signOut}>Cerrar sesión</button>
    </div>
  )
}
```

## 🗄️ Estructura de Datos

### Tabla: accommodations
```typescript
{
  id: string (UUID)
  created_at: string (timestamp)
  updated_at: string (timestamp)
  owner_id: string (UUID) // Referencia a auth.users
  name: string
  description: string
  category: 'aventura' | 'bienestar' | 'cultural' | ... // 10 categorías
  city: string
  department: string
  address: string
  latitude: number | null
  longitude: number | null
  images: string[] // Array de URLs
  amenities: string[] // Array de comodidades
  rating: number // 0.0 - 5.0
  reviews_count: number
  base_price: number
  currency: string // "COP"
  status: 'active' | 'inactive' | 'pending'
}
```

### Tabla: bookings
```typescript
{
  id: string (UUID)
  created_at: string (timestamp)
  accommodation_id: string (UUID)
  room_type_id: string (UUID)
  user_id: string | null (UUID)
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string (date)
  check_out: string (date)
  guests_count: number
  total_price: number
  currency: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'refunded'
  payment_id: string | null
  special_requests: string | null
}
```

### Tabla: user_preferences
```typescript
{
  id: string (UUID)
  user_id: string (UUID)
  category_scores: Record<string, number> // IA recommendations
  viewed_accommodations: string[] // IDs
  clicked_accommodations: string[] // IDs
  booked_accommodations: string[] // IDs
  search_history: string[]
  last_updated: string (timestamp)
}
```

## 🔐 Seguridad

### Row Level Security (RLS)
Todas las tablas tienen políticas RLS activas:

#### Accommodations
- ✅ Todos pueden leer alojamientos activos
- ✅ Solo el propietario puede actualizar sus alojamientos
- ✅ Solo el propietario puede eliminar sus alojamientos

#### Bookings
- ✅ Usuarios ven sus propias reservas
- ✅ Propietarios ven reservas de sus propiedades
- ✅ Solo usuarios autenticados pueden crear reservas

#### User Preferences
- ✅ Cada usuario solo puede ver/editar sus preferencias

### Variables de Entorno
Las credenciales se almacenan de forma segura usando Spark KV:
- `VITE_SUPABASE_URL` - URL del proyecto
- `VITE_SUPABASE_ANON_KEY` - Clave pública anon

**⚠️ NUNCA usar `service_role` key en el cliente**

## 📱 Características Responsive

Todos los componentes son completamente responsive:
- ✅ Grid adaptativo (1/2/3 columnas según tamaño de pantalla)
- ✅ Filtros colapsables en móvil
- ✅ Imágenes optimizadas
- ✅ Touch-friendly en tablets/móviles
- ✅ Modales full-screen en móvil

## 🎨 Personalización

### Tema y Estilos
Los componentes usan las variables CSS del tema:
- `--primary` - Color principal
- `--secondary` - Color secundario
- `--accent` - Color de acento
- `--muted` - Backgrounds sutiles
- `--border` - Bordes

### Adaptación
Puedes extender los componentes:

```tsx
import { SmartAccommodationsList } from '@/components/SmartAccommodationsListV2'

// Envolver con tus propios estilos
<div className="my-custom-wrapper">
  <SmartAccommodationsList {...props} />
</div>
```

## 🧪 Testing

### Probar Conexión
```javascript
// En la consola del navegador
const { data, error } = await supabase.from('accommodations').select('count')
console.log('Conexión exitosa:', data)
```

### Crear Datos de Prueba
```javascript
const { insert } = useSupabaseData('accommodations')

await insert({
  owner_id: user.id,
  name: 'Hotel Test',
  description: 'Descripción de prueba',
  category: 'naturaleza',
  city: 'Pasto',
  department: 'Nariño',
  address: 'Calle 1',
  latitude: null,
  longitude: null,
  images: ['https://example.com/image.jpg'],
  amenities: ['WiFi', 'Parqueadero'],
  rating: 0,
  reviews_count: 0,
  base_price: 150000,
  currency: 'COP',
  status: 'active',
})
```

## 🐛 Troubleshooting

### Error: "relation does not exist"
- Ejecuta la migración SQL en Supabase
- Verifica que las tablas estén creadas

### Error: "Invalid API key"
- Verifica que estés usando la clave `anon`, no `service_role`
- Regenera las claves si es necesario

### Error: "Row Level Security policy violation"
- Verifica que el usuario esté autenticado
- Revisa las políticas RLS en Supabase

### No se muestran los datos
- Verifica la conexión con el botón "Probar Conexión"
- Revisa la consola del navegador para errores
- Asegúrate de que haya datos en la tabla

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Realtime](https://supabase.com/docs/guides/realtime)

## ✨ Próximos Pasos

1. Configurar Storage para subir imágenes
2. Implementar real-time subscriptions
3. Agregar más tablas (reviews, room_types, etc.)
4. Configurar funciones serverless (Edge Functions)
5. Implementar cache con React Query

---

**¡La integración con Supabase está lista! 🎉**
