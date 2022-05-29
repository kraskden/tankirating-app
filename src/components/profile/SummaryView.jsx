import { Card, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getData } from '../../util/slices'
import { SummaryTable } from './summary/SummaryTable'
import { SummaryBadges } from './SummaryBadges'

import { makeDiffSummary } from '../../lib/summary';
import { SummaryCharts } from './SummaryCharts'

export function SummaryView({ selector }) {

  const summary = useSelector(getData(selector))

  if (!summary.time) {
    return <SummaryNoData />
  }

  return (
    <>
      <Card className='mt-3 shadow-sm'>
        <Card.Header className='py-0'>
          <SummaryBadges summary={summary} />
        </Card.Header>
        <Card.Body>
          <div className="row mt-2">
            <SummaryTable {...makeDiffSummary(summary)} />
          </div>
        </Card.Body>
      </Card>

      <SummaryCharts summary={summary}/>
      <div className="mb-5"></div>
    </>
  )

}


export function SummaryNoData() {
  return (
    <Alert className="mt-2 fs-5 text-center" variant="danger">
      No data
    </Alert>
  )
}