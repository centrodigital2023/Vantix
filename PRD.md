# Planning Guide

Una plataforma turística integral que conecta viajeros con experiencias auténticas en Colombia, utilizando IA para personalización y recomendaciones inteligentes.

**Experience Qualities**:
1. **Inmersivo** - La interfaz debe transportar al usuario visualmente a los destinos, con imágenes de alta calidad y transiciones fluidas que evocan la sensación de estar planeando un viaje emocionante.
2. **Inteligente** - Aprovecha IA para generar itinerarios personalizados, recomendaciones contextuales y búsquedas semánticas que anticipan las necesidades del viajero.
3. **Confiable** - Muestra información en tiempo real sobre disponibilidad, anfitriones conectados y servicios activos para generar confianza y transparencia.

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
- La aplicación incluye múltiples módulos interconectados: exploración de destinos, generación de itinerarios con IA, sistema de reservas, perfiles de usuario, panel de anfitriones, gestión de servicios, y un sistema de recomendaciones personalizado basado en preferencias del usuario.

## Essential Features

### Exploración Inteligente de Destinos
- **Functionality**: Sistema de búsqueda y exploración con tres vistas principales (Categorías, Destinos, Servicios) que muestra contenido en tiempo real con indicadores de disponibilidad. **Implementa carga ultrarrápida** con virtualización, lazy loading, y React memoization.
- **Purpose**: Permitir a los usuarios descubrir destinos y servicios de manera intuitiva, con información contextual sobre anfitriones en línea y servicios activos, con rendimiento excepcional incluso con cientos de destinos.
- **Trigger**: Usuario navega a la página Explorar desde el menú principal
- **Progression**: Carga página → Muestra skeleton placeholders inmediatamente → Carga primeras 12 cards → Muestra badges de actividad en tiempo real → Usuario selecciona tab (Categorías/Destinos/Servicios) → Sistema carga contenido optimizado con virtualización → Usuario filtra/busca → Sistema trackea preferencias → Muestra recomendaciones personalizadas → Al hacer scroll, carga progresiva de más cards
- **Success criteria**: Initial render <150ms, skeleton visible instantáneamente, primeras 12 cards <300ms, scroll a 60fps constante, lazy loading de imágenes, indicadores de tiempo real actualizan cada 30s, recomendaciones personalizadas aparecen después de 3+ interacciones

### Generador de Itinerarios con IA
- **Functionality**: Formulario conversacional que recopila preferencias del usuario y genera itinerarios detallados día por día usando GPT-4o-mini
- **Purpose**: Eliminar la fricción de planear un viaje permitiendo que la IA cree itinerarios completos con actividades, comidas y alojamientos recomendados
- **Trigger**: Usuario navega a "Itinerario" desde el menú o hero section
- **Progression**: Usuario completa formulario (categoría, región, duración, viajeros) → Click "Generar Itinerario" → Sistema construye prompt optimizado → Llama a LLM con JSON mode → Parsea respuesta → Guarda en KV storage → Muestra itinerario día por día con secciones expandibles
- **Success criteria**: Genera itinerarios en <10s, formato JSON válido 100% del tiempo, maneja errores de API gracefully, permite exportar/compartir itinerario

### Sistema de Recomendaciones Personalizadas
- **Functionality**: Tracking de interacciones del usuario para construir perfil de preferencias y mostrar contenido relevante
- **Purpose**: Mejorar la experiencia reduciendo el tiempo de búsqueda y aumentando el engagement
- **Trigger**: Automático en cada interacción (view, click, search, booking)
- **Progression**: Usuario interactúa con contenido → Hook trackea evento → Actualiza perfil en KV → Re-renderiza secciones recomendadas → Prioriza categorías favoritas en futuras visitas
- **Success criteria**: Recomendaciones aparecen después de 3 interacciones, precision del sistema mejora con uso

