import { Badge, Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { EmbeddedPieChart } from "../components/charts/EmbeddedPieChart"
import { SnapshotBadges } from "../components/profile/SnapshotBadges"
import { SummaryTable } from "../components/profile/summary/SummaryTable"
import { makePieTimeData } from "../lib/chart"
import { makeAllTimeSummary } from "../lib/summary"
import { getSnapshot } from "../slices/snapshotSlice"
import { getData } from "../util/slices"


export default function UserHomePage() {

  const snapshot = useSelector(getData(getSnapshot))

  const { turrets, hulls, modes, modules } = snapshot.activities

  const pieActivities = [
    { name: "Turrets", activity: turrets, countLimit: 10 },
    { name: "Hulls", activity: hulls, countLimit: 5 },
    { name: "Modules", activity: modules, countLimit: 10 },
    { name: "Modes", activity: modes, countLimit: 5 }
  ]

  return (
    <div>
      <Card className="mt-3 shadow-sm">
        <Card.Header>
          <SnapshotBadges snapshot={snapshot} />
        </Card.Header>
        <Card.Body>
          <div className="row mt-2">
            <SummaryTable  {...makeAllTimeSummary(snapshot)} />
          </div>
          <div className="row mt-4 justify-content-center">
            {pieActivities.map(stat => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 px-2">
                <div className="fs-6 text-center">
                  <span className="fw-bold">{stat.name}</span>
                </div>
                <EmbeddedPieChart key={stat.name} data={makePieTimeData(stat.activity, stat.countLimit)} />

              </div>
            ))}
          </div>

        </Card.Body>
      </Card>
    </div>
  )
}