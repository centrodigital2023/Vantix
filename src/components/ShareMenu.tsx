import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ShareNetwork, WhatsappLogo, FacebookLogo, TwitterLogo, Link as LinkIcon, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ShareMenuProps {
  title: string
  price: number
  url?: string
}

export function ShareMenu({ title, price, url }: ShareMenuProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const shareUrl = url || window.location.href
  const shareText = `¡Mira este lugar! ${title} - Desde $${price.toLocaleString()}/noche en VANTIX`

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`
    window.open(whatsappUrl, '_blank')
    toast.success('Compartiendo en WhatsApp')
    setOpen(false)
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
    toast.success('Compartiendo en Facebook')
    setOpen(false)
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
    toast.success('Compartiendo en Twitter')
    setOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Enlace copiado al portapapeles')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('No se pudo copiar el enlace')
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl
        })
        setOpen(false)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
      }
    }
  }

  const shareButtons = [
    {
      icon: WhatsappLogo,
      label: 'WhatsApp',
      color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]',
      onClick: handleWhatsAppShare
    },
    {
      icon: FacebookLogo,
      label: 'Facebook',
      color: 'hover:bg-[#1877F2]/10 hover:text-[#1877F2]',
      onClick: handleFacebookShare
    },
    {
      icon: TwitterLogo,
      label: 'Twitter',
      color: 'hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]',
      onClick: handleTwitterShare
    },
    {
      icon: copied ? Check : LinkIcon,
      label: 'Copiar enlace',
      color: copied ? 'bg-success/10 text-success' : 'hover:bg-primary/10 hover:text-primary',
      onClick: handleCopyLink
    }
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
        >
          <ShareNetwork size={18} weight="bold" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-3" align="end">
        <div className="space-y-2">
          <p className="text-sm font-semibold mb-3">Compartir este lugar</p>

          {typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined' && (
            <Button
              variant="outline"
              className="w-full justify-start gap-3 mb-2"
              onClick={handleNativeShare}
            >
              <ShareNetwork size={20} weight="bold" />
              Compartir...
            </Button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {shareButtons.map((button, index) => (
              <motion.div
                key={button.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-12 ${button.color} transition-all`}
                  onClick={button.onClick}
                >
                  <button.icon size={20} weight="bold" />
                  <span className="text-xs">{button.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
