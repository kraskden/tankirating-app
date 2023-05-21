import { useState } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { UserAddHandler } from "../user/UserAddHandler"
import { useSelector } from "react-redux"
import { getAdmin } from "../../slices/userSlice"

const LINKS = [
  {
    link: '/',
    name: 'User Rating'
  },
  {
    link: '/trends',
    name: 'Trends'
  },
  // {
  //   link: '/compare',
  //   name: 'Compare Users'
  // },
  {
    link: '/online',
    name: 'OnlineHub'
  },
  {
    link: '/about',
    name: 'About'
  },
  {
    link: '/admin',
    name: 'Admin',
    admin: true
  }
]

export function NavigationBar() {

  const [userModalShow, setUserModalShow] = useState(false)
  const admin = useSelector(getAdmin)

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="fs-4 user-select-none" onClick={() => document.getElementById('navlink-0').click()}>
            TankiRating
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto">
              {LINKS.map((l, idx) => (
                !l.admin || admin ? <LinkContainer to={l.link} key={idx}>
                  <Nav.Link id={`navlink-${idx}`} className="fw-semibold mx-lg-3 fs-5">{l.name}</Nav.Link>
                </LinkContainer> : <></>
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