import { useSelector } from "react-redux"
import { BASE_DIFF_FORMAT } from "../../../lib/constants"
import { formatBigNumber, formatHoursTime } from "../../../util/format"
import { getData } from "../../../util/slices"
import { SingleLineChart } from "../../charts/LineChart"
import { DiffChartContainer } from "./DiffChartContainer"

function Chart({ height, property, period, selector }) {

  const diffData = useSelector(getData(selector))

  const chartData = diffData.map(d => ({
    periodStart: d.periodStart,
    value: d[property.name]
  }))

  return (
    <SingleLineChart height={height} data={chartData} xKey='periodStart' yKey='value' options={{
      yFormatter: property.formatter,
      xFormatter: period.formatter
    }} />
  )

}

const properties = [
  { name: 'time', title: 'Time', formatter: (time) => time ? formatHoursTime(time) : 0 },
  { name: 'cry', title: 'Cry', formatter: formatBigNumber },
  { name: 'score', title: 'Score', formatter: formatBigNumber },
  { name: 'kd', title: 'K/D', formatter: (value) => value.toFixed(2) }
]


export function BaseDiffChart() {

  const chartWrapper = ({ property, period, selector }) => (
    <Chart height={300} property={property} period={period} selector={selector} />
  )

  return (
    <DiffChartContainer
      format={BASE_DIFF_FORMAT}
      properties={properties}
      chartComponent={chartWrapper}
    />
  )
}