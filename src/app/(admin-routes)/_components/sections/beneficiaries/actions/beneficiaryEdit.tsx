'use client'

import { FormSelect, Input } from '@/components/form'
import { User } from '../../../tabs/contentTabs/recipient'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { X } from 'lucide-react'
import {
  insertMaskInCep,
  insertMaskInCpf,
  insertMaskInPhone,
} from '@/lib/functions'
import { PersonalInfo } from '@/app/(admin-routes)/types/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { stateAbbreviations } from '@/lib/config'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '../../../radioGroupLinkedUnit'

interface BeneficiaryEditProps {
  selectedUser: User
  closeSection: (isVisible: string) => void
}

interface Option {
  id: string
  label: string
}

const schema = z.object({
  nomeCompleto: z.string().nonempty('Nome Completo é obrigatório'),
  cpf: z
    .string()
    .min(11, 'CPF deve ter no mínimo 11 caracteres')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  dataNascimento: z.string().nonempty('Data de Nascimento é obrigatória'),
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
  dispositiveModel: z.string().nonempty('Campo obrigatório'),
  campoSelect: z.string().nonempty('Campo obrigatório'),
  unitcare: z
    .string()
    .nonempty('Campo obrigatório')
    .nullable()
    .refine((val) => val !== null, {
      message: 'Campo obrigatório',
    }),
})

type FormValuesProps = z.infer<typeof schema>

export default function BeneficiaryEdit({
  selectedUser,
  closeSection,
}: BeneficiaryEditProps) {
  const [address, setAddress] = useState({
    cep: selectedUser.address.cep,
    logradouro: selectedUser.address.logradouro,
    bairro: selectedUser.address.bairro,
    cidade: selectedUser.address.cidade,
    estado: selectedUser.address.estado,
    numero: selectedUser.address.numero,
    complemento: selectedUser.address.complemento,
  })
  const [selected, setSelected] = useState<string>('barigui')

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValuesProps>({
    defaultValues: selectedUser || {},
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: PersonalInfo) => {
    try {
      await schema.parseAsync(data)
      console.log('Data: ', data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation errors:', error.errors)
        error.errors.forEach((e) => {
          setError(e.path[0] as keyof PersonalInfo, {
            type: 'manual',
            message: e.message,
          })
        })
      }
    }
  }

  const options: Option[] = [
    { id: 'barigui', label: 'Barigui' },
    { id: 'cajuru', label: 'Cajurú' },
    { id: 'unidade03', label: 'Unidade 03' },
  ]

  const dispositives = [
    { value: 'opcao1', label: 'Opção 1' },
    { value: 'opcao2', label: 'Opção 2' },
    { value: 'opcao3', label: 'Opção 3' },
  ]

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
            cep: data.cep || '',
            logradouro: data.logradouro || '',
            numero: data.numero || '',
            complemento: data.complemento || '',
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
        ...address,
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      })
    }
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

    setValue(name as keyof PersonalInfo, maskedValue)
  }

  return (
    <section className="h-screen overflow-y-auto scrollbar-hide">
      <div className="bg-gray-100 p-10">
        <div className="flex justify-between items-center text-gray-900 mb-12">
          <h1 className="text-2xl font-semibold">Editar Dados</h1>

          <X
            className="cursor-pointer text-gray-900"
            onClick={() => closeSection('')}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                Dados do Beneficiário
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                    <div className="flex-1">
                      <Input
                        {...register('nomeCompleto', {
                          required: 'Nome Completo é obrigatório',
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        label="Nome Completo"
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
                        label="CPF"
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
                        label="Data de Nascimento"
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
                          label="DDD"
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
                          label="Telefone"
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
                        value={address.cep}
                        label="CEP"
                        error={errors.cep?.message}
                      />
                    </div>

                    <div className="flex-1">
                      <Input
                        {...register('logradouro')}
                        type="text"
                        className={`w-full mt-3 mb-1 ${address.logradouro ? '' : 'readonly-input'}`}
                        value={address.logradouro}
                        label="Logradouro"
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
                          value={address.numero}
                          type="text"
                          className="w-full mt-3 mb-1"
                          label="Número"
                          error={errors.numero?.message}
                        />
                      </div>

                      <div className="flex-1">
                        <Input
                          {...register('complemento')}
                          type="text"
                          className="w-full mt-3 mb-1"
                          value={address.complemento}
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
              value="item-2"
              className="bg-gray-50 px-6 rounded-xl border border-gray-200 shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Unidade Vinculada
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  options={options}
                  name="unitcare"
                  selected={selected}
                  setSelected={setSelected}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-gray-50 px-6 rounded-xl border border-gray-200 shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Dados do Dispositivo
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Controller
                      name="campoSelect"
                      control={control}
                      defaultValue="opcao1"
                      render={({ field }) => (
                        <FormSelect
                          name={field.name}
                          control={control}
                          options={dispositives}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          label="Identificação do dispositivo (MEI)"
                          error={errors?.campoSelect?.message}
                        />
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      {...register('dispositiveModel', {
                        required: 'CPF é obrigatório',
                      })}
                      value={selectedUser.dispositivo.modelo}
                      type="text"
                      className="w-full mt-3 mb-1"
                      label="Modelo"
                      error={errors.dispositiveModel?.message}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-gray-50 px-6 rounded-xl border border-gray-200 shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Dados do Contratante
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                    <div className="flex-1">
                      <Input
                        {...register('nomeCompleto', {
                          required: 'Nome Completo é obrigatório',
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        label="Nome Completo"
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
                        label="CPF"
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
                        label="Data de Nascimento"
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
                          label="DDD"
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
                          label="Telefone"
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
                        value={address.cep}
                        label="CEP"
                        error={errors.cep?.message}
                      />
                    </div>

                    <div className="flex-1">
                      <Input
                        {...register('logradouro')}
                        type="text"
                        className={`w-full mt-3 mb-1 ${address.logradouro ? '' : 'readonly-input'}`}
                        value={address.logradouro}
                        label="Logradouro"
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
                          value={address.numero}
                          type="text"
                          className="w-full mt-3 mb-1"
                          label="Número"
                          error={errors.numero?.message}
                        />
                      </div>

                      <div className="flex-1">
                        <Input
                          {...register('complemento')}
                          type="text"
                          className="w-full mt-3 mb-1"
                          value={address.complemento}
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
          </Accordion>

          <div className="flex gap-6 justify-end mt-8">
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
      </div>
    </section>
  )
}
