import { useState } from "react"
import { Button, Container, Form, FormControl, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { UserAddModal } from "../UserAddModal"

const LINKS = [
  {
    link: '/',
    name: 'User Rating'
  },
  {
    link: '/global',
    name: 'Global Stat'
  },
  {
    link: '/compare',
    name: 'Compare Users'
  },
  {
    link: '/online',
    name: 'OnlineHub'
  },
  {
    link: '/about',
    name: 'About'
  }
]

export function NavigationBar() {

  const [userModalShow, setUserModalShow] = useState(false)

  const navigation = useNavigate()

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="fs-4 user-select-none" >TankiRating</Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              {LINKS.map((l, idx) => (
                <LinkContainer to={l.link}>
                  <Nav.Link key={idx} className="fw-semibold mx-lg-3 fs-5">{l.name}</Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
            <Nav>
              <Button variant="success" className="fw-semibold fs-5" onClick={() => setUserModalShow(true)}>Add users</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserAddModal show={userModalShow} onClose={() => setUserModalShow(false)} />
    </>
  )
}