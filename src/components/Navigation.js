import React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import smallLogo from "../assets/small-logo.png"

export default function Navigation() {
    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="w-100 top-0 py-3" id="navbar" style={{zIndex: "100"}}>
      <Container>
        <Navbar.Brand href="/">
            <img
              src={smallLogo}
              height="30"
              className="d-inline-block align-top"
              alt="MyMoovs logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/popular-movies"><i className="fa-solid fa-fire"></i> Popular Movies</Nav.Link>
            <NavDropdown title="Genres" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/action">Action</NavDropdown.Item>
              <NavDropdown.Item href="/comedy">Comedy</NavDropdown.Item>
              <NavDropdown.Item href="/drama">Drama</NavDropdown.Item>
              <NavDropdown.Item href="/family">Family</NavDropdown.Item>
              <NavDropdown.Item href="/science-fiction">Sci-Fi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/upcoming-movies">Upcoming</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/search-movies">Search <i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/saved-movies"><i className="fa-solid fa-cloud"></i> Saved Movies</Nav.Link>
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey={2} href="/profile">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/saved-movies">Saved Movies</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        )
}