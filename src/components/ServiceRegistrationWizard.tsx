import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ServiceCategory, Service, ServiceStatus } from '@/lib/types-services'
import { ArrowLeft, ArrowRight, Check, Sparkle } from '@phosphor-icons/react'
import { ServiceBasicInfo } from './wizard-steps/ServiceBasicInfo'
import { ServiceDescription } from './wizard-steps/ServiceDescription'
import { ServiceLogistics } from './wizard-steps/ServiceLogistics'
import { ServicePricing } from './wizard-steps/ServicePricing'
import { ServiceGastronomy } from './wizard-steps/ServiceGastronomy'
import { ServiceDocuments } from './wizard-steps/ServiceDocuments'
import { ServiceContract } from './wizard-steps/ServiceContract'

interface ServiceRegistrationWizardProps {
  category: ServiceCategory
  onComplete: (service: Partial<Service>) => void
  onBack: () => void
}

type WizardStep = {
  id: number
  title: string
  component: React.ComponentType<any>
  optional?: boolean
}

export function ServiceRegistrationWizard({
  category,
  onComplete,
  onBack
}: ServiceRegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [serviceData, setServiceData] = useState<Partial<Service>>({
    category,
    status: 'draft' as ServiceStatus,
    ai_optimized: false
  })

  const steps: WizardStep[] = [
    {
      id: 1,
      title: 'Información Básica',
      component: ServiceBasicInfo
    },
    {
      id: 2,
      title: 'Descripción',
      component: ServiceDescription
    },
    {
      id: 3,
      title: 'Logística',
      component: ServiceLogistics
    },
    {
      id: 4,
      title: 'Precios y Disponibilidad',
      component: ServicePricing
    },
    ...(category === 'gastronomy' ? [{
      id: 5,
      title: 'Servicios de Gastronomía',
      component: ServiceGastronomy
    }] : []),
    {
      id: 6,
      title: 'Documentación Legal',
      component: ServiceDocuments
    },
    {
      id: 7,
      title: 'Contrato y Firma',
      component: ServiceContract
    }
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = (stepData: Partial<Service>) => {
    const updatedData = { ...serviceData, ...stepData }
    setServiceData(updatedData)

    if (currentStep === steps.length - 1) {
      onComplete(updatedData)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep === 0) {
      onBack()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handlePrevious}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" />
            {currentStep === 0 ? 'Cambiar categoría' : 'Anterior'}
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Registra tu servicio turístico</h1>
              <p className="text-muted-foreground mt-1">
                Paso {currentStep + 1} de {steps.length}: {steps[currentStep].title}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Sparkle className="text-primary" weight="fill" />
              <span className="text-sm font-medium">IA activada</span>
            </div>
          </div>

          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center min-w-[100px]"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all
                  ${index < currentStep ? 'bg-primary text-primary-foreground' : ''}
                  ${index === currentStep ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
                  ${index > currentStep ? 'bg-muted text-muted-foreground' : ''}
                `}
              >
                {index < currentStep ? (
                  <Check weight="bold" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <span className="text-xs text-center leading-tight">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <CurrentStepComponent
                category={category}
                data={serviceData}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* AI Assistant Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <Sparkle className="text-primary mt-1 flex-shrink-0" weight="fill" size={20} />
            <div className="text-sm">
              <p className="font-medium mb-1">Asistente IA activado</p>
              <p className="text-muted-foreground">
                La inteligencia artificial te ayudará a optimizar tu servicio, sugerir precios competitivos y mejorar tu visibilidad. Completa cada paso con información precisa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
