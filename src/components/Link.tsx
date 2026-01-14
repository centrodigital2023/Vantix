import { forwardRef, MouseEvent, ReactNode } from 'react'
import { PageRoute } from '@/lib/types'
import { buildPath } from '@/lib/router'
import { cn } from '@/lib/utils'

interface LinkProps {
  to: PageRoute
  params?: Record<string, string>
  query?: Record<string, string>
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, params, query, children, className, onClick }, ref) => {
    const href = buildPath(to, params, query)

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e)
      }
      
      if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
        e.preventDefault()
        window.history.pushState({ page: to, params, query }, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(className)}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'
