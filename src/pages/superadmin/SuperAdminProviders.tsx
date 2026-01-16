import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagnifyingGlass, Buildings, ShieldCheck, Prohibit, FileText, Sparkle, CheckCircle, Warning } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface Provider {
  id: string
  name: string
  email: string
  type: 'host' | 'transport' | 'tour' | 'experience' | 'gastronomy'
  status: 'pending' | 'active' | 'suspended' | 'rejected'
  country: string
  city: string
  servicesCount: number
  totalBookings: number
  averageRating: number
  complaintsCount: number
  riskScore: number
  legalScore: number
  reputationScore: number
  documentsStatus: 'pending' | 'approved' | 'rejected' | 'incomplete'
  hasRNT: boolean
  hasInsurance: boolean
  createdAt: string
  aiRecommendation?: string
}

interface SuperAdminProvidersProps {
  onNavigate: (page: string) => void
}

export function SuperAdminProviders({ onNavigate }: SuperAdminProvidersProps) {
  const [providers, setProviders] = useKV<Provider[]>('superadmin-providers', [
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@gmail.com',
      type: 'host',
      status: 'pending',
      country: 'Colombia',
      city: 'Pasto',
      servicesCount: 1,
      totalBookings: 0,
      averageRating: 0,
      complaintsCount: 0,
      riskScore: 15,
      legalScore: 85,
      reputationScore: 90,
      documentsStatus: 'approved',
      hasRNT: false,
      hasInsurance: true,
      createdAt: '2025-01-21T09:00:00',
      aiRecommendation: 'APROBAR - Documentación completa, ubicación verificada, seguro activo. Riesgo bajo.'
    },
    {
      id: '2',
      name: 'Tours Nariño SAS',
      email: 'info@toursnarino.com',
      type: 'tour',
      status: 'active',
      country: 'Colombia',
      city: 'Pasto',
      servicesCount: 8,
      totalBookings: 245,
      averageRating: 4.7,
      complaintsCount: 2,
      riskScore: 20,
      legalScore: 95,
      reputationScore: 94,
      documentsStatus: 'approved',
      hasRNT: true,
      hasInsurance: true,
      createdAt: '2024-06-15T10:30:00',
      aiRecommendation: 'Proveedor confiable con excelente historial'
    },
    {
      id: '3',
      name: 'Transporte Rápido',
      email: 'transporte@ejemplo.com',
      type: 'transport',
      status: 'suspended',
      country: 'Colombia',
      city: 'Cali',
      servicesCount: 3,
      totalBookings: 89,
      averageRating: 3.2,
      complaintsCount: 12,
      riskScore: 78,
      legalScore: 45,
      reputationScore: 35,
      documentsStatus: 'incomplete',
      hasRNT: false,
      hasInsurance: false,
      createdAt: '2024-11-10T14:20:00',
      aiRecommendation: 'SUSPENDER - Múltiples quejas de seguridad, documentación incompleta, sin seguro'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [showProviderDialog, setShowProviderDialog] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const filteredProviders = (providers || []).filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || provider.type === typeFilter
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const pendingProviders = (providers || []).filter(p => p.status === 'pending')

  const handleViewProvider = (provider: Provider) => {
    setSelectedProvider(provider)
    setShowProviderDialog(true)
  }

  const handleAnalyzeWithAI = async () => {
    if (!selectedProvider) return
    setIsAnalyzing(true)

    try {
      // @ts-expect-error - TypeScript incorrectly infers template literal type
      const prompt = window.spark.llmPrompt`Eres un auditor legal y de riesgo para una plataforma turística.
      
      Analiza este proveedor y genera una recomendación:
      
      Nombre: ${selectedProvider.name}
      Tipo: ${selectedProvider.type}
      País: ${selectedProvider.country}
      Ciudad: ${selectedProvider.city}
      Servicios: ${selectedProvider.servicesCount}
      Reservas totales: ${selectedProvider.totalBookings}
      Rating promedio: ${selectedProvider.averageRating}
      Quejas: ${selectedProvider.complaintsCount}
      Documentos: ${selectedProvider.documentsStatus}
      Tiene RNT: ${selectedProvider.hasRNT ? 'Sí' : 'No'}
      Tiene seguro: ${selectedProvider.hasInsurance ? 'Sí' : 'No'}
      
      Genera:
      1. Score riesgo (0-100)
      2. Score legal (0-100)
      3. Score reputación (0-100)
      4. Acción: APROBAR/RECHAZAR/OBSERVAR/SUSPENDER
      5. Razones
      
      Español Colombia.`

      const response = await window.spark.llm(prompt, 'gpt-4o')
      
      setSelectedProvider({
        ...selectedProvider,
        aiRecommendation: response
      })

      toast.success('Análisis de IA completado')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      
      if (errorMessage.includes('400') || errorMessage.toLowerCase().includes('bad request')) {
        toast.error('Error 400: Información del proveedor demasiado extensa.')
      } else {
        toast.error('Error al analizar con IA')
      }
      
      console.error(error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleChangeStatus = (providerId: string, newStatus: Provider['status']) => {
    setProviders((currentProviders) =>
      (currentProviders || []).map(p =>
        p.id === providerId ? { ...p, status: newStatus } : p
      )
    )
    toast.success(`Proveedor ${newStatus === 'active' ? 'aprobado' : newStatus === 'suspended' ? 'suspendido' : 'rechazado'}`)
    setShowProviderDialog(false)
  }

  const getTypeBadge = (type: Provider['type']) => {
    const colors = {
      host: 'bg-green-100 text-green-700 border-green-300',
      transport: 'bg-blue-100 text-blue-700 border-blue-300',
      tour: 'bg-purple-100 text-purple-700 border-purple-300',
      experience: 'bg-orange-100 text-orange-700 border-orange-300',
      gastronomy: 'bg-pink-100 text-pink-700 border-pink-300'
    }
    const labels = {
      host: 'Anfitrión',
      transport: 'Transporte',
      tour: 'Tour',
      experience: 'Experiencia',
      gastronomy: 'Gastronomía'
    }
    return (
      <Badge className={`${colors[type]} border`} variant="outline">
        {labels[type]}
      </Badge>
    )
  }

  const getStatusBadge = (status: Provider['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      active: 'bg-green-100 text-green-700 border-green-300',
      suspended: 'bg-orange-100 text-orange-700 border-orange-300',
      rejected: 'bg-red-100 text-red-700 border-red-300'
    }
    const labels = {
      pending: 'Pendiente',
      active: 'Activo',
      suspended: 'Suspendido',
      rejected: 'Rechazado'
    }
    return (
      <Badge className={`${colors[status]} border`} variant="outline">
        {labels[status]}
      </Badge>
    )
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600'
    if (score < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => onNavigate('superadmin-dashboard')} className="mb-4">
            ← Volver al Dashboard
          </Button>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Control de Anfitriones y Prestadores
              </h1>
              <p className="text-muted-foreground text-lg">
                Gestiona y aprueba servicios turísticos con asistencia de IA
              </p>
            </div>
            {pendingProviders.length > 0 && (
              <Badge className="bg-orange-100 text-orange-700 text-lg px-4 py-2">
                {pendingProviders.length} pendientes de aprobación
              </Badge>
            )}
          </div>
        </motion.div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar proveedores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="host">Anfitriones</SelectItem>
                  <SelectItem value="transport">Transporte</SelectItem>
                  <SelectItem value="tour">Tours</SelectItem>
                  <SelectItem value="experience">Experiencias</SelectItem>
                  <SelectItem value="gastronomy">Gastronomía</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="suspended">Suspendidos</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => handleViewProvider(provider)}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <Buildings className="w-12 h-12 text-muted-foreground flex-shrink-0" weight="duotone" />
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.email}</p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {getTypeBadge(provider.type)}
                          {getStatusBadge(provider.status)}
                          {provider.hasRNT && (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-300 border" variant="outline">
                              ✓ RNT
                            </Badge>
                          )}
                          {provider.hasInsurance && (
                            <Badge className="bg-green-100 text-green-700 border-green-300 border" variant="outline">
                              🛡️ Seguro
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Ubicación</span>
                            <p className="font-medium">{provider.city}, {provider.country}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Servicios</span>
                            <p className="font-medium">{provider.servicesCount}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reservas</span>
                            <p className="font-medium">{provider.totalBookings}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rating</span>
                            <p className="font-medium">
                              {provider.averageRating > 0 ? `⭐ ${provider.averageRating}` : 'Sin rating'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Riesgo</p>
                            <p className={`text-lg font-bold ${getRiskColor(provider.riskScore)}`}>
                              {provider.riskScore}
                            </p>
                          </div>
                          <div className="p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Legal</p>
                            <p className={`text-lg font-bold ${getScoreColor(provider.legalScore)}`}>
                              {provider.legalScore}
                            </p>
                          </div>
                          <div className="p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">Reputación</p>
                            <p className={`text-lg font-bold ${getScoreColor(provider.reputationScore)}`}>
                              {provider.reputationScore}
                            </p>
                          </div>
                        </div>

                        {provider.aiRecommendation && (
                          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <Sparkle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" weight="duotone" />
                            <p className="text-sm">{provider.aiRecommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Buildings className="w-16 h-16 text-muted-foreground mx-auto mb-4" weight="duotone" />
              <h3 className="text-xl font-bold mb-2">No hay proveedores</h3>
              <p className="text-muted-foreground">No se encontraron resultados con los filtros aplicados</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={showProviderDialog} onOpenChange={setShowProviderDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles del Proveedor</DialogTitle>
              <DialogDescription>
                Revisa información completa y toma decisiones con asistencia de IA
              </DialogDescription>
            </DialogHeader>
            {selectedProvider && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Buildings className="w-16 h-16 text-muted-foreground" weight="duotone" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{selectedProvider.name}</h3>
                    <p className="text-muted-foreground">{selectedProvider.email}</p>
                    <div className="flex gap-2 mt-2">
                      {getTypeBadge(selectedProvider.type)}
                      {getStatusBadge(selectedProvider.status)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAnalyzeWithAI}
                    disabled={isAnalyzing}
                  >
                    <Sparkle className="w-4 h-4 mr-2" weight="duotone" />
                    {isAnalyzing ? 'Analizando...' : 'Analizar con IA'}
                  </Button>
                </div>

                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="scores">Scores IA</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                    <TabsTrigger value="history">Historial</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Ubicación</label>
                        <p className="text-sm text-muted-foreground">{selectedProvider.city}, {selectedProvider.country}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Servicios publicados</label>
                        <p className="text-sm text-muted-foreground">{selectedProvider.servicesCount}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Reservas totales</label>
                        <p className="text-sm text-muted-foreground">{selectedProvider.totalBookings}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Rating promedio</label>
                        <p className="text-sm text-muted-foreground">
                          {selectedProvider.averageRating > 0 ? `⭐ ${selectedProvider.averageRating} / 5.0` : 'Sin calificaciones aún'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Quejas</label>
                        <p className={`text-sm font-bold ${selectedProvider.complaintsCount > 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedProvider.complaintsCount}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Miembro desde</label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedProvider.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="scores" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Score de Riesgo</span>
                          <span className={`text-2xl font-bold ${getRiskColor(selectedProvider.riskScore)}`}>
                            {selectedProvider.riskScore} / 100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${
                              selectedProvider.riskScore < 30 ? 'bg-green-500' :
                              selectedProvider.riskScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedProvider.riskScore}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {selectedProvider.riskScore < 30 ? '🟢 Riesgo bajo - Confiable' :
                           selectedProvider.riskScore < 60 ? '🟡 Riesgo medio - Monitorear' :
                           '🔴 Riesgo alto - Acción requerida'}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Score Legal</span>
                          <span className={`text-2xl font-bold ${getScoreColor(selectedProvider.legalScore)}`}>
                            {selectedProvider.legalScore} / 100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${
                              selectedProvider.legalScore >= 80 ? 'bg-green-500' :
                              selectedProvider.legalScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedProvider.legalScore}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {selectedProvider.legalScore >= 80 ? '✓ Cumplimiento completo' :
                           selectedProvider.legalScore >= 60 ? '⚠️ Documentación pendiente' :
                           '❌ Incumplimiento normativo'}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Score Reputacional</span>
                          <span className={`text-2xl font-bold ${getScoreColor(selectedProvider.reputationScore)}`}>
                            {selectedProvider.reputationScore} / 100
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${
                              selectedProvider.reputationScore >= 80 ? 'bg-green-500' :
                              selectedProvider.reputationScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedProvider.reputationScore}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Basado en calificaciones, reseñas y comportamiento
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" weight="duotone" />
                          <div>
                            <p className="font-medium">Estado de documentos</p>
                            <p className="text-sm text-muted-foreground">Revisión de documentación legal</p>
                          </div>
                        </div>
                        <Badge className={
                          selectedProvider.documentsStatus === 'approved' ? 'bg-green-100 text-green-700 border-green-300 border' :
                          selectedProvider.documentsStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300 border' :
                          'bg-red-100 text-red-700 border-red-300 border'
                        } variant="outline">
                          {selectedProvider.documentsStatus === 'approved' ? '✓ Aprobado' :
                           selectedProvider.documentsStatus === 'pending' ? '⏳ Pendiente' :
                           selectedProvider.documentsStatus === 'rejected' ? '✗ Rechazado' :
                           '⚠️ Incompleto'}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-muted-foreground" weight="duotone" />
                          <div>
                            <p className="font-medium">Registro Nacional de Turismo (RNT)</p>
                            <p className="text-sm text-muted-foreground">Certificación obligatoria Colombia</p>
                          </div>
                        </div>
                        {selectedProvider.hasRNT ? (
                          <Badge className="bg-green-100 text-green-700 border-green-300 border" variant="outline">
                            ✓ Aprobado
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 border" variant="outline">
                            En proceso
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-muted-foreground" weight="duotone" />
                          <div>
                            <p className="font-medium">Seguro de responsabilidad</p>
                            <p className="text-sm text-muted-foreground">Cobertura de daños y accidentes</p>
                          </div>
                        </div>
                        {selectedProvider.hasInsurance ? (
                          <Badge className="bg-green-100 text-green-700 border-green-300 border" variant="outline">
                            ✓ Activo
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 border-red-300 border" variant="outline">
                            No contratado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-3">
                    {[
                      { time: '2 días', action: 'Proveedor registrado', type: 'info' },
                      { time: '2 días', action: 'Documentos subidos para revisión', type: 'info' },
                      { time: '1 día', action: 'IA analizó documentos - Aprobados', type: 'success' },
                      { time: '1 día', action: 'Seguro contratado', type: 'success' }
                    ].map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          event.type === 'success' ? 'bg-green-500' :
                          event.type === 'warning' ? 'bg-orange-500' :
                          event.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{event.action}</p>
                          <p className="text-xs text-muted-foreground">hace {event.time}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>

                {selectedProvider.aiRecommendation && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkle className="w-5 h-5 text-primary" weight="duotone" />
                      <h4 className="font-bold">Recomendación de IA</h4>
                    </div>
                    <p className="text-sm whitespace-pre-line">{selectedProvider.aiRecommendation}</p>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-sm font-medium">Acciones del Sistema</label>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => handleChangeStatus(selectedProvider.id, 'active')}
                      disabled={selectedProvider.status === 'active'}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" weight="duotone" />
                      Aprobar
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleChangeStatus(selectedProvider.id, 'suspended')}
                      disabled={selectedProvider.status === 'suspended'}
                    >
                      <Warning className="w-4 h-4 mr-2" weight="duotone" />
                      Suspender
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleChangeStatus(selectedProvider.id, 'rejected')}
                      disabled={selectedProvider.status === 'rejected'}
                    >
                      <Prohibit className="w-4 h-4 mr-2" weight="duotone" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProviderDialog(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
