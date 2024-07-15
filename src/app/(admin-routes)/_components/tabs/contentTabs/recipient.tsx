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
import BeneficiaryLocation from '../../sections/beneficiaries/actions/beneficiaryLocation'
import BeneficiaryDelete from '../../sections/beneficiaries/actions/beneficiaryDelete'
import MonitorsList from '../../sections/beneficiaries/actions/beneficiaryMonitorsList'

interface Dispositivo {
  imei: string
  modelo: string
  bateria: number
  conexao: string
}

interface Contratante {
  cpf: string
  sexo: string
  dataNascimento: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
}

interface Monitor {
  nome: string
  telefone: string
  email: string
  grauParentesco: string
}

export interface User {
  id: number
  avatar: string
  nome: string
  cpf: string
  endereco: string
  dataNascimento: string
  cidade: string
  estado: string
  sexo: string
  telefone: string
  modelo: string
  imei: string
  dispositivo: Dispositivo
  contratante: Contratante
  monitor: Monitor
}

const usuarios: User[] = [
  {
    id: 1,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    nome: 'João Silva',
    cpf: '123.456.789-00',
    endereco: 'Rua A, 123',
    dataNascimento: '01-01-1990',
    cidade: 'São Paulo',
    estado: 'SP',
    sexo: 'Masculino',
    telefone: '(11) 98765-4321',
    modelo: 'Samsung Galaxy S10',
    imei: '123456789012345',
    dispositivo: {
      imei: '123456789012345',
      modelo: 'Modelo A',
      bateria: 80,
      conexao: 'Wi-Fi',
    },
    contratante: {
      cpf: '987.654.321-00',
      sexo: 'Masculino',
      dataNascimento: '05-10-1970',
      telefone: '(11) 91234-5678',
      endereco: 'Rua B, 456',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    monitor: {
      nome: 'Maria Silva',
      telefone: '(11) 99876-5432',
      email: 'maria@example.com',
      grauParentesco: 'Irmã',
    },
  },
  {
    id: 2,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    nome: 'Ana Souza',
    cpf: '321.654.987-00',
    endereco: 'Avenida C, 789',
    dataNascimento: '1985-02-15',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    sexo: 'Feminino',
    telefone: '(21) 98765-4321',
    modelo: 'Samsung Galaxy S10',
    imei: '123456789012345',
    dispositivo: {
      imei: '543216789012345',
      modelo: 'Modelo B',
      bateria: 60,
      conexao: '3G',
    },
    contratante: {
      cpf: '789.456.123-00',
      sexo: 'Feminino',
      dataNascimento: '1965-08-20',
      telefone: '(21) 91234-5678',
      endereco: 'Avenida D, 101',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
    },
    monitor: {
      nome: 'Carlos Souza',
      telefone: '(21) 99876-5432',
      email: 'carlos@example.com',
      grauParentesco: 'Pai',
    },
  },
]

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
        className={`fixed inset-0 z-10 transition-opacity duration-500 ease-in-out ${
          isVisibleSection !== ''
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          id="slideover-bg"
          className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in-out ${
            isVisibleSection !== '' ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsVisibleSection('')}
        ></div>

        <div
          id="slideover"
          className={`absolute top-0 right-0 h-full max-w-[888px] w-full bg-gray-100 border transform transition-transform duration-500 ease-in-out ${
            isVisibleSection !== '' ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {isVisibleSection === 'beneficiaries' && (
            <BeneficiariesRegistration closeSection={setIsVisibleSection} />
          )}

          {isVisibleSection === 'view' && (
            <BeneficiaryDetails selectedUser={selectedUser!} />
          )}
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
