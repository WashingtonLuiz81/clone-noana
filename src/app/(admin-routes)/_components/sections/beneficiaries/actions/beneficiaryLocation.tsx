import { Card, CardContent } from '@/components/ui/card'

import Image from 'next/image'
import { ImageMap } from '@/assets/img/icons'

export default function BeneficiaryLocation() {
  return (
    <section className="absolute right-0 w-[54rem]">
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Localização</h1>
        <Card className="flex flex-col items-start gap-4 rounded-2xl bg-gray-50 p-8 mb-4 text-gray-900">
          <CardContent className="flex flex-col gap-4 text-sm p-0">
            <Image
              src={ImageMap}
              className="w-full"
              width={500}
              height={500}
              alt="Mapa"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
