import { useMemo, useState } from 'react'
import { UserRoundSearchIcon } from 'lucide-react'
import Magnifier from '@/assets/img/magnifier'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { unitTableHeader } from '@/lib/config'
import Table from '../../table'
import BeneficiariesRegistration from '../../sections/beneficiaries/beneficiariesRegistration'
import BeneficiaryDetails from '../../sections/beneficiaries/actions/beneficiaryDetails'
import BeneficiaryMonitorsList from '../../sections/beneficiaries/actions/beneficiaryMonitorsList'
import BeneficiaryLocation from '../../sections/beneficiaries/actions/beneficiaryLocation'

interface Person {
  id: number
  Nome: string
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
    id: 1,
    Nome: 'João Silva',
    'E-mail': 'joao@example.com',
    Telefone: '(11) 98765-4321',
  },
  {
    id: 2,
    Nome: 'Ana Souza',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    id: 3,
    Nome: 'José',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    id: 4,
    Nome: 'Ana',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    id: 5,
    Nome: 'Pedro',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    id: 6,
    Nome: 'Mariana',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    id: 7,
    Nome: 'Carlos',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    id: 8,
    Nome: 'Patrícia',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    id: 9,
    Nome: 'Fernanda',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    id: 10,
    Nome: 'Rafael',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
  {
    id: 11,
    Nome: 'João',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    id: 12,
    Nome: 'Maria',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    id: 13,
    Nome: 'José',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    id: 14,
    Nome: 'Ana',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    id: 15,
    Nome: 'Pedro',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    id: 16,
    Nome: 'Mariana',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    id: 17,
    Nome: 'Carlos',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    id: 18,
    Nome: 'Patrícia',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    id: 19,
    Nome: 'Fernanda',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    id: 20,
    Nome: 'Rafael',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
]

export default function Recipient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisibleSection, setIsVisibleSection] = useState('')
  const [visibleItems, setVisibleItems] = useState(8)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery])

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 8)
  }

  const handleActionClick = (id: number, action: string) => {
    const selectedUser = usuarios.find((user) => user.id === id)
    if (selectedUser) {
      setSelectedUser(selectedUser)
      setIsVisibleSection(action)
    } else {
      console.error(`Usuário com id ${id} não encontrado.`)
    }
  }

  return (
    <section>
      <div
        id="slideover-container"
        className={`fixed inset-0 z-10 transition-opacity duration-500 ease-in-out ${isVisibleSection !== ''
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          id="slideover-bg"
          className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in-out ${isVisibleSection !== '' ? 'opacity-50' : 'opacity-0'
            }`}
          onClick={() => setIsVisibleSection('')}
        ></div>

        <div
          id="slideover"
          className={`absolute top-0 right-0 h-full max-w-[888px] w-full bg-gray-100 border transform transition-transform duration-500 ease-in-out ${isVisibleSection !== '' ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {isVisibleSection === 'beneficiaries' && (
            <BeneficiariesRegistration closeSection={setIsVisibleSection} />
          )}

          {isVisibleSection === 'view' && <BeneficiaryDetails />}
          {isVisibleSection === 'list' && <MonitorsList />}
          {isVisibleSection === 'map' && <BeneficiaryLocation />}
          {isVisibleSection === 'delete' && <BeneficiaryDelete />}
        </div>
      </div>

      <header className="flex items-center justify-between mb-6">
        <div className="flex flex-auto items-center gap-2">
          <UserRoundSearchIcon className="text-primary" />
          <span className="flex-1 text-xl font-semibold text-[#1A1A1A]">
            Beneficiários
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

          <Button
            className="flex items-center gap-2 bg-primary text-gray-50 shadow-xl"
            onClick={() => setIsVisibleSection('beneficiaries')}
          >
            <PlusIcon />
            <span className="text-white font-semibold">Adicionar</span>
          </Button>
        </div>
      </header>

      <Table
        showSection={setIsVisibleSection}
        data={filteredData.slice(0, visibleItems)}
        columns={unitTableHeader}
        onActionClick={handleActionClick}
      />

      {visibleItems < filteredData.length && (
        <div className="flex justify-start mt-8">
          <Button
            className="bg-gray-100 hover:bg-gray-100 text-gray-900 font-semibold text-base border border-gray-200"
            onClick={handleShowMore}
          >
            Ver mais
          </Button>
        </div>
      )}
    </section>
  )
}
