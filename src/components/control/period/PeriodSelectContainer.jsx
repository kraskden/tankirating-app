import classNames from 'classnames'
import {Card} from 'react-bootstrap'
import { UncontrolledOptionRadio } from '../OptionRadio'

import {BsArrowCounterclockwise as ResetIcon} from 'react-icons/bs'

export function PeriodSelectContainer({ periods, period, onPeriodChange, isResetDisabled, onReset, extraControl, children }) {
  const ExtraControl = extraControl

  const resetClassNames = classNames({
    invisible: isResetDisabled
  })

  return (
    <Card className="mt-2">
      <Card.Header>
        <div className="d-flex justify-content-center">
          <UncontrolledOptionRadio items={periods} item={period} onChange={onPeriodChange} />
        </div>
        {extraControl && <ExtraControl period={period} />}
      </Card.Header>
      <Card.Body className="py-2">
        <div className="d-flex justify-content-between align-items-baseline">
          <div className="mr-auto invisible">
            <ResetIcon className="fs-4" />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {children}
          </div>
          <div className={resetClassNames}>
            <ResetIcon className="fs-4" onClick={onReset} />
          </div>
        </div>

      </Card.Body>
    </Card>
  )
}