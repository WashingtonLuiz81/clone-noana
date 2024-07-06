import Input from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '@/store/formStore'
import { PlusIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ManualFormProps {
  handleBack: () => void
}

const caregiverSchema = z.object({
  nomeCompleto: z.string().nonempty('Campo obrigatório'),
  cpf: z.string().nonempty('Campo obrigatório'),
  dataNascimento: z.string().nonempty('Campo obrigatório'),
  telefone: z.string().nonempty('Campo obrigatório'),
})

const formSchema = z.object({
  caregivers: z.array(caregiverSchema).max(5),
})

type FormValuesProps = z.infer<typeof formSchema>

export default function BeneficiariesRegistrationManualFormCaregiver({
  handleBack,
}: ManualFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { setCaregiverData, clearPayload } = useStore()

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caregivers: [
        { nomeCompleto: '', cpf: '', dataNascimento: '', telefone: '' },
      ],
    },
  })

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const { fields, append } = useFieldArray({
    control,
    name: 'caregivers',
  })

  const onSubmit = (data: FormValuesProps) => {
    setCaregiverData(data.caregivers)
    console.log('Estado atualizado: ', useStore.getState().payload)

    // Se após chamar a API a resposta for sucesso (200), chamar a função abaixo
    clearPayload()
    console.log('Estado Limpo: ', useStore.getState().payload)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className="flex items-center justify-between mb-8">
        <span className="text-gray-900 text-xl font-semibold block">
          Para finalizar, cadastre um cuidador!
        </span>

        <Button
          variant={'outline'}
          className="flex items-center gap-2 text-primary"
          onClick={() =>
            fields.length < 5 &&
            append({
              nomeCompleto: '',
              cpf: '',
              dataNascimento: '',
              telefone: '',
            })
          }
          disabled={fields.length >= 5}
        >
          <PlusIcon />
          <span>Adicionar Cuidador</span>
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-8">
            <span className="text-base font-semibold text-gray-600">
              {index + 1}. Cuidador
            </span>

            <div className="flex items-center gap-6 pb-10 border-b-[1px] border-gray-200">
              <div className="flex-1">
                <label htmlFor={`caregivers[${index}].nomeCompleto`}>
                  Nome Completo
                </label>
                <Input
                  {...register(`caregivers.${index}.nomeCompleto` as const)}
                  type="text"
                  className="w-full mb-1"
                />
                {errors.caregivers?.[index]?.nomeCompleto && (
                  <span className="text-red-500">
                    {errors.caregivers[index]?.nomeCompleto?.message}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor={`caregivers[${index}].cpf`}>CPF</label>
                <Input
                  {...register(`caregivers.${index}.cpf` as const)}
                  type="text"
                  className="w-full mb-1"
                />
                {errors.caregivers?.[index]?.cpf && (
                  <span className="text-red-500">
                    {errors.caregivers[index]?.cpf?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 pb-10 border-b-[1px] border-gray-200">
              <div className="flex-1">
                <label htmlFor={`caregivers[${index}].dataNascimento`}>
                  Data de Nascimento
                </label>
                <Input
                  {...register(`caregivers.${index}.dataNascimento` as const)}
                  type="date"
                  className="w-full mb-1"
                />
                {errors.caregivers?.[index]?.dataNascimento && (
                  <span className="text-red-500">
                    {errors.caregivers[index]?.dataNascimento?.message}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor={`caregivers[${index}].telefone`}>
                  Telefone
                </label>
                <Input
                  {...register(`caregivers.${index}.telefone` as const)}
                  type="text"
                  className="w-full mb-1"
                />
                {errors.caregivers?.[index]?.telefone && (
                  <span className="text-red-500">
                    {errors.caregivers[index]?.telefone?.message}
                  </span>
                )}
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
