import React, {useState, useEffect} from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes'

const NavBar = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({type:actionType.LOGOUT});

    history.push('/auth');

    setUser(null);
  };
  useEffect(() => {
    // const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">GoCode</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                <Nav.Link href="#link">Contact</Nav.Link>
                {console.log(user?.result)}
                {user?.result ? (
                  <>
                  <Nav.Link href="#profile">{user?.result.name}</Nav.Link>
                  <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                  </>

                ):(
                  <>
                  <Nav.Link href="/auth">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  </>
                )}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default NavBar;