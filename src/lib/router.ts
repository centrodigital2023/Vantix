import { PageRoute } from './types'

export interface RouteConfig {
  path: string
  page: PageRoute
  params?: Record<string, string>
}

export interface RouteMatch {
  page: PageRoute
  params: Record<string, string>
  queryParams: URLSearchParams
}

const routes: Array<{ pattern: RegExp; page: PageRoute; keys: string[] }> = [
  { pattern: /^\/$/, page: 'home', keys: [] },
  { pattern: /^\/marketplace$/, page: 'marketplace', keys: [] },
  { pattern: /^\/explorar$/, page: 'explorar', keys: [] },
  { pattern: /^\/supabase-testing$/, page: 'supabase-testing', keys: [] },
  { pattern: /^\/itinerario$/, page: 'itinerario', keys: [] },
  { pattern: /^\/blog$/, page: 'blog', keys: [] },
  { pattern: /^\/contacto$/, page: 'contacto', keys: [] },
  { pattern: /^\/para-ti$/, page: 'feed-personalizado', keys: [] },
  
  { pattern: /^\/categoria\/aventura$/, page: 'categoria-aventura', keys: [] },
  { pattern: /^\/categoria\/bienestar$/, page: 'categoria-bienestar', keys: [] },
  { pattern: /^\/categoria\/cultural$/, page: 'categoria-cultural', keys: [] },
  { pattern: /^\/categoria\/familiar$/, page: 'categoria-familiar', keys: [] },
  { pattern: /^\/categoria\/gastronomia$/, page: 'categoria-gastronomia', keys: [] },
  { pattern: /^\/categoria\/naturaleza$/, page: 'categoria-naturaleza', keys: [] },
  { pattern: /^\/categoria\/negocios$/, page: 'categoria-negocios', keys: [] },
  { pattern: /^\/categoria\/playa$/, page: 'categoria-playa', keys: [] },
  { pattern: /^\/categoria\/religioso$/, page: 'categoria-religioso', keys: [] },
  { pattern: /^\/categoria\/rural$/, page: 'categoria-rural', keys: [] },
  
  { pattern: /^\/destino\/([^/]+)$/, page: 'destino-resultados', keys: ['city'] },
  { pattern: /^\/alojamiento\/([^/]+)$/, page: 'detalle-alojamiento', keys: ['id'] },
  { pattern: /^\/reserva\/confirmar$/, page: 'reserva-confirmacion', keys: [] },
  { pattern: /^\/reserva\/exitosa$/, page: 'reserva-exitosa', keys: [] },
  { pattern: /^\/mis-reservas$/, page: 'mis-reservas', keys: [] },
  
  { pattern: /^\/auth\/turista$/, page: 'tourist-auth', keys: [] },
  { pattern: /^\/auth\/anfitrion$/, page: 'host-auth', keys: [] },
  { pattern: /^\/auth\/admin$/, page: 'admin-auth', keys: [] },
  
  { pattern: /^\/anfitriones$/, page: 'propietarios', keys: [] },
  { pattern: /^\/anfitriones\/panel$/, page: 'host-panel', keys: [] },
  { pattern: /^\/anfitriones\/registro-alojamiento$/, page: 'registro-alojamiento', keys: [] },
  { pattern: /^\/servicios\/registro$/, page: 'registro-servicio', keys: [] },
  { pattern: /^\/servicios\/panel$/, page: 'panel-prestador', keys: [] },
  
  { pattern: /^\/ayuda\/faq$/, page: 'faq', keys: [] },
  { pattern: /^\/ayuda\/seguridad$/, page: 'centro-de-seguridad', keys: [] },
  { pattern: /^\/ayuda\/soporte$/, page: 'soporte-turista', keys: [] },
  { pattern: /^\/ayuda\/como-reservar$/, page: 'como-reservar', keys: [] },
  { pattern: /^\/ayuda\/estado-reserva$/, page: 'estado-de-mi-reserva', keys: [] },
  
  { pattern: /^\/descubre\/destinos$/, page: 'destinos', keys: [] },
  { pattern: /^\/descubre\/tours$/, page: 'tours', keys: [] },
  { pattern: /^\/descubre\/alojamientos$/, page: 'alojamientos', keys: [] },
  { pattern: /^\/descubre\/transportes$/, page: 'transportes', keys: [] },
  { pattern: /^\/descubre\/comida-tipica$/, page: 'comida-tipica', keys: [] },
  { pattern: /^\/descubre\/mapa$/, page: 'mapa-turistico', keys: [] },
  
  { pattern: /^\/turismo\/pasto$/, page: 'turismo-pasto', keys: [] },
  { pattern: /^\/turismo\/narino\/tours$/, page: 'tours-narino', keys: [] },
  { pattern: /^\/turismo\/pasto\/que-hacer$/, page: 'que-hacer-en-pasto', keys: [] },
  { pattern: /^\/turismo\/narino\/lugares$/, page: 'lugares-imperdibles-narino', keys: [] },
  
  { pattern: /^\/experiencias\/aventura$/, page: 'aventura', keys: [] },
  { pattern: /^\/experiencias\/cultura$/, page: 'cultura', keys: [] },
  { pattern: /^\/experiencias\/gastronomia$/, page: 'gastronomia', keys: [] },
  { pattern: /^\/experiencias\/naturaleza$/, page: 'naturaleza', keys: [] },
  { pattern: /^\/experiencias\/senderismo$/, page: 'senderismo', keys: [] },
  { pattern: /^\/experiencias\/festivales$/, page: 'festivales-de-colombia', keys: [] },
  
  { pattern: /^\/nosotros$/, page: 'sobre-nosotros', keys: [] },
  { pattern: /^\/nosotros\/mision$/, page: 'mision-vision', keys: [] },
  { pattern: /^\/nosotros\/por-que-elegirnos$/, page: 'por-que-elegirnos', keys: [] },
  { pattern: /^\/testimonios$/, page: 'testimonios', keys: [] },
  
  { pattern: /^\/legal\/terminos$/, page: 'terminos', keys: [] },
  { pattern: /^\/legal\/privacidad$/, page: 'privacidad', keys: [] },
  { pattern: /^\/legal\/cookies$/, page: 'cookies', keys: [] },
  { pattern: /^\/legal\/reembolsos$/, page: 'reembolsos', keys: [] },
  { pattern: /^\/legal\/cancelacion$/, page: 'politica-de-cancelacion', keys: [] },
  
  { pattern: /^\/contenido\/guia-viajero$/, page: 'guia-del-viajero', keys: [] },
  { pattern: /^\/contenido\/articulos$/, page: 'articulos', keys: [] },
  { pattern: /^\/contenido\/noticias$/, page: 'noticias-de-turismo', keys: [] },
  
  { pattern: /^\/alianzas\/agencias$/, page: 'agencias', keys: [] },
  { pattern: /^\/alianzas\/colaboradores$/, page: 'colaboradores', keys: [] },
  { pattern: /^\/alianzas\/afiliados$/, page: 'afiliados', keys: [] },
  { pattern: /^\/alianzas\/guias$/, page: 'guias-turisticos', keys: [] },
  
  { pattern: /^\/ofertas$/, page: 'ofertas', keys: [] },
  { pattern: /^\/ofertas\/viajes-baratos$/, page: 'viajes-baratos', keys: [] },
  { pattern: /^\/ofertas\/fin-de-semana$/, page: 'planes-fin-de-semana', keys: [] },
  { pattern: /^\/promociones$/, page: 'promociones', keys: [] },
  
  { pattern: /^\/admin\/dashboard$/, page: 'superadmin-dashboard', keys: [] },
  { pattern: /^\/admin\/usuarios$/, page: 'superadmin-users', keys: [] },
  { pattern: /^\/admin\/quejas$/, page: 'superadmin-complaints', keys: [] },
  { pattern: /^\/admin\/prestadores$/, page: 'superadmin-providers', keys: [] },
  { pattern: /^\/admin\/moderacion$/, page: 'superadmin-moderation', keys: [] },
  { pattern: /^\/admin\/reservas$/, page: 'superadmin-bookings', keys: [] },
  { pattern: /^\/admin\/analytics$/, page: 'superadmin-analytics', keys: [] },
  { pattern: /^\/admin\/configuracion$/, page: 'superadmin-config', keys: [] },
  
  { pattern: /^\/favoritos$/, page: 'favoritos', keys: [] },
  { pattern: /^\/preguntas-frecuentes$/, page: 'preguntas-frecuentes', keys: [] },
]

