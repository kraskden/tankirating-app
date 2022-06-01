import { format } from "date-fns"

export const TIME_PERIODS = ["day", "week", "month", "year", "all_time"]

export const BASE_DIFF_FORMAT = "BASE"
export const FULL_DIFF_FORMAT = "FULL"

export const DIFF_PERIODS = [
  { name: 'day', title: 'Daily', fnsPeriod: 'days', formatter: (time) => format(new Date(time), 'dd/MM') },
  { name: 'week', title: 'Weekly', fnsPeriod: 'weeks', formatter: (time) => format(new Date(time), 'dd/MM') },
  { name: 'month', title: 'Monthly', fnsPeriod: 'months', formatter: (time) => format(new Date(time), 'MM/yy') },
]
