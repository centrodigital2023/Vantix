# Arquitectura de Autenticación SendAI - Sistema de Roles Separados

## 🎯 Visión General

SendAI implementa un sistema de autenticación multi-rol con separación clara de puntos de acceso, optimizado para diferentes tipos de usuarios del ecosistema turístico colombiano.

## 👥 Roles del Sistema

### 1. 👤 Turista (Usuario Final)
**Ubicación de acceso**: Navbar superior derecha - Botón "Iniciar Sesión"

**Sin registro puede**:
- ✅ Navegar destinos y categorías
- ✅ Explorar alojamientos y tours
- ✅ Ver experiencias y precios
- ✅ Leer blog y artículos
- ✅ Usar buscador avanzado
- ✅ Generar itinerarios IA (modo preview)

**Debe registrarse SOLO para**:
- 🔒 Realizar reservas
- 🔒 Procesar pagos
- 🔒 Guardar itinerarios personalizados
- 🔒 Dejar reseñas y calificaciones
- 🔒 Ver historial de reservas

**Métodos de registro**:
- Google OAuth (recomendado)
- Email + contraseña

**Características**:
- Interfaz simplificada y amigable
- Registro rápido en 2 pasos
- Integración con Google para autenticación instantánea
- Sin verificación requerida para turistas

---

### 2. 🏡 Anfitrión / Prestador de Servicios
**Ubicación de acceso**: Footer (discreto) - Link "Acceso Anfitriones"

**Sin registro puede**:
- ✅ Explorar la plataforma completa
- ✅ Ver beneficios del programa de anfitriones
- ✅ Leer cómo funciona el panel de gestión

**Debe registrarse para**:
- 🔒 Registrar alojamientos (hoteles, hostales, casas rurales)
- 🔒 Registrar vehículos de alquiler
- 🔒 Publicar tours y experiencias
- 🔒 Ofrecer servicios (guías, transporte, degustaciones)
- 🔒 Acceder al panel Extranet de gestión

**Proceso de registro**:
1. Registro con información de negocio
2. Selección de tipo de cuenta (Anfitrión o Prestador)
3. Verificación básica automática
4. **Revisión y aprobación del SuperAdmin (24-48 horas)**
5. Notificación por email cuando esté activo
6. Acceso al panel de gestión completo

**Características**:
- Ubicación discreta en footer
- Interfaz profesional tipo SaaS
- Selección clara entre Anfitrión (alojamientos) y Prestador de Servicios (tours/transporte/experiencias)
- Proceso de verificación obligatorio
- Publicación sujeta a aprobación del SuperAdmin
- Panel completo de analíticas y gestión

---

### 3. 🛡️ SuperAdministrador
**Ubicación de acceso**: Footer (muy discreto) - Link "Acceso Administrativo"

**Acceso restringido con**:
- 🔐 Usuario predefinido: `superadmin@sendai.com`
- 🔐 Contraseña fuerte: `SuperAdmin2025!`
- 🔐 Doble factor (2FA) obligatorio: código `123456` (demo)
- 🔐 Logging de IP automático
- 🔐 Sesiones con timeout de seguridad
- 🔐 Máximo 3 intentos fallidos antes de bloqueo

**Control total sobre**:
- ✅ Aprobar/rechazar anfitriones y prestadores
- ✅ Gestionar todos los usuarios del sistema
- ✅ Moderar contenido y publicaciones
- ✅ Resolver quejas de turistas
- ✅ Ver estadísticas globales del sistema
- ✅ Configurar comisiones y políticas
- ✅ Acceder a logs de auditoría
- ✅ Bloquear/suspender cuentas
- ✅ Gestionar disputas de pagos

**Características**:
- Ubicación ultra-discreta en footer
- Interfaz de alta seguridad con alertas
- Autenticación en 2 pasos obligatoria
- Registro de todas las acciones administrativas
- Diseño con códigos de color de seguridad (rojo/naranja)
- Confirmaciones dobles para acciones críticas

---

## 🚪 Puntos de Acceso UI

### Navbar (Superior)
```
┌────────────────────────────────────────────────────────────┐
│ SendAI | Inicio | Explorar | Itinerario | Blog | 🔔 | 👤   │
│                                              [Iniciar Sesión]│
└────────────────────────────────────────────────────────────┘
```

**Solo para turistas**: Botón prominente "Iniciar Sesión" en esquina superior derecha

### Footer (Inferior - Discreto)
```
┌────────────────────────────────────────────────────────────┐
│  [Columnas de navegación normal...]                         │
│                                                              │
│  ──────────────────────────────────────────────────────    │
│  Acceso Anfitriones  |  Acceso Administrativo              │
│  ──────────────────────────────────────────────────────    │
│  © 2025 SendAI Latinoamérica Colombia                       │
└────────────────────────────────────────────────────────────┘
```

**Muy discreto**: Enlaces pequeños y con opacidad reducida, solo visibles en hover

---

## 🔐 Flujos de Autenticación

### Turista
```
Botón Navbar → TouristAuth Page
├─ Tab "Iniciar Sesión"
│  ├─ Email + Contraseña
│  └─ Google OAuth
└─ Tab "Registrarse"
   ├─ Nombre + Email + Contraseña
   └─ Google OAuth
→ Autenticación inmediata
→ Redirección a Home con sesión activa
```

