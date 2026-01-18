# VANTIX - Manifesto de Experiencia Digital

## Misión del Manifiesto

**Cualidades de Experien



**Cualidades de Experiencia**:
1. **Urgencia Emocional** - La UI transmite que cada momento cuenta, que postergar la felicidad es el verdadero crimen
2. **Inmersión Tecnológica** - Interfaces que envuelven, datos que anticipan, experiencias que trascienden lo transaccional
3. **Manifiesto Vivo** - Cada página es un capítulo del manifiesto VANTIX: tecnología al servicio de la vida intensa

**Nivel de Complejidad**: Plataforma SaaS Compleja (multi-rol, multi-estado, alta interactividad)

## Pilares del Manifiesto VANTIX

### 1. LA FELICIDAD TIENE COORDENADAS
- **Funcionalidad**: Sistema de mapeo emocional que conecta estados de ánimo con destinos reales
- **Propósito**: Romper el paradigma de búsqueda transaccional. No buscas hoteles, buscas sentimientos.
- **Trigger**: Usuario expresa un estado emocional o deseo ("necesito desconectar", "quiero aventura")
- **Progresión**: Entrada emocional → Análisis IA → Coordenadas sugeridas → Experiencias filtradas → Reserva inspirada
- **Criterio de éxito**: >80% de usuarios reportan conexión emocional con recomendaciones; búsquedas emocionales superan búsquedas tradicionales

### 2. VIVIR ES URGENTE
- **Funcionalidad**: Contador de "tiempo de vida" que visualiza la urgencia de experiencias
- **Propósito**: Activar la toma de decisiones mediante consciencia temporal
- **Trigger**: Al cargar la página, aparece métrica personalizada de tiempo
- **Progresión**: Visualización de urgencia → Inspiración → Acción inmediata → Booking sin fricción
- **Criterio de éxito**: Reducción 40% en tiempo de decisión; incremento 60% en conversión de primera visita

### 3. TECNOLOGÍA INVISIBLE, EMOCIÓN VISIBLE
- **Funcionalidad**: IA que predice y anticipa sin mostrarse; UX que fluye sin explicarse
- **Propósito**: Complejidad técnica oculta detrás de simplicidad emocional
- **Criterio de éxito**: LCP <1.5s; FID <50ms; CLS
### 5. COMUNIDAD DE VIVIENTES
- **Propósito**: Inspirar mediante experiencias auténticas de vida intensa



- **Búsqueda Sin Rumbo**: IA ofrece "Terapia de Destinos" - pregunta
- **Conexión Lenta**: Contenido precargado, imáge







- **Secondary - Cyan Infinito**: `oklch(0.55 0.22 195)` - Representa posibilidade
- **Background - Void Negro**: `oklch(0.12 0.02 265)` - El vacío antes de la experiencia, ca

- Violet sobre Background (ratio 7.2




- **Headings**: **Outfit** - Moderna, legible, con personalidad. Para secciones y cards.


- **Card Titles** (H3)

## Animaciones - El Lengu

- **Hero Manifesto**: Typing effect (80ms/char) + glow pulse para crear tensión urgente

- **Micro-celebrations**: Confetti particles al confirmar booking, validando decisión de vivir



- **Hero**: Custom component con particle field

- **Buttons**: Gradient backgrounds, glow on hover, haptic feedback (mobile)
- **Testimonials**: Carousel con parallax effect y glassmorphic cards


   - Imágenes: `loading="lazy"` + intersection observer

2. **Image Optimization**
   - Responsive images con srcset
   - CDN delivery con compresión adaptati
3. **Code Splitting**:
   - Component-based splitting para modals/dia

   - Service worker para

5. **Critical CSS**:



- **Inputs**: Empty (subtle) → Focus (ring glow) → Typing (border accent) → Filled (check icon) →

- Phosphor Icons (duotone 
- Lightning: urgencia, acción inmediata
- MapPin: coordenadas de felicidad
- Rocket: despegue, comienzo
**Spacing System**:
- Micro: 0.5rem (8px)

- XLarge: 3rem (48px)

- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

- Bottom sheet para booking en mobile


- **Urgency Activation Rate**: % usuarios que reservan en primera sesión
- **Magic Moments**: Interacciones que generan respuesta emocional positiva
- **Manifesto Completion**: % usuarios que leen sección "Por qué VANTIX"




























3. **Code Splitting**:
   - Route-based splitting
   - Component-based splitting para modals/dialogs
   - Vendor bundles separados

4. **Caching Strategy**:
   - Service worker para assets estáticos
   - useKV para datos del usuario
   - Stale-while-revalidate para contenido

5. **Critical CSS**:
   - Inline critical path CSS
   - Defer non-critical styles
   - Purge unused Tailwind classes

**Estados de Interacción**:

- **Buttons**: Idle (gradient) → Hover (glow + scale 1.05) → Active (scale 0.98) → Success (checkmark + pulse)
- **Inputs**: Empty (subtle) → Focus (ring glow) → Typing (border accent) → Filled (check icon) → Error (shake + red)
- **Cards**: Default → Hover (lift 4px + shadow + border glow) → Selected (persistent glow + accent border)

**Iconografía**:
- Phosphor Icons (duotone weight) para depth
- Sparkle: momentos mágicos
- Lightning: urgencia, acción inmediata
- Heart: conexión emocional
- MapPin: coordenadas de felicidad
- Clock: urgencia temporal
- Rocket: despegue, comienzo

**Spacing System**:
- Base unit: 4px
- Micro: 0.5rem (8px)
- Small: 1rem (16px)
- Medium: 1.5rem (24px)
- Large: 2rem (32px)
- XLarge: 3rem (48px)
- Section: 6rem (96px)

**Mobile-First Responsive**:
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Hero text scales 60% on mobile
- Cards: 1-column mobile, 2-col tablet, 3-col desktop
- Touch targets: minimum 48px
- Bottom sheet para booking en mobile
- Gesture-friendly carousels

## KPIs del Manifiesto

- **Emotional Resonance Score**: % usuarios que completan búsqueda emocional
- **Urgency Activation Rate**: % usuarios que reservan en primera sesión
- **Time to Inspiration**: Segundos desde landing hasta engagement profundo
- **Magic Moments**: Interacciones que generan respuesta emocional positiva
- **Performance Score**: Lighthouse >95, LCP <1.5s, FID <50ms
- **Manifesto Completion**: % usuarios que leen sección "Por qué VANTIX"
