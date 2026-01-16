import { useState, useEffect, lazy, Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// Páginas principales - carga directa para mejor UX
import { Home } from '@/pages/Home'
import { Explorar } from '@/pages/Explorar'

// Lazy loading para el resto de páginas
const Itinerario = lazy(() => import('@/pages/Itinerario').then(m => ({ default: m.Itinerario })))
const Blog = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })))
const Contacto = lazy(() => import('@/pages/Contacto').then(m => ({ default: m.Contacto })))
const Propietarios = lazy(() => import('@/pages/Propietarios').then(m => ({ default: m.Propietarios })))
const RegistroAlojamiento = lazy(() => import('@/pages/RegistroAlojamiento').then(m => ({ default: m.RegistroAlojamiento })))
const DestinoResultados = lazy(() => import('@/pages/DestinoResultados').then(m => ({ default: m.DestinoResultados })))
const DetalleAlojamiento = lazy(() => import('@/pages/DetalleAlojamiento').then(m => ({ default: m.DetalleAlojamiento })))
const ReservaConfirmacion = lazy(() => import('@/pages/ReservaConfirmacion').then(m => ({ default: m.ReservaConfirmacion })))
const ReservaExitosa = lazy(() => import('@/pages/ReservaExitosa').then(m => ({ default: m.ReservaExitosa })))
const MisReservas = lazy(() => import('@/pages/MisReservas').then(m => ({ default: m.MisReservas })))
const FeedPersonalizado = lazy(() => import('@/pages/FeedPersonalizado').then(m => ({ default: m.FeedPersonalizado })))
const RegistroServicio = lazy(() => import('@/pages/RegistroServicio').then(m => ({ default: m.RegistroServicio })))
const PanelPrestador = lazy(() => import('@/pages/PanelPrestador').then(m => ({ default: m.PanelPrestador })))
const NotFoundPage = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFoundPage })))

// Categorías
const Aventura = lazy(() => import('@/pages/categorias/Aventura').then(m => ({ default: m.Aventura })))
const Bienestar = lazy(() => import('@/pages/categorias/Bienestar').then(m => ({ default: m.Bienestar })))
const Cultural = lazy(() => import('@/pages/categorias/Cultural').then(m => ({ default: m.Cultural })))
const Familiar = lazy(() => import('@/pages/categorias/Familiar').then(m => ({ default: m.Familiar })))
const Gastronomia = lazy(() => import('@/pages/categorias/Gastronomia').then(m => ({ default: m.Gastronomia })))
const Naturaleza = lazy(() => import('@/pages/categorias/Naturaleza').then(m => ({ default: m.Naturaleza })))
const Negocios = lazy(() => import('@/pages/categorias/Negocios').then(m => ({ default: m.Negocios })))
const Playa = lazy(() => import('@/pages/categorias/Playa').then(m => ({ default: m.Playa })))
const Religioso = lazy(() => import('@/pages/categorias/Religioso').then(m => ({ default: m.Religioso })))
const Rural = lazy(() => import('@/pages/categorias/Rural').then(m => ({ default: m.Rural })))

// Auth
const TouristAuth = lazy(() => import('@/pages').then(m => ({ default: m.TouristAuth })))
const HostAuth = lazy(() => import('@/pages').then(m => ({ default: m.HostAuth })))
const AdminAuth = lazy(() => import('@/pages').then(m => ({ default: m.AdminAuth })))

// Páginas de ayuda
const FAQ = lazy(() => import('@/pages').then(m => ({ default: m.FAQ })))
const CentroDeSeguridad = lazy(() => import('@/pages').then(m => ({ default: m.CentroDeSeguridad })))
const SoporteTurista = lazy(() => import('@/pages').then(m => ({ default: m.SoporteTurista })))
const ComoReservar = lazy(() => import('@/pages').then(m => ({ default: m.ComoReservar })))
const EstadoDeReserva = lazy(() => import('@/pages').then(m => ({ default: m.EstadoDeReserva })))

