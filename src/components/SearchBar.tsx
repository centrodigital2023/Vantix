import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { REGIONS } from '@/lib/data'

interface SearchBarProps {
  onSearch?: (query: string, filters: { region?: string; priceRange?: string }) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState<string>()
  const [priceRange, setPriceRange] = useState<string>()
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, { region, priceRange })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            id="search-query"
            placeholder="Buscar destinos, experiencias, alojamientos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button 
          size="lg" 
          onClick={handleSearch}
          className="px-6"
        >
          Buscar
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="px-4"
        >
          <Funnel size={20} />
        </Button>
      </div>

      {showFilters && (
        <div className="flex gap-4 flex-wrap">
          <Select value={region || undefined} onValueChange={setRegion}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.filter(r => r && r.trim() !== '').map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange || undefined} onValueChange={setPriceRange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Rango de precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Económico</SelectItem>
              <SelectItem value="mid">Medio</SelectItem>
              <SelectItem value="luxury">Lujo</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            onClick={() => {
              setRegion(undefined)
              setPriceRange(undefined)
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}