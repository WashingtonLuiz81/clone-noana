'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import icoHospital from '../assets/img/ico-hospital.svg'
import icoUserHeart from '../assets/img/ico-user-heart.svg'
import Image from 'next/image'

export default function NavigationBar() {
  const pathname = usePathname()

  return (
    <nav className="w-[256px] px-3 py-10">
      <ul className="flex flex-col gap-4">
        <li
          className={classNames('px-4 py-2', {
            'bg-gray-200': pathname === '/unidades',
          })}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src={icoHospital} alt="Ícone de hospital" /> Unidades
          </Link>
        </li>

        <li
          className={classNames('px-4 py-2', {
            'bg-gray-200': pathname === '/usuario-mestre',
          })}
        >
          <Link href="/usuarios" className="flex items-center gap-2">
            <Image src={icoUserHeart} alt="Ícone de usuários" /> Usuários
          </Link>
        </li>
      </ul>
    </nav>
  )
}
