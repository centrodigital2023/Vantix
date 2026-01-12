import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, SignOut, House } from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'
interface SuperAdminHeaderProp

  onNavigate: (page: string) => v
  title: string
  description, 
  showSystemStatus = false,
}: SuperAdminHeaderProps) {

 


    onNav
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

          </div>
        <div className
   

          
          )}
            variant="outline"
            className="gap-2"
            <SignOut size={20} weight="bold" />
          </Button>
      </div>
  )















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
