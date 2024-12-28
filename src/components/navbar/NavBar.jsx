import { useState } from "react"
import { Alert, Button, Container, Nav, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { UserAddHandler } from "../user/UserAddHandler"
import { useSelector } from "react-redux"
import { getAdmin } from "../../slices/userSlice"
import { VersionLink } from "./VersionLink"
import { NeedMoneyAlert } from "./NeedMoneyAlert.jsx"

const LINKS = [
  {
    link: '/',
    name: 'User Rating'
  },
  {
    link: '/trends',
    name: 'Trends'
  },
  {
    link: '/online',
    name: 'OnlineHub'
  },
  {
    link: '/about',
    name: 'About'
  },
  {
    link: '/help',
    name: 'Help Us!',
    urgent: true
  },
  {
    link: '/admin',
    name: 'Admin',
    admin: true
  }
]

function Link({link, idx, admin}) {
  if (link.admin && !admin) {
    return null
  }
  const addStyle = link.urgent ? "fw-bold" : "fw-semibold"
  return (
    <LinkContainer to={link.link} key={idx}>
      <Nav.Link id={`navlink-${idx}`} className={`${addStyle} mx-lg-3 fs-5`}>{link.name}</Nav.Link>
    </LinkContainer>
  )
}

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
                <Link link={l} idx={idx} admin={admin} />
              ))}
            </Nav>
            <Nav>
              <VersionLink />
              <Button variant="success" className="fw-semibold fs-5" onClick={() => setUserModalShow(true)}>Add users</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserAddHandler show={userModalShow} onClose={() => setUserModalShow(false)} />
      <NeedMoneyAlert />
    </>
  )
}