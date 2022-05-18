import { FormLabel } from "react-bootstrap"
import { formatBigNumber } from "../util/number"

function getFavourite(activities) {
  return activities.reduce((acc, curr) => {
    return acc.time > curr.time ? acc : curr
  }, {
    name: "N/A",
    time: 0
  }).name
}

function divide(a, b, roundDigits) {
  return b == 0 ? 'N/A' : `${(a/b).toFixed(roundDigits)}`
}

export function makeAllTimeSummary(data) {
  const {time, activities} = data

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