import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Header from '../_components/header'
import Hospital from '@/assets/img/hospital'

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex flex-col gap-10 py-10 px-8">
      <Header />

      <section>
        <header>
          <div>
            <Hospital />
            <span>Unidades Cadastradas</span>
          </div>
        </header>
      </section>
    </div>
  )
}
