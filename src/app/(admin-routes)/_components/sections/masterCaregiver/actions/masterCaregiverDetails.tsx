import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PhoneIcon, X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'
import { PhoneCallModal } from '@/components/modals'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '../../../radioGroupLinkedUnit'

interface MonitorDetailsProps {
  closeSection: (isVisible: string) => void
  selectedUser: User
}

interface Option {
  id: string
  label: string
}

export default function MasterCaregiverDetails({
  closeSection,
}: MonitorDetailsProps) {
  const [phoneCallModal, setPhoneCallModal] = useState(false)
  const [selected, setSelected] = useState<string>('barigui')
  const [showAll, setShowAll] = useState(false)
  const beneficiaries = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    name: 'Laís Alves',
    avatarSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  }))

  const options: Option[] = [
    { id: 'barigui', label: 'Barigui' },
    { id: 'cajuru', label: 'Cajurú' },
    { id: 'unidade03', label: 'Unidade 03' },
  ]

  return (
    <>
      <section className="h-screen overflow-y-auto scrollbar-hide">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">
              Detalhes do Cuidador Mestre
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

          <div className="flex flex-col gap-4 mt-32">
            <Card className="relative flex flex-col justify-center bg-white rounded-2xl shadow-md text-gray-900 p-8">
              <Avatar className="absolute w-40 h-40 -top-20 inset-x-1/2 transform -translate-x-1/2">
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>

              <CardHeader className="text-center">
                <CardTitle className="text-2xl pb-10 pt-16 text-center font-semibold">
                  Rodrigo Alves
                </CardTitle>
              </CardHeader>

              <CardContent className="flex justify-between p-0 text-sm">
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-[auto_1fr] gap-6 text-sm font-medium">
                    <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      CPF
                    </span>
                    <span className="text-left text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      102.335.678-78
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] gap-6 text-sm font-medium">
                    <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      E-mail
                    </span>
                    <span className="text-left text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      arthur@gmail.com
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] gap-6 text-sm font-medium">
                    <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      Telefone
                    </span>
                    <span className="text-left text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      11 9876-5643
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] gap-6 text-sm font-medium">
                    <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      CEP
                    </span>
                    <span className="text-left text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      20780-200
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-[auto_1fr] gap-6 text-sm font-medium">
                    <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      Endereço
                    </span>
                    <span className="text-left text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      Joaquim Sale, 876 - Morumbi
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] gap-6 text-sm font-medium">
                    <span className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      Cidade / Estado
                    </span>
                    <span className="text-left text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      São Paulo / SP
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative flex flex-col justify-center bg-white rounded-2xl shadow-md text-gray-900 px-8 py-6">
              <CardHeader className="p-0 mb-7">
                <CardTitle className="flex items-center justify-between text-base font-semibold">
                  Unidade Vinculada
                </CardTitle>
              </CardHeader>

              <CardContent className="w-full p-0">
                <RadioGroup
                  options={options}
                  name="unitcare"
                  selected={selected}
                  setSelected={setSelected}
                  readOnly
                />
              </CardContent>
            </Card>

            <Card className="relative flex flex-col justify-center bg-white rounded-2xl shadow-md text-gray-900 px-8 py-6">
              <CardHeader className="p-0 mb-3">
                <CardTitle className="flex items-center justify-between text-base font-semibold">
                  Beneficiários Vinculados ao Monitor
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
        </div>

        {phoneCallModal && (
          <PhoneCallModal onClose={() => setPhoneCallModal(false)} />
        )}
      </section>
    </>
  )
}
