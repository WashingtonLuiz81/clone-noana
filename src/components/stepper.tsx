// components/StepperComponent.tsx
import React from 'react'
import { Check } from 'lucide-react'

type StepperProps = {
  activeStep: number
  steps: string[]
}

const StepperComponent: React.FC<StepperProps> = ({ activeStep, steps }) => {
  return (
    <div className="w-[400px] flex justify-center items-center gap-1">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex-1 gap-1 flex items-start last:flex-none"
        >
          <div className="relative flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto mb-2 
                          ${index <= activeStep ? 'bg-[#A96CD5] ' : 'bg-gray-300'}`}
            >
              {index < activeStep ? (
                <div className="w-full h-full flex items-center justify-center bg-primary rounded-full">
                  <Check className="text-white w-5 h-5" />
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center rounded-full ${index === activeStep ? 'w-6 h-6 bg-primary' : 'w-3.5 h-3.5 bg-gray-400'}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${index === activeStep ? 'bg-white' : 'bg-gray-300'}`}
                  ></span>
                </div>
              )}
            </div>
            <div
              className={`absolute top-10 text-center text-base font-medium text-gray-700 opacity-70`}
            >
              {step}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="flex-1 mt-4">
              <div className="w-full h-1 rounded-[100px] bg-gray-300 flex items-center">
                <div
                  className={`rounded-[100px] h-1 ${index < activeStep ? 'bg-[#A96CD5] ' : 'bg-gray-300'}`}
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default StepperComponent
