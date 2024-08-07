import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { PhoneIcon, X } from 'lucide-react'
import { useState } from 'react'
import { PhoneCallModal } from '@/components/modals'

interface CareUnitListProps {
  closeSection: (isVisible: string) => void
}

export default function CareUnitList({ closeSection }: CareUnitListProps) {
  const [phoneCallModal, setPhoneCallModal] = useState(false)

  return (
    <section className="h-screen overflow-y-auto scrollbar-hide">
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl font-semibold">Lista de Cuidadores Mestre</h1>

          <X
            className="cursor-pointer text-gray-900"
            onClick={() => closeSection('')}
          />
        </div>

        <div className="space-y-6">
          <Card className="flex justify-between p-6 items-start bg-gray-50">
            <div className="flex flex-col items-start gap-7">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>

                <h2 className="text-base font-medium">Arthur Martins</h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">Unidade: </span>
                    <span className="text-left">Nome da Unidade</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">CPF: </span>
                    <span className="text-left">103.987.874-83</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">Telefone: </span>
                    <span className="text-left">11 98787-6765</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">E-mail: </span>
                    <span className="text-left">arthurmar@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-7">
              <Button variant="outline">Desvincular</Button>
              <Button
                className="flex items-center gap-4 text-sm font-semibold text-white"
                onClick={() => setPhoneCallModal(true)}
              >
                <PhoneIcon width={20} height={20} />
                Ligar
              </Button>
            </div>
          </Card>

          <Card className="flex justify-between p-6 items-start bg-gray-50">
            <div className="flex flex-col items-start gap-7">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>

                <h2 className="text-base font-medium">Arthur Martins</h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">Unidade: </span>
                    <span className="text-left">Nome da Unidade</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">CPF: </span>
                    <span className="text-left">103.987.874-83</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">Telefone: </span>
                    <span className="text-left">11 98787-6765</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">E-mail: </span>
                    <span className="text-left">arthurmar@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-7">
              <Button variant="outline">Desvincular</Button>
              <Button
                className="flex items-center gap-4 text-white"
                onClick={() => setPhoneCallModal(true)}
              >
                <PhoneIcon width={20} height={20} />
                Ligar
              </Button>
            </div>
          </Card>

          <Card className="flex justify-between p-6 items-start bg-gray-50">
            <div className="flex flex-col items-start gap-7">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>

                <h2 className="text-base font-medium">Arthur Martins</h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">Unidade: </span>
                    <span className="text-left">Nome da Unidade</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">CPF: </span>
                    <span className="text-left">103.987.874-83</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">Telefone: </span>
                    <span className="text-left">11 98787-6765</span>
                  </div>

                  <div className="flex gap-9 text-sm font-medium">
                    <span className="w-[60px] text-gray-500">E-mail: </span>
                    <span className="text-left">arthurmar@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-7">
              <Button variant="outline">Desvincular</Button>
              <Button
                className="flex items-center gap-4 text-white"
                onClick={() => setPhoneCallModal(true)}
              >
                <PhoneIcon width={20} height={20} />
                Ligar
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {phoneCallModal && (
        <PhoneCallModal onClose={() => setPhoneCallModal(false)} />
      )}
    </section>
  )
}
