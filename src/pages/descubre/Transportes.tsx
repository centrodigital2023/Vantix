import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Airplane, Bus, Car, Train, Boat, Bicycle } from '@phosphor-icons/react'

interface TransportesProps {
  onNavigate: (page: PageRoute) => void
}

export function Transportes({ onNavigate }: TransportesProps) {
  return (
    <ContentPage
      title="Transporte en Colombia"
      subtitle="Muévete por Colombia con seguridad y comodidad. Opciones de transporte para cada tipo de viajero y presupuesto"
      heroGradient="from-turquoise via-primary to-accent"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Medios de Transporte',
          content: 'Colombia cuenta con una red de transporte moderna y segura que conecta todas las regiones del país. Desde vuelos nacionales hasta buses de lujo y transporte ecológico.',
          cards: [
            {
              title: 'Vuelos Nacionales',
              description: 'Aerolíneas como Avianca, LATAM, Viva Air y Wingo conectan las principales ciudades. Vuelos frecuentes y seguros.',
              icon: <Airplane size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Buses Intermunicipales',
              description: 'Empresas de buses con servicios desde económico hasta ejecutivo con WiFi, aire acondicionado y snacks.',
              icon: <Bus size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Alquiler de Vehículos',
              description: 'Renta autos, motos o camionetas para explorar a tu ritmo. Disponible con o sin conductor en todas las ciudades.',
              icon: <Car size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Transporte Urbano',
              description: 'Metro, TransMilenio, MÍO, taxis y apps como Uber, Didi, Beat e InDriver en las principales ciudades.',
              icon: <Train size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Lanchas y Ferrys',
              description: 'Transporte marítimo para islas del Caribe, el Pacífico y ríos de la Amazonía. Experiencias únicas por agua.',
              icon: <Boat size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Bicicletas y E-bikes',
              description: 'Ciclovías en Bogotá, Medellín y otras ciudades. Alquiler de bicis para recorridos urbanos y cicloturismo.',
              icon: <Bicycle size={40} className="text-primary" weight="bold" />
            }
          ]
        },
        {
          title: 'Principales Rutas',
          content: `**Bogotá ↔ Medellín**: Vuelos cada hora (1h), buses ejecutivos (9h) por autopista moderna
**Bogotá ↔ Cartagena**: Vuelos frecuentes (1.5h), buses con aire (20h)
**Medellín ↔ Eje Cafetero**: Buses cada 2 horas (2-3h) por paisajes cafeteros
**Cali ↔ Popayán**: Buses cada hora (3h), ruta panorámica por montañas
**Santa Marta ↔ Parque Tayrona**: Buses y vans compartidas (1h), taxis privados disponibles
**Bogotá ↔ Villa de Leyva**: Buses directos (3h) los fines de semana
**Cartagena ↔ San Andrés**: Solo vuelos (1.5h), conexión frecuente
**Medellín ↔ Guatapé**: Buses públicos (2h), tours organizados con transporte incluido`
        },
        {
          title: 'Consejos de Transporte',
          content: `✓ **Reserva con anticipación**: Los vuelos y buses en temporada alta se agotan rápido
✓ **Apps recomendadas**: Waze para rutas, Moovit para transporte público, Rome2Rio para comparar opciones
✓ **Seguridad**: Usa taxis oficiales o apps registradas, especialmente de noche
✓ **Horarios**: Buses nocturnos son cómodos para largas distancias y ahorran hospedaje
✓ **Equipaje**: Buses permiten hasta 20kg gratis, aerolíneas low-cost cobran extra
✓ **Clima**: Ten en cuenta la temporada de lluvias para rutas de montaña
✓ **Documentos**: Lleva siempre tu identificación para viajes intermunicipales
✓ **Conectividad**: Compra un plan de datos colombiano para usar apps de transporte`
        }
      ]}
      callToAction={{
        title: 'Planifica tu Ruta',
        description: 'Crea un itinerario con todas las opciones de transporte incluidas',
        buttons: [
          { label: 'Crear Itinerario con IA', route: 'itinerario' },
          { label: 'Ver Destinos', route: 'destinos' },
          { label: 'Contactar Asesor', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
