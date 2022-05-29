import moment from 'moment'

export function getDaysBetweenDates(start, end) {
  return moment.duration(moment(end)
    .diff(moment(start))).asDays()
}