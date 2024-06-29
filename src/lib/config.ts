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

const unitTableHeader: Column<Person>[] = [
  { key: 'Nome', label: 'Nome' },
  { key: 'Text Label', label: 'Text Label' },
  { key: 'E-mail', label: 'E-mail' },
  { key: 'Telefone', label: 'Telefone' },
  { key: 'Ações', label: 'Ações', isAction: true },
]

const unitTableActions = ['view', 'list', 'edit', 'call', 'map', 'trash']
const usersTableActions = ['view', 'edit', 'trash', 'lock']

export { unitTableHeader, unitTableActions, usersTableActions }
