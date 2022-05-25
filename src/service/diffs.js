import axios from "axios"

// Example: 2022-05-20
function fmtDate(date) {
  return date.toISOString().substring(0, 10)
}

export async function apiLoadDiffs(targetId, period, from, to, format) {
  const fromDate = from instanceof Date ? from : new Date(from)
  const toDate = to instanceof Date ? to : new Date(to)
  return axios.get(`/target/${targetId}/diff/${period.toLowerCase()}`, {
    params: {
      from: fmtDate(fromDate),
      to: fmtDate(toDate),
      format: format.toUpperCase()
    }
  })
}

export async function apiLoadDiffsByOffset(targetId, period, offsetFrom, offsetTo, format) {
  return axios.get(`/target/${targetId}/diff/${period.toLowerCase()}`, {
    params: {
      offsetFrom, offsetTo, format: format.toUpperCase()
    }
  })
}