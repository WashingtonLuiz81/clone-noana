import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PhoneIcon } from 'lucide-react'

import MapComponent from '@/components/maps/MapComponent'

export default function BeneficiaryLocation() {
  const apiKey = 'AIzaSyCOORx5C1N5R8CANPIR_S7wQkSBo1kwNEw'
  const lat = -23.5489
  const lng = -46.6388

  return (
    <section className="absolute right-0 w-[54rem]">
      <div className="p-5 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Localização</h1>
        <Card className="flex flex-col items-start gap-4 rounded-2xl bg-gray-50 p-8 mb-4 text-gray-900">
          <CardContent className="flex flex-col text-sm p-0 w-full">
            <MapComponent apiKey={apiKey} lat={lat} lng={lng} />

            <Button className="flex items-center gap-4 p-3 mt-6 text-lg font-semibold text-white">
              <PhoneIcon width={20} height={20} />
              Ligar
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
