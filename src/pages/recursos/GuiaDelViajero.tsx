import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Lightbulb, Backpack, MapPin, Users, FirstAid, Wallet } from '@phosphor-icons/react'

interface GuiaDelViajeroProps {
  onNavigate: (page: PageRoute) => void
}

export function GuiaDelViajero({ onNavigate }: GuiaDelViajeroProps) {
  return (
    <ContentPage
      title="Guía del Viajero"
      subtitle="Todo lo que necesitas saber para viajar por Colombia de forma segura, económica y memorable. Consejos de expertos y viajeros experimentados"
      heroGradient="from-turquoise via-primary to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Consejos Esenciales',
          content: 'Información práctica y tips que todo viajero debe conocer antes de visitar Colombia.',
          cards: [
            {
              title: 'Antes de Viajar',
              description: 'Documentos, vacunas, seguro de viaje, mejor época del año, presupuesto estimado, reservas anticipadas.',
              icon: <Lightbulb size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Qué Empacar',
              description: 'Ropa según clima y destino, medicamentos básicos, adaptadores de corriente, protección solar, repelente.',
              icon: <Backpack size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Moverse por Colombia',
              description: 'Opciones de transporte, apps útiles, costos aproximados, tiempos de viaje entre ciudades principales.',
              icon: <MapPin size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Cultura y Costumbres',
              description: 'Etiqueta social, propinas, saludos, horarios, expresiones locales, comportamiento en lugares públicos.',
              icon: <Users size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Seguridad',
              description: 'Zonas seguras, precauciones básicas, números de emergencia, qué hacer ante imprevistos.',
              icon: <FirstAid size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Dinero y Presupuesto',
              description: 'Moneda local, casas de cambio, tarjetas vs efectivo, propinas, costos promedio de comida y transporte.',
              icon: <Wallet size={40} className="text-primary" weight="bold" />
            }
          ]
        },
        {
          title: 'Documentos y Requisitos',
          content: `**Pasaporte y Visa**
• Ciudadanos de la mayoría de países de América y Europa no requieren visa para estancias turísticas hasta 90 días
• Pasaporte vigente por al menos 6 meses
• Algunos países necesitan visa, consulta con tu embajada
• Al ingresar recibes un sello con días permitidos (máx 180 días por año)

**Vacunas**
• **Fiebre amarilla**: Obligatoria para Amazonía, Parque Tayrona, algunas zonas del Pacífico
• **Hepatitis A y B**: Recomendadas
• **Tétanos**: Actualizado
• **Fiebre tifoidea**: Para zonas rurales
• Lleva carnet de vacunación internacional

**Seguro de Viaje**
• Altamente recomendado, no obligatorio
• Cobertura mínima: USD $50,000 en gastos médicos
• Incluir evacuación, repatriación, pérdida de equipaje
• Compañías recomendadas: World Nomads, SafetyWing, Assist Card`
        },
        {
          title: 'Mejor Época para Viajar',
          content: `**Temporada Seca (Diciembre-Marzo y Julio-Agosto)**
✓ Clima estable en la mayoría del país
✓ Ideal para playa, montaña, trekking
✓ Temporada alta: precios más altos, reservar con anticipación
✓ Fiestas y carnavales (Barranquilla, Pasto, Cali)

**Temporada de Lluvias (Abril-Mayo y Octubre-Noviembre)**
✓ Menos turistas, mejores precios
✓ Paisajes verdes, cascadas con más caudal
✓ Puede llover por la tarde, mañanas despejadas
✓ Ideal para Eje Cafetero (todo el año es bueno)

**Consideraciones Especiales**
• **Caño Cristales**: Solo abierto junio-noviembre
• **Avistamiento de ballenas**: Julio-octubre en Pacífico
• **Nevados y alta montaña**: Mejor diciembre-marzo
• **Amazonía**: Evitar marzo-mayo (más lluvias)
• **Carnaval de Negros y Blancos**: 2-7 de enero en Pasto`
        },
        {
          title: 'Presupuesto Diario Estimado',
          content: `**Mochilero (USD $25-40/día)**
• Hostal: $8-15
• Comida casera/callejera: $8-12
• Transporte público: $3-5
• Actividades gratuitas/low cost: $5-8

**Viajero Medio (USD $50-100/día)**
• Hotel 3 estrellas: $30-50
• Restaurantes locales: $15-25
• Taxis/Uber: $8-15
• Tours y entradas: $20-30

**Viajero Premium (USD $150+/día)**
• Hotel boutique/4-5 estrellas: $80-150
• Restaurantes de autor: $30-50
• Transporte privado: $30-50
• Tours privados y experiencias: $50-100

**Costos Adicionales**
• Vuelo internacional: $300-800 (varía mucho)
• Vuelos nacionales: $50-150 por trayecto
• Seguro de viaje: $3-8 por día
• Souvenirs y compras: variable`
        },
        {
          title: 'Apps Imprescindibles',
          content: `**Transporte**
🚕 Uber, Didi, Beat, InDriver - Taxis seguros
🚌 Redbus, Pinbus - Buses intermunicipales
✈️ Google Flights, Skyscanner - Vuelos
🗺️ Google Maps, Waze, Maps.me - Navegación

**Alojamiento y Tours**
🏨 SendAI - Itinerarios con IA
🏠 Booking, Airbnb - Respaldo
⭐ TripAdvisor - Reseñas y tours

**Comunicación**
📱 WhatsApp - Comunicación universal en Colombia
🌍 Google Translate - Traductor offline
📞 Skype, WhatsApp calls - Llamadas internacionales

**Servicios**
💳 Revolut, Wise - Mejores tasas de cambio
💰 XE Currency - Conversor de moneda
📍 Maps.me - Mapas offline
☁️ Weather Underground - Pronóstico preciso

**Utilidades**
🔒 VPN - Seguridad en WiFi público
📷 Google Photos - Backup automático fotos
🎒 PackPoint - Lista de empaque inteligente
💊 Medihelp - Farmacias y emergencias`
        },
        {
          title: 'Seguridad y Precauciones',
          content: `**Recomendaciones Generales**
✓ Usa taxis oficiales o apps, especialmente de noche
✓ No ostentes objetos de valor en lugares concurridos
✓ Guarda copias digitales de documentos importantes
✓ Deja objetos de valor en caja fuerte del hotel
✓ Evita caminar solo/a por zonas desconocidas de noche
✓ Ten siempre cargado el celular y datos móviles
✓ Comparte tu ubicación con amigos/familia
✓ Confía en tu intuición, si algo se siente mal, aléjate

**Números de Emergencia**
🚨 Policía: 123
🚑 Ambulancia: 125
🚒 Bomberos: 119
🏥 Cruz Roja: 132
👮 Policía de Turismo: +57 321 241 1140

**Estafas Comunes (Evitar)**
⚠️ Taxis no oficiales en aeropuertos
⚠️ "Paseo millonario" (nunca aceptar bebidas de extraños)
⚠️ Cambistas callejeros con billetes falsos
⚠️ Distracciones en centro para robar mochilas
⚠️ Ofertas de tours en calle (reserva con operadores legales)`
        },
        {
          title: 'Cultura y Etiqueta',
          content: `**Saludos y Convivencia**
• Saludo común: beso en mejilla (entre mujeres y hombre-mujer), apretón de manos (entre hombres)
• Los colombianos son cálidos y amables, no temas preguntar
• Puntualidad: en negocios sí, en lo social hay más flexibilidad
• "Ahorita" puede significar "en un rato" o "nunca" 😄

**Propinas**
• Restaurantes: 10% sugerido (no obligatorio, revisa si está incluido en cuenta)
• Taxis/Uber: No se espera, pero redondear es apreciado
• Guías turísticos: 10-15% del costo del tour
• Botones hotel: $2-5 USD por maleta
• Meseros cafetería: Monedas o $1-2 USD

**Expresiones Útiles**
• "¡Qué chimba!" = ¡Qué genial! (paisa)
• "Parce/Parcero" = Amigo (común en Antioquia)
• "Vaina" = Cosa
• "Estar prendido" = Estar animado/divertido
• "Tinto" = Café negro pequeño
• "¿Qué más?" = ¿Cómo estás?

**Comportamiento**
• Vestimenta casual pero presentable
• En iglesias: hombros y rodillas cubiertos
• Fotos: Pide permiso a personas antes de fotografiar
• Regatear: Común en mercados artesanales, no en tiendas formales`
        }
      ]}
      callToAction={{
        title: 'Listo para tu Viaje a Colombia',
        description: 'Crea tu itinerario personalizado o consulta con nuestros expertos',
        buttons: [
          { label: 'Crear Itinerario IA', route: 'itinerario' },
          { label: 'Ver Destinos', route: 'destinos' },
          { label: 'Contactar Asesor', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
