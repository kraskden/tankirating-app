import axios from "axios"
import { toISODate, toISOEndOfDayDateTime, toISOStartOfDayDateTime } from "../util/format"

const MOMENTARY_ONLINE_URL = "https://tankionline.com/s/status.js"

// Alternativa enable CORS, so that's won't work anymore
export async function apiAlternativaLoadMomentaryOnline() {
  const {data} = await axios.get(MOMENTARY_ONLINE_URL)
  return Object.values(data.nodes).reduce((acc, curr) => {
    acc.online += curr.online 
    acc.inbattles += curr.inbattles
    return acc
  }, {timestamp: new Date(), online: 0, inbattles: 0})
}

// Workaround - get latest online snapshot from TankiRating API
export async function apiLoadMomentaryOnline() {
  const {data} = await axios.get('/online/snapshot/latest')
  return data
}

export async function apiLoadCcu(from, to) {
  const params = {
    from: toISOStartOfDayDateTime(from),
    to: toISOEndOfDayDateTime(to)
  }
  const {data} =  await axios.get('/online/snapshot', {params})
  return data
}

export async function apiLoadPcu(period, from, to) {
  const params = {
    from: toISOStartOfDayDateTime(from),
    to: toISOStartOfDayDateTime(to)
  }
  const {data} = await axios.get(`/online/pcu/${period.toLowerCase()}`, {params})
  return data
}

export async function apiLoadPcuByOffset(period, offset) {
  const {data} = await axios.get(`/online/pcu/${period.toLowerCase()}/${offset}`)
  return data
}

export async function apiLoadCurrentPcu() {
  const {data} = await axios.get(`/online/pcu/current`)
  return data.reduce((acc, curr) => {
    acc[curr.period.toLowerCase()] = curr
    return acc
  }, {})
}