import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export interface PhotoUpload {
  id: string
  file: File
  preview: string
  status: 'uploading' | 'optimizing' | 'completed' | 'error'
  progress: number
  optimizedUrl?: string
  aiAnalysis?: {
    quality: number
    brightness: number
    composition: number
    suggestions: string[]
  }
}

interface UsePhotoUploadOptions {
  maxFiles?: number
  maxSizeMB?: number
  minWidth?: number
  minHeight?: number
  acceptedFormats?: string[]
  onUploadComplete?: (photos: PhotoUpload[]) => void
}

export function usePhotoUpload(options: UsePhotoUploadOptions = {}) {
  const {
    maxFiles = 20,
    maxSizeMB = 10,
    minWidth = 1024,
    minHeight = 768,
    acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    onUploadComplete
  } = options

  const [photos, setPhotos] = useState<PhotoUpload[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const validateFile = useCallback(async (file: File): Promise<{ valid: boolean; error?: string }> => {
    // Validar formato
    if (!acceptedFormats.includes(file.type)) {
      return { valid: false, error: 'Formato no soportado. Usa JPG, PNG o WebP' }
    }

    // Validar tamaño
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      return { valid: false, error: `La imagen debe pesar menos de ${maxSizeMB}MB (actual: ${sizeMB.toFixed(1)}MB)` }
    }

    // Validar dimensiones
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        if (img.width < minWidth || img.height < minHeight) {
          resolve({
            valid: false,
            error: `La imagen debe ser al menos ${minWidth}x${minHeight}px (actual: ${img.width}x${img.height}px)`
          })
        } else {
          resolve({ valid: true })
        }
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve({ valid: false, error: 'No se pudo cargar la imagen' })
      }
      
      img.src = url
    })
  }, [acceptedFormats, maxSizeMB, minWidth, minHeight])

  const analyzeImageWithAI = useCallback(async (file: File): Promise<PhotoUpload['aiAnalysis']> => {
    // Simular análisis de IA (en producción, llamar a un servicio real)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve({
            quality: 75,
            brightness: 70,
            composition: 70,
            suggestions: []
          })
          return
        }

        canvas.width = 100
        canvas.height = 100
        ctx.drawImage(img, 0, 0, 100, 100)
        
        const imageData = ctx.getImageData(0, 0, 100, 100)
        const data = imageData.data
        
        // Calcular brillo promedio
        let totalBrightness = 0
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          totalBrightness += (r + g + b) / 3
        }
        const avgBrightness = (totalBrightness / (data.length / 4)) / 255 * 100
        
        // Generar análisis
        const quality = img.width >= 1920 && img.height >= 1080 ? 95 : 
                       img.width >= 1280 && img.height >= 720 ? 80 : 70
        
        const composition = Math.random() * 30 + 70 // Simular análisis de composición
        
        const suggestions: string[] = []
        if (avgBrightness < 40) suggestions.push('Considera aumentar el brillo de la imagen')
        if (avgBrightness > 90) suggestions.push('La imagen podría estar sobreexpuesta')
        if (quality < 80) suggestions.push('Usa una resolución mayor (mínimo 1920x1080px)')
        if (composition < 75) suggestions.push('Intenta centrar mejor el objeto principal')
        if (img.width / img.height < 1.3 || img.width / img.height > 1.7) {
          suggestions.push('La mejor relación de aspecto es 3:2 o 16:9')
        }
        
        resolve({
          quality,
          brightness: avgBrightness,
          composition,
          suggestions
        })
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve({
          quality: 75,
          brightness: 70,
          composition: 70,
          suggestions: []
        })
      }
      
      img.src = url
    })
  }, [])

  const optimizeImage = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('No se pudo crear el canvas'))
          return
        }

        // Redimensionar si es muy grande
        let width = img.width
        let height = img.height
        const maxDimension = 1920
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension
            width = maxDimension
          } else {
            width = (width / height) * maxDimension
            height = maxDimension
          }
        }
        
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convertir a WebP con buena calidad
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(URL.createObjectURL(blob))
            } else {
              reject(new Error('No se pudo optimizar la imagen'))
            }
          },
          'image/webp',
          0.85
        )
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('No se pudo cargar la imagen'))
      }
      
      img.src = url
    })
  }, [])

  const uploadPhoto = useCallback(async (file: File): Promise<PhotoUpload> => {
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const preview = URL.createObjectURL(file)
    
    const newPhoto: PhotoUpload = {
      id: photoId,
      file,
      preview,
      status: 'uploading',
      progress: 0
    }

    setPhotos(prev => [...prev, newPhoto])

    try {
      // Simular progreso de subida
      for (let progress = 0; progress <= 40; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setPhotos(prev => prev.map(p => 
          p.id === photoId ? { ...p, progress } : p
        ))
      }

      // Cambiar a optimización
      setPhotos(prev => prev.map(p => 
        p.id === photoId ? { ...p, status: 'optimizing', progress: 50 } : p
      ))

      // Optimizar imagen
      const optimizedUrl = await optimizeImage(file)
      
      setPhotos(prev => prev.map(p => 
        p.id === photoId ? { ...p, progress: 70 } : p
      ))

      // Analizar con IA
      const aiAnalysis = await analyzeImageWithAI(file)
      
      setPhotos(prev => prev.map(p => 
        p.id === photoId ? { ...p, progress: 90 } : p
      ))

      // Completar
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const completedPhoto: PhotoUpload = {
        ...newPhoto,
        status: 'completed',
        progress: 100,
        optimizedUrl,
        aiAnalysis
      }

      setPhotos(prev => prev.map(p => 
        p.id === photoId ? completedPhoto : p
      ))

      return completedPhoto

    } catch (error) {
      const errorPhoto: PhotoUpload = {
        ...newPhoto,
        status: 'error',
        progress: 0
      }

      setPhotos(prev => prev.map(p => 
        p.id === photoId ? errorPhoto : p
      ))

      throw error
    }
  }, [analyzeImageWithAI, optimizeImage])

  const handleFileSelect = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    
    if (photos.length + fileArray.length > maxFiles) {
      toast.error(`Solo puedes subir un máximo de ${maxFiles} fotos`)
      return
    }

    setIsUploading(true)

    for (const file of fileArray) {
      try {
        const validation = await validateFile(file)
        
        if (!validation.valid) {
          toast.error(validation.error || 'Error al validar archivo', {
            description: file.name
          })
          continue
        }

        await uploadPhoto(file)
        
        toast.success('Foto procesada', {
          description: `${file.name} se cargó correctamente`
        })

      } catch (error) {
        console.error('Error uploading photo:', error)
        toast.error('Error al subir foto', {
          description: file.name
        })
      }
    }

    setIsUploading(false)
    
    const completedPhotos = photos.filter(p => p.status === 'completed')
    if (completedPhotos.length > 0) {
      onUploadComplete?.(completedPhotos)
    }
  }, [photos, maxFiles, validateFile, uploadPhoto, onUploadComplete])

  const removePhoto = useCallback((photoId: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === photoId)
      if (photo) {
        URL.revokeObjectURL(photo.preview)
        if (photo.optimizedUrl) {
          URL.revokeObjectURL(photo.optimizedUrl)
        }
      }
      return prev.filter(p => p.id !== photoId)
    })
  }, [])

  const reorderPhotos = useCallback((fromIndex: number, toIndex: number) => {
    setPhotos(prev => {
      const newPhotos = [...prev]
      const [movedPhoto] = newPhotos.splice(fromIndex, 1)
      newPhotos.splice(toIndex, 0, movedPhoto)
      return newPhotos
    })
  }, [])

  const clearAll = useCallback(() => {
    photos.forEach(photo => {
      URL.revokeObjectURL(photo.preview)
      if (photo.optimizedUrl) {
        URL.revokeObjectURL(photo.optimizedUrl)
      }
    })
    setPhotos([])
  }, [photos])

  return {
    photos,
    isUploading,
    handleFileSelect,
    removePhoto,
    reorderPhotos,
    clearAll,
    hasMinimumPhotos: photos.filter(p => p.status === 'completed').length >= 5
  }
}
