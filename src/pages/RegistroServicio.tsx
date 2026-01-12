import { useState } from 'react'
import { ServiceCategorySelector } from '@/components/ServiceCategorySelector'
import { ServiceRegistrationWizard } from '@/components/ServiceRegistrationWizard'
import { ServiceCategory, Service } from '@/lib/types-services'
import { motion } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface RegistroServicioProps {
  onNavigate?: (page: string) => void
}

type RegistrationStep = 'category' | 'wizard' | 'success'

export function RegistroServicio({ onNavigate }: RegistroServicioProps) {
  const [step, setStep] = useState<RegistrationStep>('category')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [registeredService, setRegisteredService] = useState<Partial<Service> | null>(null)

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category)
    setStep('wizard')
  }

  const handleWizardComplete = async (service: Partial<Service>) => {
    console.log('Servicio registrado:', service)
    setRegisteredService(service)
    setStep('success')
  }

  const handleBackToCategory = () => {
    setSelectedCategory(null)
    setStep('category')
  }

  if (step === 'category') {
    return <ServiceCategorySelector onSelectCategory={handleCategorySelect} />
  }

  if (step === 'wizard' && selectedCategory) {
    return (
      <ServiceRegistrationWizard
        category={selectedCategory}
        onComplete={handleWizardComplete}
        onBack={handleBackToCategory}
      />
    )
  }

  if (step === 'success' && registeredService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-card border rounded-2xl p-12 text-center shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <CheckCircle size={80} weight="fill" className="text-primary" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4">
              ¡Servicio Registrado Exitosamente!
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Tu servicio <strong>{registeredService.name}</strong> ha sido enviado para revisión.
              Nuestro equipo lo evaluará en las próximas 24-48 horas.
            </p>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold mb-3">📋 Próximos pasos:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">1.</span>
                  <span>Recibirás un email de confirmación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">2.</span>
                  <span>El SuperAdmin revisará tu servicio y documentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">3.</span>
                  <span>La IA validará la información automáticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">4.</span>
                  <span>Si todo está correcto, tu servicio será activado</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate?.('panel-prestador')}
              >
                Ir al Panel de Prestador
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep('category')}
              >
                Registrar Otro Servicio
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              🧠 <strong>IA trabajando para ti:</strong> Mientras tu servicio está en revisión, 
              nuestra IA está analizando y optimizando la información para máxima visibilidad.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return null
}
