import { FillBell, OutlineBell } from '@/shared/assets'

import styles from './notificationsIcon.module.scss'

type NotificationsIconProps = {
  isOpen: boolean
  newNotifications: number
}
export const NotificationsIcon = ({ isOpen, newNotifications }: NotificationsIconProps) => (
  <div className={styles.icons}>
    {isOpen ? (
      <FillBell className={styles.activeBell} />
    ) : (
      <OutlineBell className={styles.defaultBell} />
    )}
    {newNotifications > 0 && <span className={styles.count}>{newNotifications}</span>}
  </div>
)
