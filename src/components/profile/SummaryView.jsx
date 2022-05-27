import { Card } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { getData } from '../../util/slices'
import { SummaryBadges } from './SummaryBadges'

export function SummaryView({selector}) {

  const summary = useSelector(getData(selector))

  return (
    <Card className='mt-3 shadow-sm'>
      <Card.Header className='py-0'>
        <SummaryBadges summary={summary} />
      </Card.Header>
      <Card.Body>
        <div className="row mt-2">
          Summary Table
        </div>
        <div className="row mt-2">
          Summary diagram
        </div>
      </Card.Body>
    </Card>
  )

}