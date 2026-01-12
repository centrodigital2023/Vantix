import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { SignIn, UserPlus, Eye, EyeSlash, ArrowLeft, House, Van, MapTrifold, Coffee } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface HostAuthProps {
  onNavigate: (page: PageRoute) => void
}

export function HostAuth({ onNavigate }: HostAuthProps) {
  const { login, signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'host' | 'service_provider'>('host')
  
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [signupPhone, setSignupPhone] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginEmail || !loginPassword) {
      toast.error('Por favor completa todos los campos')
      return
    }
    
    setIsLoading(true)
    const success = await login(loginEmail, loginPassword, selectedRole)
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Bienvenido a tu panel de gestión!')
      onNavigate('host-panel')
    } else {
      toast.error('Email o contraseña incorrectos')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword || !signupPhone) {
      toast.error('Por favor completa todos los campos')
      return
    }
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    
    if (signupPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }
    
    setIsLoading(true)
    const success = await signup(signupEmail, signupPassword, signupName, selectedRole)
    setIsLoading(false)
    
    if (success) {
      toast.success('¡Cuenta creada con éxito! Tu perfil será verificado en las próximas 24-48 horas.')
      onNavigate('host-panel')
    } else {
      toast.error('No se pudo crear la cuenta. Por favor intenta nuevamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-4 gap-2"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-4xl font-bold text-primary">
                Send<span className="text-accent">AI</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Acceso para Anfitriones y Prestadores</CardTitle>
            <CardDescription>
              Gestiona tus alojamientos, servicios turísticos y maximiza tus reservas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label className="text-base font-semibold mb-3 block">Tipo de cuenta</Label>
              <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'host' | 'service_provider')} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label
                  htmlFor="role-host"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                >
                  <RadioGroupItem value="host" id="role-host" className="sr-only" />
                  <House size={32} className="mb-2" weight="duotone" />
                  <span className="font-semibold">Anfitrión</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">Alojamientos, hoteles, casas rurales</span>
                </Label>
                
                <Label
                  htmlFor="role-service"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                >
                  <RadioGroupItem value="service_provider" id="role-service" className="sr-only" />
                  <div className="flex gap-1 mb-2">
                    <Van size={24} weight="duotone" />
                    <MapTrifold size={24} weight="duotone" />
                    <Coffee size={24} weight="duotone" />
                  </div>
                  <span className="font-semibold">Prestador de Servicios</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">Transporte, tours, experiencias, guías</span>
                </Label>
              </RadioGroup>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="signup">Registrarse</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@negocio.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={isLoading}
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

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    <SignIn size={20} />
                    {isLoading ? 'Iniciando sesión...' : 'Acceder a mi Panel'}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Tu cuenta será verificada por nuestro equipo antes de poder publicar servicios.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signup-name">Nombre completo o empresa</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Juan Pérez / Mi Hostal"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-phone">Teléfono</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="tu@negocio.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signup-password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          disabled={isLoading}
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

                    <div>
                      <Label htmlFor="signup-confirm-password">Confirmar contraseña</Label>
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    <UserPlus size={20} />
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta y Enviar a Verificación'}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>Proceso de verificación:</strong>
                  </p>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 mt-2 space-y-1 list-disc list-inside">
                    <li>Revisión de información en 24-48 horas</li>
                    <li>Validación de documentación legal</li>
                    <li>Aprobación del SuperAdmin</li>
                    <li>Notificación por email cuando esté listo</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Al registrarte, aceptas nuestros</p>
              <div className="flex justify-center gap-2 mt-1">
                <button onClick={() => onNavigate('terminos')} className="text-primary hover:underline">
                  Términos de Servicio
                </button>
                <span>y</span>
                <button onClick={() => onNavigate('privacidad')} className="text-primary hover:underline">
                  Política de Privacidad
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ¿Eres turista? <span className="text-primary hover:underline">Inicia sesión aquí</span>
          </button>
        </div>
      </div>
    </div>
  )
}
