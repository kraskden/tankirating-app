import axios from "axios";
import { toISODate } from "../util/format";

export async function apiLoadSummaryForPeriod(targetId, period, offset, format) {
  return axios.get(`/target/${targetId}/diff/${period}/${offset}`, {
    params: {format}
  })
}

export async function apiLoadSummaryForDateRange(targetId, from, to, format) {
  return axios.get(`/target/${targetId}/diff/custom`, {
    from: toISODate(from),
    to: toISODate(to),
    params: {format}
  })
}