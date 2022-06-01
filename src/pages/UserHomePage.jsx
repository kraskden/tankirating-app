import { SnapshotView } from "../components/view/SnapshotView"
import { HeatMap } from "../components/profile/HeatMap"
import { BaseDiffChart } from "../components/profile/diff/BaseDiffChart"


export default function UserHomePage() {

  return (
    <div>
      <SnapshotView />
      <HeatMap initialYear={new Date().getUTCFullYear()}/>
      <BaseDiffChart />
    </div>
  )
}