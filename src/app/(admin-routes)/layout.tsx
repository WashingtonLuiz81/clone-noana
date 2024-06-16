import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Header from '@/components/header'
import NavigationBar from '@/components/navbar'

interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession(nextAuthOptions)

  console.log('session Layout: ', session)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <Header />

      <div>
        <NavigationBar />
        {children}
      </div>
    </div>
  )
}
