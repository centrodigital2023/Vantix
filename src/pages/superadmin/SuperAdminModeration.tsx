import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { MagnifyingGlass, Eye, CheckCircle, XCircle, Warning, Sparkle, ShieldCheck, ImageSquare, FileText } from '@phosphor-icons/react'
import { SuperAdminHeader } from '@/components/superadmin/SuperAdminHeader'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface ModerationItem {
  id: string
  type: 'accommodation' | 'service' | 'review' | 'profile' | 'image'
  title: string
  content: string
  submittedBy: string
  submittedByEmail: string
  status: 'pending' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high' | 'critical'
  aiScore: number
  aiFlags: string[]
  aiRecommendation: 'approve' | 'review' | 'reject'
  aiReason: string
  category: string
  createdAt: string
  reviewedAt?: string
  reviewedBy?: string
  moderationNotes?: string
  images?: string[]
}

interface SuperAdminModerationProps {
  onNavigate: (page: string) => void
}

export function SuperAdminModeration({ onNavigate }: SuperAdminModerationProps) {
  const [items, setItems] = useKV<ModerationItem[]>('superadmin-moderation-items', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<string>('pending')
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [moderationNotes, setModerationNotes] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!items || items.length === 0) {
      const sampleItems: ModerationItem[] = [
        {
          id: '1',
          type: 'accommodation',
          title: 'Cabaña Exclusiva en Lago Guamuez',
          content: 'Hermosa cabaña con vista al lago, incluye jacuzzi privado y desayuno. Precio especial para estadías largas.',
          submittedBy: 'María González',
          submittedByEmail: 'maria.gonzalez@gmail.com',
          status: 'pending',
          priority: 'high',
          aiScore: 78,
          aiFlags: ['Precio inusualmente bajo', 'Imágenes de calidad profesional'],
          aiRecommendation: 'review',
          aiReason: 'El precio parece muy bajo para las comodidades ofrecidas. Recomendar verificar autenticidad de las imágenes.',
          category: 'Alojamiento',
          createdAt: '2025-01-21T10:30:00',
          images: ['cabin1.jpg', 'cabin2.jpg', 'cabin3.jpg']
        },
        {
          id: '2',
          type: 'review',
          title: 'Reseña de Hotel Conquistador',
          content: 'Peor experiencia de mi vida. El hotel es una estafa total. No vayan nunca!!! Fraude!!!',
          submittedBy: 'Carlos Ruiz',
          submittedByEmail: 'carlos.ruiz@hotmail.com',
          status: 'pending',
          priority: 'critical',
          aiScore: 35,
          aiFlags: ['Lenguaje extremo', 'Múltiples signos de exclamación', 'Acusaciones de fraude'],
          aiRecommendation: 'reject',
          aiReason: 'Contenido agresivo sin detalles específicos. Posible intento de difamación o competencia desleal.',
          category: 'Reseñas',
          createdAt: '2025-01-21T09:15:00'
        },
        {
          id: '3',
          type: 'service',
          title: 'Tour Aventura Volcán Galeras',
          content: 'Tour extremo al cráter del volcán Galeras. Incluye equipo profesional, guía experto certificado y seguro de accidentes.',
          submittedBy: 'Adventure Tours Nariño',
          submittedByEmail: 'info@adventuretours.co',
          status: 'pending',
          priority: 'medium',
          aiScore: 92,
          aiFlags: [],
          aiRecommendation: 'approve',
          aiReason: 'Contenido profesional, menciona certificaciones y seguros. Proveedor verificado previamente.',
          category: 'Experiencias',
          createdAt: '2025-01-21T08:00:00',
          images: ['volcano1.jpg']
        },
        {
          id: '4',
          type: 'image',
          title: 'Imágenes de Restaurante La Parrilla',
          content: 'Fotografías del menú y ambiente del restaurante',
          submittedBy: 'Restaurante La Parrilla',
          submittedByEmail: 'laparrilla@gmail.com',
          status: 'pending',
          priority: 'low',
          aiScore: 45,
          aiFlags: ['Imágenes de stock detectadas', 'Marca de agua visible'],
          aiRecommendation: 'reject',
          aiReason: 'Las imágenes no parecen ser originales. Se detectaron marcas de agua de bancos de imágenes.',
          category: 'Multimedia',
          createdAt: '2025-01-20T16:45:00',
          images: ['menu1.jpg', 'menu2.jpg']
        },
        {
          id: '5',
          type: 'profile',
          title: 'Perfil de Anfitrión - Juan Pérez',
          content: 'Soy un anfitrión profesional con más de 10 propiedades en toda Colombia. Garantizo la mejor experiencia.',
          submittedBy: 'Juan Pérez',
          submittedByEmail: 'juan.perez@example.com',
          status: 'pending',
          priority: 'medium',
          aiScore: 65,
          aiFlags: ['Afirmaciones exageradas', 'Sin verificación de propiedades'],
          aiRecommendation: 'review',
          aiReason: 'Las afirmaciones sobre 10 propiedades no están verificadas. Solicitar documentación.',
          category: 'Perfiles',
          createdAt: '2025-01-20T14:20:00'
        }
      ]
      setItems(() => sampleItems)
    }
  }, [])

  const filteredItems = (items || []).filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority
    const matchesStatus = activeTab === 'all' || item.status === activeTab
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const stats = {
    pending: (items || []).filter(i => i.status === 'pending').length,
    approved: (items || []).filter(i => i.status === 'approved').length,
    rejected: (items || []).filter(i => i.status === 'rejected').length,
    critical: (items || []).filter(i => i.priority === 'critical' && i.status === 'pending').length
  }

  const handleAnalyzeWithAI = async (item: ModerationItem) => {
    setIsAnalyzing(true)
    try {
      const prompt = window.spark.llmPrompt`Analiza el siguiente contenido para moderación:

Tipo: ${item.type}
Título: ${item.title}
Contenido: ${item.content}
Categoría: ${item.category}

Proporciona:
1. Un score de confianza (0-100)
2. Flags de alerta si los hay
3. Recomendación: aprobar, revisar o rechazar
4. Razón detallada

Responde en formato JSON con las propiedades: score, flags (array), recommendation, reason`

      const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const analysis = JSON.parse(response)
      
      setItems(currentItems => 
        (currentItems || []).map(i => 
          i.id === item.id 
            ? {
                ...i,
                aiScore: analysis.score,
                aiFlags: analysis.flags,
                aiRecommendation: analysis.recommendation,
                aiReason: analysis.reason
              }
            : i
        )
      )
      
      toast.success('Análisis de IA completado')
    } catch (error) {
      toast.error('Error al analizar con IA')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleApprove = (item: ModerationItem) => {
    setItems(currentItems =>
      (currentItems || []).map(i =>
        i.id === item.id
          ? {
              ...i,
              status: 'approved' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'SuperAdmin',
              moderationNotes
            }
          : i
      )
    )
    setShowDetailDialog(false)
    setModerationNotes('')
    toast.success('Contenido aprobado exitosamente')
  }

  const handleReject = (item: ModerationItem) => {
    if (!moderationNotes.trim()) {
      toast.error('Debes agregar notas de moderación para rechazar')
      return
    }
    
    setItems(currentItems =>
      (currentItems || []).map(i =>
        i.id === item.id
          ? {
              ...i,
              status: 'rejected' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'SuperAdmin',
              moderationNotes
            }
          : i
      )
    )
    setShowDetailDialog(false)
    setModerationNotes('')
    toast.success('Contenido rechazado')
  }

  const handleViewDetail = (item: ModerationItem) => {
    setSelectedItem(item)
    setModerationNotes(item.moderationNotes || '')
    setShowDetailDialog(true)
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      critical: { label: 'Crítica', className: 'bg-destructive text-destructive-foreground' },
      high: { label: 'Alta', className: 'bg-warning text-warning-foreground' },
      medium: { label: 'Media', className: 'bg-info text-info-foreground' },
      low: { label: 'Baja', className: 'bg-muted text-muted-foreground' }
    }
    const variant = variants[priority] || variants.low
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      accommodation: 'Alojamiento',
      service: 'Servicio',
      review: 'Reseña',
      profile: 'Perfil',
      image: 'Imagen'
    }
    return <Badge variant="outline">{labels[type] || type}</Badge>
  }

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'approve': return <CheckCircle className="text-success" weight="fill" />
      case 'reject': return <XCircle className="text-destructive" weight="fill" />
      default: return <Warning className="text-warning" weight="fill" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <SuperAdminHeader
        title="Moderación de Contenido"
        subtitle="Sistema inteligente de moderación con IA"
        onNavigate={onNavigate}
        showAlerts
        alertCount={stats.critical}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <Warning className="w-6 h-6 text-warning" weight="fill" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aprobados</p>
                  <p className="text-3xl font-bold text-foreground">{stats.approved}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" weight="fill" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rechazados</p>
                  <p className="text-3xl font-bold text-foreground">{stats.rejected}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-destructive" weight="fill" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Críticos</p>
                  <p className="text-3xl font-bold text-destructive">{stats.critical}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-destructive" weight="fill" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar contenido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de contenido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="accommodation">Alojamientos</SelectItem>
                  <SelectItem value="service">Servicios</SelectItem>
                  <SelectItem value="review">Reseñas</SelectItem>
                  <SelectItem value="profile">Perfiles</SelectItem>
                  <SelectItem value="image">Imágenes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las prioridades</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pendientes ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Aprobados ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rechazados ({stats.rejected})
            </TabsTrigger>
            <TabsTrigger value="all">
              Todos ({(items || []).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredItems.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No se encontraron elementos para moderar
                </CardContent>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            {getTypeBadge(item.type)}
                            {getPriorityBadge(item.priority)}
                            {item.status === 'approved' && (
                              <Badge className="bg-success text-success-foreground">
                                <CheckCircle className="mr-1" weight="fill" />
                                Aprobado
                              </Badge>
                            )}
                            {item.status === 'rejected' && (
                              <Badge className="bg-destructive text-destructive-foreground">
                                <XCircle className="mr-1" weight="fill" />
                                Rechazado
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {item.content}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              Por: <span className="text-foreground font-medium">{item.submittedBy}</span>
                            </span>
                            <span className="text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          {item.aiFlags.length > 0 && (
                            <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                              <div className="flex items-start gap-2">
                                <Sparkle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" weight="fill" />
                                <div className="text-sm">
                                  <span className="font-medium text-warning">Alertas IA:</span>
                                  <span className="text-foreground ml-2">{item.aiFlags.join(', ')}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">{item.aiScore}</div>
                            <div className="text-xs text-muted-foreground">Score IA</div>
                            <div className="mt-1">{getRecommendationIcon(item.aiRecommendation)}</div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(item)}
                          >
                            <Eye className="mr-2" />
                            Ver Detalle
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Detalle de Moderación</DialogTitle>
                <DialogDescription>
                  Revisa el contenido y toma una decisión basada en las políticas de la plataforma
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  {getTypeBadge(selectedItem.type)}
                  {getPriorityBadge(selectedItem.priority)}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedItem.title}</h3>
                  <p className="text-muted-foreground">{selectedItem.content}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Enviado por</p>
                    <p className="font-medium">{selectedItem.submittedBy}</p>
                    <p className="text-sm text-muted-foreground">{selectedItem.submittedByEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de envío</p>
                    <p className="font-medium">
                      {new Date(selectedItem.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-200/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkle className="w-5 h-5 text-purple-600" weight="fill" />
                    <h4 className="font-semibold">Análisis de IA</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Score de Confianza:</span>
                      <span className="text-2xl font-bold">{selectedItem.aiScore}/100</span>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Recomendación:</span>
                      <div className="flex items-center gap-2 mt-1">
                        {getRecommendationIcon(selectedItem.aiRecommendation)}
                        <span className="font-medium capitalize">{selectedItem.aiRecommendation}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Razón:</span>
                      <p className="mt-1 text-sm">{selectedItem.aiReason}</p>
                    </div>

                    {selectedItem.aiFlags.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Alertas detectadas:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedItem.aiFlags.map((flag, idx) => (
                            <Badge key={idx} variant="outline" className="text-warning border-warning">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedItem.images && selectedItem.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ImageSquare className="w-5 h-5" />
                      Imágenes adjuntas ({selectedItem.images.length})
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedItem.images.map((img, idx) => (
                        <div key={idx} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <ImageSquare className="w-8 h-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Notas de Moderación {selectedItem.status === 'pending' && <span className="text-destructive">*</span>}
                  </label>
                  <Textarea
                    value={moderationNotes}
                    onChange={(e) => setModerationNotes(e.target.value)}
                    placeholder="Agrega notas sobre tu decisión de moderación..."
                    rows={4}
                    disabled={selectedItem.status !== 'pending'}
                  />
                  {selectedItem.moderationNotes && selectedItem.status !== 'pending' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Revisado por {selectedItem.reviewedBy} el{' '}
                      {selectedItem.reviewedAt && new Date(selectedItem.reviewedAt).toLocaleDateString('es-ES')}
                    </p>
                  )}
                </div>

                {selectedItem.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleAnalyzeWithAI(selectedItem)}
                      disabled={isAnalyzing}
                    >
                      <Sparkle className="mr-2" weight="fill" />
                      {isAnalyzing ? 'Analizando...' : 'Re-analizar con IA'}
                    </Button>
                  </div>
                )}
              </div>

              {selectedItem.status === 'pending' && (
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailDialog(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedItem)}
                  >
                    <XCircle className="mr-2" weight="fill" />
                    Rechazar
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedItem)}
                    className="bg-success hover:bg-success/90"
                  >
                    <CheckCircle className="mr-2" weight="fill" />
                    Aprobar
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
