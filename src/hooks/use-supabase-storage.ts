import { useState, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

interface UploadProgress {
  id: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  url?: string
  error?: string
}

interface UseSupabaseStorageOptions {
  bucket: string
  maxSizeMB?: number
  allowedTypes?: string[]
  onUploadComplete?: (urls: string[]) => void
}

export function useSupabaseStorage(options: UseSupabaseStorageOptions) {
  const { bucket, maxSizeMB = 10, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'], onUploadComplete } = options

  const [supabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [uploads, setUploads] = useState<UploadProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const getSupabaseClient = useCallback((): SupabaseClient | null => {
    if (!supabaseUrl || !supabaseKey) {
      toast.error('Supabase no está configurado', {
        description: 'Configura las credenciales de Supabase primero'
      })
      return null
    }
    return createClient(supabaseUrl, supabaseKey)
  }, [supabaseUrl, supabaseKey])

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: `Formato no soportado: ${file.type}` }
    }

    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      return { valid: false, error: `Archivo muy grande: ${sizeMB.toFixed(1)}MB (máx: ${maxSizeMB}MB)` }
    }

    return { valid: true }
  }, [allowedTypes, maxSizeMB])

  const uploadFile = useCallback(async (file: File, folder?: string): Promise<string> => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      throw new Error('Supabase no configurado')
    }

    const validation = validateFile(file)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    setUploads(prev => [...prev, {
      id: uploadId,
      fileName: file.name,
      progress: 0,
      status: 'uploading'
    }])

    try {
      setUploads(prev => prev.map(u => 
        u.id === uploadId ? { ...u, progress: 30 } : u
      ))

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw error
      }

      setUploads(prev => prev.map(u => 
        u.id === uploadId ? { ...u, progress: 70, status: 'processing' } : u
      ))

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      const publicUrl = urlData.publicUrl

      setUploads(prev => prev.map(u => 
        u.id === uploadId ? { ...u, progress: 100, status: 'completed', url: publicUrl } : u
      ))

      toast.success('Archivo cargado', {
        description: file.name
      })

      return publicUrl

    } catch (error: any) {
      setUploads(prev => prev.map(u => 
        u.id === uploadId ? { ...u, status: 'error', error: error.message } : u
      ))

      toast.error('Error al subir archivo', {
        description: error.message
      })

      throw error
    }
  }, [bucket, getSupabaseClient, validateFile])

  const uploadFiles = useCallback(async (files: File[], folder?: string): Promise<string[]> => {
    setIsUploading(true)
    const urls: string[] = []

    try {
      for (const file of files) {
        try {
          const url = await uploadFile(file, folder)
          urls.push(url)
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)
        }
      }

      if (urls.length > 0 && onUploadComplete) {
        onUploadComplete(urls)
      }

      return urls
    } finally {
      setIsUploading(false)
    }
  }, [uploadFile, onUploadComplete])

  const deleteFile = useCallback(async (filePath: string): Promise<void> => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      throw new Error('Supabase no configurado')
    }

    try {
      const path = filePath.split(`${bucket}/`)[1]
      
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) {
        throw error
      }

      toast.success('Archivo eliminado')
    } catch (error: any) {
      toast.error('Error al eliminar archivo', {
        description: error.message
      })
      throw error
    }
  }, [bucket, getSupabaseClient])

  const listFiles = useCallback(async (folder?: string): Promise<any[]> => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return []
    }

    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) {
        throw error
      }

      return data || []
    } catch (error: any) {
      toast.error('Error al listar archivos', {
        description: error.message
      })
      return []
    }
  }, [bucket, getSupabaseClient])

  const clearUploads = useCallback(() => {
    setUploads([])
  }, [])

  return {
    uploads,
    isUploading,
    uploadFile,
    uploadFiles,
    deleteFile,
    listFiles,
    clearUploads,
    isConfigured: Boolean(supabaseUrl && supabaseKey)
  }
}
