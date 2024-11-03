import { useEffect, useState } from 'react'

import { SocketApi } from '@/app/api'
import { Notification } from '@/features'
import { WS_EVENT_PATH } from '@/shared/config'

export const useConnectSocket = () => {
  const [notifications, setNotifications] = useState<Notification>()

  console.log('Notifications state:', notifications)

  const connectSocket = () => {
    SocketApi.createConnection()
    SocketApi.socket?.on(WS_EVENT_PATH.NOTIFICATIONS, data => {
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
