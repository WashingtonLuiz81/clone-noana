import { ExitIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <Button
      className="flex gap-2 items-center bg-transparent shadow-none hover:bg-transparent hover:shadow-none hover:text-current hover:border-transparent"
      onClick={handleLogout}
    >
      <ExitIcon className="h-5 w-5 text" color="#3F3F46" />
      <span className="text-gray-700 font-medium">Sair</span>
    </Button>
  )
}
