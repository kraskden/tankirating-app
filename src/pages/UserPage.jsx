import { useCallback } from "react"
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap"
import { useParams } from "react-router"
import { Loader } from "../components/loader/Loaders"
import { AbsoluteSpinner } from "../components/loader/Spinners"
import { UserBox } from "../components/profile/UserBox"
import { SearchBox } from "../components/SearchBox"
import { getSnapshot, loadLastSnapshot } from "../slices/snapshotSlice"
import { getTarget, loadTarget } from "../slices/targetSlice"
import UserHomePage from "./UserHomePage"
import { UserSummaryPage } from "./UserSummaryPage"


export function UserPage() {
  const { user } = useParams()

  const targetLoadEvent = useCallback(() => loadTarget(user), [user])

  return (
    <Container fluid='md'>
      <Row className="my-4">
        <Col className="col-lg-4 offset-lg-4">
          <SearchBox />
        </Col>
      </Row>

      <Loader selector={getTarget} loadEvent={targetLoadEvent} loader={<AbsoluteSpinner/>}>
        <Loader selector={getSnapshot} loadEvent={loadLastSnapshot} loader={<AbsoluteSpinner />}>
          <UserBox />
          <Tabs defaultActiveKey="home" className="my-2" mountOnEnter={true} unmountOnExit={false}>
            <Tab eventKey="home" title="Home">
              <UserHomePage />
            </Tab>
            <Tab eventKey="summary" title="Summary">
              <UserSummaryPage />
            </Tab>
          </Tabs>
        </Loader>
      </Loader>

    </Container>
  )
}