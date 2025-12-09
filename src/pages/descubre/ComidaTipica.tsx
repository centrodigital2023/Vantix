import { ContentPage } from '@/components/ContentPage'
import { PageRoute } from '@/lib/types'
import { ForkKnife, Coffee, Pizza, CookingPot, Martini, Cookie } from '@phosphor-icons/react'

interface ComidaTipicaProps {
  onNavigate: (page: PageRoute) => void
}

export function ComidaTipica({ onNavigate }: ComidaTipicaProps) {
  return (
    <ContentPage
      title="Comida Típica Colombiana"
      subtitle="Descubre los sabores auténticos de Colombia. Una fusión de tradiciones indígenas, europeas y africanas que crean una gastronomía única en el mundo"
      heroGradient="from-accent via-secondary to-primary"
      onNavigate={onNavigate}
      sections={[
        {
          title: 'Platos Emblemáticos',
          content: 'La comida colombiana es tan diversa como sus regiones. Cada zona tiene sus especialidades que reflejan la cultura y los productos locales.',
          cards: [
            {
              title: 'Bandeja Paisa',
              description: 'El plato más icónico de Antioquia: frijoles, arroz, carne molida, chicharrón, chorizo, huevo, aguacate, arepa y plátano maduro.',
              icon: <ForkKnife size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Ajiaco Santafereño',
              description: 'Sopa tradicional de Bogotá con tres tipos de papa, pollo, mazorca, alcaparras, crema de leche y aguacate.',
              icon: <CookingPot size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Sancocho',
              description: 'Sopa contundente que varía por región: de gallina, costilla, pescado o trifásico. Con yuca, plátano, mazorca y cilantro.',
              icon: <CookingPot size={40} className="text-secondary" weight="bold" />
            },
            {
              title: 'Arepas',
              description: 'Pan de maíz versátil: con queso, huevo, carne, pollo o sola. Cada región tiene su estilo único y delicioso.',
              icon: <Pizza size={40} className="text-accent" weight="bold" />
            },
            {
              title: 'Lechona Tolimense',
              description: 'Cerdo relleno de arroz, carne y especias, cocido lentamente hasta quedar crujiente. Especialidad del Tolima.',
              icon: <ForkKnife size={40} className="text-primary" weight="bold" />
            },
            {
              title: 'Postres Colombianos',
              description: 'Arequipe, obleas, brevas con arequipe, cuajada con melao, natilla, buñuelos y el famoso postre de natas.',
              icon: <Cookie size={40} className="text-secondary" weight="bold" />
            }
          ]
        },
        {
          title: 'Comidas por Región',
          content: `**Costa Caribe**: Arroz con coco, pescado frito, patacones, ceviche, sancocho de pescado, bollo limpio
**Región Andina**: Bandeja paisa, ajiaco, tamales, lechona, arepas de chócolo, changua, cuchuco
**Región Pacífica**: Encocado de pescado, arroz atollado, empanadas de pipián, pusandao, viche de mariscos
**Amazonía**: Pirarucú, mojojoy, hormiga culona, frutas exóticas, pescados de río
**Santanderes**: Cabrito, hormigas culonas, mute, arepa santandereana, pepitoria
**Valle del Cauca**: Sancocho de gallina, empanadas vallunas, pandebono, aborrajados, cholao
**Eje Cafetero**: Mondongo, chicharrón, patacones, trucha, platos con plátano, café de origen
**Llanos Orientales**: Mamona (ternera a la llanera), cachama, hayacas, chigüiro, arepas de maíz pelao`
        },
        {
          title: 'Bebidas Tradicionales',
          content: `**Café Colombiano**: El mejor café del mundo, suave y aromático, en cada esquina
**Aguapanela**: Bebida de panela (caña de azúcar) caliente o fría, con limón o queso
**Chocolate Santafereño**: Chocolate caliente espeso con queso derretido y almojábanas
**Jugos Naturales**: Lulo, guanábana, maracuyá, mora, mango, guayaba, zapote
**Refajo**: Mezcla de cerveza con Colombiana (gaseosa), perfecta con comida
**Chicha**: Bebida fermentada ancestral de maíz, tradicional en festividades
**Masato**: Bebida dulce de arroz fermentado, típica de los Llanos
**Aguardiente**: Licor anisado nacional, presente en todas las celebraciones colombianas`
        },
        {
          title: 'Experiencias Gastronómicas',
          content: `✓ **Tours gastronómicos** en mercados locales de Bogotá, Medellín y Cartagena
✓ **Clases de cocina** para aprender a preparar platos típicos colombianos
✓ **Visitas a cafetales** con cata de café y proceso completo del grano
✓ **Restaurantes de autor** que reinventan la cocina tradicional colombiana
✓ **Food trucks** y comida callejera en zonas como Andrés Carne de Res
✓ **Festivales gastronómicos** como el Alimentarte y Sabor Barranquilla
✓ **Cenas en fincas** con productos orgánicos y recetas ancestrales
✓ **Degustaciones** de quesos, chocolates y productos artesanales locales`
        }
      ]}
      callToAction={{
        title: 'Saborea Colombia',
        description: 'Incluye experiencias gastronómicas en tu viaje',
        buttons: [
          { label: 'Tours Gastronómicos', route: 'tours' },
          { label: 'Crear Itinerario Gourmet', route: 'itinerario' },
          { label: 'Ver Categorías', route: 'explorar', variant: 'outline' }
        ]
      }}
    />
  )
}
