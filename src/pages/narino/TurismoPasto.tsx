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
          content: `**Centro de Pasto**
• **Catedral Basílica**: Nuestra Señora de Las Mercedes, joya arquitectónica neogótica del siglo XX
• **Museo del Oro Nariño**: Colección de piezas precolombinas culturas Quimbaya y Tumaco-La Tolita
• **Plaza del Carnaval**: Epicentro cultural con monumentos, esculturas y murales alusivos
• **Calle de Botaneros**: Probar empanadas, tamales, comida típica en puestos tradicionales
• **Teatro Imperial**: Edificio histórico de 1922, programación cultural, conciertos y obras

**Miradores y Naturaleza Urbana**
• **Cerro de Bordones**: Teleférico o caminata, vista panorámica 360° de la ciudad y el Galeras
• **Parque Santiago de las Atalayas**: Zona verde con juegos, senderos y áreas deportivas
• **Parque Chapalito**: Área recreativa familiar con lagos artificiales
• **Jardín Botánico**: Flora nativa, orquídeas, plantas medicinales andinas

**Compras y Artesanías**
• **Mercado de Bomboná**: Comprar artesanías, textiles, productos locales auténticos
• **Talleres de Barniz de Pasto**: Técnica mopa-mopa, patrimonio inmaterial, visitas guiadas
• **Centro Comercial Unicentro**: Compras modernas, cine, gastronomía internacional
• **Calle 18 y Carrera 25**: Zona comercial principal, bancos, tiendas, servicios`
        },
        {
          title: 'Alrededores de Pasto - Municipios Cercanos',
          content: `**Laguna de La Cocha (27 km - 40 min)**
• Segunda laguna más grande de Colombia con 4.400 hectáreas
• Isla de La Corota: reserva natural, senderos ecológicos, biodiversidad única
• Pueblos: El Encano, Vereda El Espino, casas de madera tradicionales
• Actividades: paseos en lancha, pesca de trucha, gastronomía local, fotografía

**Santuario de Las Lajas (77 km - 1 hora)**
• Basílica neogótica construida 1916-1949 sobre cañón del río Guáitara
• Arquitectura espectacular, peregrinación religiosa, puente de 50 metros de altura
• Ipiales: ciudad fronteriza con Ecuador, comercio, gastronomía

**Volcán Galeras (9 km del centro)**
• Volcán activo 4.276 msnm, vigilado por observatorio vulcanológico
• Caminatas con guía autorizado hasta miradores seguros
• Santuario de Fauna y Flora Galeras: páramos, lagunas, frailejones

**Sandoná (40 km - 40 min)**
• Capital artesanal del sombrero pintado a mano, técnica única heredada
• Clima cálido agradable (22°C promedio), arquitectura colonial
• Talleres abiertos al público, mirador del pueblo, gastronomía

**La Florida y Chachagüí (20-30 km)**
• Pueblos tradicionales con gastronomía pastusa auténtica
• Cascadas, fincas cafeteras, naturaleza, clima templado
• Hornado, empanadas de pipián, gastronomía rural

**Túquerres (80 km - 1.5 horas)**
• Acceso al Volcán Azufral y Laguna Verde turquesa
• Pueblo ganadero, clima templado, parque principal acogedor
• Base para trekking al volcán (4-6 horas ida y vuelta)

**Cumbal (130 km - 2.5 horas)**
• Resguardo indígena Pastos, cultura ancestral viva
• Volcán Cumbal activo, lagunas de páramo, paisajes únicos
• Turismo comunitario, artesanías indígenas, medicina tradicional`
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
