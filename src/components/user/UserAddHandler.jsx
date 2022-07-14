import { useState } from "react";
import { Modal } from "react-bootstrap";
import { apiAddUsers } from "../../service/target";
import { UserAddModal } from "./modal/UserAddModal";
import { UserAddLoadingModal } from "./modal/UserAddLoadingModal";
import { UserAddResultModal } from "./modal/UserAddResultModal";
import { UserAddErrorModal } from "./modal/UserAddErrorModal";

const STATUSES = {
  ADD: 1,
  LOADING: 2,
  RESULT_VIEW: 3,
  ERROR_VIEW: 4
}

export function UserAddHandler({ show, onClose, defaultUsers }) {

  const [status, setStatus] = useState(STATUSES.ADD)
  const [result, setResult] = useState(null)

  async function onAdd({nicknames, captcha}) {
    setStatus(STATUSES.LOADING)
    try {
      const data = await apiAddUsers(nicknames, captcha)
      setResult(data)
      setStatus(STATUSES.RESULT_VIEW)
    } catch (ex) {
      setStatus(STATUSES.ERROR_VIEW)
      setResult(ex)
    }
  }

  function onModalClose() {
    setTimeout(() => {
      setStatus(STATUSES.ADD)
      setResult(null)
    }, 500)  
    onClose()
  }

  let component = <></>
  let parentExtraProps = {}
  if (status === STATUSES.ADD) {
    component = <UserAddModal onAdd={onAdd} onClose={onModalClose} defaultUsers={defaultUsers} />
  } else if (status === STATUSES.LOADING) {
    component = <UserAddLoadingModal />
    parentExtraProps = { 
      backdrop: 'static',
      keyboard: false
    }
  } else if (status === STATUSES.RESULT_VIEW) {
    component = <UserAddResultModal result={result} onClose={onModalClose}/> 
  } else if (status === STATUSES.ERROR_VIEW) {
    component = <UserAddErrorModal error={result} onClose={onModalClose} />
  }

  return (
    <Modal size="lg" show={show} onHide={onModalClose} {...parentExtraProps}>
      {component}    
    </Modal>
  )
}