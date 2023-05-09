import { useEffect, useState } from "react";
import { Alert, Container, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FullDiffChart } from "../components/charts/profile/FullDiffChart";
import { UncontrolledOptionRadio } from "../components/control/OptionRadio";
import { Loader } from "../components/loader/Loaders";
import { AbsoluteSpinner } from "../components/loader/Spinners";
import { GLOBAL_DIFF_PERIODS, GROUPS, RELATIVE_ACTIVE_PROPERTIES } from "../lib/constants";
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
      {/* <p className="mt-3 fs-3 text-center" variant="info">
        Global Legends Statistics
      </p> */}
      {/* <UncontrolledOptionRadio item={group} items={GROUPS} onChange={setGroup} /> */}
      <Loader selector={getTarget} loader={<AbsoluteSpinner />}>
        <Tabs defaultActiveKey="summary" className="my-2" mountOnEnter={true} unmountOnExit={false}>
          <Tab eventKey="summary" title="Period Summary">
            <GlobalSummaryPage group={group.name} />
          </Tab>
          <Tab eventKey="activity" title="Activity Chart">
            <FullDiffChart periods={GLOBAL_DIFF_PERIODS} properties={RELATIVE_ACTIVE_PROPERTIES} />
          </Tab>
        </Tabs>
      </Loader>
    </Container>
  )
}