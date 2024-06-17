'use client'

import Image from 'next/image'
import logoNoana from '../../../assets/img/logo-noana.svg'

import LoginForm from '@/components/form/LoginForm'
import ForgotPasswordForm from '@/components/form/ForgotPasswordForm'
import { useState } from 'react'

export function AuthForm() {
  const [forgotPassword, setForgotPassword] = useState(false) // Corrigido o nome da variável

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4 sm:px-0">
      <div className="w-full max-w-xs md:max-w-md p-6 md:p-10 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <figure className="flex justify-center mb-4">
            <Image src={logoNoana} alt="Logo Noana" width={141} height={29} />
          </figure>

          {!forgotPassword ? (
            <>
              <p className="text-sm sm:text-base text-center font-medium text-gray-400">
                Olá, seja bem-vindo(a)!
              </p>
              <p className="mt-1 text-sm sm:text-base text-center font-medium text-gray-400">
                Insira o acesso que você recebeu por e-mail.
              </p>
            </>
          ) : (
            <p className="text-sm sm:text-base text-center font-medium text-gray-400">
              Digite o e-mail cadastrado para recuperar sua senha
            </p>
          )}
        </div>
        {forgotPassword && (
          <ForgotPasswordForm
            forgotPassword={(
              value: boolean | ((prevState: boolean) => boolean),
            ) => setForgotPassword(value)}
          />
        )}
        {!forgotPassword && (
          <LoginForm
            forgotPassword={(
              value: boolean | ((prevState: boolean) => boolean),
            ) => setForgotPassword(value)}
          />
        )}
      </div>
    </div>
  )
}
