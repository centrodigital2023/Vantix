import { ReactNode, useState, useEffect } from 'react'
import { Category } from '@/lib/types'
import * as PhosphorIcons from '@phosphor-icons/react'
import { getCategoryImages } from '@/lib/api/pexels'

interface CategoryTemplateProps {
  category: Category
  children: ReactNode
}

export function CategoryTemplate({ category, children }: CategoryTemplateProps) {
  const IconComponent = (PhosphorIcons as any)[category.icon] || PhosphorIcons.Circle
  const [headerImage, setHeaderImage] = useState(category.image)

  useEffect(() => {
    let mounted = true

    async function loadHeaderImage() {
      try {
        const images = await getCategoryImages(category.name)
        if (mounted && images.length > 0) {
          setHeaderImage(images[0])
        }
      } catch (error) {
        console.error('Error loading header image:', error)
      }
    }

    loadHeaderImage()

    return () => {
      mounted = false
    }
  }, [category.name])

  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img 
          src={headerImage}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = category.image
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70`} />
        
        <div className="relative z-10 text-center text-white">
          <IconComponent size={64} weight="fill" className="mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl opacity-90">{category.description}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </div>
    </div>
  )
}