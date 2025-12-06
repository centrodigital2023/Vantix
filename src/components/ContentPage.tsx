import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageRoute } from '@/lib/types'
import { ReactNode } from 'react'

interface ContentPageProps {
  title: string
  subtitle: string
  heroGradient?: string
  sections: {
    title?: string
    content: string | ReactNode
    cards?: {
      title: string
      description: string
      icon?: ReactNode
    }[]
  }[]
  callToAction?: {
    title: string
    description: string
    buttons: {
      label: string
      route: PageRoute
      variant?: 'default' | 'outline'
    }[]
  }
  onNavigate: (page: PageRoute) => void
}

export function ContentPage({
  title,
  subtitle,
  heroGradient = 'from-primary to-secondary',
  sections,
  callToAction,
  onNavigate
}: ContentPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={`bg-gradient-to-r ${heroGradient} text-primary-foreground py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg opacity-90 max-w-3xl">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {sections.map((section, idx) => (
          <div key={idx} className={idx > 0 ? 'mt-16' : ''}>
            {section.title && (
              <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
            )}
            
            {typeof section.content === 'string' ? (
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="mb-8">{section.content}</div>
            )}

            {section.cards && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.cards.map((card, cardIdx) => (
                  <Card key={cardIdx} className="p-6 hover:shadow-lg transition-shadow">
                    {card.icon && <div className="mb-4">{card.icon}</div>}
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

        {callToAction && (
          <div className="mt-16 bg-muted rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{callToAction.title}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {callToAction.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {callToAction.buttons.map((button, btnIdx) => (
                <Button
                  key={btnIdx}
                  onClick={() => onNavigate(button.route)}
                  variant={button.variant || 'default'}
                  size="lg"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
