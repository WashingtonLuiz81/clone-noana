import Input from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { useStore } from '@/store/beneficiaryStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { insertMaskInCpf, insertMaskInPhone } from '@/lib/functions'
import { PlusIcon, TrashIcon } from 'lucide-react'

interface ManualFormProps {
  handleBack: () => void
}

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'caregivers',
  })

  const onSubmit = (data: FormValuesProps) => {
    setCaregiverData(data.caregivers)

    // Se após chamar a API a resposta for sucesso (200), chamar a função abaixo
    clearPayload()
  }

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between mb-8">
        <span className="text-gray-900 text-xl font-semibold block">
          Para finalizar, cadastre um cuidador!
        </span>

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
            <span>Finalizar Contrato</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
