import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MagnifyingGlass, MapPin, CalendarBlank, Users, Minus, Plus } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { SearchFilters } from '@/lib/types'

interface AdvancedSearchBarProps {
  onSearch: (filters: SearchFilters) => void
  variant?: 'hero' | 'compact'
}

export function AdvancedSearchBar({ onSearch, variant = 'hero' }: AdvancedSearchBarProps) {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [showGuestsPopover, setShowGuestsPopover] = useState(false)

  const handleSearch = () => {
    onSearch({
      destination,
      checkIn: checkIn?.toISOString(),
      checkOut: checkOut?.toISOString(),
      guests: adults + children,
      rooms
    })
  }

  const isHero = variant === 'hero'

  return (
    <div 
      className={cn(
        "bg-card border rounded-lg shadow-xl",
        isHero ? "p-6 md:p-8" : "p-4"
      )}
    >
      <div className={cn(
        "grid gap-4",
        isHero ? "md:grid-cols-4" : "grid-cols-1 md:grid-cols-5"
      )}>
        <div className="space-y-2">
          <Label htmlFor="destination" className="flex items-center gap-2">
            <MapPin size={16} weight="fill" className="text-primary" />
            Coordenadas
          </Label>
          <Input
            id="destination"
            placeholder="¿Dónde quieres despertar?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CalendarBlank size={16} weight="fill" className="text-primary" />
            Llegada
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                {checkIn ? format(checkIn, 'dd MMM yyyy', { locale: es }) : 'Seleccionar fecha'}
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
          <Label className="flex items-center gap-2">
            <CalendarBlank size={16} weight="fill" className="text-primary" />
            Salida
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                {checkOut ? format(checkOut, 'dd MMM yyyy', { locale: es }) : 'Seleccionar fecha'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users size={16} weight="fill" className="text-primary" />
            Huéspedes y habitaciones
          </Label>
          <Popover open={showGuestsPopover} onOpenChange={setShowGuestsPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal"
              >
                {adults + children} huésped{adults + children !== 1 ? 's' : ''}, {rooms} hab.
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adultos</div>
                    <div className="text-sm text-muted-foreground">Mayores de 12 años</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(adults + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Niños</div>
                    <div className="text-sm text-muted-foreground">0-12 años</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(children + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Habitaciones</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      disabled={rooms <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center">{rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRooms(rooms + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setShowGuestsPopover(false)}
                >
                  Listo
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className={cn(
          "flex items-end",
          isHero ? "" : "md:col-span-1"
        )}>
          <Button 
            size="lg" 
            className="w-full h-12 bg-primary hover:bg-primary/90"
            onClick={handleSearch}
          >
            <MagnifyingGlass size={20} weight="bold" className="mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}
