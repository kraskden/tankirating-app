import { useState } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { UserAddHandler } from "../user/UserAddHandler"

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

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="fs-4 user-select-none" >TankiRating</Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              {LINKS.map((l, idx) => (
                <LinkContainer to={l.link} key={idx}>
                  <Nav.Link className="fw-semibold mx-lg-3 fs-5">{l.name}</Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
            <Nav>
              <Button variant="success" className="fw-semibold fs-5" onClick={() => setUserModalShow(true)}>Add users</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserAddHandler show={userModalShow} onClose={() => setUserModalShow(false)} />
    </>
  )
}