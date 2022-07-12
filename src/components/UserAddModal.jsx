import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Captcha from '@stadline/react-mtcaptcha';

const MAX_ADD_NICKNAMES = 10;

export function UserAddModal({ show, onClose }) {

  const [nicknames, setNicknames] = useState([])
  const [captcha, setCaptcha] = useState(null)

  function onNicknamesChanged(e) {
    const data = e.target.value 
    const nicknames = data.split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
    setNicknames(nicknames)
  }

  function onModalClose() {
    setCaptcha(null)
    onClose && onClose()
  }

  return (
    <Modal show={show} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-1">
            <Form.Label>Nicknames (comma separated, max: {MAX_ADD_NICKNAMES})</Form.Label>
            <Form.Control type="text" autoFocus onChange={onNicknamesChanged} required></Form.Control>
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
        <Button variant="primary" onClick={onModalClose} disabled={nicknames.length == 0 || !captcha}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}