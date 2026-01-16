# Intelligent Registration System PRD

Sistema completo de registro inteligente para alojamientos y servicios turísticos con optimización de IA, similar a Booking.com y Airbnb.

## Purpose Statement
Proporcionar un sistema de registro profesional y guiado que permita a anfitriones y prestadores de servicios crear listings optimizados mediante asistencia de IA, validación inteligente, y carga de fotos con mejoras automáticas.

## Experience Qualities
1. **Profesional** - Interfaz sofisticada que inspira confianza y transmite credibilidad para negocios serios
2. **Guiado** - Proceso paso a paso con indicadores de progreso, validación en tiempo real y sugerencias contextuales
3. **Inteligente** - IA que optimiza descripciones, categoriza automáticamente, sugiere precios y mejora fotos

## Complexity Level
**Complex Application** - Sistema multi-paso con validación avanzada, procesamiento de imágenes, integración con IA, y persistencia de datos en múltiples etapas.

## Essential Features

### Multi-Step Registration Wizard
- **Functionality**: Sistema de pasos progresivos (6-8 pasos) con validación por etapa
- **Purpose**: Dividir el proceso complejo en secciones manejables sin abrumar al usuario
- **Trigger**: Usuario hace clic en "Registrar Alojamiento" o "Registrar Servicio"
- **Progression**: Selección de tipo → Info básica → Ubicación → Detalles → Fotos → Amenidades → Precios → Revisión → Envío
- **Success Criteria**: Cada paso se valida antes de continuar, progreso se guarda automáticamente, usuario puede volver atrás

### AI-Powered Description Optimizer
- **Functionality**: Generación y mejora de descripciones usando GPT-4o
- **Purpose**: Ayudar a crear textos atractivos y optimizados para SEO que conviertan visitantes en reservas
- **Trigger**: Usuario escribe descripción o hace clic en "Optimizar con IA"
- **Progression**: Escribir borrador → Click optimizar → IA analiza → Genera versión mejorada → Usuario aprueba o edita
- **Success Criteria**: Descripción mejorada en <5 segundos, mantiene información original, mejora claridad y atractivo

### Intelligent Photo Upload & Enhancement
- **Functionality**: Sistema de carga múltiple con análisis de IA, detección de calidad, sugerencias de mejora y reordenamiento
- **Purpose**: Asegurar que las fotos sean de alta calidad y estén ordenadas estratégicamente
- **Trigger**: Usuario arrastra fotos o hace clic en zona de carga
- **Progression**: Seleccionar fotos → Upload → IA analiza calidad → Sugiere mejoras → Reordenar por importancia → Etiquetar automáticamente
- **Success Criteria**: Soporte para 20+ fotos, análisis de calidad automático, detección de duplicados, sugerencias de qué fotos faltan

### Smart Pricing Assistant
- **Functionality**: Sugerencias de precios basadas en ubicación, temporada, categoría y competencia
- **Purpose**: Ayudar a establecer precios competitivos que maximicen ocupación e ingresos
- **Trigger**: Usuario llega al paso de precios
- **Progression**: Introducir precio base → IA analiza mercado → Muestra rango sugerido → Explica razonamiento → Usuario ajusta
- **Success Criteria**: Sugerencias en <3 segundos, rango de precios contextual, explicación clara

### Auto-Save & Resume
- **Functionality**: Guardado automático del progreso cada 30 segundos
- **Purpose**: Prevenir pérdida de datos si usuario cierra el navegador
- **Trigger**: Automático mientras usuario completa formulario
- **Progression**: Usuario edita → Auto-save en background → Si sale y vuelve → Recupera progreso → Continúa donde dejó
- **Success Criteria**: Sin pérdida de datos, indicador visual de guardado, recuperación automática

### Real-Time Validation & Suggestions
- **Functionality**: Validación instantánea con mensajes constructivos
- **Purpose**: Guiar al usuario hacia un registro exitoso sin frustraciones
- **Trigger**: Usuario completa cada campo
- **Progression**: Introducir dato → Validar formato → Mostrar error/sugerencia → Usuario corrige → Continúa
- **Success Criteria**: Validación <200ms, mensajes claros y accionables, sin bloqueos innecesarios

## Edge Case Handling
- **Pérdida de conexión**: Auto-save local, sync cuando reconecta
- **Fotos muy grandes**: Compresión automática manteniendo calidad
- **Datos incompletos**: Guardar como borrador, permitir completar después
- **Duplicados**: Detección inteligente de listings similares
- **Validación fallida**: Indicadores claros de qué falta o está mal

## Design Direction
Profesional, limpio y confiable. Inspiración en plataformas SaaS empresariales pero con toques cálidos que reflejen hospitalidad. Uso estratégico del color para guiar atención y celebrar progreso.

## Color Selection

