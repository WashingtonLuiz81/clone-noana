import * as React from 'react'
import { X } from 'lucide-react'
import StepperComponent from '@/components/stepper'
import {
  SimpleCaregiverRegistrationFormData,
  SimpleCaregiverRegistrationFormBonds,
} from '../../forms'
import { AlertCloseSection } from '../../alertCloseSection'
import { useState } from 'react'

interface BeneficiariesRegistrationProps {
  closeSection: (isVisible: string) => void
}

export default function SimpleCaregiverRegistration({
  closeSection,
}: BeneficiariesRegistrationProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const steps = ['Dados', 'Vínculos']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  function handleExitAction(status: boolean): boolean {
    if (status) {
      closeSection('')
      return true
    } else {
      setShowAlert(false)
      return false
    }
  }

  return (
    <div className="h-screen bg-gray-100 px-6 py-10 overflow-y-auto scrollbar-hide">
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-[#1A1A1A] text-2xl font-semibold">
            Cadastrar Cuidador Simples
          </span>

          <X
            className="cursor-pointer text-gray-900"
            onClick={() => setShowAlert(true)}
          />
        </div>
      </header>

      <div className="bg-gray-50 rounded-2xl">
        <div className="flex items-center justify-center px-6 py-8 border-b-[1px] border-gray-300">
          <StepperComponent activeStep={activeStep} steps={steps} />
        </div>

        <div className="py-8 px-6">
          {activeStep === 0 && (
            <SimpleCaregiverRegistrationFormData nextStep={handleNext} />
          )}

          {activeStep === 1 && (
            <SimpleCaregiverRegistrationFormBonds handleBack={handleBack} />
          )}
        </div>
      </div>

      {showAlert && <AlertCloseSection handleExitAction={handleExitAction} />}
    </div>
  )
}
