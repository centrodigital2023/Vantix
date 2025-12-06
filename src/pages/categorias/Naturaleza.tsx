import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'naturaleza')!

export function Naturaleza() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Explora paisajes naturales impresionantes de Colombia</p>
    </CategoryTemplate>
  )
}