import Input from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { useStore } from '@/store/beneficiaryStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertMaskInCpf, insertMaskInPhone } from '@/lib/functions'
import { Check, PlusIcon, TrashIcon, X } from 'lucide-react'
import { useState } from 'react'
import TabList from '../tabs/tabList'
import Magnifier from '@/assets/img/magnifier'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ManualFormProps {
  handleBack: () => void
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

const caregiverSchema = z.object({
  nomeCompleto: z.string().nonempty('Campo obrigatório'),
  cpf: z
    .string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  dataNascimento: z.string().nonempty('Campo obrigatório'),
  telefone: z
    .string()
    .min(10, 'Telefone deve ter no mínimo 10 caracteres')
    .max(10, 'Telefone deve ter no máximo 10 caracteres')
    .regex(/^\d{5}-\d{4}$/, 'Telefone inválido'),
  ddd: z.string().refine((value) => /^\d{2}$/.test(value), {
    message: 'DDD inválido',
  }),
})

const formSchema = z.object({
  caregivers: z.array(caregiverSchema).max(5, 'Máximo de 5 cuidadores'),
})

type FormValuesProps = z.infer<typeof formSchema>

export default function BeneficiariesRegistrationManualFormCaregiver({
  handleBack,
}: ManualFormProps) {
  const { setCaregiverData, clearPayload } = useStore()
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [tabTitle, setTabTitle] = useState('Cadastrar')
  const [searchTerm, setSearchTerm] = useState('')
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caregivers: [
        {
          nomeCompleto: '',
          cpf: '',
          dataNascimento: '',
          telefone: '',
          ddd: '',
        },
      ],
    },
  })

  const handleCheckboxChange = (id: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((userId) => userId !== id)
        : [...prevSelectedUsers, id],
    )
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'caregivers',
  })

  const onSubmit = (data: FormValuesProps) => {
    setCaregiverData(data.caregivers)
    console.log('Data: ', data)

    // Se após chamar a API a resposta for sucesso (200), chamar a função abaixo
    clearPayload()
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = event.target
    const onlyNums = value.replace(/\D/g, '')

    let maskedValue = onlyNums
    if (name.endsWith('cpf')) {
      maskedValue = insertMaskInCpf({ cpf: onlyNums })
    } else if (name.endsWith('telefone')) {
      maskedValue = insertMaskInPhone({ phone: onlyNums })
    }

    const fieldName = name
      .split('.')
      .pop() as keyof FormValuesProps['caregivers'][0]

    if (fieldName) {
      setValue(`caregivers.${index}.${fieldName}`, maskedValue)
    }
  }

  const tabs = ['Cadastrar', 'Vincular']

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 mb-8">
        <span className="text-gray-900 text-xl font-semibold block">
          Para finalizar, cadastre ou vincule um cuidador!
        </span>

        <div className="flex items-center justify-between">
          <div className="rounded-xl border border-gray-200">
            <TabList
              tabs={tabs}
              tabTitle={tabTitle}
              setTabTitle={(title) => setTabTitle(title)}
            />
          </div>

          <Button
            variant={'outline'}
            className="flex items-center gap-2 text-primary"
            onClick={() => {
              if (fields.length < 5)
                append({
                  nomeCompleto: '',
                  cpf: '',
                  dataNascimento: '',
                  telefone: '',
                  ddd: '',
                })
            }}
            disabled={fields.length >= 5}
          >
            <PlusIcon />
            <span>Adicionar Cuidador</span>
          </Button>
        </div>
      </div>

      {tabTitle === 'Cadastrar' && (
        <div className="flex flex-col gap-10">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-8 relative">
              <span className="text-base font-semibold text-gray-600">
                {index + 1}. Cuidador
              </span>

              {index > 0 && (
                <button
                  type="button"
                  className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                  onClick={() => remove(index)}
                >
                  <TrashIcon />
                </button>
              )}

              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <Input
                    {...register(`caregivers.${index}.nomeCompleto`)}
                    type="text"
                    className="w-full mb-1"
                    label="Nome Completo*"
                    error={errors?.caregivers?.[index]?.nomeCompleto?.message}
                  />
                </div>

                <div className="flex-1">
                  <Input
                    {...register(`caregivers.${index}.cpf`)}
                    type="text"
                    className="w-full mb-1"
                    onChange={(e) => handleNumericInputChange(e, index)}
                    maxLength={14}
                    label="CPF*"
                    error={errors?.caregivers?.[index]?.cpf?.message}
                  />
                </div>
              </div>

              <div className="flex items-start gap-6 pb-10">
                <div className="flex-1">
                  <Input
                    {...register(`caregivers.${index}.dataNascimento`)}
                    type="date"
                    className="w-full mb-1"
                    label="Data de Nascimento*"
                    error={errors?.caregivers?.[index]?.dataNascimento?.message}
                  />
                </div>

                <div className="flex-1 flex items-start gap-3">
                  <div className="w-16">
                    <Input
                      {...register(`caregivers.${index}.ddd`, {
                        required: 'Erro',
                        pattern: {
                          value: /^\d{2}$/,
                          message: 'DDD inválido',
                        },
                      })}
                      type="text"
                      className="w-full mt-3 mb-1"
                      maxLength={2}
                      onChange={(e) => handleNumericInputChange(e, index)}
                      label="DDD*"
                      error={errors?.caregivers?.[index]?.ddd?.message}
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      {...register(`caregivers.${index}.telefone`, {
                        required: 'Telefone é obrigatório',
                        pattern: {
                          value: /^\d{5}-\d{4}$/,
                          message: 'Telefone inválido',
                        },
                      })}
                      type="text"
                      className="w-full mt-3 mb-1"
                      maxLength={10}
                      onChange={(e) => handleNumericInputChange(e, index)}
                      label="Telefone*"
                      error={errors?.caregivers?.[index]?.telefone?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tabTitle === 'Vincular' && (
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
      )}

      <div className="flex gap-6 justify-end mt-10">
        <Button
          type="button"
          className="w-36 flex items-center font-semibold text-base space-x-2 bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-100"
          onClick={handleBack}
        >
          <span>Voltar</span>
        </Button>

        <Button
          type="submit"
          className="flex items-center space-x-2 text-white"
        >
          <span>Finalizar Cadastro</span>
        </Button>
      </div>
    </form>
  )
}
