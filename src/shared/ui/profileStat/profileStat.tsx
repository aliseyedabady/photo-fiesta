import { NUMBER_WITH_SEPARATOR_REGEX } from '@/shared/config'
import clsx from 'clsx'

import styles from './profileStat.module.scss'

type ProfileStatProps = {
  className?: string
  counts: number
  title: string
}

/**
 * `ProfileStat` component displays a statistic for a profile such as
 * followers, following, or publications. If the number is greater than 1000,
 * it separates the first digit for styling purposes.
 *
 * @component
 * @example
 * // Usage example:
 * <ProfileStat counts={2764} title="Followers" />
 */

export const ProfileStat = ({ className, counts, title }: ProfileStatProps) => {
  const classNames = {
    root: clsx(styles.root, className),
    title: styles.title,
  }

  // transform number to string and divide the first digit
  const formattedCounts = counts.toString().replace(NUMBER_WITH_SEPARATOR_REGEX, ' ')

  return (
    <div className={classNames.root}>
      <span> {formattedCounts}</span>
      <span className={classNames.title}>{title}</span>
    </div>
  )
}
