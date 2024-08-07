import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { PhoneIcon, X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/careUnits'
import { PhoneCallModal } from '@/components/modals'
import { useState } from 'react'

interface CareUnitDetailsProps {
  closeSection: (isVisible: string) => void
  selectedUser: User
}

export default function CareUnitDetails({
  closeSection,
}: CareUnitDetailsProps) {
  const [phoneCallModal, setPhoneCallModal] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const beneficiaries = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    name: 'Laís Alves',
    avatarSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  }))

  return (
    <>
      <section className="h-screen overflow-y-auto scrollbar-hide">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">
              Detalhes da Unidade de Cuidado
            </h1>

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

          <div className="flex flex-col items-center mb-24 mt-24 relative">
            <div className="flex items-center absolute -bottom-44 justify-center">
              <Avatar className="w-40 h-40 bg-purple-100 border-2 border-primary">
                {/* <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" /> */}
                <AvatarFallback className="font-semibold text-2xl text-purple-900">
                  NUC
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl pb-10 pt-12 text-center font-semibold">
                Nome da Unidade
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">CPF: </span>
                <span className="text-left">102.335.678-78</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">Endereço: </span>
                <span className="text-left">Joaquim Sale, 876 - Morumbi</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">
                  Data de Nascimento:
                </span>
                <span className="text-left">10/07/1961</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">
                  Cidade / Estado:
                </span>
                <span className="text-left">São Paulo / SP</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">Sexo: </span>
                <span className="text-left">Feminino</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">IMEI:</span>
                <span className="text-left">17823634721</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">Telefone:</span>
                <span className="text-left">11 9876-5643</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">Modelo:</span>
                <span className="text-left">Aparelho</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative flex flex-col justify-center bg-white rounded-2xl shadow-md text-gray-900 px-8 py-6">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="flex items-center justify-between text-base font-semibold">
                Beneficiários Vinculados
                <Button
                  type="button"
                  className="flex items-center font-semibold text-sm bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-100"
                  onClick={() => setShowAll(!showAll)}
                >
                  <span>{showAll ? 'Ver Menos' : 'Ver Todos'}</span>
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="w-full p-0">
              <ul className="grid grid-cols-2 gap-3">
                {beneficiaries
                  .slice(0, showAll ? beneficiaries.length : 6)
                  .map((beneficiary) => (
                    <li
                      key={beneficiary.id}
                      className="flex items-center gap-2 rounded-2xl border border-gray-200 p-2 shadow-sm"
                    >
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={beneficiary.avatarSrc} />
                        <AvatarFallback>LA</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-900">
                        {beneficiary.name}
                      </span>
                    </li>
                  ))}
              </ul>
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