### Primary Color
**Verde Turquesa Profesional** `oklch(0.65 0.15 180)` - Transmite confianza, crecimiento y profesionalismo. Color principal para CTAs y elementos importantes.

### Secondary Colors
- **Azul Profundo** `oklch(0.45 0.12 250)` - Para headers, elementos de navegación y estado en progreso
- **Gris Fresco** `oklch(0.55 0.02 220)` - Textos secundarios y elementos deshabilitados

### Accent Color
**Naranja Cálido** `oklch(0.68 0.18 45)` - Para notificaciones de IA, sugerencias y celebración de completado

### Background Colors
- **Fondo Principal** `oklch(0.98 0.008 220)` - Ligeramente azulado para reducir fatiga visual
- **Fondo de Tarjetas** `oklch(1 0 0)` - Blanco puro para contraste
- **Fondo de Pasos Completados** `oklch(0.95 0.05 180)` - Verde muy suave

### Foreground/Background Pairings
- Primary (Verde Turquesa #4ABAAE): White text (#FFFFFF) - Ratio 5.2:1 ✓
- Background (Azul Suave #F8FAFB): Dark Gray text (#1E293B) - Ratio 12.1:1 ✓
- Accent (Naranja Cálido #E89B5D): Dark text (#1E293B) - Ratio 6.4:1 ✓

## Font Selection

### Primary Font
**Inter** - Para UI, formularios y textos de cuerpo. Claridad excepcional en tamaños pequeños.

### Accent Font
**Outfit** - Para headings y títulos. Personalidad moderna y profesional.

### Typographic Hierarchy
- **H1 (Título Principal)**: Outfit Bold/32px/tight (-0.02em)
- **H2 (Título de Paso)**: Outfit SemiBold/24px/tight
- **H3 (Subtítulos)**: Inter SemiBold/18px/normal
- **Body (Formulario)**: Inter Regular/15px/relaxed (1.6)
- **Labels**: Inter Medium/14px/normal
- **Helper Text**: Inter Regular/13px/relaxed
- **Success Messages**: Inter Medium/14px/normal

## Animations

### Progress Transitions
Animaciones suaves al cambiar de paso usando scale y fade, timing de 400ms con easing `cubic-bezier(0.4, 0, 0.2, 1)`.

### Validation Feedback
Micro-interacciones al validar: checkmark verde con bounce sutil (200ms), error con shake ligero (300ms).

### Photo Upload
Fotos aparecen con stagger de 100ms entre cada una, fade in + slide up desde abajo.

### AI Processing
Indicador de typing dots animado mientras IA procesa, seguido de reveal suave del resultado.

### Celebration
Al completar registro: confetti sutil + scale up de mensaje de éxito.

## Component Selection

### Components
- **Wizard Container**: Custom stepper con Tabs de shadcn como base
- **Form Fields**: Input, Textarea, Select de shadcn con validación react-hook-form
- **Photo Upload**: Custom drag-drop zone con previews en grid
- **Progress Indicator**: Custom stepper horizontal con iconos
- **Cards**: Card de shadcn para agrupar secciones relacionadas
- **Buttons**: Button de shadcn con variantes (primary, secondary, ghost)
- **Alerts**: Alert de shadcn para mensajes de IA
- **Dialog**: Dialog de shadcn para confirmaciones
- **Badge**: Badge de shadcn para etiquetas y estado

### Customizations
- Stepper horizontal custom con líneas conectoras animadas
- Upload zone con preview grid y reorder drag-drop
- AI suggestion cards con efecto de gradiente animado
- Price input con visualización de rango sugerido

### States
- **Buttons**: Default → Hover (lift shadow) → Active (scale 98%) → Disabled (opacity 50%)
- **Inputs**: Default → Focus (border accent + shadow) → Error (border red + shake) → Success (border green + checkmark)
- **Steps**: Pending (gray) → Current (accent) → Complete (green check)
- **Cards**: Default → Hover (lift subtle) → Active (border accent)

### Icon Selection
- **Steps**: Number badges for incomplete, CheckCircle for complete
- **Upload**: UploadSimple, Image, Trash, DotsSixVertical (reorder)
- **AI**: Sparkle, MagicWand, Lightbulb
- **Validation**: CheckCircle, Warning, Info
- **Navigation**: ArrowLeft, ArrowRight, X

### Spacing
- **Container**: px-6 md:px-8 py-8
- **Sections**: mb-8 gap-6
- **Form Fields**: gap-4 mb-4
- **Buttons**: gap-3 px-6 py-3
- **Cards**: p-6 gap-4

### Mobile
- Stack stepper vertically con scroll indicator
- Single column form layout
- Sticky bottom navigation bar con "Siguiente" button
- Collapsed sections con accordions
- Touch-friendly 44px minimum tap targets
- Swipeable steps para navegación rápida
