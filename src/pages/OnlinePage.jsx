import { Container } from 'react-bootstrap'
import { OnlineChartContainer } from '../components/charts/container/OnlineChartContainer'
import { OnlineStatCard } from '../components/online/OnlineStatCard'

export function OnlinePage() {
  return (
    <Container fluid='md'>
      <OnlineStatCard />
      <div className='mt-3'>
        <OnlineChartContainer />
      </div>
    </Container>
  )
}