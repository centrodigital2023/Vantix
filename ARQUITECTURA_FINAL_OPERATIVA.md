# 🌐 ARQUITECTURA GLOBAL FINAL – SENDAI S.A.S.

**UX intuitiva · Ultra rápida · SEO avanzada · Control por roles · IA transversal**

## 🎯 PRINCIPIOS OBLIGATORIOS (GLOBAL)

### ⚡ Rendimiento (Core)
- **React + Vite** (optimizado para runtime Spark)
- **SSR conceptual** mediante pre-rendering
- **Image Optimization** con lazy loading
- **Dynamic Imports** para code splitting
- **Preload de fuentes** críticas
- **CDN Optimizations** automáticas

**Objetivo**: LCP < 1.5s | TTI < 2s | CLS < 0.1

### 📱 UX / UI
- **Mobile First** obligatorio
- Diseño por bloques (cards)
- Navegación máx. 3 clics
- Skeleton loaders
- Feedback inmediato (toast, badges, estados)
- Animaciones sutiles con Framer Motion

### 🔍 SEO Técnico Avanzado

#### URLs Semánticas:
```
/colombia/narino/buesaco/cabanas
/destinos/pasto
/experiencias/cafe
/tours/narino
```

#### Metadata Dinámica:
- Por país, ciudad, tipo de servicio
- Schema.org: TouristDestination, LodgingBusiness, TravelAgency
- Open Graph para redes sociales
- Sitemap automático por categoría
- Robots.txt optimizado

## 🧭 HEADER GLOBAL INTELIGENTE

### Estructura:

**Izquierda**: Logo SENDAI → `/`

**Centro** (IA Navigation - orden dinámico):
- Explorar
- Alojamientos
- Experiencias
- Transporte
- Gastronomía
- Destinos

**Derecha** (Accesos diferenciados):
- **Turistas**: `Iniciar Sesión` (top right, visible)
- **Idioma** y **Moneda** selectores
- **Avatar/Menú** cuando autenticado con **Cerrar Sesión**

**Footer discreto** (bottom links):
- `Acceso Anfitriones` → /auth/host
- `Registro Prestadores` → /auth/provider
- `Acceso Administrativo` → /auth/admin (muy discreto)

### Middleware de Roles:
Detecta rol automáticamente y redirige:
- `tourist` → dashboard turista
- `host` → /host/dashboard
- `provider` → /provider/dashboard
- `admin_country` → /admin/country
- `superadmin` → /admin/super

## 🔐 AUTENTICACIÓN Y CONTROL POR ROLES

### Roles del Sistema:

| Rol | Acceso | Ubicación Registro |
|-----|--------|-------------------|
| Turista | Público + Reservas | Header (top right) |
| Anfitrión | /host/dashboard | Footer discreto |
| Prestador | /provider/dashboard | Footer discreto |
| Admin País | /admin/country | Footer muy discreto |
| SuperAdmin | /admin/super | Footer muy discreto |

### Seguridad:
- **Supabase Auth** con Google OAuth
- Email + password como alternativa
- **2FA obligatorio** para Admin y SuperAdmin
- Captcha invisible en formularios críticos
- Rate limiting en APIs
- IP logging para acciones sensibles

### 🔒 Cierre de Sesión:
- Botón visible en avatar dropdown
- Invalida Access Token y Refresh Token
- Limpia estado global (useKV)
- Redirige a `/` con confirmación
- Muestra toast "Sesión cerrada"

## 🧠 CONEXIÓN INTELIGENTE ENTRE PÁGINAS

### Estado Global (Context Provider):
```typescript
{
  user: { id, role, name, email, avatarUrl, isOwner },
  preferences: { country, language, currency },
  history: { viewed, searched, booked },
  aiScore: { interests, budget, travelStyle }
}
```

### Flujo Ejemplo Inteligente:
```
Usuario explora alojamiento
    ↓
IA sugiere transporte + experiencia cercanos
    ↓
CTA único: "Reservar todo" (paquete inteligente)
    ↓
Login modal si no autenticado
    ↓
Retorna exactamente al punto previo
    ↓
Completa reserva con 1 pago
```

## 🏡 PÁGINAS PÚBLICAS CLAVE

### 1. Home `/`
- Hero dinámico por país detectado
- Buscador IA prominente
- Categorías visuales con imágenes
- Sección confianza legal
- Testimonios
- CTA claros

