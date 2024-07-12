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
import MonitorsList from '../../sections/beneficiaries/actions/monitorsList'
import BeneficiaryLocation from '../../sections/beneficiaries/actions/beneficiaryLocation'

interface Person {
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
    Nome: 'João',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    Nome: 'Maria',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    Nome: 'José',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    Nome: 'Ana',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    Nome: 'Pedro',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    Nome: 'Mariana',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    Nome: 'Carlos',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    Nome: 'Patrícia',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    Nome: 'Fernanda',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    Nome: 'Rafael',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
  {
    Nome: 'João',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    Nome: 'Maria',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    Nome: 'José',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    Nome: 'Ana',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    Nome: 'Pedro',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    Nome: 'Mariana',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    Nome: 'Carlos',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    Nome: 'Patrícia',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    Nome: 'Fernanda',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    Nome: 'Rafael',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
]

export default function Recipient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisibleSection, setIsVisibleSection] = useState('')
  const [visibleItems, setVisibleItems] = useState(8)

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
