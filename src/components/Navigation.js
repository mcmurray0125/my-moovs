import React from "react"
import { useTheme } from "../contexts/ThemeContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import smallLogo from "../assets/small-logo.png"
import smallLogoBlack from "../assets/small-logo-black.png"
import { DarkModeSwitch } from 'react-toggle-dark-mode';


export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [isDarkMode, setDarkMode] = React.useState(theme === 'light' ? false : true);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    toggleTheme();
  };
    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="w-100 top-0 py-3" sticky="top" id="navbar" style={{zIndex: "1000"}}>
      <Container>
        <Navbar.Brand href="/">
            <img
              src={isDarkMode ? smallLogo : smallLogoBlack}
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
            <Nav.Link href="/saved-movies"><i className="fa-solid fa-cloud"></i> Saved</Nav.Link>
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey={2} href="/profile">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/saved-movies">Saved Movies</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
            </NavDropdown>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
              sunColor="rgb(22, 25, 28)"
              moonColor="rgb(241, 241, 241)"
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        )
}