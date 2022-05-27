import moment from "moment"

export function formatBigNumber(num) {
  return num.toLocaleString('en-US')
}

export function truncateBigNumber(num) {
  if (num > 1000000) {
    return `${Math.round(num / 100000) / 10}M`
  } else if (num > 1000) {
    return `${Math.round(num / 1000)}K`
  } else {
    return num
  }
}

export function toISODate(date) {
  date = date instanceof Date ? date : new Date(date)
  return date.toISOString().substring(0, 10)
}

export function toHumanDate(date) {
  // So, America, fuck you!
  return moment(date).format('DD.MM.YYYY')
}

export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = ((seconds % 3600) / 60).toFixed()

  if (hours > 0) {
    return `${hours}h ${minutes ? ` ${minutes}min` : ''}`
  } else if (minutes > 1) {
    return `${minutes} min`
  } else {
    return seconds ? '<1 min' : 'N/P'
  }
}

export function formatHoursTime(seconds) {
    return seconds ? seconds > 3600 ? (seconds / 3600).toFixed(1) + 'h' :
    ((seconds / 60).toFixed(0) || '<1') + ' min' : "N/P"
}