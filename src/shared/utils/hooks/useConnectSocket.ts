import { useEffect, useState } from 'react'

import { SocketApi } from '@/app/api/socketApi'
import { Notification } from '@/features'

export const useConnectSocket = () => {
  const [notifications, setNotifications] = useState<Notification>()

  console.log('Notifications state:', notifications)

  const connectSocket = () => {
    SocketApi.createConnection()
    SocketApi.socket?.on('notifications', data => {
      console.log('notifications', data)
      setNotifications(data)
    })
  }

  useEffect(() => {
    connectSocket()

    return () => {
      SocketApi.disconnect()
    }
  }, [])

  return { notifications }
}
