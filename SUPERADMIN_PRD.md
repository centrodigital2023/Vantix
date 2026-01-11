# PRD: Extranet SuperAdmin SendAI

*Una plataforma enterprise de administración total para turismo latinoamericano*

---

## Propósito

Crear una extranet profesional de nivel enterprise donde el equipo interno de SendAI puede administrar, moderar, analizar y proteger toda la plataforma turística, con control granular sobre usuarios, anfitriones, servicios, quejas y configuraciones del sistema a nivel multi-país.

---

## Cualidades de la Experiencia

1. **Poder y Control** — Cada función crítica está a un clic de distancia, con dashboards visuales que muestran el estado en tiempo real de toda la operación latinoamericana.

2. **Inteligencia Aumentada** — La IA actúa como copiloto constante, clasificando quejas, detectando fraudes, sugiriendo respuestas y alertando sobre patrones de riesgo antes de que escalen.

3. **Profesionalismo Enterprise** — Interfaz tipo SaaS de alto nivel (inspirado en Stripe, Notion, Linear) con diseño limpio, información densa pero legible, y flujos de trabajo optimizados.

---

## Nivel de Complejidad

**Complex Application** — Sistema multi-módulo con roles avanzados, auditoría, moderación con IA, analítica en tiempo real, gestión de múltiples países y flujos de aprobación complejos. Requiere arquitectura escalable y seguridad enterprise.

---

## Características Esenciales

### 1. Dashboard Global

**Funcionalidad**: Vista panorámica del estado de la plataforma SendAI  
**Propósito**: Permitir al superadmin tomar decisiones informadas en segundos  
**Trigger**: Al iniciar sesión o navegar a `/superadmin-dashboard`  
**Progresión**: Login → Dashboard con métricas en tiempo real → Filtros por país/tiempo → Acceso rápido a acciones críticas → Drill-down a módulos específicos  
**Criterio de Éxito**: Superadmin puede identificar problemas críticos en <5 segundos y navegar a la solución en <2 clics

### 2. Gestión Total de Usuarios

**Funcionalidad**: CRUD completo de usuarios con búsqueda avanzada, cambio de roles y estados  
**Propósito**: Proteger la plataforma de usuarios maliciosos y gestionar permisos  
**Trigger**: Click en "Gestión de Usuarios" o alerta de seguridad  
**Progresión**: Lista de usuarios → Filtros (rol/estado/ubicación) → Selección de usuario → Vista detallada → Acciones (cambiar rol, suspender, bloquear) → Confirmación → Auditoría registrada  
**Criterio de Éxito**: Suspender un usuario problemático en <30 segundos con registro completo de auditoría

### 3. Control de Anfitriones y Prestadores

**Funcionalidad**: Aprobar/rechazar registros, gestionar servicios, bloquear proveedores  
**Propósito**: Garantizar calidad y seguridad de servicios ofrecidos  
**Trigger**: Nuevo registro pendiente o queja contra proveedor  
**Progresión**: Lista de proveedores → Filtros → Selección → Vista de servicios y métricas → Aprobar/rechazar/bloquear → Notificación automática al proveedor  
**Criterio de Éxito**: Aprobar un nuevo anfitrión legítimo en <2 minutos, detectar y bloquear uno fraudulento en <5 minutos

### 4. Moderación de Contenido (IA)

**Funcionalidad**: Sistema de moderación inteligente que detecta contenido sospechoso automáticamente  
**Propósito**: Mantener integridad y confianza en el contenido publicado  
**Trigger**: Nuevo contenido publicado o alerta de IA  
**Progresión**: IA analiza contenido → Alerta si detecta anomalías → Superadmin revisa → Aprobar/rechazar/editar → Notificación y registro  
**Criterio de Éxito**: IA detecta 95%+ de contenido fraudulento, reducir tiempo de moderación en 70%

### 5. Centro de Quejas

**Funcionalidad**: Sistema completo de gestión de quejas con clasificación automática por IA  
**Propósito**: Resolver conflictos y proteger la experiencia del turista  
**Trigger**: Nueva queja reportada o queja no resuelta >48h  
**Progresión**: Queja recibida → IA clasifica y prioriza → Asignación a agente → Investigación → Generar respuesta (con ayuda IA) → Resolver → Notificar partes → Cerrar  
**Criterio de Éxito**: Quejas críticas resueltas en <24h, turista satisfecho en >85% de casos

