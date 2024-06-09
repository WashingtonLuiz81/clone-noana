import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
// import { redirect } from 'next/navigation'

interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession(nextAuthOptions)

  console.log('session Layout: ', session)

  // if (!session) {
  //   redirect('/')
  // }

  return <>{children}</>
}
