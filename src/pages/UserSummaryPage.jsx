import { useCallback, useMemo, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { OptionRadio } from "../components/control/OptionRadio";

import { getSummarySelector, loadSummary } from '../slices/summarySlice';

import { BsCaretLeftFill as LeftIcon, BsCaretRightFill as RightIcon } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { getData } from "../util/slices";
import { Loader } from "../components/loader/Loaders";
import { toHumanDate } from "../util/format";
import { SummaryView } from "../components/profile/SummaryView";

const periods = [
  { name: 'day', title: 'Day' },
  { name: 'week', title: 'Week' },
  { name: 'month', title: 'Month' },
  { name: 'year', title: 'Year' },
  { name: 'all_time', title: 'All Time' },
  { name: 'custom', title: 'Custom' }
]

const defaultPeriod = periods[2]
const defaultOffsets = periods.reduce((acc, p) => {
  acc[p.name] = 0;
  return acc;
}, {})

export function UserSummaryPage() {

  const [period, setPeriod] = useState(defaultPeriod)
  const [offsets, setOffsets] = useState(defaultOffsets)

  const offset = offsets[period.name]

  const summarySelector = getSummarySelector(period.name, offset)
  const summaryLoader = useCallback(() => loadSummary({ period: period.name, offset }), [period, offset])

  function changeOffset(delta) {
    setOffsets({
      ...offsets,
      [period.name]: offsets[period.name] + delta
    })
  }

  return (
    <>
      <Card className="mt-2">
        <Card.Header>
          <div className="d-flex justify-content-center">
            <OptionRadio items={periods} onChange={setPeriod} defaultItem={defaultPeriod} />
          </div>
        </Card.Header>
        <Card.Body className="py-2">
          <div className="d-flex justify-content-center align-items-center">
            <LeftIcon className="fs-3 mx-2" onClick={() => changeOffset(1)}>Prev</LeftIcon>
            <Loader loadEvent={summaryLoader} selector={summarySelector} errorHandler={SummaryErrDescription}>
              <SummaryDescription selector={summarySelector} />
            </Loader>
            <RightIcon className="fs-3 mx-2" onClick={() => changeOffset(-1)}>Next</RightIcon>
          </div>
        </Card.Body>
      </Card>
      <Loader loadEvent={summaryLoader} selector={summarySelector} errorHandler={SummaryNoData}>
        <SummaryView selector={summarySelector} />
      </Loader>
    </>
  )
}

function SummaryDates({ from, to }) {

  return <p className="fs-3 mb-0 user-select-none">{toHumanDate(from)} - {toHumanDate(to)}</p>
}


function SummaryErrDescription({ error }) {
  return <SummaryDates from={error.args.periodStart} to={error.args.periodEnd} />
}

function SummaryNoData() {
  return (
    <Alert className="mt-2 fs-5 text-center" variant="danger">
      No data
    </Alert>
  )
}

function SummaryDescription({ selector }) {

  const summary = useSelector(getData(selector))

  return <SummaryDates from={summary.trackStart} to={summary.trackEnd} />
}