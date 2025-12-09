import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { House, Buildings, TreePalm, Tent, Bed, Star } from '@phosphor-icons/react'

interface AlojamientosProps {
  onNavigate: (page: PageRoute) => void
}

export function Alojamientos({ onNavigate }: AlojamientosProps) {
  return (
    <ContentPage
      title="Alojamientos en Colombia"
      subtitle="Encuentra el lugar perfecto para tu estadía. Desde hoteles boutique hasta cabañas ecológicas, tenemos opciones para todos los gustos y presupuestos"
      heroGradient="from-secondary via-accent to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Tipos de Alojamiento',
          content: 'Colombia ofrece una increíble variedad de opciones para hospedarte. Todos nuestros alojamientos están verificados y cuentan con los estándares de calidad más altos.',
          cards: [
            {
              title: 'Hoteles Boutique',
              description: 'Hoteles únicos con diseño exclusivo en el corazón de las ciudades. Servicio personalizado y atención a cada detalle.',
              icon: <Buildings size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Fincas y Haciendas',
              description: 'Vive la experiencia del campo colombiano en fincas cafeteras y haciendas tradicionales con vistas espectaculares.',
              icon: <House size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Ecolodges',
              description: 'Alojamientos sostenibles en medio de la naturaleza. Conecta con la selva, montañas o playa de forma responsable.',
              icon: <TreePalm size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Hostales',
              description: 'Opciones económicas ideales para mochileros y viajeros que buscan ambiente social y nuevas amistades.',
              icon: <Bed size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Glamping',
              description: 'Acampar con lujo. Tiendas equipadas con todas las comodidades en entornos naturales privilegiados.',
              icon: <Tent size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Hoteles de Lujo',
              description: 'Resorts y hoteles 5 estrellas con spa, gastronomía de alto nivel y servicios premium exclusivos.',
              icon: <Star size={40} className="text-accent" weight="bold" />
            }
          ]
        },
        {
          title: 'Destinos Populares',
          content: `**Cartagena**: Hoteles coloniales en el centro histórico con terrazas y piscinas
**Medellín**: Apartamentos modernos en El Poblado con vista a la ciudad
**Bogotá**: Opciones desde hostales en La Candelaria hasta hoteles de lujo en la Zona Rosa
**Eje Cafetero**: Fincas cafeteras tradicionales rodeadas de montañas verdes
**San Andrés**: Resorts frente al mar con aguas cristalinas
**Santa Marta**: Ecolodges cerca del Parque Tayrona y la Sierra Nevada
**Villa de Leyva**: Casas coloniales de piedra en pueblo patrimonio
**Guatapé**: Cabañas con vista al embalse y la piedra del Peñol`
        },
        {
          title: 'Servicios Incluidos',
          content: `✓ Wi-Fi de alta velocidad
✓ Desayuno típico colombiano
✓ Recepción 24 horas
✓ Seguridad y cámaras
✓ Servicio de limpieza diario
✓ Tours y actividades coordinadas
✓ Transporte desde aeropuerto (seleccionados)
✓ Asesoría turística personalizada
✓ Espacios de trabajo remoto
✓ Zonas comunes y cocina (hostales)`
        }
      ]}
      callToAction={{
        title: '¿Listo para Reservar tu Alojamiento?',
        description: 'Busca disponibilidad, compara precios y reserva con total seguridad',
        buttons: [
          { label: 'Buscar Alojamientos', route: 'destino-resultados' },
          { label: 'Ver Ofertas', route: 'ofertas' },
          { label: 'Crear Itinerario', route: 'itinerario', variant: 'outline' }
        ]
      }}
    />
  )
}
