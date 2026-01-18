import { motion } from 'framer-motion'

export function AIIndicator({ active = false }: { active?: boolean }) {
  if (!active) return null

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-primary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0.3, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-6 h-6 rounded-full border-2 border-primary"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,191,255,0.8)]" />
    </div>
  )
}
