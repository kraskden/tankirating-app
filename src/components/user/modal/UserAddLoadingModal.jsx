import { Modal } from "react-bootstrap";
import { CenterSpinner } from "../../loader/Spinners";


export function UserAddLoadingModal() {
  return (
    <>
      <Modal.Header>
        <Modal.Title>Loading...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CenterSpinner />
      </Modal.Body>
    </>
  )
}