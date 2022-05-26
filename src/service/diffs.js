import axios from "axios"

// Example: 2022-05-20
function fmtDate(date) {
  date = date instanceof Date ? date : new Date(date)
  return date.toISOString().substring(0, 10)
}

export async function apiLoadDiffs(targetId, period, format, options) {
  const {from, to, offsetFrom, offsetTo} = options
  const params = {format: format.toUpperCase(), offsetFrom, offsetTo}
  if (from && to) {
    params.from = fmtDate(from) 
    params.to = fmtDate(to)
  } 
  return axios.get(`/target/${targetId}/diff/${period.toLowerCase()}`, {params})
}
