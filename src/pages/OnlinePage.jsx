import { Container } from 'react-bootstrap'
import { OnlineChart } from '../components/online/OnlineChart'
import { OnlineStatCard } from '../components/online/OnlineStatCard'

export function OnlinePage() {
  return (
    <Container fluid='md'>
      <OnlineStatCard />
      <div className='mt-3'>
        <OnlineChart />
      </div>
    </Container>
  )
}