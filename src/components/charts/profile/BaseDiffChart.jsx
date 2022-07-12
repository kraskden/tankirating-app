import { useSelector } from "react-redux"
import { BASE_DIFF_FORMAT, DIFF_PERIODS, TRACK_PROPERTIES } from "../../../lib/constants"
import { formatBigNumber, formatHoursTime } from "../../../util/format"
import { getData } from "../../../util/slices"
import { SingleLineChart } from "../base/LineChart"
import { DiffChartContainer } from "../container/DiffChartContainer"

function Chart({ height, property, period, selector }) {

  const diffData = useSelector(getData(selector))

  const chartData = diffData.map(d => ({
    periodStart: new Date(d.periodStart),
    value: d[property.name]
  }))

  return (
    <SingleLineChart height={height} data={chartData} xKey='periodStart' yKey='value'
      yFormatter={property.tickFormatter} xFormatter={period.formatter} />
  )

}

const properties = TRACK_PROPERTIES

export function BaseDiffChart() {

  const chartWrapper = ({ property, period, selector }) => (
    <Chart height={300} property={property} period={period} selector={selector} />
  )

  return (
    <DiffChartContainer
      periods={DIFF_PERIODS}
      format={BASE_DIFF_FORMAT}
      properties={properties}
      chartComponent={chartWrapper}
    />
  )
}