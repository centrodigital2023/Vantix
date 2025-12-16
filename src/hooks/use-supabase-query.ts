import { useState, useEffect } from 'react'
import { supabase, Database } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

type Tables = Database['public']['Tables']

export function useSupabaseQuery<T extends keyof Tables>(
  table: T,
  options?: {
    select?: string
    filter?: Record<string, any>
    order?: { column: string; ascending?: boolean }
    limit?: number
    single?: boolean
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][] | Tables[T]['Row'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let query = supabase.from(table).select(options?.select || '*')

        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        if (options?.order) {
          query = query.order(options.order.column, {
            ascending: options.order.ascending ?? true,
          })
        }

        if (options?.limit) {
          query = query.limit(options.limit)
        }

        if (options?.single) {
          const { data, error } = await query.single()
          setData(data as any)
          setError(error)
        } else {
          const { data, error } = await query
          setData(data as any)
          setError(error)
        }
      } catch (err) {
        setError(err as PostgrestError)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, JSON.stringify(options)])

  return { data, loading, error, refetch: () => setLoading(true) }
}

export function useSupabaseMutation<T extends keyof Tables>(table: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const insert = async (data: Tables[T]['Insert'] | Tables[T]['Insert'][]) => {
    try {
      setLoading(true)
      setError(null)
      const { data: result, error } = await supabase
        .from(table)
        .insert(data as any)
        .select()
      
      if (error) throw error
      return { data: result, error: null }
    } catch (err) {
      const postgrestError = err as PostgrestError
      setError(postgrestError)
      return { data: null, error: postgrestError }
    } finally {
      setLoading(false)
    }
  }

  const update = async (
    id: string,
    data: Tables[T]['Update']
  ) => {
    try {
      setLoading(true)
      setError(null)
      const { data: result, error } = await supabase
        .from(table)
        .update(data as any)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data: result, error: null }
    } catch (err) {
      const postgrestError = err as PostgrestError
      setError(postgrestError)
      return { data: null, error: postgrestError }
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (err) {
      const postgrestError = err as PostgrestError
      setError(postgrestError)
      return { error: postgrestError }
    } finally {
      setLoading(false)
    }
  }

  return { insert, update, remove, loading, error }
}
