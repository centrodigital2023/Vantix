import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Clock, Lightning } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface DealCountdownProps {
  endsAt: Date
  dealName?: string
  discount?: number
}

export function DealCountdown({ endsAt, dealName = "Oferta Especial", discount }: DealCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endsAt.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endsAt])

  const isExpired = endsAt.getTime() <= new Date().getTime()

  if (isExpired) {
    return null
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 6

  return (
    <div className={`p-4 rounded-lg border-2 ${isUrgent ? 'bg-destructive/5 border-destructive/30' : 'bg-accent/5 border-accent/30'}`}>
      <div className="flex items-center gap-2 mb-3">
        <Lightning size={20} weight="fill" className={isUrgent ? 'text-destructive' : 'text-accent'} />
        <h3 className="font-semibold">{dealName}</h3>
        {discount && (
          <Badge className="deal-badge ml-auto">
            {discount}% OFF
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <TimeUnit value={timeLeft.days} label="Días" isUrgent={isUrgent} />
        <TimeUnit value={timeLeft.hours} label="Horas" isUrgent={isUrgent} />
        <TimeUnit value={timeLeft.minutes} label="Minutos" isUrgent={isUrgent} />
        <TimeUnit value={timeLeft.seconds} label="Segundos" isUrgent={isUrgent} />
      </div>

      {isUrgent && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-destructive font-semibold mt-3 flex items-center gap-1"
        >
          <Clock size={16} weight="bold" />
          ¡Última oportunidad! Oferta por terminar
        </motion.p>
      )}
    </div>
  )
}

interface TimeUnitProps {
  value: number
  label: string
  isUrgent: boolean
}

function TimeUnit({ value, label, isUrgent }: TimeUnitProps) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-2xl font-bold rounded-lg p-2 ${
          isUrgent 
            ? 'bg-destructive/10 text-destructive' 
            : 'bg-accent/10 text-accent'
        }`}
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
