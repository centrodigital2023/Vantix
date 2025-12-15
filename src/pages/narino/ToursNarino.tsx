import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Compass, MapTrifold, Backpack, Camera, Mountains, TreePalm, Church, Coffee, Palette } from '@phosphor-icons/react'

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
          content: 'Nariño ofrece una diversidad geográfica impresionante: montañas andinas, volcanes, páramos, selva pacífica y playas vírgenes. Experiencias guiadas por expertos locales en los 64 municipios del departamento.',
          cards: [
            {
              title: 'Tour Santuario de Las Lajas - Ipiales',
              description: 'Día completo: Transporte, guía, entrada al santuario, almuerzo típico. Uno de los lugares más bellos de Colombia. Incluye frontera Rumichaca.',
              icon: <Camera size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Volcán Galeras y Páramo - Pasto',
              description: 'Trekking moderado con guía especializado. Incluye permisos, seguro, refrigerios y transporte. Vista panorámica de la ciudad.',
              icon: <Mountains size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Laguna de La Cocha e Isla Corota',
              description: 'Paseo en lancha, visita a la reserva natural, trucha fresca y paisajes de montaña. Tour de medio día o día completo.',
              icon: <Compass size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Ruta del Carnaval - Pasto',
              description: 'City tour por Pasto, museos del carnaval, talleres de artesanos, gastronomía local. Disponible todo el año.',
              icon: <MapTrifold size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Aventura en Tumaco - Costa Pacífica',
              description: 'Playas del Pacífico: Bocagrande, Morro Azul, cultura afro, gastronomía de mar. Tour 2-3 días con alojamiento.',
              icon: <TreePalm size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Volcán Azufral y Laguna Verde - Túquerres',
              description: 'Trekking avanzado a la Laguna Verde turquesa. Incluye guía, transporte 4x4, equipo, alimentación y permisos.',
              icon: <Backpack size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Ruta Artesanal - Sandoná',
              description: 'Talleres de sombreros pintados a mano, técnica única de Sandoná. Aprende el proceso artesanal y lleva tu sombrero.',
              icon: <Palette size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Cumbal - Cultura Pastos',
              description: 'Tour por el resguardo indígena, volcán Cumbal, lagunas de altura, páramos y cultura ancestral Pastos.',
              icon: <Church size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Ruta del Café Nariñense',
              description: 'Visita fincas cafeteras en La Florida, Sandoná y Consacá. Proceso del café, cata y paisajes cafeteros.',
              icon: <Coffee size={40} className="text-secondary" weight="bold" />
            }
          ]
        },
        {
          title: 'Tours por Municipios de Nariño',
          content: `**Región Centro (Pasto, Sandoná, La Cruz, Buesaco)**
• Pasto: Centro histórico, laguna La Cocha, volcán Galeras, carnaval
• Sandoná: Talleres de sombreros artesanales, clima cálido, mirador
• La Cruz: Arquitectura colonial, iglesias centenarias, gastronomía
• Buesaco: Cascadas, páramos, avistamiento de aves, fincas cafeteras

**Región Ex-Provincia de Obando (Ipiales, Túquerres, Cumbal)**
• Ipiales: Santuario Las Lajas, frontera Ecuador, comercio, laguna Verde
• Túquerres: Volcán Azufral, laguna turquesa, ganadería, clima templado
• Cumbal: Resguardo indígena Pastos, volcán Cumbal, lagunas de páramo
• Aldana: Agricultura, páramos, cultura campesina, gastronomía

**Costa Pacífica (Tumaco, Barbacoas, El Charco)**
• Tumaco: Playas vírgenes, cultura afro, gastronomía de mar, manglares
• Barbacoas: Río Telembí, selva, minería artesanal, biodiversidad
• El Charco: Playas remotas, pesca artesanal, naturaleza intacta
• Francisco Pizarro: Isla, aves marinas, ecosistemas costeros

**Ruta de los Volcanes**
• Galeras (Pasto), Azufral (Túquerres), Cumbal, Chiles (frontera)
• Trekking, páramos, lagunas de cráter, fotografía de paisajes

**Ruta Artesanal y Cultural**
• Barniz de Pasto (Mopa-mopa), sombreros de Sandoná
• Tejidos indígenas de Cumbal, cerámica de varios municipios
• Visita talleres, aprende técnicas, compra directo a artesanos`
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
          title: 'Tours de Múltiples Días - Nariño Completo',
          content: `**Gran Tour Nariño (7 días/6 noches)**
Día 1: Llegada a Pasto - City tour - Carnaval y artesanías
Día 2: Laguna de La Cocha - Isla La Corota - Pueblos andinos
Día 3: Ipiales - Santuario de Las Lajas - Frontera Ecuador
Día 4: Túquerres - Volcán Azufral - Laguna Verde (trekking)
Día 5: Sandoná - Talleres artesanales - La Cruz colonial
Día 6: Cumbal - Resguardo indígena - Volcán y lagunas
Día 7: Regreso a Pasto - Compras - Despedida
*Incluye alojamiento 3-4 estrellas, todas las comidas, transporte privado, guías*

**Aventura Volcanes de Nariño (4 días/3 noches)**
Volcán Galeras + Volcán Azufral + Lagunas de Cumbal
Trekking, camping opcional, fotografía de paisajes
*Para aventureros con buena condición física*

**Costa Pacífica Completa (5 días/4 noches)**
Tumaco - Playas - Barbacoas - Río Telembí - Cultura afro
Incluye transporte aéreo o terrestre desde Pasto
*Experiencia de selva, playa y cultura afrocolombiana*

**Ruta Cultural Indígena (3 días/2 noches)**
Cumbal - Aldana - Ipiales - Cultura Pastos
Visita resguardos, participación en rituales (con permiso)
*Experiencia de turismo comunitario responsable*`
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
