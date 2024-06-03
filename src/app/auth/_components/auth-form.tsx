import Image from 'next/image'
import logoNoana from '../../../assets/img/logo-noana.svg'

import LoginForm from '@/components/form/LoginForm'

export function AuthForm() {
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

        <LoginForm />
      </div>
    </div>
  )
}
