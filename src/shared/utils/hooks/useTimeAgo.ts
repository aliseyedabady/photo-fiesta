import { useEffect, useState } from 'react'

import { formatDistanceToNowStrict } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

type DateInput = Date | string

/**
 * A custom hook that returns a formatted string representing the time
 * elapsed since the given date.
 *
 * This hook updates the time ago string every minute and supports
 * localization for English and Russian languages.
 *
 * @param {DateInput} date - The date or date string to compare against the current time.
 * @returns {string} A string representing the time elapsed since the provided date,
 *                  formatted according to the current locale (e.g., "5 minutes ago" or "5 минут назад").
 *
 * @example
 * const timeAgo = useTimeAgo(new Date('2024-10-30T12:00:00Z'));
 * console.log(timeAgo); // Output might be "5 minutes ago" or "5 минут назад" depending on locale.
 */
export const useTimeAgo = (date: DateInput): string => {
  const { locale } = useRouter()

  const getTimeAgoString = () => {
    const targetDate = new Date(date)
    const timeAgo = formatDistanceToNowStrict(targetDate, { locale: locale === 'ru' ? ru : enUS })

    return locale === 'ru' ? `${timeAgo} назад` : `${timeAgo} ago`
  }

  const [timeAgo, setTimeAgo] = useState<string>(getTimeAgoString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgoString())
    }, 60000)

    return () => clearInterval(interval)
  }, [date])

  return timeAgo
}
