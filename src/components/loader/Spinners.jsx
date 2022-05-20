import { Spinner } from "react-bootstrap";

export function AbsoluteSpinner() {
  return (
    <Spinner animation="border" variant="primary" className="position-absolute top-50 start-50" />
  )
}

export function CenterSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}