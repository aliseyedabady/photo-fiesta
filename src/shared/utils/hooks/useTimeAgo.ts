import { useEffect, useState } from 'react'

type DateInput = Date | string

const getTimeAgoString = (date: DateInput): string => {
  const now = new Date()
  const eventDate = new Date(date)
  const diffMs = now.getTime() - eventDate.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (hours > 0) {
    return `${hours} час${hours > 1 ? 'ов' : ''} назад`
  }
  if (minutes > 0) {
    return `${minutes} минут${minutes > 1 ? 'ы' : 'а'} назад`
  }
  if (seconds > 0) {
    return `${seconds} секунд${seconds > 1 ? 'ы' : 'а'} назад`
  }

  return `${days} день${days > 1 ? 'ей' : ''} назад`
}

export const useTimeAgo = (date: DateInput): string => {
  const [timeAgo, setTimeAgo] = useState<string>(getTimeAgoString(date))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgoString(date))
    }, 60000) // обновляем каждую минуту

    return () => clearInterval(interval)
  }, [date])

  return timeAgo
}
