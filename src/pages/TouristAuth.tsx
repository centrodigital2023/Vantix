import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { SignIn, UserPlus, Eye, EyeSlash, GoogleLogo, ArrowLeft, Lock, Envelope, User as UserIcon } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

interface TouristAuthProps {
  onNavigate: (page: PageRoute) => void
}

export function TouristAuth({ onNavigate }: TouristAuthProps) {
  const { login, signup, loginWithGoogle } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
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
    const success = await login(loginEmail, loginPassword, 'tourist')
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Bienvenido de vuelta!')
      onNavigate('home')
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
    const success = await signup(signupEmail, signupPassword, signupName, 'tourist')
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Cuenta creada con éxito! Bienvenido a Vantix')
      onNavigate('home')
    } else {
      toast.error('No se pudo crear la cuenta. Por favor intenta nuevamente.')
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const success = await loginWithGoogle()
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Bienvenido a Vantix!')
      onNavigate('home')
    } else {
      toast.error('No se pudo iniciar sesión con Google')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4 gap-2"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Button>

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <img src="/src/assets/images/logovantix.png" alt="Vantix" className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl">Acceso para Turistas</CardTitle>
            <CardDescription className="text-base">
              Explora Colombia, guarda tus itinerarios y realiza reservas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="gap-2">
                  <SignIn size={16} />
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="signup" className="gap-2">
                  <UserPlus size={16} />
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-3 h-12 text-base border-2 hover:bg-accent/10 transition-all"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <GoogleLogo size={24} weight="bold" className="text-[#4285F4]" />
                  <span className="font-semibold">Continuar con Google</span>
                </Button>

                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-background px-3 text-sm text-muted-foreground font-medium">
                      O usa tu email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Envelope size={16} />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2">
                      <Lock size={16} />
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-11 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={isLoading}>
                    <SignIn size={20} />
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-3 h-12 text-base border-2 hover:bg-accent/10 transition-all"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <GoogleLogo size={24} weight="bold" className="text-[#4285F4]" />
                  <span className="font-semibold">Registrarse con Google</span>
                </Button>

                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-background px-3 text-sm text-muted-foreground font-medium">
                      O crea tu cuenta
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center gap-2">
                      <UserIcon size={16} />
                      Nombre completo
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Envelope size={16} />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                      <Lock size={16} />
                      Contraseña (mínimo 6 caracteres)
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-11 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="flex items-center gap-2">
                      <Lock size={16} />
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-11 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={isLoading}>
                    <UserPlus size={20} />
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Al continuar, aceptas nuestros</p>
              <div className="flex justify-center gap-2 mt-1 flex-wrap">
                <button onClick={() => onNavigate('terminos')} className="text-primary hover:underline font-medium">
                  Términos de Servicio
                </button>
                <span>y</span>
                <button onClick={() => onNavigate('privacidad')} className="text-primary hover:underline font-medium">
                  Política de Privacidad
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            ¿Eres propietario o prestador de servicios?{' '}
            <button
              onClick={() => onNavigate('host-auth')}
              className="text-primary hover:underline font-semibold"
            >
              Registra tu negocio aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
