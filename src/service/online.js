import axios from "axios"
import { toISODate } from "../util/format"

const MOMENTARY_ONLINE_URL = "https://tankionline.com/s/status.js"


export async function apiLoadMomentaryOnline() {
  const {data} = await axios.get(MOMENTARY_ONLINE_URL)
  return Object.values(data.nodes).reduce((acc, curr) => {
    acc.online += curr.online 
    acc.inbattles += curr.inbattles
    return acc
  }, {online: 0, inbattles: 0})
}

export async function apiLoadCcu(from, to) {
  const params = {
    from: toISODate(from),
    to: toISODate(to)
  }
  const {data} =  await axios.get('/online/snapshot', {params})
  return data
}

export async function apiLoadPcu(period, from, to) {
  const params = {
    from: toISODate(from),
    to: toISODate(to)
  }
  const {data} = await axios.get(`/online/pcu/${period.toLowerCase()}`, {from, to})
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