### 2. Listados `/alojamientos`, `/experiencias`, etc.
- Filtros instantáneos (sin reload)
- Mapa interactivo integrado
- SEO local optimizado
- Infinite scroll indexable por Google
- Skeleton loaders suaves

### 3. Detalle `/detalle-alojamiento/:id`
- Galería optimizada (lazy)
- Precio dinámico con IA
- Reviews verificadas con badge
- CTA contextual según disponibilidad
- Recomendaciones relacionadas
- Share buttons (Open Graph)

## 🧑‍💼 ZONAS PRIVADAS

### 🏠 Panel Anfitrión `/host/dashboard`
**Módulos**:
- Dashboard (métricas en tiempo real)
- Mis Alojamientos
- Reservas (hoy, próximas, historial)
- Ingresos y Comisiones
- Documentos Legales
- IA Asistente
- Mensajes
- Reseñas
- Configuración

**IA Integrada**:
- Sugerencias de precios dinámicos
- Alertas de demanda
- Optimización de fotos
- Recomendaciones de disponibilidad

### 🧳 Panel Prestador `/provider/dashboard`
**Similar a anfitrión pero para**:
- Servicios múltiples
- Vehículos
- Tours
- Experiencias
- Transporte
- Precios y disponibilidad
- Contratos
- Analytics
- Quejas

### 🧠 SuperAdmin Extranet `/admin/super`
**Control Total**:
- KPIs globales en tiempo real
- Gestión de usuarios (todos los roles)
- Riesgo y seguridad
- Moderación IA de contenido
- Gestión por países
- Contratos y firmas digitales
- Logs inmutables
- Configuración del sistema
- Analytics predictivos

## 🦶 FOOTER INTELIGENTE

### Columnas Organizadas:

**Ayuda**:
- Contacto
- FAQ
- Centro de Seguridad
- Soporte Turista
- Cómo Reservar

**Descubre Colombia**:
- Destinos
- Tours
- Alojamientos
- Transporte
- Mapa Turístico

**Turismo Nariño / Pasto** (SEO Local):
- Turismo Pasto
- Tours Nariño
- Qué hacer en Pasto
- Lugares Imperdibles

**Experiencias**:
- Aventura
- Cultura
- Gastronomía
- Naturaleza
- Festivales

**La Empresa**:
- Sobre Nosotros
- Misión y Visión
- Por qué Elegirnos
- Testimonios

**Legal**:
- Términos
- Privacidad
- Cookies
- Reembolsos
- Cancelaciones

**Accesos Discretos** (pequeño, bottom):
- Acceso Anfitriones
- Registro Prestadores
- Acceso Administrativo

## 🔌 STACK TÉCNICO DEFINITIVO

| Capa | Tecnología |
|------|-----------|
| Frontend | React + TypeScript + Vite |
| State | useKV (Spark) + Context API |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage |
| AI | OpenAI GPT-4o (via spark.llm) |
| Maps | Google Maps API |
| Payments | Mercado Pago + Stripe |
| Analytics | GA4 + Meta Pixel |

## 📣 META PIXEL DE FACEBOOK - CONFIGURACIÓN

### Eventos a Trackear:
- `PageView` (automático)
- `ViewContent` (ver alojamiento)
- `Search` (búsqueda)
- `AddToCart` (añadir a itinerario)
- `InitiateCheckout` (iniciar reserva)
- `Purchase` (completar pago)

### Implementación en index.html:
```html
<script>
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🧠 IA TRANSVERSAL GLOBAL

### Casos de Uso IA en SENDAI:

1. **Reordena navegación** según popularidad regional
2. **Optimiza SEO dinámico** con keywords actuales
3. **Predice abandono** y muestra incentivos
4. **Sugiere CTAs** según comportamiento
5. **Detecta fraude** en registros y pagos
6. **Ajusta precios** según demanda y eventos
7. **Genera contenido** (descripciones, blog)
8. **Modera contenido** (fotos, reviews)
9. **Recomienda paquetes** inteligentes
10. **Chatbot 24/7** para soporte

### Implementación con Spark SDK:
```typescript
// Ejemplo: Generar descripción optimizada
const prompt = spark.llmPrompt`
  Genera una descripción atractiva para un alojamiento en ${ciudad}, 
  tipo ${tipo}, con estas características: ${amenidades}.
  Optimiza para SEO local y turismo en Colombia.
`;

