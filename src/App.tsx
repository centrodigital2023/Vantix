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
import { ReservaConfirmacion } from '@/pages/ReservaConfirmacion'
import { ReservaExitosa } from '@/pages/ReservaExitosa'
import { MisReservas } from '@/pages/MisReservas'
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
import { FAQ, CentroDeSeguridad, SoporteTurista, ComoReservar, EstadoDeReserva } from '@/pages'
import { Destinos, Tours, Alojamientos, Transportes, ComidaTipica, MapaTuristicoPage } from '@/pages'
import { SobreNosotros, MisionVision, PorQueElegirnos, TestimoniosPage } from '@/pages'
import { Terminos, Privacidad, CookiesPage, ReembolsosPage, CancelacionPage } from '@/pages'
import { TurismosPasto, ToursNarino, QueHacerPasto, LugaresImperdibles } from '@/pages'
import { AventuraPage, NaturalezaPage, CulturaPage, GastronomiaPage, SenderismoPage, FestivalesPage } from '@/pages'
import { GuiaDelViajero, ArticulosPage, NoticiasTurismoPage, AgenciasPage, ColaboradoresPage, AfiliadosPage, GuiasTuristicosPage } from '@/pages'
import { Ofertas, PlanesFinDeSemanaPage, ViajesBaratosPage } from '@/pages'
import { PageRoute } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { AuthProvider } from '@/contexts/AuthContext'
import { useInitializeSync } from '@/hooks/use-category-data'
import { generateSampleAccommodations } from '@/lib/sample-data'
import { BookingDialog } from '@/components/BookingDialog'

function App() {
  const [currentPage, setCurrentPage] = useKV<PageRoute>('current-page', 'home')
  const [selectedAccommodationId, setSelectedAccommodationId] = useKV<string>('selected-accommodation-id', '')
  const [accommodations, setAccommodations] = useKV<any[]>('accommodations-data', [])
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [pendingRoomId, setPendingRoomId] = useState<string>('')
  
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

  const handleBookRoom = (roomId: string) => {
    setPendingRoomId(roomId)
    setShowBookingDialog(true)
  }

  const handleBookingConfirmed = () => {
    setShowBookingDialog(false)
    handleNavigate('reserva-confirmacion')
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
            onBook={handleBookRoom}
          />
        )
      case 'reserva-confirmacion':
        return <ReservaConfirmacion onNavigate={handleNavigate} />
      case 'reserva-exitosa':
        return <ReservaExitosa onNavigate={handleNavigate} />
      case 'mis-reservas':
        return <MisReservas onNavigate={handleNavigate} />
        
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
        
      case 'faq':
        return <FAQ onNavigate={handleNavigate} />
      case 'centro-de-seguridad':
        return <CentroDeSeguridad onNavigate={handleNavigate} />
      case 'soporte-turista':
        return <SoporteTurista onNavigate={handleNavigate} />
      case 'como-reservar':
        return <ComoReservar onNavigate={handleNavigate} />
      case 'estado-de-mi-reserva':
        return <EstadoDeReserva onNavigate={handleNavigate} />
        
      case 'destinos':
        return <Destinos onNavigate={handleNavigate} />
      case 'tours':
        return <Tours onNavigate={handleNavigate} />
      case 'alojamientos':
        return <Alojamientos onNavigate={handleNavigate} />
      case 'transportes':
        return <Transportes onNavigate={handleNavigate} />
      case 'comida-tipica':
        return <ComidaTipica onNavigate={handleNavigate} />
      case 'mapa-turistico':
        return <MapaTuristicoPage onNavigate={handleNavigate} />
        
      case 'turismo-pasto':
        return <TurismosPasto onNavigate={handleNavigate} />
      case 'tours-narino':
        return <ToursNarino onNavigate={handleNavigate} />
      case 'que-hacer-en-pasto':
        return <QueHacerPasto onNavigate={handleNavigate} />
      case 'lugares-imperdibles-narino':
        return <LugaresImperdibles onNavigate={handleNavigate} />
        
      case 'aventura':
        return <AventuraPage onNavigate={handleNavigate} />
      case 'cultura':
        return <CulturaPage onNavigate={handleNavigate} />
      case 'gastronomia':
        return <GastronomiaPage onNavigate={handleNavigate} />
      case 'naturaleza':
        return <NaturalezaPage onNavigate={handleNavigate} />
      case 'senderismo':
        return <SenderismoPage onNavigate={handleNavigate} />
      case 'festivales-de-colombia':
        return <FestivalesPage onNavigate={handleNavigate} />
        
      case 'sobre-nosotros':
        return <SobreNosotros onNavigate={handleNavigate} />
      case 'mision-vision':
        return <MisionVision onNavigate={handleNavigate} />
      case 'por-que-elegirnos':
        return <PorQueElegirnos onNavigate={handleNavigate} />
      case 'testimonios':
        return <TestimoniosPage onNavigate={handleNavigate} />
      case 'preguntas-frecuentes':
        return <FAQ onNavigate={handleNavigate} />
        
      case 'terminos':
        return <Terminos onNavigate={handleNavigate} />
      case 'privacidad':
        return <Privacidad onNavigate={handleNavigate} />
      case 'cookies':
        return <CookiesPage onNavigate={handleNavigate} />
      case 'reembolsos':
        return <ReembolsosPage onNavigate={handleNavigate} />
      case 'politica-de-cancelacion':
        return <CancelacionPage onNavigate={handleNavigate} />
        
      case 'guia-del-viajero':
        return <GuiaDelViajero onNavigate={handleNavigate} />
      case 'articulos':
        return <ArticulosPage onNavigate={handleNavigate} />
      case 'noticias-de-turismo':
        return <NoticiasTurismoPage onNavigate={handleNavigate} />
        
      case 'agencias':
        return <AgenciasPage onNavigate={handleNavigate} />
      case 'colaboradores':
        return <ColaboradoresPage onNavigate={handleNavigate} />
      case 'afiliados':
        return <AfiliadosPage onNavigate={handleNavigate} />
      case 'guias-turisticos':
        return <GuiasTuristicosPage onNavigate={handleNavigate} />
        
      case 'viajes-baratos':
        return <ViajesBaratosPage onNavigate={handleNavigate} />
      case 'promociones':
        return <Ofertas onNavigate={handleNavigate} />
      case 'ofertas':
        return <Ofertas onNavigate={handleNavigate} />
      case 'planes-fin-de-semana':
        return <PlanesFinDeSemanaPage onNavigate={handleNavigate} />
        
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
      <BookingDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        accommodationId={selectedAccommodationId || ''}
        roomTypeId={pendingRoomId}
        onConfirm={handleBookingConfirmed}
      />
    </AuthProvider>
  )
}

export default App