import { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { UserAddHandler } from "./UserAddHandler"


export function UserProfileErrorHandler({ error, onRefresh }) {
  const username = error.args.name

  const [show, setShow] = useState(false)

  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <Card >
          <Card.Header className="d-flex justify-content-center fs-4">
            <span>
              User <b>{username}</b> is not exists in the portal
            </span>
          </Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <Button variant="warning mx-2" onClick={onRefresh}>Refresh</Button>
            <Button variant="success mx-2" onClick={() => setShow(true)}>Add user</Button>
            <Button as="a" href={`https://ratings.tankionline.com/en/user/${username}`} target="_blank" rel="noopener noreferrer" variant="secondary mx-2">Official site</Button>
          </Card.Body>
        </Card>
      </div>
      <UserAddHandler defaultUsers={[username]} show={show} onClose={() => setShow(false)} />
    </div>

  )
}