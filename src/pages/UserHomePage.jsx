import { ActivityChart } from "../components/profile/ActivityChart"
import { SnapshotView } from "../components/profile/SnapshotView"
import { HeatMap } from "../components/profile/HeatMap"


export default function UserHomePage() {


  return (
    <div>
      <SnapshotView />
      <HeatMap initialYear={new Date().getUTCFullYear()}/>
      <ActivityChart />
    </div>
  )
}