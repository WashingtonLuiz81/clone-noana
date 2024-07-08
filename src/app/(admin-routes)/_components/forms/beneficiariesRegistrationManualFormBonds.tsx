import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '@/store/formStore'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { Input, FormSelect } from '@/components/form'
import { RadioGroup } from '../radioGroupLinkedUnit'

interface ManualFormProps {
  handleBack: () => void
  nextStep: () => void
}

interface Option {
  id: string
  label: string
}

const formSchema = z.object({
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

type FormValuesProps = z.infer<typeof formSchema>

export default function BeneficiariesRegistrationManualFormBonds({
  nextStep,
  handleBack,
}: ManualFormProps) {
  const { payload, setBondsData } = useStore()
  const { bondsData } = payload
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
    defaultValues: bondsData || {},
  })

  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (bondsData?.unitcare) {
      setSelected(bondsData.unitcare)
      setValue('unitcare', bondsData.unitcare)
    }
  }, [bondsData, setValue])

  const onSubmit = (data: FormValuesProps) => {
    setBondsData(data)
    nextStep()
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block">
        Vincule o beneficiário à uma unidade e dispositivo
      </span>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          <span className="text-base font-semibold text-gray-600">
            1. Selecione uma unidade de Cuidado:
          </span>

          <RadioGroup
            options={options}
            name="unitcare"
            selected={selected}
            setSelected={setSelected}
            error={errors.unitcare?.message}
            register={register('unitcare', {
              onChange: (e) => setSelected(e.target.value),
            })}
          />
        </div>

        <div className="flex flex-col gap-8">
          <span className="text-base font-semibold text-gray-600">
            2. Vincule um dispositivo
          </span>

          <div className="flex items-start gap-6">
            <div className="flex-1">
              <Controller
                name="campoSelect"
                control={control}
                defaultValue=""
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
                {...register('dispositiveModel')}
                type="text"
                label="Modelo do dispositivo"
                error={errors?.dispositiveModel?.message}
              />
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
            <span>Continuar</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}
