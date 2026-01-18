export const imageOptimizationConfig = {
  quality: 85,
  formats: ['webp', 'jpg'],
  sizes: {
    thumbnail: 200,
    small: 400,
    medium: 800,
    large: 1200,
    hero: 1920
  },
  lazyLoadThreshold: '50px'
}

export function getOptimizedImageUrl(
  url: string,
  size: keyof typeof imageOptimizationConfig.sizes = 'medium'
): string {
  if (!url) return ''
  
  if (url.includes('unsplash.com')) {
    const width = imageOptimizationConfig.sizes[size]
    const params = new URLSearchParams({
      w: width.toString(),
      q: imageOptimizationConfig.quality.toString(),
      fm: 'webp',
      fit: 'crop',
      auto: 'format'
    })
    return `${url.split('?')[0]}?${params.toString()}`
  }
  
  return url
}

export function generateImageSrcSet(url: string, sizes: Array<keyof typeof imageOptimizationConfig.sizes>): string {
  return sizes
    .map(size => {
      const width = imageOptimizationConfig.sizes[size]
      return `${getOptimizedImageUrl(url, size)} ${width}w`
    })
    .join(', ')
}

export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = url
  })
}

export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(urls.map(preloadImage))
}

export const createBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return ''
  
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, 'rgba(59, 191, 255, 0.1)')
  gradient.addColorStop(1, 'rgba(138, 82, 255, 0.1)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}
