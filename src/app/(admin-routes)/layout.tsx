import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Header from '@/components/header'
import NavigationBar from '@/components/navbar'

interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <NavigationBar />
        {children}
      </div>
    </div>
  )
}
