import { Typography } from '@photo-fiesta/ui-lib'
import clsx from 'clsx'

import styles from './errorMessage.module.scss'
const classNames = {
  error: styles.error,
  visible: styles.visible,
} as const

export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className={clsx(classNames.error, error && classNames.visible)}>
      <Typography as={'span'} variant={'textBold16'}>
        Error!{' '}
      </Typography>
      <Typography as={'span'} variant={'text14'}>
        {error}
      </Typography>
    </div>
  )
}
