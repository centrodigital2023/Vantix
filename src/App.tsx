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
import { Destinos, Tours } from '@/pages'
import { SobreNosotros, MisionVision } from '@/pages'
import { Terminos } from '@/pages'
import { GenericPage } from '@/components/GenericPage'
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
        return <GenericPage onNavigate={handleNavigate} title="Alojamientos en Colombia" subtitle="Encuentra el lugar perfecto para tu estadía" />
      case 'transportes':
        return <GenericPage onNavigate={handleNavigate} title="Transporte en Colombia" subtitle="Opciones de transporte seguro y eficiente" />
      case 'comida-tipica':
        return <GenericPage onNavigate={handleNavigate} title="Comida Típica Colombiana" subtitle="Descubre los sabores de Colombia" />
      case 'mapa-turistico':
        return <GenericPage onNavigate={handleNavigate} title="Mapa Turístico" subtitle="Explora Colombia de forma interactiva" />
        
      case 'turismo-pasto':
        return <GenericPage onNavigate={handleNavigate} title="Turismo en Pasto" subtitle="Descubre la capital de Nariño" />
      case 'tours-narino':
        return <GenericPage onNavigate={handleNavigate} title="Tours en Nariño" subtitle="Experiencias únicas en Nariño" />
      case 'que-hacer-en-pasto':
        return <GenericPage onNavigate={handleNavigate} title="Qué Hacer en Pasto" subtitle="Actividades y atracciones en Pasto" />
      case 'lugares-imperdibles-narino':
        return <GenericPage onNavigate={handleNavigate} title="Lugares Imperdibles de Nariño" subtitle="Destinos que no puedes perderte" />
        
      case 'aventura':
        return <GenericPage onNavigate={handleNavigate} title="Turismo de Aventura" subtitle="Experiencias llenas de adrenalina" />
      case 'cultura':
        return <GenericPage onNavigate={handleNavigate} title="Turismo Cultural" subtitle="Descubre la riqueza cultural de Colombia" />
      case 'gastronomia':
        return <GenericPage onNavigate={handleNavigate} title="Turismo Gastronómico" subtitle="Sabores auténticos de Colombia" />
      case 'naturaleza':
        return <GenericPage onNavigate={handleNavigate} title="Turismo de Naturaleza" subtitle="Biodiversidad y paisajes únicos" />
      case 'senderismo':
        return <GenericPage onNavigate={handleNavigate} title="Senderismo" subtitle="Rutas y caminatas espectaculares" />
      case 'festivales-de-colombia':
        return <GenericPage onNavigate={handleNavigate} title="Festivales de Colombia" subtitle="Celebraciones y eventos culturales" />
        
      case 'sobre-nosotros':
        return <SobreNosotros onNavigate={handleNavigate} />
      case 'mision-vision':
        return <MisionVision onNavigate={handleNavigate} />
      case 'por-que-elegirnos':
        return <GenericPage onNavigate={handleNavigate} title="Por Qué Elegir SendAI" subtitle="Razones para confiar en nosotros" />
      case 'testimonios':
        return <GenericPage onNavigate={handleNavigate} title="Testimonios" subtitle="Lo que dicen nuestros viajeros" />
      case 'preguntas-frecuentes':
        return <FAQ onNavigate={handleNavigate} />
        
      case 'terminos':
        return <Terminos onNavigate={handleNavigate} />
      case 'privacidad':
        return <GenericPage onNavigate={handleNavigate} title="Política de Privacidad" subtitle="Cómo protegemos tu información" />
      case 'cookies':
        return <GenericPage onNavigate={handleNavigate} title="Política de Cookies" subtitle="Uso de cookies en nuestra plataforma" />
      case 'reembolsos':
        return <GenericPage onNavigate={handleNavigate} title="Política de Reembolsos" subtitle="Información sobre devoluciones" />
      case 'politica-de-cancelacion':
        return <GenericPage onNavigate={handleNavigate} title="Política de Cancelación" subtitle="Términos de cancelación de reservas" />
        
      case 'guia-del-viajero':
        return <GenericPage onNavigate={handleNavigate} title="Guía del Viajero" subtitle="Consejos esenciales para viajar por Colombia" />
      case 'articulos':
        return <GenericPage onNavigate={handleNavigate} title="Artículos de Viaje" subtitle="Historias y guías de viajeros" />
      case 'noticias-de-turismo':
        return <GenericPage onNavigate={handleNavigate} title="Noticias de Turismo" subtitle="Últimas novedades del sector" />
        
      case 'agencias':
        return <GenericPage onNavigate={handleNavigate} title="Para Agencias" subtitle="Alianzas con agencias de viaje" />
      case 'colaboradores':
        return <GenericPage onNavigate={handleNavigate} title="Colaboradores" subtitle="Programa para creadores de contenido" />
      case 'afiliados':
        return <GenericPage onNavigate={handleNavigate} title="Programa de Afiliados" subtitle="Gana comisiones con nosotros" />
      case 'guias-turisticos':
        return <GenericPage onNavigate={handleNavigate} title="Para Guías Turísticos" subtitle="Únete a nuestra red de guías" />
        
      case 'viajes-baratos':
        return <GenericPage onNavigate={handleNavigate} title="Viajes Baratos" subtitle="Las mejores ofertas y destinos económicos" />
      case 'promociones':
        return <GenericPage onNavigate={handleNavigate} title="Promociones" subtitle="Descuentos y ofertas especiales" />
      case 'ofertas':
        return <GenericPage onNavigate={handleNavigate} title="Ofertas Especiales" subtitle="Las mejores ofertas del momento" />
      case 'planes-fin-de-semana':
        return <GenericPage onNavigate={handleNavigate} title="Planes de Fin de Semana" subtitle="Escapadas perfectas para el fin de semana" />
        
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