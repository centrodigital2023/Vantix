import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, SignOut, House } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

interface SuperAdminHeaderProps {
  onNavigate: (page: string) => void
  title: string
  description?: string
  showSystemStatus?: boolean
  systemStatus?: 'operational' | 'degraded'
}

export function SuperAdminHeader({
  onNavigate,
  title,
  description,
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

  return (
    <div className="flex flex-col gap-4 border-b pb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToDashboard}
            aria-label="Volver al panel"
          >
            <ArrowLeft size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('home')}
            aria-label="Ir al inicio"
          >
            <House size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold leading-tight">{title}</h1>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
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
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <SignOut size={20} weight="bold" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  )
}
