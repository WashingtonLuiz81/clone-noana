'use client'

import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from './FormInput'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const schema = z
  .object({
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

type VisiblePasswordState = {
  currentPassword: boolean
  newPassword: boolean
  confirmNewPassword: boolean
}

export default function FirstAccessForm() {
  const [visiblePassword, setVisiblePassword] = useState<VisiblePasswordState>({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  })
  const [loading, setLoading] = useState(false)
  const [authErrorMessage, setAuthErrorMessage] = useState('')
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
  const router = useRouter()

  const newPassword = useWatch({ control, name: 'newPassword' })
  const confirmNewPassword = useWatch({ control, name: 'confirmNewPassword' })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    console.log('Data: ', newPassword)
    console.log('Data: ', confirmNewPassword)

    // const result = await signIn('credentials', {
    //   currentPassword,
    //   newPassword,
    //   redirect: false,
    // })

    // if (result?.error) {
    //   setAuthErrorMessage('Usuário ou senha inválido')
    //   setLoading(false)
    //   return
    // }

    // router.replace('/dashboard')
  })

  const toggleVisibility = (field: keyof VisiblePasswordState) => {
    setVisiblePassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

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
      <div>
        <div className="mt-1 relative">
          <div className="relative">
            <Input
              placeholder="Senha Atual"
              type={visiblePassword.currentPassword ? 'text' : 'password'}
              className="h-14 rounded-xl"
            />

            {visiblePassword.currentPassword ? (
              <EyeClosedIcon
                className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('currentPassword')}
              />
            ) : (
              <EyeOpenIcon
                className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('currentPassword')}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="mt-1 relative">
          <div className="relative">
            <Input
              placeholder="Nova Senha"
              type={visiblePassword.newPassword ? 'text' : 'password'}
              className="h-14 rounded-xl"
              {...register('newPassword')}
            />

            {visiblePassword.newPassword ? (
              <EyeClosedIcon
                className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('newPassword')}
              />
            ) : (
              <EyeOpenIcon
                className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('newPassword')}
              />
            )}
          </div>
          {errors.newPassword && (
            <p className="text-red-500 mt-2">{errors.newPassword.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="mt-1 relative">
          <div className="relative">
            <Input
              placeholder="Confirmar Nova Senha"
              type={visiblePassword.confirmNewPassword ? 'text' : 'password'}
              className="h-14 rounded-xl"
              {...register('confirmNewPassword')}
            />

            {visiblePassword.confirmNewPassword ? (
              <EyeClosedIcon
                className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('confirmNewPassword')}
              />
            ) : (
              <EyeOpenIcon
                className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
                onClick={() => toggleVisibility('confirmNewPassword')}
              />
            )}
          </div>
          {errors.confirmNewPassword && (
            <p className="text-red-500 mt-2">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={`w-full h-11 text-white bg-primary ${!isValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isValid || loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
        {authErrorMessage && (
          <p className="text-red-500 mt-2">{authErrorMessage}</p>
        )}
      </div>
    </form>
  )
}
