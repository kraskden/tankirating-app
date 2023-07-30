import { FormLabel } from "react-bootstrap"
import { getDaysBetweenDates } from "../util/date"
import { formatBigNumber, formatTime } from "../util/format"
import {batteryEnabled, getSupplyUsages} from '../lib/tracking'

function getFavourite(activities) {
  return activities.reduce((acc, curr) => {
    return acc.time > curr.time ? acc : curr
  }, {
    name: "N/A",
    time: 0
  }).name
}

function divide(a, b, roundDigits) {
  return b == 0 ? 'N/A' : (a / b).toFixed(roundDigits)
}

export function makeAllTimeSummary(data) {
  const { time, activities } = data

  const hours = Math.round(time / 3600)

  const [favTurret, favHull, favMode, favModule] = [
    activities.turrets, activities.hulls, activities.modes, activities.modules
  ].map(a => getFavourite(a))

  return {
    left: [
      ["Kills", formatBigNumber(data.kills)],
      ["Deaths", formatBigNumber(data.deaths)],
      ["Cry", formatBigNumber(data.cry)],
      null,
      ["K/D", divide(data.kills, data.deaths, 2)],
      null,
      ["Fav. Hull", favHull],
      ["Fav. Turret", favTurret]
    ],
    right: [
      ["Score", formatBigNumber(data.score)],
      ["Hours", hours],
      ["Cry/Score", divide(data.cry, data.score, 2)],
      null,
      ["Score/Kills", divide(data.score, data.kills, 1)],
      null,
      ["Fav. Mode", favMode],
      ["Fav. Module", favModule]
    ]
  }
}

export function makeDiffSummary(data) {
  const battleDuration = 7 * 60;

  const { time, activities } = data
  const hours = time / 3600
  const battles = time / battleDuration

  const [favTurret, favHull, favMode, favModule] = [
    activities.turrets, activities.hulls, activities.modes, activities.modules
  ].map(a => getFavourite(a))

  const [dd, aid, btr] = ['DD', 'AID', 'BATTERY'].map(name => getSupplyUsages(data, name))
  const btrPerHour = divide(btr, hours)

  const totalDays = Math.max(1, getDaysBetweenDates(data.trackStart, data.trackEnd) + 1)

  return ({
    left: [
      ['Cry', formatBigNumber(data.cry)],
      ['Score', formatBigNumber(data.score)],
      ['Time', formatTime(time)],
      null,
      ['Time/Day', formatTime(time / totalDays)],
      ['Cry/Score', divide(data.cry, data.score, 2)],
      null,
      ['Cry/Hour', formatBigNumber(divide(data.cry, hours))],
      ['Kills/Hour', formatBigNumber(divide(data.kills, hours))],
      ['Score/Hour', formatBigNumber(divide(data.score, hours))],
      null, 
      ['DD/Hour', divide(dd, hours)],
      ['AID/Hour', divide(aid, hours)],
      null,
      ['BTR/Hour', batteryEnabled(new Date(data.trackEnd)) ?  `${btrPerHour} [${(btr / hours * 100 / 60).toFixed()}%]` : 'N/A'],
      null,
      ['Fav. Turret', favTurret],
      ['Fav. Hull', favHull],
    ],
    right: [
      ['Kills', formatBigNumber(data.kills)],
      ['Deaths', formatBigNumber(data.deaths)],
      ['Golds', data.gold],
      null,
      ['K/D', divide(data.kills, data.deaths, 2)],
      ['Score/Kills', divide(data.score, data.kills, 2)],
      null,
      ['Cry/7min', formatBigNumber(divide(data.cry, battles))],
      ['Kills/7min', formatBigNumber(divide(data.kills, battles))],
      ['Score/7min', formatBigNumber(divide(data.score, battles))],
      null, 
      ['DD/7min', divide(dd, battles)],
      ['AID/7min', divide(aid, battles)],
      null,
      ['Premium days', `${data.premiumDays} [${divide(data.premiumDays * 100, totalDays)}%]`],
      null,
      ['Fav. Module', favModule],
      ['Fav. Mode', favMode],
    ]
  })
}