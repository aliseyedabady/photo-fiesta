import { useEffect, useState } from 'react'

import { SocketApi, SocketResponse } from '@/features/notifications'
import { WS_EVENT_PATH } from '@/shared/config'

export const useConnectSocket = () => {
  const [notifications, setNotifications] = useState<SocketResponse[]>([])

  const connectSocket = () => {
    SocketApi.createConnection()
    SocketApi.socket?.on(WS_EVENT_PATH.NOTIFICATIONS, (data: SocketResponse) => {
      setNotifications(prevNotifications => [...prevNotifications, data])
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
