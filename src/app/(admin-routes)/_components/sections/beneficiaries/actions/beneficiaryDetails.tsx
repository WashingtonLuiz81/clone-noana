import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { PhoneIcon, X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'
import { RadioGroup } from '../../../radioGroupLinkedUnit'
import { Button } from '@/components/ui/button'
import { PhoneCallModal } from '@/components/modals'
import BatteryLevel from '@/components/batteryLevel'

interface BeneficiaryDetailsProps {
  selectedUser: User
  closeSection: (isVisible: string) => void
}

interface Option {
  id: string
  label: string
}

const options: Option[] = [
  { id: 'barigui', label: 'Barigui' },
  { id: 'cajuru', label: 'Cajurú' },
  { id: 'unidade03', label: 'Unidade 03' },
]

export default function BeneficiaryDetails({
  selectedUser,
  closeSection,
}: BeneficiaryDetailsProps) {
  const [phoneCallModal, setPhoneCallModal] = useState(false)

  return (
    <>
      <section className="h-screen overflow-y-auto scrollbar-hide">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">Detalhes do Beneficiário</h1>

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
              <Avatar className="w-40 h-40">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl pb-10 pt-16 text-center font-semibold">
                {selectedUser.nomeCompleto}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">CPF: </span>
                <span className="text-left">{selectedUser.cpf}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">Endereço: </span>
                <span className="text-left">
                  {selectedUser.address.logradouro}
                </span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">
                  Data de Nascimento:
                </span>
                <span className="text-left">{selectedUser.dataNascimento}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">
                  Cidade / Estado:
                </span>
                <span className="text-left">{`${selectedUser.address.cidade}/${selectedUser.address.estado}`}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">Sexo: </span>
                <span className="text-left">{selectedUser.sexo}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">IMEI:</span>
                <span className="text-left">{selectedUser.imei}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">Telefone:</span>
                <span className="text-left">{selectedUser.telefone}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">Modelo:</span>
                <span className="text-left">{selectedUser.modelo}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="p-0 mb-7">
              <CardTitle className="flex text-base font-semibold text-gray-900">
                Unidade Vinculada
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <RadioGroup
                options={options}
                name="unitcare"
                selected="cajuru"
                readOnly
              />
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-7 bg-white rounded-2xl shadow-md p-8 mb-4">
            <CardHeader className="p-0">
              <CardTitle className="flex text-base font-semibold text-gray-900">
                Dados do Dispositivo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm p-0">
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">IMEI: </span>
                <span className="text-left">
                  {selectedUser.dispositivo.imei}
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">Modelo: </span>
                <span className="text-left">
                  {selectedUser.dispositivo.modelo}
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">Bateria: </span>
                <BatteryLevel value={selectedUser.dispositivo.bateria} />
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">Conexão: </span>
                <span className="text-left">
                  {selectedUser.dispositivo.conexao}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-7 bg-white rounded-2xl shadow-md p-8 mb-4">
            <CardHeader className="p-0">
              <CardTitle className="flex text-base font-semibold text-gray-900">
                Dados do Contratante
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm p-0">
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">CPF: </span>
                <span className="text-left">
                  {selectedUser.contratante.cpf}
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Sexo: </span>
                <span className="text-left">
                  {selectedUser.contratante.sexo}
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="text-gray-500">Data de Nascimento:</span>
                <span className="text-left">
                  {selectedUser.contratante.dataNascimento}
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Telefone: </span>
                <span className="text-left">
                  {selectedUser.contratante.telefone}
                </span>
              </div>
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Endereço: </span>
                <span className="text-left">
                  {selectedUser.contratante.address.logradouro}
                </span>
              </div>
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">
                  Cidade / Estado:
                </span>
                <span className="text-left">{`${selectedUser.contratante.address.cidade}/${selectedUser.contratante.address.estado}`}</span>
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
