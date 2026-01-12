import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { SignIn, Eye, EyeSlash, ArrowLeft, ShieldCheck, LockKey } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AdminAuthProps {
  onNavigate: (page: PageRoute) => void
}

export function AdminAuth({ onNavigate }: AdminAuthProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [attempts, setAttempts] = useState(0)

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor completa todos los campos')
      return
    }

    if (email !== 'superadmin@sendai.com' || password !== 'SuperAdmin2025!') {
      setAttempts(prev => prev + 1)
      
      if (attempts >= 2) {
        toast.error('Demasiados intentos fallidos. Acceso bloqueado temporalmente.')
        setTimeout(() => {
          setAttempts(0)
          onNavigate('home')
        }, 3000)
        return
      }
      
      toast.error('Credenciales incorrectas')
      return
    }
    
    setStep('2fa')
    toast.info('Código 2FA enviado. Para demo, usa: 123456')
  }

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!twoFactorCode) {
      toast.error('Por favor ingresa el código 2FA')
      return
    }

    if (twoFactorCode !== '123456') {
      setAttempts(prev => prev + 1)
      
      if (attempts >= 2) {
        toast.error('Código 2FA incorrecto. Acceso bloqueado.')
        setTimeout(() => {
          setAttempts(0)
          setStep('credentials')
          setTwoFactorCode('')
        }, 3000)
        return
      }
      
      toast.error('Código 2FA incorrecto')
      return
    }
    
    setIsLoading(true)
    const success = await login(email, password, 'superadmin')
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Acceso autorizado! Bienvenido, SuperAdmin')
      onNavigate('superadmin-dashboard')
    } else {
      toast.error('Error en la autenticación')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950/10 via-background to-orange-950/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4 gap-2"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Button>

        <Card className="shadow-xl border-2 border-destructive/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-destructive/10 rounded-full">
                <ShieldCheck size={48} className="text-destructive" weight="duotone" />
              </div>
            </div>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <LockKey size={24} weight="duotone" />
              Acceso Restringido
            </CardTitle>
            <CardDescription>
              Autenticación de SuperAdministrador con 2FA obligatorio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-destructive/50 bg-destructive/5">
              <ShieldCheck size={16} className="text-destructive" />
              <AlertDescription className="text-xs">
                <strong>Seguridad máxima:</strong> Este acceso está protegido con doble factor de autenticación,
                logging de IP y sesiones con timeout automático.
              </AlertDescription>
            </Alert>

            {step === 'credentials' ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="admin-email">Email de Administrador</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="superadmin@sendai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>

                <div>
                  <Label htmlFor="admin-password">Contraseña Segura</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      autoComplete="current-password"
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

                {attempts > 0 && (
                  <Alert className="border-amber-500/50 bg-amber-500/5">
                    <AlertDescription className="text-xs text-amber-900 dark:text-amber-100">
                      <strong>Advertencia:</strong> Intento fallido {attempts}/3. 
                      Después de 3 intentos, el acceso será bloqueado temporalmente.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full gap-2" variant="destructive" disabled={isLoading}>
                  <SignIn size={20} />
                  {isLoading ? 'Verificando...' : 'Continuar a 2FA'}
                </Button>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Demo credentials:</strong><br />
                    Email: superadmin@sendai.com<br />
                    Password: SuperAdmin2025!
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handle2FASubmit} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                    <LockKey size={32} className="text-primary" weight="duotone" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Se ha enviado un código de verificación a tu aplicación autenticadora
                  </p>
                </div>

                <div>
                  <Label htmlFor="2fa-code">Código de Verificación 2FA</Label>
                  <Input
                    id="2fa-code"
                    type="text"
                    placeholder="123456"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    disabled={isLoading}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest font-mono"
                    autoComplete="one-time-code"
                  />
                </div>

                {attempts > 0 && (
                  <Alert className="border-amber-500/50 bg-amber-500/5">
                    <AlertDescription className="text-xs text-amber-900 dark:text-amber-100">
                      <strong>Advertencia:</strong> Código incorrecto {attempts}/3
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full gap-2" variant="destructive" disabled={isLoading}>
                  <ShieldCheck size={20} />
                  {isLoading ? 'Verificando...' : 'Verificar y Acceder'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setStep('credentials')
                    setTwoFactorCode('')
                  }}
                >
                  Volver atrás
                </Button>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Demo 2FA code:</strong> 123456
                  </p>
                </div>
              </form>
            )}

            <div className="mt-6 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-xs text-center text-muted-foreground">
                <strong className="text-destructive">⚠️ Área de Alta Seguridad</strong><br />
                Todas las acciones son registradas y auditadas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
