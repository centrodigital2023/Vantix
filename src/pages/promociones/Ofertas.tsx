import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Tag, Percent, Gift, CalendarBlank, Ticket, TrendDown } from '@phosphor-icons/react'

interface OfertasProps {
  onNavigate: (page: PageRoute) => void
}

export function Ofertas({ onNavigate }: OfertasProps) {
  return (
    <ContentPage
      title="Ofertas Especiales"
      subtitle="Las mejores promociones y descuentos para tu viaje por Colombia. Ahorra sin sacrificar calidad en alojamientos, tours y experiencias"
      heroGradient="from-accent via-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Ofertas Activas',
          content: 'Aprovecha estas promociones limitadas y vive Colombia al mejor precio. Todas las ofertas incluyen los mismos servicios de calidad que nuestras tarifas regulares.',
          cards: [
            {
              title: 'Early Bird - Reserva Anticipada',
              description: 'Hasta 25% OFF reservando con 30+ días de anticipación. Alojamientos y tours en todos los destinos de Colombia.',
              icon: <CalendarBlank size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Paquetes Multi-Destino',
              description: '15% OFF combinando 3+ ciudades. Incluye transporte intermunicipal y descuento acumulativo en alojamientos.',
              icon: <Tag size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Temporada Baja',
              description: '30-40% OFF en abril-mayo y octubre-noviembre. Menos turistas, más autenticidad, mejor precio.',
              icon: <TrendDown size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Last Minute',
              description: 'Hasta 35% OFF en reservas de última hora (48-72h antes). Disponibilidad limitada, oportunidades únicas.',
              icon: <Ticket size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Estadías Largas',
              description: '20% OFF desde 7 noches, 30% OFF desde 14 noches. Ideal para nómadas digitales y viajes prolongados.',
              icon: <Percent size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Grupos y Familias',
              description: '10% OFF para 4+ personas, 15% OFF para 6+. Aplica en alojamientos y tours grupales.',
              icon: <Gift size={40} className="text-primary" weight="bold" />
            }
          ]
        },
        {
          title: 'Ofertas por Destino',
          content: `**Cartagena - Costa Caribe**
🏖️ Hoteles en Getsemaní: 30% OFF temporada baja
🎭 Tour histórico + playa + cena: Desde $89 USD (precio regular $140)
🌅 Islas del Rosario: 2x1 en tour de día completo los martes

**Medellín - Ciudad de la Eterna Primavera**
🏨 Apartamentos en El Poblado: 25% OFF estancias 5+ noches
🎨 Combo: City tour + Comuna 13 + Guatapé: $75 USD (ahorra $35)
🚁 Sobrevuelo en helicóptero: 20% OFF con código SENDAI20

**Eje Cafetero - Experiencia Cafetera**
☕ Fincas cafeteras: 2 noches + tour + cata: Desde $120 USD por persona
🌳 Valle de Cocora + Salento + Filandia: $45 USD (precio regular $65)
🏃 Actividades de aventura (canopy, rafting): 15% OFF paquetes combo

**San Andrés - Paraíso Caribeño**
✈️ Vuelo + Hotel 3 noches: Desde $299 USD todo incluido
🤿 Paquete buceo (3 inmersiones + equipo): $95 USD (ahorra $40)
🏝️ Tour 7 colores + acuario + cayo: 2x1 reservando online

**Bogotá - Capital Cultural**
🏛️ Museos + Monserrate + Zipaquirá: Pass 3 días $55 USD (valor $85)
🍴 Tour gastronómico por La Candelaria: 30% OFF grupos 4+
🏨 Hoteles en Chapinero: Hasta 40% OFF temporada baja

**Santa Marta y Tayrona**
🏕️ Camping Tayrona 2 noches + transporte: $65 USD (precio regular $95)
🏔️ Ciudad Perdida 4 días/3 noches: Desde $280 USD (incluye todo)
🐠 Snorkel + kayak + playa: Día completo $40 USD (ahorra $25)`
        },
        {
          title: 'Promociones por Temporada',
          content: `**Enero - Febrero**
• Carnaval de Barranquilla: Paquetes desde $199 USD (vuelo + hotel + entradas)
• Carnaval de Negros y Blancos Pasto: 20% OFF alojamientos
• Temporada alta playa: Reserva anticipada 3 meses antes = 15% OFF

**Marzo - Mayo** (Temporada Baja)
• 30-40% OFF hoteles en toda Colombia
• Tours con descuento adicional de 20%
• Vuelos nacionales desde $35 USD
• Mejor época para viajar económico

**Junio - Agosto** (Temporada Media-Alta)
• Avistamiento ballenas Pacífico: Tours desde $89 USD
• Caño Cristales abre: Early bird 25% OFF
• Festivales de verano: Paquetes especiales
• Descuentos para estudiantes con carnet vigente

**Septiembre - Noviembre** (Temporada Baja)
• Hoteles con 35-45% OFF en toda Colombia
• Tours privados al precio de grupales
• 2x1 en algunas experiencias gastronómicas
• Vuelos internacionales más económicos

**Diciembre** (Temporada Alta)
• Reserva antes noviembre = 20% OFF
• Paquetes Navidad y Año Nuevo desde $599 USD
• Alumbrados navideños Medellín incluidos
• Tours especiales de fin de año`
        },
        {
          title: 'Cómo Aprovechar las Ofertas',
          content: `✓ **Suscríbete al newsletter** para recibir ofertas exclusivas antes que nadie
✓ **Activa notificaciones** de tus destinos favoritos para alertas de precios
✓ **Reserva flexible**: Muchas ofertas permiten cambios sin costo extra
✓ **Paga online con tarjeta**: Descuento adicional 5% vs pago en destino
✓ **Combina ofertas**: Algunas promociones son acumulables
✓ **Programa de referidos**: Invita amigos y gana $20 USD por cada reserva
✓ **Viajero frecuente**: Acumula puntos y canjea por noches gratis
✓ **Cupones especiales**: Usa códigos promocionales en checkout

**Códigos Activos:**
• SENDAI25 = 25% OFF primera reserva
• COLOMBIA10 = $10 USD descuento en reservas $100+
• GRUPOAMIGO = 15% OFF reservas grupales
• AVENTURA20 = 20% OFF tours de aventura
• CAFETERA15 = 15% OFF alojamientos Eje Cafetero`
        },
        {
          title: 'Términos y Condiciones',
          content: `• Ofertas sujetas a disponibilidad y pueden cambiar sin previo aviso
• Descuentos no acumulables salvo indicación contraria
• Algunas ofertas tienen fechas específicas de viaje (blackout dates)
• Reservas con tarifa promocional pueden tener políticas de cancelación más restrictivas
• Precios mostrados son por persona en ocupación doble salvo indicación contraria
• Impuestos y tasas incluidos en el precio final
• Verifica detalles específicos de cada oferta antes de reservar
• Ofertas válidas para reservas en www.sendai.com.co`
        }
      ]}
      callToAction={{
        title: '¿Listo para Ahorrar en tu Viaje?',
        description: 'Busca tu destino y filtra por ofertas para encontrar las mejores oportunidades',
        buttons: [
          { label: 'Ver Destinos', route: 'destinos' },
          { label: 'Planes Fin de Semana', route: 'planes-fin-de-semana' },
          { label: 'Crear Itinerario', route: 'itinerario', variant: 'outline' }
        ]
      }}
    />
  )
}
