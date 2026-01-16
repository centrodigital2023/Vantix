import { supabase } from './supabase'

/**
 * Servicio para gestionar la carga de fotos a Supabase Storage
 */

export interface UploadResult {
  url: string
  path: string
  publicUrl: string
}

const BUCKET_NAME = 'property-photos'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

/**
 * Inicializa el bucket de fotos si no existe
 */
export async function initializePhotoStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets()
    
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME)
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
      })
      
      if (error) {
        console.error('Error creando bucket:', error)
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('Error inicializando storage:', error)
    return false
  }
}

/**
 * Sube una foto a Supabase Storage
 */
export async function uploadPropertyPhoto(
  file: File,
  propertyId: string,
  index: number
): Promise<UploadResult | null> {
  try {
    // Validar tamaño
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`El archivo es muy grande. Máximo ${MAX_FILE_SIZE / 1024 / 1024}MB`)
    }

    // Generar nombre único
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 9)
    const extension = file.name.split('.').pop()
    const fileName = `${propertyId}/${timestamp}_${index}_${randomStr}.${extension}`

    // Subir archivo
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error subiendo foto:', error)
      return null
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return {
      url: urlData.publicUrl,
      path: fileName,
      publicUrl: urlData.publicUrl
    }
  } catch (error) {
    console.error('Error en uploadPropertyPhoto:', error)
    return null
  }
}

/**
 * Sube múltiples fotos
 */
export async function uploadMultiplePhotos(
  files: File[],
  propertyId: string,
  onProgress?: (index: number, total: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const result = await uploadPropertyPhoto(file, propertyId, i)
    
    if (result) {
      results.push(result)
    }
    
    onProgress?.(i + 1, files.length)
  }

  return results
}

/**
 * Elimina una foto de Supabase Storage
 */
export async function deletePropertyPhoto(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      console.error('Error eliminando foto:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error en deletePropertyPhoto:', error)
    return false
  }
}

/**
 * Elimina todas las fotos de una propiedad
 */
export async function deleteAllPropertyPhotos(propertyId: string): Promise<boolean> {
  try {
    // Listar todos los archivos de la propiedad
    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(propertyId)

    if (listError || !files) {
      console.error('Error listando fotos:', listError)
      return false
    }

    // Eliminar todos los archivos
    const filePaths = files.map(file => `${propertyId}/${file.name}`)
    
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filePaths)

    if (deleteError) {
      console.error('Error eliminando fotos:', deleteError)
      return false
    }

    return true
  } catch (error) {
    console.error('Error en deleteAllPropertyPhotos:', error)
    return false
  }
}

/**
 * Obtiene la URL pública de una foto
 */
export function getPhotoPublicUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return data.publicUrl
}

/**
 * Reordena fotos actualizando sus nombres
 */
export async function reorderPropertyPhotos(
  propertyId: string,
  photoOrder: string[]
): Promise<boolean> {
  try {
    // Esta función actualizaría el orden en la base de datos
    // Por ahora, solo retornamos true
    // En producción, esto debería actualizar una tabla de fotos
    console.log('Reordenando fotos:', propertyId, photoOrder)
    return true
  } catch (error) {
    console.error('Error reordenando fotos:', error)
    return false
  }
}

/**
 * Guarda metadatos de foto en la base de datos
 */
export async function savePhotoMetadata(
  propertyId: string,
  photoData: {
    url: string
    path: string
    order: number
    aiAnalysis?: {
      quality: number
      brightness: number
      composition: number
    }
  }
): Promise<boolean> {
  try {
    // Insertar metadatos en tabla property_photos
    const { error } = await supabase
      .from('property_photos')
      .insert({
        property_id: propertyId,
        photo_url: photoData.url,
        storage_path: photoData.path,
        display_order: photoData.order,
        ai_quality_score: photoData.aiAnalysis?.quality,
        ai_brightness_score: photoData.aiAnalysis?.brightness,
        ai_composition_score: photoData.aiAnalysis?.composition,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error guardando metadatos:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error en savePhotoMetadata:', error)
    return false
  }
}

/**
 * Obtiene todas las fotos de una propiedad
 */
export async function getPropertyPhotos(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from('property_photos')
      .select('*')
      .eq('property_id', propertyId)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error obteniendo fotos:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error en getPropertyPhotos:', error)
    return []
  }
}
