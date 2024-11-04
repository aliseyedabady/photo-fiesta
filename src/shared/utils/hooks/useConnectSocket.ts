import { useEffect, useState } from 'react'

import { SocketApi } from '@/app/api'
import { Notification } from '@/features/notifications'
import { WS_EVENT_PATH } from '@/shared/config'

export const useConnectSocket = () => {
  const [notifications, setNotifications] = useState<Notification>()

  const connectSocket = () => {
    SocketApi.createConnection()
    SocketApi.socket?.on(WS_EVENT_PATH.NOTIFICATIONS, data => {
      setNotifications(data)
    })
  }

  useEffect(() => {
    connectSocket()

    return () => {
      SocketApi.disconnect()
    }
  }, [notifications])

  return { notifications }
}
