import { useEffect, useState, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'

export interface RealtimeEntity {
  id: string
  type: 'host' | 'service' | 'tourist'
  status: 'online' | 'offline' | 'away'
  lastActivity: number
  data: any
}

export function useRealtimeSync<T extends RealtimeEntity>(entityType: string) {
  const [entities, setEntities] = useKV<T[]>(`realtime-${entityType}`, [])
  const [isConnected, setIsConnected] = useState(true)
  const [lastSync, setLastSync] = useState(Date.now())

  const safeEntities = entities || []

  const updateEntity = useCallback((entity: T) => {
    setEntities((current) => {
      const safeEntities = current || []
      const existing = safeEntities.find(e => e.id === entity.id)
      if (existing) {
        return safeEntities.map(e => e.id === entity.id ? entity : e)
      }
      return [...safeEntities, entity]
    })
    setLastSync(Date.now())
  }, [setEntities])

  const removeEntity = useCallback((entityId: string) => {
    setEntities((current) => (current || []).filter(e => e.id !== entityId))
    setLastSync(Date.now())
  }, [setEntities])

  const markOnline = useCallback((entityId: string) => {
    setEntities((current) =>
      (current || []).map(e => e.id === entityId ? { ...e, status: 'online' as const, lastActivity: Date.now() } : e)
    )
  }, [setEntities])

  const markOffline = useCallback((entityId: string) => {
    setEntities((current) =>
      (current || []).map(e => e.id === entityId ? { ...e, status: 'offline' as const } : e)
    )
  }, [setEntities])

  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      const now = Date.now()
      setEntities((current) => 
        (current || []).map(e => {
          const inactiveTime = now - e.lastActivity
          if (inactiveTime > 300000) {
            return { ...e, status: 'offline' as const }
          } else if (inactiveTime > 60000) {
            return { ...e, status: 'away' as const }
          }
          return e
        })
      )
    }, 30000)

    return () => clearInterval(heartbeatInterval)
  }, [setEntities])

  return {
    entities: entities || [],
    isConnected,
    lastSync,
    updateEntity,
    removeEntity,
    markOnline,
    markOffline
  }
}

export function usePresence(userId: string, userType: 'host' | 'tourist' | 'service') {
  const { updateEntity, markOnline, markOffline } = useRealtimeSync(userType + 's')

  useEffect(() => {
    markOnline(userId)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        markOffline(userId)
      } else {
        markOnline(userId)
      }
    }

    const handleBeforeUnload = () => {
      markOffline(userId)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      markOffline(userId)
    }
  }, [userId, markOnline, markOffline])

  return { updateEntity, markOnline, markOffline }
}
