import { Container } from "react-bootstrap"
import { StatusStatCard } from "../components/admin/StatusStatCard"

export const AdminPage = () => {
  return (
    <Container fluid='md' className="mt-2">
      <StatusStatCard />
    </Container>
  )
}