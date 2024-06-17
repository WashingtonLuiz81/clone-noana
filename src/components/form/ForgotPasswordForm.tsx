'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Input from './FormInput'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

interface LoginFormProps {
  forgotPassword: (value: boolean | ((prevState: boolean) => boolean)) => void
}
export default function ForgotPasswordForm({ forgotPassword }: LoginFormProps) {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = form

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const response = await fetch(
      `https://admin.hml.noana.link/v1/password_reset/`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      },
    )

    const responseJson = await response.json()
    console.log('Data: ', responseJson)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
      <div>
        <div className="mt-1">
          <Input
            placeholder="Email"
            className="h-14 rounded-xl"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={`w-full h-11 text-white bg-primary ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isValid}
        >
          Recuperar Senha
        </Button>
      </div>

      <span
        className="w-full cursor-pointer block text-center mt-6 text-primary font-semibold size-4"
        onClick={() => forgotPassword(false)}
      >
        Voltar para o login
      </span>
    </form>
  )
}
