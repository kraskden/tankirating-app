import { SnapshotView } from "../components/view/SnapshotView"
import { HeatMap } from "../components/profile/heatmap/HeatMap"
import { BaseDiffChart } from "../components/charts/profile/BaseDiffChart"


export default function UserHomePage() {

  return (
    <div style={{overflowX: 'hidden'}}>
      <SnapshotView />
      <HeatMap initialYear={new Date().getUTCFullYear()}/>
      <BaseDiffChart />
    </div>
  )
}