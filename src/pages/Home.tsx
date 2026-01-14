import { PageRoute } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { useEffect } from 'react'
import { 
  HeroManifesto, 
  ManifestoSection, 
  SensorialMarketplace, 
  TechnologySection, 
  ManifestoFooter 
} from '@/components/manifesto'

interface HomeProps {
  onNavigate: (page: PageRoute) => void
}

export function Home({ onNavigate }: HomeProps) {
  const { trackInteraction } = useUserPreferences()

  useEffect(() => {
    trackInteraction({ type: 'view', category: 'home' })
  }, [])

  const handleSearch = (query: string) => {
    trackInteraction({ 
      type: 'search', 
      searchQuery: query 
    })
    onNavigate('destino-resultados')
  }

  const handleCategorySelect = (categoryId: string) => {
    trackInteraction({ 
      type: 'click', 
      category: categoryId 
    })
    // Map emotional categories to existing routes
    const categoryMap: Record<string, PageRoute> = {
      'renacer': 'categoria-naturaleza',
      'euforia': 'categoria-aventura',
      'silencio': 'categoria-bienestar'
    }
    onNavigate(categoryMap[categoryId] || 'explorar')
  }

  const handleUnlock = () => {
    trackInteraction({ type: 'click', category: 'unlock-coordinates' })
    onNavigate('explorar')
  }

  return (
    <div className="manifesto-page bg-[#050505]">
      <HeroManifesto onSearch={handleSearch} />
      <ManifestoSection />
      <SensorialMarketplace onCategorySelect={handleCategorySelect} />
      <TechnologySection />
      <ManifestoFooter onUnlock={handleUnlock} />
    </div>
  )
}