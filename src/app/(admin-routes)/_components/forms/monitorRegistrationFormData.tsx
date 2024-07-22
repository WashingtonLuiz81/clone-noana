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

const formSchema = z.object({
  nomeCompleto: z.string().min(1, 'Campo obrigatório'),
  ddd: z.string().min(2, 'Erro').max(2, 'Erro'),
  telefone: z.string().min(10, 'Campo obrigatório'),
  email: z.string().email('Campo obrigatório'),
  grauParentesco: z.string().min(1, 'Campo obrigatório'),
})

type FormValuesProps = z.infer<typeof formSchema>

interface MonitorRegistrationFormDataProps {
  nextStep: () => void
}

export default function MonitorRegistrationFormData({
  nextStep,
}: MonitorRegistrationFormDataProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
  })

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
        Para iniciar, preencha os dados do Beneficiário!
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
              {...register('email')}
              type="text"
              className="w-full mt-3 mb-1"
              label="E-mail*"
              error={errors.email?.message}
            />
          </div>

          <div className="flex-1">
            <Input
              {...register('grauParentesco')}
              type="text"
              className="w-full mt-3 mb-1"
              label="Grau de Parentesco*"
              error={errors.grauParentesco?.message}
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
