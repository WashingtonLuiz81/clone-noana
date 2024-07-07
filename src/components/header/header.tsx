import React from 'react'
import Image from 'next/image'
import ProfileMenu from './profileMenu'
import Notification from './notification'
import { logoNoana, logoNoanaWhite } from '@/assets/img/icons'
import { Session } from 'next-auth'

interface HeaderProps {
  session: Session
}

const Header: React.FC<HeaderProps> = ({ session }) => {
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
        </div>
      </header>
    )
  }

  return (
    <header className="h-16 bg-purple-800 text-white">
      <div className="h-16 flex items-center gap-8">
        <div className="w-64 h-16 flex items-center bg-purple-900">
          <Image
            src={logoNoanaWhite}
            className="ml-6"
            width={121}
            height={25}
            alt="Logo Noana"
          />
        </div>

        <div className="w-full flex flex-1 items-center justify-between pr-8">
          <Notification session={session} />

          <div className="flex items-center gap-4">
            <ProfileMenu user={session.user} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
