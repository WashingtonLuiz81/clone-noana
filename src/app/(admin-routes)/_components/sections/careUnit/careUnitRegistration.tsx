import * as React from 'react'
import { X } from 'lucide-react'
import { useState } from 'react'
import { AlertCloseSection } from '../../alertCloseSection'
import { CareUnitRegistrationFormData } from '../../forms'

interface CareUnitRegistrationProps {
  closeSection: (isVisible: string) => void
}

export default function CareUnitRegistration({
  closeSection,
}: CareUnitRegistrationProps) {
  const [showAlert, setShowAlert] = useState(false)

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
    <>
      <div className="h-full flex flex-col items-start px-5 py-5 justify-start border bg-gray-100">
        <header className="w-full flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-[#1A1A1A] text-2xl font-semibold">
              Cadastrar Unidade de Cuidado
            </span>

            <X
              className="cursor-pointer text-gray-900"
              onClick={() => setShowAlert(true)}
            />
          </div>
        </header>

        <div className="w-full  max-w-4xl p-8 bg-white rounded-md shadow-md">
          <CareUnitRegistrationFormData />
        </div>

        {showAlert && <AlertCloseSection handleExitAction={handleExitAction} />}
      </div>
    </>
  )
}
