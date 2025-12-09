import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Church, Mountains, Camera, ForkKnife, Confetti, Users } from '@phosphor-icons/react'

interface TurismosPastoProps {
  onNavigate: (page: PageRoute) => void
}

export function TurismosPasto({ onNavigate }: TurismosPastoProps) {
  return (
    <ContentPage
      title="Turismo en Pasto"
      subtitle="Descubre la capital de Nariño, ciudad de arte, cultura y tradiciones ancestrales. Conocida como la Ciudad Sorpresa de Colombia"
      heroGradient="from-primary via-accent to-secondary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Atractivos Principales',
          content: 'Pasto es una ciudad llena de sorpresas, donde la tradición se mezcla con la modernidad. Famosa por su Carnaval de Negros y Blancos, declarado Patrimonio de la Humanidad por la UNESCO.',
          cards: [
            {
              title: 'Carnaval de Negros y Blancos',
              description: 'Del 2 al 7 de enero, el carnaval más grande del sur de Colombia. Desfiles de carrozas, comparsas y la tradición del día de blancos y negros.',
              icon: <Confetti size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Centro Histórico',
              description: 'Arquitectura colonial, iglesias centenarias, museos y la Plaza de Nariño. Recorre las calles empedradas llenas de historia.',
              icon: <Church size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Laguna de La Cocha',
              description: 'A 27 km de Pasto, la laguna andina más grande de Colombia. Isla de La Corota, reserva natural y paisajes de montaña únicos.',
              icon: <Mountains size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Gastronomía Pastusa',
              description: 'Cuy asado, empanadas de pipián, hornado, champús, helados de paila y el famoso café de Nariño. Sabores únicos del sur.',
              icon: <ForkKnife size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Santuario de Las Lajas',
              description: 'A 1 hora de Pasto, una de las iglesias más hermosas del mundo. Construida sobre un cañón, es un lugar de peregrinación.',
              icon: <Church size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Artesanías de Barniz de Pasto',
              description: 'Técnica única en el mundo, patrimonio inmaterial de Colombia. Visita talleres y aprende sobre este arte milenario.',
              icon: <Camera size={40} className="text-secondary" weight="bold" />
            }
          ]
        },
        {
          title: 'Qué Hacer en Pasto',
          content: `**Visitar la Catedral**: Basílica de Nuestra Señora de Las Mercedes, joya arquitectónica del centro
**Museo del Oro Nariño**: Colección de piezas precolombinas de culturas Quimbaya y Tumaco
**Plaza del Carnaval**: Epicentro de la cultura pastusa, con monumentos y esculturas
**Calle de Botaneros**: Probar empanadas, tamales y comida típica en puestos tradicionales
**Teleférico**: Subir al cerro de Bordones para vista panorámica de la ciudad
**Mercado de Bomboná**: Comprar artesanías, textiles y productos locales auténticos
**Teatro Imperial**: Edificio histórico con programación cultural y presentaciones
**Parques temáticos**: Santiago de las Atalayas, Chapalito, y espacios verdes urbanos`
        },
        {
          title: 'Alrededores de Pasto',
          content: `**Volcán Galeras**: Volcán activo vigilado, caminatas con guía autorizado hasta miradores seguros
**Santuario de Fauna y Flora Galeras**: Reserva natural con páramos, lagunas y senderos ecológicos
**Pueblo de Sandoná**: Famoso por sombreros artesanales tejidos a mano, a 40 minutos
**La Florida y Chachagüí**: Pueblos tradicionales con gastronomía y cultura pastusa
**Volcán Azufral y Laguna Verde**: Laguna de color turquesa en cráter del volcán, trekking de día completo
**Reserva Natural La Planada**: Bosque de niebla con biodiversidad única, para observación de aves
**Túquerres**: Pueblo ganadero con clima cálido, ideal para paseos de un día
**Ipiales y Las Lajas**: Ciudad fronteriza con Ecuador, famosa por el santuario más bello de Colombia`
        },
        {
          title: 'Información Práctica',
          content: `✓ **Clima**: Templado-frío (8-17°C), lleva ropa abrigada especialmente por las noches
✓ **Altitud**: 2,527 metros sobre el nivel del mar, tómate el primer día con calma
✓ **Cómo llegar**: Aeropuerto Antonio Nariño con vuelos desde Bogotá y Cali, o buses desde Ecuador
✓ **Mejor época**: Enero para el Carnaval, junio-agosto para clima seco y actividades al aire libre
✓ **Moneda**: Peso colombiano (COP), cajeros disponibles en el centro y centros comerciales
✓ **Transporte**: Buses urbanos, taxis y plataformas como Uber e InDriver
✓ **Seguridad**: Ciudad tranquila, ten precaución normal en lugares concurridos
✓ **Idioma**: Español con acento pastuso característico, la gente es muy amable y servicial`
        }
      ]}
      callToAction={{
        title: 'Explora Pasto y Nariño',
        description: 'Descubre más sobre esta región única en el sur de Colombia',
        buttons: [
          { label: 'Tours en Nariño', route: 'tours-narino' },
          { label: 'Lugares Imperdibles', route: 'lugares-imperdibles-narino' },
          { label: 'Crear Itinerario', route: 'itinerario', variant: 'outline' }
        ]
      }}
    />
  )
}
