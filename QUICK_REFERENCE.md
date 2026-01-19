# 🚀 VANTIX SuperAdmin - Quick Reference

## 🔐 Acceso Rápido

```
URL:      /admin-auth
Email:    superadmin@sendai.com
Password: SuperAdmin2025!
2FA:      123456
```

## 🗺️ Rutas del Sistema

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| 🎛️ Dashboard | `/superadmin-dashboard` | Centro de comando |
| 👥 Usuarios | `/superadmin-users` | Gestión de usuarios |
| 🏢 Proveedores | `/superadmin-providers` | Control de anfitriones |
| ✨ Moderación | `/superadmin-moderation` | Moderación IA (NUEVO) |
| 📅 Reservas | `/superadmin-bookings` | Gestión reservas (NUEVO) |
| ⚠️ Quejas | `/superadmin-complaints` | Centro de quejas |
| 📊 Analytics | `/superadmin-analytics` | Analítica global |
| ⚙️ Config | `/superadmin-config` | Configuración |

## 🎨 Paleta de Colores

```css
--primary:     oklch(0.45 0.15 200)  /* Teal profesional */
--success:     oklch(0.65 0.15 150)  /* Verde - Éxito */
--warning:     oklch(0.68 0.18 45)   /* Naranja - Advertencia */
--destructive: oklch(0.55 0.22 30)   /* Rojo - Error */
--info:        oklch(0.60 0.15 240)  /* Azul - Info */
--ai-accent:   oklch(0.50 0.18 300)  /* Morado - IA */
```

## 🔑 Contraseñas de Autorización

```
Acciones destructivas: admin123
(Simula 2FA - en producción usar OTP real)
```

## 📦 KV Store Keys

```typescript
'superadmin-stats'              // Métricas del dashboard
'superadmin-users'              // Lista de usuarios
'superadmin-providers'          // Lista de proveedores
'superadmin-moderation-items'   // Items a moderar
'superadmin-bookings'           // Reservas
'superadmin-complaints'         // Quejas
'superadmin-analytics'          // Datos de analytics
'superadmin-config'             // Configuración del sistema
```

## 🤖 IA - Uso de Spark LLM

```typescript
// Análisis con GPT-4o-mini (rápido, clasificación)
const prompt = window.spark.llmPrompt`Analiza: ${content}`
const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
const data = JSON.parse(result)

// Análisis con GPT-4o (complejo, respuestas)
const prompt = window.spark.llmPrompt`Genera respuesta para: ${complaint}`
const response = await window.spark.llm(prompt, 'gpt-4o', false)
```

## 🧩 Componentes Clave

### SuperAdminHeader
```tsx
<SuperAdminHeader
  title="Título del Módulo"
  subtitle="Descripción opcional"
  onNavigate={onNavigate}
  showAlerts={true}
  alertCount={5}
/>
```

### Badge de Estado
```tsx
// Success
<Badge className="bg-success text-success-foreground">Activo</Badge>

// Warning
<Badge className="bg-warning text-warning-foreground">Pendiente</Badge>

// Destructive
<Badge className="bg-destructive text-destructive-foreground">Bloqueado</Badge>

// Info
<Badge className="bg-info text-info-foreground">Información</Badge>
```

## 🔄 Patrón useKV (IMPORTANTE)

```typescript
// ❌ INCORRECTO - Referencia stale
const [items, setItems] = useKV('key', [])
setItems([...items, newItem])  // ¡items puede estar desactualizado!

// ✅ CORRECTO - Functional update
const [items, setItems] = useKV('key', [])
setItems(currentItems => [...(currentItems || []), newItem])
```

## 📊 Métricas Iniciales

```
Usuarios Activos:     2,847
Anfitriones:          456 (12 bloqueados)
Servicios:            1,289
Reservas:             8,934
Ingresos:             $1,147K USD
Quejas Abiertas:      23
Alertas Seguridad:    3
Estado Sistema:       Operativo (99.9%)
```

## 🚀 Flujos Comunes

### Aprobar Proveedor
```
Dashboard → Providers → "Pendientes" 
→ Ver Detalle → Revisar Score IA 
→ Aprobar/Rechazar + Comentarios
```

### Moderar Contenido
```
Dashboard → Moderation → Item Flagged
→ Ver Análisis IA → Re-analizar (opcional)
→ Aprobar/Rechazar + Notas
```

