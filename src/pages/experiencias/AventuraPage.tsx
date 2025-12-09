import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { Parachute, Waves, Mountains, Bicycle, Campfire, Lightning } from '@phosphor-icons/react'

interface AventuraPageProps {
  onNavigate: (page: PageRoute) => void
}

export function AventuraPage({ onNavigate }: AventuraPageProps) {
  return (
    <ContentPage
      title="Turismo de Aventura"
      subtitle="Experiencias llenas de adrenalina para los amantes de la aventura extrema. Colombia tiene los paisajes perfectos para deportes y actividades emocionantes"
      heroGradient="from-accent via-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Actividades de Aventura',
          content: 'Desde los Andes hasta el Pacífico, Colombia ofrece opciones infinitas para aventureros. Deportes extremos con operadores certificados y equipo profesional.',
          cards: [
            {
              title: 'Parapente',
              description: 'San Gil, Chicamocha, Roldanillo. Vuela sobre cañones y valles con vistas espectaculares. Vuelos tándem y cursos de formación.',
              icon: <Parachute size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Rafting',
              description: 'Río Fonce, Suárez, Magdalena. Rápidos clase II a IV. Equipos certificados, guías expertos, toda la adrenalina del agua blanca.',
              icon: <Waves size={40} className="text-turquoise" weight="bold" />
            },
            {
              title: 'Escalada en Roca',
              description: 'Suesca, Machetá, Sandoná. Paredes naturales y escuelas de escalada. Desde principiantes hasta climbers experimentados.',
              icon: <Mountains size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Ciclomontañismo',
              description: 'Rutas por Boyacá, Antioquia, Santander. Descensos técnicos, cross country, enduro. Alquiler de bikes de alta gama.',
              icon: <Bicycle size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Torrentismo',
              description: 'Descenso de cascadas con cuerdas y arneses. San Gil, Jardín, Salento. Saltos a piscinas naturales y rapel extremo.',
              icon: <Lightning size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Trekking y Camping',
              description: 'Ciudad Perdida, Cocuy, Nevados. Expediciones de varios días, camping en alturas, experiencias en naturaleza virgen.',
              icon: <Campfire size={40} className="text-primary" weight="bold" />
            }
          ]
        },
        {
          title: 'Destinos de Aventura',
          content: `**San Gil, Santander** - La capital de la aventura en Colombia
Rafting, parapente, torrentismo, rappel, bungee, espeleología

**Parque Nacional Cocuy** - Trekking de alta montaña
Glaciares, lagunas de altura, nevados, camping extremo

**Chicamocha** - Cañón y parque nacional
Parapente, cable aéreo más largo de Latinoamérica, deportes extremos

**Jardín, Antioquia** - Aventura en paisaje cafetero
Torrentismo en cascadas, parapente, cueva del esplendor, teleférico

**Guatapé** - Agua y montaña
Wakeboard, esquí acuático, kayak, subida a la Piedra del Peñol (740 escalones)

**Nevado del Ruiz** - Volcán activo
Trekking con guía especializado, aguas termales, paisajes lunares

**Parque Tayrona** - Selva y playa
Trekking por la Sierra Nevada, kayak en mar, snorkel, camping en playa

**Caño Cristales** - El río más hermoso del mundo
Trekking, natación en piscinas naturales, fotografía de paisajes únicos`
        },
        {
          title: 'Seguridad y Certificaciones',
          content: `✓ **Operadores certificados**: Todos nuestros proveedores tienen licencias vigentes y seguros
✓ **Equipo profesional**: Cascos, arneses, chalecos certificados internacionalmente
✓ **Guías expertos**: Con años de experiencia y certificaciones IAWA, UIAA, WRTC
✓ **Briefing completo**: Instrucciones de seguridad antes de cada actividad
✓ **Seguro incluido**: Cobertura de accidentes en todas las actividades extremas
✓ **Grupos pequeños**: Máximo 8-10 personas por guía para mayor seguridad
✓ **Condiciones climáticas**: Actividades se cancelan si hay riesgo, reembolso o reprogramación
✓ **Nivel físico**: Actividades clasificadas por dificultad, elige según tu condición`
        }
      ]}
      callToAction={{
        title: 'Vive la Aventura',
        description: 'Reserva tu experiencia extrema con operadores certificados',
        buttons: [
          { label: 'Ver Tours de Aventura', route: 'tours' },
          { label: 'Crear Itinerario', route: 'itinerario' },
          { label: 'Contactar', route: 'contacto', variant: 'outline' }
        ]
      }}
    />
  )
}
