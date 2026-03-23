import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bell, ChartLineDown, ChartLineUp, X 
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Bell, ChartLineDown, ChartLineUp, X } from '@phosphor-icons/react'
import { useFavorites } from '@/hooks/use-favorites'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function PriceNotificationCenter() {
  const { priceNotifications, unviewedNotificationsCount, markNotificationViewed, clearNotifications } = useFavorites()
  const [open, setOpen] = useState(false)

  const handleNotificationClick = (notificationId: string) => {
    <Sheet open={open} onOpenChange={setOp
   

          
              className="absolute -top-1 -righ
              <Badge 
                className="h-5 min-w-5 flex items-center justify-
                {unviewedNotificationsCount}
            </motion.div>
        </Button>

        <SheetHeader className="spac
            <SheetTitle className="flex items-cent
             
            {priceNot
                variant="ghost"
                className="h-5 min-w-5 flex items-center justify-center p-0 px-1 bg-accent text-accent-foreground animate-pulse-glow"
              >
                {unviewedNotificationsCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell size={24} weight="fill" className="text-primary" />
              Notificaciones de Precios
            </SheetTitle>
            {priceNotifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
                className="text-xs"
              >
                Limpiar todo
              </Button>
            )}
          </div>
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
  )





