### Resolver Disputa
```
Dashboard → Bookings → "Disputas"
→ Ver Detalle → Revisar Evidencia
→ Cancelar/Reembolsar → Password → Confirmar
```

### Gestionar Usuario
```
Dashboard → Users → Buscar
→ Ver Detalle → Cambiar Estado/Rol
→ Agregar Notas → Confirmar
```

## 🎯 Estados y Tipos

### Estados de Usuario
- `active` - Usuario activo
- `suspended` - Suspendido temporalmente
- `blocked` - Bloqueado permanente
- `pending` - Pendiente de activación

### Roles de Usuario
- `superadmin` - Acceso total
- `admin` - Moderación y gestión
- `host` - Anfitrión de alojamientos
- `service_provider` - Prestador de servicios
- `tourist` - Usuario final

### Estados de Reserva
- `confirmed` - Confirmada y activa
- `cancelled` - Cancelada
- `completed` - Completada exitosamente
- `disputed` - En disputa
- `refunded` - Reembolsada

### Estados de Pago
- `paid` - Pagado completo
- `pending` - Pendiente de pago
- `partial` - Pago parcial
- `refunded` - Reembolsado

### Prioridades
- `critical` - Atención inmediata
- `high` - Alta prioridad
- `medium` - Prioridad media
- `low` - Prioridad baja

## 📱 Iconos (Phosphor)

```tsx
import {
  Users,          // Usuarios
  Buildings,      // Anfitriones/Empresas
  Calendar,       // Reservas/Fechas
  Warning,        // Alertas/Quejas
  CurrencyDollar, // Pagos/Ingresos
  ShieldCheck,    // Seguridad
  Sparkle,        // IA
  CheckCircle,    // Aprobado/Éxito
  XCircle,        // Rechazado/Error
  Eye,            // Ver detalle
  MagnifyingGlass // Búsqueda
} from '@phosphor-icons/react'
```

## 🎨 Clases Tailwind Comunes

```css
/* Containers */
max-w-7xl mx-auto px-4 py-8

/* Cards */
bg-card border border-border rounded-lg p-6

/* Text */
text-foreground text-muted-foreground

/* Buttons */
bg-primary hover:bg-primary/90 text-primary-foreground

/* Badges */
bg-success/10 text-success border-success/20

/* Gradients */
bg-gradient-to-br from-background via-muted/20 to-background
```

## ⌨️ Atajos de Desarrollo

```typescript
// Log KV data
const [data] = useKV('key', [])
console.log('KV Data:', data)

// Force re-render
setData(() => [...data])

// Check current route
const { currentPage } = useRouter()
console.log('Current:', currentPage)

// Test AI
const test = await window.spark.llm(
  window.spark.llmPrompt`Test prompt`,
  'gpt-4o-mini',
  true
)
```

## 🐛 Debugging

```typescript
// IA not responding
- Check console for errors
- Verify window.spark is available
- Check prompt format (use llmPrompt)

// Data not persisting
- Check useKV key name
- Use functional updates
- Verify no syntax errors

// Navigation issues
- Check PageRoute type
- Verify route in App.tsx
- Check onNavigate prop
```

## 📚 Archivos de Referencia

```
ADMIN_MODULES_COMPLETE_PRD.md    - PRD completo
IMPLEMENTACION_FINAL.md          - Guía de implementación
SUPERADMIN_COMPONENTS.md         - Referencia de componentes
SUPERADMIN_COMPLETE.md           - Documentación completa
SISTEMA_MAPA.md                  - Mapa visual del sistema
```

## ✅ Checklist Pre-Deploy

- [ ] Cambiar contraseñas hardcodeadas
- [ ] Implementar 2FA real (OTP)
- [ ] Configurar backend real
- [ ] Email service (SendGrid)
- [ ] Rate limiting en APIs
- [ ] Monitoring (Sentry)
- [ ] SSL/TLS enforced
- [ ] Variables de entorno
- [ ] Logs externos
- [ ] Backup automático

## 🆘 Soporte

```
Documentación: Ver archivos .md en raíz
TypeScript errors: Ignorar warnings de template literals
IA offline: Usa mocks de prueba
KV issues: Limpiar localStorage
```

---

**Última actualización:** Enero 2025 | **Versión:** 1.0.0
