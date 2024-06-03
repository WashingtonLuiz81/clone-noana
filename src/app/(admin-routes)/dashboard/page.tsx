import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions)

  // console.log('Session novo de novo: ', session)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <div>Olá,</div>
      <div>Dashboard</div>
    </div>
  )
}
