import { Check, X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'
import { Input } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  insertMaskInCep,
  insertMaskInCpf,
  insertMaskInPhone,
} from '@/lib/functions'
import Magnifier from '@/assets/img/magnifier'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useState } from 'react'
import { stateAbbreviations } from '@/lib/config'

const formSchema = z.object({
  nomeCompleto: z.string().nonempty('Campo obrigatório'),
  cpf: z
    .string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  dataNascimento: z.string().nonempty('Campo obrigatório'),
  ddd: z.string().refine((value) => /^\d{2}$/.test(value), {
    message: 'Erro',
  }),
  telefone: z
    .string()
    .min(10, 'Telefone deve ter no mínimo 10 caracteres')
    .max(10, 'Telefone deve ter no máximo 10 caracteres')
    .regex(/^\d{5}-\d{4}$/, 'Telefone inválido'),
  cep: z.string().refine((value) => /^\d{5}-?\d{3}$/.test(value), {
    message: 'CEP inválido',
  }),
  logradouro: z.string(),
  bairro: z.string(),
  numero: z.string().nonempty('Erro'),
  complemento: z.string(),
  cidade: z.string(),
  estado: z.string(),
  unitcare: z.string().nonempty('Selecione uma unidade de cuidado'),
})

type FormValuesProps = z.infer<typeof formSchema>

interface MonitorEditProps {
  selectedUser: User
  closeSection: (isVisible: string) => void
}

