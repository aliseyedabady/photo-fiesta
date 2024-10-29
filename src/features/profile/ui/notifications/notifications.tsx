import { OutlineBell } from '@/shared/assets'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@photo-fiesta/ui-lib'

import styles from './notifications.module.scss'

export const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <OutlineBell className={styles.bell} />
      </DropdownMenuTrigger>
      <DropdownMenuContent label={'Уведомления'}>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
