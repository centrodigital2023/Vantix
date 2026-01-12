import { useKV } from '@github/spark/hooks'
import { HostProperty, HostReservation, HostMetrics, HostAlert } from '@/lib/host-types'

export function useHostData() {
  const [properties, setProperties] = useKV<HostProperty[]>('host-properties', [])
  const [reservations, setReservations] = useKV<HostReservation[]>('host-reservations', [])
  const [alerts, setAlerts] = useKV<HostAlert[]>('host-alerts', [])

  const addProperty = (property: HostProperty) => {
    setProperties((current) => [...(current || []), property])
  }

  const updateProperty = (id: string, updates: Partial<HostProperty>) => {
    setProperties((current) =>
      (current || []).map((prop) => (prop.id === id ? { ...prop, ...updates } : prop))
    )
  }

  const deleteProperty = (id: string) => {
    setProperties((current) => (current || []).filter((prop) => prop.id !== id))
  }

  const addReservation = (reservation: HostReservation) => {
    setReservations((current) => [...(current || []), reservation])
  }

  const updateReservation = (id: string, updates: Partial<HostReservation>) => {
    setReservations((current) =>
      (current || []).map((res) => (res.id === id ? { ...res, ...updates } : res))
    )
  }

  const markAlertAsRead = (id: string) => {
    setAlerts((current) =>
      (current || []).map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    )
  }

  const dismissAlert = (id: string) => {
    setAlerts((current) => (current || []).filter((alert) => alert.id !== id))
  }

  const calculateMetrics = (): HostMetrics => {
    const activeProperties = (properties || []).filter((p) => p.status === 'activo')
    const today = new Date().toISOString().split('T')[0]

    const todayCheckIns =
      (reservations || []).filter(
        (r) => r.checkIn === today && r.status === 'confirmada'
      ).length || 0

    const todayCheckOuts =
      (reservations || []).filter(
        (r) => r.checkOut === today && r.status === 'confirmada'
      ).length || 0

    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    const thirtyDaysDate = thirtyDaysFromNow.toISOString().split('T')[0]

    const upcomingReservations =
      (reservations || []).filter(
        (r) =>
          r.checkIn >= today &&
          r.checkIn <= thirtyDaysDate &&
          r.status === 'confirmada'
      ).length || 0

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyRevenue =
      (reservations || [])
        .filter((r) => {
          const resDate = new Date(r.checkIn)
          return (
            resDate.getMonth() === currentMonth &&
            resDate.getFullYear() === currentYear &&
            r.paymentStatus === 'pagado'
          )
        })
        .reduce((sum, r) => sum + r.totalPrice, 0) || 0

    const averageRating =
      activeProperties.reduce((sum, p) => sum + p.metrics.rating, 0) /
        (activeProperties.length || 1) || 0

    const totalReviews = activeProperties.reduce(
      (sum, p) => sum + p.metrics.reviewCount,
      0
    )

    const averageOccupancy =
      activeProperties.reduce((sum, p) => sum + p.metrics.occupancyRate, 0) /
        (activeProperties.length || 1) || 0

    const averageResponseRate =
      activeProperties.reduce((sum, p) => sum + p.metrics.responseRate, 0) /
        (activeProperties.length || 1) || 0

    const pendingActions = (alerts || []).filter((a) => !a.read).length || 0

    return {
      todayCheckIns,
      todayCheckOuts,
      upcomingReservations,
      monthlyRevenue,
      monthlyRevenueChange: 15,
      averageOccupancy,
      totalReviews,
      averageRating,
      responseRate: averageResponseRate,
      activeProperties: activeProperties.length,
      pendingActions
    }
  }

  return {
    properties: properties || [],
    reservations: reservations || [],
    alerts: alerts || [],
    addProperty,
    updateProperty,
    deleteProperty,
    addReservation,
    updateReservation,
    markAlertAsRead,
    dismissAlert,
    metrics: calculateMetrics()
  }
}
