import { useEffect, useState, useCallback } from 'react'
import { PageRoute } from '@/lib/types'
import { getCurrentRoute, navigateTo as navigate, RouteMatch } from '@/lib/router'

export function useRouter() {
  const [route, setRoute] = useState<RouteMatch>(getCurrentRoute())

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute())
    }

    window.addEventListener('popstate', handlePopState)
    
    handlePopState()

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = useCallback((page: PageRoute, params?: Record<string, string>, query?: Record<string, string>) => {
    navigate(page, params, query)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    currentPage: route.page,
    params: route.params,
    queryParams: route.queryParams,
    navigateTo,
  }
}
