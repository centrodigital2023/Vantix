import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { Explorar } from '@/pages/Explorar'
import { Itinerario } from '@/pages/Itinerario'
import { Blog } from '@/pages/Blog'
import { Contacto } from '@/pages/Contacto'
import { Propietarios } from '@/pages/Propietarios'
import { RegistroAlojamiento } from '@/pages/RegistroAlojamiento'
import { DestinoResultados } from '@/pages/DestinoResultados'
import { DetalleAlojamiento } from '@/pages/DetalleAlojamiento'
import { Aventura } from '@/pages/categorias/Aventura'
import { Bienestar } from '@/pages/categorias/Bienestar'
import { Cultural } from '@/pages/categorias/Cultural'
import { Familiar } from '@/pages/categorias/Familiar'
import { Gastronomia } from '@/pages/categorias/Gastronomia'
import { Naturaleza } from '@/pages/categorias/Naturaleza'
import { Negocios } from '@/pages/categorias/Negocios'
import { Playa } from '@/pages/categorias/Playa'
import { Religioso } from '@/pages/categorias/Religioso'
import { Rural } from '@/pages/categorias/Rural'
import { PageRoute } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { AuthProvider } from '@/contexts/AuthContext'
import { useInitializeSync } from '@/hooks/use-category-data'
import { generateSampleAccommodations } from '@/lib/sample-data'

function App() {
  const [currentPage, setCurrentPage] = useKV<PageRoute>('current-page', 'home')
  const [selectedAccommodationId, setSelectedAccommodationId] = useKV<string>('selected-accommodation-id', '')
  const [accommodations, setAccommodations] = useKV<any[]>('accommodations-data', [])
  
  useInitializeSync()

  useEffect(() => {
    if (!accommodations || accommodations.length === 0) {
      const sampleData = generateSampleAccommodations()
      setAccommodations(() => sampleData)
    }
  }, [])

  const handleNavigate = (page: PageRoute, accommodationId?: string) => {
    setCurrentPage(() => page)
    if (accommodationId) {
      setSelectedAccommodationId(() => accommodationId)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activePage = currentPage || 'home'

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />
      case 'explorar':
        return <Explorar onNavigate={handleNavigate} />
      case 'itinerario':
        return <Itinerario />
      case 'blog':
        return <Blog />
      case 'contacto':
        return <Contacto />
      case 'propietarios':
        return <Propietarios onNavigate={handleNavigate} />
      case 'registro-alojamiento':
        return <RegistroAlojamiento />
      case 'destino-resultados':
        return <DestinoResultados />
      case 'detalle-alojamiento':
        return (
          <DetalleAlojamiento
            accommodationId={selectedAccommodationId || ''}
            onClose={() => handleNavigate('destino-resultados')}
            onBook={(roomId) => console.log('Booking room:', roomId)}
          />
        )
      case 'categoria-aventura':
        return <Aventura />
      case 'categoria-bienestar':
        return <Bienestar />
      case 'categoria-cultural':
        return <Cultural />
      case 'categoria-familiar':
        return <Familiar />
      case 'categoria-gastronomia':
        return <Gastronomia />
      case 'categoria-naturaleza':
        return <Naturaleza />
      case 'categoria-negocios':
        return <Negocios />
      case 'categoria-playa':
        return <Playa />
      case 'categoria-religioso':
        return <Religioso />
      case 'categoria-rural':
        return <Rural />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <AuthProvider>
      <Navbar currentPage={activePage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      <Toaster />
    </AuthProvider>
  )
}

export default App