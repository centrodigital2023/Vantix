import { CheckCircle, Circle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  label: string
  description?: string
}

interface RegistrationStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (index: number) => void
  allowSkipAhead?: boolean
}

export function RegistrationStepper({ 
  steps, 
  currentStep, 
  onStepClick,
  allowSkipAhead = false 
}: RegistrationStepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const canClick = allowSkipAhead || isCompleted
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => canClick && onStepClick?.(index)}
                disabled={!canClick}
                className={cn(
                  "group flex flex-col items-center gap-2 transition-all duration-300",
                  canClick && "cursor-pointer hover:scale-105",
                  !canClick && "cursor-not-allowed opacity-60"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isCompleted && "bg-primary border-primary text-primary-foreground scale-100",
                  isCurrent && "bg-background border-primary text-primary scale-110 shadow-lg shadow-primary/30",
                  !isCompleted && !isCurrent && "bg-muted border-border text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" weight="fill" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex flex-col items-center">
                  <span className={cn(
                    "text-sm font-medium text-center transition-colors duration-300",
                    isCurrent && "text-foreground",
                    isCompleted && "text-muted-foreground",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-muted-foreground text-center max-w-24">
                      {step.description}
                    </span>
                  )}
                </div>
              </button>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 transition-all duration-500",
                  index < currentStep ? "bg-primary" : "bg-border"
                )} />
              )}
            </div>
          )
        })}
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                index < currentStep && "bg-primary",
                index === currentStep && "bg-primary animate-pulse",
                index > currentStep && "bg-border"
              )}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Paso {currentStep + 1} de {steps.length}
          </span>
          <span className="font-medium text-foreground">
            {steps[currentStep].label}
          </span>
        </div>
      </div>
    </div>
  )
}
