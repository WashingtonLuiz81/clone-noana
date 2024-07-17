interface InsertMaskInCpfProps {
  cpf: string
}

interface insertMaskInPhoneProps {
  phone: string
}

interface insertMaskInCepProps {
  cep: string
}

function insertMaskInCpf({ cpf }: InsertMaskInCpfProps) {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function insertMaskInPhone({ phone }: insertMaskInPhoneProps) {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function insertMaskInCep({ cep }: insertMaskInCepProps) {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}

export { insertMaskInCpf, insertMaskInPhone, insertMaskInCep }
