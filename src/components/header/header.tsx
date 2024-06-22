import React from 'react'
import Image from 'next/image'
import logoNoana from '../../assets/img/logo-noana-white.svg'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfileMenu from './profileMenu'
import Notification from './notification'

const Header: React.FC = async () => {
  const session = await getServerSession(nextAuthOptions)

  if (!session?.user) {
    return (
      <header className="h-16 bg-purple-800 text-white">
        <div className="h-16 flex items-center gap-8">
          <div className="w-64 h-16 flex items-center bg-purple-900">
            <Image
              src={logoNoana}
              className="ml-6"
              width={121}
              height={25}
              alt="Logo Noana"
            />
          </div>

          <div className="w-full flex flex-1 items-center justify-between pr-8">
            <Notification />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="h-16 bg-purple-800 text-white">
      <div className="h-16 flex items-center gap-8">
        <div className="w-64 h-16 flex items-center bg-purple-900">
          <Image
            src={logoNoana}
            className="ml-6"
            width={121}
            height={25}
            alt="Logo Noana"
          />
        </div>

        <div className="w-full flex flex-1 items-center justify-between pr-8">
          <Notification />

          <div className="flex items-center gap-4">
            <ProfileMenu user={session.user} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
