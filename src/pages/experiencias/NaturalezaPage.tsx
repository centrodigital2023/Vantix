import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Tree, Bird, Mountains, Drop, Sun, Leaf } from '@phosphor-icons/react'

interface NaturalezaPageProps {
  onNavigate: (page: PageRoute) => void
}

export function NaturalezaPage({ onNavigate }: NaturalezaPageProps) {
  return (
    <ContentPage
      title="Turismo de Naturaleza"
      subtitle="Colombia es uno de los países con mayor biodiversidad del planeta. Explora selvas, páramos, ríos, montañas y ecosistemas únicos en el mundo"
      heroGradient="from-primary via-secondary to-turquoise"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Experiencias en Naturaleza',
          content: 'Colombia tiene el 10% de la biodiversidad mundial en solo el 0.7% de la superficie terrestre. Paraíso para amantes de la naturaleza.',
          cards: [
            {
              title: 'Observación de Aves',
              description: '+1,900 especies (20% de aves del mundo). Rutas especializadas en Chicaque, San Jorge, Minca, Cali, Chingaza.',
              icon: <Bird size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Trekking en Páramos',
              description: 'Ecosistema de alta montaña único. Cocuy, Chingaza, Sumapaz, Puracé. Lagunas glaciares y frailejones gigantes.',
              icon: <Mountains size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Selva Tropical',
              description: 'Amazonía, Chocó, Pacífico. Biodiversidad extrema, comunidades indígenas, plantas medicinales, fauna única.',
              icon: <Tree size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Ríos y Cascadas',
              description: 'Caño Cristales, La Chorrera, río Claro, Charcos de Guatapé. Natación en aguas cristalinas y piscinas naturales.',
              icon: <Drop size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Desiertos Únicos',
              description: 'Desierto de La Tatacoa, Guajira. Paisajes lunares, cielos estrellados, formaciones rocosas milenarias.',
              icon: <Sun size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Ecoturismo Sostenible',
              description: 'Reservas naturales, fincas ecológicas, turismo comunitario. Experiencias que protegen y preservan.',
              icon: <Leaf size={40} className="text-primary" weight="bold" />
            }
          ]
        },
        {
          title: 'Parques Nacionales Naturales',
          content: `Colombia tiene 59 Parques Nacionales que protegen ecosistemas únicos:

**Parque Tayrona (Caribe)**
Selva tropical + playas vírgenes + Sierra Nevada
Trekking, camping, snorkel, cultura ancestral Kogui
Mejor época: Diciembre-marzo, julio-agosto

**Parque Los Nevados (Eje Cafetero)**
Nevados, glaciares, lagunas de altura, páramos
Volcán Nevado del Ruiz, Santa Isabel, Tolima
Trekking de altura, termas naturales, Laguna del Otún

**Parque Cocuy (Boyacá)**
La sierra nevada más grande de Colombia
22 picos nevados, lagunas glaciares, Valle de los Frailejones
Trekking de varios días, camping extremo

**Parque Amacayacu (Amazonía)**
Selva amazónica virgen, río Amazonas
Delfines rosados, jaguares, aves exóticas, comunidades tikuna
Canoas, pesca, intercambio cultural

**Parque Puracé (Cauca)**
Volcán activo, páramos, termas azufradas
Cascada Bedón, lagunas de altura, osos de anteojos
Senderismo, observación de cóndores

**Parque Chingaza (Cundinamarca/Meta)**
Páramo que provee agua a Bogotá
Lagunas de Siecha, frailejones, osos de anteojos
Avistamiento de aves (casi 400 especies)

**Caño Cristales (Meta)**
"Río de los 5 colores" - Maravilla natural
Plantas acuáticas que colorean el agua (rojo, amarillo, verde)
Solo abierto junio-noviembre, tours guiados obligatorios

**Parque Sierra Nevada de Santa Marta**
Monte costero más alto del mundo
Ciudad Perdida (trekking 4 días), pueblos indígenas
Nieve y playa a 42 km de distancia`
        },
        {
          title: 'Biodiversidad Colombiana',
          content: `**Récords Mundiales:**
🥇 #1 en especies de aves (1,954 especies)
🥇 #1 en especies de orquídeas (4,270 especies)
🥇 #1 en especies de mariposas (3,642 especies)
🥈 #2 en especies de plantas (56,343 especies)
🥈 #2 en especies de anfibios (803 especies)
🥉 #3 en especies de reptiles (596 especies)
🥉 #3 en especies de mamíferos (528 especies)

**Ecosistemas Únicos:**
🌴 Selva amazónica (35% del territorio)
🏔️ Páramos (más del 50% de páramos del mundo)
🌊 Dos océanos: Pacífico y Atlántico
🏝️ Archipiélagos caribeños: San Andrés, Providencia
🌵 Desiertos: Tatacoa, Guajira
⛰️ Tres cordilleras de los Andes
🌿 Bosque de niebla (Chocó biogeográfico)
🏞️ Llanuras: Orinoquía y Amazonía

**Fauna Emblemática:**
🐆 Jaguar (el felino más grande de América)
🐻 Oso de anteojos (única especie de oso en Sudamérica)
🦅 Cóndor andino (ave voladora más grande del mundo)
🐵 Mono tití cabeciblanco (endémico de Colombia)
🐬 Delfín rosado del Amazonas
🦜 Guacamaya (7 especies en Colombia)
🐸 Ranas dardo venenosas (colores vibrantes)
🐋 Ballenas jorobadas (julio-octubre en Pacífico)`
        },
        {
          title: 'Actividades de Naturaleza',
          content: `**Observación de Fauna**
• Avistamiento de ballenas jorobadas (Bahía Málaga, Nuquí, Gorgona)
• Tortugas marinas desovando (playas del Pacífico y Caribe)
• Delfines rosados en el Amazonas (Leticia, Puerto Nariño)
• Monos aulladores, titís, perezosos en reservas naturales
• Caimanes y babillas en ciénagas y ríos
• Safari fotográfico de mamíferos en Casanare y Arauca

**Expediciones Botánicas**
• Jardín Botánico de Bogotá y Medellín
• Orquideoramas y mariposarios
• Fincas de plantas medicinales y aromáticas
• Tours de hongos y plantas nativas
• Valle de Palmas de cera (árbol nacional, 60m de altura)

**Deportes de Naturaleza**
• Kayak en ríos y lagunas
• Rafting en aguas blancas
• Rappel en cascadas
• Ciclomontañismo en bosques
• Escalada en formaciones naturales
• Stand-up paddle en lagos andinos

**Experiencias Nocturnas**
• Observación de estrellas en Tatacoa
• Safari nocturno para ver animales nocturnos
• Bioluminiscencia en playas del Pacífico
• Canoas nocturnas en Amazonía
• Avistamiento de murciélagos en cuevas`
        },
        {
          title: 'Turismo Sostenible y Responsable',
          content: `✓ **Respeta la flora y fauna**: No alimentar, tocar ni molestar a los animales
✓ **Lleva tu basura**: Principio "Leave No Trace", deja solo huellas
✓ **Apoya comunidades locales**: Contrata guías nativos, compra artesanías directamente
✓ **Usa protector solar ecológico**: Sin químicos que dañen ecosistemas acuáticos
✓ **Mantente en senderos**: Protege vegetación frágil, especialmente en páramos
✓ **No extraigas plantas**: Ni siquiera flores, semillas o ramas
✓ **Reduce ruido**: No uses parlantes, respeta los sonidos naturales
✓ **Viaja en grupos pequeños**: Menos impacto ambiental, mejor experiencia
✓ **Elige operadores certificados**: Con prácticas de turismo sostenible
✓ **Educa a otros viajeros**: Comparte estas prácticas responsables

**Certificaciones que Buscamos:**
• Sello de Turismo Sostenible (NTS-TS)
• Certificación Rainforest Alliance
• Travelife Gold
• Biosphere Responsible Tourism`
        }
      ]}
      callToAction={{
        title: 'Conecta con la Naturaleza de Colombia',
        description: 'Descubre la increíble biodiversidad y paisajes únicos',
        buttons: [
          { label: 'Ver Tours de Naturaleza', route: 'tours' },
          { label: 'Ecoturismo', route: 'explorar' },
          { label: 'Crear Itinerario', route: 'itinerario', variant: 'outline' }
        ]
      }}
    />
  )
}
