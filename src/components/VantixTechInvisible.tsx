import { motion } from 'framer-motion'
import { Shield, Lightning, Heart } from '@phosphor-icons/react'

export function VantixTechInvisible() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-vantix-charcoal to-vantix-black">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-vantix-bone mb-6">
            La Tecnología
          </h2>
          <p className="text-xl text-vantix-amber font-mono uppercase tracking-wider">
            El Algoritmo Invisible
          </p>
        </motion.div>

        {/* Grid de features técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-vantix-amber/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 mx-auto bg-vantix-charcoal border border-vantix-amber/30 rounded-2xl flex items-center justify-center">
                <Heart size={40} weight="duotone" className="text-vantix-amber" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-vantix-bone mb-3">
                Verificación Humana
              </h3>
              <p className="text-vantix-bone/70 font-serif leading-relaxed">
                Cada anfitrión, cada guía, cada rincón ha sido validado no por un bot, 
                sino por un humano que buscaba belleza.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-vantix-amber/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 mx-auto bg-vantix-charcoal border border-vantix-amber/30 rounded-2xl flex items-center justify-center">
                <Lightning size={40} weight="duotone" className="text-vantix-amber" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-vantix-bone mb-3">
                Fluidez Absoluta
              </h3>
              <p className="text-vantix-bone/70 font-serif leading-relaxed">
                Reserva en tres clics. Sin letra pequeña. Sin ansiedad. 
                Tu única preocupación debe ser elegir qué música escuchar en el camino.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-vantix-amber/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 mx-auto bg-vantix-charcoal border border-vantix-amber/30 rounded-2xl flex items-center justify-center">
                <Shield size={40} weight="duotone" className="text-vantix-amber" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-vantix-bone mb-3">
                Seguridad
              </h3>
              <p className="text-vantix-bone/70 font-serif leading-relaxed">
                Protegemos tu viaje como protegemos tu sueño. 
                Cada transacción es un pacto de confianza.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Diagrama técnico abstracto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          viewport={{ once: true }}
          className="relative h-64 overflow-hidden rounded-3xl border border-vantix-bone/10"
        >
          <div className="absolute inset-0 bg-vantix-charcoal" />
          <svg className="w-full h-full" viewBox="0 0 800 300">
            {/* Grid de fondo estilo arquitectónico */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 223, 186, 0.05)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="800" height="300" fill="url(#grid)" />
            
            {/* Líneas de conexión */}
            <motion.path
              d="M 100 150 Q 250 50, 400 150 T 700 150"
              fill="none"
              stroke="rgba(255, 176, 59, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Nodos */}
            <motion.circle
              cx="100" cy="150" r="6"
              fill="#FFB03B"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
            <motion.circle
              cx="400" cy="150" r="6"
              fill="#FFB03B"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.circle
              cx="700" cy="150" r="6"
              fill="#FFB03B"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
          </svg>
          
          {/* Texto sobre el diagrama */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-vantix-bone/60 font-mono text-sm tracking-widest">
              TECNOLOGÍA QUE SIENTE
            </p>
          </div>
        </motion.div>

        {/* Texto de cierre */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-xl md:text-2xl text-vantix-bone/80 font-serif leading-relaxed mt-16 max-w-4xl mx-auto"
        >
          Vantix es un SaaS construido sobre la empatía. 
          Nuestro código entiende que un viaje no es una transacción, 
          <span className="text-vantix-amber italic"> es una transformación.</span>
        </motion.p>
      </div>
    </section>
  )
}
