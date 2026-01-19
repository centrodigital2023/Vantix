import { useState, useEffect } from 'react'

interface UseProgressiveImageOptions {
  placeholder?: string
  delay?: number
}

export function useProgressiveImage(
  src: string | undefined,
  options: UseProgressiveImageOptions = {}
) {
  const { placeholder = '', delay = 0 } = options
  const [imgSrc, setImgSrc] = useState(placeholder)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const img = new Image()

    const loadImage = () => {
      img.src = src
      
      img.onload = () => {
        setImgSrc(src)
        setIsLoading(false)
        setHasError(false)
      }

      img.onerror = () => {
        setIsLoading(false)
        setHasError(true)
      }
    }

    if (delay > 0) {
      timeoutId = setTimeout(loadImage, delay)
    } else {
      loadImage()
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      img.onload = null
      img.onerror = null
    }
  }, [src, delay])

  return { imgSrc, isLoading, hasError }
}
