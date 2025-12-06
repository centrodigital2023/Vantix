import { CategoryTemplate } from '@/components/CategoryTemplate'
import { CATEGORIES } from '@/lib/data'

const category = CATEGORIES.find(c => c.slug === 'playa')!

export function Playa() {
  return (
    <CategoryTemplate category={category}>
      <p className="text-lg text-center">Disfruta del sol y el mar del Caribe colombiano</p>
    </CategoryTemplate>
  )
}