import { Badge, Card, ProgressBar, Row } from "react-bootstrap"
import { useData } from "../../hooks/hooks";

import { getSnapshot } from "../../slices/snapshotSlice";
import { getTarget } from "../../slices/targetSlice";
import { getRank, getRankPercent } from "../../lib/ranks";
import { toHumanDate, toHumanDateTime } from "../../util/format";
import { matcher } from "../../lib/matcher";
import { differenceInHours } from "date-fns";


const UPDATER_MATCHER = matcher(["text-success", [4], "text-muted", [24], "text-danger", [24 * 7], "text-danger fw-bold"])

const STATUSES = {
  'ACTIVE': {
    bg: 'success',
    title: 'Active'
  },
  'FROZEN': {
    bg: 'primary',
    title: 'Frozen'
  },
  'DISABLED': {
    bg: 'danger',
    title: 'Disabled'
  }
}

const UpdatedInfo = ({ user, snapshot }) => {
  const fontClass = UPDATER_MATCHER(differenceInHours(new Date(), new Date(snapshot.timestamp)))
  return (
    <>
      <Card.Subtitle className={`d-inline float-end align-middle ${fontClass} fs-6`}>
        <span className="d-none d-md-inline">Updated: {toHumanDateTime(snapshot.timestamp)}</span>
        <Badge pill bg={STATUSES[user.status].bg} className="fs-6 ms-2 ">
          {STATUSES[user.status].title}
        </Badge>
      </Card.Subtitle>

    </>
  )
}

const UserInfo = ({ user, snapshot }) => {
  return (
    <div>
      <Card.Title className="d-inline fs-4 me-2" >{user.name}</Card.Title>
      <Card.Subtitle className="d-inline text-muted fs-6">{getRank(snapshot.score)}</Card.Subtitle>
    </div>
  )
}

export const UserBox = () => {

  const user = useData(getTarget)
  const snapshot = useData(getSnapshot)

  const percent = getRankPercent(snapshot.score)

  return (
    <Card className="px-2 ">
      <Card.Body>
        <div className="row mb-1">
          <div className="col px-0">
            <UserInfo user={user} snapshot={snapshot} />
          </div>
          <div className="col px-0 my-auto">
            <UpdatedInfo user={user} snapshot={snapshot} />
          </div>
        </div>
        <div className="row">
          <ProgressBar className="px-0" now={percent} label={`${percent}%`} />
        </div>
      </Card.Body>
    </Card>
  )

}