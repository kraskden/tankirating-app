import { Button, Popover, OverlayTrigger, Card } from 'react-bootstrap';
import { forwardRef, useEffect, useState } from 'react';
import { BsCalendar3 as CalIcon, BsArrowCounterclockwise as ResetIcon } from 'react-icons/bs';
import { toHumanDate } from '../../util/format';


import { BsCheckAll as OkIcon } from 'react-icons/bs';

import DatePicker from 'react-datepicker';

export function DateRangeSelect({
  selectedStartDate,
  selectedEndDate,
  minDate,
  maxDate,
  validator,
  onChange,
  onReset
}) {

  const dateFormat = "dd.MM.yyyy"
  const [overlayShow, setOverlayShow] = useState(false)

  const [startDate, setStartDate] = useState(selectedStartDate)
  const [endDate, setEndDate] = useState(selectedEndDate)

  useEffect(() => {
    setStartDate(selectedStartDate)
    setEndDate(selectedEndDate)
  }, [selectedStartDate, selectedEndDate])

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant='secondary' onClick={onClick} ref={ref}>
      {value}
    </Button>
  ))

  function onDatesSave() {
    if (!validator || validator(startDate, endDate)) {
      onChange(startDate, endDate)
      setOverlayShow(false)
    } else {
      // TODO: error handling
    }
  }


  const popover = (
    <Popover id="popover-trigger-click-root-close" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <div className="d-flex align-items-baseline">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}

              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={maxDate}

              customInput={<DateInput />}
              dateFormat={dateFormat}
              calendarStartDay={1}
            />
            <p className='mx-2'>–</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}

              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={maxDate}

              customInput={<DateInput />}
              dateFormat={dateFormat}
              calendarStartDay={1}
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
        <Button className="d-flex align-items-baseline" variant='secondary' onClick={() => setOverlayShow(!overlayShow)}>
          <CalIcon className='me-2 fs-6' />
          <p className="fs-5 mb-0">{`${toHumanDate(selectedStartDate)} – ${toHumanDate(selectedEndDate)}`}</p>
        </Button>
      </OverlayTrigger>
      <Button variant='success ms-2'>
        <ResetIcon className='fs-5' onClick={() => onReset && onReset()} />
      </Button>
    </div>
  )

}