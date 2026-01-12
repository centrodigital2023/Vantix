import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Globe, CurrencyDollar, ShieldCheck, Bell, Gear, MapPin, CheckCircle } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface CountryConfig {
  code: string
  name: string
  flag: string
  active: boolean
  currency: string
  commission: number
  tax: number
  language: string
  requiresRNT: boolean
  minBookingValue: number
  maxBookingValue: number
  supportEmail: string
  supportPhone: string
}

interface SystemConfig {
  maintenanceMode: boolean
  allowNewRegistrations: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  aiModeration: boolean
  autoApproveHosts: boolean
  sessionTimeout: number
  maxUploadSize: number
}

interface SuperAdminConfigProps {
  onNavigate: (page: string) => void
}

export function SuperAdminConfig({ onNavigate }: SuperAdminConfigProps) {
  const [countries, setCountries] = useKV<CountryConfig[]>('superadmin-countries', [
    {
      code: 'CO',
      name: 'Colombia',
      flag: '🇨🇴',
      active: true,
      currency: 'COP',
      commission: 15,
      tax: 19,
      language: 'es-CO',
      requiresRNT: true,
      minBookingValue: 50000,
      maxBookingValue: 10000000,
      supportEmail: 'soporte@sendai.co',
      supportPhone: '+57 300 123 4567'
    },
    {
      code: 'MX',
      name: 'México',
      flag: '🇲🇽',
      active: true,
      currency: 'MXN',
      commission: 12,
      tax: 16,
      language: 'es-MX',
      requiresRNT: false,
      minBookingValue: 500,
      maxBookingValue: 50000,
      supportEmail: 'soporte@sendai.mx',
      supportPhone: '+52 55 1234 5678'
    },
    {
      code: 'PE',
      name: 'Perú',
      flag: '🇵🇪',
      active: false,
      currency: 'PEN',
      commission: 13,
      tax: 18,
      language: 'es-PE',
      requiresRNT: true,
      minBookingValue: 100,
      maxBookingValue: 20000,
      supportEmail: 'soporte@sendai.pe',
      supportPhone: '+51 1 234 5678'
    }
  ])

  const [systemConfig, setSystemConfig] = useKV<SystemConfig>('superadmin-system-config', {
    maintenanceMode: false,
    allowNewRegistrations: true,
    emailNotifications: true,
    smsNotifications: false,
    aiModeration: true,
    autoApproveHosts: false,
    sessionTimeout: 30,
    maxUploadSize: 10
  })

  const [selectedCountry, setSelectedCountry] = useState<CountryConfig | null>(null)
  const [showCountryDialog, setShowCountryDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  const handleEditCountry = (country: CountryConfig) => {
    setSelectedCountry({ ...country })
    setShowCountryDialog(true)
  }

  const handleSaveCountry = () => {
    if (!selectedCountry) return

    setCountries((currentCountries) =>
      (currentCountries || []).map(c =>
        c.code === selectedCountry.code ? selectedCountry : c
      )
    )
    toast.success(`Configuración de ${selectedCountry.name} actualizada`)
    setShowCountryDialog(false)
  }

  const handleToggleCountry = (countryCode: string) => {
    setCountries((currentCountries) =>
      (currentCountries || []).map(c =>
        c.code === countryCode ? { ...c, active: !c.active } : c
      )
    )
    const country = countries?.find(c => c.code === countryCode)
    toast.success(`${country?.name} ${country?.active ? 'desactivado' : 'activado'}`)
  }

  const handleSystemConfigChange = (key: keyof SystemConfig, value: any) => {
    const action = () => {
      setSystemConfig((current) => ({
        ...current!,
        [key]: value
      }))
      toast.success('Configuración actualizada')
    }

    if (key === 'maintenanceMode' || key === 'allowNewRegistrations' || key === 'aiModeration') {
      setPendingAction(() => action)
      setShowConfirmDialog(true)
    } else {
      action()
    }
  }

  const confirmAction = () => {
    if (pendingAction) {
      pendingAction()
      setPendingAction(null)
    }
    setShowConfirmDialog(false)
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
            Configuración Global del Sistema
          </h1>
          <p className="text-muted-foreground text-lg">
            Gestiona configuraciones multipaís y parámetros del sistema
          </p>
        </motion.div>

        <Tabs defaultValue="countries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="countries">
              <MapPin className="w-4 h-4 mr-2" weight="duotone" />
              Países
            </TabsTrigger>
            <TabsTrigger value="system">
              <Gear className="w-4 h-4 mr-2" weight="duotone" />
              Sistema
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" weight="duotone" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="countries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" weight="duotone" />
                  Configuración por País
                </CardTitle>
                <CardDescription>
                  Administra reglas específicas para cada mercado latinoamericano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countries?.map((country) => (
                    <motion.div
                      key={country.code}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{country.flag}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{country.name}</h3>
                            <Switch
                              checked={country.active}
                              onCheckedChange={() => handleToggleCountry(country.code)}
                            />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>💰 Comisión: {country.commission}%</span>
                            <span>💵 {country.currency}</span>
                            <span>📋 Impuesto: {country.tax}%</span>
                            {country.requiresRNT && <span>✓ RNT requerido</span>}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCountry(country)}
                      >
                        Configurar
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Los cambios en comisiones y políticas afectan solo a nuevas reservas. 
                    Las reservas existentes mantienen las condiciones originales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gear className="w-5 h-5" weight="duotone" />
                  Configuración del Sistema
                </CardTitle>
                <CardDescription>
                  Parámetros globales que afectan toda la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="maintenance" className="text-base font-medium">
                      Modo Mantenimiento
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Bloquea el acceso a usuarios no admin para mantenimiento
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={systemConfig?.maintenanceMode}
                    onCheckedChange={(checked) => handleSystemConfigChange('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="registrations" className="text-base font-medium">
                      Permitir Nuevos Registros
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Habilita el registro de nuevos usuarios en la plataforma
                    </p>
                  </div>
                  <Switch
                    id="registrations"
                    checked={systemConfig?.allowNewRegistrations}
                    onCheckedChange={(checked) => handleSystemConfigChange('allowNewRegistrations', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="aiModeration" className="text-base font-medium">
                      Moderación Automática con IA
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      La IA analiza y modera contenido automáticamente
                    </p>
                  </div>
                  <Switch
                    id="aiModeration"
                    checked={systemConfig?.aiModeration}
                    onCheckedChange={(checked) => handleSystemConfigChange('aiModeration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="autoApprove" className="text-base font-medium">
                      Aprobar Anfitriones Automáticamente
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Los nuevos anfitriones se aprueban sin revisión manual (no recomendado)
                    </p>
                  </div>
                  <Switch
                    id="autoApprove"
                    checked={systemConfig?.autoApproveHosts}
                    onCheckedChange={(checked) => handleSystemConfigChange('autoApproveHosts', checked)}
                  />
                </div>

                <div className="space-y-2 p-4 rounded-lg border">
                  <Label htmlFor="sessionTimeout">
                    Timeout de Sesión (minutos)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemConfig?.sessionTimeout}
                    onChange={(e) => handleSystemConfigChange('sessionTimeout', parseInt(e.target.value))}
                    min={5}
                    max={120}
                  />
                  <p className="text-sm text-muted-foreground">
                    Tiempo de inactividad antes de cerrar sesión automáticamente
                  </p>
                </div>

                <div className="space-y-2 p-4 rounded-lg border">
                  <Label htmlFor="maxUploadSize">
                    Tamaño Máximo de Archivos (MB)
                  </Label>
                  <Input
                    id="maxUploadSize"
                    type="number"
                    value={systemConfig?.maxUploadSize}
                    onChange={(e) => handleSystemConfigChange('maxUploadSize', parseInt(e.target.value))}
                    min={1}
                    max={50}
                  />
                  <p className="text-sm text-muted-foreground">
                    Límite para fotos y documentos subidos por usuarios
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" weight="duotone" />
                  Notificaciones del Sistema
                </CardTitle>
                <CardDescription>
                  Controla los canales de comunicación con usuarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="emailNotif" className="text-base font-medium">
                      Notificaciones por Email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Envía confirmaciones, recordatorios y alertas por correo
                    </p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={systemConfig?.emailNotifications}
                    onCheckedChange={(checked) => handleSystemConfigChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="smsNotif" className="text-base font-medium">
                      Notificaciones por SMS
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Envía mensajes de texto para eventos críticos (requiere proveedor SMS)
                    </p>
                  </div>
                  <Switch
                    id="smsNotif"
                    checked={systemConfig?.smsNotifications}
                    onCheckedChange={(checked) => handleSystemConfigChange('smsNotifications', checked)}
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Eventos que Generan Notificaciones:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Nueva reserva confirmada</li>
                    <li>Cancelación de reserva</li>
                    <li>Mensaje recibido</li>
                    <li>Nuevo review o calificación</li>
                    <li>Queja o reporte</li>
                    <li>Documentos aprobados/rechazados</li>
                    <li>Recordatorios de check-in/check-out</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showCountryDialog} onOpenChange={setShowCountryDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedCountry?.flag} Configuración de {selectedCountry?.name}
              </DialogTitle>
              <DialogDescription>
                Ajusta parámetros específicos para este mercado
              </DialogDescription>
            </DialogHeader>
            {selectedCountry && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commission">Comisión SendAI (%)</Label>
                    <Input
                      id="commission"
                      type="number"
                      value={selectedCountry.commission}
                      onChange={(e) =>
                        setSelectedCountry({ ...selectedCountry, commission: parseFloat(e.target.value) })
                      }
                      min={0}
                      max={30}
                      step={0.5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax">Impuesto Local (%)</Label>
                    <Input
                      id="tax"
                      type="number"
                      value={selectedCountry.tax}
                      onChange={(e) =>
                        setSelectedCountry({ ...selectedCountry, tax: parseFloat(e.target.value) })
                      }
                      min={0}
                      max={30}
                      step={0.5}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select
                    value={selectedCountry.currency}
                    onValueChange={(value) =>
                      setSelectedCountry({ ...selectedCountry, currency: value })
                    }
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                      <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                      <SelectItem value="PEN">PEN - Sol Peruano</SelectItem>
                      <SelectItem value="CLP">CLP - Peso Chileno</SelectItem>
                      <SelectItem value="ARS">ARS - Peso Argentino</SelectItem>
                      <SelectItem value="USD">USD - Dólar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minBooking">Reserva Mínima ({selectedCountry.currency})</Label>
                    <Input
                      id="minBooking"
                      type="number"
                      value={selectedCountry.minBookingValue}
                      onChange={(e) =>
                        setSelectedCountry({ ...selectedCountry, minBookingValue: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBooking">Reserva Máxima ({selectedCountry.currency})</Label>
                    <Input
                      id="maxBooking"
                      type="number"
                      value={selectedCountry.maxBookingValue}
                      onChange={(e) =>
                        setSelectedCountry({ ...selectedCountry, maxBookingValue: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <Label htmlFor="rnt" className="text-base font-medium">
                      Requiere RNT (Registro Nacional de Turismo)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Obligatorio para Colombia, opcional en otros países
                    </p>
                  </div>
                  <Switch
                    id="rnt"
                    checked={selectedCountry.requiresRNT}
                    onCheckedChange={(checked) =>
                      setSelectedCountry({ ...selectedCountry, requiresRNT: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Email de Soporte</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={selectedCountry.supportEmail}
                    onChange={(e) =>
                      setSelectedCountry({ ...selectedCountry, supportEmail: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Teléfono de Soporte</Label>
                  <Input
                    id="supportPhone"
                    type="tel"
                    value={selectedCountry.supportPhone}
                    onChange={(e) =>
                      setSelectedCountry({ ...selectedCountry, supportPhone: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCountryDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveCountry}>
                <CheckCircle className="w-4 h-4 mr-2" weight="duotone" />
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Acción Crítica</DialogTitle>
              <DialogDescription>
                Esta configuración afecta el comportamiento de toda la plataforma. 
                ¿Estás seguro de continuar?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmAction}>
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