// Páginas de descubre
const Destinos = lazy(() => import('@/pages').then(m => ({ default: m.Destinos })))
const Tours = lazy(() => import('@/pages').then(m => ({ default: m.Tours })))
const Alojamientos = lazy(() => import('@/pages').then(m => ({ default: m.Alojamientos })))
const Transportes = lazy(() => import('@/pages').then(m => ({ default: m.Transportes })))
const ComidaTipica = lazy(() => import('@/pages').then(m => ({ default: m.ComidaTipica })))
const MapaTuristicoPage = lazy(() => import('@/pages').then(m => ({ default: m.MapaTuristicoPage })))

// Páginas de empresa
const SobreNosotros = lazy(() => import('@/pages').then(m => ({ default: m.SobreNosotros })))
const MisionVision = lazy(() => import('@/pages').then(m => ({ default: m.MisionVision })))
const PorQueElegirnos = lazy(() => import('@/pages').then(m => ({ default: m.PorQueElegirnos })))
const TestimoniosPage = lazy(() => import('@/pages').then(m => ({ default: m.TestimoniosPage })))

// Páginas legales
const Terminos = lazy(() => import('@/pages').then(m => ({ default: m.Terminos })))
const Privacidad = lazy(() => import('@/pages').then(m => ({ default: m.Privacidad })))
const CookiesPage = lazy(() => import('@/pages').then(m => ({ default: m.CookiesPage })))
const ReembolsosPage = lazy(() => import('@/pages').then(m => ({ default: m.ReembolsosPage })))
const CancelacionPage = lazy(() => import('@/pages').then(m => ({ default: m.CancelacionPage })))

// Páginas de Nariño
const TurismosPasto = lazy(() => import('@/pages').then(m => ({ default: m.TurismosPasto })))
const ToursNarino = lazy(() => import('@/pages').then(m => ({ default: m.ToursNarino })))
const QueHacerPasto = lazy(() => import('@/pages').then(m => ({ default: m.QueHacerPasto })))
const LugaresImperdibles = lazy(() => import('@/pages').then(m => ({ default: m.LugaresImperdibles })))

// Páginas de experiencias
const AventuraPage = lazy(() => import('@/pages').then(m => ({ default: m.AventuraPage })))
const NaturalezaPage = lazy(() => import('@/pages').then(m => ({ default: m.NaturalezaPage })))
const CulturaPage = lazy(() => import('@/pages').then(m => ({ default: m.CulturaPage })))
const GastronomiaPage = lazy(() => import('@/pages').then(m => ({ default: m.GastronomiaPage })))
const SenderismoPage = lazy(() => import('@/pages').then(m => ({ default: m.SenderismoPage })))
const FestivalesPage = lazy(() => import('@/pages').then(m => ({ default: m.FestivalesPage })))

// Páginas de recursos
const GuiaDelViajero = lazy(() => import('@/pages').then(m => ({ default: m.GuiaDelViajero })))
const ArticulosPage = lazy(() => import('@/pages').then(m => ({ default: m.ArticulosPage })))
const NoticiasTurismoPage = lazy(() => import('@/pages').then(m => ({ default: m.NoticiasTurismoPage })))
const AgenciasPage = lazy(() => import('@/pages').then(m => ({ default: m.AgenciasPage })))
const ColaboradoresPage = lazy(() => import('@/pages').then(m => ({ default: m.ColaboradoresPage })))
const AfiliadosPage = lazy(() => import('@/pages').then(m => ({ default: m.AfiliadosPage })))
const GuiasTuristicosPage = lazy(() => import('@/pages').then(m => ({ default: m.GuiasTuristicosPage })))

// Promociones
const Ofertas = lazy(() => import('@/pages').then(m => ({ default: m.Ofertas })))
const PlanesFinDeSemanaPage = lazy(() => import('@/pages').then(m => ({ default: m.PlanesFinDeSemanaPage })))
const ViajesBaratosPage = lazy(() => import('@/pages').then(m => ({ default: m.ViajesBaratosPage })))

