import { X, ArrowsDownUp, Star, Sparkle, Image as ImageIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import type { PhotoUpload } from '@/hooks/use-photo-upload'

interface PhotoGridProps {
  photos: PhotoUpload[]
  onRemove: (photoId: string) => void
  onReorder?: (fromIndex: number, toIndex: number) => void
  readOnly?: boolean
}

export function PhotoGrid({ photos, onRemove, onReorder, readOnly = false }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="border-2 border-dashed rounded-lg p-12 text-center">
        <ImageIcon size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No hay fotos cargadas aún
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <AnimatePresence>
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="relative aspect-square group"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-border bg-muted">
              {/* Imagen */}
              <img
                src={photo.optimizedUrl || photo.preview}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Badge de portada */}
              {index === 0 && (
                <Badge
                  variant="default"
                  className="absolute top-2 left-2 gap-1 bg-primary/90 backdrop-blur-sm"
                >
                  <Star size={12} weight="fill" />
                  Portada
                </Badge>
              )}

              {/* Estado de carga */}
              {photo.status !== 'completed' && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-3/4 space-y-2">
                    <Progress value={photo.progress} className="h-1" />
                    <p className="text-xs text-center">
                      {photo.status === 'uploading' && 'Subiendo...'}
                      {photo.status === 'optimizing' && 'Optimizando con IA...'}
                      {photo.status === 'error' && 'Error al cargar'}
                    </p>
                  </div>
                </div>
              )}

              {/* Análisis IA */}
              {photo.aiAnalysis && photo.status === 'completed' && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="flex items-center gap-1">
                    <Sparkle size={12} weight="fill" className="text-yellow-400" />
                    <span className="text-xs text-white font-medium">
                      Calidad: {photo.aiAnalysis.quality}%
                    </span>
                  </div>
                </div>
              )}

              {/* Controles */}
              {!readOnly && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  {onReorder && index > 0 && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-7 w-7 bg-background/90 backdrop-blur-sm"
                      onClick={() => onReorder(index, index - 1)}
                    >
                      <ArrowsDownUp size={14} weight="bold" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7 bg-destructive/90 backdrop-blur-sm"
                    onClick={() => onRemove(photo.id)}
                  >
                    <X size={14} weight="bold" />
                  </Button>
                </div>
              )}
            </div>

            {/* Sugerencias IA */}
            {photo.aiAnalysis?.suggestions && photo.aiAnalysis.suggestions.length > 0 && (
              <div className="mt-1 text-xs text-muted-foreground">
                {photo.aiAnalysis.suggestions[0]}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

interface PhotoUploadZoneProps {
  onFileSelect: (files: FileList) => void
  isUploading: boolean
  maxFiles: number
  currentCount: number
}

export function PhotoUploadZone({ 
  onFileSelect, 
  isUploading, 
  maxFiles,
  currentCount 
}: PhotoUploadZoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files)
    }
  }

  const remainingSlots = maxFiles - currentCount

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
    >
      <input
        type="file"
        id="photo-upload"
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={handleFileInput}
        disabled={isUploading || remainingSlots <= 0}
      />
      
      <label htmlFor="photo-upload" className="cursor-pointer">
        <ImageIcon 
          size={48} 
          weight="duotone" 
          className={`mx-auto mb-4 ${isUploading ? 'text-muted-foreground animate-pulse' : 'text-primary'}`} 
        />
        
        <h3 className="font-semibold mb-2">
          {isUploading ? 'Procesando fotos...' : 'Arrastra fotos aquí o haz clic para seleccionar'}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          JPG, PNG o WebP • Máx. 10MB • Mín. 1024x768px
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline">
            {currentCount} de {maxFiles} fotos
          </Badge>
          {remainingSlots > 0 && (
            <Badge variant="secondary">
              {remainingSlots} disponibles
            </Badge>
          )}
        </div>
        
        {!isUploading && remainingSlots > 0 && (
          <Button type="button" variant="outline" size="sm">
            Seleccionar Fotos
          </Button>
        )}
      </label>
    </div>
  )
}

interface PhotoAnalysisCardProps {
  photo: PhotoUpload
}

export function PhotoAnalysisCard({ photo }: PhotoAnalysisCardProps) {
  if (!photo.aiAnalysis || photo.status !== 'completed') {
    return null
  }

  const { quality, brightness, composition, suggestions } = photo.aiAnalysis

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-muted/50 rounded-lg border"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkle size={20} weight="duotone" className="text-primary" />
        <h4 className="font-semibold text-sm">Análisis IA</h4>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <p className={`text-2xl font-bold ${getQualityColor(quality)}`}>
            {quality}%
          </p>
          <p className="text-xs text-muted-foreground">Calidad</p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold ${getQualityColor(brightness)}`}>
            {Math.round(brightness)}%
          </p>
          <p className="text-xs text-muted-foreground">Brillo</p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold ${getQualityColor(composition)}`}>
            {Math.round(composition)}%
          </p>
          <p className="text-xs text-muted-foreground">Composición</p>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium mb-1">Sugerencias de Mejora:</p>
          {suggestions.map((suggestion, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              • {suggestion}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  )
}
