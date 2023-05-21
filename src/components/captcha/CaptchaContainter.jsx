import { Modal } from "react-bootstrap"
import { activateTarget } from "../../slices/targetSlice"
import { CaptchaModal } from "./CaptchaModal"
import { forwardRef, useImperativeHandle, useState } from "react"
import { useSelector } from "react-redux"
import { getAdmin } from "../../slices/userSlice"


// Ask user for captcha or bypass if it's an admin
export const CaptchaContainer = forwardRef(({onHandle}, ref) => {
  const [showModal, setShowModal] = useState(false)
  const admin = useSelector(getAdmin)

  useImperativeHandle(ref, () => ({
    activate: () => {
      console.log(admin)
      // TODO: Check for current user
      if (admin) {
        onHandle({
          success: true,
          captcha: null
        })
      }
      setShowModal(true)
    }
  }))


  const onCaptchaSubmit = (captcha) => {
    setShowModal(false)
    onHandle({
      success: !!captcha,
      captcha: captcha
    })
  }

  return (
    <>
      {showModal &&
        <Modal show={showModal} onHide={() => onCaptchaSubmit(null)}>
          <CaptchaModal onResult={onCaptchaSubmit} />
        </Modal>
      }
    </>
  )
})