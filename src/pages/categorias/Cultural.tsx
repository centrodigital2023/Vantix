import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'cultural')!

export function Cultural() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Explora la rica historia y tradiciones culturales de Colombia</p>
    </CategoryTemplate>
  )
}