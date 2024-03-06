import dayjs from 'dayjs'

export function diffBetweenDateAndNow(start: string) {
  const startDate = dayjs(start)
  const endDate = dayjs()

  const seconds = endDate.diff(startDate, 'second')
  const minutes = endDate.diff(startDate, 'minute')
  const hours = endDate.diff(startDate, 'hour')
  const days = endDate.diff(startDate, 'day')
  const weeks = endDate.diff(startDate, 'week')
  const months = endDate.diff(startDate, 'month')
  const years = endDate.diff(startDate, 'year')

  if (seconds < 60) {
    return `${seconds} seconds`
  } else if (minutes < 60) {
    return `${minutes} minutes`
  } else if (hours < 24) {
    return `${hours} hours`
  } else if (days < 7) {
    return `${days} days`
  } else if (weeks < 4) {
    return `${weeks} weeks`
  } else if (months < 12) {
    return `${months} months`
  } else {
    return `${years} years`
  }
}
