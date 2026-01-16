import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  WifiHigh, 
  WifiSlash, 
  Plus,
  Trash,
  ArrowsClockwise
} from '@phosphor-icons/react'
import { useSupabaseRealtimeQuery } from '@/hooks/use-supabase-realtime'
import { useSupabaseMutation } from '@/hooks/use-supabase-data'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

interface TestRecord {
  id: string
  name: string
  description: string
  created_at: string
}

export function RealtimeDemo() {
  const [supabaseUrl] = useKV<string>('VITE_SUPABASE_URL', '')
  const [supabaseKey] = useKV<string>('VITE_SUPABASE_ANON_KEY', '')
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const isConfigured = Boolean(supabaseUrl && supabaseKey)

  const {
    data: records,
    loading,
    error,
    refetch
  } = useSupabaseRealtimeQuery<TestRecord>({
    table: 'accommodations',
    initialQuery: {
      orderBy: { column: 'created_at', ascending: false },
      limit: 10
    }
  })

  const { insert, remove, loading: mutationLoading } = useSupabaseMutation('accommodations')

  const handleAdd = async () => {
    if (!newName.trim()) {
      toast.error('El nombre es requerido')
      return
    }

    try {
      await insert({
        name: newName,
        description: newDescription || null,
        status: 'active',
        category: 'naturaleza',
        city: 'Demo',
        department: 'Demo',
        base_price: 0
      })

      setNewName('')
      setNewDescription('')
      toast.success('Registro agregado')
    } catch (error: any) {
      toast.error('Error al agregar registro', {
        description: error.message
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await remove(id)
      toast.success('Registro eliminado')
    } catch (error: any) {
      toast.error('Error al eliminar registro', {
        description: error.message
      })
    }
  }

  if (!isConfigured) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WifiSlash size={24} className="text-muted-foreground" />
            Tiempo Real - No Configurado
          </CardTitle>
          <CardDescription>
            Configura Supabase para ver las actualizaciones en tiempo real
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <WifiHigh size={24} className="text-green-500" />
              Demo de Tiempo Real
              <Badge variant="outline" className="ml-2">
                {records.length} registros
              </Badge>
            </CardTitle>
            <CardDescription>
              Los cambios se sincronizan automáticamente entre todas las ventanas abiertas
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={loading}
          >
            <ArrowsClockwise size={18} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Ej: Hotel Paradise"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={mutationLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Descripción opcional"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              disabled={mutationLoading}
            />
          </div>

          <Button
            onClick={handleAdd}
            disabled={mutationLoading || !newName.trim()}
            className="w-full"
          >
            <Plus className="mr-2" size={18} />
            Agregar Registro
          </Button>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold mb-4">Registros Actuales</h4>
          
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center p-8 text-destructive">
              <p>Error al cargar datos: {error.message}</p>
            </div>
          )}

          {!loading && !error && records.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              <p>No hay registros. Agrega uno para comenzar.</p>
            </div>
          )}

          {!loading && !error && records.length > 0 && (
            <div className="space-y-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium truncate">{record.name}</h5>
                    {record.description && (
                      <p className="text-sm text-muted-foreground truncate">
                        {record.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(record.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(record.id)}
                    disabled={mutationLoading}
                  >
                    <Trash size={18} className="text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
