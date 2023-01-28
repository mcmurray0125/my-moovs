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
              <NavDropdown.Item href="/action">Action</NavDropdown.Item>
              <NavDropdown.Item href="/comedy">Comedy</NavDropdown.Item>
              <NavDropdown.Item href="/drama">Drama</NavDropdown.Item>
              <NavDropdown.Item href="/family">Family</NavDropdown.Item>
              <NavDropdown.Item href="/science-fiction">Science Fiction</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                A-Z
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/search-movies">Search <i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/saved-movies">Saved Movies</Nav.Link>
            <Nav.Link eventKey={2} href="/">
              Account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        )
}