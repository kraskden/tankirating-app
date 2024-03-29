import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Captcha from '@stadline/react-mtcaptcha';

const MAX_ADD_NICKNAMES = 10;
const SPLIT_REGEX = /[,\s]+/

export function UserAddModal({onClose, onAdd, defaultUsers}) {

  const [nicknames, setNicknames] = useState([])
  const [text, setText] = useState("")

  const [captcha, setCaptcha] = useState(null)

  useEffect(() => {
    if (defaultUsers) {
      setNicknames(defaultUsers)
      setText(defaultUsers.join(','))
    }
  }, [defaultUsers])

  function onModalClose() {
    setCaptcha(null)
    onClose && onClose()
  }

  function onNicknamesChanged(e) {
    const data = e.target.value 
    setText(data)
    const nicknames = data.split(SPLIT_REGEX)
      .map(s => s.trim())
      .filter(s => s !== '')
    setNicknames(nicknames)
  }

  function onSubmit(e) {
    e.preventDefault()
    onAdd({nicknames, captcha})
  }
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-1">
            <Form.Label>Nicknames (comma or space separated, max: {MAX_ADD_NICKNAMES})</Form.Label>
            <Form.Control type="text" value={text} autoFocus onChange={onNicknamesChanged} required></Form.Control>
            <Form.Text>Entered: {nicknames.length} nicknames</Form.Text>
          </Form.Group>
          <Form.Group>
            <Captcha onVerified={state => setCaptcha(state.verifiedToken)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAdd({nicknames, captcha})} disabled={nicknames.length === 0 || 
          nicknames.length > MAX_ADD_NICKNAMES || !captcha}>
          Create
        </Button>
      </Modal.Footer>
    </>
  )
}