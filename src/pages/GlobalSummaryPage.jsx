import { useDispatch } from 'react-redux'
import { PeriodSelectContainer } from '../components/control/period/PeriodSelectContainer'
import { ErrorSummaryControl, LoadedSummaryControl } from '../components/control/summary/SummaryControls'
import { Loader } from '../components/loader/Loaders'
import { GlobalSummaryView } from '../components/view/GlobalSummaryView'
import { SummaryNoData } from '../components/view/SummaryView'
import { usePeriodWithOffsetState } from '../hooks/hooks'
import { GLOBAL_TRACK_PERIODS } from '../lib/constants'
import { getSummarySelector, loadGlobalSummary, loadSummary } from '../slices/summarySlice'

const periods = GLOBAL_TRACK_PERIODS
const defaultPeriod = periods[1]

export function GlobalSummaryPage() {

  const { offset, period, setOffset, setPeriod, changeOffset, changeDate } = usePeriodWithOffsetState(defaultPeriod, periods)

  const summarySelector = getSummarySelector(period.name, offset)
  const summaryLoader = () => loadGlobalSummary({ period: period.name, offset })

  const ErrorSummaryControlWrapper = ({ error }) => (
    <ErrorSummaryControl error={error} onOffsetChange={changeOffset} onDateChange={changeDate} period={period} />
  )

  return (
    <>
      <PeriodSelectContainer periods={periods} period={period} onPeriodChange={setPeriod}
        isResetDisabled={offset === 0} onReset={() => setOffset(0)} >
        <Loader loadEvent={summaryLoader} selector={summarySelector} errorHandler={ErrorSummaryControlWrapper}>
          <LoadedSummaryControl selector={summarySelector} 
            onOffsetChange={changeOffset} onDateChange={changeDate} period={period} />
        </Loader>
      </PeriodSelectContainer>
      <Loader selector={summarySelector} errorHandler={SummaryNoData} loader={<></>}>
        <GlobalSummaryView selector={summarySelector} />
      </Loader>
    </>
  )
}