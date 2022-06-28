
import { forwardRef } from 'react';
import {
  BsCaretLeftFill as LeftIcon, BsCaretRightFill as RightIcon, BsFillSkipBackwardFill as LeftSkipIcon,
  BsFillSkipForwardFill as RightSkipIcon
} from 'react-icons/bs';
import { toHumanDate } from '../../../util/format';
import { DateSelect } from '../DateSelect';

export function PeriodOffsetSelect({ period, from, to, onDateChange, onOffsetChange, navigationDisabled: isNavigationDisabled }) {

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

  if (isNavigationDisabled) {
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