// SuperAdmin
const SuperAdminDashboard = lazy(() => import('@/pages/superadmin').then(m => ({ default: m.SuperAdminDashboard })))
const SuperAdminUsers = lazy(() => import('@/pages/superadmin').then(m => ({ default: m.SuperAdminUsers })))
const SuperAdminComplaints = lazy(() => import('@/pages/superadmin').then(m => ({ default: m.SuperAdminComplaints })))
const SuperAdminProviders = lazy(() => import('@/pages/superadmin').then(m => ({ default: m.SuperAdminProviders })))
const SuperAdminAnalytics = lazy(() => import('@/pages/superadmin').then(m => ({ default: m.SuperAdminAnalytics })))
const SuperAdminConfig = lazy(() => import('@/pages/superadmin').then(m => ({ default: m.SuperAdminConfig })))

// Host Panel
const HostPanelMain = lazy(() => import('@/pages/panel-anfitrion/HostPanelMain').then(m => ({ default: m.HostPanelMain })))

import { PageRoute } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { useInitializeSync } from '@/hooks/use-category-data'
import { generateSampleAccommodations } from '@/lib/sample-data'
import { BookingDialog } from '@/components/BookingDialog'
import { useRouter } from '@/hooks/use-router'
import { toast } from 'sonner'

function App() {
  const { currentPage, params, navigateTo: routerNavigate } = useRouter()
  const { isAuthenticated } = useAuth()
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
    if (accommodationId) {
      routerNavigate(page, { id: accommodationId })
    } else {
      routerNavigate(page)
    }
  }

  const handleBookRoom = (roomId: string) => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para realizar una reserva')
      handleNavigate('tourist-auth')
      return
    }
    
    setPendingRoomId(roomId)
    setShowBookingDialog(true)
  }

  const handleBookingConfirmed = () => {
    setShowBookingDialog(false)
    handleNavigate('reserva-confirmacion')
  }
  
  const handleLoginRequired = () => {
    setShowBookingDialog(false)
    toast.info('Inicia sesión para completar tu reserva')
    handleNavigate('tourist-auth')
  }

  const activePage = currentPage
  const selectedAccommodationId = params.id || ''

  const isAuthPage = activePage === 'tourist-auth' || activePage === 'host-auth' || activePage === 'admin-auth'
  const isHostPanel = activePage === 'host-panel'
  const isSuperAdminPanel = activePage.startsWith('superadmin-')

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
      case 'registro-servicio':
        return <RegistroServicio onNavigate={handleNavigate} />
      case 'panel-prestador':
        return <PanelPrestador onNavigate={handleNavigate} />
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
      case 'feed-personalizado':
        return <FeedPersonalizado onNavigate={handleNavigate} />
      
      case 'tourist-auth':
        return <TouristAuth onNavigate={handleNavigate} />
      case 'host-auth':
        return <HostAuth onNavigate={handleNavigate} />
      case 'admin-auth':
        return <AdminAuth onNavigate={handleNavigate} />
        
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
        
      case 'host-panel':
        return <HostPanelMain onNavigate={handleNavigate} />
        
      case 'superadmin-dashboard':
        return <SuperAdminDashboard onNavigate={handleNavigate} />
      case 'superadmin-users':
        return <SuperAdminUsers onNavigate={handleNavigate} />
      case 'superadmin-complaints':
        return <SuperAdminComplaints onNavigate={handleNavigate} />
      case 'superadmin-providers':
        return <SuperAdminProviders onNavigate={handleNavigate} />
      case 'superadmin-analytics':
        return <SuperAdminAnalytics onNavigate={handleNavigate} />
      case 'superadmin-config':
        return <SuperAdminConfig onNavigate={handleNavigate} />
        
      default:
        return <NotFoundPage onNavigate={handleNavigate} />
    }
  }

  return (
    <AuthProvider>
      {!isAuthPage && !isHostPanel && !isSuperAdminPanel && <Navbar currentPage={activePage} onNavigate={handleNavigate} />}
      <main>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          {renderPage()}
        </Suspense>
      </main>
      {!isAuthPage && !isHostPanel && !isSuperAdminPanel && <Footer onNavigate={handleNavigate} />}
      <Toaster />
      <BookingDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        accommodationId={selectedAccommodationId || ''}
        roomTypeId={pendingRoomId}
        onConfirm={handleBookingConfirmed}
        onLoginRequired={handleLoginRequired}
      />
    </AuthProvider>
  )
}

export default App