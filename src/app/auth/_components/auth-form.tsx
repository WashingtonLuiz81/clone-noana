'use client'
import Image from 'next/image'
import logoNoana from '../../../assets/img/logo-noana.svg'

import LoginForm from '@/components/form/LoginForm'
import ForgotPasswordForm from '@/components/form/ForgotPasswordForm'
import { useState } from 'react'
import FirstAccessForm from '@/components/form/FirstAccessForm'

export function AuthForm() {
  const [showForm, setShowForm] = useState('login')

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4 sm:px-0">
      <div className="w-full max-w-xs md:max-w-md p-6 md:p-10 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <figure className="flex justify-center mb-4">
            <Image src={logoNoana} alt="Logo Noana" width={141} height={29} />
          </figure>

          {showForm === 'login' && (
            <>
              <p className="text-sm sm:text-base text-center font-medium text-gray-400">
                Olá, seja bem-vindo(a)!
              </p>
              <p className="mt-1 text-sm sm:text-base text-center font-medium text-gray-400">
                Insira o acesso que você recebeu por e-mail.
              </p>
            </>
          )}

          {showForm === 'forgot' && (
            <p className="text-sm sm:text-base text-center font-medium text-gray-400">
              Digite o e-mail cadastrado para recuperar sua senha
            </p>
          )}

          {showForm === 'firstAccess' && (
            <p className="text-sm sm:text-base text-center font-medium text-gray-400">
              Esse é o seu primeiro acesso à plataforma, por favor altere a sua
              senha!
            </p>
          )}
        </div>

        {showForm === 'forgot' && (
          <ForgotPasswordForm
            showForm={(value: string) => setShowForm(value)}
          />
        )}
        {showForm === 'login' && (
          <LoginForm showForm={(value: string) => setShowForm(value)} />
        )}

        {showForm === 'firstAccess' && <FirstAccessForm />}
      </div>
    </div>
  )
}
