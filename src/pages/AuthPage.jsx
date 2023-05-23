import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { apiAuth } from "../service/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../slices/userSlice"
import { useNavigate } from "react-router"

export const AuthPage = () => {

  const [creds, setCreds] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    apiAuth(creds.login, creds.password).then((data) => {
      dispatch(setUser({
        ...data,
        ...creds
      }))
      localStorage.setItem('auth', `Basic ${btoa(`${creds.login}:${creds.password}`)}`)
      navigate('/')
    }).catch(ex => {
      console.log(ex)
      localStorage.removeItem('auth')
      alert("Auth error")
    })
  }

  return (
    <Container fluid='md col-4 mt-4'>
      <h3>Auth</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className="my-1">
          <Form.Label>Login</Form.Label>
          <Form.Control onChange={(e) => setCreds({ ...creds, login: e.target.value })} />
        </Form.Group>
        <Form.Group className="my-1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
        </Form.Group>
        <Button variant="primary mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}