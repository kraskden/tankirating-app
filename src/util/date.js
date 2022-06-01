import { differenceInCalendarDays } from "date-fns"

export function getDaysBetweenDates(start, end) {
  return differenceInCalendarDays(new Date(end), new Date(start))
}