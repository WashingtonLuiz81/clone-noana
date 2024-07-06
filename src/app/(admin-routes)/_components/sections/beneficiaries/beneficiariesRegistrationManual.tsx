import { useState } from 'react'
import StepperComponent from '../../stepper'
import BeneficiariesRegistrationManualFormData from '../../forms/beneficiariesRegistrationManualFormData'
import BeneficiariesRegistrationManualFormBonds from '../../forms/beneficiariesRegistrationManualFormBonds'
import BeneficiariesRegistrationManualFormContractor from '../../forms/beneficiariesRegistrationManualFormContractor'
import BeneficiariesRegistrationManualFormCaregiver from '../../forms/beneficiariesRegistrationManualFormCaregiver'

export default function BeneficiariesRegistrationManual() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Dados', 'Vínculos', 'Contratante', 'Cuidador']

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // const handleReset = () => {
  //   setActiveStep(0)
  // }

  return (
    <div className="bg-gray-50 rounded-2xl">
      <div className="px-6 py-8 border-b-[1px] border-gray-300">
        <StepperComponent activeStep={activeStep} steps={steps} />
      </div>

      {/* <div className="mt-4">
        {activeStep === 3 ? (
          <div>
            <p>All steps completed</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2"
              onClick={handleNext}
            >
              {activeStep === 2 ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div> */}

      <div className="py-8 px-6 h-96 overflow-y-auto">
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