### Anfitrión/Prestador
```
Link Footer → HostAuth Page
├─ Selección de Rol
│  ├─ 🏠 Anfitrión (Alojamientos)
│  └─ 🚐 Prestador (Servicios)
├─ Tab "Iniciar Sesión"
│  └─ Email + Contraseña
└─ Tab "Registrarse"
   ├─ Nombre/Empresa + Teléfono
   ├─ Email + Contraseña
   └─ Notificación de verificación 24-48h
→ Cuenta creada pero NO VERIFICADA
→ Acceso al panel (sin poder publicar)
→ Espera aprobación SuperAdmin
→ Email cuando esté aprobado
```

### SuperAdmin
```
Link Footer → AdminAuth Page
├─ Step 1: Credenciales
│  ├─ Email predefinido
│  └─ Contraseña fuerte
│  └─ Max 3 intentos
├─ Step 2: 2FA Obligatorio
│  ├─ Código de 6 dígitos
│  ├─ Max 3 intentos
│  └─ Logging de IP
→ Autenticación exitosa
→ Redirección a SuperAdmin Dashboard
→ Sesión con timeout automático
```

---

## 📱 Componentes Creados

### Páginas de Autenticación
1. **`TouristAuth.tsx`**
   - Diseño friendly y accesible
   - Integración Google OAuth
   - Tabs para login/signup
   - Gradiente verde/turquesa (colores SendAI)

2. **`HostAuth.tsx`**
   - Diseño profesional SaaS
   - Selector visual de tipo de cuenta
   - Formularios extendidos con teléfono
   - Notificación de verificación obligatoria
   - Gradiente secundario/terracota

3. **`AdminAuth.tsx`**
   - Diseño de alta seguridad
   - Flujo 2FA en 2 pasos
   - Alertas de seguridad
   - Contador de intentos fallidos
   - Gradiente rojo/naranja (seguridad)

### Actualizaciones UI
- **`Navbar.tsx`**: Botón "Iniciar Sesión" para turistas (reemplaza botón "Propietarios")
- **`Footer.tsx`**: Enlaces discretos para Anfitriones y Admin en sección inferior
- **`App.tsx`**: Rutas para 3 páginas de autenticación sin Navbar/Footer

---

## 🎨 Diseño Visual

### Tourist Auth
- **Color primario**: Verde SendAI
- **Estilo**: Friendly, welcoming, simple
- **Foco**: Conversión rápida con Google

### Host Auth
- **Color primario**: Terracota/Secundario
- **Estilo**: Profesional, confiable, informativo
- **Foco**: Proceso claro con expectativas de verificación

### Admin Auth
- **Color primario**: Rojo/Destructivo
- **Estilo**: Seguro, restringido, autoritario
- **Foco**: Seguridad máxima con 2FA

---

## 🔄 Gestión de Sesiones

### Persistencia
- Todas las sesiones persisten usando `useKV` del hook de Spark
- Usuario almacenado en: `auth-user`
- Página actual en: `current-page`

### Roles y Permisos
```typescript
type UserRole = 
  | 'tourist'           // Ver y reservar
  | 'host'              // Gestionar alojamientos
  | 'service_provider'  // Gestionar servicios/tours
  | 'admin'             // Moderación parcial
  | 'superadmin'        // Control total
```

### Verificación de Rol en UI
```typescript
const { user, isTourist, isHost, isServiceProvider, isSuperAdmin } = useAuth()

// Mostrar opciones según rol
{isHost && <MenuItem>Mis Propiedades</MenuItem>}
{isSuperAdmin && <MenuItem>Panel Admin</MenuItem>}
```

---

## 🚀 Beneficios de la Nueva Arquitectura

### Para Turistas
✅ Acceso rápido desde navbar visible
✅ Registro ultra-simplificado con Google
✅ No necesita registro para explorar
✅ Interfaz familiar tipo redes sociales

### Para Anfitriones/Prestadores
✅ Ubicación discreta (no distrae a turistas)
✅ Proceso profesional de verificación
✅ Expectativas claras (24-48h aprobación)
✅ Separación clara entre alojamientos y servicios

### Para SuperAdmin
✅ Máxima seguridad con 2FA obligatorio
✅ Ubicación ultra-discreta
✅ Prevención de accesos no autorizados
✅ Logging completo de actividad
✅ Control total del ecosistema

### Para el Sistema
✅ Separación clara de roles
✅ UX optimizada por tipo de usuario
✅ Menor fricción para turistas (conversión)
✅ Mayor control para administración
✅ Escalabilidad por rol

---

## 📊 Métricas de Éxito

- **Turistas**: Aumento de conversión de visitante → usuario registrado
- **Anfitriones**: Proceso de verificación claro reduce consultas de soporte
- **SuperAdmin**: Zero accesos no autorizados por seguridad 2FA
- **General**: Navegación intuitiva sin confusión entre roles

---

## 🔮 Próximos Pasos

1. ✅ Separación de roles implementada
2. 🔄 Integración real con Google OAuth API
3. 🔄 Sistema real de 2FA con TOTP (Google Authenticator)
4. 🔄 Email automático de verificación para anfitriones
5. 🔄 Dashboard de aprobación en SuperAdmin
6. 🔄 Sistema de notificaciones por rol
7. 🔄 Recuperación de contraseña por email
8. 🔄 Logging de IP y actividad en base de datos

---

## 📝 Notas de Implementación

**Estado actual**: Demo funcional con mock authentication
**Producción requiere**:
- Backend API real para autenticación
- Base de datos para usuarios y sesiones
- Servicio de email transaccional
- Integración OAuth con Google Cloud
- Servicio 2FA con TOTP library
- Rate limiting y protección DDoS
- Certificados SSL/TLS

**Demo credentials**:
- Tourist: Cualquier email/password
- Host: Cualquier email/password
- SuperAdmin: `superadmin@sendai.com` / `SuperAdmin2025!` + 2FA: `123456`
