import { useCallback, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDiffsSelector, loadDiffs } from '../../slices/diffSlice';
import { getData } from '../../util/slices';
import { SingleLineChart } from '../charts/LineChart';
import { OptionDropdown } from '../control/OptionDropdown';
import { OptionRadio } from '../control/OptionRadio';
import { DateRangeSelect } from '../control/DateRangeSelect'

import { Loader } from '../loader/Loaders'

import { formatBigNumber, formatHoursTime } from '../../util/format';
import { format } from 'date-fns';

function DiffChart({ height, property, period, selector }) {

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

function DiffDateRange({period, onRangeChange}) {

  // const diffData = useSelector(getData(selector))
  // const startDate = 

}

const periods = [
  { name: 'day', title: 'Daily', formatter: (time) => format(new Date(time), 'dd/MM') },
  { name: 'week', title: 'Weekly', formatter: (time) => format(new Date(time), 'dd/MM') },
  { name: 'month', title: 'Monthly', formatter: (time) => format(new Date(time), 'MM/yy') },
]

const properties = [
  { name: 'time', title: 'Time', formatter: (time) => time ? formatHoursTime(time) : 0 },
  { name: 'cry', title: 'Cry', formatter: formatBigNumber },
  { name: 'score', title: 'Score', formatter: formatBigNumber },
  { name: 'kd', title: 'K/D', formatter: (value) => value.toFixed(2) }
]

export function ActivityChart() {

  const defaultOffset = 30;

  const [property, setProperty] = useState(properties[0])
  const [period, setPeriod] = useState(periods[0])

  const loadDiffsForPeriod = useCallback(() => (
    loadDiffs({
      format: "base",
      period: period.name,
      params: {
        offsetFrom: defaultOffset,
        offsetTo: 0
      }
    })
  ), [period])

  const getDiffsForPeriod = useMemo(() => (
    getDiffsSelector("base", period.name)
  ), [period])

  return (
    <Card className='mt-2 mb-4'>
      <Card.Header>
        <div className="d-flex justify-content-start ">
          <OptionRadio items={periods} onChange={setPeriod} />
          <div className="ms-2">
            <OptionDropdown items={properties} onChange={setProperty} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Loader loadEvent={loadDiffsForPeriod} selector={getDiffsForPeriod}>
          <DiffChart height={300} property={property} period={period} selector={getDiffsForPeriod} />
        </Loader>
      </Card.Body>
      <Card.Footer>
        <div className="my-2">
          <DateRangeSelect
            selectedStartDate={new Date()}
            selectedEndDate={new Date()}
          />
        </div>

      </Card.Footer>
    </Card>
  )
}
