import { InstagramLogo, FacebookLogo, TwitterLogo } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface FooterProps {
  onNavigate: (page: PageRoute) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Send<span className="text-accent">AI</span>
            </h3>
            <p className="text-sm opacity-80">
              Itinerarios inteligentes para descubrir Colombia
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('explorar')} className="hover:opacity-100">Categorías</button></li>
              <li><button onClick={() => onNavigate('itinerario')} className="hover:opacity-100">Itinerario IA</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:opacity-100">Blog</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Propietarios</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => onNavigate('propietarios')} className="hover:opacity-100">Panel</button></li>
              <li><button onClick={() => onNavigate('registro-alojamiento')} className="hover:opacity-100">Registrar Alojamiento</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><InstagramLogo size={24} weight="fill" /></a>
              <a href="#" className="hover:text-accent transition-colors"><FacebookLogo size={24} weight="fill" /></a>
              <a href="#" className="hover:text-accent transition-colors"><TwitterLogo size={24} weight="fill" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
          © 2024 SendAI. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}