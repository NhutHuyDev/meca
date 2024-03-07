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
    return `${seconds} sec`
  } else if (minutes < 60) {
    return `${minutes} min`
  } else if (hours < 24) {
    return `${hours} h`
  } else if (days < 7) {
    return `${days} d`
  } else if (weeks < 4) {
    return `${weeks} w`
  } else if (months < 12) {
    return `${months} m`
  } else {
    return `${years} y`
  }
}
