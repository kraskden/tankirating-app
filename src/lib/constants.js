import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears, format } from "date-fns"

import { formatBigNumber, formatHoursTime, formatPercents, formatTime } from '../util/format';


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

export const USER_SUMMARY_CHART_PROPERTIES = [
  {
    name: 'time',
    title: 'Time',
    valueFormatter: (time) => time ?  formatTime(time) : 0,
    tickFormatter: (time) => time ? formatHoursTime(time) : 0
  },
  { 
    name: 'score', 
    title: 'Score', 
    valueFormatter: formatBigNumber ,
    tickFormatter: formatBigNumber
  },
  ...BASE_SUMMARY_CHART_PROPERTIES, 
]

export const GLOBAL_SUMMARY_CHART_PROPERTIES = [
  {
    name: 'time', 
    title: 'Time',
    valueFormatter: formatPercents,
    tickFormatter: formatPercents
  },
  {
    name: 'score',
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
