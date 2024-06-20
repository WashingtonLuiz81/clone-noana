import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <div>Olá, {session.user?.name}</div>
    </div>
  )
}
