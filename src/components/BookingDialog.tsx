import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarBlank, Users, SignIn } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accommodationId: string
  roomTypeId: string
  onConfirm: () => void
  onLoginRequired?: () => void
}

export function BookingDialog({ 
  open, 
  onOpenChange, 
  accommodationId, 
  roomTypeId,
  onConfirm,
  onLoginRequired
}: BookingDialogProps) {
  const { isAuthenticated, user } = useAuth()
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState('2')

  const handleContinue = async () => {
    if (!isAuthenticated) {
      if (onLoginRequired) {
        onLoginRequired()
      }
      return
    }

    if (!checkIn || !checkOut) {
      return
    }

    const bookingData = {
      accommodationId,
      roomTypeId,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: parseInt(guests),
      userId: user?.id
    }

    await window.spark.kv.set('temp-booking-data', bookingData)
    onConfirm()
  }

  const isValid = checkIn && checkOut && checkOut > checkIn

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Selecciona las fechas de tu estadía</DialogTitle>
          <DialogDescription>
            Elige las fechas de check-in y check-out y el número de huéspedes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Fecha de entrada</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarBlank size={16} className="mr-2" />
                  {checkIn ? format(checkIn, "PPP", { locale: es }) : "Selecciona fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Fecha de salida</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                  disabled={!checkIn}
                >
                  <CalendarBlank size={16} className="mr-2" />
                  {checkOut ? format(checkOut, "PPP", { locale: es }) : "Selecciona fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => !checkIn || date <= checkIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Número de huéspedes</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona huéspedes" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {num} {num === 1 ? 'huésped' : 'huéspedes'}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isAuthenticated && (
            <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
              <SignIn size={20} className="text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Inicia sesión</strong> para continuar con tu reserva
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleContinue} disabled={!isValid} className="flex-1 gap-2">
            {!isAuthenticated ? (
              <>
                <SignIn size={18} />
                Iniciar Sesión para Reservar
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