### 6. Gestión de Reservas

**Funcionalidad**: Vista y control sobre todas las reservas, cancelaciones forzadas, reembolsos  
**Propósito**: Intervenir en disputas y casos excepcionales  
**Trigger**: Disputa reportada o solicitud de intervención  
**Progresión**: Búsqueda de reserva → Vista detallada → Análisis de pagos → Decisión → Cancelar/reembolsar → Registro con doble autorización  
**Criterio de Éxito**: Resolver disputas de pago en <48h con documentación completa

### 7. Sistema de Confianza y Sanciones

**Funcionalidad**: Puntuación de confianza automatizada con penalizaciones progresivas  
**Propósito**: Incentivar buen comportamiento y sancionar infracciones  
**Trigger**: Comportamiento negativo detectado (queja, cancelación, fraude)  
**Progresión**: Evento negativo → Sistema calcula impacto → Ajusta trust score → Alerta si score < umbral → Sugiere sanción → Superadmin confirma → Ejecuta penalización  
**Criterio de Éxito**: Reducir reincidencia en 60%, bloquear automáticamente usuarios con score <30

### 8. Configuración Global

**Funcionalidad**: Panel de configuración de parámetros del sistema  
**Propósito**: Adaptar la plataforma a diferentes países y regulaciones  
**Trigger**: Necesidad de cambio en comisiones, políticas o expansión a nuevo país  
**Progresión**: Configuración → Selección de país/parámetro → Edición → Vista previa de impacto → Confirmación con doble autorización → Aplicación gradual  
**Criterio de Éxito**: Activar nuevo país en <2 horas, cambiar políticas sin downtime

### 9. Analytics Global con IA

**Funcionalidad**: Dashboards de analítica con predicciones y alertas inteligentes  
**Propósito**: Tomar decisiones estratégicas basadas en datos  
**Trigger**: Revisión semanal o alerta de tendencia negativa  
**Progresión**: Dashboard → Filtros → Visualizaciones → Predicciones IA → Drill-down → Exportar reportes → Acciones estratégicas  
**Criterio de Éxito**: Identificar oportunidades de crecimiento, predecir crisis con 2 semanas de anticipación

### 10. Seguridad y Auditoría

**Funcionalidad**: Logs completos, 2FA, control de accesos, alertas de actividad sospechosa  
**Propósito**: Proteger datos sensibles y cumplir regulaciones  
**Trigger**: Cualquier acción crítica o acceso inusual  
**Progresión**: Acción crítica → Solicitud de 2FA → Confirmación → Ejecución → Registro inmutable en auditoría → Alerta si patrón sospechoso  
**Criterio de Éxito**: Cero brechas de seguridad, 100% de acciones críticas auditadas

---

## Manejo de Casos Extremos

**Acceso No Autorizado** — Sistema de roles estricto, 2FA obligatorio para superadmin, sesiones con timeout automático.

**Quejas Fraudulentas** — IA detecta patrones de quejas repetitivas o falsas, marca para revisión especial.

**Sobrecarga del Sistema** — Rate limiting, paginación eficiente, carga progresiva de datos.

**Eliminación Accidental** — Confirmaciones dobles en acciones destructivas, papelera con restauración en 30 días.

**Proveedor Reincidente** — Sistema de strikes automático, bloqueo permanente tras 3 infracciones graves.

---

## Dirección de Diseño

El diseño debe evocar:

- **Profesionalismo Enterprise** — Como Stripe o Linear, no como WordPress
- **Poder y Control** — El usuario se siente capaz de manejar toda la complejidad
- **Confianza en los Datos** — Números precisos, actualizaciones en tiempo real, información verificable
- **Eficiencia Operativa** — Todo está optimizado para velocidad de decisión

---

## Selección de Color

**Paleta Enterprise Profesional**

- **Primary Color (oklch(0.45 0.15 155))** — Verde azulado profesional que comunica confianza y tecnología, usado en indicadores positivos y acciones primarias.

- **Secondary Colors**:
  - Gris Oscuro (oklch(0.25 0 0)) — Textos principales, transmite seriedad
  - Gris Medio (oklch(0.5 0.02 100)) — Textos secundarios, información complementaria
  - Azul Claro (oklch(0.70 0.12 210)) — Información neutral, enlaces

