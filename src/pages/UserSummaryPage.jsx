import { startOfDay } from "date-fns";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangeSelect } from "../components/control/DateRangeSelect";
import { PeriodOffsetSelect } from "../components/control/period/PeriodOffsetSelect";
import { PeriodSelectContainer } from "../components/control/period/PeriodSelectContainer";
import { Loader } from "../components/loader/Loaders";
import { SummaryNoData, SummaryView } from "../components/view/SummaryView";
import { usePeriodWithOffsetState } from "../hooks/hooks";
import { TRACK_PERIODS } from "../lib/constants";
import { erasePeriod, getSummarySelector, loadCustomSummary, loadSummary } from '../slices/summarySlice';
import { getData } from "../util/slices";
import { getInitOffsetMap } from "../util/util";

const periods = [
  ...TRACK_PERIODS,
  { name: 'custom', title: 'Custom', idleLoader: <></> }
]

const defaultPeriod = periods[2]
const defaultOffsets = getInitOffsetMap(periods)

export function UserSummaryPage() {

  const dispatch = useDispatch()

  const {offset, period, setOffset, setPeriod, changeOffset, changeDate} = usePeriodWithOffsetState(defaultPeriod, periods)

  const [customRange, setCustomRange] = useState({})

  const summarySelector = getSummarySelector(period.name, offset)
  const summaryLoader = useCallback(() => {
    if (period.name !== 'custom') {
      return loadSummary({ period: period.name, offset })
    }
  }, [period, offset])

  function onCustomDatesChange(from, to) {
    setCustomRange({ from, to })
    dispatch(loadCustomSummary({ from, to }))
  }

  function onCustomDatesReset() {
    setCustomRange({})
    dispatch(erasePeriod({ name: 'custom' }))
  }

  const ErrorSummaryControlWrapper = ({ error }) => (
    <ErrorSummaryControl error={error} onOffsetChange={changeOffset} onDateChange={changeDate} period={period} />
  )

  const resetDisabled = period.name === 'custom' || offset === 0;

  const ExtraControl = ({period}) => ( period.name === 'custom' ?
    <div className="d-flex mt-2 justify-content-center">
      <DateRangeSelect
        onReset={onCustomDatesReset}
        // hideReset={true}
        selectedStartDate={customRange.from}
        selectedEndDate={customRange.to}
        onChange={onCustomDatesChange}
      />
    </div> : null)

  return (
    <>
      <PeriodSelectContainer periods={periods} period={period} onPeriodChange={setPeriod}
        extraControl={ExtraControl} isResetDisabled={resetDisabled} onReset={() => setOffset(0)}
      >
        <Loader loadEvent={summaryLoader} selector={summarySelector} idleLoader={period.idleLoader}
          errorHandler={ErrorSummaryControlWrapper}>
          <LoadedSummaryControl selector={summarySelector}
            onOffsetChange={changeOffset} onDateChange={changeDate} period={period} />
        </Loader>
      </PeriodSelectContainer>
      <Loader selector={summarySelector} errorHandler={SummaryNoData} loader={<></>}>
        <SummaryView selector={summarySelector} />
      </Loader>
    </>
  )
}

function ErrorSummaryControl({ error, period, ...rest }) {
  return <PeriodOffsetSelect from={error.args.periodStart} to={error.args.periodEnd}
    navigationDisabled={period.name === 'custom'} period={period} {...rest} />
}

function LoadedSummaryControl({ selector, period, ...rest }) {
  const summary = useSelector(getData(selector))

  return <PeriodOffsetSelect from={summary.trackStart} to={summary.trackEnd}
    navigationDisabled={period.name === 'custom'} period={period} {...rest} />
}
