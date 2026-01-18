import { InstagramLogo, FacebookLogo, TwitterLogo } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface FooterProps {
  onNavigate: (page: PageRoute) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,191,255,0.05),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-12">
          {/* Ayuda y Atención */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('contacto')} className="hover:text-primary transition-colors text-left">Contacto</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-primary transition-colors text-left">Preguntas frecuentes</button></li>
              <li><button onClick={() => onNavigate('centro-de-seguridad')} className="hover:text-primary transition-colors text-left">Centro de seguridad</button></li>
              <li><button onClick={() => onNavigate('como-reservar')} className="hover:text-primary transition-colors text-left">Cómo reservar</button></li>
              <li><button onClick={() => onNavigate('estado-de-mi-reserva')} className="hover:text-primary transition-colors text-left">Estado de reserva</button></li>
            </ul>
          </div>

          {/* Descubre */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Descubre</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('destinos')} className="hover:text-primary transition-colors text-left">Destinos</button></li>
              <li><button onClick={() => onNavigate('tours')} className="hover:text-primary transition-colors text-left">Tours</button></li>
              <li><button onClick={() => onNavigate('alojamientos')} className="hover:text-primary transition-colors text-left">Alojamientos</button></li>
              <li><button onClick={() => onNavigate('transportes')} className="hover:text-primary transition-colors text-left">Transporte</button></li>
              <li><button onClick={() => onNavigate('mapa-turistico')} className="hover:text-primary transition-colors text-left">Mapa turístico</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Turismo Nariño</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('que-hacer-en-pasto')} className="hover:text-primary transition-colors text-left">Qué hacer en Pasto</button></li>
              <li><button onClick={() => onNavigate('tours-narino')} className="hover:text-primary transition-colors text-left">Tours en Nariño</button></li>
              <li><button onClick={() => onNavigate('turismo-pasto')} className="hover:text-primary transition-colors text-left">Turismo en Pasto</button></li>
              <li><button onClick={() => onNavigate('lugares-imperdibles-narino')} className="hover:text-primary transition-colors text-left">Lugares imperdibles</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Experiencias</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('aventura')} className="hover:text-primary transition-colors text-left">Aventura</button></li>
              <li><button onClick={() => onNavigate('cultura')} className="hover:text-primary transition-colors text-left">Cultura</button></li>
              <li><button onClick={() => onNavigate('gastronomia')} className="hover:text-primary transition-colors text-left">Gastronomía</button></li>
              <li><button onClick={() => onNavigate('naturaleza')} className="hover:text-primary transition-colors text-left">Naturaleza</button></li>
              <li><button onClick={() => onNavigate('senderismo')} className="hover:text-primary transition-colors text-left">Senderismo</button></li>
              <li><button onClick={() => onNavigate('festivales-de-colombia')} className="hover:text-primary transition-colors text-left">Festivales</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">La empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('sobre-nosotros')} className="hover:text-primary transition-colors text-left">Sobre nosotros</button></li>
              <li><button onClick={() => onNavigate('mision-vision')} className="hover:text-primary transition-colors text-left">Misión y visión</button></li>
              <li><button onClick={() => onNavigate('por-que-elegirnos')} className="hover:text-primary transition-colors text-left">Por qué elegirnos</button></li>
              <li><button onClick={() => onNavigate('testimonios')} className="hover:text-primary transition-colors text-left">Testimonios</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('blog')} className="hover:text-primary transition-colors text-left">Blog</button></li>
              <li><button onClick={() => onNavigate('guia-del-viajero')} className="hover:text-primary transition-colors text-left">Guía del viajero</button></li>
              <li><button onClick={() => onNavigate('articulos')} className="hover:text-primary transition-colors text-left">Artículos</button></li>
              <li><button onClick={() => onNavigate('noticias-de-turismo')} className="hover:text-primary transition-colors text-left">Noticias</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate('terminos')} className="hover:text-primary transition-colors text-left">Términos</button></li>
              <li><button onClick={() => onNavigate('privacidad')} className="hover:text-primary transition-colors text-left">Privacidad</button></li>
              <li><button onClick={() => onNavigate('cookies')} className="hover:text-primary transition-colors text-left">Cookies</button></li>
              <li><button onClick={() => onNavigate('reembolsos')} className="hover:text-primary transition-colors text-left">Reembolsos</button></li>
              <li><button onClick={() => onNavigate('politica-de-cancelacion')} className="hover:text-primary transition-colors text-left">Cancelaciones</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 mb-8">
          <h4 className="font-semibold mb-4 text-primary">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="p-3 rounded-xl glass-card hover:bg-primary/10 hover:text-primary transition-all">
              <InstagramLogo size={24} weight="fill" />
            </a>
            <a href="#" className="p-3 rounded-xl glass-card hover:bg-primary/10 hover:text-primary transition-all">
              <FacebookLogo size={24} weight="fill" />
            </a>
            <a href="#" className="p-3 rounded-xl glass-card hover:bg-primary/10 hover:text-primary transition-all">
              <TwitterLogo size={24} weight="fill" />
            </a>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 mb-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <button 
            onClick={() => onNavigate('host-auth')} 
            className="hover:text-accent transition-colors"
          >
            Acceso Anfitriones
          </button>
          <span className="text-border">|</span>
          <button 
            onClick={() => onNavigate('registro-servicio')} 
            className="hover:text-primary transition-colors"
          >
            Registro Prestadores
          </button>
          <span className="text-border">|</span>
          <button 
            onClick={() => onNavigate('admin-auth')} 
            className="hover:text-destructive transition-colors"
          >
            Acceso Administrativo
          </button>
        </div>
        
        <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">© 2025 Vantix Latinoamérica Colombia. Todos los derechos reservados.</p>
          <p className="text-xs">Plataforma inteligente powered by AI</p>
        </div>
      </div>
    </footer>
  )
}