const users = [
  {
    id: 1,
    name: 'Laís Alves',
    email: 'lais@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 2,
    name: 'Davi Lima',
    email: 'davi@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 3,
    name: 'Ana Silva',
    email: 'ana@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 4,
    name: 'Carlos Santos',
    email: 'carlos@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 5,
    name: 'Mariana Costa',
    email: 'mariana@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 6,
    name: 'Bruno Pereira',
    email: 'bruno@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 7,
    name: 'Gabriela Oliveira',
    email: 'gabriela@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 8,
    name: 'João Fernandes',
    email: 'joao@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 9,
    name: 'Lucas Martins',
    email: 'lucas@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
  {
    id: 10,
    name: 'Fernanda Souza',
    email: 'fernanda@cork89.com',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Q1bSchycyDfEedz6fT960CJ7UHp_1WJhA&s',
  },
]

export default function SimpleCaregiverEdit({
  closeSection,
  selectedUser,
}: MonitorEditProps) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValuesProps>({
    defaultValues: selectedUser || {},
    resolver: zodResolver(formSchema),
  })

  const handleCheckboxChange = (id: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((userId) => userId !== id)
        : [...prevSelectedUsers, id],
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCEPChange = async (cep: string) => {
    const formattedCEP = cep.replace(/\D/g, '')
    setValue('cep', insertMaskInCep({ cep: formattedCEP }))

    if (formattedCEP.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formattedCEP}/json/`,
        )
        const data = await response.json()

        if (!data.erro) {
          clearErrors('cep')
          setValue('logradouro', data.logradouro || '')
          setValue('bairro', data.bairro || '')
          setValue('cidade', data.localidade || '')
          setValue(
            'estado',
            stateAbbreviations[data.uf as keyof typeof stateAbbreviations] ||
              '',
          )

          setAddress({
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado:
              stateAbbreviations[data.uf as keyof typeof stateAbbreviations] ||
              '',
          })
        } else {
          setValue('logradouro', '')
          setValue('bairro', '')
          setValue('cidade', '')
          setValue('estado', '')
          setError('cep', {
            type: 'manual',
            message: 'CEP não encontrado',
          })
        }
      } catch (error) {
        console.error('Falha ao buscar endereço pelo CEP:', error)
        setError('cep', {
          type: 'manual',
          message: 'Falha ao buscar endereço pelo CEP',
        })
      }
    } else {
      setAddress({
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
      })
    }
  }

  const onSubmit = async () => {
    console.log('Teste')
  }

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    const onlyNums = value.replace(/\D/g, '')

    let maskedValue = onlyNums
    if (name === 'cpf') {
      maskedValue = insertMaskInCpf({ cpf: onlyNums })
    } else if (name === 'telefone') {
      maskedValue = insertMaskInPhone({ phone: onlyNums })
    } else if (name === 'cep') {
      maskedValue = insertMaskInCep({ cep: onlyNums })
    }

    setValue(name as keyof FormValuesProps, maskedValue)
  }

  return (
    <section className="h-screen overflow-y-auto scrollbar-hide">
      <div className="bg-gray-100 p-10">
        <div className="flex justify-between items-center text-gray-900">
          <h1 className="text-2xl font-semibold">Editar Dados</h1>

          <X
            className="cursor-pointer text-gray-900"
            onClick={() => closeSection('')}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-10 pb-10"
      >
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-8"
          defaultValue="item-1"
        >
          <AccordionItem
            value="item-1"
            className="bg-gray-50 px-6 rounded-xl border border-gray-200 shadow"
          >
            <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
              Dados do Cuidador Simples
            </AccordionTrigger>

            <AccordionContent className="mt-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Input
                      {...register('nomeCompleto')}
                      type="text"
                      className="w-full mt-3 mb-1"
                      label="Nome Completo*"
                      error={errors.nomeCompleto?.message}
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      {...register('cpf', {
                        required: 'CPF é obrigatório',
                      })}
                      type="text"
                      className="w-full mt-3 mb-1"
                      onChange={handleNumericInputChange}
                      maxLength={14}
                      label="CPF*"
                      error={errors.cpf?.message}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Input
                      {...register('dataNascimento', {
                        required: 'Data de Nascimento é obrigatória',
                      })}
                      type="date"
                      className="w-full mt-3 mb-1"
                      label="Data de Nascimento*"
                      error={errors.dataNascimento?.message}
                    />
                  </div>

                  <div className="flex-1 flex items-start gap-3">
                    <div className="w-16">
                      <Input
                        {...register('ddd', {
                          required: 'Erro',
                          pattern: {
                            value: /^\d{2}$/,
                            message: 'DDD inválido',
                          },
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        maxLength={2}
                        onChange={handleNumericInputChange}
                        label="DDD*"
                        error={errors.ddd?.message}
                      />
                    </div>

                    <div className="flex-1">
                      <Input
                        {...register('telefone', {
                          required: 'Telefone é obrigatório',
                          pattern: {
                            value: /^\d{5}-\d{4}$/,
                            message: 'Telefone inválido',
                          },
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        maxLength={10}
                        onChange={handleNumericInputChange}
                        label="Telefone*"
                        error={errors.telefone?.message}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Input
                      {...register('cep', {
                        required: 'CEP é obrigatório',
                        pattern: {
                          value: /^\d{5}-?\d{3}$/,
                          message: 'CEP inválido',
                        },
                      })}
                      type="text"
                      className="w-full mt-3 mb-1"
                      onBlur={(e) => handleCEPChange(e.target.value)}
                      onChange={handleNumericInputChange}
                      maxLength={9}
                      label="CEP*"
                      error={errors.cep?.message}
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      {...register('logradouro')}
                      type="text"
                      className={`w-full mt-3 mb-1 ${address.logradouro ? '' : 'readonly-input'}`}
                      value={address.logradouro}
                      label="Endereço"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Input
                      {...register('bairro')}
                      type="text"
                      className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
                      value={address.bairro}
                      label="Bairro"
                      readOnly
                    />
                  </div>

                  <div className="flex-1 flex items-start gap-3">
                    <div className="w-20">
                      <Input
                        {...register('numero', {
                          required: 'Erro',
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        label="Número*"
                        error={errors.numero?.message}
                      />
                    </div>

                    <div className="flex-1">
                      <Input
                        {...register('complemento')}
                        type="text"
                        className="w-full mt-3 mb-1"
                        label="Complemento"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Input
                      {...register('cidade')}
                      type="text"
                      className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
                      value={address.cidade}
                      label="Cidade"
                      readOnly
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      {...register('estado')}
                      type="text"
                      className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
                      value={address.estado}
                      label="Estado"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-gray-50 px-6 rounded-xl border border-gray-200 shadow"
          >
            <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
              Vínculo
            </AccordionTrigger>

            <AccordionContent className="mt-4">
              <div className="py-6 px-8 rounded-xl border bg-gray-50 border-gray-200 shadow-sm">
                <div className="flex flex-col gap-3">
                  {selectedUsers.length > 0 && (
                    <span className="text-lg font-medium text-gray-400 opacity-40">
                      Beneficiários selecionados
                    </span>
                  )}

                  <div className="flex flex-col gap-6">
                    {selectedUsers.length > 0 && (
                      <ul className="flex flex-wrap gap-3">
                        {selectedUsers.map((userId) => {
                          const user = users.find((u) => u.id === userId)
                          return (
                            user && (
                              <li
                                key={user.id}
                                className="flex items-center gap-2 rounded-2xl border border-gray-200 p-2 shadow-sm"
                              >
                                <Avatar className="w-5 h-5">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>
                                    {user.name.charAt(0) +
                                      user.name.split(' ')[1].charAt(0)}
                                  </AvatarFallback>
                                </Avatar>

                                <span className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </span>

                                <X
                                  className="w-5 cursor-pointer text-gray-400"
                                  onClick={() => handleCheckboxChange(user.id)}
                                />
                              </li>
                            )
                          )
                        })}
                      </ul>
                    )}

                    <div className="relative">
                      <Magnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                      <Input
                        placeholder="Digite e-mail, nome ou cpf"
                        type="text"
                        className="border rounded-lg text-sm pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="py-2 pl-4 pr-2 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <ul className="h-72 flex flex-col gap-4 overflow-y-auto">
                        {filteredUsers.map((user) => (
                          <li key={user.id} className="flex items-center gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleCheckboxChange(user.id)}
                                className="hidden"
                              />
                              {selectedUsers.includes(user.id) ? (
                                <div className="relative w-5 h-5 bg-primary border rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              ) : (
                                <div className="relative w-5 h-5 border rounded-full flex items-center justify-center"></div>
                              )}

                              <Avatar className="w-9 h-9">
                                <AvatarImage src={user.avatar} />

                                <AvatarFallback>
                                  {user.name.charAt(0) +
                                    user.name.split(' ')[1].charAt(0)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex flex-col">
                                <span className="text-base font-medium text-gray-900">
                                  {user.name}
                                </span>
                                <span className="font-medium text-sm text-gray-400 text-opacity-40">
                                  {user.email}
                                </span>
                              </div>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-6 justify-end">
          <Button
            type="button"
            className="flex items-center font-semibold text-base space-x-2 bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-100"
            onClick={() => closeSection('')}
          >
            <span>Cancelar</span>
          </Button>

          <Button
            type="submit"
            className="flex items-center space-x-2 text-white"
          >
            <span>Salvar</span>
          </Button>
        </div>
      </form>
    </section>
  )
}
