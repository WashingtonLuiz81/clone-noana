import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'

interface MonitorDetailsProps {
  closeSection: (isVisible: string) => void
  selectedUser: User
}

export default function MonitorDetails({ closeSection }: MonitorDetailsProps) {
  return (
    <>
      <section className="ViewCareUnit absolute right-0 w-full">
        <div className="bg-gray-100 p-10">
          <div className="flex justify-between items-center text-gray-900">
            <h1 className="text-2xl font-semibold">Detalhes do Monitor</h1>
            <X
              className="cursor-pointer text-gray-900 mb-6"
              onClick={() => closeSection('')}
            />
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
                Rodrigo Alves
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 p-0 text-sm">
              <div className="flex gap-9 text-sm font-medium">
                <span className="text-gray-500">Telefone: </span>
                <span className="text-left">11 9876-5643</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="text-gray-500">Email:</span>
                <span className="text-left">rodrigo@gmail.com</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="w-[140px] text-gray-500">
                  Grau de Parentesco
                </span>
                <span className="text-left">Filho</span>
              </div>
              <div className="flex gap-9 text-sm font-medium">
                <span className="text-gray-500">Vínculo:</span>
                <span className="text-left">Laís Alves</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
