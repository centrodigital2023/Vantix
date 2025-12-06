import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { SignIn, UserPlus, Eye, EyeSlash } from '@phosphor-icons/react'

interface AuthModalProps {
  onSuccess: () => void
  onCancel?: () => void
}

export function AuthModal({ onSuccess, onCancel }: AuthModalProps) {
  const { login, signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginEmail || !loginPassword) {
      toast.error('Por favor completa todos los campos')
      return
    }
    
    setIsLoading(true)
    const success = await login(loginEmail, loginPassword)
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Bienvenido de vuelta!')
      onSuccess()
    } else {
      toast.error('Email o contraseña incorrectos')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      toast.error('Por favor completa todos los campos')
      return
    }
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    
    if (signupPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    setIsLoading(true)
    const success = await signup(signupEmail, signupPassword, signupName)
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Cuenta creada exitosamente!')
      onSuccess()
    } else {
      toast.error('Error al crear la cuenta. Intenta de nuevo')
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 relative">
        {onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        )}
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-6">
                <SignIn size={48} className="text-primary mx-auto mb-2" weight="duotone" />
                <h2 className="text-2xl font-bold">Bienvenido</h2>
                <p className="text-sm text-muted-foreground">Accede a tu panel de propietario</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Al iniciar sesión, aceptas nuestros términos y condiciones
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="text-center mb-6">
                <UserPlus size={48} className="text-primary mx-auto mb-2" weight="duotone" />
                <h2 className="text-2xl font-bold">Crear Cuenta</h2>
                <p className="text-sm text-muted-foreground">Únete como propietario</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-name">Nombre Completo</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Contraseña</Label>
                <Input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="signup-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Al registrarte, aceptas nuestros términos y condiciones
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
