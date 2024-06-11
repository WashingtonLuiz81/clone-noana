'use client'

import React, { ReactNode, useState } from 'react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Header from '@/components/header'
import Modal from '@/components/modal/Modal'

interface PrivateLayouProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayouProps) {
  const session = await getServerSession(nextAuthOptions)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const images = [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400?text=Second+Image',
    'https://via.placeholder.com/600x400?text=Third+Image',
  ]

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
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
      />
    </div>
  )
}
