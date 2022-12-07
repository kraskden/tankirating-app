import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function SearchBoxContainer() {
  return (
    <Row className="my-4">
      <Col className="col-lg-4 offset-lg-4">
        <SearchBox />
      </Col>
    </Row>
  )
}

export function SearchBox() {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  function onSubmit(data) {
    reset()
    navigate(`/user/${data.username}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Control autoComplete='off' type='text' placeholder='Search user' {...register("username", { required: true })} />
        </Col>
        <Col className='col-auto'>
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </Col>
      </Row>
    </form>

  )

}