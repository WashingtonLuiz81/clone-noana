import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'

interface StepperComponentProps {
  activeStep: number
  steps: string[]
}

const StepperComponent: React.FC<StepperComponentProps> = ({
  activeStep,
  steps,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default StepperComponent
