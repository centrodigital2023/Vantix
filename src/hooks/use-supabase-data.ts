import { useState, useCallback } from 'react'
import { supabase, Database } from '@/lib/supabase'
import { toast } from 'sonner'

type TableName = keyof Database['public']['Tables']

export function useSupabaseData<T extends TableName>(tableName: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as Database['public']['Tables'][T]['Row'][]
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar datos'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const fetchById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data as Database['public']['Tables'][T]['Row']
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar registro'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const fetchWithFilter = useCallback(async (filters: Record<string, any>) => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from(tableName).select('*')
      
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
      
      const { data, error } = await query
      
      if (error) throw error
      return data as Database['public']['Tables'][T]['Row'][]
    } catch (err: any) {
      const errorMessage = err.message || 'Error al filtrar datos'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const insert = useCallback(async (data: Database['public']['Tables'][T]['Insert']) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data as any)
        .select()
        .single()
      
      if (error) throw error
      toast.success('Registro creado exitosamente')
      return result as Database['public']['Tables'][T]['Row']
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear registro'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const update = useCallback(async (id: string, data: Database['public']['Tables'][T]['Update']) => {
    setLoading(true)
    setError(null)
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data as any)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      toast.success('Registro actualizado exitosamente')
      return result as Database['public']['Tables'][T]['Row']
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar registro'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const remove = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
      
      if (error) throw error
      toast.success('Registro eliminado exitosamente')
      return true
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar registro'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }, [tableName])

  return {
    fetchAll,
    fetchById,
    fetchWithFilter,
    insert,
    update,
    remove,
    loading,
    error,
  }
}

export function useSupabaseMutation(tableName: string) {
  const [loading, setLoading] = useState(false)

  const insert = useCallback(async (data: any) => {
    setLoading(true)
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .single()
      
      if (error) throw error
      return result
    } catch (err: any) {
      throw err
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const update = useCallback(async (id: string, data: any) => {
    setLoading(true)
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return result
    } finally {
      setLoading(false)
    }
  }, [tableName])

  const remove = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } finally {
      setLoading(false)
    }
  }, [tableName])

  return {
    insert,
    update,
    remove,
    loading
  }
}
