import { useMemo, useState } from 'react'
import { Bell } from 'lucide-react'
import Magnifier from '@/assets/img/magnifier'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, alertTableHeader } from '@/lib/config'
import Table from '../../table'
import { PhoneCallModal, ResolveAlertModal } from '@/components/modals'
import AlertLocation from '../../sections/alerts/actions/alertLocation'
import AlertDetails from '../../sections/alerts/actions/alertDetails'

const alerts: Alert[] = [
  {
    id: 1,
    beneficiaryName: 'Maria Silva',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-04T18:30:00Z',
    connection: 'Conectado',
    batteryPercentage: 90,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '123.456.789-00',
    birthday: '1950-06-15',
    sex: 'Feminino',
    telephone: 11987654321,
    address: 'Rua das Flores, 123',
    cityState: 'São Paulo - SP',
    deviceModel: 'Modelo A',
    deviceImei: '123456789012345',
    bondDate: '2024-01-15',
  },
  {
    id: 2,
    beneficiaryName: 'João Pereira',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-04T19:00:00Z',
    connection: 'Desconectado',
    batteryPercentage: 75,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '987.654.321-00',
    birthday: '1948-12-22',
    sex: 'Masculino',
    telephone: 21912345678,
    address: 'Av. Brasil, 456',
    cityState: 'Rio de Janeiro - RJ',
    deviceModel: 'Modelo B',
    deviceImei: '987654321098765',
    bondDate: '2023-11-20',
  },
  {
    id: 3,
    beneficiaryName: 'Ana Oliveira',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-04T20:00:00Z',
    connection: 'Conectado',
    batteryPercentage: 60,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '234.567.890-11',
    birthday: '1965-03-10',
    sex: 'Feminino',
    telephone: 31987654321,
    address: 'Praça da República, 789',
    cityState: 'Belo Horizonte - MG',
    deviceModel: 'Modelo C',
    deviceImei: '234567890123456',
    bondDate: '2023-09-05',
  },
  {
    id: 4,
    beneficiaryName: 'Carlos Souza',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-04T20:30:00Z',
    connection: 'Conectado',
    batteryPercentage: 85,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '345.678.901-22',
    birthday: '1970-07-25',
    sex: 'Masculino',
    telephone: 11976543210,
    address: 'Rua da Paz, 101',
    cityState: 'São Paulo - SP',
    deviceModel: 'Modelo D',
    deviceImei: '345678901234567',
    bondDate: '2024-02-10',
  },
  {
    id: 5,
    beneficiaryName: 'Paula Costa',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-04T21:00:00Z',
    connection: 'Desconectado',
    batteryPercentage: 55,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '456.789.012-33',
    birthday: '1980-08-30',
    sex: 'Feminino',
    telephone: 41987654321,
    address: 'Av. das Américas, 202',
    cityState: 'Curitiba - PR',
    deviceModel: 'Modelo E',
    deviceImei: '456789012345678',
    bondDate: '2023-12-15',
  },
  {
    id: 6,
    beneficiaryName: 'Ricardo Lima',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-04T21:30:00Z',
    connection: 'Conectado',
    batteryPercentage: 10,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '567.890.123-44',
    birthday: '1992-05-20',
    sex: 'Masculino',
    telephone: 31987654321,
    address: 'Rua das Palmeiras, 303',
    cityState: 'Belo Horizonte - MG',
    deviceModel: 'Modelo F',
    deviceImei: '567890123456789',
    bondDate: '2023-11-01',
  },
  {
    id: 7,
    beneficiaryName: 'Fernanda Rocha',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-04T22:00:00Z',
    connection: 'Conectado',
    batteryPercentage: 95,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '678.901.234-55',
    birthday: '1975-04-14',
    sex: 'Feminino',
    telephone: 11976543210,
    address: 'Rua das Rosas, 404',
    cityState: 'São Paulo - SP',
    deviceModel: 'Modelo G',
    deviceImei: '678901234567890',
    bondDate: '2024-03-25',
  },
  {
    id: 8,
    beneficiaryName: 'Gustavo Fernandes',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-04T22:30:00Z',
    connection: 'Desconectado',
    batteryPercentage: 40,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '789.012.345-66',
    birthday: '1985-09-05',
    sex: 'Masculino',
    telephone: 21976543210,
    address: 'Av. Central, 505',
    cityState: 'Rio de Janeiro - RJ',
    deviceModel: 'Modelo H',
    deviceImei: '789012345678901',
    bondDate: '2024-01-10',
  },
  {
    id: 9,
    beneficiaryName: 'Mariana Silva',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-04T23:00:00Z',
    connection: 'Conectado',
    batteryPercentage: 15,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '890.123.456-77',
    birthday: '1960-11-12',
    sex: 'Feminino',
    telephone: 31976543210,
    address: 'Rua do Sol, 606',
    cityState: 'Curitiba - PR',
    deviceModel: 'Modelo I',
    deviceImei: '890123456789012',
    bondDate: '2024-04-05',
  },
  {
    id: 10,
    beneficiaryName: 'Roberto Carvalho',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-04T23:30:00Z',
    connection: 'Desconectado',
    batteryPercentage: 40,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '901.234.567-88',
    birthday: '1990-12-01',
    sex: 'Masculino',
    telephone: 11987654321,
    address: 'Rua da Alegria, 707',
    cityState: 'São Paulo - SP',
    deviceModel: 'Modelo J',
    deviceImei: '901234567890123',
    bondDate: '2024-02-20',
  },
  {
    id: 11,
    beneficiaryName: 'Bruna Almeida',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-05T00:00:00Z',
    connection: 'Conectado',
    batteryPercentage: 70,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '012.345.678-99',
    birthday: '1988-02-14',
    sex: 'Feminino',
    telephone: 41976543210,
    address: 'Av. da Liberdade, 808',
    cityState: 'Curitiba - PR',
    deviceModel: 'Modelo K',
    deviceImei: '012345678901234',
    bondDate: '2024-05-30',
  },
  {
    id: 12,
    beneficiaryName: 'Tiago Martins',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-05T00:30:00Z',
    connection: 'Conectado',
    batteryPercentage: 25,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '123.456.789-01',
    birthday: '1977-07-20',
    sex: 'Masculino',
    telephone: 31987654321,
    address: 'Rua das Árvores, 909',
    cityState: 'Belo Horizonte - MG',
    deviceModel: 'Modelo L',
    deviceImei: '123456789012345',
    bondDate: '2024-06-15',
  },
  {
    id: 13,
    beneficiaryName: 'Célia Costa',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-05T01:00:00Z',
    connection: 'Desconectado',
    batteryPercentage: 80,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '234.567.890-12',
    birthday: '1955-05-25',
    sex: 'Feminino',
    telephone: 11987654321,
    address: 'Rua do Comércio, 1010',
    cityState: 'São Paulo - SP',
    deviceModel: 'Modelo M',
    deviceImei: '234567890123456',
    bondDate: '2023-10-05',
  },
  {
    id: 14,
    beneficiaryName: 'Jorge Silva',
    alertType: 'Botão SOS',
    alertDateTime: '2024-08-05T01:30:00Z',
    connection: 'Conectado',
    batteryPercentage: 35,
    isResolved: true,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '345.678.901-23',
    birthday: '1991-10-10',
    sex: 'Masculino',
    telephone: 21976543210,
    address: 'Rua da Vitória, 1212',
    cityState: 'Rio de Janeiro - RJ',
    deviceModel: 'Modelo N',
    deviceImei: '345678901234567',
    bondDate: '2024-03-10',
  },
  {
    id: 15,
    beneficiaryName: 'Luciana Ferreira',
    alertType: 'Queda Detectada',
    alertDateTime: '2024-08-05T02:00:00Z',
    connection: 'Conectado',
    batteryPercentage: 50,
    isResolved: false,
    avatar:
      'https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg',
    cpf: '456.789.012-34',
    birthday: '1982-09-09',
    sex: 'Feminino',
    telephone: 11976543210,
    address: 'Rua da Amizade, 1313',
    cityState: 'São Paulo - SP',
    deviceModel: 'Modelo O',
    deviceImei: '456789012345678',
    bondDate: '2024-07-05',
  },
]

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisibleSection, setIsVisibleSection] = useState('')
  const [visibleItems, setVisibleItems] = useState(8)
  const [selectedUser, setSelectedUser] = useState<Alert | null>(null)
  const [openDialog, setOpenDialog] = useState({
    phoneCall: false,
    alert: false,
  })

  const filteredData = useMemo(() => {
    const filtered = alerts.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )

    return filtered.sort((a, b) => Number(a.isResolved) - Number(b.isResolved))
  }, [searchQuery])

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 8)
  }

  const handleActionClick = (id: number, action: string) => {
    const selectedUser = alerts.find((alert) => alert.id === id)

    if (selectedUser) {
      setSelectedUser(selectedUser)
      setIsVisibleSection(action)
    } else {
      console.error(`Alerta com id ${id} não encontrado.`)
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
          {isVisibleSection === 'fileText' && (
            <AlertDetails
              closeSection={setIsVisibleSection}
              selectedUser={selectedUser!}
            />
          )}

          {isVisibleSection === 'map' && (
            <AlertLocation closeSection={setIsVisibleSection} />
          )}
        </div>
      </div>

      <header className="flex items-center justify-between mb-6">
        <div className="flex flex-auto items-center gap-2">
          <Bell className="text-primary" />
          <span className="flex-1 text-xl font-semibold text-[#1A1A1A]">
            Últimos Alertas
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Magnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

            <Input
              placeholder="Buscar"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </header>

      <Table
        isAlert
        showSection={setIsVisibleSection}
        data={filteredData.slice(0, visibleItems)}
        columns={alertTableHeader}
        onActionClick={handleActionClick}
        persona="alerts"
        openModal={(action) => {
          if (action === 'call') {
            setOpenDialog((prevState) => ({
              ...prevState,
              phoneCall: true,
            }))
            return
          }

          if (action === 'alert') {
            setOpenDialog((prevState) => ({
              ...prevState,
              alert: true,
            }))
          }
        }}
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

      {openDialog.alert && (
        <ResolveAlertModal
          onClose={() =>
            setOpenDialog((prevState) => ({
              ...prevState,
              alert: false,
            }))
          }
        />
      )}

      {openDialog.phoneCall && (
        <PhoneCallModal
          onClose={() =>
            setOpenDialog((prevState) => ({
              ...prevState,
              phoneCall: false,
            }))
          }
        />
      )}
    </section>
  )
}
