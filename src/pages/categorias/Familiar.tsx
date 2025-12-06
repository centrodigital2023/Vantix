import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'familiar')!

export function Familiar() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Diversión garantizada para toda la familia en Colombia</p>
    </CategoryTemplate>
  )
}