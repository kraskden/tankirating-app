import { Card, ProgressBar, Row } from "react-bootstrap"
import { useData } from "../../hooks/hooks";

import { getSnapshot } from "../../slices/snapshotSlice";
import { getTarget } from "../../slices/targetSlice";
import { getRank, getRankPercent } from "../../util/ranks";


export const UserBox = () => {

  const user = useData(getTarget)
  const snapshot = useData(getSnapshot)

  const percent = getRankPercent(snapshot.score)

  return (
    <Card>
      <Card.Body>
        <div className="mb-2 ">
          <Card.Title className="d-inline fs-4 me-2" >{user.name}</Card.Title>
          <Card.Subtitle className="d-inline text-muted fs-6">{getRank(snapshot.score)}</Card.Subtitle>
          <Card.Subtitle className="float-end d-inline mt-1 text-muted fs-6 text-end">Updated: {snapshot.timestamp}</Card.Subtitle>
        </div>
        <ProgressBar now={percent} label={`${percent}%`} />
      </Card.Body>
    </Card>
  )

}