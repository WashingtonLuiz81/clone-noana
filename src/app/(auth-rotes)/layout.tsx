import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Header from '@/components/header'


interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession(nextAuthOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div>
      <Header />
      <div>
        <nav>Menu</nav>
        {children}
      </div>
    </div>
  )
}
