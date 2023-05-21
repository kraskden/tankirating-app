import { differenceInHours } from "date-fns"
import { STATUSES } from "../../../lib/constants"
import { Badge, Card } from "react-bootstrap"
import { toHumanDateTime } from "../../../util/format"
import { AbbrContent } from "../../Util"
import { matcher } from "../../../lib/matcher"
import { useRef } from "react"
import { CaptchaContainer } from "../../captcha/CaptchaContainter"
import { useDispatch } from "react-redux"
import { updateTarget } from "../../../slices/targetSlice"

const UPDATER_MATCHER = matcher(["text-success", [4], "text-muted", [24], "text-danger", [24 * 7], "text-danger fw-bold"])

const UpdateHandler = ({ user }) => {

  const captchaRef = useRef({})
  const dispatch = useDispatch()

  function handleCaptcha(status) {
    if (status.success) {
      dispatch(updateTarget({id: user.id, captcha: status.captcha}))
    }
  }

  return (
    <>
      <a href="#" className="ms-2 me-1" onClick={() => captchaRef.current.activate()}>Update</a>
      <CaptchaContainer ref={captchaRef} onHandle={handleCaptcha} />
    </>
  )
}

export const UpdatedInfo = ({ user, snapshot }) => {
  const fontClass = UPDATER_MATCHER(differenceInHours(new Date(), new Date(snapshot.timestamp)))
  const statusMeta = STATUSES[user.status]
  return (
    <>
      <Card.Subtitle className={`d-flex align-items-center float-end align-middle ${fontClass} fs-6`}>
        <span className="d-none d-md-inline">Updated: {toHumanDateTime(snapshot.timestamp)}</span>
        {user.status != 'DISABLED' && <UpdateHandler user={user} />}
        <Badge pill bg={statusMeta.bg} className="fs-6 ms-2 " >
          <AbbrContent abbr={statusMeta.abbr} content={statusMeta.title} />
        </Badge>
      </Card.Subtitle>

    </>
  )
}