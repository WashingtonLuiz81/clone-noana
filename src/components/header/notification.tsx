'use client'

import { Session } from 'next-auth'
import { Button } from '../ui/button'
import { BellIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
// import { fetchNotificationMessagesTotalizer } from '@/app/services/notificationService'

interface NotificationProps {
  session: Session | null
}

export default function Notification({ session }: NotificationProps) {
  const [notificationData, setNotificationData] = useState<{
    total: number
  } | null>(null)

  useEffect(() => {
    console.log('session?.user?: ', session?.user?.idToken)
    setNotificationData({ total: 2 })
    const fetchNotifications = async () => {
      if (session?.user?.idToken) {
        try {
          const response = await fetch(
            '/api/notification/messages_totalizer/',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.idToken}`,
              },
            },
          )

          console.log('response: ', response)
          // console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
          // const fetchedNotification = await fetchNotificationMessagesTotalizer(
          //   session.user.idToken,
          // )
          // setNotificationData(fetchedNotification)
          // console.log('Response: ', fetchedNotification)
        } catch (error) {
          console.error('Error fetching notification data:', error)
        }
      }
    }
    fetchNotifications()
  }, [session?.user.idToken])

  return (
    <div className="w-full flex flex-1 items-center justify-between pr-8">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-lime-500"></span>
        <span className="text-base font-semibold">
          Olá, {session?.user?.name}!
        </span>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-3 h-3 rounded-full bg-red-100">
            <span className="absolute w-1 h-1 rounded-full bg-[#FD6B6B]"></span>
          </div>

          <span className="font-medium">
            Você tem{' '}
            <strong className="font-semibold text-[#FD6B6B]">
              {notificationData?.total ?? '...'}
            </strong>{' '}
            alertas urgentes!
          </span>

          <Button className="w-9 h-5 rounded-3xl bg-[#F1E7F8] text-[#692B96] hover:bg-[#F1E7F8]">
            Ver
          </Button>
        </div>
      </div>

      <div className="relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer bg-white text-white">
        <BellIcon className="h-5 w-5 text" color="#692B96" />
        <span className="absolute -right-1 top-0 h-3 w-3 rounded-full bg-[#EF4343] border-2 border-[#692B96]" />
      </div>
    </div>
  )
}
