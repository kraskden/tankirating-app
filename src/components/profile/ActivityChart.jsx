import { useCallback, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDiffs, loadBaseDiffsByOffset } from '../../slices/diffSlice';
import { getData } from '../../util/slices';
import { SpinnerLoader } from '../loader/Loaders';


export function ActivityChart() {

  const [period, setPeriod] = useState("day")

  const loadPeriod = useCallback(() => {
    return loadBaseDiffsByOffset(30, 0, period)
  }, [period])

  const selectDiffs = useCallback(() => 
    getDiffs('base', period)
  , [period])

  const baseDiffs = useSelector(getData(selectDiffs()))

  return (
    <Card className='mt-2'>
      <Card.Header>
        Line chart demo
      </Card.Header>
      <Card.Body>
        <SpinnerLoader loadEvent={loadPeriod} selector={selectDiffs()}>
          {/* {baseDiffs.length} */}
        </SpinnerLoader>
      </Card.Body>
    </Card>
  )
}