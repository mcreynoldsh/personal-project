import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function NavBar({ user, checkUser }) {

  const navigate = useNavigate()

  const logOut = (event) => {
    event.preventDefault()
    axios.post('/logout').then((response) => {
      console.log('response from server: ', response)
      checkUser()
    }).then(
      navigate('/login', { replace: true })
    )

  }

  const navHome = () => {
    navigate('/')
    window.location.reload()
  }

  const navProfile = () => {
    navigate(`/user/${user.id}/view`)
    window.location.reload()
  }


  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand onClick={navHome}>
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2020/07/23/Dog-Paw-Print-with-Middle-Divider-Graphics-4699120-2-580x404.jpg"
            width="40"
            height="40"
            className="d-inline-block align-top nav-logo"
            alt="Paw Logo"
          /></Navbar.Brand>
        <Navbar.Brand onClick={navHome}>Paw Platoon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && <Nav.Link onClick={navHome}>Dashboard</Nav.Link>}
            {user && <Nav.Link onClick={navProfile}>Profile</Nav.Link>}
            {user && <Nav.Link onClick={logOut}>Log Out</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;