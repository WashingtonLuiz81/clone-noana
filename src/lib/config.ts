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

const unitTableHeader: Column<Person>[] = [
  { key: 'Nome', label: 'Nome' },
  { key: 'E-mail', label: 'E-mail' },
  { key: 'Telefone', label: 'Telefone' },
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

export {
  unitTableHeader,
  unitTableActions,
  usersTableActions,
  stateAbbreviations,
}
