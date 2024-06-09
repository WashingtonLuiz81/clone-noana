import Image from 'next/image'

import { BellIcon, ChevronDownIcon } from '@radix-ui/react-icons'

import logoNoana from '../assets/img/logo-noana-white.svg'
import userAvatar from '../assets/img/avatar.png'
import { Button } from './ui/button'

const Header: React.FC = () => {
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

        <div className="w-full flex items-center justify-between pr-8">
          <div className="flex items-center gap-2">
            {/* <span className="w-2 h-2 rounded-full bg-lime-500"></span>
            <span className="text-base font-semibold">
              Olá, Usuário Mestre!
            </span> */}

            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-3 h-3 rounded-full bg-red-100">
                <span className="absolute w-1 h-1 rounded-full bg-[#FD6B6B]"></span>
              </div>

              <span className="font-medium">
                Você tem{' '}
                <strong className="font-semibold text-[#FD6B6B]">
                  3 alertas
                </strong>{' '}
                urgentes!
              </span>

              <Button className="w-9 h-5 rounded-3xl bg-[#F1E7F8] text-[#692B96] hover:bg-[#F1E7F8]">
                Ver
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer bg-white text-white">
              <BellIcon className="h-5 w-5 text" color="#692B96" />
              <span className="absolute -right-1 top-0 h-3 w-3 rounded-full bg-[#EF4343] border-2 border-[#692B96]" />
            </div>

            <div className="flex items-center justify-around w-14 h-8 bg-gray-50 rounded-2xl cursor-pointer">
              <Image
                src={userAvatar}
                width={32}
                height={32}
                className="-ml-1"
                alt="User Profile"
              />

              <ChevronDownIcon width={16} height={16} color="#692B96" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
