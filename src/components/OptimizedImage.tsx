import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { getOptimizedImageUrl, generateImageSrcSet } from '@/lib/image-optimization'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'hero'
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  size = 'medium',
  onLoad
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || !imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px'
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const optimizedSrc = getOptimizedImageUrl(src, size)
  const srcSet = generateImageSrcSet(src, ['small', 'medium', 'large'])
  const imageSrc = isInView ? optimizedSrc : ''

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden bg-muted/20', className)}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {!isLoaded && isInView && (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/10 to-transparent bg-[length:200%_100%]" />
      )}
      {isInView && (
        <img
          src={imageSrc}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}
