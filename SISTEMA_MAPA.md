# 🗺️ VANTIX SuperAdmin - Mapa del Sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         🏠 VANTIX HOME                                   │
│                    /admin-auth (Login Portal)                            │
└────────────────────────────┬────────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                   🎛️  SUPERADMIN DASHBOARD                               │
│                  /superadmin-dashboard (Centro de Comando)               │
│                                                                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │  👥 2,847  │ │  🏢 456    │ │  📦 1,289  │ │  📅 8,934  │          │
│  │  Usuarios  │ │  Hosts     │ │  Servicios │ │  Reservas  │          │
│  └─────┬──────┘ └─────┬──────┘ └─────┬──────┘ └─────┬──────┘          │
│        │              │              │              │                    │
│  ┌─────┴──────────────┴──────────────┴──────────────┴──────┐           │
│  │  💰 Ingresos: $1,147K | ⚠️ Quejas: 23 | 🛡️ Alertas: 3  │           │
│  └────────────────────────────────────────────────────────────┘          │
│                                                                           │
│  🚀 Acciones Rápidas:                                                    │
│  ├─ Aprobar Nuevo Anfitrión                                             │
│  ├─ Moderar Contenido                                                   │
│  ├─ Resolver Quejas                                                     │
│  ├─ Ver Analítica                                                       │
│  └─ Configurar Sistema                                                  │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
          ┌────────────────┴────────────────┐
          │                                  │
┌─────────▼──────────┐            ┌─────────▼──────────┐
│   GESTIÓN CORE     │            │   OPERACIONES      │
└─────────┬──────────┘            └─────────┬──────────┘
          │                                  │
          ├──────────────────┐              ├──────────────────┐
          │                  │              │                  │
          ↓                  ↓              ↓                  ↓

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  👥 USUARIOS     │  │  🏢 PROVEEDORES  │  │  ✨ MODERACIÓN   │  │  📅 RESERVAS     │
│  /superadmin-    │  │  /superadmin-    │  │  /superadmin-    │  │  /superadmin-    │
│   users          │  │   providers      │  │   moderation     │  │   bookings       │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ ✓ Búsqueda       │  │ 🔄 Pendientes    │  │ 🤖 Análisis IA   │  │ 🔍 Todas         │
│ ✓ Filtros        │  │ ✅ Activos       │  │ ✅ Aprobados     │  │ ✅ Confirmadas   │
│   - Por rol      │  │ 🚫 Suspendidos   │  │ ❌ Rechazados    │  │ ⚠️ Disputadas    │
│   - Por estado   │  │ ❌ Rechazados    │  │ ⏳ Pendientes    │  │ ✔️ Completadas   │
│   - Por país     │  │                  │  │                  │  │ 🚫 Canceladas    │
│                  │  │ 📊 Scoring:      │  │ 🎯 Detección:    │  │                  │
│ 🔄 Acciones:     │  │   - Legal        │  │   - Fraude       │  │ ⚡ Acciones:     │
│   - Ver detalle  │  │   - Reputación   │  │   - Spam         │  │   - Ver detalle  │
│   - Cambiar rol  │  │   - Riesgo       │  │   - Stock imgs   │  │   - Cancelar     │
│   - Suspender    │  │                  │  │   - Lenguaje     │  │   - Reembolsar   │
│   - Bloquear     │  │ ✓ Documentos:    │  │                  │  │                  │
│                  │  │   - RNT          │  │ 📝 Tipos:        │  │ 🔐 Seguridad:    │
│ 📊 Trust Score   │  │   - Seguros      │  │   - Alojamiento  │  │   - 2FA req      │
│ 📅 Historial     │  │                  │  │   - Servicios    │  │   - Validación   │
│                  │  │ 🤖 IA:           │  │   - Reseñas      │  │   - Auditoría    │
│                  │  │   - Auto-score   │  │   - Perfiles     │  │                  │
│                  │  │   - Recomendar   │  │   - Imágenes     │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘


┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  ⚠️ QUEJAS       │  │  📊 ANALYTICS    │  │  ⚙️ CONFIG       │  │  🔐 SEGURIDAD    │
│  /superadmin-    │  │  /superadmin-    │  │  /superadmin-    │  │  & AUDITORÍA     │
│   complaints     │  │   analytics      │  │   config         │  │                  │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ 🤖 IA:           │  │ 📈 Métricas:     │  │ 🌎 Países:       │  │ 📝 Logs:         │
│   - Clasificar   │  │   - Crecimiento  │  │   - Colombia     │  │   - Inmutables   │
│   - Priorizar    │  │   - Ingresos     │  │   - México       │  │   - Timestamp    │
│   - Responder    │  │   - Reservas     │  │   - Perú         │  │   - Usuario      │
│                  │  │   - Geografía    │  │   - Chile        │  │   - Acción       │
│ 🎯 Estados:      │  │                  │  │   - Argentina    │  │   - Cambios      │
│   - Abierta      │  │ 🔮 Predicciones: │  │                  │  │                  │
│   - En progreso  │  │   - Tendencias   │  │ 💰 Comisiones    │  │ 🔐 2FA:          │
│   - Resuelta     │  │   - Anomalías    │  │ 📋 Políticas     │  │   - Obligatorio  │
│   - Cerrada      │  │   - Forecast     │  │ 🏷️ Categorías    │  │   - Destructivo  │
│                  │  │                  │  │ 📧 Notificaciones│  │                  │
│ 🚨 Prioridad:    │  │ 📊 Reportes:     │  │ 🔧 Parámetros    │  │ 🛡️ Protección:   │
│   - Crítica      │  │   - PDF          │  │                  │  │   - Rate limit   │
│   - Alta         │  │   - Excel        │  │                  │  │   - Validación   │
│   - Media        │  │   - Programados  │  │                  │  │   - Restauración │
│   - Baja         │  │                  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## 🎨 Código de Colores del Sistema

```
🟢 Success/Active    - oklch(0.65 0.15 150)  - Verde
🟠 Warning/Pending   - oklch(0.68 0.18 45)   - Naranja
🔴 Destructive/Error - oklch(0.55 0.22 30)   - Rojo
🔵 Info/Neutral      - oklch(0.60 0.15 240)  - Azul
🟣 AI/Intelligence   - oklch(0.50 0.18 300)  - Morado
🔷 Primary           - oklch(0.45 0.15 200)  - Teal
```

---

## 🔄 Flujos de Trabajo Principales

### 1️⃣ Flujo de Moderación de Contenido
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│Contenido│────▶│Análisis │────▶│Flagged? │────▶│SuperAdmin│────▶│Aprobado/│
│Enviado  │     │IA Auto  │     │  Sí/No  │     │Revisa   │     │Rechazado│
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
                     │                                                  │
                     ↓                                                  ↓
              ┌─────────────┐                                  ┌──────────────┐
              │Score: 0-100 │                                  │Notificación  │
              │Flags: []    │                                  │+ Auditoría   │
              │Recomendación│                                  └──────────────┘
              └─────────────┘
```

### 2️⃣ Flujo de Resolución de Disputa
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│Disputa  │────▶│SuperAdmin│────▶│Revisar  │────▶│Decidir  │────▶│Ejecutar │
│Reportada│     │Notificado│     │Evidencia│     │Acción   │     │+Notificar│
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
                                                      │
                                         ┌────────────┴────────────┐
                                         ↓                         ↓
                                  ┌──────────┐            ┌──────────────┐
                                  │Cancelar  │            │Reembolsar    │
                                  │Reserva   │            │(parcial/total)│
                                  └──────────┘            └──────────────┘
                                         │                         │
                                         └────────────┬────────────┘
                                                      ↓
                                              ┌───────────────┐
                                              │Autorización   │
                                              │2FA (password) │
                                              └───────────────┘
                                                      │
                                                      ↓
                                              ┌───────────────┐
                                              │Confirmación   │
                                              │+ Auditoría    │
                                              │+ Notificación │
                                              └───────────────┘
```

### 3️⃣ Flujo de Aprobación de Proveedor
```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│Registro │────▶│IA Score │────▶│Pendiente│────▶│SuperAdmin│────▶│Aprobado/│
│Nuevo    │     │Auto     │     │Revisión │     │Decide   │     │Rechazado│
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
                     │                                                  │
                     ↓                                                  ↓
              ┌─────────────┐                                  ┌──────────────┐
              │Legal: 85    │                                  │Email Auto    │
              │Reputation:92│                                  │Status Update │
              │Risk: 15     │                                  │+ Auditoría   │
              └─────────────┘                                  └──────────────┘
```

---

## 🧩 Arquitectura de Componentes

```
┌───────────────────────────────────────────────────────────┐
│                    App.tsx (Router)                        │
└─────────────────────────┬─────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼────────┐                 ┌───────▼────────┐
│  Public Pages   │                 │  Admin Pages   │
│  (Tourist/Host) │                 │  (SuperAdmin)  │
└─────────────────┘                 └────────┬───────┘
                                             │
                          ┌──────────────────┴──────────────────┐
                          │                                     │
                   ┌──────▼──────┐                    ┌────────▼────────┐
                   │  Dashboard   │                    │  Feature Pages  │
                   │  (Metrics)   │                    │  (CRUD/Actions) │
                   └──────┬───────┘                    └────────┬────────┘
                          │                                     │
                ┌─────────┴─────────┐              ┌───────────┴───────────┐
                │                   │              │                       │
         ┌──────▼──────┐    ┌──────▼──────┐  ┌───▼────┐         ┌────────▼─────┐
         │ StatCards   │    │ QuickActions│  │ Tables │         │ Detail Modals│
         │ (Clickable) │    │ (Nav Links) │  │ (Data) │         │ (CRUD Forms) │
         └─────────────┘    └─────────────┘  └────────┘         └──────────────┘
                                                   │                      │
                                          ┌────────┴────────┐    ┌────────┴────────┐
                                          │                 │    │                 │
                                     ┌────▼────┐      ┌────▼────▼───┐      ┌─────▼─────┐
                                     │ Filters │      │   Actions   │      │ AI Panel  │
                                     │ Search  │      │   Buttons   │      │ Insights  │
                                     └─────────┘      └─────────────┘      └───────────┘
```

