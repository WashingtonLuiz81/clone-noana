import React, { useState } from 'react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PhoneCallModal } from '@/components/modals'

import { PhoneIcon, X } from 'lucide-react'

interface MonitorsListProps {
  closeSection: (isVisible: string) => void
}

export default function BeneficiaryMonitorsList({
  closeSection,
}: MonitorsListProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="h-screen overflow-y-auto scrollbar-hide">
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-6">Lista de Monitores</h1>

          <X
            className="cursor-pointer text-gray-900 mb-6"
            onClick={() => closeSection('')}
          />
        </div>

        {[1, 2, 3].map((_, index) => (
          <Card
            key={index}
            className="flex flex-col items-start gap-4 rounded-2xl bg-gray-50 p-8 mb-4 text-gray-900"
          >
            <CardHeader className="p-0 flex flex-row justify-between items-center w-full">
              <CardTitle className="flex text-base font-semibold text-gray-900">
                Dados do Monitor {index + 1}
              </CardTitle>

              <Button
                className="flex items-center gap-4 text-sm font-semibold text-white"
                onClick={() => setShowModal(true)}
              >
                <PhoneIcon width={20} height={20} />
                Ligar
              </Button>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 text-sm p-0">
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Nome: </span>
                <span className="text-left">Rodrigo Alves</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Telefone: </span>
                <span className="text-left">11 98765-9836</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">E-mail: </span>
                <span className="text-left">rodrigoalves@gmail.com</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">
                  Grau de Parentesco:
                </span>

                <span className="text-left">Filho</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {showModal && <PhoneCallModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  )
}
