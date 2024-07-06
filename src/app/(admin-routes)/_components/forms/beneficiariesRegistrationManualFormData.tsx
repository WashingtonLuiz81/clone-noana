import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import { stateAbbreviations } from '@/lib/config'
import { PersonalInfo } from '../../types/types'
import { useStore } from '@/store/formStore'

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

  const formRef = useRef<HTMLFormElement>(null)
  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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

  const onSubmit = (data: PersonalInfo) => {
    setBeneficiaryData(data)
    nextStep()
  }

  const handleNumericInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    // Remove tudo que não for número
    const onlyNums = value.replace(/[^0-9]/g, '')
    setValue(name as keyof PersonalInfo, onlyNums)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Para iniciar, preencha os dados do Beneficiário!
      </span>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <Input
              {...register('nomeCompleto', { required: 'Campo obrigatório' })}
              type="text"
              className="w-full mt-3 mb-1"
            />
            {errors.nomeCompleto && (
              <span className="text-red-500">
                {errors.nomeCompleto.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="cpf">CPF</label>
            <Input
              type="text"
              className="w-full mt-3 mb-1"
              {...register('cpf', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: 'CPF inválido',
                },
              })}
              onChange={handleNumericInputChange} // Trata apenas números
              maxLength={11}
            />
            {errors.cpf && (
              <span className="text-red-500">{errors.cpf.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <Input
              {...register('dataNascimento', { required: 'Campo obrigatório' })}
              type="date"
              className="w-full mt-3 mb-1"
            />
            {errors.dataNascimento && (
              <span className="text-red-500">
                {errors.dataNascimento.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="telefone">Telefone</label>
            <Input
              {...register('telefone', {
                required: 'Campo obrigatório',
                maxLength: {
                  value: 11,
                  message: 'Telefone inválido',
                },
              })}
              type="text"
              className="w-full mt-3 mb-1"
              maxLength={11}
              onChange={handleNumericInputChange} // Trata apenas números
            />
            {errors.telefone && (
              <span className="text-red-500">{errors.telefone.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="cep">CEP</label>
            <Input
              {...register('cep', {
                required: 'Campo obrigatório',
                maxLength: {
                  value: 8,
                  message: 'CEP inválido',
                },
              })}
              type="text"
              className="w-full mt-3 mb-1"
              onBlur={(e) => handleCEPChange(e.target.value)}
              onChange={handleNumericInputChange} // Trata apenas números
              maxLength={8}
            />
            {errors.cep && (
              <span className="text-red-500">{errors.cep.message}</span>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="logradouro">Endereço</label>
            <Input
              {...register('logradouro')}
              type="text"
              className="w-full mt-3 mb-1"
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
              className="w-full mt-3 mb-1"
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
              className="w-full mt-3 mb-1"
              value={address.cidade}
              readOnly
            />
          </div>

          <div className="flex-1">
            <label htmlFor="estado">Estado</label>
            <Input
              {...register('estado')}
              type="text"
              className="w-full mt-3 mb-1"
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
