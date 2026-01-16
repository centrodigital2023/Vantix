import { useEffect, useState, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js'
import { toast } from 'sonner'

type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*'

interface RealtimeSubscription {
  table: string
  event?: RealtimeEvent
  filter?: string
  onInsert?: (payload: any) => void
  onUpdate?: (payload: any) => void
  onDelete?: (payload: any) => void
  onChange?: (payload: any) => void
}

export function useSupabaseRealtime(subscriptions: RealtimeSubscription[]) {
  const [supabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [isConnected, setIsConnected] = useState(false)
  const [channels, setChannels] = useState<RealtimeChannel[]>([])

  const getSupabaseClient = useCallback((): SupabaseClient | null => {
    if (!supabaseUrl || !supabaseKey) {
      return null
    }
    return createClient(supabaseUrl, supabaseKey)
  }, [supabaseUrl, supabaseKey])

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase || subscriptions.length === 0) {
      return
    }

    const newChannels: RealtimeChannel[] = []

    subscriptions.forEach((subscription, index) => {
      const channelName = `realtime_${subscription.table}_${index}`
      
      const channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes' as any,
          {
            event: subscription.event || '*',
            schema: 'public',
            table: subscription.table,
            filter: subscription.filter
          } as any,
          (payload: any) => {
            if (subscription.onChange) {
              subscription.onChange(payload)
            }

            switch (payload.eventType) {
              case 'INSERT':
                if (subscription.onInsert) {
                  subscription.onInsert(payload.new)
                  toast.success(`Nuevo registro en ${subscription.table}`)
                }
                break
              case 'UPDATE':
                if (subscription.onUpdate) {
                  subscription.onUpdate(payload.new)
                  toast.info(`Registro actualizado en ${subscription.table}`)
                }
                break
              case 'DELETE':
                if (subscription.onDelete) {
                  subscription.onDelete(payload.old)
                  toast.info(`Registro eliminado de ${subscription.table}`)
                }
                break
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsConnected(true)
          } else if (status === 'CLOSED') {
            setIsConnected(false)
          } else if (status === 'CHANNEL_ERROR') {
            toast.error('Error en la conexión en tiempo real')
            setIsConnected(false)
          }
        })

      newChannels.push(channel)
    })

    setChannels(newChannels)

    return () => {
      newChannels.forEach(channel => {
        supabase.removeChannel(channel)
      })
      setIsConnected(false)
    }
  }, [supabaseUrl, supabaseKey, subscriptions, getSupabaseClient])

  return {
    isConnected,
    isConfigured: Boolean(supabaseUrl && supabaseKey)
  }
}

export function useSupabaseRealtimeQuery<T = any>(
  table: string,
  initialQuery?: any
) {
  const [supabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const getSupabaseClient = useCallback((): SupabaseClient | null => {
    if (!supabaseUrl || !supabaseKey) {
      return null
    }
    return createClient(supabaseUrl, supabaseKey)
  }, [supabaseUrl, supabaseKey])

  const fetchData = useCallback(async () => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      let query = supabase.from(table).select('*')

      if (initialQuery?.filter) {
        Object.entries(initialQuery.filter).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      if (initialQuery?.order) {
        query = query.order(initialQuery.order.column, {
          ascending: initialQuery.order.ascending ?? true
        })
      }

      if (initialQuery?.limit) {
        query = query.limit(initialQuery.limit)
      }

      const { data: result, error: queryError } = await query

      if (queryError) {
        throw queryError
      }

      setData(result || [])
      setError(null)
    } catch (err: any) {
      setError(err)
      toast.error('Error al cargar datos', {
        description: err.message
      })
    } finally {
      setLoading(false)
    }
  }, [table, initialQuery, getSupabaseClient])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return
    }

    const channel = supabase
      .channel(`realtime_query_${table}`)
      .on(
        'postgres_changes' as any,
        {
          event: '*',
          schema: 'public',
          table: table
        } as any,
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            setData((current) => [payload.new as T, ...current])
          } else if (payload.eventType === 'UPDATE') {
            setData((current) =>
              current.map((item: any) =>
                item.id === (payload.new as any).id ? (payload.new as T) : item
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setData((current) =>
              current.filter((item: any) => item.id !== (payload.old as any).id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [table, getSupabaseClient])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    isConfigured: Boolean(supabaseUrl && supabaseKey)
  }
}
