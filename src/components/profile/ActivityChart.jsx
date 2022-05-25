import { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDiffs, loadDiffsByOffsets } from '../../slices/diffSlice';
import { getData } from '../../util/slices';
import { SingleLineChart } from '../charts/LineChart';
import { OptionDropdown } from '../control/OptionDropdown';
import { OptionRadio } from '../control/OptionRadio';

import { SpinnerLoader } from '../loader/Loaders'

import {BsCalendar3, BsArrowCounterclockwise} from 'react-icons/bs';

function DiffChart({ height, property }) {

  const diffData = useSelector(getData(getDiffs))

  const chartData = diffData.map(d => ({
    periodStart: d.periodStart,
    value: d[property]
  }))

  return (
    <SingleLineChart height={height} data={chartData} xKey='periodStart' yKey='value'/>
  )

}

const periods = [
  { name: 'day', title: 'Daily' },
  { name: 'week', title: 'Weekly' },
  { name: 'month', title: 'Monthly' },
]

const properties = [
  { name: 'time', title: 'Time' },
  { name: 'cry', title: 'Cry' },
  { name: 'score', title: 'Score' },
  { name: 'kd', title: 'K/D' }
]

export function ActivityChart() {

  const [property, setProperty] = useState(properties[0].name)

  const loadDiffs = () => loadDiffsByOffsets({
    offsetFrom: 30,
    offsetTo: 0
  })

  return (
    <Card className='mt-2 mb-4'>
      <Card.Header>
        <div className="d-flex justify-content-start ">
          <OptionRadio items={periods} />
          <div className="ms-2">
            <OptionDropdown items={properties} onChange={setProperty}/>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <SpinnerLoader loadEvent={loadDiffs} selector={getDiffs}>
          <DiffChart height={300} property={property} />
        </SpinnerLoader>
      </Card.Body>
      {/* <Card.Footer className='d-flex align-items-baseline'>
        <p className="fs-4">01.04.2020 - 01.04.2022</p>
        <BsCalendar3 className='ms-2 fs-5'/>
        <BsArrowCounterclockwise className='ms-2 fs-5'/>

        <div className='d-flex ms-auto align-items-baseline justify-content-end'>
          <Form.Control autoComplete='off' type='number' className='me-2 w-25' defaultValue={30}/>
          <p className="fs-5">records </p>
        </div>
      </Card.Footer> */}
    </Card>
  )
}