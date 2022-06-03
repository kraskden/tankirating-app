import { useCallback, useMemo, useState, forwardRef } from "react";
import { Alert, Card } from "react-bootstrap";
import { OptionRadio, UncontrolledOptionRadio } from "../components/control/OptionRadio";

import { erasePeriod, getSummarySelector, loadCustomSummary, loadSummary } from '../slices/summarySlice';

import {
  BsCaretLeftFill as LeftIcon, BsCaretRightFill as RightIcon, BsFillSkipBackwardFill as LeftSkipIcon,
  BsFillSkipForwardFill as RightSkipIcon, BsArrowCounterclockwise as ResetIcon
} from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../util/slices";
import { Loader } from "../components/loader/Loaders";
import { toHumanDate } from "../util/format";
import { SummaryView, SummaryNoData } from "../components/view/SummaryView";
import { DateSelect } from "../components/control/DateSelect";
import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears, startOfDay } from "date-fns";
import classNames from "classnames";
import { DateRangeSelect } from "../components/control/DateRangeSelect";

const periods = [
  { name: 'day', title: 'Day', diffFn: differenceInDays },
  { name: 'week', title: 'Week', diffFn: differenceInWeeks },
  { name: 'month', title: 'Month', diffFn: differenceInMonths },
  { name: 'year', title: 'Year', diffFn: differenceInYears },
  { name: 'all_time', title: 'All Time' },
  { name: 'custom', title: 'Custom', idleLoader: <></> }
]

const defaultPeriod = periods[2]
const defaultOffsets = periods.reduce((acc, p) => {
  acc[p.name] = 0;
  return acc;
}, {})

export function UserSummaryPage() {

  const dispatch = useDispatch()

  const [period, setPeriod] = useState(defaultPeriod)
  const [offsets, setOffsets] = useState(defaultOffsets)

  const [customRange, setCustomRange] = useState({})

  const offset = offsets[period.name]

  const summarySelector = getSummarySelector(period.name, offset)
  const summaryLoader = useCallback(() => {
    if (period.name !== 'custom') {
      return loadSummary({ period: period.name, offset })
    }
  }, [period, offset])

  function changeOffset(delta) {
    setOffsets({
      ...offsets,
      [period.name]: offsets[period.name] + delta
    })
  }

  function setOffset(offset) {
    setOffsets({
      ...offsets,
      [period.name]: offset
    })
  }

  function changeDate(newDate) {
    if (period.diffFn) {
      const today = startOfDay(new Date())
      const offset = period.diffFn(today, newDate)
      setOffset(offset)
    }
  }

  function onCustomDatesChange(from, to) {
    setCustomRange({ from, to })
    dispatch(loadCustomSummary({from, to}))
  }

  function onCustomDatesReset() {
    setCustomRange({})
    dispatch(erasePeriod({name: 'custom'}))
  }

  const ErrorSummaryControlWrapper = ({ error }) => (
    <ErrorSummaryControl error={error} onOffsetChange={changeOffset} onDateChange={changeDate} period={period} />
  )

  const resetClassNames = classNames({
    invisible: period.name === 'custom' || offset === 0
  })

  return (
    <>
      <Card className="mt-2">
        <Card.Header>
          <div className="d-flex justify-content-center">
            <UncontrolledOptionRadio items={periods} item={period} onChange={setPeriod} />
          </div>
          {period.name === 'custom' &&
            <div className="d-flex mt-2 justify-content-center">
              <DateRangeSelect
                onReset={onCustomDatesReset}
                // hideReset={true}
                selectedStartDate={customRange.from}
                selectedEndDate={customRange.to}
                onChange={onCustomDatesChange}
              />
            </div>
          }
        </Card.Header>
        <Card.Body className="py-2">
          <div className="d-flex justify-content-between align-items-baseline">
            <div className="mr-auto invisible">
              <ResetIcon className="fs-4" />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Loader loadEvent={summaryLoader} selector={summarySelector} idleLoader={period.idleLoader}
                errorHandler={ErrorSummaryControlWrapper}>
                <LoadedSummaryControl selector={summarySelector}
                  onOffsetChange={changeOffset} onDateChange={changeDate} period={period} />
              </Loader>
            </div>
            <div className={resetClassNames}>
              <ResetIcon className="fs-4" onClick={() => setOffset(0)} />
            </div>
          </div>

        </Card.Body>
      </Card>
      <Loader selector={summarySelector} errorHandler={SummaryNoData} loader={<></>}>
        <SummaryView selector={summarySelector} />
      </Loader>
    </>
  )
}

function ErrorSummaryControl({ error, ...rest }) {
  return <SummaryControl from={error.args.periodStart} to={error.args.periodEnd} {...rest} />
}

function LoadedSummaryControl({ selector, ...rest }) {
  const summary = useSelector(getData(selector))

  return <SummaryControl from={summary.trackStart} to={summary.trackEnd} {...rest} />
}

function SummaryControl({ period, from, to, onDateChange, onOffsetChange }) {

  const LeftSkipCalendarInput = forwardRef(({ onClick }, ref) => (
    <LeftSkipIcon className="fs-3 mx-2" onClick={onClick} />
  ))

  const RightSkipCalendarInput = forwardRef(({ onClick }, ref) => (
    <RightSkipIcon className="fs-3 mx-2" onClick={onClick} />
  ))

  const fromDate = new Date(from)

  const description = (
    <p className="fs-3 mb-0 user-select-none">{toHumanDate(from)} - {toHumanDate(to)}</p>
  )

  if (period.name === 'custom') {
    return description
  }

  return (
    <>
      <div className="d-flex">
        <DateSelect maxDate={fromDate} value={fromDate} onChange={onDateChange} customInput={<LeftSkipCalendarInput />}
          scale={period.name} />
      </div>
      <LeftIcon className="fs-3 mx-2" onClick={() => onOffsetChange(1)}>Prev</LeftIcon>
      {description}
      <RightIcon className="fs-3 mx-2" onClick={() => onOffsetChange(-1)}>Next</RightIcon>
      <div className="d-flex">
        <DateSelect minDate={fromDate} value={fromDate} onChange={onDateChange} maxDate={new Date()}
          customInput={<RightSkipCalendarInput />} scale={period.name} />
      </div>
    </>
  )

}
