# 🗄️ Integración de Supabase - SendAI Tourism Platform

## 📋 Resumen

Supabase está completamente configurado en tu plataforma SendAI con:

✅ Cliente de Supabase configurado  
✅ Hooks personalizados para autenticación  
✅ Hooks para queries y mutaciones  
✅ Contexto de autenticación integrado  
✅ Migración SQL con todas las tablas  
✅ Políticas RLS (Row Level Security)  
✅ Componentes de ejemplo listos para usar  

## 🚀 Inicio Rápido

### 1. Configurar Credenciales

Lee el archivo `SUPABASE_CONFIG.md` para instrucciones detalladas. Resumen:

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Copia tu URL y anon key
3. Configúralas usando Spark KV:

```javascript
await spark.kv.set('VITE_SUPABASE_URL', 'https://tu-proyecto.supabase.co')
await spark.kv.set('VITE_SUPABASE_ANON_KEY', 'tu-anon-key')
```

### 2. Ejecutar Migración SQL

1. Ve al SQL Editor en tu proyecto de Supabase
2. Copia el contenido de `supabase-migration.sql`
3. Ejecuta el script

### 3. Usar en tu Aplicación

Envuelve tu app con el provider de Supabase:

```tsx
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext'

function App() {
  return (
    <SupabaseAuthProvider>
      {/* Tu aplicación */}
    </SupabaseAuthProvider>
  )
}
```

## 📚 Archivos Creados

### Configuración Base
- `src/lib/supabase.ts` - Cliente de Supabase y tipos de base de datos
- `src/hooks/use-supabase-auth.ts` - Hook para autenticación
- `src/hooks/use-supabase-query.ts` - Hooks para queries y mutaciones
- `src/contexts/SupabaseAuthContext.tsx` - Contexto de autenticación

### Migración y Documentación
- `supabase-migration.sql` - Script SQL para crear tablas y políticas
- `SUPABASE_CONFIG.md` - Guía completa de configuración
- `SUPABASE_INTEGRATION.md` - Este archivo

### Componentes de Ejemplo
- `src/components/SupabaseAuthModal.tsx` - Modal de autenticación
- `src/components/SupabaseAccommodationsList.tsx` - Lista de alojamientos

## 🎯 Casos de Uso

### Autenticación

```tsx
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useSupabaseAuthContext()
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Hola {user?.name}</p>
          <button onClick={signOut}>Salir</button>
        </>
      ) : (
        <button onClick={() => signIn('email@example.com', 'password')}>
          Iniciar Sesión
        </button>
      )}
    </div>
  )
}
```

### Consultar Datos

```tsx
import { useSupabaseQuery } from '@/hooks/use-supabase-query'

function AccommodationsList() {
  const { data, loading, error } = useSupabaseQuery('accommodations', {
    filter: { city: 'Pasto', status: 'active' },
    order: { column: 'rating', ascending: false },
    limit: 10
  })
  
  if (loading) return <Skeleton />
  if (error) return <Error message={error.message} />
  
  return (
    <div>
      {data?.map(accommodation => (
        <Card key={accommodation.id}>
          <h3>{accommodation.name}</h3>
          <p>{accommodation.description}</p>
        </Card>
      ))}
    </div>
  )
}
```

### Insertar/Actualizar/Eliminar

```tsx
import { useSupabaseMutation } from '@/hooks/use-supabase-query'
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'

function CreateAccommodation() {
  const { user } = useSupabaseAuthContext()
  const { insert, loading } = useSupabaseMutation('accommodations')
  
  const handleCreate = async () => {
    const result = await insert({
      owner_id: user!.id,
      name: 'Hotel Example',
      description: 'Un hotel increíble',
      category: 'naturaleza',
      city: 'Pasto',
      department: 'Nariño',
      base_price: 150000,
      currency: 'COP',
      status: 'active',
      address: 'Calle 123',
      latitude: 1.2136,
      longitude: -77.2811,
      images: [],
      amenities: ['wifi', 'piscina'],
      rating: 0,
      reviews_count: 0
    })
    
    if (result.data) {
      toast.success('Alojamiento creado')
    }
  }
  
  return (
    <button onClick={handleCreate} disabled={loading}>
      Crear Alojamiento
    </button>
  )
}
```

