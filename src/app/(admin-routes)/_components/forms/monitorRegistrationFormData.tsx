import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowRightIcon } from 'lucide-react'
import { Input } from '@/components/form'
import { Button } from '@/components/ui/button'

interface MonitorRegistrationFormDataProps {
  nextStep: () => void
}

// Definindo o esquema de validação com Zod
const formSchema = z.object({
  nomeCompleto: z.string().min(1, 'Nome completo é obrigatório'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  email: z.string().email('Formato de e-mail inválido'),
  grauParentesco: z.string().min(1, 'Grau de parentesco é obrigatório'),
})

type FormValuesProps = z.infer<typeof formSchema>

export default function MonitorRegistrationFormData({
  nextStep,
}: MonitorRegistrationFormDataProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValuesProps) => {
    console.log('Data: ', data)
    nextStep()
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
              {...register('nomeCompleto')}
              type="text"
              className="w-full mt-3 mb-1"
              error={errors.nomeCompleto?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="telefone">Telefone</label>
            <Input
              {...register('telefone')}
              type="text"
              className="w-full mt-3 mb-1"
              error={errors.telefone?.message}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex-1">
            <label htmlFor="email">E-mail</label>
            <Input
              {...register('email')}
              type="text"
              className="w-full mt-3 mb-1"
              error={errors.email?.message}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="grauParentesco">Grau de Parentesco</label>
            <Input
              {...register('grauParentesco')}
              type="text"
              className="w-full mt-3 mb-1"
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
