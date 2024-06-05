'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from './FormInput'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().nonempty('Usuário é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
  const [visiblePassword, setVisiblePassword] = useState(false)
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
  } = form
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    const { username, password } = data

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      setAuthErrorMessage('Usuário ou senha inválido')
      setLoading(false)
      return
    }

    router.replace('/dashboard')
  })

  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-10">
      <div>
        <div className="mt-1">
          <Input
            placeholder="Usuário"
            className="h-14 rounded-xl"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="mt-1 relative">
          <Input
            placeholder="Senha"
            type={`${visiblePassword ? 'text' : 'password'}`}
            className="h-14 rounded-xl"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {visiblePassword ? (
            <EyeClosedIcon
              className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            />
          ) : (
            <EyeOpenIcon
              className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            />
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
        {authErrorMessage && <p className="text-red-500">{authErrorMessage}</p>}
      </div>
    </form>
  )
}
