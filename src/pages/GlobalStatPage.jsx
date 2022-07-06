import { useEffect, useState } from "react";
import { Alert, Container, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UncontrolledOptionRadio } from "../components/control/OptionRadio";
import { Loader } from "../components/loader/Loaders";
import { AbsoluteSpinner } from "../components/loader/Spinners";
import { GROUPS } from "../lib/constants";
import { getTarget, loadTarget } from "../slices/targetSlice";
import { GlobalSummaryPage } from "./GlobalSummaryPage";


export function GlobalStatPage() {

  const dispatch = useDispatch()

  // There is only one group (LEGENDS) today. May be extened in the future
  const [group, setGroup] = useState(GROUPS[0])

  useEffect(() => {
    dispatch(loadTarget({ name: group.name, type: 'GROUP' }))
  }, [group])

  return (
    <Container fluid='md' className="mt-2">
      <p className="mt-2 fs-3 text-center" variant="info">
        Global Legends Statistics
      </p>
      {/* <UncontrolledOptionRadio item={group} items={GROUPS} onChange={setGroup} /> */}
      <Loader selector={getTarget} loader={<AbsoluteSpinner />}>
        <Tabs defaultActiveKey="summary" className="my-2" mountOnEnter={true} unmountOnExit={false}>
          <Tab eventKey="summary" title="Summary">
            <GlobalSummaryPage />
          </Tab>
          <Tab eventKey="activity" title="Activity">

          </Tab>
        </Tabs>
      </Loader>
    </Container>
  )
}