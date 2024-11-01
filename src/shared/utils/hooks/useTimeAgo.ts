import { useEffect, useState } from 'react'

import { formatDistanceToNowStrict } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

type DateInput = Date | string

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
