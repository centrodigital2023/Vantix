# Configuración de Supabase para SendAI

Esta guía te ayudará a configurar Supabase para tu plataforma de turismo SendAI.

## 🚀 Paso 1: Crear un Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta o inicia sesión
2. Crea un nuevo proyecto:
   - Nombre: `SendAI Tourism Platform` (o el nombre que prefieras)
   - Database Password: Genera una contraseña segura y guárdala
   - Region: Elige la región más cercana a Colombia (ej: `South America (São Paulo)`)
3. Espera a que el proyecto se inicialice (puede tomar 1-2 minutos)

## 🔑 Paso 2: Obtener las Credenciales

1. En tu dashboard de Supabase, ve a **Settings** > **API**
2. Copia las siguientes credenciales:
   - **Project URL**: `https://tu-proyecto.supabase.co`
   - **anon/public key**: Clave pública segura para el cliente

## 📝 Paso 3: Configurar Variables de Entorno

### Opción A: Usando Spark KV (Recomendado para esta plataforma)

Las credenciales se deben almacenar usando el sistema KV de Spark. Ejecuta este código en la consola del navegador cuando la app esté corriendo:

```javascript
await spark.kv.set('VITE_SUPABASE_URL', 'https://tu-proyecto.supabase.co')
await spark.kv.set('VITE_SUPABASE_ANON_KEY', 'tu-clave-anon-aqui')
```

### Opción B: Archivo .env.local (Alternativa)

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

**Importante**: Nunca compartas tu `service_role` key en el cliente. Solo usa la `anon` key.

## 🗄️ Paso 4: Ejecutar la Migración SQL

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Haz clic en **New Query**
3. Copia todo el contenido del archivo `supabase-migration.sql`
4. Pégalo en el editor SQL
5. Haz clic en **Run** para ejecutar la migración

Esto creará todas las tablas necesarias:
- `accommodations` - Alojamientos y propiedades
- `room_types` - Tipos de habitaciones
- `bookings` - Reservas
- `user_preferences` - Preferencias de usuario para recomendaciones
- `pricing_data` - Datos de precios del mercado
- `blog_posts` - Posts del blog generados por IA

## 🔐 Paso 5: Configurar Autenticación

1. Ve a **Authentication** > **Providers**
2. Habilita **Email** provider (ya viene habilitado por defecto)
3. Opcional: Configura otros providers (Google, Facebook, etc.)

### Configurar Email Templates (Opcional pero recomendado)

1. Ve a **Authentication** > **Email Templates**
2. Personaliza las plantillas para:
   - Confirmación de registro
   - Recuperación de contraseña
   - Cambio de email

## 📊 Paso 6: Verificar las Políticas RLS

Las políticas de Row Level Security (RLS) ya están configuradas en la migración:

- **Accommodations**: Los propietarios solo ven y gestionan sus propias propiedades
- **Bookings**: Los usuarios ven sus reservas, los propietarios ven las reservas de sus propiedades
- **User Preferences**: Cada usuario solo ve sus propias preferencias
- **Blog Posts**: Todos ven posts publicados, solo admins gestionan
- **Pricing Data**: Todos pueden ver, solo admins pueden editar

Verifica que las políticas estén activas en **Authentication** > **Policies**

## 🧪 Paso 7: Probar la Conexión

1. Reinicia tu aplicación después de configurar las variables de entorno
2. Intenta registrarte como nuevo usuario
3. Verifica que puedas iniciar sesión
4. Ve a la sección de propietarios y verifica que necesitas autenticación

## 📚 Estructura de Datos

### Tabla `accommodations`
```typescript
{
  id: string (UUID)
  owner_id: string (UUID) - referencia a auth.users
  name: string
  description: string
  category: string - aventura|bienestar|cultural|familiar|gastronomia|naturaleza|negocios|playa|religioso|rural
  city: string
  department: string
  address: string
  latitude: number
  longitude: number
  images: string[] - URLs de imágenes
  amenities: string[] - ["wifi", "piscina", "parqueadero"]
  rating: number - 0.0 a 5.0
  reviews_count: number
  base_price: number
  currency: string - "COP"
  status: 'active' | 'inactive' | 'pending'
}
```

### Tabla `room_types`
```typescript
{
  id: string (UUID)
  accommodation_id: string (UUID)
  name: string - "Habitación Doble", "Suite"
  description: string
  max_guests: number
  price_per_night: number
  available_rooms: number
  images: string[]
  amenities: string[]
}
```

