import {Badge} from 'react-bootstrap'

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

export function CryBadge({cry}) {

  function makeBg(cry) {
    if (cry > 20000000) {
      return "dark"
    } else if (cry > 10000000) {
      return "success"
    } else if (cry < 1000000) {
      return "warning"
    } else {
      return "secondary"
    }
  }
  
  return <UserBadge bg={makeBg(cry)} name="CRY" value={makeBigNumberTitle(cry)}/>

}

export function KdBadge({kills, deaths}) {

  const kd = Math.round(kills * 100 / deaths) / 100

  function makeBg() {
    if (kd < 1 || kd > 10) {
      return "danger"
    } else if (kd < 1.3) {
      return "warning"
    } else if (kd > 3) {
      return "dark"
    } else if (kd > 1.5) {
      return "success"
    } else {
      return "secondary"
    }
  }

  return <UserBadge bg={makeBg()} name="K/D" value={kd} />

}

export function ScoreBadge({score}) {

  function makeBg() {
    if (score < 1600000) {
      return "warning"
    } else if (score > 20000000) {
      return "dark"
    } else if (score > 10000000) {
      return "success"
    } else {
      return "secondary"
    }
  }

  return <UserBadge bg={makeBg()} name="Score" value={makeBigNumberTitle(score)} />

}

export function TimeBadge({time}) {

  const hours = Math.round(time / 3600)

  function makeBg() {
    if (hours < 100) {
      return "danger"
    } else if (hours > 2000) {
      return "dark"
    } else if (hours > 1000) {
      return "success"
    } else {
      return "secondary"
    }
  }

  return <UserBadge bg={makeBg()} name="Time" value={`${hours}h`} /> 

}