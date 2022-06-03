import axios from "axios";
import { humanizeTrackModuleNames } from "../lib/modules";
import { toISODate } from "../util/format";

export async function apiLoadSummaryForPeriod(targetId, period, offset, format) {
  const {data} = await axios.get(`/target/${targetId}/diff/${period}/${offset}`, {
    params: { format }
  })
  humanizeTrackModuleNames(data)
  return data
}

export async function apiLoadSummaryForDateRange(targetId, from, to, format) {
  const {data} = await axios.get(`/target/${targetId}/diff/custom`, {
    params: {
      from: toISODate(from),
      to: toISODate(to),
      format
    }
  })
  humanizeTrackModuleNames(data)
  return data
}