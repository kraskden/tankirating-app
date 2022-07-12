import { FullDiffChart } from "../components/charts/profile/FullDiffChart";
import { ABSOLUTE_ACTIVITY_PROPERTIES, DIFF_PERIODS } from "../lib/constants";


export function UserActivityPage() {
  return (
    <div>
      <FullDiffChart periods={DIFF_PERIODS} properties={ABSOLUTE_ACTIVITY_PROPERTIES}/>
    </div>
  )
}