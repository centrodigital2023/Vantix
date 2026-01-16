import { useState, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CloudArrowUp,
  Images,
  CheckCircle,
  WarningCircle,
  X,
  Trash,
  FolderOpen
} from '@phosphor-icons/react'
import { useSupabaseStorage } from '@/hooks/use-supabase-storage'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function StorageBucketTest() {
  const [supabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [bucketName, setBucketName] = useState('accommodation-images')
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isConfigured = Boolean(supabaseUrl && supabaseKey)

  const {
    uploads,
    isUploading,
    uploadFiles,
    deleteFile,
    clearUploads
  } = useSupabaseStorage({
    bucket: bucketName,
    maxSizeMB: 10,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    onUploadComplete: (urls) => {
      setUploadedUrls(prev => [...prev, ...urls])
    }
  })

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    const fileArray = Array.from(files)
    uploadFiles(fileArray, 'test-uploads')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDeleteImage = async (url: string) => {
    try {
      await deleteFile(url)
      setUploadedUrls(prev => prev.filter(u => u !== url))
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  if (!isConfigured) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudArrowUp size={24} className="text-muted-foreground" />
            Storage Bucket - No Configurado
          </CardTitle>
          <CardDescription>
            Configura Supabase para probar la carga de imágenes
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudArrowUp size={24} weight="duotone" className="text-primary" />
            Test de Storage Bucket
            {isUploading && (
              <Badge variant="secondary" className="ml-2">
                Subiendo...
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Prueba la carga de imágenes reales a Supabase Storage
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bucket-name">Nombre del Bucket</Label>
            <Input
              id="bucket-name"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              placeholder="accommodation-images"
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              Asegúrate de crear este bucket en Supabase con permisos públicos
            </p>
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              disabled={isUploading}
            />
            
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Images size={32} weight="duotone" className="text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  Arrastra imágenes aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, WEBP hasta 10MB
                </p>
              </div>
            </div>
          </div>

          {uploads.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Estado de Carga</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearUploads}
                  disabled={isUploading}
                >
                  <X size={16} />
                </Button>
              </div>

              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div>
                        {upload.status === 'completed' && (
                          <CheckCircle size={18} weight="fill" className="text-green-500" />
                        )}
                        {upload.status === 'error' && (
                          <WarningCircle size={18} weight="fill" className="text-destructive" />
                        )}
                        {(upload.status === 'uploading' || upload.status === 'processing') && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{upload.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {upload.status === 'uploading' && 'Subiendo...'}
                          {upload.status === 'processing' && 'Procesando...'}
                          {upload.status === 'completed' && 'Completado'}
                          {upload.status === 'error' && upload.error}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={upload.status === 'completed' ? 'default' : upload.status === 'error' ? 'destructive' : 'secondary'}
                    >
                      {upload.progress}%
                    </Badge>
                  </div>
                  {upload.status !== 'error' && (
                    <Progress value={upload.progress} className="h-1" />
                  )}
                </div>
              ))}
            </div>
          )}

          <Alert>
            <FolderOpen size={18} />
            <AlertDescription className="text-sm">
              <strong>Instrucciones:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Ve a tu dashboard de Supabase → Storage</li>
                <li>Crea un bucket llamado <code className="bg-muted px-1 rounded">{bucketName}</code></li>
                <li>Configura el bucket como público</li>
                <li>Sube imágenes aquí para probar</li>
              </ol>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {uploadedUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Imágenes Subidas ({uploadedUrls.length})</CardTitle>
            <CardDescription>
              Las URLs públicas de tus imágenes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedUrls.map((url, index) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-lg overflow-hidden border bg-muted"
                >
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(url)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-xs text-white truncate font-mono">
                      {url.split('/').pop()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
