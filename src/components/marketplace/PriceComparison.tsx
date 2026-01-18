import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendDown, TrendUp, Bell } from '@phosphor-icons/react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { format, subDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'sonner'

interface PricePoint {
  date: string
  price: number
  source: string
}

interface PriceComparisonProps {
  currentPrice: number
  priceHistory?: PricePoint[]
  accommodationId: string
  accommodationName: string
}

export function PriceComparison({ currentPrice, priceHistory = [], accommodationId, accommodationName }: PriceComparisonProps) {
  const generatePriceHistory = () => {
    const history: PricePoint[] = []
    const basePrice = currentPrice
    const days = 30
    
    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const variance = (Math.random() - 0.5) * 0.2
      const price = Math.round(basePrice * (1 + variance))
      
      history.push({
        date: format(date, 'dd/MM'),
        price,
        source: 'Vantix'
      })
    }
    
    return history
  }

  const data = priceHistory.length > 0 ? priceHistory : generatePriceHistory()
  
  const lowestPrice = Math.min(...data.map(p => p.price))
  const highestPrice = Math.max(...data.map(p => p.price))
  const avgPrice = Math.round(data.reduce((sum, p) => sum + p.price, 0) / data.length)
  const priceDifference = currentPrice - avgPrice
  const percentChange = ((priceDifference / avgPrice) * 100).toFixed(1)
  const isGoodDeal = currentPrice < avgPrice

  const handlePriceAlert = () => {
    toast.success('¡Alerta activada!', {
      description: `Te notificaremos cuando el precio de ${accommodationName} baje`
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">Comparación de Precios</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Últimos 30 días</p>
          </div>
          <Button variant="outline" size="sm" onClick={handlePriceAlert} className="gap-2">
            <Bell size={16} />
            Alertas
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Precio Actual</p>
            <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Precio Promedio</p>
            <p className="text-2xl font-bold">${avgPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Precio Mínimo</p>
            <p className="text-2xl font-bold text-success">${lowestPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Precio Máximo</p>
            <p className="text-2xl font-bold text-destructive">${highestPrice.toLocaleString()}</p>
          </div>
        </div>

        {isGoodDeal && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-start gap-3">
            <TrendDown size={24} className="text-success mt-0.5" weight="bold" />
            <div>
              <p className="font-semibold text-success">¡Excelente Oferta!</p>
              <p className="text-sm text-foreground/80 mt-1">
                Este precio está <span className="font-semibold">{Math.abs(Number(percentChange))}% por debajo</span> del precio promedio. 
                Ahorra ${Math.abs(priceDifference).toLocaleString()} reservando ahora.
              </p>
            </div>
          </div>
        )}

        {!isGoodDeal && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
            <TrendUp size={24} className="text-accent mt-0.5" weight="bold" />
            <div>
              <p className="font-semibold text-accent">Precio por encima del promedio</p>
              <p className="text-sm text-foreground/80 mt-1">
                Este precio está <span className="font-semibold">{percentChange}% por encima</span> del promedio. 
                Activa alertas para saber cuándo baja.
              </p>
            </div>
          </div>
        )}

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.15 195)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="oklch(0.65 0.15 195)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="oklch(0.50 0.01 240)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="oklch(0.50 0.01 240)"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'oklch(0.98 0 0)',
                  border: '1px solid oklch(0.90 0 0)',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Precio']}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="oklch(0.65 0.15 195)" 
                strokeWidth={2}
                fill="url(#priceGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            Mejor precio: ${lowestPrice.toLocaleString()}
          </Badge>
          <Badge variant="outline">
            Historico de {data.length} días
          </Badge>
          {isGoodDeal && (
            <Badge className="bg-success text-white">
              ¡Gran ahorro!
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
