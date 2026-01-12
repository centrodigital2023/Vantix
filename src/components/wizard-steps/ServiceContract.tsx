import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ServiceCategory, Service } from '@/lib/types-services'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

interface ServiceContractProps {
  category: ServiceCategory
  data: Partial<Service>
  onNext: (data: Partial<Service>) => void
  onPrevious: () => void
}

export function ServiceContract({ category, data, onNext, onPrevious }: ServiceContractProps) {
  const [checks, setChecks] = useState({
    intermediary_role: false,
    legal_responsibility: false,
    ai_validation: false,
    compliance: false,
    commissions: false,
    insurance: false
  })

  const allRequiredChecked = 
    checks.intermediary_role &&
    checks.legal_responsibility &&
    checks.ai_validation &&
    checks.compliance &&
    checks.commissions

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!allRequiredChecked) {
      toast.error('Debes aceptar todos los términos obligatorios')
      return
    }

    onNext({ checks_accepted: checks })
    toast.success('¡Servicio registrado! Será revisado por nuestro equipo')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Contrato y Firma Digital</h2>
        <p className="text-muted-foreground">
          Lee y acepta el contrato de intermediación SENDAI
        </p>
      </div>

      {/* Contrato */}
      <div className="border rounded-lg p-6 bg-card">
        <h3 className="font-bold mb-4">CONTRATO DE INTERMEDIACIÓN TURÍSTICA DIGITAL</h3>
        
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4 text-sm">
            <p><strong>Entre SENDAI S.A.S.</strong> y <strong>EL PRESTADOR</strong></p>
            
            <div>
              <p className="font-semibold mb-2">1. OBJETO</p>
              <p className="text-muted-foreground">
                SENDAI actúa exclusivamente como intermediario digital para conectar prestadores de servicios turísticos con viajeros.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">2. NATURALEZA DEL SERVICIO</p>
              <p className="text-muted-foreground">
                SENDAI no es operador turístico, agencia de viajes, transportador, guía, aseguradora ni prestador directo. 
                No asume responsabilidad operativa, técnica, física ni legal sobre los servicios ofrecidos.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">3. OBLIGACIONES DEL PRESTADOR</p>
              <p className="text-muted-foreground">
                El prestador debe cumplir la normativa turística colombiana vigente (Ley 2068 de 2020), 
                contar con autorizaciones y permisos, proveer información veraz, y asumir toda responsabilidad 
                civil, penal, administrativa y tributaria derivada del servicio.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">4. VALIDACIÓN CON IA</p>
              <p className="text-muted-foreground">
                El prestador autoriza el uso de inteligencia artificial para validar documentos, 
                optimizar servicios y detectar riesgos.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">5. PAGOS Y COMISIONES</p>
              <p className="text-muted-foreground">
                SENDAI cobrará una comisión por intermediación visible y acordada previamente. 
                No se garantiza volumen de reservas ni ingresos mínimos.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">6. LIMITACIÓN DE RESPONSABILIDAD</p>
              <p className="text-muted-foreground">
                SENDAI no será responsable por accidentes, daños, pérdidas o incumplimientos del prestador. 
                El prestador mantendrá indemne a SENDAI frente a cualquier reclamación.
              </p>
            </div>
          </div>
        </ScrollArea>

        <Button
          type="button"
          variant="outline"
          className="w-full mt-4"
          onClick={() => window.open('/CONTRATO_PRESTADORES.md', '_blank')}
        >
          📄 Ver contrato completo
        </Button>
      </div>

      {/* Checks obligatorios */}
      <div className="space-y-4 border rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="check1"
            checked={checks.intermediary_role}
            onCheckedChange={(checked) => 
              setChecks({ ...checks, intermediary_role: !!checked })
            }
          />
          <Label htmlFor="check1" className="cursor-pointer leading-tight">
            ☑️ Acepto que SENDAI actúa solo como intermediario y no es responsable de la operación del servicio
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="check2"
            checked={checks.legal_responsibility}
            onCheckedChange={(checked) => 
              setChecks({ ...checks, legal_responsibility: !!checked })
            }
          />
          <Label htmlFor="check2" className="cursor-pointer leading-tight">
            ☑️ Declaro que soy responsable legal exclusivo del servicio turístico que ofrezco
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="check3"
            checked={checks.ai_validation}
            onCheckedChange={(checked) => 
              setChecks({ ...checks, ai_validation: !!checked })
            }
          />
          <Label htmlFor="check3" className="cursor-pointer leading-tight">
            ☑️ Autorizo validación documental con IA y análisis predictivo de mi servicio
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="check4"
            checked={checks.compliance}
            onCheckedChange={(checked) => 
              setChecks({ ...checks, compliance: !!checked })
            }
          />
          <Label htmlFor="check4" className="cursor-pointer leading-tight">
            ☑️ Cumplo con la normativa turística colombiana vigente (Ley 2068 de 2020)
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="check5"
            checked={checks.commissions}
            onCheckedChange={(checked) => 
              setChecks({ ...checks, commissions: !!checked })
            }
          />
          <Label htmlFor="check5" className="cursor-pointer leading-tight">
            ☑️ Acepto el sistema de comisiones y pagos de SENDAI
          </Label>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="check6"
              checked={checks.insurance}
              onCheckedChange={(checked) => 
                setChecks({ ...checks, insurance: !!checked })
              }
            />
            <Label htmlFor="check6" className="cursor-pointer leading-tight text-muted-foreground">
              Deseo adquirir seguro contra daños (opcional)
            </Label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Atrás
        </Button>
        <Button type="submit" disabled={!allRequiredChecked}>
          Firmar y Enviar
        </Button>
      </div>
    </form>
  )
}
