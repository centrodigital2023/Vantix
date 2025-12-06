import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'religioso')!

export function Religioso() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Recorre lugares sagrados y de peregrinación en Colombia</p>
    </CategoryTemplate>
  )
}