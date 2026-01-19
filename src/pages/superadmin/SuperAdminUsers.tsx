import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MagnifyingGlass, UserCircle, ShieldCheck, Prohibit, Clock, MapPin } from '@phosphor-icons/react'
import { User } from '@/lib/types'
import { useKV } from '@github/spark/hooks'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { SuperAdminHeader } from '@/components/superadmin/SuperAdminHeader'

interface SuperAdminUsersProps {
  onNavigate: (page: string) => void
}

export function SuperAdminUsers({ onNavigate }: SuperAdminUsersProps) {
  const [users, setUsers] = useKV<User[]>('superadmin-users', [
    {
      id: '1',
      email: 'maria.gonzalez@gmail.com',
      name: 'María González',
      role: 'host',
      status: 'active',
      createdAt: '2024-01-15',
      phone: '+57 312 456 7890',
      country: 'Colombia',
      city: 'Pasto',
      lastLogin: '2025-01-20T10:30:00',
      trustScore: 94,
      avatarUrl: ''
    },
    {
      id: '2',
      email: 'juan.perez@hotmail.com',
      name: 'Juan Pérez',
      role: 'tourist',
      status: 'active',
      createdAt: '2024-03-22',
      phone: '+57 311 234 5678',
      country: 'Colombia',
      city: 'Bogotá',
      lastLogin: '2025-01-21T15:45:00',
      trustScore: 87
    },
    {
      id: '3',
      email: 'carlos.admin@sendai.com',
      name: 'Carlos Admin',
      role: 'admin',
      status: 'active',
      createdAt: '2023-12-01',
      phone: '+57 315 987 6543',
      country: 'Colombia',
      city: 'Cali',
      lastLogin: '2025-01-21T09:15:00',
      trustScore: 98
    },
    {
      id: '4',
      email: 'suspended.user@example.com',
      name: 'Usuario Suspendido',
      role: 'tourist',
      status: 'suspended',
      createdAt: '2024-06-10',
      phone: '+57 310 111 2233',
      country: 'Colombia',
      city: 'Medellín',
      lastLogin: '2025-01-10T12:00:00',
      trustScore: 45
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all-roles')
  const [statusFilter, setStatusFilter] = useState<string>('all-statuses')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)

  const filteredUsers = (users || []).filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all-roles' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all-statuses' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowUserDialog(true)
  }

  const handleChangeRole = (userId: string, newRole: User['role']) => {
    setUsers((currentUsers) =>
      (currentUsers || []).map(u => u.id === userId ? { ...u, role: newRole } : u)
    )
    toast.success('Rol actualizado correctamente')
  }

  const handleChangeStatus = (userId: string, newStatus: User['status']) => {
    setUsers((currentUsers) =>
      (currentUsers || []).map(u => u.id === userId ? { ...u, status: newStatus } : u)
    )
    toast.success(`Usuario ${newStatus === 'suspended' ? 'suspendido' : newStatus === 'blocked' ? 'bloqueado' : 'activado'}`)
  }

  const getRoleBadge = (role: User['role']) => {
    const colors = {
      superadmin: 'bg-purple-100 text-purple-700 border-purple-300',
      admin: 'bg-blue-100 text-blue-700 border-blue-300',
      host: 'bg-green-100 text-green-700 border-green-300',
      service_provider: 'bg-orange-100 text-orange-700 border-orange-300',
      tourist: 'bg-gray-100 text-gray-700 border-gray-300',
      owner: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    }
    const labels = {
      superadmin: 'Superadmin',
      admin: 'Admin',
      host: 'Anfitrión',
      service_provider: 'Prestador',
      tourist: 'Turista',
      owner: 'Propietario'
    }
    return (
      <Badge className={`${colors[role]} border`} variant="outline">
        {labels[role]}
      </Badge>
    )
  }

  const getStatusBadge = (status: User['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-300',
      suspended: 'bg-orange-100 text-orange-700 border-orange-300',
      blocked: 'bg-red-100 text-red-700 border-red-300',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    }
    const labels = {
      active: 'Activo',
      suspended: 'Suspendido',
      blocked: 'Bloqueado',
      pending: 'Pendiente'
    }
    return (
      <Badge className={`${colors[status]} border`} variant="outline">
        {labels[status]}
      </Badge>
    )
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <SuperAdminHeader
        title="Gestión de Usuarios"
        subtitle="Administra todos los usuarios de la plataforma SendAI"
        onNavigate={onNavigate}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter || "all-roles"} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">Todos los roles</SelectItem>
                  <SelectItem value="tourist">Turistas</SelectItem>
                  <SelectItem value="host">Anfitriones</SelectItem>
                  <SelectItem value="service_provider">Prestadores</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="superadmin">Superadmins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter || "all-statuses"} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="suspended">Suspendidos</SelectItem>
                  <SelectItem value="blocked">Bloqueados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{filteredUsers.length} Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserCircle className="w-10 h-10 text-muted-foreground" weight="duotone" />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-4 h-4" weight="duotone" />
                        {user.city}, {user.country}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-bold ${getTrustScoreColor(user.trustScore || 0)}`}>
                        {user.trustScore || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" weight="duotone" />
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewUser(user)}
                      >
                        Ver detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Usuario</DialogTitle>
              <DialogDescription>
                Información completa y acciones disponibles
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <UserCircle className="w-16 h-16 text-muted-foreground" weight="duotone" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-2">
                      {getRoleBadge(selectedUser.role)}
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Teléfono</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Trust Score</label>
                    <p className={`text-sm font-bold ${getTrustScoreColor(selectedUser.trustScore || 0)}`}>
                      {selectedUser.trustScore || 'N/A'} / 100
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Ubicación</label>
                    <p className="text-sm text-muted-foreground">{selectedUser.city}, {selectedUser.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Miembro desde</label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Último acceso</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Cambiar Rol</label>
                    <Select 
                      value={selectedUser.role} 
                      onValueChange={(value) => handleChangeRole(selectedUser.id, value as User['role'])}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tourist">Turista</SelectItem>
                        <SelectItem value="host">Anfitrión</SelectItem>
                        <SelectItem value="service_provider">Prestador de servicios</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Estado de la Cuenta</label>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedUser.status === 'active' ? 'default' : 'outline'}
                        onClick={() => handleChangeStatus(selectedUser.id, 'active')}
                        className="flex-1"
                      >
                        <ShieldCheck className="w-4 h-4 mr-2" weight="duotone" />
                        Activar
                      </Button>
                      <Button
                        variant={selectedUser.status === 'suspended' ? 'default' : 'outline'}
                        onClick={() => handleChangeStatus(selectedUser.id, 'suspended')}
                        className="flex-1"
                      >
                        <Clock className="w-4 h-4 mr-2" weight="duotone" />
                        Suspender
                      </Button>
                      <Button
                        variant={selectedUser.status === 'blocked' ? 'destructive' : 'outline'}
                        onClick={() => handleChangeStatus(selectedUser.id, 'blocked')}
                        className="flex-1"
                      >
                        <Prohibit className="w-4 h-4 mr-2" weight="duotone" />
                        Bloquear
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
