import { Card } from "react-bootstrap"
import { getRank } from "../../../lib/ranks"

export const UserInfo = ({ user, snapshot }) => {
  return (
    <div className="d-flex align-items-baseline mb-1">
      <div className="d-flex align-items-baseline">
        <Card.Title className="d-inline fs-4 me-2 my-0" >{user.name}</Card.Title>
        <Card.Subtitle className="d-inline text-muted fs-6 my-0">{getRank(snapshot.score)}</Card.Subtitle>
      </div>
    </div>
  )
}
