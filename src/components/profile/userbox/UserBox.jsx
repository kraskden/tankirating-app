import { Card, ProgressBar } from "react-bootstrap"
import { useData } from "../../../hooks/hooks";

import { getSnapshot } from "../../../slices/snapshotSlice";
import { getTarget } from "../../../slices/targetSlice";
import { getRankPercent } from "../../../lib/ranks";
import { UserInfo } from "./UserInfo";
import { DisabledAlert } from "./DisabledAlert";
import { UpdatedInfo } from "./UpdatedInfo";


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
        {user.status === 'DISABLED' && <DisabledAlert user={user} />}
      </Card.Body>
    </Card>
  )

}