import { useCallback, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getDiffsSelector, loadDiffsForDatePeriod } from '../../../slices/diffSlice';
import { OptionDropdown } from '../../control/OptionDropdown';
import { OptionRadio } from '../../control/OptionRadio';

import { Loader } from '../../loader/Loaders';

import { useDatePeriodState } from '../../../hooks/hooks';
import { DiffDateRangeSelect } from '../../control/DiffDateRangeSelect';

export function DiffChartContainer({ properties, format, additionalControls, chartComponent,
  onDataChanges, periods }) {

  const Chart = chartComponent
  const Controls = additionalControls

  const defaultOffset = 30;

  const dispatch = useDispatch()
  const [property, setProperty] = useState(properties[0])

  const [datePeriod, setDatePeriod] = useDatePeriodState(periods[0], defaultOffset)

  function onPeriodChange(period) {
    setDatePeriod(period)
    onDataChanges && onDataChanges()
  }

  function onPeriodRangeChange(startDate, endDate) {
    const newPeriod =  setDatePeriod(datePeriod, startDate, endDate)
    dispatch(loadDiffsForDatePeriod(newPeriod, format))
    onDataChanges && onDataChanges()
  }

  function onPeriodRangeReset() {
    const newPeriod = setDatePeriod(datePeriod)
    dispatch(loadDiffsForDatePeriod(newPeriod, format))
    onDataChanges && onDataChanges()
  }


  const loadDiffsForPeriodEvent = useCallback(() => loadDiffsForDatePeriod(datePeriod, format), [datePeriod, format])

  const getDiffsForPeriod = useMemo(() => (
    getDiffsSelector(format.toLowerCase(), datePeriod.name)
  ), [datePeriod, format])

  return (
    <Card className='mt-2 mb-4'>
      <Card.Header>
        <div className="d-flex flex-wrap justify-content-start " style={{gap: '10px 10px'}}>
          <OptionRadio items={periods} onChange={onPeriodChange} />
          <div className="">
            <OptionDropdown items={properties} onChange={setProperty} />
          </div>
          {additionalControls ? 
            <Loader selector={getDiffsForPeriod} loader={<></>}>
              <Controls selector={getDiffsForPeriod}
                property={property} period={datePeriod} />
            </Loader> : <></>
          }
        </div>
      </Card.Header>
      <Card.Body>
        <Loader loadEvent={loadDiffsForPeriodEvent} selector={getDiffsForPeriod}>
          <Chart property={property} period={datePeriod} selector={getDiffsForPeriod} />
        </Loader>
      </Card.Body>
      <Card.Footer>
        <Loader selector={getDiffsForPeriod} loader={<></>}>
          <div className="my-2">
            <DiffDateRangeSelect
              selector={getDiffsForPeriod}
              period={datePeriod}
              onRangeChange={onPeriodRangeChange}
              onRangeReset={onPeriodRangeReset}
            />
          </div>
        </Loader>
      </Card.Footer>
    </Card>
  )
}
