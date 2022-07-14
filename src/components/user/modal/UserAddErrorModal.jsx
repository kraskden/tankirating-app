import { Button, Modal } from "react-bootstrap";


export function UserAddErrorModal({ error, onClose }) {
  return (
    <>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fs-4">{error.message}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </>
  )

}