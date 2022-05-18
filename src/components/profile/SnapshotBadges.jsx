import { Card } from "react-bootstrap";
import { CryBadge, KdBadge, ScoreBadge, TimeBadge } from "../profile/Badges"

export function SnapshotBadges({ snapshot }) {
  return (
    <div className="d-flex justify-content-center">
      <CryBadge cry={snapshot.cry} />
      <ScoreBadge score={snapshot.score} />
      <KdBadge kills={snapshot.kills} deaths={snapshot.deaths} />
      <TimeBadge time={snapshot.time} />
    </div>
  )
}