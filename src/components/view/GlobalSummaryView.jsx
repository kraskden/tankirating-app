import { useSelector } from "react-redux";
import { RELATIVE_ACTIVE_PROPERTIES } from "../../lib/constants";
import { getData } from "../../util/slices";
import { SummaryCharts } from "../charts/profile/SummaryCharts";


export function GlobalSummaryView({selector}) {

  const summary = useSelector(getData(selector))

  return (
    <div className="mb-5">
      <SummaryCharts summary={summary} properties={RELATIVE_ACTIVE_PROPERTIES} />
    </div>
  )

}