const description = await spark.llm(prompt, 'gpt-4o-mini');
```

## 🌐 LÓGICA DE VISUALIZACIÓN Y RESERVAS

### Categorías SEO Indexables:
```
/alojamientos
/hoteles
/casas-campestres
/glamping
/transporte
/tours
/guias
/experiencias
/atracciones
/gastronomia
```

### Motor de Listados:
- Carga cientos de registros con ISR
- Filtros instantáneos (client-side)
- Mapa + cards (vista opcional)
- Orden dinámico por IA

### Card de Alojamiento Muestra:
- 📸 Foto principal optimizada (WebP)
- 🏷️ Nombre
- 📍 Ciudad + País
- ⭐ Rating promedio
- 💰 Precio "desde"
- 🟢 Badge "✔ Verificado por SENDAI"
- 🔍 CTA "Ver detalles"

### Estados de Disponibilidad:
- 🟢 **Disponible**: Puede reservarse
- 🔴 **Reservado**: Fechas ocupadas
- ⚫ **Cerrado**: Temporalmente no disponible

## ✅ VERIFICACIÓN "VERIFICADO POR SENDAI"

### Requisitos para Badge Verde:
1. ✔ Perfil completo
2. ✔ Fotos mínimas (calidad validada por IA)
3. ✔ Documentos cargados (RUT/RNT/Cámara)
4. ✔ Contrato firmado digitalmente
5. ✔ Aprobación IA + SuperAdmin

### Visual:
```
🟢 ✔ Verificado por SENDAI
```

**Tooltip**: "Este servicio ha sido validado legal y técnicamente por SENDAI S.A.S."

## 💰 LÓGICA DE PRECIO, IVA Y COMISIÓN

### Cálculo Automático (Backend):
```
Precio base anfitrión:  $100.000
Comisión SENDAI (5%):   $5.000 (no visible al turista)
──────────────────────
Subtotal:               $105.000
IVA 19%:                $19.950
──────────────────────
💳 Total turista:       $124.950
```

### Visibilidad:
- **Turista**: Solo ve precio final
- **Anfitrión**: Ve desglose completo (base, comisión, IVA, neto)

### Factura Electrónica:
- Generada al confirmar reserva
- Descargable por ambas partes
- Cumple normativa colombiana (DIAN)

## 🔄 REVERSAS Y CANCELACIONES

### Políticas Configurables:

| Política | Tiempo antes | Reembolso |
|----------|-------------|-----------|
| Flexible | ≥ 72h | 100% |
| Moderada | 48-72h | 50% |
| Estricta | < 48h | 0% |
| No-show | Día del evento | 0% |

### Flujo de Reversa:
```
Solicitud → IA evalúa política → Cálculo automático → Aprobación → Reverso → Notificación
```

### Protección SENDAI:
- Fondos en custodia (escrow)
- Cláusulas contractuales firmadas
- Logs legales inmutables
- SENDAI NO asume pérdidas ajenas

## 🧠 CROSS-SELL INTELIGENTE

### Ejemplo:
```
Turista ve: Casa Campestre en Buesaco
    ↓
IA sugiere automáticamente:
    🚐 Transporte desde Pasto
    ☕ Degustación de café local
    🥾 Caminata al Cañón de Juanambú
    ↓
CTA: "Arma tu experiencia completa"
    ↓
