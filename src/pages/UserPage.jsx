import { useEffect } from "react"
import { Container, Tab, Tabs } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Loader } from "../components/loader/Loaders"
import { AbsoluteSpinner } from "../components/loader/Spinners"
import { UserBox } from "../components/profile/UserBox"
import { SearchBoxContainer } from "../components/SearchBox"
import { UserProfileErrorHandler } from "../components/user/UserProfileErrorHandler"
import { getSnapshot, loadLastSnapshot } from "../slices/snapshotSlice"
import { getTarget, loadTarget } from "../slices/targetSlice"
import { UserActivityPage } from "./UserActivityPage"
import UserHomePage from "./UserHomePage"
import { UserSummaryPage } from "./UserSummaryPage"


export function UserPage() {
  const { user } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTarget({ name: user }))
  }, [user, dispatch])

  function onRefresh() {
    dispatch(loadTarget({ name: user }))
  }
  
  const ErrorHandler = (props) => <UserProfileErrorHandler {...props} onRefresh={onRefresh} />

  return (
    <Container fluid='md'>
      <SearchBoxContainer />

      <Loader selector={getTarget} loader={<AbsoluteSpinner />} errorHandler={ErrorHandler}>
        <Loader selector={getSnapshot} loadEvent={loadLastSnapshot} loader={<AbsoluteSpinner />}>
          <UserBox />
          <Tabs defaultActiveKey="home" className="my-2" mountOnEnter={true} unmountOnExit={false}>
            <Tab eventKey="home" title="Home">
              <UserHomePage />
            </Tab>
            <Tab eventKey="summary" title="Period Summary">
              <UserSummaryPage />
            </Tab>
            <Tab eventKey="activity" title="Activity Chart">
              <UserActivityPage />
            </Tab>
          </Tabs>
        </Loader>
      </Loader>

    </Container>
  )
}