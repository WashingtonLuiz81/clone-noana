import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PhoneIcon, X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'
import { PhoneCallModal } from '@/components/modals'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface MonitorDetailsProps {
  closeSection: (isVisible: string) => void
  selectedUser: User
}

export default function MonitorDetails({ closeSection }: MonitorDetailsProps) {
  const [phoneCallModal, setPhoneCallModal] = useState(false)

  return (
    <>
      <section className="ViewCareUnit absolute right-0 w-full">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">Detalhes do Monitor</h1>
            <div className="flex items-center gap-4">
              <Button
                className="flex items-center gap-4 text-sm font-semibold text-white"
                onClick={() => setPhoneCallModal(true)}
              >
                <PhoneIcon width={20} height={20} />
                Ligar
              </Button>

              <X
                className="cursor-pointer text-gray-900"
                onClick={() => closeSection('')}
              />
            </div>
          </div>

          <Card className="relative flex flex-col justify-center mt-32 bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <Avatar className="absolute w-40 h-40 -top-20 inset-x-1/2 transform -translate-x-1/2">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
              <AvatarFallback>LA</AvatarFallback>
            </Avatar>

            <CardHeader className="text-center">
              <CardTitle className="text-2xl pb-10 pt-16 text-center font-semibold">
                Rodrigo Alves
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex gap-6 text-sm font-medium">
                <span className="w-36 text-gray-500">Telefone: </span>
                <span className="w-36 text-left text-gray-900">
                  11 9876-5643
                </span>
              </div>

              <div className="flex gap-6 text-sm font-medium">
                <span className="w-14 text-gray-500">Email:</span>
                <span className="text-left text-gray-900">
                  rodrigo@gmail.com
                </span>
              </div>

              <div className="flex gap-6 text-sm font-medium">
                <span className="w-[140px] text-gray-500">
                  Grau de Parentesco
                </span>

                <span className="text-left text-gray-900">Filho</span>
              </div>

              <div className="flex gap-6 text-sm font-medium">
                <span className="w-14 text-gray-500">Vínculo:</span>

                <div className="flex items-center gap-3">
                  <Avatar className="w-6 h-6 border border-gray-200">
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
                    <AvatarFallback>LA</AvatarFallback>
                  </Avatar>

                  <span className="flex-1 text-left text-gray-900">
                    Laís Alves
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {phoneCallModal && (
          <PhoneCallModal onClose={() => setPhoneCallModal(false)} />
        )}
      </section>
    </>
  )
}
