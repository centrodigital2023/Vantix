import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { List, X, Compass, Calendar, Article, Envelope, House, User, SignOut, Sparkle, ShieldCheck } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { NotificationCenter } from '@/components/NotificationCenter'

interface NavbarProps {
  currentPage: PageRoute
  onNavigate: (page: PageRoute) => void
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        const sparkUser = await window.spark.user()
        setIsSuperAdmin(sparkUser?.isOwner || false)
      } catch {
        setIsSuperAdmin(false)
      }
    }
    checkSuperAdmin()
  }, [])

  const navItems = [
    { label: 'Inicio', page: 'home' as PageRoute, icon: House },
    { label: 'Explorar', page: 'explorar' as PageRoute, icon: Compass },
    { label: 'Itinerario IA', page: 'itinerario' as PageRoute, icon: Calendar },
    { label: 'Para Ti', page: 'feed-personalizado' as PageRoute, icon: Sparkle },
    { label: 'Blog', page: 'blog' as PageRoute, icon: Article },
    { label: 'Contacto', page: 'contacto' as PageRoute, icon: Envelope }
  ]

  const handleLogout = () => {
    logout()
    onNavigate('home')
  }

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
            
            <NotificationCenter onNavigate={onNavigate} />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-2 gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isSuperAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => onNavigate('superadmin-dashboard')}>
                        <ShieldCheck size={16} className="mr-2" weight="duotone" />
                        <span className="font-bold text-primary">SuperAdmin</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => onNavigate('mis-reservas')}>
                    <Calendar size={16} className="mr-2" />
                    Mis Reservas
                  </DropdownMenuItem>
                  {(user?.role === 'host' || user?.role === 'service_provider') && (
                    <>
                      <DropdownMenuItem onClick={() => onNavigate('propietarios')}>
                        <House size={16} className="mr-2" />
                        Mis Propiedades
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onNavigate('registro-alojamiento')}>
                        <House size={16} className="mr-2" />
                        Registrar Propiedad
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <SignOut size={16} className="mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={() => onNavigate('tourist-auth')}
                className="ml-2 gap-2"
              >
                <User size={18} />
                <span className="hidden lg:inline">Iniciar Sesión</span>
              </Button>
            )}
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
            {isAuthenticated ? (
              <>
                <div className="pt-2 pb-2 px-3 border-t border-border">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onNavigate('mis-reservas')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start gap-2"
                >
                  <Calendar size={18} />
                  Mis Reservas
                </Button>
                {(user?.role === 'host' || user?.role === 'service_provider') && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigate('propietarios')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full justify-start gap-2"
                    >
                      <House size={18} />
                      Mis Propiedades
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigate('registro-alojamiento')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full justify-start gap-2"
                    >
                      <House size={18} />
                      Registrar Propiedad
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start gap-2"
                >
                  <SignOut size={18} />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  onNavigate('tourist-auth')
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start gap-2"
              >
                <User size={18} />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}