import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears, format } from "date-fns"

import { formatBigNumber, formatHoursTime, formatPercents, formatTime, getTimeFormatter, getWithPercentsFormatter } from '../util/format';
import { percentProp } from "../util/util";

export const TIME_PERIODS = ["day", "week", "month", "year", "all_time"]

export const BASE_DIFF_FORMAT = "BASE"
export const FULL_DIFF_FORMAT = "FULL"

export const GROUPS = [
  {name: 'legends', title: 'Legends'}
]

export const GLOBAL_DIFF_PERIODS = [
  { name: 'week', title: 'Weekly', fnsPeriod: 'weeks', formatter: getTimeFormatter('dd/MM') },
  { name: 'month', title: 'Monthly', fnsPeriod: 'months', formatter: getTimeFormatter('MM/yy') },

]
export const DIFF_PERIODS = [
  { name: 'day', title: 'Daily', fnsPeriod: 'days', formatter: getTimeFormatter('dd/MM') },
  ...GLOBAL_DIFF_PERIODS
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


const BASE_ACTIVITY_PROPERTIES = [
  {
    name: 'sh',
    title: 'Score/Hour',
    valueFormatter: (x) => formatBigNumber(Math.round(x)),
    tickFormatter: (x) => formatBigNumber(Math.round(x))
  }
]

const timeWithPercentFormatter = getWithPercentsFormatter((t) => formatTime(t))
const scoreWithPercentFormatter = getWithPercentsFormatter(formatBigNumber)
const hoursTimeFormatter = (t) => formatHoursTime(t)

export const ABSOLUTE_ACTIVITY_PROPERTIES = [
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
  ...BASE_ACTIVITY_PROPERTIES, 
]

export const RELATIVE_ACTIVE_PROPERTIES = [
  {
    name: percentProp('time'),
    title: 'Time',
    tickFormatter: formatPercents
  },
  {
    name: percentProp('score'),
    title: 'Score',
    tickFormatter: formatPercents
  },
  ...BASE_ACTIVITY_PROPERTIES
]

export const ACTIVITY_CATEGORIES = [
  { name: 'hulls', title: 'Hulls' },
  { name: 'turrets', title: 'Turrets' },
  { name: 'modes', title: 'Modes' },
  { name: 'modules', title: 'Modules' }
]

export const TRACK_PROPERTIES = [
  { name: 'time', title: 'Time', tickFormatter: (time) => time ? formatHoursTime(time) : 0 },
  { name: 'cry', title: 'Cry', tickFormatter: formatBigNumber },
  { name: 'score', title: 'Score', tickFormatter: formatBigNumber },
  { name: 'kd', title: 'K/D', tickFormatter: (value) => value.toFixed(2) }
]

const dateFormat = "dd.MM.yyyy"

export const DEFAULT_DATEPICKER_PARAMS = {
  dateFormat: dateFormat,
  calendarStartDay: 1,
  fixedHeight: true,
  showMonthDropdown: true,
  showYearDropdown: true,
  scrollableYearDropdown: true,
  yearDropdownItemNumber: 5,
}

// qualitative colour pallete, see: https://tsitsul.in/blog/coloropt/
export const CHART_COLOR_PALLETE = ["#4053d3", "#ddb310", "#b51d14", "#00beff", "#fb49b0", "#00b25d"]

export const ONLINE_COLOR_PALLETE = ['#3a3af9', '#ff0000']

export const STATUSES = {
  'ACTIVE': {
    bg: 'success',
    title: 'Active',
    abbr: 'Account is updating regulary'
  },
  'FROZEN': {
    bg: 'primary',
    title: 'Frozen',
    abbr: 'Last account updates are failed'
  },
  'DISABLED': {
    bg: 'danger',
    title: 'Disabled',
    abbr: 'Account is disabled, system will not updating it'
  },
  'SLEEP': {
    bg: 'secondary',
    title: 'Sleep',
    abbr: 'User is not actively played, account is updating once per day'
  },
  'PREMIUM': {
    bg: 'dark',
    title: "Premium",
    abbr: "User is the supporter of TankiRating project"
  }
}