### Indicadores de Disponibilidad en Tiempo Real
- **Functionality**: Muestra badges y estados visuales para anfitriones/servicios en línea
- **Purpose**: Generar urgencia y confianza mostrando actividad actual en la plataforma
- **Trigger**: Automático al cargar páginas de exploración
- **Progression**: Componente monta → Hook consulta realtime sync → Filtra entidades online → Muestra contadores animados → Actualiza cada 30s
- **Success criteria**: Latencia <100ms, animaciones suaves, badges visualmente prominentes

## Edge Case Handling

- **Prompts muy largos en LLM**: El sistema limita la duración de itinerarios a 7 días máximo y simplifica el prompt para evitar errores 400 de la API
- **Datos faltantes**: Usa valores por defecto seguros (arrays vacíos, placeholders) y muestra skeletons durante carga
- **API LLM no disponible**: Muestra mensaje de error amigable con sugerencia de reintentar, no bloquea resto de la app
- **Sin datos de preferencias**: Muestra recomendaciones genéricas basadas en popularidad hasta acumular interacciones
- **Imágenes que fallan**: Implementa lazy loading con fallbacks a placeholders y detección de errores de carga optimizada con `useCallback`
- **Cards muy numerosas (100+)**: Usa virtualización con Intersection Observer para renderizar solo las visibles, carga progresiva de 12 en 12
- **Imágenes pesadas**: Lazy loading nativo del navegador (`loading="lazy"`), decodificación asíncrona (`decoding="async"`), y progressive image loading
- **Re-renders innecesarios**: React.memo() en todos los cards, useCallback en event handlers, previene renders cuando props no cambian
- **Usuario sin autenticación**: Permite explorar libremente, muestra modal de login solo al intentar reservar

## Design Direction

La interfaz debe evocar **aventura tecnológica**, combinando la calidez y autenticidad del turismo colombiano con una estética futurista y sofisticada. Los colores vibrantes del paisaje colombiano (verdes de la selva, azules del caribe, dorados de las montañas) se reinterpretan con saturación digital y efectos de luz neón. El diseño debe sentirse como una plataforma premium que utiliza tecnología de punta, pero sin perder el toque humano y emocional del viaje.

## Color Selection

Un esquema de colores oscuros con acentos vibrantes que crea una atmósfera inmersiva y moderna, donde el contenido (imágenes de destinos) es la estrella visual.

- **Primary Color**: oklch(0.65 0.25 285) - Púrpura vibrante que representa innovación tecnológica y experiencias premium, usado para CTAs principales y elementos de IA
- **Secondary Colors**: 
  - oklch(0.55 0.22 195) - Cyan tropical que evoca playas caribeñas, para elementos secundarios y badges
  - oklch(0.70 0.28 330) - Rosa-magenta energético para acentos de "urgencia" y elementos destacados
- **Accent Color**: oklch(0.70 0.28 330) - Rosa-magenta cálido usado en badges de tiempo real, indicadores de actividad y CTAs secundarios
- **Success Color**: oklch(0.62 0.20 155) - Verde esmeralda para indicadores online y confirmaciones
- **Foreground/Background Pairings**: 
  - Background (Dark Navy oklch(0.12 0.02 265)): Foreground White (oklch(0.95 0.01 265)) - Ratio 16.8:1 ✓
  - Primary (Vibrant Purple oklch(0.65 0.25 285)): White text (oklch(0.98 0.005 285)) - Ratio 5.2:1 ✓
  - Accent (Warm Magenta oklch(0.70 0.28 330)): White text (oklch(0.98 0.005 330)) - Ratio 4.9:1 ✓
  - Card (Dark Slate oklch(0.16 0.025 265)): Foreground (oklch(0.95 0.01 265)) - Ratio 14.2:1 ✓

## Font Selection

Tipografía que balancea modernidad tecnológica con legibilidad cálida, usando fuentes geométricas con personalidad distintiva.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Space Grotesk Bold / 48-60px / -3% letter spacing / line-height 1.1 - Para títulos principales con impacto visual
  - H2 (Section Headers): Outfit SemiBold / 32-40px / -2% letter spacing / line-height 1.2 - Para encabezados de sección con jerarquía clara
  - H3 (Card Titles): Outfit SemiBold / 20-24px / -1% letter spacing / line-height 1.3 - Para títulos de tarjetas y componentes
  - Body (General Text): Inter Regular / 16px / 0% letter spacing / line-height 1.6 - Para texto legible y cómodo
  - Small (Metadata): Inter Medium / 14px / 0% letter spacing / line-height 1.5 - Para etiquetas, badges y metadatos
  - Tiny (Captions): Inter Regular / 12px / 0% letter spacing / line-height 1.4 - Para información secundaria

