import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import { stateAbbreviations } from '@/lib/config'
import { PersonalInfo } from '../../types/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '@/store/formStore'
import { Input } from '@/components/form'

interface ManualFormProps {
  nextStep: () => void
  handleBack: () => void
}

export interface ExtendedPersonalInfo extends PersonalInfo {
  grauParentesco: string
}

const formSchema = z.object({
  nomeCompleto: z.string().nonempty('Campo obrigatório'),
  cpf: z.string().nonempty('Campo obrigatório'),
  dataNascimento: z.string().nonempty('Campo obrigatório'),
  telefone: z.string().nonempty('Campo obrigatório'),
  cep: z.string().nonempty('Campo obrigatório'),
  logradouro: z.string().nonempty(),
  bairro: z.string().nonempty(),
  cidade: z.string().nonempty(),
  estado: z.string().nonempty(),
  complemento: z.string().optional(),
  grauParentesco: z.string().nonempty('Campo obrigatório'), // Novo campo
})

const BeneficiariesRegistrationManualFormContractor: React.FC<
  ManualFormProps
> = ({ nextStep, handleBack }) => {
  const { payload, setContractorData } = useStore()
  const { contractorData } = payload
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExtendedPersonalInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: contractorData || {},
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
        setAddress({
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: '',
        })
        console.error('CEP não encontrado')
        toast.error('CEP não encontrado')
      }
    } catch (error) {
      console.error('Falha ao buscar endereço pelo CEP:', error)
      toast.error('Falha ao buscar endereço pelo CEP')
    }
  }

  const onSubmit = (data: ExtendedPersonalInfo) => {
    setContractorData(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Agora preecha os dados do Contratante!
      </span>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <Input
              {...register('nomeCompleto', { required: 'Campo obrigatório' })}
              type="text"
              className="w-full mt-3 mb-1"
              label="Nome Completo"
              error={errors?.nomeCompleto?.message}
            />
          </div>

          <div className="flex-1">
            <Input
              {...register('cpf', { required: 'Campo obrigatório' })}
              type="text"
              label="CPF"
              error={errors?.cpf?.message}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <Input
              {...register('dataNascimento', { required: 'Campo obrigatório' })}
              type="date"
              label="Data de Nascimento"
              error={errors?.dataNascimento?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="telefone">Telefone*</label>
            <Input
              {...register('telefone', {
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^\d{9}$/,
                  message: 'Telefone inválido',
                },
              })}
              type="text"
              className="w-full mt-3 mb-1"
              maxLength={9}
              error={errors.telefone?.message}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <Input
              {...register('cep', { required: 'Campo obrigatório' })}
              type="text"
              label="CEP"
              error={errors?.cep?.message}
              onBlur={(e) => handleCEPChange(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <Input
              {...register('logradouro')}
              type="text"
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
              label="Bairro"
              value={address.bairro}
              readOnly
            />
          </div>

          <div className="flex-1 flex items-start  gap-3">
            <div className="w-20">
              <label htmlFor="numero">Número*</label>
              <Input
                {...register('numero', {
                  required: 'Erro',
                })}
                type="text"
                className="w-full mt-3 mb-1"
                error={errors.numero?.message}
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
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <Input
              {...register('cidade')}
              type="text"
              value={address.cidade}
              label="Cidade"
              readOnly
            />
          </div>

          <div className="flex-1">
            <Input
              {...register('estado')}
              type="text"
              value={address.estado}
              label="Estado"
              readOnly
            />
          </div>
        </div>

        <div className="flex-1">
          <Input
            {...register('grauParentesco', { required: 'Campo obrigatório' })}
            type="text"
            label="Grau de Parentesco"
            error={errors?.grauParentesco?.message}
          />
        </div>

        <div className="flex gap-6 justify-end">
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
            <span>Continuar</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}

export default BeneficiariesRegistrationManualFormContractor
