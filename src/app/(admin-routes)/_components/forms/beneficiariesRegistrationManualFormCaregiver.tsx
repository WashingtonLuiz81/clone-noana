import Input from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface ManualFormProps {
  handleBack: () => void
}

const formSchema = z.object({
  fullName: z.string().nonempty('Campo obrigatório'),
  cpf: z.string().nonempty('Campo obrigatório'),
  dateOfBirth: z.string().nonempty('Campo obrigatório'),
  phone: z.string().nonempty('Campo obrigatório'),
})

type FormValuesProps = z.infer<typeof formSchema>

export default function BeneficiariesRegistrationManualFormCaregiver({
  handleBack,
}: ManualFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValuesProps) => {
    console.log('Data: ', data)
    handleBack()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Para finalizar, cadastre um cuidador!
      </span>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          <span className="text-base font-semibold text-gray-600">
            1. Cuidador
          </span>

          <div className="flex items-center gap-6 pb-10 border-b-[1px] border-gray-200">
            <div className="flex-1">
              <label htmlFor="fullName">Nome Completo</label>
              <Input
                {...register('fullName')}
                type="text"
                className="w-full mb-1"
              />
              {errors.fullName && (
                <span className="text-red-500">{errors.fullName.message}</span>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="cpf">CPF</label>
              <Input {...register('cpf')} type="text" className="w-full mb-1" />
              {errors.cpf && (
                <span className="text-red-500">{errors.cpf.message}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 pb-10 border-b-[1px] border-gray-200">
            <div className="flex-1">
              <label htmlFor="dateOfBirth">Data de Nascimento</label>
              <Input
                {...register('dateOfBirth')}
                type="date"
                className="w-full mb-1"
              />
              {errors.dateOfBirth && (
                <span className="text-red-500">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="phone">Telefone</label>
              <Input
                {...register('phone')}
                type="text"
                className="w-full mb-1"
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>
          </div>
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
            <span>Finalizar Contrato</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
