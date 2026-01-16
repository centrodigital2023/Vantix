# Supabase Storage & Realtime - Guía de Configuración Completa

## ✅ Tareas Completadas

### Tarea 1: Configurar Bucket de Storage y Probar Carga de Imágenes

**Componente**: `StorageBucketTest.tsx`

**Ubicación**: `/src/components/StorageBucketTest.tsx`

**Características implementadas:**
- ✅ Drag & drop para carga de imágenes
- ✅ Validación de tipo y tamaño de archivo (máx 10MB)
- ✅ Barra de progreso en tiempo real
- ✅ Vista previa de imágenes subidas
- ✅ URLs públicas generadas automáticamente
- ✅ Eliminación de imágenes desde el bucket
- ✅ Indicadores visuales de estado (subiendo, completado, error)

**Cómo usar:**
1. Ve a `/supabase-testing` en tu app
2. Click en la pestaña "Storage"
3. Crea un bucket llamado `accommodation-images` en Supabase
4. Configura el bucket como público
5. Arrastra imágenes o haz click para seleccionar
6. Las imágenes se suben automáticamente

### Tarea 2: Habilitar Tiempo Real en Tablas Específicas

**Hook**: `useSupabaseRealtime` y `useSupabaseRealtimeQuery`

**Ubicación**: `/src/hooks/use-supabase-realtime.ts`

**Características implementadas:**
- ✅ Suscripción a cambios en tablas específicas
- ✅ Eventos INSERT, UPDATE, DELETE
- ✅ Sincronización automática de estado
- ✅ Notificaciones toast para cambios
- ✅ Soporte para filtros y queries iniciales
- ✅ Reconexión automática

**Componente demo**: `RealtimeDemo.tsx`

**Tablas habilitadas:**
- `accommodations` - Alojamientos
- `bookings` - Reservas
- `room_types` - Tipos de habitación

**Cómo usar:**
1. Ve a `/supabase-testing`
2. Click en la pestaña "Realtime"
3. Agrega registros desde la interfaz
4. Abre la app en dos ventanas diferentes
5. Los cambios se sincronizan instantáneamente

**Código de ejemplo:**
```typescript
// Hook simple con query
const { data, loading, error } = useSupabaseRealtimeQuery({
  table: 'accommodations',
  initialQuery: {
    orderBy: { column: 'created_at', ascending: false },
    limit: 10
  }
})

// Hook avanzado con subscripciones personalizadas
useSupabaseRealtime({
  subscriptions: [
    {
      table: 'bookings',
      event: 'INSERT',
      onInsert: (payload) => {
        console.log('Nueva reserva:', payload)
      }
    }
  ],
  showToasts: true
})
```

### Tarea 3: Integrar Sistema de Imágenes en Formulario de Registro

**Componente actualizado**: `IntelligentPhotoUpload.tsx`

**Ubicación**: `/src/components/registration/IntelligentPhotoUpload.tsx`

**Características implementadas:**
- ✅ Integración completa con Supabase Storage
- ✅ Carga automática al seleccionar archivos
- ✅ Progreso individual por imagen
- ✅ Indicadores visuales de estado de carga
- ✅ Almacenamiento de URLs públicas
- ✅ Fallback a preview local si Supabase no está configurado
- ✅ Drag & drop para reordenar fotos
- ✅ Selección de foto principal
- ✅ Eliminación de fotos

**Props nuevas:**
- `useRealStorage` (boolean): Habilita carga real a Supabase
- `storageBucket` (string): Nombre del bucket a usar

**Cómo usar en el wizard:**
```typescript
<IntelligentPhotoUpload
  photos={photos}
  onChange={setPhotos}
  maxPhotos={20}
  useRealStorage={true}
  storageBucket="accommodation-images"
/>
```

**Los objetos PhotoData ahora incluyen:**
```typescript
interface PhotoData {
  id: string
  file?: File
  preview: string        // Data URL local
  url?: string          // URL pública de Supabase
  order: number
  isMain: boolean
  uploading?: boolean   // Estado de carga
  uploadProgress?: number // 0-100
}
```

## 🎯 Página de Pruebas

**URL**: `/supabase-testing`

**Acceso**: Directo desde la barra de direcciones o link en navbar

**Características:**
- Tres pestañas: Configuración, Storage, Realtime
- Interfaz intuitiva con guías paso a paso
- Indicadores visuales de estado
- Mensajes de error claros
- Instrucciones inline

## 📋 Configuración de Supabase (Paso a Paso)

### 1. Crear Proyecto en Supabase

1. Ve a https://supabase.com/dashboard
2. Crea un nuevo proyecto
3. Anota la URL del proyecto y la clave Anon

