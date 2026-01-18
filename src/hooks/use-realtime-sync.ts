import { useEffect, useState, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'

  type: 'host' | 'service' | 'tou
  lastActivi
}
  status: 'online' | 'offline' | 'away'
  lastActivity: number
  data: any
}

export function useRealtimeSync<T extends RealtimeEntity>(entityType: string) {
    setEntities((current) => {
      const existing = safeEntities.find(e => e.id ===
        return safeEntities.map(e => e.id === entity.i

    setLastSync(Date.now())

    setEntities((current) => (current ||
  }, [setEntities])
  const markOnline = 
      (current || []).map(e => e.id === entityId ? { ...e, status: 'online' as const, lastActivity: Da
    set

    se
    )
  }, [setEntities])

      const now = Date.now()
        (current || []).map(e => {
          if (inactiveTime 
          } else if

        })
    }, 30000)
    return () => clearInterval(heartbeatInterval)

    entities: entities || [
    lastSync,

    markOffline
}
export function usePresence(userId: string, userType: 'host' | 'tourist' | 'service') {

    markOnline(userId)
    const handleVis

        markOnline(
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
    entities,
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


















