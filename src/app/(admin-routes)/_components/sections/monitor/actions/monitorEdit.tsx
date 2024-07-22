import { X } from 'lucide-react'
import { User } from '../../../tabs/contentTabs/recipient'
import { Input } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

interface MonitorEditProps {
  selectedUser: User
  closeSection: (isVisible: string) => void
}

export default function MonitorEdit({
  closeSection,
  selectedUser,
}: MonitorEditProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValuesProps>({
    defaultValues: selectedUser || {},
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async () => {
    console.log('Teste')
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
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-10">
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
              Dados do Monitor
            </AccordionTrigger>

            <AccordionContent className="mt-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <div className="flex-1">
                    <Input
                      {...register('nomeCompleto')}
                      type="text"
                      className="w-full mt-3 mb-1"
                      label="Nome Completo*"
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
    </section>
  )
}
