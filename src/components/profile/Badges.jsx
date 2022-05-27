import { Badge } from 'react-bootstrap'
import { matcher } from '../../lib/matcher'
import { formatTime, truncateBigNumber } from '../../util/format'

function UserBadge({ bg, name, value, abbr }) {
  const content = (
    <>
      {name && <span className="me-3 user-select-none">
        {name}
      </span>}
      <span className='user-select-none'>
        {value}
      </span>
    </>
  )
  return (
    <Badge pill bg={bg} className="fs-6 me-2 shadow-sm my-2">
      {abbr ? <abbr title={abbr}>{content}</abbr> : content}
    </Badge>
  )
}

const cryBgMatcher = matcher(["warning", [1000000], "secondary", [10000000], "success", [20000000], "dark"])

export function CryBadge({ cry, bg }) {

  return <UserBadge bg={bg || cryBgMatcher(cry)} name="CRY" value={truncateBigNumber(cry)}/>

}


const kdBgMatcher = matcher(["danger", [1], "warning", [1.3], "secondary", [1.5], "success", [3], "dark", [10], "danger"])

export function KdBadge({ kills, deaths, bg }) {

  const kd = Math.round(kills * 100 / deaths) / 100

  return <UserBadge bg={bg || kdBgMatcher(kd)} name="K/D" value={kd} />

}

const scoreBgMatcher = matcher(["warning", [1600000], "secondary", [10000000], "success", [20000000], "dark"])

export function ScoreBadge({ score, bg }) {

  return <UserBadge bg={bg || scoreBgMatcher(score)} name="Score" value={truncateBigNumber(score)} />

}

const timeBgMatcher = matcher(["danger", [25], "warning", [100], "secondary", [1000], "success", [2000], "dark"])

export function TimeBadge({ time, bg }) {

  const hours = Math.round(time / 3600)

  return <UserBadge bg={bg || timeBgMatcher(hours)} name="Time" value={`${hours}h`} />

}

const premiumMatcher = matcher(["secondary", [0.25], "info", [0.5], "success", [0.75], "primary", [0.95], "dark"])

export function PremiumBadge({ premiumDays, totalDays, bg }) {
  const premiumPercent = (premiumDays * 100 / totalDays).toFixed()
  return <UserBadge bg={bg || premiumMatcher(premiumPercent / 100)} name="PREM " value={`${premiumPercent}%`} />
}

const timePerDayMatcher = matcher(["danger", [7 * 60], "warning", [15 * 60], "secondary", [60 * 60], "success", [120 * 60], "dark"])

export function TimePerDayBadge({time, totalDays, bg}) {
  const secondsPerDay = time / totalDays

  console.log(secondsPerDay)

  return <UserBadge bg={bg || timePerDayMatcher(secondsPerDay)}
   value={`≈ ${formatTime(secondsPerDay)}/day`} />
}

export const ddPhBgMatcher = matcher(["danger", [25], "warning", [50], "secondary", [100], "success", [300], "dark"])
export const btrPhBgMatcher = matcher(["danger", [5], "warning", [30], "secondary", [45], "success", [55], "dark"])
export const cryPhBgMatcher = matcher(["danger", [5000], "warning", [10000], "secondary", [15000], "success", [25000], "dark"])
export const scorePhBgMatcher = cryPhBgMatcher
export const killsPhBgMatcher = matcher(["danger", [150], "warning", [175], "secondary" [225], "success", [250], "dark"])

export function PerHourBadge({ value, time, valueTitle, bgMatcher }) {
  const valuePh = (value * 3600 / time).toFixed()
  const valuePerBattle = (valuePh * 7 / 60).toFixed(0)

  const abbr = `${valueTitle}/7min:  ${valuePerBattle}`

  const bg = bgMatcher ? (bgMatcher instanceof Function ? bgMatcher(valuePh) : bgMatcher) : "secondary"
  return <UserBadge bg={bg} name={`${valueTitle}/H`} value={truncateBigNumber(valuePh)} abbr={abbr}/>
}