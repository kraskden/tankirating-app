
export function formatBigNumber(num) {
  return num.toLocaleString('en-US')
}

export function formatTime(seconds) {
  const hours = (seconds / 3600).toFixed()
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