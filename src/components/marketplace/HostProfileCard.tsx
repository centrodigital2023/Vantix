import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Star, CheckCircle, ChatCircle, MapPin, Calendar, 
  House, ShieldCheck, Lightning, Sparkle
} from '@phosphor-icons/react'

export interface HostProfileData {
  id: string
  name: string
  avatar?: string
  location: string
  joinedDate: string
  isSuperhost: boolean
  verified: boolean
  responseRate: number
  responseTime: string
  languages: string[]
  properties: number
  totalReviews: number
  averageRating: number
  bio?: string
}

interface HostProfileCardProps {
  host: HostProfileData
  onMessage?: () => void
  onViewProperties?: () => void
  compact?: boolean
}

export function HostProfileCard({ host, onMessage, onViewProperties, compact = false }: HostProfileCardProps) {
  const initials = host.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (compact) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={host.avatar} alt={host.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              {host.verified && (
                <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
                  <CheckCircle size={16} weight="fill" className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{host.name}</h3>
                {host.isSuperhost && (
                  <Badge variant="secondary" className="bg-secondary text-white gap-1">
                    <Sparkle size={12} weight="fill" />
                    SuperAnfitrión
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin size={14} />
                <span>{host.location}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} weight="fill" className="text-accent" />
                  <span className="font-semibold">{host.averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({host.totalReviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <House size={14} />
                  <span>{host.properties} propiedades</span>
                </div>
              </div>
            </div>

            {onMessage && (
              <Button size="sm" variant="outline" onClick={onMessage} className="gap-2">
                <ChatCircle size={16} />
                Contactar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={host.avatar} alt={host.name} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            {host.verified && (
              <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2">
                <CheckCircle size={20} weight="fill" className="text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-bold">{host.name}</h2>
            {host.isSuperhost && (
              <Badge variant="secondary" className="bg-secondary text-white gap-1">
                <Sparkle size={14} weight="fill" />
                SuperAnfitrión
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <MapPin size={16} />
            <span>{host.location}</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>Se unió en {new Date(host.joinedDate).getFullYear()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {host.bio && (
          <>
            <p className="text-sm text-foreground/80 leading-relaxed">{host.bio}</p>
            <Separator />
          </>
        )}

        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Star size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">
                {host.totalReviews} Reseñas
              </p>
              <div className="flex items-center gap-1">
                <Star size={16} weight="fill" className="text-accent" />
                <span className="font-semibold">{host.averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">calificación promedio</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Lightning size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">
                Tiempo de Respuesta: {host.responseTime}
              </p>
              <p className="text-sm text-muted-foreground">
                Tasa de respuesta: {host.responseRate}%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <House size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">
                {host.properties} Propiedades
              </p>
              <p className="text-sm text-muted-foreground">
                Anfitrión experimentado
              </p>
            </div>
          </div>

          {host.verified && (
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <ShieldCheck size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1">
                  Identidad Verificada
                </p>
                <p className="text-sm text-muted-foreground">
                  Email y teléfono confirmados
                </p>
              </div>
            </div>
          )}
        </div>

        {host.languages.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="font-semibold mb-2">Idiomas</p>
              <div className="flex flex-wrap gap-2">
                {host.languages.map((lang) => (
                  <Badge key={lang} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="grid gap-3">
          {onMessage && (
            <Button onClick={onMessage} className="w-full gap-2">
              <ChatCircle size={20} />
              Contactar anfitrión
            </Button>
          )}
          {onViewProperties && (
            <Button onClick={onViewProperties} variant="outline" className="w-full gap-2">
              <House size={20} />
              Ver todas las propiedades
            </Button>
          )}
        </div>

        {host.isSuperhost && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20">
            <div className="flex items-start gap-3">
              <Sparkle size={24} weight="fill" className="text-secondary mt-0.5" />
              <div>
                <p className="font-semibold text-secondary mb-1">SuperAnfitrión</p>
                <p className="text-sm text-foreground/80">
                  Los SuperAnfitriones son anfitriones experimentados con calificaciones altas 
                  y excelentes índices de respuesta. Son reconocidos por brindar estancias 
                  excepcionales a sus huéspedes.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