### Tabla `bookings`
```typescript
{
  id: string (UUID)
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
  payment_id: string
  special_requests: string
}
```

## 🔧 Hooks Disponibles

### `useSupabaseAuth()`
Maneja toda la autenticación:
```typescript
const { user, session, loading, signUp, signIn, signOut, resetPassword } = useSupabaseAuth()
```

### `useSupabaseQuery()`
Para consultas a la base de datos:
```typescript
const { data, loading, error } = useSupabaseQuery('accommodations', {
  filter: { city: 'Pasto' },
  order: { column: 'rating', ascending: false },
  limit: 10
})
```

### `useSupabaseMutation()`
Para insertar, actualizar o eliminar datos:
```typescript
const { insert, update, remove, loading } = useSupabaseMutation('accommodations')

await insert({ name: 'Hotel Example', category: 'naturaleza', ... })
await update(id, { rating: 4.5 })
await remove(id)
```

## 🎯 Uso en Componentes

### Verificar autenticación
```tsx
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'

function MyComponent() {
  const { user, isAuthenticated, loading } = useSupabaseAuthContext()
  
  if (loading) return <div>Cargando...</div>
  if (!isAuthenticated) return <LoginForm />
  
  return <div>Hola {user?.email}</div>
}
```

### Consultar datos
```tsx
import { useSupabaseQuery } from '@/hooks/use-supabase-query'

function AccommodationsList() {
  const { data: accommodations, loading } = useSupabaseQuery('accommodations', {
    filter: { status: 'active' },
    order: { column: 'created_at', ascending: false }
  })
  
  if (loading) return <Skeleton />
  
  return (
    <div>
      {accommodations?.map(acc => (
        <Card key={acc.id}>{acc.name}</Card>
      ))}
    </div>
  )
}
```

## 🔄 Migración desde el Sistema Actual

El sistema actual usa `useKV` para persistencia local. Con Supabase:

1. Los datos se sincronizan en la nube
2. Múltiples dispositivos pueden acceder a los mismos datos
3. Las credenciales de autenticación se persisten usando KV internamente
4. Los datos de preferencias de usuario se migran a la tabla `user_preferences`

## 🛡️ Seguridad

✅ **RLS habilitado**: Todas las tablas tienen políticas de seguridad
✅ **Anon key segura**: Solo permite operaciones permitidas por RLS
✅ **Session persistence**: Las sesiones se almacenan de forma segura en KV
✅ **HTTPS**: Todas las comunicaciones están cifradas

## 📱 Testing

### Test de Autenticación
```javascript
// En la consola del navegador
const { user, signUp, signIn } = useSupabaseAuth()

// Registrar
await signUp('test@example.com', 'password123', { name: 'Test User' })

// Login
await signIn('test@example.com', 'password123')
```

### Test de Datos
```javascript
// Insertar alojamiento de prueba
const { insert } = useSupabaseMutation('accommodations')
await insert({
  owner_id: user.id,
  name: 'Hotel Test',
  category: 'naturaleza',
  city: 'Pasto',
  department: 'Nariño',
  base_price: 150000,
  description: 'Test accommodation'
})
```

## 🚨 Troubleshooting

### Error: "No se puede conectar a Supabase"
- Verifica que las variables de entorno estén configuradas correctamente
- Verifica que el proyecto de Supabase esté activo

### Error: "Row Level Security policy violation"
- Verifica que las políticas RLS estén configuradas correctamente
- Asegúrate de estar autenticado para operaciones protegidas

### Error: "Invalid API key"
- Verifica que estés usando la `anon` key, no la `service_role` key
- Regenera las keys en Supabase si es necesario

## 📞 Soporte

- Documentación oficial: [https://supabase.com/docs](https://supabase.com/docs)
- Discord de Supabase: [https://discord.supabase.com](https://discord.supabase.com)

## ✅ Checklist Final

- [ ] Proyecto de Supabase creado
- [ ] Variables de entorno configuradas
- [ ] Migración SQL ejecutada
- [ ] Tablas creadas correctamente
- [ ] Políticas RLS verificadas
- [ ] Autenticación funcionando
- [ ] Test de registro y login exitoso
- [ ] Test de inserción de datos exitoso

¡Tu plataforma SendAI está lista para usar Supabase! 🎉
