import { useEffect, useMemo, useState } from 'react'

import {
  NotificationItem,
  NotificationsIcon,
  useGetAllNotificationsQuery,
} from '@/features/notifications'
import { useConnectSocket, useTranslation } from '@/shared/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@photo-fiesta/ui-lib'
/**
 * Notifications component displays a dropdown menu containing all notifications.
 *
 * It retrieves notifications using the `useGetAllNotificationsQuery` hook and tracks
 * the number of new (unread) notifications.
 * The component allows users to view their notifications in a dropdown format.
 *
 * The dropdown menu opens and closes based on user interaction, and it displays
 * an icon that indicates the number of new notifications
 */
export const Notifications = () => {
  const { t } = useTranslation()
  const { notifications: newNotification } = useConnectSocket()
  const { data } = useGetAllNotificationsQuery({ cursor: 0 })
  const [amountOfNewNotifications, setAmountOfNewNotifications] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const notifications = useMemo(() => {
    return newNotification ? [newNotification, ...(data?.items ?? [])] : (data?.items ?? [])
  }, [data, newNotification])

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
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <NotificationsIcon isOpen={isDropdownOpen} newNotifications={amountOfNewNotifications} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={'end'}
        alignOffset={-10}
        label={t.notifications.notifications}
        sideOffset={2}
      >
        {notificationItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
