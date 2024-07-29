import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowRightIcon } from 'lucide-react'
import { Input } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  insertMaskInCep,
  insertMaskInCpf,
  insertMaskInPhone,
} from '@/lib/functions'
import { useState } from 'react'
import { stateAbbreviations } from '@/lib/config'

const schema = z.object({
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
})

type FormValuesProps = z.infer<typeof schema>

interface simpleCaregiverRegistrationFormDataProps {
  nextStep: () => void
}

export default function SimpleCaregiverRegistrationFormData({
  nextStep,
}: simpleCaregiverRegistrationFormDataProps) {
  const {
    handleSubmit,
    setError,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(schema),
  })

  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

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

  const onSubmit = (data: FormValuesProps) => {
    console.log('Data: ', data)
    nextStep()
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Para iniciar, preencha os dados do Cuidador Simples!
      </span>

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

        <div className="flex justify-end">
          <Button
            type="submit"
            className="flex items-center space-x-2 text-white"
          >
            <span>Continuar</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}
