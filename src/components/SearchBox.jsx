import { Card, Form, Button, Col, Row } from 'react-bootstrap'

export function SearchBox() {

  return (
    <Row>
      <Col>
        <Form.Control type='text' placeholder='Search user' />
      </Col>
      <Col className='col-auto'>
        <Button variant='primary'>
          Search
        </Button>
      </Col>
    </Row>
  )

}