- **Accent Colors**:
  - Verde (oklch(0.65 0.15 150)) — Éxito, aprobaciones, métricas positivas
  - Naranja (oklch(0.68 0.18 45)) — Advertencias, acciones pendientes
  - Rojo (oklch(0.55 0.22 30)) — Errores, bloqueos, acciones destructivas
  - Morado (oklch(0.50 0.18 300)) — IA, acciones inteligentes

- **Pairings de Contraste**:
  - Background claro (oklch(0.98 0 0)): Texto oscuro (oklch(0.25 0 0)) — Ratio 13.2:1 ✓ Excelente
  - Card blanco (oklch(1 0 0)): Texto oscuro (oklch(0.25 0 0)) — Ratio 14.5:1 ✓ Excelente
  - Primary (verde azulado): Blanco — Ratio 8.1:1 ✓ AAA
  - Rojo de error: Blanco — Ratio 5.2:1 ✓ AA
  - Badges con fondo de color: Texto oscuro en colores claros, blanco en oscuros

---

## Selección de Fuentes

**Tipografía Professional SaaS**

Las fuentes deben transmitir profesionalismo, legibilidad en pantallas largas y modernidad:

- **Display/Headers: Outfit Bold** — 600-700 weight
  - Clean, geométrica, excelente para números y métricas
  - H1 (Dashboard Title): 36px / line-height 1.2 / letter-spacing -0.02em
  - H2 (Section Title): 28px / line-height 1.3 / letter-spacing -0.01em
  - H3 (Card Title): 20px / line-height 1.4 / normal spacing

- **Body/Data: Manrope Regular/Medium** — 400-500 weight
  - Excelente legibilidad para tablas y datos densos
  - Body Regular: 16px / line-height 1.6 / normal spacing
  - Body Small: 14px / line-height 1.5 / normal spacing
  - Data Tables: 14px / line-height 1.4 / tabular-nums para alineación

- **Monospace (Logs/IDs): JetBrains Mono** — Para códigos, IDs, logs de auditoría
  - IDs/Codes: 13px / line-height 1.4

---

## Animaciones

Las animaciones deben ser **sutiles y funcionales**, nunca distractoras:

- **Micro-interacciones** — Hover en cards (lift + shadow), botones (scale 0.98), badges (subtle glow)
- **Transiciones de Estado** — Cambio de status con fade + color transition (200ms ease)
- **Carga de Datos** — Skeleton loaders en tablas, progressive disclosure
- **Notificaciones** — Toast notifications con slide-in desde arriba derecha (300ms cubic-bezier)
- **Modals** — Fade in background + scale modal (250ms ease-out)
- **Números Animados** — CountUp en métricas del dashboard para reforzar cambios
- **Alertas Críticas** — Pulse suave en alertas de seguridad (2s loop)

**Principio**: Animación que comunica estado, no que entretiene.

---

## Selección de Componentes

### Componentes Shadcn Usados:

- **Card** — Para contenedores de métricas, tablas, formularios
- **Button** — Variants: default (acciones primarias), outline (secundarias), destructive (eliminar/bloquear), ghost (navegación)
- **Badge** — Para estados (activo/suspendido), roles, prioridades
- **Table** — Para listas de usuarios, proveedores, quejas, reservas
- **Dialog** — Modals para detalles de usuario, resolución de quejas
- **Select** — Filtros, cambio de roles, asignación de agentes
- **Input** — Búsqueda, campos de formulario
- **Textarea** — Resolución de quejas, notas de auditoría
- **Tabs** — Navegación entre secciones (usuarios/proveedores/analytics)

### Customizaciones Específicas:

- **StatCard** — Card especializado con icon, valor grande, cambio porcentual y acción directa
- **ActivityFeed** — Lista cronológica de eventos del sistema con dot indicators
- **ProgressBar animado** — Para métricas comparativas (ingresos por país)
- **AIInsightCard** — Card con ícono de Sparkle para sugerencias de IA con fondo distintivo

### Iconografía (Phosphor Icons):

