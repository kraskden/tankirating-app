import { Card, Form, Button, Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { loadTarget } from '../slices/targetSlice';

export function SearchBox() {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm()

  function onSubmit(data) {
    reset()
    navigate(`/user/${data.username}`)
    dispatch(loadTarget(data.username))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Control type='text' placeholder='Search user' {...register("username", {required: true})} />
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