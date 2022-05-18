import { useCallback } from "react"
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"
import { useParams } from "react-router"
import { PageLoader } from "../components/loader/PageLoader"
import { UserBox } from "../components/profile/UserBox"
import { SearchBox } from "../components/SearchBox"
import { getSnapshot, loadLastSnapshot } from "../slices/snapshotSlice"
import { getTarget, loadTarget } from "../slices/targetSlice"
import UserHomePage from "./UserHomePage"


export function UserPage() {
  const { user } = useParams()

  const targetLoadEvent = useCallback(() => loadTarget(user), [user])

  return (
    <Container>
      <Row className="my-4">
        <Col className="col-lg-4 offset-lg-4">
          <SearchBox />
        </Col>
      </Row>

      <PageLoader selector={getTarget} loadEvent={targetLoadEvent}>
        <PageLoader selector={getSnapshot} loadEvent={loadLastSnapshot}>
          <UserBox />
          <Tabs defaultActiveKey="home" className="my-2">
            <Tab eventKey="home" title="Home">
              <UserHomePage />
            </Tab>
          </Tabs>
        </PageLoader>
      </PageLoader>

    </Container>
  )
}