- Users (gestión usuarios)
- Buildings (anfitriones/proveedores)
- Warning (alertas/quejas)
- CurrencyDollar (ingresos/pagos)
- ShieldWarning (seguridad)
- ChartLine (analytics)
- Sparkle (IA)
- Clock (tiempo/historial)
- MapPin (ubicaciones)

### Espaciado:

- **Page Container**: max-w-7xl mx-auto px-4 py-8
- **Grid Gaps**: gap-6 para cards principales, gap-4 para formularios
- **Card Padding**: p-6 standard, p-4 para cards compactos
- **Section Spacing**: mb-8 entre secciones principales, mb-6 entre subsecciones

### Mobile:

- **Responsive Tables** — Scroll horizontal en móvil, vista de cards apiladas en <768px
- **Collapsible Filters** — Filtros en drawer/sheet en móvil
- **Touch Targets** — Mínimo 44px para botones críticos
- **Navigation** — Sidebar colapsable con hamburger menu
- **Dashboard Grid** — 1 col en móvil, 2 en tablet, 4 en desktop

---

## Estructura de Roles

| Rol | Permisos |
|-----|----------|
| **Superadmin** | Control total: usuarios, proveedores, configuración, analytics, seguridad |
| **Admin** | Moderación, quejas, aprobaciones de servicios (no configuración global) |
| **Anfitrión** | Gestionar solo sus propios alojamientos |
| **Prestador** | Gestionar solo sus propios servicios |
| **Turista** | Reservar, opinar, reportar quejas |

---

## Arquitectura Técnica

### Stack:
- **Frontend**: React + TypeScript + Tailwind + Shadcn v4
- **State**: useKV (persistencia Spark) + React state local
- **IA**: Spark LLM API (GPT-4o para análisis complejos, GPT-4o-mini para clasificaciones rápidas)
- **Routing**: Client-side con PageRoute types
- **Icons**: Phosphor React
- **Animation**: Framer Motion

### Módulos Core:
1. `/superadmin-dashboard` — Dashboard global
2. `/superadmin-users` — Gestión de usuarios
3. `/superadmin-providers` — Control de anfitriones/prestadores (TODO)
4. `/superadmin-moderation` — Moderación de contenido (TODO)
5. `/superadmin-complaints` — Centro de quejas
6. `/superadmin-bookings` — Gestión de reservas (TODO)
7. `/superadmin-analytics` — Analytics global (TODO)
8. `/superadmin-config` — Configuración del sistema (TODO)

### Seguridad:
- **Auth**: Verificar rol 'superadmin' antes de renderizar
- **2FA**: Requerido para acciones destructivas
- **Audit Logs**: Registrar toda acción en logs inmutables
- **Rate Limiting**: Proteger APIs de abuso
- **HTTPS Only**: Forzar conexiones seguras

---

## Roadmap de Implementación

### Fase 1 (MVP - Completado):
✅ Dashboard Global con métricas en tiempo real  
✅ Gestión de Usuarios (CRUD, cambio de roles, suspensión)  
✅ Centro de Quejas con clasificación IA y respuestas generadas  
✅ Sistema de tipos TypeScript  
✅ Integración con App.tsx  

### Fase 2 (Next):
⏳ Control de Anfitriones y Prestadores  
⏳ Moderación de Contenido con IA  
⏳ Gestión de Reservas y Pagos  

### Fase 3 (Advanced):
⏳ Analytics Global con predicciones IA  
⏳ Sistema de Confianza y Sanciones automatizado  
⏳ Configuración Global multi-país  
⏳ Auditoría y logs completos  

---

## Métricas de Éxito

- **Tiempo de Respuesta**: Quejas críticas resueltas <24h
- **Eficiencia**: Tiempo de moderación reducido 70%
- **Precisión IA**: 95%+ detección de fraude
- **Satisfacción**: >90% de turistas satisfechos con resoluciones
- **Seguridad**: Cero brechas de datos, 100% auditoría
- **Escalabilidad**: Soportar 10K+ usuarios concurrentes sin degradación

---

## Conclusión

El Superadmin Extranet de SendAI es el sistema nervioso central de la plataforma turística latinoamericana. Debe permitir control total, decisiones rápidas basadas en datos, y escalar con la expansión a múltiples países, siempre manteniendo seguridad enterprise y asistencia inteligente de IA en cada paso.
