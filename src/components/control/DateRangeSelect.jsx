import { Button, Popover, OverlayTrigger, Card } from 'react-bootstrap';
import { forwardRef, useEffect, useState } from 'react';
import { BsCalendar3 as CalIcon, BsArrowCounterclockwise as ResetIcon } from 'react-icons/bs';
import { toHumanDate } from '../../util/format';


import { BsCheckAll as OkIcon } from 'react-icons/bs';

import DatePicker from 'react-datepicker';
import { DEFAULT_DATEPICKER_PARAMS } from '../../lib/constants';

export function DateRangeSelect({
  selectedStartDate,
  selectedEndDate,

  minDate,
  maxDate,
  validator,
  bg,

  onChange,
  onReset,
  showMonths,
  hideReset
}) {

  const [overlayShow, setOverlayShow] = useState(false)

  const [startDate, setStartDate] = useState(selectedStartDate)
  const [endDate, setEndDate] = useState(selectedEndDate)

  useEffect(() => {
    setStartDate(selectedStartDate)
    setEndDate(selectedEndDate)
  }, [selectedStartDate, selectedEndDate])

  const DateInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <Button variant='secondary' onClick={onClick} ref={ref}>
        {value === '' ? "Pick date" : value}
      </Button>
    )
  })

  const datesPresents = selectedStartDate && selectedEndDate

  function onDatesSave() {
    if (!(startDate && endDate)) {
      return
    }
    if (!validator || validator(startDate, endDate)) {
      onChange && onChange(startDate, endDate)
      setOverlayShow(false)
    } else {
      // TODO: error handling
    }
  }

  const commonDatePickerParams = {
    ...DEFAULT_DATEPICKER_PARAMS,

    startDate: startDate,
    endDate: endDate,
    maxDate: maxDate,
    customInput: <DateInput />,
    showMonthYearPicker: showMonths
  }

  const popover = (
    <Popover id="popover-trigger-click-root-close" style={{ maxWidth: "800px" }}>
      <Card>
        <Card.Body>
          <div className="d-flex align-items-baseline">
            <DatePicker
              {...commonDatePickerParams}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              minDate={minDate}
            />
            <p className='mx-2'>–</p>
            <DatePicker
              {...commonDatePickerParams}
              selected={endDate}
              onChange={(date) => setEndDate(date)}

              selectsEnd
              minDate={startDate}
            />
            <div>
              <Button variant='success' className='ms-3' onClick={onDatesSave}><OkIcon /></Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Popover>
  )


  return (
    <div className="d-flex">
      <OverlayTrigger trigger="click" placement="top" overlay={popover} show={overlayShow} >
        <Button className="d-flex align-items-center" variant={bg || 'secondary'} onClick={() => setOverlayShow(!overlayShow)}>
          <CalIcon className='me-2 fs-6' />
          <p className="fs-6 mb-0">{datesPresents ?
            `${toHumanDate(selectedStartDate)} – ${toHumanDate(selectedEndDate)}`
            : "Select range"}
          </p>
        </Button>
      </OverlayTrigger>
      {hideReset ? <></> :
        <Button variant='success ms-2'>
          <ResetIcon className='fs-6' onClick={() => onReset && onReset()} />
        </Button>}
    </div>
  )

}