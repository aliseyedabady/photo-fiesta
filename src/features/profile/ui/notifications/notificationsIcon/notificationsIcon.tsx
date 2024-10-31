import { OutlineBell } from '@/shared/assets'

import styles from './notificationsIcon.module.scss'

export const NotificationsIcon = ({ newNotifications }: { newNotifications: number }) => {
  const count = newNotifications > 0

  return (
    <div>
      <OutlineBell className={styles.bell} />
      {count && <span>{newNotifications}</span>}
    </div>
  )
}
