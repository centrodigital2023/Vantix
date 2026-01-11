import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MagnifyingGlass, Warning, CheckCircle, Clock, Sparkle } from '@phosphor-icons/react'
import { Complaint } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface SuperAdminComplaintsProps {
  onNavigate: (page: string) => void
}

export function SuperAdminComplaints({ onNavigate }: SuperAdminComplaintsProps) {
  const [complaints, setComplaints] = useKV<Complaint[]>('superadmin-complaints', [
    {
      id: '1',
      touristId: 'user-123',
      touristName: 'Juan Pérez',
      category: 'accommodation',
      relatedServiceId: 'hotel-456',
      relatedServiceName: 'Hotel Montaña Verde',
      relatedProviderId: 'provider-789',
      relatedProviderName: 'María González',
      priority: 'high',
      status: 'open',
      title: 'Habitación no coincide con fotos publicadas',
      description: 'La habitación que reservé no se parece en nada a las fotos mostradas en el anuncio. Hay problemas de limpieza y mantenimiento.',
      evidence: [],
      createdAt: '2025-01-20T10:30:00',
      updatedAt: '2025-01-20T10:30:00',
      aiClassification: 'Calidad del servicio - Discrepancia visual',
      aiSuggestedResponse: 'Contactar al proveedor para verificación. Solicitar fotografías actuales del alojamiento. Considerar inspección presencial.',
      riskPattern: false
    },
    {
      id: '2',
      touristId: 'user-456',
      touristName: 'Ana Martínez',
      category: 'payment',
      relatedServiceId: 'tour-789',
      relatedServiceName: 'Tour Café Nariño',
      relatedProviderId: 'provider-123',
      relatedProviderName: 'Tours Nariño SA',
      priority: 'critical',
      status: 'in_progress',
      assignedTo: 'Admin Carlos',
      title: 'Cargo duplicado en mi tarjeta',
      description: 'Me cobraron dos veces por la misma reserva. Necesito reembolso urgente.',
      evidence: [],
      createdAt: '2025-01-19T15:20:00',
      updatedAt: '2025-01-20T09:00:00',
      aiClassification: 'Problema de pago - Cargo duplicado',
      aiSuggestedResponse: 'Contactar con pasarela de pagos inmediatamente. Verificar transacciones. Procesar reembolso en 24-48 horas.',
      riskPattern: false
    },
    {
      id: '3',
      touristId: 'user-789',
      touristName: 'Pedro López',
      category: 'security',
      relatedServiceId: 'transport-321',
      relatedServiceName: 'Transporte Privado Pasto',
      relatedProviderId: 'provider-456',
      relatedProviderName: 'Transportes Seguros SAS',
      priority: 'critical',
      status: 'open',
      title: 'Conductor actuó de manera inapropiada',
      description: 'El conductor hizo comentarios inapropiados durante el traslado y tomó una ruta más larga de lo normal.',
      evidence: [],
      createdAt: '2025-01-21T08:00:00',
      updatedAt: '2025-01-21T08:00:00',
      aiClassification: 'Seguridad - Comportamiento inapropiado del prestador',
      aiSuggestedResponse: 'URGENTE: Suspender conductor inmediatamente. Contactar al turista para seguimiento. Investigación interna requerida.',
      riskPattern: true
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [showComplaintDialog, setShowComplaintDialog] = useState(false)
  const [resolution, setResolution] = useState('')
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)

  const filteredComplaints = (complaints || []).filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (complaint.relatedServiceName || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint)
    setResolution(complaint.resolution || '')
    setShowComplaintDialog(true)
  }

  const handleGenerateAIResponse = async () => {
    if (!selectedComplaint) return
    setIsGeneratingResponse(true)
    
    try {
      const promptText = `Eres un experto en atención al cliente de turismo. 
      Genera una respuesta profesional y empática para esta queja:
      
      Categoría: ${selectedComplaint.category}
      Título: ${selectedComplaint.title}
      Descripción: ${selectedComplaint.description}
      Prioridad: ${selectedComplaint.priority}
      
      La respuesta debe:
      - Ser empática y profesional
      - Ofrecer soluciones concretas
      - Mencionar tiempos de resolución
      - Mantener el tono de la marca SendAI
      - En español de Colombia`
      
      const response = await window.spark.llm(promptText, 'gpt-4o-mini')
      setResolution(response)
      toast.success('Respuesta generada con IA')
    } catch (error) {
      toast.error('Error al generar respuesta con IA')
    } finally {
      setIsGeneratingResponse(false)
    }
  }

  const handleResolveComplaint = () => {
    if (!selectedComplaint || !resolution) {
      toast.error('Debes escribir una resolución')
      return
    }
    
    setComplaints((currentComplaints) =>
      (currentComplaints || []).map(c =>
        c.id === selectedComplaint.id
          ? { ...c, status: 'resolved', resolution, updatedAt: new Date().toISOString() }
          : c
      )
    )
    toast.success('Queja resuelta correctamente')
    setShowComplaintDialog(false)
  }

  const handleAssignComplaint = (complaintId: string, assignedTo: string) => {
    setComplaints((currentComplaints) =>
      (currentComplaints || []).map(c =>
        c.id === complaintId
          ? { ...c, status: 'in_progress', assignedTo, updatedAt: new Date().toISOString() }
          : c
      )
    )
    toast.success('Queja asignada correctamente')
  }

  const getCategoryBadge = (category: Complaint['category']) => {
    const colors = {
      accommodation: 'bg-blue-100 text-blue-700 border-blue-300',
      transport: 'bg-green-100 text-green-700 border-green-300',
      experience: 'bg-purple-100 text-purple-700 border-purple-300',
      payment: 'bg-orange-100 text-orange-700 border-orange-300',
      security: 'bg-red-100 text-red-700 border-red-300',
      other: 'bg-gray-100 text-gray-700 border-gray-300'
    }
    const labels = {
      accommodation: 'Alojamiento',
      transport: 'Transporte',
      experience: 'Experiencia',
      payment: 'Pago',
      security: 'Seguridad',
      other: 'Otro'
    }
    return (
      <Badge className={`${colors[category]} border`} variant="outline">
        {labels[category]}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Complaint['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-700 border-gray-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      high: 'bg-orange-100 text-orange-700 border-orange-300',
      critical: 'bg-red-100 text-red-700 border-red-300'
    }
    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
      critical: 'Crítica'
    }
    return (
      <Badge className={`${colors[priority]} border`} variant="outline">
        {labels[priority]}
      </Badge>
    )
  }

  const getStatusBadge = (status: Complaint['status']) => {
    const colors = {
      open: 'bg-blue-100 text-blue-700 border-blue-300',
      in_progress: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      resolved: 'bg-green-100 text-green-700 border-green-300',
      closed: 'bg-gray-100 text-gray-700 border-gray-300'
    }
    const labels = {
      open: 'Abierta',
      in_progress: 'En progreso',
      resolved: 'Resuelta',
      closed: 'Cerrada'
    }
    return (
      <Badge className={`${colors[status]} border`} variant="outline">
        {labels[status]}
      </Badge>
    )
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
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Centro de Quejas y Reclamos
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestiona y resuelve quejas con asistencia de IA
          </p>
        </motion.div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar quejas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="accommodation">Alojamiento</SelectItem>
                  <SelectItem value="transport">Transporte</SelectItem>
                  <SelectItem value="experience">Experiencia</SelectItem>
                  <SelectItem value="payment">Pago</SelectItem>
                  <SelectItem value="security">Seguridad</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="open">Abiertas</SelectItem>
                  <SelectItem value="in_progress">En progreso</SelectItem>
                  <SelectItem value="resolved">Resueltas</SelectItem>
                  <SelectItem value="closed">Cerradas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredComplaints.map((complaint, index) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => handleViewComplaint(complaint)}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getCategoryBadge(complaint.category)}
                        {getPriorityBadge(complaint.priority)}
                        {getStatusBadge(complaint.status)}
                        {complaint.riskPattern && (
                          <Badge className="bg-red-100 text-red-700 border-red-300 border" variant="outline">
                            ⚠️ Patrón de riesgo
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold mb-1">{complaint.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>👤 {complaint.touristName}</span>
                        {complaint.relatedServiceName && (
                          <span>🏨 {complaint.relatedServiceName}</span>
                        )}
                        {complaint.relatedProviderName && (
                          <span>👥 {complaint.relatedProviderName}</span>
                        )}
                        <span>📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>

                      {complaint.aiClassification && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                          <Sparkle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" weight="duotone" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">IA: {complaint.aiClassification}</p>
                            <p className="text-xs text-muted-foreground mt-1">{complaint.aiSuggestedResponse}</p>
                          </div>
                        </div>
                      )}
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

        {filteredComplaints.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" weight="duotone" />
              <h3 className="text-xl font-bold mb-2">No hay quejas que mostrar</h3>
              <p className="text-muted-foreground">Todos los filtros aplicados no muestran resultados</p>
            </CardContent>
          </Card>
        )}

        <Dialog open={showComplaintDialog} onOpenChange={setShowComplaintDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalle de la Queja</DialogTitle>
              <DialogDescription>
                Revisa y gestiona la queja del turista
              </DialogDescription>
            </DialogHeader>
            {selectedComplaint && (
              <div className="space-y-6">
                <div className="flex gap-2 flex-wrap">
                  {getCategoryBadge(selectedComplaint.category)}
                  {getPriorityBadge(selectedComplaint.priority)}
                  {getStatusBadge(selectedComplaint.status)}
                  {selectedComplaint.riskPattern && (
                    <Badge className="bg-red-100 text-red-700 border-red-300 border" variant="outline">
                      ⚠️ Patrón de riesgo detectado
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedComplaint.title}</h3>
                  <p className="text-muted-foreground">{selectedComplaint.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                  <div>
                    <label className="text-sm font-medium">Turista</label>
                    <p className="text-sm">{selectedComplaint.touristName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Servicio relacionado</label>
                    <p className="text-sm">{selectedComplaint.relatedServiceName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Proveedor</label>
                    <p className="text-sm">{selectedComplaint.relatedProviderName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Fecha</label>
                    <p className="text-sm">{new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {selectedComplaint.aiClassification && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkle className="w-5 h-5 text-primary" weight="duotone" />
                      <h4 className="font-bold">Análisis de IA</h4>
                    </div>
                    <p className="text-sm mb-2"><strong>Clasificación:</strong> {selectedComplaint.aiClassification}</p>
                    <p className="text-sm"><strong>Recomendación:</strong> {selectedComplaint.aiSuggestedResponse}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Asignar a agente</label>
                  <Select 
                    value={selectedComplaint.assignedTo || ''} 
                    onValueChange={(value) => handleAssignComplaint(selectedComplaint.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar agente..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin Carlos">Admin Carlos</SelectItem>
                      <SelectItem value="Admin Laura">Admin Laura</SelectItem>
                      <SelectItem value="Admin Miguel">Admin Miguel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Resolución</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateAIResponse}
                      disabled={isGeneratingResponse}
                    >
                      <Sparkle className="w-4 h-4 mr-2" weight="duotone" />
                      {isGeneratingResponse ? 'Generando...' : 'Generar con IA'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe la resolución de la queja..."
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowComplaintDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleResolveComplaint} disabled={!resolution}>
                <CheckCircle className="w-4 h-4 mr-2" weight="duotone" />
                Marcar como Resuelta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
