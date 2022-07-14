import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";


const REPORT_STATUSES = {
  'OK': { variant: 'success', link: true, text: 'Successfully added' },
  'ALREADY_EXISTS': { variant: 'info', link: true, text: 'Already exists in the system' },
  'NOT_FOUND': { variant: 'danger', link: false, text: 'Account NOT EXISTS (check official site)' },
  'UNKNOWN_ERROR': { variant: 'danger', link: false, text: 'Internal error, try again later' }
}

function ReportRow({ nickname, status }) {

  const meta = REPORT_STATUSES[status]

  const userDisplay = meta.link ? 
    <Link to={`/user/${nickname}`} target="_blank" rel="noopener noreferrer" >{nickname}</Link> : 
    nickname;

  return (
    <ListGroup.Item variant={meta.variant} as='li' className="my-1 d-flex align-items-center" >
      <div className="d-flex align-items-center">
        <div className="fw-bold ms-2 fs-5">
          {userDisplay}
        </div>
      </div>

      <div className="ms-2 fs-6 mt-1">{meta.text}</div>
    </ListGroup.Item>

  )

}

export function UserAddResultModal({ result, onClose }) {
  if (!result) {
    return <></>
  }

  return (
    <>
      <Modal.Header>
        <Modal.Title>Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup as='ol'>
          {result.map(e => <ReportRow key={e.nickname} nickname={e.nickname} status={e.status} />)}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>

    </>
  )
}