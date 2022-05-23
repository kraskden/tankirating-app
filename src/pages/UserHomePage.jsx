import { ActivityChart } from "../components/profile/ActivityChart"
import { SnapshotView } from "../components/profile/SnapshotView"
import { TimeHeatMap } from "../components/profile/TimeHeatMap"


export default function UserHomePage() {


  return (
    <div>
      <SnapshotView />
      <TimeHeatMap initialYear={new Date().getUTCFullYear()}/>
      <ActivityChart />
    </div>
  )
}