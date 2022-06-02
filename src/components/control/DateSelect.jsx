import { getDay } from 'date-fns'
import ReactDatePicker from 'react-datepicker'
import { DEFAULT_DATEPICKER_PARAMS } from '../../lib/constants'



export function DateSelect({ minDate, maxDate, value, onChange,
   scale, customInput }) {

  function filterWeeks(date) {
    const day = getDay(date)
    return day === 1;
  }

  const datePickerParams = {
    ...DEFAULT_DATEPICKER_PARAMS,
    minDate, maxDate,
    customInput,
    showMonthYearPicker: scale === 'month',
    showYearPicker: scale === 'year',
    filterDate: scale === 'week' ? filterWeeks : undefined,
    dateFormat: scale === 'year' ? "yyyy" : DEFAULT_DATEPICKER_PARAMS.dateFormat
  }

  return (
    <ReactDatePicker
      {...datePickerParams}
      selected={value}
      onChange={onChange}
    />
  )

}