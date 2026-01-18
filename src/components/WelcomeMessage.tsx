export function WelcomeMessage() {
  return (
    <div className="py-16 md:py-24 bg-vantix-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-vantix-bone leading-tight">
          ¿Por qué viajas?
        </h2>
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-vantix-bone/70 leading-relaxed font-serif">
            No viajas para escapar de tu oficina. <span className="text-vantix-amber italic">Viajas para regresar a tu cuerpo.</span>
          </p>
          <p className="text-lg md:text-xl text-vantix-bone/70 leading-relaxed font-serif">
            Vivimos anestesiados por la rutina, atrapados en un "modo supervivencia" que nos prohíbe sentir demasiado.
            <span className="text-vantix-bone font-bold"> Vantix es el antídoto contra la apatía.</span>
          </p>
          <p className="text-xl md:text-2xl text-vantix-amber font-serif italic leading-relaxed pt-4">
            Aquí no vendemos camas de hotel. Curamos escenarios para la alegría radical.
          </p>
        </div>
      </div>
    </div>
  )
}