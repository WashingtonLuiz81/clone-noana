export interface PersonalInfo {
  nomeCompleto: string
  cpf: string
  dataNascimento: string
  telefone: string
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
  complemento?: string
}

export interface PersonalContractor extends PersonalInfo {
  grauParentesco: string
}

export interface PersonalCaregiver
  extends Pick<
    PersonalInfo,
    'nomeCompleto' | 'cpf' | 'dataNascimento' | 'telefone'
  > {}

export interface UnitBond {
  dispositiveModel: string
  campoSelect: string
  unitcare: string | null
}