Reserva todo con 1 pago
```

**Beneficios**:
- ↑ Tiempo en página
- ↑ Ticket promedio
- ↑ Ingresos del anfitrión

## 🔍 SEO REAL PARA ESCALA

### Cada Registro Genera:
- URL única y semántica
- Meta título dinámico (ciudad + servicio)
- Meta descripción persuasiva
- Schema.org:
  - `LodgingBusiness`
  - `TouristAttraction`
  - `LocalBusiness`
  - `Event`
- Sitemap.xml automático
- Canonical tags

**Resultado**: Google indexa miles de páginas reales, no genéricas.

## ⚡ RENDIMIENTO Y ESCALABILIDAD

### Optimizaciones:
- Vite build optimization
- Code splitting por ruta
- Cache inteligente con useKV
- Imágenes lazy con intersection observer
- Búsqueda client-side con debounce
- Virtual scrolling para listas largas

### Core Web Vitals Target:
- LCP: < 1.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅

## 🛡️ CONTROL TOTAL SUPERADMIN

### Capacidades:
- ✅ Suspender servicios
- ✅ Ocultar publicaciones
- ✅ Revalidar documentos con IA
- ✅ Auditar cambios
- ✅ Ver logs completos
- ✅ Resolver disputas
- ✅ Gestionar comisiones
- ✅ Configurar por país

**Todo queda registrado en logs inmutables.**

## 🔐 DOCUMENTACIÓN LEGAL Y CONTRATOS

### Sistema de Firma Digital:

1. **Contrato de Intermediación** (anfitriones y prestadores)
2. **Términos y Condiciones** (turistas)
3. **Políticas de Cancelación** por servicio
4. **Acuerdos de Privacidad** (GDPR compatible)

### Flujo de Firma:
```
Lectura obligatoria → Checks legales → Firma electrónica → 
Registro IP/fecha → PDF generado → Almacenado en Supabase Storage
```

### Validez Legal:
- Cumple Ley 527 de 1999 (Colombia)
- Hash SHA-256 para integridad
- Timestamping confiable
- Trazabilidad completa

## 📊 ANALYTICS E INSIGHTS

### Métricas Clave para SuperAdmin:
- Usuarios activos (por rol y país)
- Reservas totales y tasa de conversión
- Ingresos por país y categoría
- Quejas abiertas y tiempo de resolución
- Score de riesgo por anfitrión
- Servicios más populares
- Tendencias estacionales

### Predictivos con IA:
- Demanda esperada por región
- Precios óptimos sugeridos
- Riesgo de cancelación
- Oportunidades de expansión

## 🚀 FASES DE IMPLEMENTACIÓN

### Fase 1 - Foundation (Semanas 1-2):
- ✅ Autenticación multi-rol
- ✅ Base de datos Supabase
- ✅ Páginas públicas core
- ✅ Header y footer inteligentes

### Fase 2 - Operación (Semanas 3-4):
- ✅ Panel anfitrión completo
- ✅ Panel prestador
- ✅ Sistema de reservas y pagos
- ✅ Contratos digitales

### Fase 3 - Inteligencia (Semanas 5-6):
- ✅ IA para itinerarios
- ✅ IA para recomendaciones
- ✅ IA para moderación
- ✅ Precios dinámicos

### Fase 4 - Administración (Semanas 7-8):
- ✅ SuperAdmin extranet
- ✅ Sistema de quejas
- ✅ Analytics avanzados
- ✅ Multi-país

## 🌟 DIFERENCIADORES CLAVE DE SENDAI

1. **IA Transversal**: No es decorativa, es el motor del negocio
2. **Blindaje Legal**: Contratos, firmas digitales, logs inmutables
3. **Multi-Servicio**: Alojamiento + Transporte + Experiencias + Tours
4. **Control Total**: SuperAdmin puede intervenir en tiempo real
5. **SEO Avanzado**: Miles de páginas indexables
6. **Escalabilidad**: Arquitectura multi-país desde el diseño
7. **Cross-Sell Inteligente**: Paquetes sugeridos automáticamente
8. **Verificación Rigurosa**: Badge verde solo tras múltiples validaciones

## 📌 PRINCIPIOS DE DISEÑO UX/UI

### Estética:
- Colores vibrantes de Colombia (verde esmeralda, turquesa caribe, coral)
- Tipografía moderna (Outfit + Manrope)
- Espaciado generoso
- Animaciones sutiles (< 400ms)
- Mobile-first obligatorio

### Componentes:
- Cards con hover elevation
- Skeleton loaders
- Toast notifications (Sonner)
- Dialogs modales (Shadcn)
- Badges de estado
- Phosphor Icons consistentes

### Interacciones:
- Feedback inmediato en cada acción
- Estados de loading claros
- Confirmaciones antes de acciones críticas
- Deshacer cuando sea posible

## 🎯 MÉTRICAS DE ÉXITO

### Turistas:
- Tiempo en sitio > 5 minutos
- Tasa de conversión búsqueda → reserva > 8%
- Satisfacción NPS > 50

### Anfitriones:
- Tiempo de registro < 10 minutos
- % de adopción IA recommendations > 60%
- Incremento de ocupación > 15%

### Plataforma:
- Uptime > 99.9%
- Core Web Vitals todos en verde
- Crecimiento mensual > 20%
- Score de seguridad > 95%

---

## 🏁 ESTADO FINAL: READY FOR PRODUCTION

Esta arquitectura está diseñada para:
- ✅ Escalar a millones de usuarios
- ✅ Operar en múltiples países LATAM
- ✅ Resistir auditorías legales
- ✅ Atraer inversión de VC
- ✅ Competir con Booking.com en nichos locales
- ✅ Generar revenue desde día 1
- ✅ Crecer con IA sin aumentar equipo

**SENDAI S.A.S. - Tecnología que conecta viajeros con experiencias reales, seguras y auténticas en Colombia.**
