'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

import Input from './FormInput'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const form = useForm()

  const router = useRouter()

  const handleSubmit = form.handleSubmit(async (data) => {
    const { username, password } = data

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      console.log('Result Error: ', result)
      return
    }

    router.replace('/dashboard')
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-10">
      <div>
        <div className="mt-1">
          <Input
            placeholder="Usuário"
            className="h-14 rounded-xl"
            {...form.register('username')}
          />
        </div>
      </div>

      <div>
        <div className="mt-1 relative">
          <Input
            placeholder="Senha"
            type={`${visiblePassword ? 'text' : 'password'}`}
            className="h-14 rounded-xl"
            {...form.register('password')}
          />
          {visiblePassword && (
            <EyeClosedIcon
              className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            />
          )}
          {!visiblePassword && (
            <EyeOpenIcon
              className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            />
          )}
        </div>
      </div>

      <div>
        <Button className={`w-full h-11 text-white bg-primary`}>Entrar</Button>
      </div>
    </form>
  )
}