## Animations

Las animaciones deben sentirse como transiciones cinematográficas que guían la atención sin distraer, priorizando física natural y respuesta inmediata.

- **Micro-interacciones**: Hover effects sutiles en cards (lift + shadow) con cubic-bezier(0.4, 0, 0.2, 1) a 300ms
- **Page transitions**: Fade + slide-up usando framer-motion con stagger de 50ms entre elementos
- **Loading states**: Shimmer effect en skeletons con gradiente animado, pulse suave en indicadores de actividad
- **IA generation**: Spinner + progress text que cambia cada 2s para mantener engagement durante generación
- **Success feedback**: Bounce-in animation para confirmaciones con spring physics (stiffness: 260, damping: 20)

## Component Selection

- **Components**: 
  - Tabs (Shadcn) para alternar entre Categorías/Destinos/Servicios con indicadores visuales claros
  - Card (Shadcn) como contenedor base con modificación glass-morphism (backdrop-blur + border sutil)
  - Select (Shadcn) para dropdowns del formulario de itinerario con styling personalizado
  - Button (Shadcn) con variantes custom (primary gradient, secondary outline, ghost para acciones terciarias)
  - Badge (Shadcn) para indicadores de tiempo real con dot animado y colores semánticos
  - Dialog (Shadcn) para modals de autenticación y confirmaciones
  - Skeleton (Shadcn) para loading states optimizado con shimmer effect custom
  - Toast (Sonner) para feedback de acciones con positioning bottom-right

- **Customizations**:
  - CategoryCard: Componente custom con hover effect que revela descripción, gradient overlay en imagen, icon phosphor prominente
  - OptimizedCard: Card inteligente con lazy loading de imágenes, priority loading para ATF, badge de host status integrado
  - SearchBar: Input expandible con sugerencias tipo-ahead y icono de búsqueda animado
  - RealtimeIndicator: Badge custom con dot pulsante y contador animado usando framer-motion

- **States**: 
  - Buttons: Default (gradient), Hover (brightness +10%, scale 1.02), Active (scale 0.98), Disabled (opacity 50%, no interaction)
  - Cards: Default (subtle border), Hover (lift 4px, shadow xl, border accent), Active (ring), Loading (skeleton con shimmer)
  - Inputs: Default (border muted), Focus (ring primary 2px, border primary), Error (ring destructive, helper text), Success (ring success)

- **Icon Selection**: 
  - Phosphor Icons duotone weight para mayor expresividad visual
  - Sparkle (fill) para todo lo relacionado con IA
  - MapTrifold para exploración y destinos
  - Calendar para fechas e itinerarios
  - Users para información de viajeros
  - Circle (fill, 8px) para indicadores de status online
  - TrendUp para secciones de recomendaciones
  - Storefront para destinos/alojamientos

- **Spacing**: 
  - Container padding: px-4 sm:px-6 lg:px-8
  - Section gaps: space-y-12 (3rem) para mobile, space-y-16 (4rem) para desktop
  - Card grids: gap-6 (1.5rem) consistente
  - Internal card padding: p-6 en mobile, p-8 en desktop
  - Button padding: px-6 py-3 para large, px-4 py-2 para default

- **Mobile**: 
  - Grid collapse: 4 columnas → 2 columnas → 1 columna usando grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  - Tabs: TabsList con scroll horizontal en mobile, fixed en desktop
  - Search: Full width en mobile con button dentro del input
  - Typography: Scale down 20% en mobile (text-4xl md:text-5xl)
  - Spacing: Reduce padding/gaps en 33% para mobile (py-16 md:py-24)
  - Navigation: Hamburger menu con drawer lateral en mobile
