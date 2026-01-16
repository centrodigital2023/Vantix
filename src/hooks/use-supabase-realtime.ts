import { useEffect, useState, useCallback } from 'react'
import { createClient, SupabaseClient, Real
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js'
import { toast } from 'sonner'

  table: string

  onUpdate?: (payload: any) => v
  onChange?: (p

  const [supabase
  const [isConnected, setIsConnecte

    if (!supabaseUrl || !supabaseKe
    }
 

    if (!supabase || subscriptions.length === 0) {
    }
    const newChannels: RealtimeChannel[] = []
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
      
      let channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          {
            event: subscription.event || '*',
            schema: 'public',
            table: subscription.table,
            filter: subscription.filter
          },
          (payload) => {
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
      setIsConnected(false)
  }, [supabaseUrl, supabaseKey, subscriptio
  return {
    isConfigured: Boolean(supabaseUrl && supabaseK
}
export function useSupabaseRealti
  initialQu
  const [s

  const [error, setError] = use
  cons

    return createClient(supa

    const supabase
      setLoading(false)
    }
    try 
      let query = supabase.
     
          query = query.eq(key, value)

      if (
          ascend
      }
   
 

      if (queryError) {
      }
      setData(result
   
      toast.error('Error al cargar datos', {
      })
      setLoading(false)
  }, [table, initialQuery, getSupabaseClient])
  useEffect(() => {

  useEffect(() => {
    if (!supabase) {
    }
    c
      .on(
        {

        } as any,
          if (payload.eventType === 'INS
          } else if 
              current.m
            
     

         
      )


  }, [table, getSupabaseClient])
  return {
    loading,
    refetc
  }















































































