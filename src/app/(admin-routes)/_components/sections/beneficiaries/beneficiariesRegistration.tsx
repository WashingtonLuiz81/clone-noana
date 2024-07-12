import * as React from 'react'
import TabList from '../../tabs/tabList'
import BeneficiariesRegistrationManual from './beneficiariesRegistrationManual'
import { X } from 'lucide-react'

interface BeneficiariesRegistrationProps {
  closeSection: (isVisible: string) => void
}

export default function BeneficiariesRegistration({
  closeSection,
}: BeneficiariesRegistrationProps) {
  const [tabTitle, setTabTitle] = React.useState('Manual')

  const tabs = ['Manual', 'Em Lote']

  return (
    <div className="h-screen bg-gray-100 px-6 py-10 overflow-y-auto scrollbar-hide">
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-[#1A1A1A] text-2xl font-semibold">
            Cadastrar Beneficiário
          </span>

          <X
            className="cursor-pointer text-gray-900"
            onClick={() => closeSection('')}
          />
        </div>

        <div className="max-w-52 rounded-xl border border-gray-200">
          <TabList
            tabs={tabs}
            tabTitle={tabTitle}
            setTabTitle={(title) => setTabTitle(title)}
          />
        </div>
      </header>

      <div>{tabTitle === 'Manual' && <BeneficiariesRegistrationManual />}</div>
    </div>
  )
}
