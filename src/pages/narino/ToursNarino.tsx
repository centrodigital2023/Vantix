import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Compass, MapTrifold, Backpack, Camera, Mountains, TreePalm } from '@phosphor-icons/react'

interface ToursNarinoProps {
  onNavigate: (page: PageRoute) => void
}

export function ToursNarino({ onNavigate }: ToursNarinoProps) {
  return (
    <ContentPage
      title="Tours en Nariño"
      subtitle="Experiencias únicas en el departamento de Nariño. Desde volcanes hasta playas del Pacífico, cada tour es una aventura inolvidable"
      heroGradient="from-secondary via-primary to-turquoise"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Tours Destacados',
          content: 'Nariño ofrece una diversidad geográfica impresionante: montañas andinas, volcanes, páramos, selva pacífica y playas vírgenes. Experiencias guiadas por expertos locales.',
          cards: [
            {
              title: 'Tour Santuario de Las Lajas',
              description: 'Día completo: Transporte, guía, entrada al santuario, almuerzo típico. Uno de los lugares más bellos de Colombia.',
              icon: <Camera size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Volcán Galeras y Páramo',
              description: 'Trekking moderado con guía especializado. Incluye permisos, seguro, refrigerios y transporte desde Pasto.',
              icon: <Mountains size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Laguna de La Cocha e Isla Corota',
              description: 'Paseo en lancha, visita a la reserva natural, trucha fresca y paisajes de montaña. Tour de medio día o día completo.',
              icon: <Compass size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Ruta del Carnaval',
              description: 'City tour por Pasto, museos del carnaval, talleres de artesanos, gastronomía local. Disponible todo el año.',
              icon: <MapTrifold size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Aventura en Tumaco',
              description: 'Playas del Pacífico: Bocagrande, Morro Azul, cultura afro, gastronomía de mar. Tour 2-3 días con alojamiento.',
              icon: <TreePalm size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Ruta del Volcán Azufral',
              description: 'Trekking avanzado a la Laguna Verde. Incluye guía, transporte 4x4, equipo, alimentación y permisos.',
              icon: <Backpack size={40} className="text-secondary" weight="bold" />
            }
          ]
        },
        {
          title: 'Tours por Categoría',
          content: `**Aventura Extrema**
• Parapente en Pasto desde cerro Bordones
• Rafting en río Guáitara
• Escalada en roca en Sandoná
• Ciclomontañismo en rutas andinas

**Naturaleza y Ecoturismo**
• Observación de aves en La Planada (300+ especies)
• Caminatas por bosque de niebla
• Avistamiento de osos de anteojos en páramos
• Fotografía de paisajes volcánicos

**Cultura e Historia**
• Ruta de iglesias coloniales de Nariño
• Talleres de barniz de Pasto con artesanos
• Visita a comunidades indígenas Pastos y Quillacingas
• Tour gastronómico por el sur colombiano

**Playas y Costa Pacífica**
• Tumaco: playas, manglares, avistamiento de ballenas (julio-octubre)
• Isla del Morro: santuario de aves marinas
• Pesca deportiva y buceo en el Pacífico
• Experiencia de cultura afrocolombiana`
        },
        {
          title: 'Información de Tours',
          content: `✓ **Incluye**: Transporte, guía certificado, seguros, entradas, refrigerios
✓ **Grupos**: Pequeños (máximo 12 personas) para experiencia personalizada
✓ **Idiomas**: Español, inglés disponible en tours seleccionados
✓ **Reserva**: Mínimo 48 horas de anticipación, pago seguro online
✓ **Equipo**: Proporcionado según el tour (cascos, chalecos, bastones)
✓ **Fotografía**: Servicio profesional opcional en tours destacados
✓ **Accesibilidad**: Consulta por tours adaptados a diferentes condiciones físicas
✓ **Cancelación**: Política flexible, reembolso 100% hasta 24h antes`
        },
        {
          title: 'Tours de Múltiples Días',
          content: `**Tour Nariño Completo (5 días/4 noches)**
Día 1: Pasto - City tour y Carnaval
Día 2: Santuario de Las Lajas e Ipiales
Día 3: Laguna de La Cocha y pueblos andinos
Día 4: Volcán Galeras y reserva natural
Día 5: Artesanías y mercado local
*Incluye alojamiento, comidas, transporte y guías*

**Aventura Volcanes de Nariño (3 días/2 noches)**
Volcán Galeras + Volcán Azufral + Laguna Verde
Trekking, camping, fotografía de paisajes
*Para aventureros experimentados*

**Costa Pacífica (4 días/3 noches)**
Tumaco - Playas - Cultura afro - Gastronomía
Incluye transporte aéreo o terrestre desde Pasto`
        }
      ]}
      callToAction={{
        title: 'Reserva tu Tour en Nariño',
        description: 'Vive experiencias únicas en el sur de Colombia con guías expertos',
        buttons: [
          { label: 'Ver Todos los Tours', route: 'tours' },
          { label: 'Lugares Imperdibles', route: 'lugares-imperdibles-narino' },
          { label: 'Contactar', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
