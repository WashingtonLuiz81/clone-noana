import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NavigationBar from '@/components/navbar'
import Header from '@/components/header/header'
import { ToastContainer, Bounce } from 'react-toastify'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header session={session} />

      <div className="flex flex-1">
        <NavigationBar />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div>
    </div>
  )
}
