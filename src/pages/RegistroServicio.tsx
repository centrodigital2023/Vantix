import { ServiceRegistrationWizard } from '@/components/registration/ServiceRegistrationWizard'

interface RegistroServicioProps {
  onNavigate?: (page: string) => void
}

export function RegistroServicio({ onNavigate }: RegistroServicioProps) {
  return <ServiceRegistrationWizard />
}
