import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function ManifestoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative py-32 bg-gradient-to-b from-[#050505] to-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif-editorial font-bold text-center mb-16">
            ¿Por qué viajas?
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-lg md:text-xl leading-relaxed font-serif-editorial"
          >
            <p className="text-muted-foreground/90">
              No viajas para escapar de tu oficina. Viajas para{' '}
              <span className="text-accent font-bold">regresar a tu cuerpo</span>.
            </p>

            <p className="text-muted-foreground/90">
              Vivimos anestesiados por la rutina, atrapados en un "modo supervivencia" que nos prohíbe sentir demasiado.{' '}
              <span className="text-foreground font-bold">Vantix es el antídoto contra la apatía.</span>
            </p>

            <p className="text-muted-foreground/90">
              Aquí no vendemos camas de hotel ni itinerarios turísticos. Aquí curamos{' '}
              <span className="text-accent font-bold">escenarios para la alegría radical</span>.
            </p>

            <p className="text-muted-foreground/90">
              Buscamos esos rincones del mundo diseñados para que sueltes el aire que llevas aguantando años. 
              Lugares donde la vulnerabilidad no es debilidad, sino la única forma de tocar la realidad.
            </p>

            <p className="text-foreground text-2xl md:text-3xl font-bold mt-12 text-center">
              La vida es un evento breve.
              <br />
              <span className="text-accent">Posponer la dicha es un crimen contra tu propia existencia.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
