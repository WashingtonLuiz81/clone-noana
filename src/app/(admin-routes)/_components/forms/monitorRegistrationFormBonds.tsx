import { useState } from 'react'
import Magnifier from '@/assets/img/magnifier'
import { Input } from '@/components/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MonitorRegistrationManualFormBondsProps {
  handleBack: () => void
}

const users = [
  {
    id: 1,
    name: 'Laís Alves',
    email: 'lais@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 2,
    name: 'Davi Lima',
    email: 'davi@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 3,
    name: 'Ana Silva',
    email: 'ana@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 4,
    name: 'Carlos Santos',
    email: 'carlos@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 5,
    name: 'Mariana Costa',
    email: 'mariana@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 6,
    name: 'Bruno Pereira',
    email: 'bruno@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 7,
    name: 'Gabriela Oliveira',
    email: 'gabriela@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 8,
    name: 'João Fernandes',
    email: 'joao@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 9,
    name: 'Lucas Martins',
    email: 'lucas@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 10,
    name: 'Fernanda Souza',
    email: 'fernanda@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
]

export default function MonitorRegistrationFormBonds({
  handleBack,
}: MonitorRegistrationManualFormBondsProps) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleCheckboxChange = (id: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((userId) => userId !== id)
        : [...prevSelectedUsers, id],
    )
  }

  const onSubmit = () => {
    console.log('Formulário enviado!')
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <form onSubmit={onSubmit}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Vincule à um benificiário!
      </span>

      <div className="py-6 px-8 rounded-xl border bg-gray-50 border-gray-200 shadow-sm">
        <div className="flex flex-col gap-3">
          {selectedUsers.length > 0 && (
            <span className="text-lg font-medium text-gray-400 opacity-40">
              Beneficiários selecionados
            </span>
          )}

          <div className="flex flex-col gap-6">
            {selectedUsers.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {selectedUsers.map((userId) => {
                  const user = users.find((u) => u.id === userId)
                  return (
                    user && (
                      <li
                        key={user.id}
                        className="flex items-center gap-2 rounded-2xl border border-gray-200 p-2 shadow-sm"
                      >
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.charAt(0) +
                              user.name.split(' ')[1].charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <span className="text-sm font-medium text-gray-900">
                          {user.name}
                        </span>

                        <X
                          className="w-5 cursor-pointer text-gray-400"
                          onClick={() => handleCheckboxChange(user.id)}
                        />
                      </li>
                    )
                  )
                })}
              </ul>
            )}

            <div className="relative">
              <Magnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

              <Input
                placeholder="Digite e-mail, nome ou cpf"
                type="text"
                className="border rounded-lg text-sm pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="py-3 pl-4 pr-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <ul className="h-72 flex flex-col gap-4 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <li key={user.id} className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                        className="hidden"
                      />
                      {selectedUsers.includes(user.id) ? (
                        <div className="relative w-5 h-5 bg-primary border rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="relative w-5 h-5 border rounded-full flex items-center justify-center"></div>
                      )}

                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user.avatar} />

                        <AvatarFallback>
                          {user.name.charAt(0) +
                            user.name.split(' ')[1].charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="text-base font-medium text-gray-900">
                          {user.name}
                        </span>
                        <span className="font-medium text-sm text-gray-400 text-opacity-40">
                          {user.email}
                        </span>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 justify-end mt-9">
        <Button
          type="button"
          className="w-36 flex items-center font-semibold text-base space-x-2 bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-100"
          onClick={handleBack}
        >
          <span>Voltar</span>
        </Button>

        <Button
          type="submit"
          className="flex items-center space-x-2 text-white"
        >
          <span>Finalizar Contrato</span>
        </Button>
      </div>
    </form>
  )
}
