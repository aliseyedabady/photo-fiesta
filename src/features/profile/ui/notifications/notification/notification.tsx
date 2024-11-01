import { Notification } from '@/features'
import { useTimeAgo, useTranslation } from '@/shared/utils'
import { Typography } from '@photo-fiesta/ui-lib'

import styles from './notification.module.scss'

type NotificationProps = {
  notification: Notification
}

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
