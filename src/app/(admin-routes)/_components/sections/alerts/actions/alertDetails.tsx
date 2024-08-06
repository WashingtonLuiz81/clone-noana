import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PhoneCallModal } from '@/components/modals'
import BatteryLevel from '@/components/batteryLevel'
import { Alert } from '@/lib/config'
import ResolveAlert from '@/components/resolveAlert'
import { X } from 'lucide-react'

interface AlertDetailsProps {
  selectedUser: Alert
  closeSection: (isVisible: string) => void
}

export default function AlertDetails({
  selectedUser,
  closeSection,
}: AlertDetailsProps) {
  const [phoneCallModal, setPhoneCallModal] = useState(false)

  const formattedDateTime = format(
    new Date(selectedUser.alertDateTime),
    "dd/MM/yyyy 'às' HH'h'mm",
    { locale: ptBR },
  )

  const formatDate = (date: string): string => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
  }

  return (
    <>
      <section className="h-screen overflow-y-auto scrollbar-hide">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">Detalhes do Alerta</h1>

            <div className="flex items-center gap-4">
              <X
                className="cursor-pointer text-gray-900"
                onClick={() => closeSection('')}
              />
            </div>
          </div>

          <div className="mt-6">
            <ResolveAlert status={!!selectedUser.isResolved} />
          </div>

          <div className="flex flex-col items-center mb-24 mt-9 relative">
            <div className="flex items-center absolute -bottom-44 justify-center">
              <Avatar className="w-40 h-40">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl pb-9 pt-4 text-center font-semibold">
                {selectedUser.beneficiaryName}
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 text-sm font-medium">
                  <span className="w-[160px] text-gray-500">CPF: </span>
                  <span className="text-left">{selectedUser.cpf}</span>
                </div>

                <div className="flex gap-4 text-sm font-medium">
                  <span className="w-[160px] text-gray-500">
                    Data de Nascimento:
                  </span>
                  <span className="text-left">
                    {formatDate(selectedUser.birthday)}
                  </span>
                </div>

                <div className="flex gap-4 text-sm font-medium">
                  <span className="w-[160px] text-gray-500">Sexo:</span>
                  <span className="text-left">{selectedUser.sex}</span>
                </div>

                <div className="flex gap-4 text-sm font-medium">
                  <span className="w-[160px] text-gray-500">Telefone:</span>
                  <span className="text-left">{selectedUser.telephone}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 text-sm font-medium">
                  <span className="w-[120px] text-gray-500">Endereço: </span>
                  <span className="text-left">{selectedUser.address}</span>
                </div>

                <div className="flex gap-4 text-sm font-medium">
                  <span className="w-[120px] text-gray-500">
                    Cidade / Estado:
                  </span>
                  <span className="text-left">{`${selectedUser.cityState}`}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-base font-semibold text-gray-900">
                Dados do Alerta
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex gap-9 text-sm font-medium">
                  <span className="w-[86px] text-gray-500">Tipo: </span>
                  <span className="text-left">{selectedUser.alertType}</span>
                </div>

                <div className="flex gap-9 text-sm font-medium">
                  <span className="w-[86px] text-gray-500">Data / Hora: </span>
                  <span className="text-left">{formattedDateTime}</span>
                </div>

                <div className="flex gap-9 text-sm font-medium">
                  <span className="w-[86px] text-gray-500">Conexão: </span>
                  <span className="text-left">{selectedUser.connection}</span>
                </div>

                <div className="flex gap-9 text-sm font-medium">
                  <span className="w-[86px] text-gray-500">Bateria: </span>
                  <BatteryLevel value={selectedUser.batteryPercentage} />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex gap-9 text-sm font-medium">
                  <span className="w-[48px] text-gray-500">Status: </span>
                  <span
                    className={`py-0.5 px-3 rounded-2xl text-xs font-medium ${
                      selectedUser.isResolved
                        ? 'text-green-700 bg-green-100'
                        : 'text-red-600 bg-red-100'
                    }`}
                  >
                    {selectedUser.isResolved ? 'Resolvido' : 'Não Resolvido'}
                  </span>
                </div>
              </div>
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
                <span className="w-[114px] text-gray-500">IMEI </span>
                <span className="text-left">{selectedUser.deviceImei}</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[114px] text-gray-500">Modelo </span>
                <span className="text-left">{selectedUser.deviceModel}</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[114px] text-gray-500">Data do Vínculo</span>
                <span className="text-left">
                  {formatDate(selectedUser.bondDate)}
                </span>
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
