import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'bienestar')!

export function Bienestar() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Descubre los mejores destinos de bienestar y relajación en Colombia</p>
    </CategoryTemplate>
  )
}