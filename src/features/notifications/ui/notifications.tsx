import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import {
  NotificationItem,
  NotificationsIcon,
  useConnectSocket,
  useGetAllNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@/features'
import { useTranslation } from '@/shared/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@photo-fiesta/ui-lib'

import 'react-toastify/dist/ReactToastify.css'
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

  const { notifications: socketNotifications } = useConnectSocket()
  const { data, refetch } = useGetAllNotificationsQuery({ cursor: 0 })
  const [markAsRead] = useMarkNotificationAsReadMutation()

  const [amountOfNewNotifications, setAmountOfNewNotifications] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const notifications = data?.items ?? []

  useEffect(() => {
    if (socketNotifications.length > 0) {
      const latestNotification = socketNotifications[socketNotifications.length - 1]

      toast(latestNotification.message)
    }
  }, [socketNotifications])

  useEffect(() => {
    if (data?.totalCount) {
      setAmountOfNewNotifications(notifications.filter(({ isRead }) => !isRead).length)
    }
  }, [data])

  /**
   * Marks a notification as read.
   *
   * This function is triggered when the notifications dropdown is opened, and it marks
   * all unread notifications as read by updating their `isRead` status. The `markAsRead`
   * mutation is used to update the server with the read status.
   */
  useEffect(() => {
    if (isDropdownOpen && amountOfNewNotifications > 0) {
      setTimeout(() => {
        const unreadNotifications = notifications.reduce((acc, { id, isRead }) => {
          if (!isRead) {
            acc.push(id)
          }

          return acc
        }, [] as number[])

        markAsRead({ ids: unreadNotifications })
        setAmountOfNewNotifications(0)
      }, 5000)

      refetch()
    }
  }, [isDropdownOpen])

  const notificationItems = notifications.map(notification => (
    <DropdownMenuItem key={notification.id}>
      <NotificationItem notification={notification} />
    </DropdownMenuItem>
  ))

  return (
    <>
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
      <ToastContainer autoClose={3000} hideProgressBar position={'top-center'} theme={'dark'} />
    </>
  )
}
