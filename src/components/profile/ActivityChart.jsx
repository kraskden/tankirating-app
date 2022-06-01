import { useCallback, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDiffsSelector, loadDiffs } from '../../slices/diffSlice';
import { getData } from '../../util/slices';
import { SingleLineChart } from '../charts/LineChart';
import { OptionDropdown } from '../control/OptionDropdown';
import { OptionRadio } from '../control/OptionRadio';

import { Loader } from '../loader/Loaders'

import { formatBigNumber, formatHoursTime } from '../../util/format';
import { format, sub } from 'date-fns';
import { BASE_DIFF_FORMAT, DIFF_PERIODS } from '../../lib/constants';
import { DiffDateRangeSelect } from '../control/DiffDateRangeSelect';

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

const periods = DIFF_PERIODS

const properties = [
  { name: 'time', title: 'Time', formatter: (time) => time ? formatHoursTime(time) : 0 },
  { name: 'cry', title: 'Cry', formatter: formatBigNumber },
  { name: 'score', title: 'Score', formatter: formatBigNumber },
  { name: 'kd', title: 'K/D', formatter: (value) => value.toFixed(2) }
]

export function ActivityChart() {

  const defaultOffset = 30;

  function defPeriodStart(period) {
    return sub(new Date(), {[period.fnsPeriod]: defaultOffset})
  }

  const dispatch = useDispatch()
  const [property, setProperty] = useState(properties[0])

  const [period, setPeriod] = useState({
    ...periods[0],
    startDate: defPeriodStart(periods[0]),
    endDate: new Date()
  })

  function onPeriodChange(period) {
    setPeriod({
      ...period, 
      startDate: defPeriodStart(period),
      endDate: new Date()
    })
  }

  function onPeriodRangeChange(startDate, endDate) {
    const newPeriod = {
      ...period,
      startDate,
      endDate
    }
    setPeriod(newPeriod)
    dispatch(loadDiffsForPeriod(newPeriod))
  }

  function onPeriodRangeReset() {
    const newPeriod = {
      ...period, 
      startDate: defPeriodStart(period),
      endDate: new Date()
    }
    setPeriod(newPeriod)
    dispatch(loadDiffsForPeriod(newPeriod))
  }

  function loadDiffsForPeriod(period) {
    return loadDiffs({
      format: BASE_DIFF_FORMAT,
      period: period.name,
      params: {
        from: period.startDate,
        to: period.endDate
      }
    })
  }

  const loadDiffsForPeriodEvent = useCallback(() => loadDiffsForPeriod(period), [period])

  const getDiffsForPeriod = useMemo(() => (
    getDiffsSelector("base", period.name)
  ), [period])

  return (
    <Card className='mt-2 mb-4'>
      <Card.Header>
        <div className="d-flex justify-content-start ">
          <OptionRadio items={periods} onChange={onPeriodChange} />
          <div className="ms-2">
            <OptionDropdown items={properties} onChange={setProperty} />
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Loader loadEvent={loadDiffsForPeriodEvent} selector={getDiffsForPeriod}>
          <DiffChart height={300} property={property} period={period} selector={getDiffsForPeriod} />
        </Loader>
      </Card.Body>
      <Card.Footer>
        <Loader selector={getDiffsForPeriod}>
          <div className="my-2">
            <DiffDateRangeSelect
              selector={getDiffsForPeriod} 
              period={period}
              onRangeChange={onPeriodRangeChange}
              onRangeReset={onPeriodRangeReset}
            />
          </div>

        </Loader>
      </Card.Footer>
    </Card>
  )
}
