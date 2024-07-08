import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'

import { PhoneIcon } from 'lucide-react'

export default function BeneficiaryDetails() {
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
              <Avatar className="w-164 h-164">
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s" />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Card className="flex flex-col bg-white rounded-2xl shadow-md text-gray-900 p-8 mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl pb-10 pt-16 text-center font-semibold">
                Laís Alves
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

          <Card className="flex flex-col gap-7 bg-white rounded-2xl shadow-md p-8 mb-4">
            <CardHeader className="p-0">
              <CardTitle className="flex text-base font-semibold text-gray-900">
                Dados do Dispositivo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm p-0">
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">IMEI: </span>
                <span className="text-left">6353527222245</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">Modelo: </span>
                <span className="text-left">Modelo do Relógio</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">Bateria: </span>
                <span className="text-left">
                  <Progress value={7} className="w-full" />
                  <span className="">7%</span>
                </span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[60px] text-gray-500">Conexão: </span>
                <span className="text-left">Conectado</span>
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
                <span className="text-left">102.335.678-78</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Sexo: </span>
                <span className="text-left">Feminino</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="text-gray-500">Data de Nascimento:</span>
                <span className="text-left">10/07/1961</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Telefone: </span>
                <span className="text-left">11 9876-5643</span>
              </div>
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Endereço: </span>
                <span className="text-left">Joaquim Sale, 876 - Morumbi</span>
              </div>
              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">
                  Cidade / Estado:
                </span>
                <span className="text-left">São Paulo / SP</span>
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
                <span className="text-left">Rodrigo Alves</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">Telefone: </span>
                <span className="text-left">11 98765-9836</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">E-mail: </span>
                <span className="text-left">rodrigoalves@gmail.com</span>
              </div>

              <div className="flex gap-9 text-sm font-medium text-gray-900">
                <span className="w-[150px] text-gray-500">
                  Grau de Parentesco:
                </span>
                <span className="text-left">Filho</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
