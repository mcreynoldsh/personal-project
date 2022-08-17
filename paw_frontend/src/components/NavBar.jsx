import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function NavBar({ user, checkUser }) {

  const navigate = useNavigate()

  const logOut = (event) => {
    event.preventDefault()
    axios.post('/logout').then((response) => {
      console.log('response from server: ', response)
      // we're logged in, but we need to refresh to get the CSRF token on the front-end
      checkUser()
    }).then(
      navigate('/login', { replace: true })
    )

  }

  const navHome = () => {
    navigate('/')
  }

  const navProfile = () => {
    navigate(`/user/${user.id}/view`)
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={navHome}>
          <img
            src="https://media.istockphoto.com/vectors/green-polygonal-paw-print-template-illustration-design-vector-eps-10-vector-id1220100503?k=20&m=1220100503&s=612x612&w=0&h=qyp-jgCyF7CCF_MinmE-YSTOkUcVu3pZ5YjGdM0vDsI="
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Paw Logo"
          /></Navbar.Brand>
        <Navbar.Brand  onClick={navHome}>Paw Platoon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={navHome}>Dashboard</Nav.Link>
            {user && <Nav.Link onClick={navProfile}>Profile</Nav.Link>}
            {user && <Nav.Link onClick={logOut}>Log Out</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;