### 2. Configurar Storage Bucket

```sql
-- En Supabase Dashboard → Storage → Create Bucket
-- Nombre: accommodation-images
-- Public: true
```

O desde SQL:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('accommodation-images', 'accommodation-images', true);

-- Política de acceso público para lectura
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'accommodation-images');

-- Política para subir (authenticated users)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'accommodation-images');
```

### 3. Habilitar Realtime en Tablas

```sql
-- Habilitar realtime en tabla accommodations
ALTER publication supabase_realtime ADD TABLE accommodations;

-- Habilitar realtime en tabla bookings
ALTER publication supabase_realtime ADD TABLE bookings;

-- Habilitar realtime en tabla room_types
ALTER publication supabase_realtime ADD TABLE room_types;
```

### 4. Verificar Row Level Security

Las políticas RLS ya están configuradas en el archivo `supabase-migration.sql`.

## 🔧 Hooks Disponibles

### useSupabaseStorage

**Ubicación**: `/src/hooks/use-supabase-storage.ts`

```typescript
const {
  uploads,        // Array de progreso de uploads
  isUploading,    // Boolean indicando si está subiendo
  uploadFile,     // Función para subir un archivo
  uploadFiles,    // Función para subir múltiples archivos
  deleteFile,     // Función para eliminar archivo
  listFiles,      // Función para listar archivos
  clearUploads,   // Limpiar lista de uploads
  isConfigured    // Boolean si Supabase está configurado
} = useSupabaseStorage({
  bucket: 'accommodation-images',
  maxSizeMB: 10,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  onUploadComplete: (urls) => {
    console.log('URLs:', urls)
  }
})
```

### useSupabaseRealtime

**Ubicación**: `/src/hooks/use-supabase-realtime.ts`

```typescript
// Versión simple con query
const { data, loading, error, refetch } = useSupabaseRealtimeQuery<Accommodation>({
  table: 'accommodations',
  initialQuery: {
    filter: { status: 'active' },
    orderBy: { column: 'created_at', ascending: false },
    limit: 20
  }
})

// Versión avanzada con múltiples suscripciones
const { isConnected, isConfigured } = useSupabaseRealtime({
  subscriptions: [
    {
      table: 'accommodations',
      event: 'INSERT',
      onInsert: (newAccommodation) => {
        console.log('Nuevo alojamiento:', newAccommodation)
      }
    },
    {
      table: 'bookings',
      event: 'UPDATE',
      filter: `status=eq.confirmed`,
      onUpdate: (updatedBooking) => {
        console.log('Reserva actualizada:', updatedBooking)
      }
    }
  ],
  showToasts: true
})
```

## 🎨 Componentes UI

### StorageBucketTest
- Zona de drag & drop
- Grid de imágenes subidas
- Progreso individual por archivo
- Eliminación con confirmación

### RealtimeDemo
- Lista de registros en tiempo real
- Formulario para agregar nuevos
- Indicador de conexión
- Sincronización automática

### IntelligentPhotoUpload
- Integrado en wizard de registro
- Carga automática a Supabase
- Reordenamiento drag & drop
- Selección de foto principal

## 🚀 Próximos Pasos

1. **Crear bucket en Supabase Dashboard**
2. **Habilitar realtime en tablas necesarias**
3. **Probar carga de imágenes en `/supabase-testing`**
4. **Verificar sincronización realtime**
5. **Usar en formulario de registro de alojamientos**

## 📝 Notas Importantes

- Las imágenes se guardan en formato: `{folder}/{timestamp}_{random}.{ext}`
- Los uploads fallan graciosamente si Supabase no está configurado
- El sistema usa preview local mientras se sube a Supabase
- Las URLs públicas se generan automáticamente
- Los cambios realtime se notifican con toasts (se puede desactivar)
- La reconexión es automática si se pierde la conexión

## 🐛 Troubleshooting

**Error: "Storage bucket not found"**
- Verifica que el bucket existe en Supabase
- Asegúrate que el nombre coincide exactamente
- Revisa que el bucket es público

**Error: "Permission denied"**
- Verifica las políticas RLS del bucket
- Asegúrate que el usuario tiene permisos
- Revisa la configuración de autenticación

**Realtime no funciona**
- Verifica que la tabla está en la publicación `supabase_realtime`
- Revisa la consola del navegador por errores WebSocket
- Asegúrate que las credenciales son correctas

**Imágenes no se muestran**
- Verifica que el bucket es público
- Revisa la URL generada en la consola
- Asegúrate que el archivo se subió correctamente

## 📚 Referencias

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
