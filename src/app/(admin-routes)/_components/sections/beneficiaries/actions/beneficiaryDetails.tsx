import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

import { PhoneIcon } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'
import { RadioGroup } from '../../../radioGroupLinkedUnit'

interface BeneficiaryDetailsProps {
  selectedUser: User
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
}: BeneficiaryDetailsProps) {
  console.log('user Id', selectedUser)
  return (
    <>
      <section className="h-screen overflow-y-auto scrollbar-hide">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">Detalhes do Beneficiário</h1>

            <Button className="flex items-center gap-4 text-white">
              <PhoneIcon width={20} height={20} />
              Ligar
            </Button>
          </div>

          <div className="flex flex-col items-center mb-24 mt-24 relative">
            <div className="flex items-center absolute -bottom-44 justify-center">
              <Avatar className="w-56 h-56">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl pb-10 pt-16 text-center font-semibold">
                {selectedUser.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[160px] text-gray-500">CPF: </span>
                <span className="text-left">{selectedUser.cpf}</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[120px] text-gray-500">Endereço: </span>
                <span className="text-left">{selectedUser.endereco}</span>
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
                <span className="text-left">{`${selectedUser.cidade}/${selectedUser.estado}`}</span>
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
                <span className="text-left">
                  <Progress
                    value={selectedUser.dispositivo.bateria}
                    className="w-full"
                  />
                  <span className="">{selectedUser.dispositivo.bateria}%</span>
                </span>
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
                  {selectedUser.contratante.endereco}
                </span>
              </div>
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">
                  Cidade / Estado:
                </span>
                <span className="text-left">{`${selectedUser.contratante.cidade}/${selectedUser.contratante.estado}`}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-7 bg-white rounded-2xl shadow-md p-8 mb-4">
            <CardHeader className="p-0">
              <CardTitle className="flex text-base font-semibold text-gray-900">
                Dados do Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm p-0">
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Nome: </span>
                <span className="text-left">{selectedUser.monitor.nome}</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Telefone: </span>
                <span className="text-left">
                  {selectedUser.monitor.telefone}
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">E-mail: </span>
                <span className="text-left">{selectedUser.monitor.email}</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">
                  Grau de Parentesco:
                </span>
                <span className="text-left">
                  {selectedUser.monitor.grauParentesco}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
