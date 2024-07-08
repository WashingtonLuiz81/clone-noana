import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import Image from 'next/image'
import AvatarBeneficiario from '@/assets/img/Avatar-beneficiario.png'
import { PhoneIcon } from 'lucide-react'

export default function CareUnitDetails() {
  return (
    <>
      <section className="ViewCareUnit absolute right-0">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">
              Detalhes da Unidade de Cuidado
            </h1>
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

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold">Beneficiários Vinculados</h3>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gray-100 text-gray-700">
                Ver Todos
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-2.5 shadow-lg shadow-gray-900/10 max-w-50">
                <Image
                  width={20}
                  height={20}
                  src={AvatarBeneficiario}
                  alt="Beneficiário"
                />
                <p className="font-medium">Laís Alves</p>
              </div>
              <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-2.5 shadow-lg shadow-gray-900/10 max-w-50">
                <Image
                  width={20}
                  height={20}
                  src={AvatarBeneficiario}
                  alt="Beneficiário"
                />
                <p className="font-medium">Beatriz Batista</p>
              </div>
              <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-2.5 shadow-lg shadow-gray-900/10 max-w-50">
                <Image
                  width={20}
                  height={20}
                  src={AvatarBeneficiario}
                  alt="Beneficiário"
                />
                <p className="font-medium">Antônio Aguiar</p>
              </div>
              <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-2.5 shadow-lg shadow-gray-900/10 max-w-50">
                <Image
                  width={20}
                  height={20}
                  src={AvatarBeneficiario}
                  alt="Beneficiário"
                />
                <p className="font-medium">Pedro Silva</p>
              </div>
              <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-2.5 shadow-lg shadow-gray-900/10 max-w-50">
                <Image
                  width={20}
                  height={20}
                  src={AvatarBeneficiario}
                  alt="Beneficiário"
                />
                <p className="font-medium">Davi Lima</p>
              </div>
              <div className="flex items-center space-x-2 border border-gray-200 rounded-full p-2.5 shadow-lg shadow-gray-900/10 max-w-50">
                <Image
                  width={20}
                  height={20}
                  src={AvatarBeneficiario}
                  alt="Beneficiário"
                />
                <p className="font-medium">Pedro Silva</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
