import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NavigationBar from '@/components/navbar'
import Header from '@/components/header/header'

import { authOptions } from '@/lib/auth'

interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header session={session} />

      <div className="flex flex-1">
        <NavigationBar />
        {children}
      </div>
    </div>
  )
}
