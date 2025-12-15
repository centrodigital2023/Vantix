import { useKV } from '@github/spark/hooks'
import { useCallback, useEffect, useState } from 'react'

export interface Notification {
  id: string
  title: string
  message: string
  category: string
  destinationId?: string
  accommodationId?: string
  timestamp: number
  read: boolean
  priority: 'high' | 'medium' | 'low'
  type: 'recommendation' | 'event' | 'weather' | 'price' | 'collaborative'
  image?: string
  actionUrl?: string
}

export interface NotificationPreferences {
  enabled: boolean
  categories: string[]
  priceAlerts: boolean
  eventAlerts: boolean
  weatherAlerts: boolean
  collaborativeAlerts: boolean
  minPriority: 'high' | 'medium' | 'low'
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: true,
  categories: [],
  priceAlerts: true,
  eventAlerts: true,
  weatherAlerts: true,
  collaborativeAlerts: true,
  minPriority: 'low'
}

export function useNotifications() {
  const [notifications, setNotifications] = useKV<Notification[]>('user-notifications', [])
  const [preferences, setPreferences] = useKV<NotificationPreferences>('notification-preferences', DEFAULT_PREFERENCES)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const currentNotifications = notifications || []
    const count = currentNotifications.filter(n => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const prefs = preferences || DEFAULT_PREFERENCES
    
    if (!prefs.enabled) return

    if (prefs.categories.length > 0 && notification.category && !prefs.categories.includes(notification.category)) {
      return
    }

    if (!shouldShowNotification(notification.type, notification.priority, prefs)) {
      return
    }

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false
    }

    setNotifications(current => {
      const currentArray = current || []
      const updated = [newNotification, ...currentArray]
      
      if (updated.length > 100) {
        return updated.slice(0, 100)
      }
      return updated
    })

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notification.title, {
          body: notification.message,
          icon: notification.image || '/icon.png',
          badge: '/badge.png',
          tag: newNotification.id
        })
      } catch (error) {
        console.log('Browser notification failed:', error)
      }
    }
  }, [preferences, setNotifications])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(current => {
      return (current || []).map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    })
  }, [setNotifications])

  const markAllAsRead = useCallback(() => {
    setNotifications(current => {
      return (current || []).map(n => ({ ...n, read: true }))
    })
  }, [setNotifications])

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(current => {
      return (current || []).filter(n => n.id !== notificationId)
    })
  }, [setNotifications])

  const clearAll = useCallback(() => {
    setNotifications(() => [])
  }, [setNotifications])

  const updatePreferences = useCallback((newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(current => ({
      ...(current || DEFAULT_PREFERENCES),
      ...newPreferences
    }))
  }, [setPreferences])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return 'not-supported'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission
    }

    return Notification.permission
  }, [])

  return {
    notifications: notifications || [],
    unreadCount,
    preferences: preferences || DEFAULT_PREFERENCES,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    updatePreferences,
    requestPermission
  }
}

function shouldShowNotification(
  type: Notification['type'],
  priority: Notification['priority'],
  preferences: NotificationPreferences
): boolean {
  const priorityLevels = { low: 0, medium: 1, high: 2 }
  const minLevel = priorityLevels[preferences.minPriority]
  const currentLevel = priorityLevels[priority]

  if (currentLevel < minLevel) return false

  switch (type) {
    case 'price':
      return preferences.priceAlerts
    case 'event':
      return preferences.eventAlerts
    case 'weather':
      return preferences.weatherAlerts
    case 'collaborative':
      return preferences.collaborativeAlerts
    default:
      return true
  }
}

export function createWeatherNotification(
  category: string,
  destination: string,
  weatherCondition: string,
  temperature: number
): Omit<Notification, 'id' | 'timestamp' | 'read'> {
  return {
    title: `☀️ Clima ideal para ${category}`,
    message: `${destination} tiene ${temperature}°C perfecto para tus próximas vacaciones`,
    category,
    type: 'weather',
    priority: 'medium'
  }
}

export function createEventNotification(
  eventName: string,
  location: string,
  date: string,
  category: string
): Omit<Notification, 'id' | 'timestamp' | 'read'> {
  return {
    title: `🎉 Evento próximo en ${location}`,
    message: `${eventName} - ${date}. ¡No te lo pierdas!`,
    category,
    type: 'event',
    priority: 'high'
  }
}

export function createCollaborativeNotification(
  accommodationName: string,
  category: string,
  similarUsers: number,
  accommodationId: string
): Omit<Notification, 'id' | 'timestamp' | 'read'> {
  return {
    title: '✨ Nueva recomendación para ti',
    message: `${similarUsers} usuarios con gustos similares recomiendan ${accommodationName}`,
    category,
    accommodationId,
    type: 'collaborative',
    priority: 'medium'
  }
}

export function createPriceAlertNotification(
  accommodationName: string,
  oldPrice: number,
  newPrice: number,
  accommodationId: string
): Omit<Notification, 'id' | 'timestamp' | 'read'> {
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100)
  return {
    title: '💰 Oferta especial',
    message: `${accommodationName} ahora ${discount}% más económico - desde $${newPrice.toLocaleString()}`,
    accommodationId,
    category: 'ofertas',
    type: 'price',
    priority: 'high'
  }
}

export function createRecommendationNotification(
  title: string,
  message: string,
  category: string,
  destinationId?: string
): Omit<Notification, 'id' | 'timestamp' | 'read'> {
  return {
    title,
    message,
    category,
    destinationId,
    type: 'recommendation',
    priority: 'low'
  }
}