const pageToPath: Record<PageRoute, string> = {
  'home': '/',
  'marketplace': '/marketplace',
  'explorar': '/explorar',
  'supabase-testing': '/supabase-testing',
  'itinerario': '/itinerario',
  'blog': '/blog',
  'contacto': '/contacto',
  'feed-personalizado': '/para-ti',
  
  'categoria-aventura': '/categoria/aventura',
  'categoria-bienestar': '/categoria/bienestar',
  'categoria-cultural': '/categoria/cultural',
  'categoria-familiar': '/categoria/familiar',
  'categoria-gastronomia': '/categoria/gastronomia',
  'categoria-naturaleza': '/categoria/naturaleza',
  'categoria-negocios': '/categoria/negocios',
  'categoria-playa': '/categoria/playa',
  'categoria-religioso': '/categoria/religioso',
  'categoria-rural': '/categoria/rural',
  
  'destino-resultados': '/destino',
  'detalle-alojamiento': '/alojamiento',
  'reserva-confirmacion': '/reserva/confirmar',
  'reserva-exitosa': '/reserva/exitosa',
  'mis-reservas': '/mis-reservas',
  
  'tourist-auth': '/auth/turista',
  'host-auth': '/auth/anfitrion',
  'admin-auth': '/auth/admin',
  
  'propietarios': '/anfitriones',
  'host-panel': '/anfitriones/panel',
  'registro-alojamiento': '/anfitriones/registro-alojamiento',
  'registro-servicio': '/servicios/registro',
  'panel-prestador': '/servicios/panel',
  
  'faq': '/ayuda/faq',
  'centro-de-seguridad': '/ayuda/seguridad',
  'soporte-turista': '/ayuda/soporte',
  'como-reservar': '/ayuda/como-reservar',
  'estado-de-mi-reserva': '/ayuda/estado-reserva',
  
  'destinos': '/descubre/destinos',
  'tours': '/descubre/tours',
  'alojamientos': '/descubre/alojamientos',
  'transportes': '/descubre/transportes',
  'comida-tipica': '/descubre/comida-tipica',
  'mapa-turistico': '/descubre/mapa',
  
  'turismo-pasto': '/turismo/pasto',
  'tours-narino': '/turismo/narino/tours',
  'que-hacer-en-pasto': '/turismo/pasto/que-hacer',
  'lugares-imperdibles-narino': '/turismo/narino/lugares',
  
  'aventura': '/experiencias/aventura',
  'cultura': '/experiencias/cultura',
  'gastronomia': '/experiencias/gastronomia',
  'naturaleza': '/experiencias/naturaleza',
  'senderismo': '/experiencias/senderismo',
  'festivales-de-colombia': '/experiencias/festivales',
  
  'sobre-nosotros': '/nosotros',
  'mision-vision': '/nosotros/mision',
  'por-que-elegirnos': '/nosotros/por-que-elegirnos',
  'testimonios': '/testimonios',
  
  'terminos': '/legal/terminos',
  'privacidad': '/legal/privacidad',
  'cookies': '/legal/cookies',
  'reembolsos': '/legal/reembolsos',
  'politica-de-cancelacion': '/legal/cancelacion',
  
  'guia-del-viajero': '/contenido/guia-viajero',
  'articulos': '/contenido/articulos',
  'noticias-de-turismo': '/contenido/noticias',
  
  'agencias': '/alianzas/agencias',
  'colaboradores': '/alianzas/colaboradores',
  'afiliados': '/alianzas/afiliados',
  'guias-turisticos': '/alianzas/guias',
  
  'ofertas': '/ofertas',
  'viajes-baratos': '/ofertas/viajes-baratos',
  'planes-fin-de-semana': '/ofertas/fin-de-semana',
  'promociones': '/promociones',
  
  'superadmin-dashboard': '/admin/dashboard',
  'superadmin-users': '/admin/usuarios',
  'superadmin-complaints': '/admin/quejas',
  'superadmin-providers': '/admin/prestadores',
  'superadmin-moderation': '/admin/moderacion',
  'superadmin-bookings': '/admin/reservas',
  'superadmin-analytics': '/admin/analytics',
  'superadmin-config': '/admin/configuracion',
  
  'favoritos': '/favoritos',
  'preguntas-frecuentes': '/preguntas-frecuentes',
}

