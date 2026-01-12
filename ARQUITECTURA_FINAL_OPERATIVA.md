# 🌐 ARQUITECTURA GLOBAL FINAL – SENDAI S.A.S.

## 🎯 PRINCIPIOS OBLIGATORIOS (GLOBAL)

## 🎯 PRINCIPIOS OBLIGATORIOS (GLOBAL)

### ⚡ Rendimiento (Core)
- **React + Vite** (optimizado para runtime Spark)
- **CDN Optimizations** automáticas
**Objetivo**: LCP < 1.5s | TTI < 2s | CLS
### 📱 UX / UI
- Diseño por bloques (cards)
- Skeleton loaders

### 🔍 SEO Técnico Avanzado

/colombia/nari
/experiencias/cafe
```
#### Metadata Dinámica:
- Schema.org: Tour
- Sitemap automático por categoría




- Explorar
- E
- Gastronomía

- **Turistas**: `I
- **Avatar/Me
**F


Detecta rol automáticamente y rediri
- `host` → /host/dashboard
- `admin_country` → /admin/count



|-----|--------|---------------

| Admin País | 

- **Supabase Auth** con Google O

- Rate limiting en APIs

- Botón visibl
- Limpia estad
- Muestra to
## 🧠 CONEXIÓ
### Estado

  preferences: { country, language, 
  aiScore: { interests, budget, travelStyle }
```
### Flujo Ejemplo Inteligente:

IA sugiere transporte + experiencia
CTA único: "Reservar todo" (paquete
Login modal si no autenticado
Retorna exactamente al punto previo

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

/transporte

/atracciones
```
### Motor de Listados:
- Filtros instantáneo
- Orden dinámico por IA
### Card de Alojamiento Muestra:
- 🏷️ Nombre

- 🟢 Badge "✔ Verificado por SEND

- 🟢 **D
- ⚫ **Cerrado**: Temporalme
## ✅ VERIFICACIÓN "VERIFICADO POR SENDAI"
### Requisitos para Badge Verde:
2. ✔ Fotos mínimas (calidad validada por IA)
4. ✔ Contrato firmado digitalmente

```
```
**Tooltip**: "Este servicio ha 
## 💰 LÓGICA DE PRECIO, IVA
### Cálcu
Pre

IVA 19%:                $19




- Generada al confirmar reserva
- Cumple normativa colombiana (DIAN)
## 🔄 REVERSAS Y CANCELACIONES
### Políticas Configurables:
| Política | Tiempo antes | Reembolso |
| Flexible | ≥ 72h | 100% |
| Estricta | < 48h | 0% |

```

### Protección SENDAI:
- Cláusulas c
- SENDAI NO asume pérdidas ajenas
## 🧠 CROSS-SELL INTELIGENTE
### Ejemplo:
Turista ve: Casa Campestre en Buesaco
IA sugiere automáticamente:
  

    ↓
```

- ↑ Ticket promedio


- U
- Meta descri
  - `Lod
  - `LocalBusines
- Sitemap



- Vite build 
- Cache inte
- Búsqueda c


- CLS: < 0.1 ✅
## 🛡️ CONTROL TOTAL SUPERADMIN
### Capacidades:
- ✅ Ocultar publicaciones
- ✅ Auditar cambios

- ✅ Configurar por país
**Todo queda registrado en logs inmut
## 🔐 DOCUME
### Sistema de Fir
1. **Contrato de In
3. **Políticas de C

```


- Cumple Ley 527 de 1999 (Colombia)
- Timestamping confiable


- Usuarios activos (por rol y país)

- Score de riesgo por anfitrión
- Tendencias estacio
### Predictivos con IA:
- Precios óptimos sugeridos
- Oportunidades de expansión
## 🚀 FASES DE IMPLEMENTACIÓN

- ✅ Base de
- ✅
### Fase 2 - Operación (Se
- ✅

### Fase 3 - Inteligencia (Semanas 5-6):

- ✅ Precios dinámicos

- ✅ Sistema de quejas
- ✅
## 🌟 DIFERENCIADORES CLAVE DE S
1. **IA Transversal**: No es decorativa, es el motor d
3. **Multi-Servicio**:
5. **SEO Avanzado**: Miles de pá
7. **Cross-Sell Inteligente**: 


- C

- Mobile-first o
### Componentes:
- Skeleton loaders

- Phosphor Icons consist
### Interacciones:
- Estados de loading claros
- Deshacer cuando sea posible

### Turistas:



- Incremento de ocupación > 15%
### Plataforma:
- Core Web Vitals todos en 
- Score de seguridad > 95%
---
## 🏁 ESTADO FINAL: READY FOR PRO

- ✅ Operar en múltipl
- ✅
- ✅ Generar revenue desde día 1












































































































































































































