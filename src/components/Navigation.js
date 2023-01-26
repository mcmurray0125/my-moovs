import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="w-100 py-3">
      <Container>
        <Navbar.Brand href="/home">MyMoovs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/popular-movies">Popular Movies</Nav.Link>
            <NavDropdown title="Genres" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Comedy</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Drama</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                A-Z
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/search-movies">Search <i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Your Movies</Nav.Link>
            <Nav.Link eventKey={2} href="/">
              Account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        )
}