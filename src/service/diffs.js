import axios from "axios"
import { postProcessTrack } from "../lib/tracking"
import { toISODate } from "../util/format"

export async function apiLoadDiffs(targetId, period, format, options) {
  const {from, to, offsetFrom, offsetTo} = options
  const params = {format: format.toUpperCase(), offsetFrom, offsetTo}
  if (from && to) {
    params.from = toISODate(from) 
    params.to = toISODate(to)
  } 
  const {data} = await axios.get(`/target/${targetId}/diff/${period.toLowerCase()}`, {params})
  data.forEach(postProcessTrack)
  return data;
}
