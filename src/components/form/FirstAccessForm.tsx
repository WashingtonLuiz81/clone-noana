'use client'

import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/form'
import { getSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'

type CustomSession = Session & {
  user?: {
    idToken?: string
  }
}

const schema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(3, 'Nova senha deve ter no mínimo 3 caracteres'),
    confirmNewPassword: z
      .string()
      .min(3, 'Confirmar nova senha deve ter no mínimo 3 caracteres'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'A nova senha e a confirmação da nova senha devem ser iguais',
    path: ['confirmNewPassword'],
  })

type FormData = z.infer<typeof schema>

export default function FirstAccessForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [authErrorMessage] = useState('')
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
    setError,
    clearErrors,
  } = form

  const newPassword = useWatch({ control, name: 'newPassword' })
  const confirmNewPassword = useWatch({ control, name: 'confirmNewPassword' })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const session: CustomSession | null = await getSession()

    if (!session?.user?.idToken) {
      toast.error('Sessão inválida. Por favor, faça login novamente.')
      return
    }

    const response = await fetch('/api/change_password/', {
      method: 'POST',
      body: JSON.stringify({
        old_password: data.currentPassword,
        new_password: data.newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.idToken}`,
      },
    })

    const responseJson = await response.json()

    if (responseJson.error) {
      setLoading(false)
      toast.error('A senha atual está incorreta')
      return
    }

    toast.success('Senha alterada com sucesso!')
    setTimeout(() => {
      router.replace('/usuario-mestre')
    }, 4000)
  })

  useEffect(() => {
    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      setError('confirmNewPassword', {
        type: 'manual',
        message: 'A nova senha e a confirmação da nova senha devem ser iguais',
      })
    } else {
      clearErrors('confirmNewPassword')
    }
  }, [newPassword, confirmNewPassword, setError, clearErrors])

  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-10">
      <div className="mt-1 relative">
        <div className="relative">
          <PasswordInput
            placeholder="Senha Atual"
            error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />
        </div>
      </div>

      <div className="mt-1 relative">
        <div className="relative">
          <PasswordInput
            placeholder="Nova Senha"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
        </div>
      </div>

      <div className="mt-1 relative">
        <div className="relative">
          <PasswordInput
            placeholder="Confirmar Nova Senha"
            error={errors.confirmNewPassword?.message}
            {...register('confirmNewPassword')}
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={`w-full h-11 text-white bg-primary ${!isValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isValid || loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Carregando...' : 'Salvar'}
        </Button>
        {authErrorMessage && (
          <p className="text-red-500 mt-2">{authErrorMessage}</p>
        )}
      </div>
    </form>
  )
}
