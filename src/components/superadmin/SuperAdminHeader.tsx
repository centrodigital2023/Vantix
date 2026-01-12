import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, SignOut, House } from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface SuperAdminHeaderProps {
  title: string
  description?: string
  onNavigate: (page: string) => void
  showSystemStatus?: boolean
  systemStatus?: 'operational' | 'degraded'
}

export function SuperAdminHeader({ 
  title, 
  description, 
  onNavigate, 
  showSystemStatus = false,
  systemStatus = 'operational' 
}: SuperAdminHeaderProps) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Sesión de SuperAdmin cerrada exitosamente')
    onNavigate('home')
  }

  const handleBackToDashboard = () => {
    onNavigate('superadmin-dashboard')
  }

  const handleBackToHome = () => {
    onNavigate('home')
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="gap-2"
            >
              <ArrowLeft size={18} />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="gap-2"
            >
              <House size={18} />
              Inicio
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground text-lg mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showSystemStatus && (
            <Badge 
              variant={systemStatus === 'operational' ? 'default' : 'destructive'}
              className="text-sm px-3 py-1"
            >
              {systemStatus === 'operational' ? '● Sistema Operativo' : '● Sistema Degradado'}
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
          >
            <SignOut size={20} weight="bold" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  )
}