## 📊 Estructura de la Base de Datos

### Tabla: accommodations
Almacena todos los alojamientos de la plataforma.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| owner_id | UUID | ID del propietario (FK a auth.users) |
| name | TEXT | Nombre del alojamiento |
| description | TEXT | Descripción |
| category | TEXT | Categoría (aventura, naturaleza, etc.) |
| city | TEXT | Ciudad |
| department | TEXT | Departamento |
| address | TEXT | Dirección |
| latitude | NUMERIC | Latitud |
| longitude | NUMERIC | Longitud |
| images | TEXT[] | URLs de imágenes |
| amenities | TEXT[] | Amenidades |
| rating | NUMERIC | Calificación (0-5) |
| reviews_count | INTEGER | Cantidad de reseñas |
| base_price | NUMERIC | Precio base |
| currency | TEXT | Moneda (COP) |
| status | TEXT | Estado (active/inactive/pending) |

### Tabla: room_types
Tipos de habitaciones de cada alojamiento.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| accommodation_id | UUID | ID del alojamiento |
| name | TEXT | Nombre (Doble, Suite, etc.) |
| description | TEXT | Descripción |
| max_guests | INTEGER | Máximo de huéspedes |
| price_per_night | NUMERIC | Precio por noche |
| available_rooms | INTEGER | Habitaciones disponibles |
| images | TEXT[] | URLs de imágenes |
| amenities | TEXT[] | Amenidades |

### Tabla: bookings
Reservas de los usuarios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| accommodation_id | UUID | ID del alojamiento |
| room_type_id | UUID | ID del tipo de habitación |
| user_id | UUID | ID del usuario (opcional) |
| guest_name | TEXT | Nombre del huésped |
| guest_email | TEXT | Email del huésped |
| guest_phone | TEXT | Teléfono del huésped |
| check_in | DATE | Fecha de entrada |
| check_out | DATE | Fecha de salida |
| guests_count | INTEGER | Número de huéspedes |
| total_price | NUMERIC | Precio total |
| currency | TEXT | Moneda |
| status | TEXT | Estado de la reserva |
| payment_status | TEXT | Estado del pago |
| payment_id | TEXT | ID del pago (Mercado Pago) |
| special_requests | TEXT | Solicitudes especiales |

### Tabla: user_preferences
Preferencias de usuario para recomendaciones personalizadas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| user_id | UUID | ID del usuario |
| category_scores | JSONB | Scores por categoría |
| viewed_accommodations | TEXT[] | IDs de alojamientos vistos |
| clicked_accommodations | TEXT[] | IDs de alojamientos clickeados |
| booked_accommodations | TEXT[] | IDs de alojamientos reservados |
| search_history | TEXT[] | Historial de búsquedas |
| last_updated | TIMESTAMPTZ | Última actualización |

### Tabla: pricing_data
Datos de precios del mercado para análisis.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| city | TEXT | Ciudad |
| department | TEXT | Departamento |
| category | TEXT | Categoría |
| season | TEXT | Temporada (high/low) |
| budget_min | NUMERIC | Precio mínimo presupuesto |
| budget_max | NUMERIC | Precio máximo presupuesto |
| mid_range_min | NUMERIC | Precio mínimo rango medio |
| mid_range_max | NUMERIC | Precio máximo rango medio |
| premium_min | NUMERIC | Precio mínimo premium |
| premium_max | NUMERIC | Precio máximo premium |
| luxury_min | NUMERIC | Precio mínimo lujo |
| luxury_max | NUMERIC | Precio máximo lujo |
| currency | TEXT | Moneda |
| last_updated | TIMESTAMPTZ | Última actualización |

### Tabla: blog_posts
Posts del blog generados por IA.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | ID único |
| title | TEXT | Título |
| slug | TEXT | Slug (único) |
| excerpt | TEXT | Extracto |
| content | TEXT | Contenido completo (Markdown) |
| category | TEXT | Categoría |
| tags | TEXT[] | Etiquetas |
| featured_image | TEXT | URL imagen destacada |
| author | TEXT | Autor |
| published | BOOLEAN | Publicado |
| generated_by_ai | BOOLEAN | Generado por IA |

## 🔐 Seguridad (RLS)

Todas las tablas tienen Row Level Security habilitado con políticas específicas:

