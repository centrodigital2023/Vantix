import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Database, CheckCircle, Warning, Images, WifiHigh } from '@phosphor-icons/react'
import { SupabaseConfig } from '@/components/SupabaseConfig'
import { SmartAccommodationsList } from '@/components/SmartAccommodationsListV2'
import { SupabaseAccommodationForm } from '@/components/SupabaseAccommodationForm'
import { ImageUploadZone } from '@/components/ImageUploadZone'
import { RealtimeDemo } from '@/components/RealtimeDemo'
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
          <TabsList className="grid w-full grid-cols-5 lg:w-[800px] lg:mx-auto">
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="list">Alojamientos</TabsTrigger>
            <TabsTrigger value="images">Imágenes</TabsTrigger>
            <TabsTrigger value="realtime">Tiempo Real</TabsTrigger>
            <TabsTrigger value="create" disabled={!isAuthenticated}>
              Crear
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
                      desc: 'Upload y gestión con Supabase Storage',
                    },
                    {
                      title: 'Tiempo Real',
                      desc: 'Suscripciones a cambios en la base de datos',
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

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Images size={24} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle>Sistema de Carga de Imágenes</CardTitle>
                    <CardDescription>
                      Carga imágenes directamente a Supabase Storage con validación y optimización
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ImageUploadZone
                  bucket="accommodations"
                  folder="demo"
                  maxFiles={10}
                  maxSizeMB={10}
                  onUploadComplete={(urls) => {
                    toast.success(`${urls.length} imagen(es) cargada(s) exitosamente`)
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Características del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">✅ Validación Automática</h4>
                    <p className="text-sm text-muted-foreground">
                      Valida formato, tamaño y dimensiones antes de subir
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">📊 Progreso en Tiempo Real</h4>
                    <p className="text-sm text-muted-foreground">
                      Visualiza el estado de cada archivo mientras se carga
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">🖼️ Vista Previa</h4>
                    <p className="text-sm text-muted-foreground">
                      Visualiza las imágenes cargadas con opciones de eliminar
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">🔒 Seguridad</h4>
                    <p className="text-sm text-muted-foreground">
                      Almacenamiento seguro con Supabase Storage
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <WifiHigh size={24} className="text-green-500" />
                  </div>
                  <div>
                    <CardTitle>Suscripciones en Tiempo Real</CardTitle>
                    <CardDescription>
                      Los datos se actualizan automáticamente cuando cambian en la base de datos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <RealtimeDemo />

            <Card>
              <CardHeader>
                <CardTitle>Cómo Funciona</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Suscripción Automática</h4>
                      <p className="text-sm text-muted-foreground">
                        El componente se suscribe a cambios en la tabla de base de datos
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Detección de Cambios</h4>
                      <p className="text-sm text-muted-foreground">
                        Supabase detecta INSERT, UPDATE o DELETE en tiempo real
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Actualización Instantánea</h4>
                      <p className="text-sm text-muted-foreground">
                        La UI se actualiza automáticamente sin necesidad de refrescar
                      </p>
                    </div>
                  </div>
                  <Alert className="mt-4">
                    <AlertDescription>
                      💡 <strong>Prueba esto:</strong> Abre esta página en dos pestañas diferentes. 
                      Agrega o elimina un registro en una pestaña y observa cómo se actualiza 
                      automáticamente en la otra.
                    </AlertDescription>
                  </Alert>
                </div>
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
