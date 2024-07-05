import Input from '@/components/form/FormInput'
import FormSelect from '@/components/form/formSelect'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface ManualFormProps {
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
}: ManualFormProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValuesProps>({
    resolver: zodResolver(formSchema),
  })

  const [selected, setSelected] = useState<string>('')

  const onSubmit = (data: FormValuesProps) => {
    console.log('Data: ', data)
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

          <div className="pb-10 border-b-[1px] border-gray-200">
            <ul className="flex items-center gap-4">
              {options.map((option) => (
                <li
                  key={option.id}
                  className={`w-32 bg-white p-4 rounded-xl border-[1px] ${
                    selected === option.id
                      ? 'border-primary text-primary'
                      : 'border-gray-200 text-gray-900'
                  }`}
                >
                  <input
                    type="radio"
                    id={option.id}
                    {...register('unitcare', {
                      onChange: (e) => setSelected(e.target.value),
                    })}
                    value={option.id}
                    checked={selected === option.id}
                    className="hidden"
                  />
                  <label
                    htmlFor={option.id}
                    className="flex flex-col gap-6 cursor-pointer"
                  >
                    <span
                      className={`w-5 h-5 block rounded-full shadow border ${
                        selected === option.id
                          ? 'bg-white border-primary border-[5px]'
                          : 'bg-gray-100 border-[rgba(26,26,26,0.1)]'
                      } shadow`}
                    ></span>
                    <span className="text-base font-medium">
                      {option.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {errors.unitcare && (
              <span className="text-red-500">{errors.unitcare.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="text-base font-semibold text-gray-600">
            2. Vincule um dispositivo
          </span>

          <div className="flex items-center gap-6 pb-10 border-b-[1px] border-gray-200">
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
                    label="Selecione uma opção"
                  />
                )}
              />
              {errors.campoSelect && (
                <span className="text-red-500">
                  {errors.campoSelect.message}
                </span>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="dispositiveModel">Modelo do dispositivo</label>
              <Input
                {...register('dispositiveModel')}
                type="text"
                className="w-full mb-1"
              />
              {errors.dispositiveModel && (
                <span className="text-red-500">
                  {errors.dispositiveModel.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="flex items-center gap-3 text-white bg-primary"
          >
            <span>Continuar</span>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </form>
  )
}
