'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Input from './FormInput'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordFormProps {
  showForm: (value: string) => void
}

interface MsgProps {
  email: string
}
const Msg: React.FC<MsgProps> = ({ email }) => {
  return (
    <div>
      Se o e-mail <strong>{email}</strong> estiver registrado, você receberá
      instruções para redefinir sua senha. Caso nao receba, verifique o e-mail
      digitado e tente novamente.
    </div>
  )
}

export default function ForgotPasswordForm({
  showForm,
}: ForgotPasswordFormProps) {
  const [loading, setLoading] = useState(false)
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
    setLoading(true)

    const response = await fetch('/api/password_reset/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    const responseJson = await response.json()

    if (!responseJson.status) {
      setLoading(false)
      toast.success(<Msg email={data.email} />)
      return
    }

    setLoading(false)
    toast.success(<Msg email={data.email} />)
    showForm('login')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
      <div>
        <div className="mt-1">
          <Input
            placeholder="Email"
            className={`h-14 rounded-xl ${errors.email && 'border border-red-500 focus-visible:outline-none focus:outline-none focus:ring focus:border-red-500'}`}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 mt-2 text-sm font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={`w-full h-11 text-white bg-primary ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isValid || loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Carregando...' : 'Recuperar Senha'}
        </Button>
      </div>

      <span
        className="w-full cursor-pointer block text-center mt-6 text-primary font-semibold size-4"
        onClick={() => showForm('login')}
      >
        Voltar para o login
      </span>
    </form>
  )
}
