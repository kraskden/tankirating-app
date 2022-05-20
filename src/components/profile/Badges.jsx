import {Badge} from 'react-bootstrap'
import { matcher } from '../../lib/matcher'

function UserBadge({ bg, name, value }) {
  return (
    <Badge pill bg={bg} className="fs-6 me-2 shadow-sm">
      <span className="me-3">
        {name}
      </span>
      <span>
        {value}
      </span>
    </Badge>
  )
}

function makeBigNumberTitle(num) {
  if (num > 1000000) {
    return `${Math.round(num / 100000)/10}M`
  } else if (num > 1000) {
    return `${Math.round(num / 1000)}K`
  } else {
    return num
  }
}

const cryBgMatcher = matcher(["warning", [1000000], "secondary", [10000000], "success", [20000000], "dark"])

export function CryBadge({cry}) {
  
  return <UserBadge bg={cryBgMatcher(cry)} name="CRY" value={makeBigNumberTitle(cry)}/>

}


const kdBgMatcher = matcher(["danger", [1], "warning", [1.3], "secondary", [1.5], "success", [3], "dark", [10], "danger"])

export function KdBadge({kills, deaths}) {

  const kd = Math.round(kills * 100 / deaths) / 100

  return <UserBadge bg={kdBgMatcher(kd)} name="K/D" value={kd} />

}

const scoreBgMatcher = matcher(["warning", [1600000], "secondary", [10000000], "success", [20000000], "dark"])

export function ScoreBadge({score}) {

  return <UserBadge bg={scoreBgMatcher(score)} name="Score" value={makeBigNumberTitle(score)} />

}

const timeBgMatcher = matcher(["danger", [25], "warning", [100], "secondary", [1000], "success", [2000], "dark"])

export function TimeBadge({time}) {

  const hours = Math.round(time / 3600)

  return <UserBadge bg={timeBgMatcher(hours)} name="Time" value={`${hours}h`} /> 

}