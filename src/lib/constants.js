import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears, format } from "date-fns"

import { formatBigNumber, formatHoursTime, formatPercents, formatTime, getWithPercentsFormatter } from '../util/format';


export const TIME_PERIODS = ["day", "week", "month", "year", "all_time"]

export const BASE_DIFF_FORMAT = "BASE"
export const FULL_DIFF_FORMAT = "FULL"

export const GROUPS = [
  {name: 'legends', title: 'Legends'}
]

export const DIFF_PERIODS = [
  { name: 'day', title: 'Daily', fnsPeriod: 'days', formatter: (time) => format(new Date(time), 'dd/MM') },
  { name: 'week', title: 'Weekly', fnsPeriod: 'weeks', formatter: (time) => format(new Date(time), 'dd/MM') },
  { name: 'month', title: 'Monthly', fnsPeriod: 'months', formatter: (time) => format(new Date(time), 'MM/yy') },
]

export const TRACK_PERIODS = [
  { name: 'day', title: 'Day', diffFn: differenceInDays },
  { name: 'week', title: 'Week', diffFn: differenceInWeeks },
  { name: 'month', title: 'Month', diffFn: differenceInMonths },
  { name: 'year', title: 'Year', diffFn: differenceInYears },
  { name: 'all_time', title: 'All Time' },
]

export const GLOBAL_TRACK_PERIODS = TRACK_PERIODS
  .filter(p => p.name !== 'day')


const BASE_SUMMARY_CHART_PROPERTIES = [
  {
    name: 'sh',
    title: 'Score/Hour',
    valueFormatter: (x) => formatBigNumber(Math.round(x)),
    tickFormatter: (x) => formatBigNumber(Math.round(x))
  }
]

const timeWithPercentFormatter = getWithPercentsFormatter((t) => formatTime(t), 'timePercent')
const scoreWithPercentFormatter = getWithPercentsFormatter(formatBigNumber, 'scorePercent')
const hoursTimeFormatter = (t) => formatHoursTime(t)

export const ABSOLUTE_SUMMARY_CHART_PROPERTIES = [
  {
    name: 'time',
    title: 'Time',
    valueFormatter: timeWithPercentFormatter,
    tickFormatter: hoursTimeFormatter
  },
  { 
    name: 'score', 
    title: 'Score', 
    valueFormatter:  scoreWithPercentFormatter,
    tickFormatter: formatBigNumber
  },
  ...BASE_SUMMARY_CHART_PROPERTIES, 
]

export const RELATIVE_SUMMARY_CHART_PROPERTIES = [
  {
    name: 'timePercent', 
    title: 'Time',
    valueFormatter: formatPercents,
    tickFormatter: formatPercents
  },
  {
    name: 'scorePercent',
    title: 'Score',
    valueFormatter: formatPercents,
    tickFormatter: formatPercents
  },
  ...BASE_SUMMARY_CHART_PROPERTIES
]

const dateFormat = "dd.MM.yyyy"

export const DEFAULT_DATEPICKER_PARAMS = {
  dateFormat: dateFormat,
  calendarStartDay: 1,
  fixedHeight: true,
  showMonthDropdown: true,
  showYearDropdown: true,
  scrollableYearDropdown :true,
  yearDropdownItemNumber: 5,
}

// qualitative colour pallete, see: https://tsitsul.in/blog/coloropt/
export const CHART_COLOR_PALLETE = ["#4053d3", "#ddb310", "#b51d14", "#00beff", "#fb49b0", "#00b25d"]

export const ONLINE_COLOR_PALLETE = ['#3a3af9', '#ff0000']
