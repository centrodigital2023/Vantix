import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { SupabaseConfig } from '@/components/SupabaseConfig'
import { StorageBucketTest } from '@/components/StorageBucketTest'
import { RealtimeDemo } from '@/components/RealtimeDemo'
import { Database, CloudArrowUp, WifiHigh } from '@phosphor-icons/react'

export function SupabaseTestingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Pruebas de Supabase
            </h1>
            <p className="text-muted-foreground text-lg">
              Configura y prueba Storage, Realtime y base de datos
            </p>
          </div>

          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config" className="gap-2">
                <Database size={18} />
                <span className="hidden sm:inline">Configuración</span>
              </TabsTrigger>
              <TabsTrigger value="storage" className="gap-2">
                <CloudArrowUp size={18} />
                <span className="hidden sm:inline">Storage</span>
              </TabsTrigger>
              <TabsTrigger value="realtime" className="gap-2">
                <WifiHigh size={18} />
                <span className="hidden sm:inline">Realtime</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="mt-6">
              <SupabaseConfig />
            </TabsContent>

            <TabsContent value="storage" className="mt-6">
              <StorageBucketTest />
            </TabsContent>

            <TabsContent value="realtime" className="mt-6">
              <RealtimeDemo />
            </TabsContent>
          </Tabs>

          <Card className="p-6 bg-muted/30">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Guía Rápida</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      1
                    </div>
                    <span>Configuración</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Ingresa tus credenciales de Supabase para conectar la aplicación
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      2
                    </div>
                    <span>Storage</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Crea el bucket y prueba la carga de imágenes reales
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">
                      3
                    </div>
                    <span>Realtime</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Verifica que los cambios se sincronicen en tiempo real
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
