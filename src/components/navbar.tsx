'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { UserHeart, Hospital } from '@/assets/img/icons'

export default function NavigationBar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white px-3 py-10">
      <ul className="flex flex-col gap-4">
        <li className="px-4 py-2">
          <Link
            href="/usuario-mestre"
            className={classNames(
              'flex items-center gap-2 font-medium text-gray-600',
              {
                'text-primary font-semibold': pathname === '/usuario-mestre',
              },
            )}
          >
            <Hospital
              className={classNames({
                'text-primary': pathname === '/usuario-mestre',
              })}
            />{' '}
            Unidades
          </Link>
        </li>

        <li className="px-4 py-2">
          <Link
            href="/usuario-mestre/usuarios"
            className={classNames(
              'flex items-center gap-2 font-medium text-gray-600',
              {
                'text-primary font-semibold':
                  pathname === '/usuario-mestre/usuarios',
              },
            )}
          >
            <UserHeart
              className={classNames({
                'text-primary': pathname === '/usuario-mestre/usuarios',
              })}
            />{' '}
            Usuários
          </Link>
        </li>
      </ul>
    </nav>
  )
}
