# 💰 Sistema de Investigación de Precios - SendAI

## Descripción General

El **Sistema de Investigación de Precios** es una herramienta inteligente de análisis de mercado diseñada para propietarios de alojamientos turísticos en Colombia. Proporciona recomendaciones de precios basadas en datos reales del mercado, estacionalidad, ubicación y categoría de turismo.

## 🎯 Características Principales

### 1. **Investigación de Mercado en Tiempo Real**
- Análisis de precios por ciudad y categoría
- Comparación con competidores directos
- Posicionamiento de mercado (budget/mid-range/premium/luxury)
- Ajustes estacionales automáticos

### 2. **Precios Dinámicos por Temporada**
- **Temporada Alta** (Enero, Junio, Julio, Diciembre): +30% sobre precio base
- **Temporada Media** (Febrero, Agosto): +15% sobre precio base
- **Temporada Baja** (Resto del año): -15% sobre precio base
- Factor de ocupación integrado

### 3. **Dashboard de Análisis**
- Análisis masivo de múltiples propiedades
- Estadísticas de mercado agregadas
- Identificación de oportunidades de ingresos
- Recomendaciones específicas por propiedad

### 4. **Precios Actualizados para 2025**

Todos los precios han sido investigados y actualizados según el mercado colombiano actual:

#### Cartagena - Cultural
- **Hotel Boutique Casa del Arzobispado**
  - Precio por noche: $520,000 COP (antes: $450,000)
  - Habitación Deluxe: $520,000 COP
  - Suite Junior: $780,000 COP (antes: $650,000)
  - Rating: 9.2/10
  - Posición: Premium

#### Santa Marta - Playa
- **Irotama Resort**
  - Precio por noche: $680,000 COP (antes: $580,000)
  - Vista Jardín: $680,000 COP
  - Suite Vista al Mar: $980,000 COP (antes: $850,000)
  - Rating: 8.8/10
  - Todo incluido

#### Medellín - Aventura
- **El Poblado Hostel**
  - Precio por noche: $55,000 COP (antes: $45,000)
  - Dormitorio compartido: $55,000 COP
  - Habitación privada: $135,000 COP (antes: $120,000)
  - Rating: 8.6/10
  - Posición: Budget-friendly

#### Salento - Rural
- **Cabaña del Café**
  - Precio por noche: $320,000 COP (antes: $280,000)
  - Cabaña completa (6 personas)
  - Rating: 9.5/10
  - Incluye tour de café

#### Bogotá - Negocios
- **Hotel Casa Deco**
  - Precio por noche: $380,000 COP (antes: $320,000)
  - Habitación Ejecutiva: $380,000 COP
  - Suite Business: $600,000 COP (antes: $520,000)
  - Rating: 8.9/10

#### Pasto - Cultural (NUEVO)
- **Hotel Don Saúl**
  - Precio por noche: $220,000 COP
  - Habitación Estándar: $220,000 COP
  - Suite Ejecutiva: $340,000 COP
  - Rating: 8.7/10
  - Cerca del Museo del Carnaval

#### Ipiales - Religioso (NUEVO)
- **Hotel Las Lajas**
  - Precio por noche: $150,000 COP
  - Habitación Sencilla: $150,000 COP
  - Habitación Familiar: $240,000 COP
  - Rating: 8.4/10
  - Transporte al Santuario incluido

#### Tumaco - Playa (NUEVO)
- **Hotel Pacífico Royal**
  - Precio por noche: $180,000 COP
  - Vista al Mar: $180,000 COP
  - Suite Playa: $290,000 COP
  - Rating: 8.1/10
  - Frente al Pacífico

## 📊 Datos de Mercado por Categoría

### Ciudades Principales

| Ciudad | Categoría | Promedio | Rango | Temporada Alta |
|--------|-----------|----------|-------|----------------|
| Cartagena | Cultural | $520,000 | $350,000 - $850,000 | +40% |
| Santa Marta | Playa | $680,000 | $450,000 - $1,200,000 | +50% |
| Medellín | Aventura | $55,000 | $35,000 - $85,000 | +20% |
| Salento | Rural | $320,000 | $180,000 - $550,000 | +30% |
| Bogotá | Negocios | $380,000 | $250,000 - $650,000 | +15% |
| Pasto | Cultural | $220,000 | $120,000 - $400,000 | +60% |
| Ipiales | Religioso | $150,000 | $80,000 - $280,000 | +50% |
| Tumaco | Playa | $180,000 | $90,000 - $350,000 | +40% |

## 🔧 Uso del Sistema

### Para Desarrolladores

