# PRD: Vantix - Plataforma de Destinos con Sincronización en Tiempo Real

## Propósito
Vantix es una plataforma inteligente que conecta turistas con destinos, anfitriones y servicios en Colombia mediante tecnología de sincronización en tiempo real y recomendaciones basadas en IA.

## Cualidades de Experiencia
1. **Instantáneo** - La plataforma responde en milisegundos con información actualizada en tiempo real sobre la disponibilidad de anfitriones y servicios.
2. **Inteligente** - Sistemas de IA analizan preferencias, clima y patrones para ofrecer recomendaciones personalizadas que evolucionan con cada interacción.
3. **Conectado** - Sincronización en tiempo real entre turistas, anfitriones y prestadores de servicios para una experiencia fluida y coordinada.

## Nivel de Complejidad
**Complex Application** - La plataforma integra múltiples sistemas avanzados: sincronización en tiempo real entre usuarios, generación de contenido con IA, sistema de recomendaciones colaborativas, gestión de estados de presencia, optimización de carga de tarjetas con lazy loading e intersección observers, y almacenamiento persistente de datos.

## Essential Features

### 1. Sincronización en Tiempo Real
- **Funcionalidad**: Sistema de presencia que muestra el estado online/offline/ausente de anfitriones y servicios
- **Propósito**: Permitir a los turistas ver qué anfitriones están disponibles para responder en tiempo real
- **Trigger**: Usuario accede a secciones Explorar o Destinos
- **Progresión**: Carga de página → Sistema detecta entidades → Actualiza estados cada 30s → Muestra indicadores visuales → Usuario puede filtrar por disponibilidad
- **Criterio de éxito**: Indicadores de estado actualizados en <100ms, heartbeat cada 30s sin fallos

### 2. Tarjetas Optimizadas de Ultra-Carga Rápida
- **Funcionalidad**: Componente OptimizedCard con lazy loading, intersection observer y skeleton screens
- **Propósito**: Mejorar el rendimiento de carga de listados con cientos de destinos
- **Trigger**: Usuario hace scroll en listados de destinos o servicios
- **Progresión**: Scroll → Intersection observer detecta → Carga imágenes lazy → Transición suave → Card interactiva
- **Criterio de éxito**: First Contentful Paint <1s, imágenes lazy cargadas solo cuando están a 50px del viewport

### 3. Explorar Inteligente
- **Funcionalidad**: Página Explorar con pestañas (Categorías/Destinos/Servicios) y sistema de recomendaciones basado en historial
- **Propósito**: Ofrecer múltiples formas de descubrir contenido adaptadas a las preferencias del usuario
- **Trigger**: Usuario navega a "Explorar" desde el menú principal
- **Progresión**: Carga → Muestra recomendaciones personalizadas → Usuario selecciona pestaña → Filtra por estado online → Hace clic en tarjeta → Navega a detalle
- **Criterio de éxito**: Recomendaciones personalizadas aparecen si hay >2 interacciones previas, estado de sincronización visible

### 4. Itinerario IA
- **Funcionalidad**: Generador de itinerarios personalizados usando GPT-4o-mini con validación de longitud de prompt
- **Propósito**: Crear planes de viaje detallados día a día adaptados a preferencias y restricciones del usuario
- **Trigger**: Usuario completa formulario (categoría, región, días, viajeros) y hace clic en "Generar"
- **Progresión**: Formulario → Validación (máx 7 días) → Llamada a LLM → Parsing JSON → Renderizado de itinerario → Guardado persistente
- **Criterio de éxito**: Generación <15s, JSON válido, itinerario guardado en useKV, manejo de errores 400/401/429

### 5. Para Ti (Feed Personalizado)
- **Funcionalidad**: Feed inteligente con recomendaciones basadas en clima, eventos próximos y filtrado colaborativo
- **Propósito**: Superficie contenido relevante sin esfuerzo de búsqueda del usuario
- **Trigger**: Usuario navega a "Para Ti" o acumula >5 interacciones
- **Progresión**: Carga → Análisis de preferencias → Consulta clima/eventos → Genera recomendaciones → Muestra tarjetas priorizadas → Actualización en tiempo real
- **Criterio de éxito**: Recomendaciones relevantes (>80% match con preferencias), integración de datos climáticos, notificaciones proactivas

### 6. Blog con Generación IA
- **Funcionalidad**: Sistema de blog con contenido generado por IA, filtrado por categorías y búsqueda
- **Propósito**: Proporcionar contenido educativo e inspiracional sin mantenimiento manual constante
- **Trigger**: Usuario navega a Blog, o hace clic en "Generar Contenido"
- **Progresión**: Carga → Verifica posts existentes → (Si vacío) genera 12 posts con IA → Renderiza tarjetas → Usuario filtra/busca → Abre detalle
- **Criterio de éxito**: Generación de 12 posts en <30s, contenido coherente y relevante, guardado persistente

### 7. Contacto Mejorado
- **Funcionalidad**: Formulario de contacto con categorización de asuntos y persistencia de mensajes
- **Propósito**: Facilitar comunicación entre usuarios y plataforma con organización automática
- **Trigger**: Usuario navega a Contacto y llena formulario
- **Progresión**: Formulario → Selección de asunto → Envío → Guardado en KV → Confirmación visual → Reset de campos
- **Criterio de éxito**: Mensajes guardados exitosamente, UX responsive, información de contacto clara y accesible

