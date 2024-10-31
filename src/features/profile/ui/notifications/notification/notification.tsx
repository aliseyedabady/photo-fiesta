import { Notification } from '@/features'
import { useTimeAgo } from '@/shared/utils'

type NotificationProps = {
  notification: Notification
}

export const NotificationItem = ({ notification }: NotificationProps) => {
  const timeAgo = useTimeAgo(notification.notifyAt)

  return (
    <div>
      <div>{notification.isRead ? 'Прочитано' : 'Новое уведомление!'}</div>
      <div>{notification.message}</div>
      <div>{timeAgo}</div>
    </div>
  )
}
