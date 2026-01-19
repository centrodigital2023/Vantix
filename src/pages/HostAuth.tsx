import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { SignIn, UserPlus, Eye, EyeSlash, ArrowLeft, House, Van, MapTrifold, Coffee, Lock, Envelope, User as UserIcon, Phone, ShieldCheck, Clock, Sparkle, CheckCircle } from '@phosphor-icons/react'
import { PageRoute } from '@/lib/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/progress'

interface HostAuthProps {
  onNavigate: (page: PageRoute) => void
}

export function HostAuth({ onNavigate }: HostAuthProps) {
  const { login, signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'host' | 'service_provider'>('host')
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  
  const [draftData, setDraftData] = useKV<{name?: string, email?: string, phone?: string, role?: string}>('host-auth-draft', {})
  
  useEffect(() => {
    if (draftData) {
      if (draftData.name) setSignupName(draftData.name)
      if (draftData.email) setSignupEmail(draftData.email)
      if (draftData.phone) setSignupPhone(draftData.phone)
      if (draftData.role && (draftData.role === 'host' || draftData.role === 'service_provider')) {
        setSelectedRole(draftData.role as 'host' | 'service_provider')
      }
    }
  }, [])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDraftData((prev) => ({
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        role: selectedRole
      }))
    }, 1000)
    return () => clearTimeout(timer)
  }, [signupName, signupEmail, signupPhone, selectedRole, setDraftData])
  
  useEffect(() => {
    let strength = 0
    if (signupPassword.length >= 8) strength += 25
    if (signupPassword.length >= 12) strength += 25
    if (/[A-Z]/.test(signupPassword)) strength += 15
    if (/[a-z]/.test(signupPassword)) strength += 10
    if (/[0-9]/.test(signupPassword)) strength += 15
    if (/[^A-Za-z0-9]/.test(signupPassword)) strength += 10
    setPasswordStrength(Math.min(strength, 100))
  }, [signupPassword])

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

        <Card className="shadow-xl border-2">
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <img src="/src/assets/images/logovantix.png" alt="Vantix" className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl">Acceso para Anfitriones y Prestadores</CardTitle>
            <CardDescription className="text-base">
              Gestiona tus alojamientos, servicios turísticos y maximiza tus reservas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label className="text-base font-semibold mb-3 block">Tipo de cuenta</Label>
              <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'host' | 'service_provider')} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label
                  htmlFor="role-host"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 [&:has([data-state=checked])]:shadow-md"
                >
                  <RadioGroupItem value="host" id="role-host" className="sr-only" />
                  <House size={40} className="mb-3 text-primary" weight="duotone" />
                  <span className="font-semibold text-lg">Anfitrión</span>
                  <span className="text-sm text-muted-foreground text-center mt-2">Alojamientos, hoteles, casas rurales</span>
                </Label>
                
                <Label
                  htmlFor="role-service"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 [&:has([data-state=checked])]:shadow-md"
                >
                  <RadioGroupItem value="service_provider" id="role-service" className="sr-only" />
                  <div className="flex gap-2 mb-3">
                    <Van size={28} weight="duotone" className="text-primary" />
                    <MapTrifold size={28} weight="duotone" className="text-primary" />
                    <Coffee size={28} weight="duotone" className="text-primary" />
                  </div>
                  <span className="font-semibold text-lg">Prestador de Servicios</span>
                  <span className="text-sm text-muted-foreground text-center mt-2">Transporte, tours, experiencias, guías</span>
                </Label>
              </RadioGroup>
            </div>

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

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Envelope size={16} />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@negocio.com"
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
                    {isLoading ? 'Iniciando sesión...' : 'Acceder a mi Panel'}
                  </Button>
                </form>

                <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
                  <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Nota:</strong> Tu cuenta será verificada por nuestro equipo antes de poder publicar servicios.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <AnimatePresence>
                  {signupName && signupEmail && signupPhone && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                        <Sparkle size={18} className="text-primary" weight="fill" />
                        <AlertDescription className="text-sm">
                          <strong>¡Buen progreso!</strong> Tu borrador se guarda automáticamente. Puedes continuar más tarde.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="flex items-center gap-2">
                        <UserIcon size={16} />
                        Nombre completo o empresa
                      </Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Juan Pérez / Mi Hostal"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        disabled={isLoading}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-phone" className="flex items-center gap-2">
                        <Phone size={16} />
                        Teléfono
                      </Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        disabled={isLoading}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Envelope size={16} />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="tu@negocio.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="flex items-center gap-2">
                        <Lock size={16} />
                        Contraseña (mínimo 8 caracteres)
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
                      {signupPassword && (
                        <div className="space-y-1">
                          <Progress value={passwordStrength} className="h-1.5" />
                          <p className="text-xs text-muted-foreground">
                            Seguridad: {passwordStrength < 40 ? 'Débil' : passwordStrength < 70 ? 'Media' : 'Fuerte'}
                          </p>
                        </div>
                      )}
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
                      {signupPassword && signupConfirmPassword && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 text-xs"
                        >
                          {signupPassword === signupConfirmPassword ? (
                            <>
                              <CheckCircle size={14} weight="fill" className="text-green-500" />
                              <span className="text-green-600">Las contraseñas coinciden</span>
                            </>
                          ) : (
                            <>
                              <span className="text-destructive">Las contraseñas no coinciden</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2 h-11 text-base" disabled={isLoading}>
                    <UserPlus size={20} />
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta y Enviar a Verificación'}
                  </Button>
                </form>

                <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
                  <Clock size={20} className="text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-sm">
                    <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Proceso de verificación:</p>
                    <ul className="text-amber-800 dark:text-amber-200 space-y-1 list-disc list-inside">
                      <li>Revisión de información en 24-48 horas</li>
                      <li>Validación de documentación legal</li>
                      <li>Aprobación del SuperAdmin</li>
                      <li>Notificación por email cuando esté listo</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Al registrarte, aceptas nuestros</p>
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
            ¿Eres turista?{' '}
            <button
              onClick={() => onNavigate('tourist-auth')}
              className="text-primary hover:underline font-semibold"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
