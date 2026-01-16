import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  UploadSimple, 
  Image as ImageIcon, 
  Trash, 
  DotsSixVertical,
  Sparkle,
  CheckCircle,
  Warning
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export interface PhotoData {
  id: string
  file: File
  preview: string
  order: number
  isMain: boolean
  quality?: 'excellent' | 'good' | 'poor'
  aiAnalysis?: {
    score: number
    suggestions: string[]
    tags: string[]
  }
}

interface IntelligentPhotoUploadProps {
  photos: PhotoData[]
  onChange: (photos: PhotoData[]) => void
  maxPhotos?: number
  onAnalyze?: (photo: PhotoData) => Promise<void>
  analyzing?: boolean
}

export function IntelligentPhotoUpload({
  photos,
  onChange,
  maxPhotos = 20,
  onAnalyze,
  analyzing = false
}: IntelligentPhotoUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return

    const filesArray = Array.from(files)
    
    if (photos.length + filesArray.length > maxPhotos) {
      toast.error(`Máximo ${maxPhotos} fotos permitidas`)
      return
    }

    const validFiles = filesArray.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} no es una imagen válida`)
        return false
      }
      
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} es muy grande (máx 10MB)`)
        return false
      }
      
      return true
    })

    const newPhotos: PhotoData[] = await Promise.all(
      validFiles.map(async (file, index) => {
        const preview = await readFileAsDataURL(file)
        return {
          id: `photo_${Date.now()}_${index}`,
          file,
          preview,
          order: photos.length + index,
          isMain: photos.length === 0 && index === 0
        }
      })
    )

    onChange([...photos, ...newPhotos])
    toast.success(`${newPhotos.length} foto(s) agregada(s)`)
  }, [photos, onChange, maxPhotos])

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const handleDelete = (id: string) => {
    const filtered = photos.filter(p => p.id !== id)
    
    if (filtered.length > 0) {
      const deletedPhoto = photos.find(p => p.id === id)
      if (deletedPhoto?.isMain) {
        filtered[0].isMain = true
      }
    }
    
    onChange(filtered.map((p, i) => ({ ...p, order: i })))
    toast.success('Foto eliminada')
  }

  const handleSetMain = (id: string) => {
    onChange(photos.map(p => ({
      ...p,
      isMain: p.id === id
    })))
    toast.success('Foto principal actualizada')
  }

  const handleDragStart = (id: string) => {
    setDraggingId(id)
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return

    const dragIndex = photos.findIndex(p => p.id === draggingId)
    const targetIndex = photos.findIndex(p => p.id === targetId)

    if (dragIndex === -1 || targetIndex === -1) return

    const newPhotos = [...photos]
    const [draggedItem] = newPhotos.splice(dragIndex, 1)
    newPhotos.splice(targetIndex, 0, draggedItem)

    onChange(newPhotos.map((p, i) => ({ ...p, order: i })))
  }

  const handleDragEnd = () => {
    setDraggingId(null)
  }

  const getQualityIcon = (quality?: 'excellent' | 'good' | 'poor') => {
    if (!quality) return null
    
    switch (quality) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-500" weight="fill" />
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-500" weight="fill" />
      case 'poor':
        return <Warning className="w-4 h-4 text-orange-500" weight="fill" />
    }
  }

  return (
    <div className="space-y-6">
      {photos.length < maxPhotos && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300",
            dragOver ? "border-primary bg-primary/5 scale-105" : "border-border hover:border-primary/50 hover:bg-muted/50",
            "cursor-pointer"
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300",
              dragOver && "scale-110 bg-primary/20"
            )}>
              <UploadSimple className="w-8 h-8 text-primary" weight="bold" />
            </div>
            
            <div>
              <p className="text-lg font-semibold mb-1">
                Arrastra fotos aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-muted-foreground">
                Máximo {maxPhotos} fotos • Formatos: JPG, PNG, WEBP • Máx 10MB por foto
              </p>
            </div>
            
            <Button type="button" variant="outline" size="sm">
              <ImageIcon className="w-4 h-4 mr-2" />
              Seleccionar Fotos
            </Button>
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {photos.length} foto{photos.length !== 1 ? 's' : ''} cargada{photos.length !== 1 ? 's' : ''}
              </h3>
              <span className="text-sm text-muted-foreground">
                ({maxPhotos - photos.length} restante{maxPhotos - photos.length !== 1 ? 's' : ''})
              </span>
            </div>
            
            {onAnalyze && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => photos.forEach(onAnalyze)}
                disabled={analyzing}
              >
                <Sparkle className="w-4 h-4 mr-2" />
                {analyzing ? 'Analizando...' : 'Analizar con IA'}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card
                key={photo.id}
                draggable
                onDragStart={() => handleDragStart(photo.id)}
                onDragOver={(e) => handleDragOver(e, photo.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "relative group overflow-hidden cursor-move transition-all duration-300",
                  photo.isMain && "ring-2 ring-primary",
                  draggingId === photo.id && "opacity-50 scale-95"
                )}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.preview}
                    alt={`Preview ${photo.order + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-2 left-2 flex gap-1">
                    {photo.isMain && (
                      <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                        Principal
                      </div>
                    )}
                    {photo.quality && (
                      <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                        {getQualityIcon(photo.quality)}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <DotsSixVertical className="w-5 h-5 text-white drop-shadow-lg" weight="bold" />
                  </div>
                  
                  <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {!photo.isMain && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="flex-1 h-8 text-xs"
                        onClick={() => handleSetMain(photo.id)}
                      >
                        Hacer principal
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="h-8 px-3"
                      onClick={() => handleDelete(photo.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {photo.aiAnalysis && (
                  <div className="p-2 bg-muted/50 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Calidad: {photo.aiAnalysis.score}/10</span>
                    </div>
                    {photo.aiAnalysis.suggestions.length > 0 && (
                      <p className="text-muted-foreground line-clamp-2">
                        {photo.aiAnalysis.suggestions[0]}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {photos.length > 0 && (
            <p className="text-sm text-muted-foreground">
              💡 Arrastra las fotos para reordenarlas. La primera foto será la imagen principal.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
