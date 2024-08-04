import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { stateAbbreviations } from '@/lib/config'
import * as z from 'zod'
import { Input } from '@/components/form'
import {
  insertMaskInCep,
  insertMaskInCpf,
  insertMaskInPhone,
} from '@/lib/functions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { X } from 'lucide-react'

const schema = z.object({
  nomeUnidade: z.string().nonempty('Nome da Unidade é obrigatório'),
  email: z.string().nonempty('E-mail é obrigatório').email('E-mail inválido'),
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

interface CareUnitEditProps {
  closeSection: (isVisible: string) => void
}

export default function CareUnitEdit({ closeSection }: CareUnitEditProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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

  const onSubmit = async (data: FormValuesProps) => {
    console.log('Data: ', data)
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
                Dados da Unidade
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                    <div className="flex-1">
                      <Input
                        {...register('nomeUnidade', {
                          required: 'Nome da Unidade é obrigatório',
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        label="Nome da Unidade"
                        error={errors.nomeUnidade?.message}
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
                          label="Telefone de Contato"
                          error={errors.telefone?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                    <div className="flex-1">
                      <Input
                        {...register('email', {
                          required: 'E-mail é obrigatório',
                        })}
                        type="text"
                        className="w-full mt-3 mb-1"
                        label="E-mail"
                        error={errors.email?.message}
                      />
                    </div>

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
                        label="CEP"
                        error={errors.cep?.message}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
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
                          label="Número"
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
                      <span>Cadastrar Unidade</span>
                    </Button>
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
