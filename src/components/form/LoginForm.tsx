import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn, getSession } from 'next-auth/react'
import { Session, User } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from './FormInput'
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PasswordInput from './PasswordInput'

const schema = z.object({
  username: z.string().nonempty('Usuário é obrigatório'),
  password: z.string().nonempty('Senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

interface ExtendedUser extends User {
  firstAccess?: boolean
}

interface ExtendedSession extends Session {
  user: ExtendedUser
}

interface LoginFormProps {
  showForm: (value: string) => void
}

export default function LoginForm({ showForm }: LoginFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = form

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)

    const { username, password } = data

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      toast.error('Usuário ou senha inválido')
      setLoading(false)
      return
    }

    const session = (await getSession()) as ExtendedSession
    if (session?.user?.firstAccess) {
      showForm('firstAccess')
    } else {
      router.replace('/usuario-mestre')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
      <div>
        <div className="mt-1">
          <Input
            placeholder="Usuário"
            className={`h-14 rounded-xl outline-none ${errors.username ? 'border border-red-500' : ''}`}
            {...register('username')}
          />
          {errors.username && (
            <p className="text-red-500 mt-2 text-sm font-medium">
              {errors.username.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <PasswordInput
          placeholder="Senha"
          className={`h-14 rounded-xl outline-none ${
            errors.password ? 'border border-red-500' : ''
          }`}
          error={errors.password?.message}
          {...register('password')}
        />
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
      </div>

      <span
        className="w-full cursor-pointer block text-center mt-6 text-primary font-semibold size-4"
        onClick={() => showForm('forgot')}
      >
        Esqueci minha senha
      </span>
    </form>
  )
}