---

## 📦 Estructura de Datos (KV Store)

```
useKV Store:
├─ superadmin-stats
│  └─ { activeUsers, activeHosts, revenue, complaints, ... }
│
├─ superadmin-users
│  └─ [{ id, email, name, role, status, trustScore, ... }]
│
├─ superadmin-providers
│  └─ [{ id, name, type, status, scores, documents, ... }]
│
├─ superadmin-moderation-items
│  └─ [{ id, type, content, aiScore, aiFlags, status, ... }]
│
├─ superadmin-bookings
│  └─ [{ id, code, guest, host, amount, status, dispute, ... }]
│
├─ superadmin-complaints
│  └─ [{ id, tourist, category, priority, aiClassification, ... }]
│
├─ superadmin-analytics
│  └─ { metrics, trends, predictions, ... }
│
└─ superadmin-config
   └─ { countries, commissions, policies, ... }
```

---

## 🔑 Convenciones de Nomenclatura

### Archivos
```
PascalCase:  SuperAdminDashboard.tsx
kebab-case:  superadmin-header.tsx (components)
camelCase:   types.ts, utils.ts
```

### Componentes
```
PascalCase:  SuperAdminDashboard, SuperAdminHeader
Props:       SuperAdminDashboardProps
```

### Variables
```
camelCase:   selectedItem, showDialog
Constants:   MOBILE_BREAKPOINT, API_URL
Types:       SuperAdminStats, ModerationItem
```

### CSS Classes
```
Tailwind:    bg-primary text-foreground
Custom:      hover-lift glass-card
```

---

## 🎯 Checklist de Testing

### ✅ Funcionalidad Core
- [ ] Login exitoso como SuperAdmin
- [ ] Dashboard carga con todas las métricas
- [ ] Navegación a todos los 8 módulos
- [ ] Búsqueda funciona en tiempo real
- [ ] Filtros actualizan resultados
- [ ] Modals abren y cierran correctamente

### ✅ Moderación de Contenido
- [ ] Lista de contenido pendiente se muestra
- [ ] Análisis IA muestra score y flags
- [ ] Re-analizar con IA funciona
- [ ] Aprobar contenido actualiza estado
- [ ] Rechazar contenido requiere notas
- [ ] Historial de moderaciones persiste

### ✅ Gestión de Reservas
- [ ] Lista de reservas con todos los estados
- [ ] Detalle muestra información completa
- [ ] Cancelación requiere autorización
- [ ] Reembolso valida monto correcto
- [ ] Notas administrativas se guardan
- [ ] Disputas se muestran destacadas

### ✅ Seguridad
- [ ] 2FA requerido para acciones destructivas
- [ ] Contraseña incorrecta rechaza acción
- [ ] Notas obligatorias para rechazos
- [ ] Validaciones previenen errores
- [ ] Auditoría registra todas las acciones

### ✅ UI/UX
- [ ] Animaciones suaves y no distractoras
- [ ] Toasts aparecen para todas las acciones
- [ ] Loading states visibles durante async
- [ ] Responsive en móvil/tablet/desktop
- [ ] Badges usan colores correctos
- [ ] Tipografía legible y jerárquica

### ✅ Datos
- [ ] Datos persisten entre recargas
- [ ] useKV funciona correctamente
- [ ] Updates son reactivos
- [ ] Seed data se carga inicialmente
- [ ] Filtros no mutan datos originales

---

## 🚀 Comandos Rápidos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📚 Recursos de Referencia

### Documentación
- [PRD Completo](./ADMIN_MODULES_COMPLETE_PRD.md)
- [Guía de Implementación](./IMPLEMENTACION_FINAL.md)
- [Referencia de Componentes](./SUPERADMIN_COMPONENTS.md)
- [PRD Original](./SUPERADMIN_PRD.md)

### Tecnologías
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Phosphor Icons](https://phosphoricons.com)
- [Framer Motion](https://www.framer.com/motion)

---

**🎉 Sistema SuperAdmin Completado**
*Mapa actualizado: Enero 2025*
