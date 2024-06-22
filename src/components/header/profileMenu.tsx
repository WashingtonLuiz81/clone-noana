'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import userAvatar from '../../assets/img/avatar.png'
import LogoutButton from '../button/logoutButton'

interface User {
  name?: string | null
  email?: string | null
  avatar?: string | null
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
        <Image
          src={userAvatar}
          width={32}
          height={32}
          className="-ml-1"
          alt="Avatar do Usuário"
        />

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
        <div className="absolute w-64 border-2 border-solid border-gray-100 bg-white rounded-xl top-10 right-0 py-9 px-6 shadow-avatar shadow-shadowAvatar transition-opacity duration-300">
          <div className="flex gap-2 items-center">
            <Image
              src={userAvatar}
              width={36}
              height={36}
              className="-ml-1 w-9 h-9"
              alt="Avatar do Usuário"
            />

            <div className="flex flex-col">
              <span className="font-medium text-gray-700 text-xs">
                {user.name || 'Usuário'}
              </span>
              <span className="font-medium text-gray-500 text-xs">
                Técnico em enfermagem
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
