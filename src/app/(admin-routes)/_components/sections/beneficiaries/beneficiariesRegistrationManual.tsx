import { useState } from 'react'
import {
  BeneficiariesRegistrationManualFormData,
  BeneficiariesRegistrationManualFormBonds,
  BeneficiariesRegistrationManualFormContractor,
  BeneficiariesRegistrationManualFormCaregiver,
} from '../../forms'
import StepperComponent from '@/components/stepper'

export default function BeneficiariesRegistrationManual() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Dados', 'Vínculos', 'Contratante', 'Monitor']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <div className="bg-gray-50 rounded-2xl">
      <div className="flex items-center justify-center px-6 pt-8 pb-11 border-b-[1px] border-gray-300">
        <StepperComponent activeStep={activeStep} steps={steps} />
      </div>

      <div className="py-8 px-6">
        {activeStep === 0 && (
          <BeneficiariesRegistrationManualFormData nextStep={handleNext} />
        )}

        {activeStep === 1 && (
          <BeneficiariesRegistrationManualFormBonds
            handleBack={handleBack}
            nextStep={handleNext}
          />
        )}

        {activeStep === 2 && (
          <BeneficiariesRegistrationManualFormContractor
            handleBack={handleBack}
            nextStep={handleNext}
          />
        )}

        {activeStep === 3 && (
          <BeneficiariesRegistrationManualFormCaregiver
            handleBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
