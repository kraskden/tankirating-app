import { Button, Card } from "react-bootstrap"


export function UserProfileErrorHandler({ error }) {

  if (error.name !== "TRACK_TARGET_NOT_FOUND") {
    return <p>Error: {error.name}</p>
  }

  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <Card >
          <Card.Header className="d-flex justify-content-center fs-4">
            User not exists in the portal
          </Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <Button variant="success mx-2">Add user</Button>
            <Button variant="secondary mx-2">Official site</Button>
          </Card.Body>
        </Card>
      </div>

    </div>

  )
}