### Accommodations
- ✅ Público: Ver alojamientos con status='active'
- ✅ Propietarios: Ver, crear, editar y eliminar sus propios alojamientos

### Room Types
- ✅ Público: Ver todos los tipos de habitación
- ✅ Propietarios: Gestionar tipos de sus alojamientos

### Bookings
- ✅ Usuarios: Ver sus propias reservas
- ✅ Propietarios: Ver reservas de sus alojamientos
- ✅ Cualquiera: Crear reservas

### User Preferences
- ✅ Usuario: Ver y editar solo sus preferencias

### Pricing Data
- ✅ Público: Ver datos de precios
- ✅ Admins: Gestionar datos

### Blog Posts
- ✅ Público: Ver posts publicados
- ✅ Admins: Gestionar todos los posts

## 🔄 Migración desde el Sistema Actual

El sistema actual usa `useKV` para persistencia local. Para migrar:

1. **Autenticación**: Ya está integrada con Supabase
2. **Accommodations**: Migrar desde el array local a la tabla `accommodations`
3. **Bookings**: Migrar desde KV a la tabla `bookings`
4. **User Preferences**: Ya está usando la tabla `user_preferences`

### Script de Migración de Datos

```typescript
// Migrar alojamientos desde KV a Supabase
import { useKV } from '@github/spark/hooks'
import { useSupabaseMutation } from '@/hooks/use-supabase-query'

async function migrateAccommodations() {
  const [localAccommodations] = useKV('accommodations-data', [])
  const { insert } = useSupabaseMutation('accommodations')
  
  for (const accommodation of localAccommodations) {
    await insert({
      owner_id: user.id, // ID del usuario actual
      name: accommodation.name,
      description: accommodation.description,
      category: accommodation.category,
      city: accommodation.city,
      department: accommodation.department,
      base_price: accommodation.price,
      // ... otros campos
    })
  }
}
```

## 🧪 Testing

### Test Manual en Consola

```javascript
// 1. Test de autenticación
const testAuth = async () => {
  const { signUp, signIn } = useSupabaseAuth()
  
  // Registrar
  await signUp('test@example.com', 'password123', { name: 'Test User' })
  
  // Login
  await signIn('test@example.com', 'password123')
}

// 2. Test de inserción de datos
const testInsert = async () => {
  const { insert } = useSupabaseMutation('accommodations')
  
  await insert({
    owner_id: user.id,
    name: 'Hotel de Prueba',
    category: 'naturaleza',
    city: 'Pasto',
    department: 'Nariño',
    base_price: 100000,
    // ... otros campos requeridos
  })
}

// 3. Test de consulta
const testQuery = async () => {
  const { data } = useSupabaseQuery('accommodations', {
    filter: { city: 'Pasto' }
  })
  
  console.log('Alojamientos en Pasto:', data)
}
```

## 🎨 Componentes Listos para Usar

### SupabaseAuthModal
Modal completo de autenticación con login y registro.

```tsx
import { SupabaseAuthModal } from '@/components/SupabaseAuthModal'

function MyPage() {
  const [showAuth, setShowAuth] = useState(false)
  
  return (
    <>
      <button onClick={() => setShowAuth(true)}>Login</button>
      <SupabaseAuthModal open={showAuth} onOpenChange={setShowAuth} />
    </>
  )
}
```

### SupabaseAccommodationsList
Lista completa de alojamientos con filtros y gestión.

```tsx
import { SupabaseAccommodationsList } from '@/components/SupabaseAccommodationsList'

function AccommodationsPage() {
  return <SupabaseAccommodationsList />
}
```

## 📞 Próximos Pasos

1. ✅ Configurar credenciales de Supabase
2. ✅ Ejecutar migración SQL
3. ✅ Reemplazar AuthProvider con SupabaseAuthProvider en App.tsx
4. ⚠️ Migrar datos existentes de KV a Supabase
5. ⚠️ Actualizar componentes para usar hooks de Supabase
6. ⚠️ Implementar sincronización automática de datos

## 🆘 Soporte

- [Documentación de Supabase](https://supabase.com/docs)
- [Discord de Supabase](https://discord.supabase.com)
- Ver `SUPABASE_CONFIG.md` para troubleshooting

---

🎉 **¡Supabase está listo para usar en SendAI!**
