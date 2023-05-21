import { useRef } from "react"
import { useDispatch } from "react-redux"
import { CaptchaContainer } from "../../captcha/CaptchaContainter"
import { Button } from "react-bootstrap"
import { activateTarget } from "../../../slices/targetSlice"

export const DisabledAlert = ({ user }) => {

  const captchaRef = useRef({})
  const dispatch = useDispatch()

  const onCaptchaSubmit = (status) => {
    if (status.success) {
      dispatch(activateTarget({ id: user.id, captcha: status.captcha }))
    }
  }

  return (
    <>
      <CaptchaContainer ref={captchaRef} onHandle={onCaptchaSubmit} />

      <div className="row mt-2">
        <Button onClick={() => captchaRef.current.activate()} variant="danger" size="sm">Account is disabled.Try to activate it?</Button>
      </div>
    </>
  )
}
