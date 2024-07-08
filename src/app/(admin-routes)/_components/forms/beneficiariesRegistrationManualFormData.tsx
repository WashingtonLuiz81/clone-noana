import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import { stateAbbreviations } from '@/lib/config'
import { PersonalInfo } from '../../types/types'
import { useStore } from '@/store/formStore'
import * as z from 'zod'
import { Input } from '@/components/form'

const schema = z.object({
  nomeCompleto: z.string().nonempty('Nome Completo é obrigatório'),
  cpf: z.string().refine((value) => isValidCPF(value), {
    message: 'CPF inválido',
  }),
  dataNascimento: z.string().nonempty('Data de Nascimento é obrigatória'),
  telefone: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: 'Telefone inválido',
  }),
  cep: z.string().refine((value) => /^\d{8}$/.test(value), {
    message: 'CEP inválido',
  }),
  logradouro: z.string(),
  bairro: z.string(),
  complemento: z.string(),
  cidade: z.string(),
  estado: z.string(),
})

function isValidCPF(cpf: string): boolean {
  console.log(cpf)

  return true
}

interface ManualFormProps {
  nextStep: () => void
}

const BeneficiariesRegistrationManualFormData: React.FC<ManualFormProps> = ({
  nextStep,
}) => {
  const { payload, setBeneficiaryData } = useStore()
  const { beneficiaryData } = payload

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: beneficiaryData || {},
  })

  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCEPChange = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (!data.erro) {
        setValue('logradouro', data.logradouro || '')
        setValue('bairro', data.bairro || '')
        setValue('cidade', data.localidade || '')
        setValue(
          'estado',
          stateAbbreviations[data.uf as keyof typeof stateAbbreviations] || '',
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
        console.error('CEP não encontrado')
        toast.error('CEP não encontrado')
      }
    } catch (error) {
      console.error('Falha ao buscar endereço pelo CEP:', error)
      toast.error('Falha ao buscar endereço pelo CEP')
    }
  }

  const onSubmit = async (data: PersonalInfo) => {
    try {
      await schema.parseAsync(data) // Validar os dados usando zod
      setBeneficiaryData(data)
      nextStep()
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation errors:', error.errors)
        toast.error('Por favor, preencha o formulário corretamente')
      }
    }
  }

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    const onlyNums = value.replace(/[^0-9]/g, '')
    setValue(name as keyof PersonalInfo, onlyNums)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Para iniciar, preencha os dados do Beneficiário!
      </span>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <Input
              {...register('nomeCompleto', {
                required: 'Nome Completo é obrigatório',
              })}
              type="text"
              className="w-full mt-3 mb-1"
              error={errors.nomeCompleto?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="cpf">CPF</label>
            <Input
              type="text"
              className="w-full mt-3 mb-1"
              {...register('cpf', {
                required: 'CPF é obrigatório',
                pattern: {
                  value: /^\d{11}$/,
                  message: 'CPF inválido',
                },
              })}
              onChange={handleNumericInputChange}
              maxLength={11}
              error={errors.cpf?.message}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <Input
              {...register('dataNascimento', {
                required: 'Data de Nascimento é obrigatória',
              })}
              type="date"
              className="w-full mt-3 mb-1"
              error={errors.dataNascimento?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="telefone">Telefone</label>
            <Input
              {...register('telefone', {
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^\d{11}$/,
                  message: 'Telefone inválido',
                },
              })}
              type="text"
              className="w-full mt-3 mb-1"
              maxLength={11}
              onChange={handleNumericInputChange} // Trata apenas números
              error={errors.telefone?.message}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="cep">CEP</label>
            <Input
              {...register('cep', {
                required: 'CEP é obrigatório',
                pattern: {
                  value: /^\d{8}$/,
                  message: 'CEP inválido',
                },
              })}
              type="text"
              className="w-full mt-3 mb-1"
              onBlur={(e) => handleCEPChange(e.target.value)}
              onChange={handleNumericInputChange} // Trata apenas números
              maxLength={8}
              error={errors.cep?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="logradouro">Endereço</label>
            <Input
              {...register('logradouro')}
              type="text"
              className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
              value={address.logradouro}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="bairro">Bairro</label>
            <Input
              {...register('bairro')}
              type="text"
              className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
              value={address.bairro}
              readOnly
            />
          </div>

          <div className="flex-1">
            <label htmlFor="complemento">Complemento</label>
            <Input
              {...register('complemento')}
              type="text"
              className="w-full mt-3 mb-1"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="cidade">Cidade</label>
            <Input
              {...register('cidade')}
              type="text"
              className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
              value={address.cidade}
              readOnly
            />
          </div>

          <div className="flex-1">
            <label htmlFor="estado">Estado</label>
            <Input
              {...register('estado')}
              type="text"
              className={`w-full mt-3 mb-1 ${address.bairro ? '' : 'readonly-input'}`}
              value={address.estado}
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

export default BeneficiariesRegistrationManualFormData
