import { useSelector } from "react-redux"
import { getData } from "../../../util/slices"
import { PeriodOffsetSelect } from "../period/PeriodOffsetSelect"

export function ErrorSummaryControl({ error, period, ...rest }) {
  return <PeriodOffsetSelect from={error.args.periodStart} to={error.args.periodEnd}
    navigationDisabled={period.name === 'custom'} period={period} {...rest} />
}

export function LoadedSummaryControl({ selector, period, ...rest }) {
  const summary = useSelector(getData(selector))

  return <PeriodOffsetSelect from={summary.trackStart} to={summary.trackEnd}
    navigationDisabled={period.name === 'custom' || period.name === 'all_time'} period={period} {...rest} />
}
