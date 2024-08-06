interface Person {
  Nome: string
  'E-mail': string
  Telefone: string
}

export interface Alert {
  id: number
  beneficiaryName: string
  alertType: string
  alertDateTime: string
  connection: string
  batteryPercentage: number
  isResolved: boolean
  avatar: string
  cpf: string
  birthday: string
  sex: string
  telephone: number
  address: string
  cityState: string
  deviceModel: string
  deviceImei: string
  bondDate: string
}

export interface Column<T> {
  key: keyof T | 'Ações'
  label: string
  isAction?: boolean
}

const unitTableHeader: Column<Person>[] = [
  { key: 'Nome', label: 'Nome' },
  { key: 'E-mail', label: 'E-mail' },
  { key: 'Telefone', label: 'Telefone' },
  { key: 'Ações', label: 'Ações', isAction: true },
]

const alertTableHeader: Column<Alert>[] = [
  { key: 'beneficiaryName', label: 'Beneficiário' },
  { key: 'alertType', label: 'Alerta' },
  { key: 'alertDateTime', label: 'Data-Hora' },
  { key: 'connection', label: 'Conexão' },
  { key: 'batteryPercentage', label: 'Bateria' },
  { key: 'Ações', label: 'Ações', isAction: true },
]

const stateAbbreviations: Record<string, string> = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
}

const unitTableActions = ['view', 'list', 'edit', 'call', 'map', 'trash']
const usersTableActions = ['view', 'edit', 'trash', 'lock']
const monitorTableActions = ['view', 'edit', 'trash']
const alertsTableActions = ['fileText', 'alert', 'call', 'map']

export {
  unitTableHeader,
  alertTableHeader,
  unitTableActions,
  usersTableActions,
  monitorTableActions,
  stateAbbreviations,
  alertsTableActions,
}
