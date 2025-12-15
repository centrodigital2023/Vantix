import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, Trash, Sparkle, Calendar, CloudSun, CurrencyDollar, Users } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useNotifications, Notification } from '@/hooks/use-notifications'
import { PageRoute } from '@/lib/types'

interface NotificationCenterProps {
  onNavigate?: (page: PageRoute, id?: string) => void
}

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const {
    notifications,
    unreadCount,
    preferences,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    updatePreferences,
    requestPermission
  } = useNotifications()

  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'recommendation':
        return <Sparkle size={20} className="text-accent" weight="fill" />
      case 'event':
        return <Calendar size={20} className="text-primary" weight="fill" />
      case 'weather':
        return <CloudSun size={20} className="text-secondary" weight="fill" />
      case 'price':
        return <CurrencyDollar size={20} className="text-accent" weight="fill" />
      case 'collaborative':
        return <Users size={20} className="text-primary" weight="fill" />
      default:
        return <Bell size={20} />
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    
    if (onNavigate) {
      if (notification.accommodationId) {
        onNavigate('detalle-alojamiento', notification.accommodationId)
      } else if (notification.destinationId) {
        onNavigate('destino-resultados')
      }
    }
    
    setIsOpen(false)
  }

  const handleEnableNotifications = async () => {
    const permission = await requestPermission()
    if (permission === 'granted') {
      updatePreferences({ enabled: true })
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell size={24} weight={unreadCount > 0 ? 'fill' : 'regular'} />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            variant="destructive"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 z-50 w-96 max-w-[calc(100vw-2rem)]"
            >
              <Card className="shadow-2xl border-2">
                <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center gap-2">
                    <Bell size={24} weight="fill" className="text-primary" />
                    <h3 className="font-semibold text-lg">Notificaciones</h3>
                    {unreadCount > 0 && (
                      <Badge variant="secondary">{unreadCount} nuevas</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      ⚙️
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                </div>

                {showSettings ? (
                  <div className="p-4 space-y-4">
                    <h4 className="font-semibold">Configuración de Notificaciones</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Activar notificaciones</span>
                        <Switch
                          checked={preferences.enabled}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleEnableNotifications()
                            } else {
                              updatePreferences({ enabled: false })
                            }
                          }}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Alertas de precios</span>
                        <Switch
                          checked={preferences.priceAlerts}
                          onCheckedChange={(checked) => updatePreferences({ priceAlerts: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Eventos próximos</span>
                        <Switch
                          checked={preferences.eventAlerts}
                          onCheckedChange={(checked) => updatePreferences({ eventAlerts: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Clima recomendado</span>
                        <Switch
                          checked={preferences.weatherAlerts}
                          onCheckedChange={(checked) => updatePreferences({ weatherAlerts: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Recomendaciones colaborativas</span>
                        <Switch
                          checked={preferences.collaborativeAlerts}
                          onCheckedChange={(checked) => updatePreferences({ collaborativeAlerts: checked })}
                        />
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowSettings(false)}
                    >
                      Volver
                    </Button>
                  </div>
                ) : (
                  <>
                    {notifications.length > 0 && (
                      <div className="p-3 border-b flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          disabled={unreadCount === 0}
                        >
                          <Check size={16} className="mr-1" />
                          Marcar todas
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAll}
                        >
                          <Trash size={16} className="mr-1" />
                          Limpiar todo
                        </Button>
                      </div>
                    )}

                    <ScrollArea className="h-[500px]">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Bell size={48} className="mx-auto mb-3 opacity-30" />
                          <p className="font-medium">No tienes notificaciones</p>
                          <p className="text-sm mt-1">Te avisaremos cuando haya algo nuevo</p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {notifications.map((notification, index) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer relative ${
                                !notification.read ? 'bg-primary/5' : ''
                              }`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-muted-foreground">
                                      {formatTimestamp(notification.timestamp)}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteNotification(notification.id)
                                      }}
                                    >
                                      <X size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Ahora'
  if (minutes < 60) return `Hace ${minutes}m`
  if (hours < 24) return `Hace ${hours}h`
  if (days < 7) return `Hace ${days}d`
  
  return new Date(timestamp).toLocaleDateString('es-CO', { 
    month: 'short', 
    day: 'numeric' 
  })
}
