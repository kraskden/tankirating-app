import { format } from "date-fns";
import { percentProp } from "./util";

export function formatBigNumber(num, zeroStr) {
  const realNum = Number(num)
  if (realNum === NaN) {
    return num;
  }
  if (zeroStr && (realNum === 0)) {
    return zeroStr
  }
  return realNum.toLocaleString('en-US')
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

export function truncateBigNumberToK(num) {
  return `${formatBigNumber(Math.round(num / 1000))}K`
}

export function toISOStartOfDayDateTime(date) {
  date = date instanceof Date ? date : new Date(date)
  return toISODate(date) + 'T00:00:00.000Z'
}

export function toISOEndOfDayDateTime(date) {
  date = date instanceof Date ? date : new Date(date)
  return toISODate(date) + 'T23:59:59.999Z'
}

export function toISODate(date) {
  date = date instanceof Date ? date : new Date(date)
  return format(date, 'yyyy-MM-dd')
}

export function toHumanDate(date) {
  // So, America, fuck you!
  return format(new Date(date), 'dd.MM.yyyy')
}

export function toHumanDateTime(date) {
  return format(new Date(date), 'dd.MM.yyyy HH:mm')
}

export function formatTime(seconds, zeroStr = 'N/P') {
  const hours = Math.floor(seconds / 3600)
  const minutes = ((seconds % 3600) / 60).toFixed()

  if (hours > 0) {
    return `${hours}h ${minutes ? ` ${minutes}min` : ''}`
  } else if (minutes > 1) {
    return `${minutes} min`
  } else {
    return seconds ? '<1 min' : zeroStr
  }
}

export function formatHoursTime(seconds) {
    return seconds ? seconds > 3600 ? (seconds / 3600).toFixed(1) + 'h' :
    ((seconds / 60).toFixed(0) || '<1') + ' min' : "N/P"
}

export function formatPercents(val) {
  return `${(val * 100).toFixed(1)}%`
}


export function getWithPercentsFormatter(baseFormatter, percentProperty) {
  return (val, name, {payload}) => {
    return baseFormatter(val) + `  [${formatPercents(payload[percentProp(name)])}]`
  } 
}