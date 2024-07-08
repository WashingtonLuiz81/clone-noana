import { useMemo, useState } from 'react'
import Magnifier from '@/assets/img/magnifier'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { unitTableHeader } from '@/lib/config'
import Table from '../../table'
import { UserRoundSearchIcon } from 'lucide-react'

interface Person {
  Nome: string
  'Text Label': string
  'E-mail': string
  Telefone: string
}

export interface Column<T> {
  key: keyof T | 'Ações'
  label: string
  isAction?: boolean
}

const data: Person[] = [
  {
    Nome: 'João',
    'Text Label': 'Lorem ipsum',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    Nome: 'Maria',
    'Text Label': 'Dolor sit amet',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    Nome: 'José',
    'Text Label': 'Consectetur adipiscing elit',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    Nome: 'Ana',
    'Text Label': 'Sed do eiusmod',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    Nome: 'Pedro',
    'Text Label': 'Tempor incididunt',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    Nome: 'Mariana',
    'Text Label': 'Ut labore et dolore',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    Nome: 'Carlos',
    'Text Label': 'Excepteur sint occaecat',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    Nome: 'Patrícia',
    'Text Label': 'Cupidatat non proident',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    Nome: 'Fernanda',
    'Text Label': 'Sunt in culpa qui',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    Nome: 'Rafael',
    'Text Label': 'Deserunt mollit anim',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
  {
    Nome: 'João',
    'Text Label': 'Lorem ipsum',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    Nome: 'Maria',
    'Text Label': 'Dolor sit amet',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    Nome: 'José',
    'Text Label': 'Consectetur adipiscing elit',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    Nome: 'Ana',
    'Text Label': 'Sed do eiusmod',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    Nome: 'Pedro',
    'Text Label': 'Tempor incididunt',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    Nome: 'Mariana',
    'Text Label': 'Ut labore et dolore',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    Nome: 'Carlos',
    'Text Label': 'Excepteur sint occaecat',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    Nome: 'Patrícia',
    'Text Label': 'Cupidatat non proident',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    Nome: 'Fernanda',
    'Text Label': 'Sunt in culpa qui',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    Nome: 'Rafael',
    'Text Label': 'Deserunt mollit anim',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
]

export default function SimpleCaregiver() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery])

  return (
    <section>
      <header className="flex items-center justify-between mb-6">
        <div className="flex flex-auto items-center gap-2">
          <UserRoundSearchIcon className="text-primary" />
          <span className="flex-1 text-xl font-semibold text-[#1A1A1A]">
            Cuidadores Simples
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Magnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

            <Input
              placeholder="Buscar Unidade"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <Button className="flex items-center gap-2 bg-primary text-gray-50 shadow-xl">
            <PlusIcon />
            <span className="text-white font-semibold">Adicionar</span>
          </Button>
        </div>
      </header>

      <Table data={filteredData} columns={unitTableHeader} />
    </section>
  )
}
