import { Badge, Card, Spinner } from "react-bootstrap"

import { useSelector } from "react-redux";
import { getSnapshot } from "../../slices/snapshotSlice";
import { SnapshotBadges } from "../profile/badges/SnapshotBadges"
import { SummaryTable } from "../profile/summary_table/SummaryTable"

import { makePieTimeData } from "../../lib/chart"
import { makeAllTimeSummary } from "../../lib/summary"
import { getData } from "../../util/slices"
import { EmbeddedPieChart } from "../charts/base/EmbeddedPieChart";

export function SnapshotView() {

  const snapshot = useSelector(getData(getSnapshot))

  const { turrets, hulls, modes, modules } = snapshot.activities

  const pieActivities = [
    { name: "Turrets", activity: turrets, countLimit: 10 },
    { name: "Hulls", activity: hulls, countLimit: 5 },
    { name: "Modules", activity: modules, countLimit: 10 },
    { name: "Modes", activity: modes, countLimit: 5 }
  ]

  return (
    <Card className="mt-3 shadow-sm">
      <Card.Header className="py-0">
        <SnapshotBadges snapshot={snapshot} />
      </Card.Header>
      <Card.Body>
        <div className="row mt-2">
          <SummaryTable  {...makeAllTimeSummary(snapshot)} />
        </div>
        <div className="row mt-4 justify-content-center">
          {pieActivities.map(stat => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 px-2" key={stat.name} 
              style={{maxHeight: '320px'}}>
              <div className="fs-6 text-center">
                <span className="fw-bold">{stat.name}</span>
              </div>
              <EmbeddedPieChart data={makePieTimeData(stat.activity, stat.countLimit)} />

            </div>
          ))}
        </div>

      </Card.Body>
    </Card>

  )

}