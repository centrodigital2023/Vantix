import { useRef, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  UploadSimple, 
  X, 
  Image as ImageIcon, 
  CheckCircle,
  WarningCircle,
  ArrowsCounterClockwise
} from '@phosphor-icons/react'
import { useSupabaseStorage } from '@/hooks/use-supabase-storage'
import { cn } from '@/lib/utils'

interface ImageUploadZoneProps {
  bucket?: string
  folder?: string
  maxFiles?: number
  maxSizeMB?: number
  onUploadComplete?: (urls: string[]) => void
  initialImages?: string[]
  className?: string
}

export function ImageUploadZone({
  bucket = 'accommodations',
  folder,
  maxFiles = 10,
  maxSizeMB = 10,
  onUploadComplete,
  initialImages = [],
  className
}: ImageUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(initialImages)

  const {
    uploads,
    isUploading,
    uploadFiles,
    deleteFile,
    clearUploads,
    isConfigured
  } = useSupabaseStorage({
    bucket,
    maxSizeMB,
    onUploadComplete: (urls) => {
      setUploadedUrls((prev) => [...prev, ...urls])
      onUploadComplete?.(urls)
    }
  })

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files)
      uploadFiles(filesArray, folder)
    }
  }, [uploadFiles, folder])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      uploadFiles(filesArray, folder)
    }
  }, [uploadFiles, folder])

  const handleRemoveImage = useCallback(async (url: string) => {
    try {
      await deleteFile(url)
      setUploadedUrls((prev) => prev.filter((u) => u !== url))
    } catch (error) {
      console.error('Error removing image:', error)
    }
  }, [deleteFile])

  if (!isConfigured) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <WarningCircle size={48} className="text-amber-500" />
          <div>
            <h3 className="font-semibold text-lg">Supabase no configurado</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configura las credenciales de Supabase para cargar imágenes
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Card
        className={cn(
          'border-2 border-dashed transition-colors',
          dragActive && 'border-primary bg-primary/5',
          !dragActive && 'border-border'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className={cn(
              'rounded-full p-4 transition-colors',
              dragActive ? 'bg-primary/10' : 'bg-muted'
            )}>
              <UploadSimple size={32} className={dragActive ? 'text-primary' : 'text-muted-foreground'} />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">
                {dragActive ? 'Suelta las imágenes aquí' : 'Cargar imágenes'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Arrastra y suelta o haz clic para seleccionar
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <Badge variant="outline">Máx {maxFiles} archivos</Badge>
                <Badge variant="outline">Hasta {maxSizeMB}MB</Badge>
                <Badge variant="outline">JPG, PNG, WebP</Badge>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || uploadedUrls.length >= maxFiles}
            >
              <ImageIcon className="mr-2" />
              Seleccionar archivos
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>
      </Card>

      {uploads.length > 0 && (
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Subiendo archivos</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearUploads}
                disabled={isUploading}
              >
                <ArrowsCounterClockwise className="mr-1" size={16} />
                Limpiar
              </Button>
            </div>

            {uploads.map((upload) => (
              <div key={upload.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate flex-1 mr-4">{upload.fileName}</span>
                  <div className="flex items-center gap-2">
                    {upload.status === 'completed' && (
                      <CheckCircle size={18} className="text-green-500" />
                    )}
                    {upload.status === 'error' && (
                      <WarningCircle size={18} className="text-destructive" />
                    )}
                    <span className="text-muted-foreground text-xs">
                      {upload.progress}%
                    </span>
                  </div>
                </div>
                <Progress value={upload.progress} className="h-1" />
                {upload.error && (
                  <p className="text-xs text-destructive">{upload.error}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {uploadedUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedUrls.map((url, index) => (
            <Card key={url} className="relative group overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveImage(url)}
                  >
                    <X className="mr-1" size={16} />
                    Eliminar
                  </Button>
                </div>
                {index === 0 && (
                  <Badge className="absolute top-2 left-2" variant="default">
                    Principal
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
