import { Notification } from '@/features/notifications'
import { useTimeAgo, useTranslation } from '@/shared/utils'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './notification.module.scss'

type NotificationProps = {
  notification: Notification
}
/**
 * NotificationItem component displays a single notification with its details.
 *
 * It shows whether the notification has been read, the notification message,
 * and the time elapsed since the notification was created. The component
 * also supports internationalization, displaying text based on the selected
 * language.
 *
 * @example
 * const notification = {
 *   id: 1,
 *   isRead: false,
 *   message: 'You have a new message!',
 *   notifyAt: '2024-10-31T10:00:00Z'
 * };
 *
 * <NotificationItem notification={notification} />
 */
export const NotificationItem = ({ notification }: NotificationProps) => {
  const timeAgo = useTimeAgo(notification.notifyAt)
  const { t } = useTranslation()

  return (
    <>
      <div>
        {notification.isRead ? (
          ''
        ) : (
          <div className={styles.notify}>
            <Typography variant={'textBold14'}>{t.notifications.newNotification}</Typography>
            <span className={styles.new}>{t.notifications.new}</span>
          </div>
        )}
      </div>
      <Typography variant={'text14'}>{notification.message}</Typography>
      <Typography className={styles.timeAgo} variant={'textSmall'}>
        {timeAgo}
      </Typography>
    </>
  )
}