export function matchRoute(pathname: string): RouteMatch | null {
  for (const route of routes) {
    const match = pathname.match(route.pattern)
    if (match) {
      const params: Record<string, string> = {}
      route.keys.forEach((key, index) => {
        params[key] = match[index + 1]
      })
      return {
        page: route.page,
        params,
        queryParams: new URLSearchParams(window.location.search),
      }
    }
  }
  return null
}

export function buildPath(page: PageRoute, params?: Record<string, string>, query?: Record<string, string>): string {
  let path = pageToPath[page] || '/'
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path += `/${value}`
    })
  }
  
  if (query && Object.keys(query).length > 0) {
    const queryString = new URLSearchParams(query).toString()
    path += `?${queryString}`
  }
  
  return path
}

export function navigateTo(page: PageRoute, params?: Record<string, string>, query?: Record<string, string>): void {
  const path = buildPath(page, params, query)
  window.history.pushState({ page, params, query }, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function replaceTo(page: PageRoute, params?: Record<string, string>, query?: Record<string, string>): void {
  const path = buildPath(page, params, query)
  window.history.replaceState({ page, params, query }, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function getCurrentRoute(): RouteMatch {
  const pathname = window.location.pathname
  const match = matchRoute(pathname)
  
  if (match) {
    return match
  }
  
  return {
    page: 'home',
    params: {},
    queryParams: new URLSearchParams(window.location.search),
  }
}

export function isValidRoute(pathname: string): boolean {
  return matchRoute(pathname) !== null
}

export function getQueryParam(key: string): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get(key)
}

export function setQueryParam(key: string, value: string): void {
  const params = new URLSearchParams(window.location.search)
  params.set(key, value)
  const newUrl = `${window.location.pathname}?${params.toString()}`
  window.history.replaceState(window.history.state, '', newUrl)
}

export function removeQueryParam(key: string): void {
  const params = new URLSearchParams(window.location.search)
  params.delete(key)
  const search = params.toString()
  const newUrl = search ? `${window.location.pathname}?${search}` : window.location.pathname
  window.history.replaceState(window.history.state, '', newUrl)
}
