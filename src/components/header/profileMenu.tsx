'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import LogoutButton from '../button/logoutButton'
import { CircleUserIcon } from 'lucide-react'

interface User {
  name?: string | null
  email?: string | null
  avatar?: string | null
  profile?: string
}

const ProfileMenu: React.FC<{ user: User }> = ({ user }) => {
  const [isProfileVisible, setProfileVisible] = useState(false)

  const toggleProfileVisibility = () => {
    setProfileVisible(!isProfileVisible)
  }

  return (
    <div className="relative w-14 h-8 bg-gray-50 rounded-2xl">
      <div
        className="flex items-center justify-around cursor-pointer"
        onClick={toggleProfileVisibility}
      >
        {!user.avatar ? (
          <Image
            src={user.avatar!}
            width={36}
            height={36}
            className="-ml-1"
            alt="Avatar do Usuário"
          />
        ) : (
          <CircleUserIcon
            width={32}
            height={32}
            className="-ml-1 text-gray-400"
          />
        )}

        <ChevronDownIcon
          width={16}
          height={16}
          color="#692B96"
          className={`transition-transform duration-300 ${
            isProfileVisible ? '-rotate-180' : ''
          }`}
        />
      </div>

      {isProfileVisible && (
        <div className="absolute w-64 border-2 border-solid border-gray-100 bg-white rounded-xl top-10 right-0 py-9 px-6 shadow-avatar shadow-shadowAvatar transition-opacity duration-300 z-10">
          <div className="flex gap-2 items-center">
            {!user.avatar ? (
              <Image
                src={user.avatar!}
                width={36}
                height={36}
                className="-ml-1"
                alt="Avatar do Usuário"
              />
            ) : (
              <CircleUserIcon
                width={36}
                height={36}
                className="-ml-1 text-gray-400"
              />
            )}

            <div className="flex flex-col">
              <span className="font-medium text-gray-700 text-xs">
                {user.name || 'Usuário'}
              </span>
              <span className="font-medium text-gray-500 text-xs">
                {user.profile}
              </span>
            </div>
          </div>

          <ul className="mt-9">
            <li className="flex items-center gap-2">
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
