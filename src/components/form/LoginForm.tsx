'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Image from 'next/image'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from './FormInput'
// import { useRouter } from 'next/navigation'

import Facebook from '../../assets/img/ico-facebook.svg'
import Google from '../../assets/img/ico-google.svg'

const schema = z.object({
  username: z.string().nonempty('Usuário é obrigatório'),
  password: z.string().nonempty('Senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

interface LoginFormProps {
  forgotPassword: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function LoginForm({ forgotPassword }: LoginFormProps) {
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
  // const router = useRouter()

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
    console.log('Result: ', result)
    // router.replace('/usuario-mestre')
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
          <div className="relative">
            <Input
              placeholder="Senha"
              type={`${visiblePassword ? 'text' : 'password'}`}
              className="h-14 rounded-xl"
              {...register('password')}
            />

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
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
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

      <span
        className="w-full cursor-pointer block text-center mt-6 text-primary font-semibold size-4"
        onClick={() => forgotPassword(true)}
      >
        Esqueci minha senha
      </span>

      <div className="flex gap-4 items-center justify-center">
        <button
          type="button"
          className="w-28 h-11 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 shadow-md border-1"
        >
          <Image src={Google} alt={''} />
        </button>

        <button
          type="button"
          className="w-28 h-11 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 shadow-md border-1"
        >
          <Image src={Facebook} alt={''} />
        </button>
      </div>
    </form>
  )
}
