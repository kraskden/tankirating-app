import { useCallback, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getDiffsSelector, loadDiffs } from '../../../slices/diffSlice';
import { OptionDropdown } from '../../control/OptionDropdown';
import { OptionRadio } from '../../control/OptionRadio';

import { Loader } from '../../loader/Loaders'

import { sub } from 'date-fns';
import { DIFF_PERIODS } from '../../../lib/constants';
import { DiffDateRangeSelect } from '../../control/DiffDateRangeSelect';

const periods = DIFF_PERIODS

export function DiffChartContainer({properties, format, additionalControls, chartComponent, 
  onDataChanges }) {

  const Chart = chartComponent
  const Controls = additionalControls

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
    onDataChanges && onDataChanges()
  }

  function onPeriodRangeChange(startDate, endDate) {
    const newPeriod = {
      ...period,
      startDate,
      endDate
    }
    setPeriod(newPeriod)
    dispatch(loadDiffsForPeriod(newPeriod))
    onDataChanges && onDataChanges()

  }

  function onPeriodRangeReset() {
    const newPeriod = {
      ...period, 
      startDate: defPeriodStart(period),
      endDate: new Date()
    }
    setPeriod(newPeriod)
    dispatch(loadDiffsForPeriod(newPeriod))
    onDataChanges && onDataChanges()

  }

  function loadDiffsForPeriod(period) {
    return loadDiffs({
      format: format.toUpperCase(),
      period: period.name,
      params: {
        from: period.startDate,
        to: period.endDate
      }
    })
  }

  const loadDiffsForPeriodEvent = useCallback(() => loadDiffsForPeriod(period), [period])

  const getDiffsForPeriod = useMemo(() => (
    getDiffsSelector(format.toLowerCase(), period.name)
  ), [period])

  return (
    <Card className='mt-2 mb-4'>
      <Card.Header>
        <div className="d-flex justify-content-start ">
          <OptionRadio items={periods} onChange={onPeriodChange} />
          <div className="ms-2">
            <OptionDropdown items={properties} onChange={setProperty} />
          </div>
          {additionalControls ? <Controls selector={getDiffsForPeriod} /> : <></>}
        </div>
      </Card.Header>
      <Card.Body>
        <Loader loadEvent={loadDiffsForPeriodEvent} selector={getDiffsForPeriod}>
          <Chart property={property} period={period} selector={getDiffsForPeriod} />
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
