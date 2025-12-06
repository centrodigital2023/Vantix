import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { List, X, Compass, Calendar, Article, Envelope, House } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'

interface NavbarProps {
  currentPage: PageRoute
  onNavigate: (page: PageRoute) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Inicio', page: 'home' as PageRoute, icon: House },
    { label: 'Explorar', page: 'explorar' as PageRoute, icon: Compass },
    { label: 'Itinerario IA', page: 'itinerario' as PageRoute, icon: Calendar },
    { label: 'Blog', page: 'blog' as PageRoute, icon: Article },
    { label: 'Contacto', page: 'contacto' as PageRoute, icon: Envelope }
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className="text-2xl font-bold text-primary">
              Send<span className="text-accent">AI</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.page}
                  variant={currentPage === item.page ? 'default' : 'ghost'}
                  onClick={() => onNavigate(item.page)}
                  className="gap-2"
                >
                  <Icon size={18} weight={currentPage === item.page ? 'fill' : 'regular'} />
                  {item.label}
                </Button>
              )
            })}
            <Button
              variant="outline"
              onClick={() => onNavigate('propietarios')}
              className="ml-2"
            >
              Propietarios
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.page}
                  variant={currentPage === item.page ? 'default' : 'ghost'}
                  onClick={() => {
                    onNavigate(item.page)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start gap-2"
                >
                  <Icon size={18} weight={currentPage === item.page ? 'fill' : 'regular'} />
                  {item.label}
                </Button>
              )
            })}
            <Button
              variant="outline"
              onClick={() => {
                onNavigate('propietarios')
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start"
            >
              Propietarios
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}