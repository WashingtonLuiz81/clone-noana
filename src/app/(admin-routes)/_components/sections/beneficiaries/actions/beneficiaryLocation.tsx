import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PhoneIcon, X } from 'lucide-react'
import MapComponent from '@/components/maps/MapComponent'
import { useState } from 'react'
import { PhoneCallModal } from '@/components/modals'

interface BeneficiaryLocationProps {
  closeSection: (isVisible: string) => void
}

export default function BeneficiaryLocation({
  closeSection,
}: BeneficiaryLocationProps) {
  const [showModal, setShowModal] = useState(false)
  const apiKey = 'AIzaSyCOORx5C1N5R8CANPIR_S7wQkSBo1kwNEw'
  const lat = -23.5489
  const lng = -46.6388

  return (
    <section className="absolute right-0 w-[54rem]">
      <div className="p-5 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-6">Localização</h1>
          <X
            className="cursor-pointer text-gray-900 mb-6"
            onClick={() => closeSection('')}
          />
        </div>
        <Card className="flex flex-col items-start gap-4 rounded-2xl bg-gray-50 p-8 mb-4 text-gray-900">
          <CardContent className="flex flex-col text-sm p-0 w-full">
            <MapComponent apiKey={apiKey} lat={lat} lng={lng} />

            <div className="flex items-center gap-1 py-9 mb-3 border-b-2 border-gray-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-status-success"></span>
              <p className="text-gray-400 opacity-40">Atualizado há 3min</p>
            </div>

            <Button
              className="flex items-center gap-4 p-3 text-lg font-semibold text-white"
              onClick={() => setShowModal(true)}
            >
              <PhoneIcon width={20} height={20} />
              Ligar
            </Button>
          </CardContent>
        </Card>
      </div>

      {showModal && <PhoneCallModal onClose={() => setShowModal(false)} />}
    </section>
  )
}
