import { useSelector } from 'react-redux';
import { getData } from '../../util/slices';
import { DatePeriodRangeSelect } from './DatePeriodRangeSelect';

export function DiffDateRangeSelect({ period, selector, onRangeChange, onRangeReset }) {

  const diffData = useSelector(getData(selector))
  const diffPresented = diffData && diffData.length 

  const bg = diffPresented ? 'secondary' : 'danger';

  return (
    <DatePeriodRangeSelect 
      datePeriod={period}
      bg={bg}
      onRangeChange={onRangeChange}
      onRangeReset={onRangeReset}
    />
  )

}