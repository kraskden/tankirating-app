import { Card, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getData } from '../../util/slices'
import { SummaryTable } from '../profile/summary_table/SummaryTable'
import { SummaryBadges } from '../profile/badges/SummaryBadges'

import { makeDiffSummary } from '../../lib/summary';
import { SummaryCharts } from '../charts/profile/SummaryCharts'
import { ABSOLUTE_ACTIVITY_PROPERTIES } from '../../lib/constants'

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

      <SummaryCharts summary={summary} properties={ABSOLUTE_ACTIVITY_PROPERTIES} />
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