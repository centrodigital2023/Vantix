import { InstagramLogo, FacebookLogo, TwitterLogo } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface FooterProps {
  onNavigate: (page: PageRoute) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-8">
          {/* Ayuda y Atención */}
          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('contacto')} className="hover:opacity-100 text-left">Contacto</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:opacity-100 text-left">Preguntas frecuentes</button></li>
              <li><button onClick={() => onNavigate('centro-de-seguridad')} className="hover:opacity-100 text-left">Centro de seguridad</button></li>
              <li><button onClick={() => onNavigate('como-reservar')} className="hover:opacity-100 text-left">Cómo reservar</button></li>
              <li><button onClick={() => onNavigate('estado-de-mi-reserva')} className="hover:opacity-100 text-left">Estado de reserva</button></li>
            </ul>
          </div>

          {/* Descubre */}
          <div>
            <h4 className="font-semibold mb-4">Descubre</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('destinos')} className="hover:opacity-100 text-left">Destinos</button></li>
              <li><button onClick={() => onNavigate('tours')} className="hover:opacity-100 text-left">Tours</button></li>
              <li><button onClick={() => onNavigate('alojamientos')} className="hover:opacity-100 text-left">Alojamientos</button></li>
              <li><button onClick={() => onNavigate('transportes')} className="hover:opacity-100 text-left">Transporte</button></li>
              <li><button onClick={() => onNavigate('mapa-turistico')} className="hover:opacity-100 text-left">Mapa turístico</button></li>
            </ul>
          </div>

          {/* SEO Local - Nariño/Pasto */}
          <div>
            <h4 className="font-semibold mb-4">Turismo Nariño</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('que-hacer-en-pasto')} className="hover:opacity-100 text-left">Qué hacer en Pasto</button></li>
              <li><button onClick={() => onNavigate('tours-narino')} className="hover:opacity-100 text-left">Tours en Nariño</button></li>
              <li><button onClick={() => onNavigate('turismo-pasto')} className="hover:opacity-100 text-left">Turismo en Pasto</button></li>
              <li><button onClick={() => onNavigate('lugares-imperdibles-narino')} className="hover:opacity-100 text-left">Lugares imperdibles</button></li>
            </ul>
          </div>

          {/* Experiencias Temáticas */}
          <div>
            <h4 className="font-semibold mb-4">Experiencias</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('aventura')} className="hover:opacity-100 text-left">Aventura</button></li>
              <li><button onClick={() => onNavigate('cultura')} className="hover:opacity-100 text-left">Cultura</button></li>
              <li><button onClick={() => onNavigate('gastronomia')} className="hover:opacity-100 text-left">Gastronomía</button></li>
              <li><button onClick={() => onNavigate('naturaleza')} className="hover:opacity-100 text-left">Naturaleza</button></li>
              <li><button onClick={() => onNavigate('senderismo')} className="hover:opacity-100 text-left">Senderismo</button></li>
              <li><button onClick={() => onNavigate('festivales-de-colombia')} className="hover:opacity-100 text-left">Festivales</button></li>
            </ul>
          </div>

          {/* La Empresa */}
          <div>
            <h4 className="font-semibold mb-4">La empresa</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('sobre-nosotros')} className="hover:opacity-100 text-left">Sobre nosotros</button></li>
              <li><button onClick={() => onNavigate('mision-vision')} className="hover:opacity-100 text-left">Misión y visión</button></li>
              <li><button onClick={() => onNavigate('por-que-elegirnos')} className="hover:opacity-100 text-left">Por qué elegirnos</button></li>
              <li><button onClick={() => onNavigate('testimonios')} className="hover:opacity-100 text-left">Testimonios</button></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('blog')} className="hover:opacity-100 text-left">Blog</button></li>
              <li><button onClick={() => onNavigate('guia-del-viajero')} className="hover:opacity-100 text-left">Guía del viajero</button></li>
              <li><button onClick={() => onNavigate('articulos')} className="hover:opacity-100 text-left">Artículos</button></li>
              <li><button onClick={() => onNavigate('noticias-de-turismo')} className="hover:opacity-100 text-left">Noticias</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('terminos')} className="hover:opacity-100 text-left">Términos</button></li>
              <li><button onClick={() => onNavigate('privacidad')} className="hover:opacity-100 text-left">Privacidad</button></li>
              <li><button onClick={() => onNavigate('cookies')} className="hover:opacity-100 text-left">Cookies</button></li>
              <li><button onClick={() => onNavigate('reembolsos')} className="hover:opacity-100 text-left">Reembolsos</button></li>
              <li><button onClick={() => onNavigate('politica-de-cancelacion')} className="hover:opacity-100 text-left">Cancelaciones</button></li>
            </ul>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <h4 className="font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors"><InstagramLogo size={24} weight="fill" /></a>
            <a href="#" className="hover:text-accent transition-colors"><FacebookLogo size={24} weight="fill" /></a>
            <a href="#" className="hover:text-accent transition-colors"><TwitterLogo size={24} weight="fill" /></a>
          </div>
        </div>

        {/* Enlaces discretos para anfitriones y admin */}
        <div className="border-t border-background/20 pt-6 mb-6 flex flex-wrap justify-center gap-4 text-xs opacity-50 hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onNavigate('host-auth')} 
            className="hover:text-accent transition-colors"
          >
            Acceso Anfitriones
          </button>
          <span className="text-background/30">|</span>
          <button 
            onClick={() => onNavigate('admin-auth')} 
            className="hover:text-destructive transition-colors"
          >
            Acceso Administrativo
          </button>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-60">
          © 2025 SendAI Latinoamérica Colombia. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}