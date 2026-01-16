import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Database, CheckCircle, Warning } from '@phosphor-icons/react'
import { SupabaseConfig } from '@/components/SupabaseConfig'
import { SmartAccommodationsList } from '@/components/SmartAccommodationsListV2'
import { SupabaseAccommodationForm } from '@/components/SupabaseAccommodationForm'
import { SupabaseAuthProvider, useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext'
import { toast } from 'sonner'

function SupabaseDemoContent() {
  const { user, isAuthenticated, loading } = useSupabaseAuthContext()
  const [activeTab, setActiveTab] = useState('config')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
            <Database size={40} weight="duotone" className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Integración con Supabase</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Plataforma completa de gestión de alojamientos con autenticación, base de datos en tiempo real y almacenamiento
          </p>
        </div>

        {isAuthenticated && (
          <Alert className="mb-6 border-green-600/20 bg-green-50/50">
            <CheckCircle size={18} weight="fill" className="text-green-600" />
            <AlertDescription className="text-green-700">
              Sesión activa como: <strong>{user?.email}</strong>
            </AlertDescription>
          </Alert>
        )}

        {!isAuthenticated && activeTab !== 'config' && (
          <Alert className="mb-6 border-orange-600/20 bg-orange-50/50">
            <Warning size={18} weight="fill" className="text-orange-600" />
            <AlertDescription className="text-orange-700">
              Debes iniciar sesión para acceder a esta funcionalidad
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] lg:mx-auto">
            <TabsTrigger value="config">Configuración</TabsTrigger>
            <TabsTrigger value="list">Alojamientos</TabsTrigger>
            <TabsTrigger value="create" disabled={!isAuthenticated}>
              Crear Nuevo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6">
            <SupabaseConfig />

            <Card>
              <CardHeader>
                <CardTitle>Funcionalidades Disponibles</CardTitle>
                <CardDescription>
                  Una vez configurado Supabase, tendrás acceso a:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Autenticación de Usuarios',
                      desc: 'Login/registro con email y Google OAuth',
                    },
                    {
                      title: 'Gestión de Alojamientos',
                      desc: 'CRUD completo de propiedades turísticas',
                    },
                    {
                      title: 'Sistema de Reservas',
                      desc: 'Booking engine con gestión de disponibilidad',
                    },
                    {
                      title: 'Almacenamiento de Imágenes',
                      desc: 'Upload y gestión de fotos de propiedades',
                    },
                    {
                      title: 'Análisis y Estadísticas',
                      desc: 'Dashboard con métricas en tiempo real',
                    },
                    {
                      title: 'Reseñas y Ratings',
                      desc: 'Sistema de valoraciones de usuarios',
                    },
                  ].map((feature) => (
                    <div key={feature.title} className="p-4 border rounded-lg space-y-1">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alojamientos Disponibles</CardTitle>
                <CardDescription>
                  Explora todos los alojamientos registrados en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SmartAccommodationsList
                  onSelectAccommodation={(id) => toast.success(`Alojamiento seleccionado: ${id}`)}
                  showFilters={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            {isAuthenticated ? (
              <SupabaseAccommodationForm
                onSuccess={() => {
                  toast.success('Alojamiento creado exitosamente')
                  setActiveTab('list')
                }}
                onCancel={() => setActiveTab('list')}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Autenticación Requerida</CardTitle>
                  <CardDescription>
                    Debes iniciar sesión para crear un nuevo alojamiento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => toast.info('Redirigir a página de login')}>
                    Iniciar Sesión
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export function SupabaseDemo() {
  return (
    <SupabaseAuthProvider>
      <SupabaseDemoContent />
    </SupabaseAuthProvider>
  )
}
