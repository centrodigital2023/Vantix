# Sistema de Carga de Imágenes y Suscripciones en Tiempo Real - Supabase

Esta guía explica cómo usar el nuevo sistema de carga de imágenes con Supabase Storage y las suscripciones en tiempo real.

## 📸 Sistema de Carga de Imágenes

### Configuración del Storage Bucket

1. **Crear el bucket en Supabase:**
   - Ve a Storage en tu dashboard de Supabase
   - Crea un nuevo bucket llamado `accommodations`
   - Configúralo como público o privado según tus necesidades

2. **Configurar políticas de Storage:**
```sql
-- Permitir a usuarios autenticados subir archivos
CREATE POLICY "Usuarios pueden subir imágenes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'accommodations');

-- Permitir a todos ver imágenes
CREATE POLICY "Imágenes son públicas"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'accommodations');

-- Permitir a propietarios eliminar sus imágenes
CREATE POLICY "Propietarios pueden eliminar sus imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'accommodations' AND auth.uid() = owner);
```

### Uso del Hook `useSupabaseStorage`

```typescript
import { useSupabaseStorage } from '@/hooks/use-supabase-storage'

function MyComponent() {
  const {
    uploads,           // Array de uploads en progreso
    isUploading,       // Bandera de carga global
    uploadFile,        // Subir un solo archivo
    uploadFiles,       // Subir múltiples archivos
    deleteFile,        // Eliminar un archivo
    listFiles,         // Listar archivos en el bucket
    clearUploads,      // Limpiar historial de uploads
    isConfigured       // Si Supabase está configurado
  } = useSupabaseStorage({
    bucket: 'accommodations',
    maxSizeMB: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    onUploadComplete: (urls) => {
      console.log('URLs de imágenes cargadas:', urls)
    }
  })

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const filesArray = Array.from(files)
    const urls = await uploadFiles(filesArray, 'my-folder')
    // urls contiene las URLs públicas de las imágenes
  }

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileSelect} />
      
      {uploads.map(upload => (
        <div key={upload.id}>
          <p>{upload.fileName} - {upload.progress}%</p>
          <p>Estado: {upload.status}</p>
        </div>
      ))}
    </div>
  )
}
```

### Uso del Componente `ImageUploadZone`

```typescript
import { ImageUploadZone } from '@/components/ImageUploadZone'

function AccommodationForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  return (
    <ImageUploadZone
      bucket="accommodations"
      folder="properties/123"
      maxFiles={10}
      maxSizeMB={10}
      onUploadComplete={(urls) => {
        setImageUrls(prev => [...prev, ...urls])
      }}
      initialImages={imageUrls}
    />
  )
}
```

### Características del Sistema de Imágenes

✅ **Validación Automática:**
- Formato de archivo (JPEG, PNG, WebP)
- Tamaño máximo configurable
- Validación antes de subir

✅ **Progreso en Tiempo Real:**
- Barra de progreso para cada archivo
- Estados: uploading, processing, completed, error
- Notificaciones toast

✅ **Drag & Drop:**
- Arrastra y suelta imágenes directamente
- Interfaz visual responsive

✅ **Gestión de Imágenes:**
- Vista previa de imágenes cargadas
- Eliminación individual
- Identificación de imagen principal

## 🔄 Suscripciones en Tiempo Real

### Hook `useSupabaseRealtime`

Suscríbete a cambios en tablas específicas:

```typescript
import { useSupabaseRealtime } from '@/hooks/use-supabase-realtime'

function LiveDataComponent() {
  const { isConnected } = useSupabaseRealtime([
    {
      table: 'accommodations',
      event: 'INSERT',
      onInsert: (newRecord) => {
        console.log('Nuevo alojamiento:', newRecord)
        // Actualizar UI automáticamente
      }
    },
    {
      table: 'bookings',
      event: '*', // Escuchar todos los eventos
      onChange: (payload) => {
        console.log('Cambio en reservas:', payload)
      }
    },
    {
      table: 'accommodations',
      filter: 'city=eq.Pasto', // Filtrar por ciudad
      onUpdate: (updatedRecord) => {
        console.log('Alojamiento actualizado en Pasto:', updatedRecord)
      }
    }
  ])

  return (
    <div>
      Estado: {isConnected ? 'Conectado' : 'Desconectado'}
    </div>
  )
}
```

### Hook `useSupabaseRealtimeQuery`

Query con actualizaciones automáticas en tiempo real:

```typescript
import { useSupabaseRealtimeQuery } from '@/hooks/use-supabase-realtime'

function AccommodationsList() {
  const { data, loading, error, refetch } = useSupabaseRealtimeQuery('accommodations', {
    filter: { status: 'active' },
    order: { column: 'created_at', ascending: false },
    limit: 20
  })

  // Los datos se actualizan automáticamente cuando cambian en la DB

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data.map(accommodation => (
        <Card key={accommodation.id}>
          <h3>{accommodation.name}</h3>
          <p>{accommodation.city}</p>
        </Card>
      ))}
    </div>
  )
}
```

