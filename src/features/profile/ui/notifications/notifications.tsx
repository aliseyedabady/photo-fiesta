import { useEffect, useMemo, useState } from 'react'

import { NotificationItem, NotificationsIcon, useGetAllNotificationsQuery } from '@/features'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@photo-fiesta/ui-lib'

import styles from './notifications.module.scss'

export const Notifications = () => {
  const { data } = useGetAllNotificationsQuery({ cursor: 0 })
  const [amountOfNewNotifications, setAmountOfNewNotifications] = useState(0)

  const notifications = useMemo(() => data?.items ?? [], [data])

  useEffect(() => {
    if (data?.totalCount) {
      setAmountOfNewNotifications(notifications.filter(({ isRead }) => !isRead).length)
    }
  }, [data, notifications])

  const notificationItems = notifications.map(notification => (
    <DropdownMenuItem key={notification.id}>
      <NotificationItem notification={notification} />
    </DropdownMenuItem>
  ))

  return (
    <div className={styles.wrapper}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <NotificationsIcon newNotifications={amountOfNewNotifications} />
        </DropdownMenuTrigger>
        <DropdownMenuContent label={'Уведомления'}>{notificationItems}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
