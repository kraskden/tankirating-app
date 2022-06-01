import { useSelector } from 'react-redux';
import { getData } from '../../util/slices';
import { DateRangeSelect } from "./DateRangeSelect";

export function DiffDateRangeSelect({ period, selector, onRangeChange, onRangeReset }) {

  const diffData = useSelector(getData(selector))
  const diffPresented = diffData && diffData.length 

  const bg = diffPresented ? 'secondary' : 'danger';

  return (
    <DateRangeSelect
      selectedStartDate={new Date(period.startDate)}
      selectedEndDate={new Date(period.endDate)}
      bg={bg}
      onReset={onRangeReset}
      onChange={onRangeChange}
      showMonths={period.name === 'month'}
      maxDate={new Date()}
      // TODO: min date
    />
  )

}