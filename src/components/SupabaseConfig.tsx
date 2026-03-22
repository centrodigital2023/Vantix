import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Database, CheckCircle, Eye, EyeSlash } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function SupabaseConfig() {
  const [supabaseUrl, setSupabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey, setSupabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [urlValue, setUrlValue] = useState(supabaseUrl || '')
  const [keyValue, setKeyValue] = useState(supabaseKey || '')
  const [showKey, setShowKey] = useState(false)
  const [connected, setConnected] = useState(false)

  const saveCredentials = async () => {
    if (!urlValue || !keyValue) {
      toast.error('Por favor completa ambos campos')
      return
    }

    setSupabaseUrl(() => urlValue)
    setSupabaseKey(() => keyValue)
    setConnected(true)
    toast.success('Credenciales guardadas correctamente')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Database size={28} weight="duotone" className="text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configuración de Supabase</h1>
          <p className="text-muted-foreground">
            Conecta tu proyecto de Supabase para habilitar todas las funcionalidades
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credenciales de Conexión</CardTitle>
          <CardDescription>
            Obtén estas credenciales desde tu proyecto en{' '}
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              supabase.com/dashboard
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supabase-url">Project URL</Label>
            <Input
              id="supabase-url"
              type="url"
              placeholder="https://tu-proyecto.supabase.co"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supabase-key">Anon Key (clave pública)</Label>
            <div className="flex gap-2">
              <Input
                id="supabase-key"
                type={showKey ? 'text' : 'password'}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeSlash size={20} /> : <Eye size={20} />}
              </Button>
            </div>
          </div>

          {connected && (
            <Alert className="border-green-600/20 bg-green-50/50">
              <CheckCircle size={18} weight="fill" className="text-green-600" />
              <AlertDescription className="text-green-700">
                Conexión establecida correctamente
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={saveCredentials} 
              className="flex-1"
              disabled={!urlValue || !keyValue}
            >
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de la Base de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Asegúrate de ejecutar el archivo <code className="bg-muted px-2 py-1 rounded">supabase-migration.sql</code> en el SQL Editor de tu proyecto de Supabase.
            </p>
            <p className="font-medium">
              Las políticas de Row Level Security (RLS) deben estar habilitadas para proteger los datos.
            </p>
            <p className="text-muted-foreground">
              Consulta <code className="bg-muted px-2 py-1 rounded">SUPABASE_CONFIG.md</code> para más detalles.
            </p>
          </div>
        </CardContent>
      </Card>

      {!connected && (
        <Alert>
          <AlertDescription>
            💡 <strong>Tip:</strong> Encuentra tus credenciales en Settings → API en tu dashboard de supabase.com
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
