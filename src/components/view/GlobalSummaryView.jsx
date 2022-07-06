import { useSelector } from "react-redux";
import { GLOBAL_SUMMARY_CHART_PROPERTIES } from "../../lib/constants";
import { getData } from "../../util/slices";
import { SummaryCharts } from "../charts/profile/SummaryCharts";


export function GlobalSummaryView({selector}) {

  const summary = useSelector(getData(selector))

  return (
    <div className="mb-5">
      <SummaryCharts summary={summary} properties={GLOBAL_SUMMARY_CHART_PROPERTIES} />
    </div>
  )

}