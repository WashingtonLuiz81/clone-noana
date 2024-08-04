import { useState } from 'react'
import {
  BeneficiariesRegistrationBatchFormFile,
  BeneficiariesRegistrationBatchFormBonds,
} from '../../forms'
import StepperComponent from '@/components/stepper'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BatchBeneficiaryRegistration() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Upload', 'Vínculo']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className="bg-gray-50 rounded-2xl">
      {activeStep === 0 && (
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant={'outline'}
            className="flex items-center gap-2 text-primary bg-gray-100 shadow-sm -mt-28"
          >
            <Download width={18} height={18} />
            <span className="text-gray-900 text-sm font-semibold">
              Baixar Planilha
            </span>
          </Button>
        </div>
      )}

      <div className="flex items-center justify-center px-6 pt-8 pb-11 border-b border-gray-300">
        <StepperComponent activeStep={activeStep} steps={steps} />
      </div>

      <div className="py-8 px-6">
        {activeStep === 0 && (
          <BeneficiariesRegistrationBatchFormFile nextStep={handleNext} />
        )}

        {activeStep === 1 && (
          <BeneficiariesRegistrationBatchFormBonds handleBack={handleBack} />
        )}
      </div>
    </div>
  )
}
