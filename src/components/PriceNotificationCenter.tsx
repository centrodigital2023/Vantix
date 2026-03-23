import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Bell, ChartLineDown, ChartLineUp } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useFavorites } from '@/hooks/use-favorites'

export function PriceNotificationCenter() {
  const { priceNotifications, unviewedNotificationsCount, markNotificationViewed, clearNotifications } = useFavorites()
  const [open, setOpen] = useState(false)

  const handleNotificationClick = (notificationId: string) => {
    markNotificationViewed(notificationId)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell size={24} weight={unviewedNotificationsCount > 0 ? 'fill' : 'regular'} />
          {unviewedNotificationsCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            >
              {unviewedNotificationsCount}
            </motion.div>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span>Notificaciones de precio</span>
            {priceNotifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
                className="h-8 text-xs"
              >
                Limpiar todo
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {priceNotifications.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Bell size={48} weight="thin" className="mx-auto text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No tienes notificaciones de precios
              </p>
              <p className="text-xs text-muted-foreground">
                Te avisaremos cuando el precio de tus favoritos cambie
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {priceNotifications.map((notification, index) => {
                const isDecrease = notification.changePercentage < 0
                const Icon = isDecrease ? ChartLineDown : ChartLineUp

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        !notification.viewed ? 'border-accent/50 bg-accent/5' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isDecrease ? 'bg-success/20' : 'bg-warning/20'
                        }`}>
                          <Icon 
                            size={20} 
                            weight="bold" 
                            className={isDecrease ? 'text-success' : 'text-warning'}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-semibold text-sm line-clamp-2">
                              {notification.favoriteName}
                            </p>
                            {!notification.viewed && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                                Nuevo
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground line-through">
                              ${notification.oldPrice.toLocaleString()}
                            </span>
                            <span className={`text-sm font-bold ${
                              isDecrease ? 'text-success' : 'text-warning'
                            }`}>
                              ${notification.newPrice.toLocaleString()}
                            </span>
                            <Badge 
                              variant={isDecrease ? 'default' : 'secondary'}
                              className={`text-xs ${
                                isDecrease ? 'bg-success/20 text-success hover:bg-success/30' : 'bg-warning/20 text-warning hover:bg-warning/30'
                              }`}
                            >
                              {isDecrease ? '' : '+'}
                              {Math.abs(notification.changePercentage).toFixed(1)}%
                            </Badge>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.timestamp), { 
                              addSuffix: true, 
                              locale: es 
                            })}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
