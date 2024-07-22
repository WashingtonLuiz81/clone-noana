import { useMemo, useState } from 'react'
import { UserRoundSearchIcon } from 'lucide-react'
import Magnifier from '@/assets/img/magnifier'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import MonitorRegistration from '../../sections/monitor/monitorRegistration'
import { unitTableHeader } from '@/lib/config'
import Table from '../../table'

import MonitorDetails from '../../sections/monitor/actions/monitorDetails'
import { User } from './recipient'
import { DeleteConfirmationModal } from '@/components/modals'
import MonitorEdit from '../../sections/monitor/actions/monitorEdit'

interface Person {
  id: number
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
    id: 1,
    Nome: 'João',
    'Text Label': 'Lorem ipsum',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    id: 2,
    Nome: 'Maria',
    'Text Label': 'Dolor sit amet',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    id: 3,
    Nome: 'José',
    'Text Label': 'Consectetur adipiscing elit',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    id: 4,
    Nome: 'Ana',
    'Text Label': 'Sed do eiusmod',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    id: 5,
    Nome: 'Pedro',
    'Text Label': 'Tempor incididunt',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    id: 6,
    Nome: 'Mariana',
    'Text Label': 'Ut labore et dolore',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    id: 7,
    Nome: 'Carlos',
    'Text Label': 'Excepteur sint occaecat',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    id: 8,
    Nome: 'Patrícia',
    'Text Label': 'Cupidatat non proident',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    id: 9,
    Nome: 'Fernanda',
    'Text Label': 'Sunt in culpa qui',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    id: 10,
    Nome: 'Rafael',
    'Text Label': 'Deserunt mollit anim',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
  {
    id: 11,
    Nome: 'João',
    'Text Label': 'Lorem ipsum',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    id: 12,
    Nome: 'Maria',
    'Text Label': 'Dolor sit amet',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    id: 13,
    Nome: 'José',
    'Text Label': 'Consectetur adipiscing elit',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
  {
    id: 14,
    Nome: 'Ana',
    'Text Label': 'Sed do eiusmod',
    'E-mail': 'ana@example.com',
    Telefone: '(33) 1357-2468',
  },
  {
    id: 15,
    Nome: 'Pedro',
    'Text Label': 'Tempor incididunt',
    'E-mail': 'pedro@example.com',
    Telefone: '(44) 5555-1234',
  },
  {
    id: 16,
    Nome: 'Mariana',
    'Text Label': 'Ut labore et dolore',
    'E-mail': 'mariana@example.com',
    Telefone: '(55) 9876-5432',
  },
  {
    id: 17,
    Nome: 'Carlos',
    'Text Label': 'Excepteur sint occaecat',
    'E-mail': 'carlos@example.com',
    Telefone: '(66) 2222-4444',
  },
  {
    id: 18,
    Nome: 'Patrícia',
    'Text Label': 'Cupidatat non proident',
    'E-mail': 'patricia@example.com',
    Telefone: '(77) 7777-7777',
  },
  {
    id: 19,
    Nome: 'Fernanda',
    'Text Label': 'Sunt in culpa qui',
    'E-mail': 'fernanda@example.com',
    Telefone: '(88) 8888-8888',
  },
  {
    id: 20,
    Nome: 'Rafael',
    'Text Label': 'Deserunt mollit anim',
    'E-mail': 'rafael@example.com',
    Telefone: '(99) 9999-9999',
  },
]

export interface Monitor {
  id: number
  avatar: string
  nome: string
  email: string
  telefone: string
  grauparentesco: string
}

const usuarios: User[] = [
  {
    id: 1,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    nomeCompleto: 'João Silva',
    cpf: '123.456.789-00',
    dataNascimento: '01-01-1990',
    sexo: 'Masculino',
    email: 'joao@example.com',
    ddd: '21',
    telefone: '98765-4321',
    modelo: 'Samsung Galaxy S10',
    imei: '123456789012345',
    grauParentesco: 'Filho',
    address: {
      cep: '12283-865',
      logradouro: 'Rua Benedito Sa de Araujo',
      bairro: 'Parque Residencial Santo André',
      numero: '1002',
      complemento: 'Apartamento 101',
      cidade: 'Caçapava',
      estado: 'São Paulo',
    },
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
      ddd: '21',
      telefone: '91234-5678',
      address: {
        cep: '12283-865',
        logradouro: 'Rua B, 456',
        bairro: 'Parque Residencial Santo André',
        numero: '1002',
        complemento: 'Apartamento 101',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
    monitor: {
      nome: 'Maria Silva',
      ddd: '21',
      telefone: '99876-5432',
      email: 'maria@example.com',
      grauParentesco: 'Irmã',
    },
  },
  {
    id: 2,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    nomeCompleto: 'Ana Souza',
    cpf: '321.654.987-00',
    dataNascimento: '1985-02-15',
    sexo: 'Feminino',
    email: 'joao@example.com',
    ddd: '21',
    telefone: '98765-4321',
    modelo: 'Samsung Galaxy S10',
    imei: '123456789012345',
    grauParentesco: 'Filho',
    address: {
      cep: '12283-865',
      logradouro: 'Rua Benedito Sa de Araujo',
      bairro: 'Parque Residencial Santo André',
      numero: '1002',
      complemento: 'Apartamento 101',
      cidade: 'Caçapava',
      estado: 'São Paulo',
    },
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
      ddd: '21',
      telefone: '(21) 91234-5678',
      address: {
        cep: '12283-865',
        logradouro: 'Rua B, 456',
        bairro: 'Parque Residencial Santo André',
        numero: '1002',
        complemento: 'Apartamento 101',
        cidade: 'São Paulo',
        estado: 'SP',
      },
    },
    monitor: {
      nome: 'Carlos Souza',
      ddd: '21',
      telefone: '99876-5432',
      email: 'carlos@example.com',
      grauParentesco: 'Pai',
    },
  },
]

export default function MasterCaregiver() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisibleSection, setIsVisibleSection] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery])

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
        ></div>

        <div
          id="slideover"
          className={`absolute top-0 right-0 h-full max-w-[888px] w-full bg-gray-100 border transform transition-transform duration-500 ease-in-out ${
            isVisibleSection !== '' ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {isVisibleSection === 'monitor' && (
            <MonitorRegistration closeSection={setIsVisibleSection} />
          )}

          {isVisibleSection === 'view' && (
            <MonitorDetails
              closeSection={setIsVisibleSection}
              selectedUser={selectedUser!}
            />
          )}

          {isVisibleSection === 'edit' && (
            <MonitorEdit
              closeSection={setIsVisibleSection}
              selectedUser={selectedUser!}
            />
          )}
        </div>
      </div>

      <header className="flex items-center justify-between mb-6">
        <div className="flex flex-auto items-center gap-2">
          <UserRoundSearchIcon className="text-primary" />
          <span className="flex-1 text-xl font-semibold text-[#1A1A1A]">
            Cuidadores Mestres
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Magnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

            <Input
              placeholder="Buscar Cuidador"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <Button
            className="flex items-center gap-2 bg-primary text-gray-50 shadow-xl"
            onClick={() => setIsVisibleSection('monitor')}
          >
            <PlusIcon />
            <span className="text-white font-semibold">Adicionar</span>
          </Button>
        </div>
      </header>

      {
        <Table
          showSection={setIsVisibleSection}
          data={filteredData}
          columns={unitTableHeader}
          persona="masterCaregiver"
          onActionClick={handleActionClick}
          openModal={(action) => {
            if (action === 'delete') {
              setOpenDialog(true)
            }
          }}
        />
      }

      {openDialog && (
        <DeleteConfirmationModal
          label="Monitor"
          onClose={() => setOpenDialog(false)}
        />
      )}
    </section>
  )
}
