import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'rural')!

export function Rural() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Vive la auténtica experiencia del campo colombiano</p>
    </CategoryTemplate>
  )
}