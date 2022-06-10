import { DateRangeSelect } from "../control/DateRangeSelect";

export function DatePeriodRangeSelect({ datePeriod, bg, onRangeChange, onRangeReset }) {

  return (
    <DateRangeSelect
      selectedStartDate={new Date(datePeriod.startDate)}
      selectedEndDate={new Date(datePeriod.endDate)}
      bg={bg}
      onReset={onRangeReset}
      onChange={onRangeChange}
      showMonths={datePeriod.name === 'month'}
      maxDate={new Date()}
      // TODO: min date
    />
  )

}