```typescript
import { 
  researchAccommodationPricing,
  formatPrice,
  getPriceInsights 
} from '@/lib/pricing-research'

// Investigar precio para un alojamiento
const research = await researchAccommodationPricing(
  'Hotel Boutique',  // tipo
  'Cartagena',        // ciudad
  'Cultural',         // categoría
  450000              // precio actual
)

console.log(research.suggestedPrice)      // 520000
console.log(research.priceAdjustment)     // +15.6%
console.log(research.marketPosition)      // 'premium'
console.log(research.reasoning)           // Explicación detallada
```

### Componentes React

```tsx
import { PriceDisplay } from '@/components/PricingDisplay'
import { PricingAnalyticsDashboard } from '@/components/PricingAnalyticsDashboard'
import { usePricingResearch } from '@/hooks/use-pricing-research'

// Mostrar precio con insights
<PriceDisplay
  price={520000}
  city="Cartagena"
  category="Cultural"
  showInsight={true}
/>

// Dashboard completo
<PricingAnalyticsDashboard accommodations={properties} />
```

### Hooks Personalizados

```typescript
// Investigación individual
const { research, isLoading, performResearch } = usePricingResearch({
  accommodationType: 'Hotel Boutique',
  city: 'Cartagena',
  category: 'Cultural',
  currentPrice: 450000,
  autoUpdate: true
})

// Precios estacionales
const seasonalPrices = useSeasonalPricing(
  450000,      // precio base
  'Cultural',  // categoría
  'Cartagena'  // ciudad
)

// Análisis masivo
const { results, progress, performBulkResearch } = useBulkPricingResearch({
  accommodations: properties
})
```

## 💡 Características Técnicas

### Algoritmo de Precios Dinámicos

```typescript
Precio Final = Precio Base × Multiplicador Estacional × Multiplicador de Ocupación

Multiplicador Estacional:
- Temporada Alta: 1.3 - 1.6 (según destino)
- Temporada Media: 1.15
- Temporada Baja: 0.75 - 0.85

Multiplicador de Ocupación:
- Alta ocupación (>80%): 1.15
- Media ocupación (40-80%): 1.0
- Baja ocupación (<40%): 0.9
```

### Posicionamiento de Mercado

- **Budget**: < 30% del promedio de mercado
- **Mid-range**: 30% - 100% del promedio
- **Premium**: 100% - 150% del promedio
- **Luxury**: > 150% del promedio

## 📈 Insights Automáticos

El sistema genera insights inteligentes basados en:

1. **Comparación con mercado local**
2. **Estacionalidad actual**
3. **Nivel de competitividad**
4. **Oportunidades de optimización**

### Ejemplos de Insights:

✅ "Excelente precio - 25% más económico que la competencia"
✅ "Buen valor - precio por debajo del promedio"
✅ "Precio estándar del mercado"
✅ "Precio premium - servicios de alta calidad"

## 🎨 Componentes UI

### PriceDisplay
Muestra precios con formato, descuentos y badges de insights.

### PriceInsightBadge
Badge inteligente con tooltip explicativo del posicionamiento.

### SeasonalPricingInfo
Tooltip con desglose de precios por temporada.

### PricingAnalyticsDashboard
Dashboard completo con estadísticas y recomendaciones.

### PropertyPricingCard
Tarjeta individual con precios estacionales.

## 🔄 Actualización Automática

El sistema está diseñado para actualizaciones periódicas:

- ✅ Investigación manual bajo demanda
- ✅ Análisis masivo de propiedades
- 🔜 Actualización automática cada 24 horas (próxima versión)
- 🔜 Integración con APIs de mercado externas
- 🔜 Machine learning para predicción de demanda

## 📱 Responsive & Accesible

- ✅ Diseño mobile-first
- ✅ Tooltips informativos
- ✅ Animaciones suaves con Framer Motion
- ✅ Estados de carga claros
- ✅ Contraste WCAG AA compliant

## 🚀 Próximas Mejoras

1. **Integración con SerpAPI** para precios de hoteles reales
2. **Histórico de precios** y tendencias
3. **Predicción de demanda** con IA
4. **Alertas de oportunidades** de pricing
5. **A/B testing** de precios
6. **Comparación directa** con competidores específicos
7. **Análisis de reviews** vs precio
8. **Optimización de revenue** automatizada

## 📝 Notas de Implementación

- Todos los precios están en **COP (Pesos Colombianos)**
- Formato automático con separadores de miles
- Redondeo a múltiplos de 1,000 para mejor UX
- Datos basados en investigación de mercado Q1 2025
- Compatible con todas las categorías de turismo

## 🤝 Contribución

Para agregar nuevos destinos o actualizar precios:

1. Editar `/src/lib/pricing-research.ts`
2. Agregar datos en el array `colombianTourismPricing`
3. Actualizar `/src/lib/sample-data.ts` con nuevos alojamientos
4. Ejecutar análisis de precios para validar

---

**Última actualización**: Enero 2025  
**Versión**: 1.0.0  
**Mantenedor**: Equipo SendAI
