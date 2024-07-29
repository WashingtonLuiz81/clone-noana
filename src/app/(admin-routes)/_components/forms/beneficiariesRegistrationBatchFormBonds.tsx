import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '../radioGroupLinkedUnit'

interface ManualFormProps {
  handleBack: () => void
}

interface Option {
  id: string
  label: string
}

const formSchema = z.object({
  unitcare: z
    .string()
    .nonempty('Campo obrigatório')
    .nullable()
    .refine((val) => val !== null, {
      message: 'Campo obrigatório',
    }),
})

type FormValuesProps = z.infer<typeof formSchema>

export default function BeneficiariesRegistrationBatchFormBonds({
  handleBack,
}: ManualFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
  })

  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onSubmit = (data: FormValuesProps) => {
    console.log('BondsData: ', data)
  }

  const options: Option[] = [
    { id: 'barigui', label: 'Barigui' },
    { id: 'cajuru', label: 'Cajurú' },
    { id: 'unidade03', label: 'Unidade 03' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Pra finalizar, vincule à uma unidade
      </span>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 pb-10 border-b-[1px] border-gray-200">
          <span className="text-base font-semibold text-gray-600">
            Selecione uma unidade de Cuidado:
          </span>

          <RadioGroup
            options={options}
            name="unitcare"
            selected={selected}
            setSelected={setSelected}
            error={errors.unitcare?.message}
            register={register('unitcare')}
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
            <span>Cadastrar em Lote</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