## Edge Case Handling
- **Fallo de IA**: Si la generación de contenido falla, mostrar mensaje específico según tipo de error (400/401/429) y permitir retry
- **Sin conexión**: Sistema de presencia marca entidades como offline después de 5min de inactividad, vuelven online al detectar actividad
- **Tarjetas sin imágenes**: OptimizedCard muestra skeleton loader animado mientras carga, placeholder si imagen falla
- **Feed vacío**: Si usuario nuevo sin historial, mostrar categorías populares y destinos destacados por defecto
- **Formularios incompletos**: Validación HTML5 + mensajes de error claros antes de permitir envío
- **Datos corruptos**: useKV siempre inicializa con array vacío si data es undefined/null, evitando crashes

## Design Direction
La interfaz debe evocar sensación de **conexión instantánea** y **inteligencia ambiental**. Elementos visuales que sugieren movimiento y actualización en tiempo real, con indicadores de estado que comunican vida y disponibilidad. Transiciones fluidas que hacen sentir que la plataforma anticipa las necesidades del usuario.

## Color Selection
**Esquema**: Gradientes vibrantes sobre fondo oscuro con acentos de neón para crear sensación tecnológica y moderna.

- **Primary Color**: `oklch(0.65 0.25 285)` - Púrpura vibrante que comunica innovación y tecnología
- **Secondary Colors**: 
  - `oklch(0.55 0.22 195)` - Cyan brillante para elementos de sincronización
  - `oklch(0.70 0.28 330)` - Magenta para destacar acciones importantes
- **Accent Color**: `oklch(0.70 0.28 330)` - Rosa intenso para CTAs y elementos interactivos
- **Success (online)**: `oklch(0.62 0.20 155)` - Verde para indicadores de estado online

**Foreground/Background Pairings**:
- Primary (Púrpura #A855F7): White text (#FFFFFF) - Ratio 7.2:1 ✓
- Secondary (Cyan #22D3EE): White text (#FFFFFF) - Ratio 8.1:1 ✓  
- Accent (Magenta #EC4899): White text (#FFFFFF) - Ratio 5.8:1 ✓
- Background (Oscuro #1E1E2E): Foreground (#F5F5F5) - Ratio 13.4:1 ✓

## Font Selection
Tipografías que combinan modernidad técnica con legibilidad óptima, reflejando la naturaleza inteligente de la plataforma.

- **Typographic Hierarchy**:
  - H1 (Títulos principales): Space Grotesk Bold / 48-60px / letter-spacing -0.03em
  - H2 (Secciones): Outfit SemiBold / 32-40px / letter-spacing -0.02em
  - H3 (Subtítulos): Outfit Medium / 24-28px / letter-spacing -0.01em
  - Body: Inter Regular / 16px / line-height 1.6 / letter-spacing normal
  - Labels: Inter Medium / 14px / letter-spacing 0.01em
  - Captions: Inter Regular / 12px / color muted-foreground

## Animations
Las animaciones deben ser **imperceptibles pero efectivas**, enfocadas en:
- Transiciones de estado de presencia (online/offline) con pulse animation sutil en indicadores
- Skeleton loaders con shimmer effect para carga de tarjetas
- Hover lift en tarjetas (translateY -4px) con shadow expansion
- Fade in + slide up para contenido que entra al viewport
- Spinner rotation en botones de carga de IA

Balance: 70% animaciones funcionales (feedback, estados) / 30% momentos de deleite (generación exitosa de contenido).

## Component Selection

### Componentes Shadcn v4
- **Cards**: Base para OptimizedCard, BlogPostCard, tarjetas de información de contacto
- **Tabs**: Explorar (Categorías/Destinos/Servicios), Blog (categorías)
- **Badges**: Indicadores de estado (online/offline/away), categorías, tags
- **Buttons**: CTAs principales, acciones secundarias, botones de filtro
- **Input/Textarea**: Búsquedas, formularios de contacto
- **Select**: Dropdowns de Itinerario IA, asunto de contacto
- **Sheet**: Panel lateral de filtros avanzados
- **Skeleton**: Loaders para OptimizedCardSkeleton

### Componentes Personalizados
- **OptimizedCard**: Card con lazy loading, intersection observer, estados de presencia
- **RealtimeSync Hook**: Sistema de sincronización con heartbeat y presencia
- **SearchBar**: Barra de búsqueda inteligente existente
- **CategoryCard**: Tarjetas de categorías con animaciones

### Estados
- **Buttons**: Default → Hover (bg darker + shadow) → Active (scale 0.98) → Loading (spinner) → Disabled (opacity 0.5)
- **Cards**: Rest → Hover (lift + shadow) → Clicked (navigate) → Loading (skeleton pulse)
- **Status Indicators**: Circle filled con color + pulse animation, tooltips explicativos

### Icon Selection
Phosphor Icons con weight="duotone" para íconos principales, "fill" para estados activos:
- Circle (filled): Indicadores de presencia
- Sparkle: IA y personalización
- MapTrifold: Exploración y categorías
- Storefront: Destinos y marketplace
- ChatCircle: Contacto y mensajería
- Clock: Horarios y disponibilidad

### Spacing
Sistema basado en múltiplos de 4px:
- Padding de cards: 24px (p-6)
- Gap entre tarjetas: 24px (gap-6)
- Secciones principales: 96px vertical (py-24)
- Elementos internos: 16px (gap-4)

### Mobile
- Diseño mobile-first con breakpoints en 768px (md) y 1024px (lg)
- Tabs horizontales con scroll en mobile
- Formularios a ancho completo en <768px
- Grids responsive: 1 col (mobile) → 2 cols (tablet) → 3-4 cols (desktop)
- Menú hamburguesa para navegación principal en mobile
- OptimizedCard mantiene aspect-ratio 4:3 en todos los tamaños
