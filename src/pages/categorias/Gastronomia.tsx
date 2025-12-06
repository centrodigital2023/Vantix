import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'gastronomia')!

export function Gastronomia() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Saborea los mejores platos de la cocina colombiana</p>
    </CategoryTemplate>
  )
}