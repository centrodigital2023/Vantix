import { PageRoute } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface GenericPageProps {
  onNavigate: (page: PageRoute) => void
  title: string
  subtitle?: string
}

export function GenericPage({ onNavigate, title, subtitle }: GenericPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-muted-foreground mb-8">
          Esta página está en construcción. Pronto tendremos más información disponible.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => onNavigate('home')}>Ir al Inicio</Button>
          <Button onClick={() => onNavigate('explorar')} variant="outline">Explorar</Button>
        </div>
      </div>
    </div>
  )
}
