import { activateTarget } from "../../slices/targetSlice"


// Ask user for captcha or bypass if it's an admin
export function CaptchaContainer({activateRef, onHandle}) {
    const [showModal, setShowModal] = useState(false)

    activateRef.current.activate = () => {
        // TODO: Check for current user
        if (false) {
            onHandle({
                success: true,
                captcha: null
            })
        }
        setShowModal(true)
    }

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
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <CaptchaModal onResult={onCaptchaSubmit} />
          </Modal>
        }
      </>
    )
}