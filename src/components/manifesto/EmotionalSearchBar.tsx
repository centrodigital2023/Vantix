import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'

interface EmotionalSearchBarProps {
  onSearch?: (query: string) => void
}

export function EmotionalSearchBar({ onSearch }: EmotionalSearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-accent/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative flex items-center bg-card/50 backdrop-blur-sm border border-accent/20 rounded-lg overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="No digas a dónde vas. Dinos qué necesitas sentir..."
            className="flex-1 px-6 py-5 bg-transparent text-foreground placeholder:text-muted-foreground/60 font-mono-tech text-sm focus:outline-none"
          />
          <Button
            onClick={handleSearch}
            className="m-2 bg-accent hover:bg-accent/90 text-accent-foreground font-mono-tech gap-2"
          >
            Encontrar mi Coordenada
            <ArrowRight size={18} weight="bold" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
