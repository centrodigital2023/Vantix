import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Database, CheckCircle, XCircle, Eye, EyeSlash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { supabase } from '@/lib/supabase'

export function SupabaseConfig() {
  const [supabaseUrl, setSupabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey, setSupabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [showKey, setShowKey] = useState(false)
  const [testing, setTesting] = useState(false)
  const [connected, setConnected] = useState(false)

  const urlValue = supabaseUrl || ''
  const keyValue = supabaseKey || ''

  useEffect(() => {
    if (urlValue && keyValue) {
      testConnection()
    }
  }, [])

  const testConnection = async () => {
    if (!urlValue || !keyValue) return

    setTesting(true)
    try {
      const { error } = await supabase.from('accommodations').select('count').limit(1)
      
      if (error && error.message.includes('relation') === false) {
        throw error
      }

      setConnected(true)
      toast.success('Conexión exitosa con Supabase')
    } catch (error) {
      setConnected(false)
      toast.error('Error al conectar con Supabase')
    } finally {
      setTesting(false)
    }
  }

  const saveCredentials = async () => {
    if (!urlValue || !keyValue) {
      toast.error('Por favor completa ambos campos')
      return
    }

    setSupabaseUrl(() => urlValue)
    setSupabaseKey(() => keyValue)
    
    toast.success('Credenciales guardadas')
    
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const isConfigured = urlValue && keyValue

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Database size={32} weight="duotone" className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Configuración de Supabase</h1>
          <p className="text-muted-foreground">
            Conecta tu aplicación con Supabase para habilitar todas las funcionalidades
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Credenciales de Supabase</CardTitle>
            <CardDescription>
              Obtén estas credenciales desde tu proyecto de Supabase: Settings → API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supabase-url">Project URL</Label>
              <Input
                id="supabase-url"
                placeholder="https://tu-proyecto.supabase.co"
                value={urlValue}
                onChange={(e) => setSupabaseUrl(() => e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supabase-key">Anon/Public Key</Label>
              <div className="relative">
                <Input
                  id="supabase-key"
                  type={showKey ? 'text' : 'password'}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={keyValue}
                  onChange={(e) => setSupabaseKey(() => e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeSlash size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            {isConfigured && (
              <Alert className={connected ? 'border-green-600/20 bg-green-50/50' : 'border-orange-600/20 bg-orange-50/50'}>
                {connected ? (
                  <CheckCircle size={18} weight="fill" className="text-green-600" />
                ) : (
                  <XCircle size={18} weight="fill" className="text-orange-600" />
                )}
                <AlertDescription className={connected ? 'text-green-700' : 'text-orange-700'}>
                  {connected ? 'Conectado correctamente a Supabase' : 'No se pudo verificar la conexión'}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={saveCredentials} 
                disabled={!urlValue || !keyValue}
                className="flex-1"
              >
                Guardar Credenciales
              </Button>
              <Button 
                onClick={testConnection} 
                variant="outline"
                disabled={!urlValue || !keyValue || testing}
              >
                {testing ? 'Probando...' : 'Probar Conexión'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Siguiente Paso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="font-medium">1. Crea las tablas en Supabase</p>
              <p className="text-muted-foreground">
                Ve al SQL Editor en Supabase y ejecuta el archivo <code className="bg-muted px-1 py-0.5 rounded">supabase-migration.sql</code>
              </p>
              
              <p className="font-medium mt-4">2. Configura las políticas de seguridad</p>
              <p className="text-muted-foreground">
                Las políticas RLS ya están incluidas en la migración para proteger tus datos
              </p>

              <p className="font-medium mt-4">3. ¡Listo para usar!</p>
              <p className="text-muted-foreground">
                Una vez guardadas las credenciales, la aplicación se conectará automáticamente
              </p>
            </div>
          </CardContent>
        </Card>

        {!isConfigured && (
          <Alert>
            <AlertDescription>
              💡 <strong>Tip:</strong> Si no tienes un proyecto de Supabase, créalo gratis en{' '}
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
                supabase.com
              </a>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
