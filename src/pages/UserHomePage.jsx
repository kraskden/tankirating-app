import { SnapshotView } from "../components/view/SnapshotView"
import { HeatMap } from "../components/profile/HeatMap"
import { BaseDiffChart } from "../components/charts/profile/BaseDiffChart"


export default function UserHomePage() {

  return (
    <div>
      <SnapshotView />
      <HeatMap initialYear={new Date().getUTCFullYear()}/>
      <BaseDiffChart />
    </div>
  )
}