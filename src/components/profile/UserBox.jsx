import { Card, ProgressBar, Row } from "react-bootstrap"
import { useData } from "../../hooks/hooks";

import { getSnapshot } from "../../slices/snapshotSlice";
import { getTarget } from "../../slices/targetSlice";
import { getRank, getRankPercent } from "../../lib/ranks";
import { toHumanDate, toHumanDateTime } from "../../util/format";


export const UserBox = () => {

  const user = useData(getTarget)
  const snapshot = useData(getSnapshot)

  const percent = getRankPercent(snapshot.score)

  return (
    <Card className="px-2 ">
      <Card.Body>
        <div className="row mb-1">
          <div className="col px-0">
            <div>
              <Card.Title className="d-inline fs-4 me-2" >{user.name}</Card.Title>
              <Card.Subtitle className="d-inline text-muted fs-6">{getRank(snapshot.score)}</Card.Subtitle>
            </div>
          </div>
          <div className="col px-0 my-auto ">
            <Card.Subtitle className="d-inline float-end align-middle text-muted fs-6">Updated: {toHumanDateTime(snapshot.timestamp)}</Card.Subtitle>
          </div>
        </div>
        <div className="row">
          <ProgressBar className="px-0" now={percent} label={`${percent}%`} /> 
        </div>
      </Card.Body>
    </Card>
  )

}