### Eventos Disponibles

- `INSERT`: Cuando se crea un nuevo registro
- `UPDATE`: Cuando se actualiza un registro existente
- `DELETE`: Cuando se elimina un registro
- `*`: Todos los eventos

### Filtros en Tiempo Real

Puedes filtrar las suscripciones:

```typescript
{
  table: 'bookings',
  filter: 'user_id=eq.123',  // Solo reservas del usuario 123
  event: 'UPDATE'
}
```

Sintaxis de filtros:
- `column=eq.value` - Igual a
- `column=neq.value` - No igual a
- `column=gt.value` - Mayor que
- `column=lt.value` - Menor que
- `column=gte.value` - Mayor o igual que
- `column=lte.value` - Menor o igual que

## 🎯 Casos de Uso

### 1. Dashboard de Propietario en Tiempo Real

```typescript
function HostDashboard() {
  const { data: bookings } = useSupabaseRealtimeQuery('bookings', {
    filter: { host_id: currentUserId },
    order: { column: 'created_at', ascending: false }
  })

  // Bookings se actualiza automáticamente cuando hay nuevas reservas
  
  return (
    <div>
      <h2>Reservas Recientes ({bookings.length})</h2>
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}
```

### 2. Chat o Notificaciones en Tiempo Real

```typescript
function NotificationsCenter() {
  const [notifications, setNotifications] = useState([])

  useSupabaseRealtime([
    {
      table: 'notifications',
      filter: `user_id=eq.${currentUserId}`,
      event: 'INSERT',
      onInsert: (notification) => {
        setNotifications(prev => [notification, ...prev])
        toast.info(notification.message)
      }
    }
  ])

  return (
    <div>
      {notifications.map(notif => (
        <NotificationItem key={notif.id} notification={notif} />
      ))}
    </div>
  )
}
```

### 3. Formulario con Carga de Imágenes

```typescript
function CreateAccommodationForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: []
  })

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('accommodations')
      .insert({
        ...formData,
        images: formData.images // URLs de Supabase Storage
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <ImageUploadZone
        bucket="accommodations"
        maxFiles={10}
        onUploadComplete={(urls) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...urls]
          }))
        }}
      />

      <Button type="submit">Crear Alojamiento</Button>
    </form>
  )
}
```

## 🚀 Demo Completa

Accede a la página de demo completa en `/supabase-demo` (ya implementada en la app) para ver:

- ✅ Configuración de Supabase
- ✅ Sistema de carga de imágenes con drag & drop
- ✅ Demo de tiempo real con INSERT/UPDATE/DELETE
- ✅ Listado de alojamientos con filtros
- ✅ Formulario de creación con validación

## 🔒 Seguridad

### Row Level Security (RLS)

Todas las tablas deben tener políticas RLS habilitadas:

```sql
-- Ejemplo: Solo el propietario puede ver/editar sus alojamientos
CREATE POLICY "Propietarios ven sus alojamientos"
ON accommodations FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Propietarios editan sus alojamientos"
ON accommodations FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());
```

### Storage Security

```sql
-- Solo el propietario puede eliminar sus imágenes
CREATE POLICY "Propietarios eliminan sus imágenes"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'accommodations' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## 📊 Monitoreo

### Verificar Conexiones Activas

```typescript
const { isConnected, isConfigured } = useSupabaseRealtime([...])

if (!isConfigured) {
  return <Alert>Supabase no configurado</Alert>
}

if (!isConnected) {
  return <Alert>Reconectando...</Alert>
}
```

### Limpieza de Recursos

Los hooks limpian automáticamente las suscripciones cuando el componente se desmonta, pero puedes controlar manualmente:

```typescript
useEffect(() => {
  // La suscripción se limpia automáticamente en el cleanup
  return () => {
    // Aquí se desuscriben todos los canales
  }
}, [])
```

## 🐛 Troubleshooting

### Error: "No se puede conectar al Storage"
- Verifica que el bucket exista en Supabase
- Verifica las políticas de acceso al bucket
- Asegúrate de que las credenciales estén configuradas

### Error: "Realtime subscription failed"
- Verifica que la tabla exista
- Asegúrate de que Realtime esté habilitado para esa tabla en Supabase
- Verifica las políticas RLS de la tabla

### Imágenes no se cargan
- Verifica el formato de archivo (solo JPG, PNG, WebP)
- Verifica el tamaño (máximo 10MB por defecto)
- Revisa las políticas de Storage

## 📚 Referencias

- [Documentación de Supabase Storage](https://supabase.com/docs/guides/storage)
- [Documentación de Realtime](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

¡El sistema está completo y listo para usar! 🎉
