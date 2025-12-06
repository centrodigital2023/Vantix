import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'negocios')!

export function Negocios() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Facilidades para viajes corporativos y eventos en Colombia</p>
    </CategoryTemplate>
  )
}