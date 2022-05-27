import { useCallback, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDiffsSelector, loadDiffs } from '../../slices/diffSlice';
import { getData } from '../../util/slices';
import { SingleLineChart } from '../charts/LineChart';
import { OptionDropdown } from '../control/OptionDropdown';
import { OptionRadio } from '../control/OptionRadio';

import { Loader } from '../loader/Loaders'

import { BsCalendar3, BsArrowCounterclockwise } from 'react-icons/bs';
import { formatBigNumber, formatHoursTime, formatTime } from '../../util/format';
import moment from 'moment';

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

const periods = [
  { name: 'day', title: 'Daily', formatter: (time) => moment(time).format('DD/MM') },
  { name: 'week', title: 'Weekly', formatter: (time) => moment(time).format('DD/MM') },
  { name: 'month', title: 'Monthly', formatter: (time) => moment(time).format('MM/YY') },
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
      <Card.Footer className='d-flex align-items-baseline'>
        <p className="fs-4">01.04.2020 - 01.04.2022</p>
        <BsCalendar3 className='ms-2 fs-5' />
        <BsArrowCounterclockwise className='ms-2 fs-5' />

      </Card.Footer>
    </Card>
  )
}
