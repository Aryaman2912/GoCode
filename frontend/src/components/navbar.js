import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">GoCode</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
                <Nav.Link href="#link">Contact</Nav.Link>
                <Nav.Link href="/auth">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default NavBar;