import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, SignOut, Bell } from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface SuperAdminHeaderProps {
  onNavigate: (page: string) => void
  title: string
  subtitle?: string
  showAlerts?: boolean
  alertCount?: number
}

export function SuperAdminHeader({ 
  onNavigate, 
  title, 
  subtitle,
  showAlerts = false,
  alertCount = 0
}: SuperAdminHeaderProps) {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada exitosamente')
    onNavigate('home')
  }

  const handleBack = () => {
    onNavigate('superadmin-dashboard')
  }

  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2" />
              Dashboard
            </Button>
            <div className="border-l border-border h-8" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {showAlerts && alertCount > 0 && (
              <Button variant="outline" size="sm" className="relative">
                <Bell className="mr-2" />
                Alertas
                <Badge className="ml-2 bg-destructive text-destructive-foreground">
                  {alertCount}
                </Badge>
              </Button>
            )}
            
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                SA
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">{user?.name || 'SuperAdmin'}</div>
                <Badge variant="secondary" className="text-xs">SuperAdmin</Badge>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
            >
              <SignOut className="mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
