'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import logoNoana from '../../../assets/img/logo-noana.svg'

import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import Input from '@/components/form/formInput'

export function AuthForm() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const form = useForm()
  const apiUrl = 'http://18.212.242.65:3000/v1'

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000/',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Autenticação bem-sucedida:', result)
      } else {
        console.error(
          'Erro na autenticação:',
          response.status,
          response.statusText,
        )
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="max-w-md p-10 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <figure className="flex justify-center mb-4">
            <Image src={logoNoana} alt="Logo Noana" width={141} height={29} />
          </figure>

          <p className="text-base text-center font-medium text-gray-400">
            Olá, seja bem-vindo(a)!
          </p>

          <p className="mt-1 text-base text-center font-medium text-gray-400">
            Insira o acesso que você recebeu por e-mail.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
          <div>
            <div className="mt-1">
              <Input
                placeholder="Usuário"
                className="h-14 rounded-xl"
                {...form.register('username')}
              />
              {/* <FormInput
                className="h-14 rounded-xl"
                placeholder="Usuário"
                {...form.register('username')}
              /> */}
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
            <Button className={`w-full h-11 text-white bg-primary`}>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// function EyeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }
