import { Alert, Badge, Button, Card, Modal, ProgressBar, Row } from "react-bootstrap"
import {FcRefresh} from "react-icons/fc"
import { useData } from "../../hooks/hooks";

import { getSnapshot } from "../../slices/snapshotSlice";
import { activateTarget, getTarget } from "../../slices/targetSlice";
import { getRank, getRankPercent } from "../../lib/ranks";
import { toHumanDate, toHumanDateTime } from "../../util/format";
import { matcher } from "../../lib/matcher";
import { differenceInHours } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CaptchaModal } from "../captcha/CaptchaModal";
import { AbbrContent } from "../Util";


const UPDATER_MATCHER = matcher(["text-success", [4], "text-muted", [24], "text-danger", [24 * 7], "text-danger fw-bold"])

const STATUSES = {
  'ACTIVE': {
    bg: 'success',
    title: 'Active',
    abbr: 'Account is updating regulary'
  },
  'FROZEN': {
    bg: 'primary',
    title: 'Frozen',
    abbr: 'Last account updates is failed'
  },
  'DISABLED': {
    bg: 'danger',
    title: 'Disabled',
    abbr: 'Account is disabled, system will not updating it'
  },
  'SLEEP': {
    bg: 'secondary',
    title: 'Sleep',
    abbr: 'User is not actively played, account is updating once per day'
  }
}

const UpdatedInfo = ({ user, snapshot }) => {
  const fontClass = UPDATER_MATCHER(differenceInHours(new Date(), new Date(snapshot.timestamp)))
  const statusMeta = STATUSES[user.status]
  return (
    <>
      <Card.Subtitle className={`d-flex align-items-center float-end align-middle ${fontClass} fs-6`}>
        <span className="d-none d-md-inline">Updated: {toHumanDateTime(snapshot.timestamp)}</span>
        {user.status != 'DISABLED' &&
        <a href="#" className="ms-2 me-1">Update</a> }

        <Badge pill bg={statusMeta.bg} className="fs-6 ms-2 " >
          <AbbrContent abbr={statusMeta.abbr} content={statusMeta.title} />
        </Badge>

      </Card.Subtitle>

    </>
  )
}

const UserInfo = ({ user, snapshot }) => {
  return (
    <div className="d-flex align-items-baseline mb-1">
      <div className="d-flex align-items-baseline">
        <Card.Title className="d-inline fs-4 me-2 my-0" >{user.name}</Card.Title>
        <Card.Subtitle className="d-inline text-muted fs-6 my-0">{getRank(snapshot.score)}</Card.Subtitle>
      </div>
    </div>
  )
}

const DisabledAlert = ({ user }) => {

  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const onCaptchaSubmit = (captcha) => {
    setShowModal(false)
    if (captcha) {
      dispatch(activateTarget({ id: user.id, captcha: captcha }))
    }
  }

  return (
    <>
      <div className="row mt-2">
        <Button onClick={() => setShowModal(true)} variant="danger" size="sm">Account is disabled.Try to activate it?</Button>
      </div>
      {showModal &&
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <CaptchaModal onResult={onCaptchaSubmit} />
        </Modal>
      }
    </>
  )
}

export const UserBox = () => {

  const user = useData(getTarget)
  const snapshot = useData(getSnapshot)

  const percent = getRankPercent(snapshot.score)

  return (
    <Card className="px-2 ">
      <Card.Body>
        <div className="row mb-1">
          <div className="col px-0">
            <UserInfo user={user} snapshot={snapshot} />
          </div>
          <div className="col px-0 my-auto">
            <UpdatedInfo user={user} snapshot={snapshot} />
          </div>
        </div>
        <div className="row">
          <ProgressBar className="px-0" now={percent} label={`${percent}%`} />
        </div>
        {user.status === 'DISABLED' && <DisabledAlert user={user} />}
      </Card.Body>
    </Card>
  )

}